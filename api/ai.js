// Vercel Serverless Function - 모든 AI 요청을 여기서 처리
// POST /api/ai  body: { type: 'modeA' | 'modeB' | 'culture' | 'topics', text?: string, lang?: 'en' | 'fr' }

import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-sonnet-5'

const LANGUAGE_NAMES = { en: 'English', fr: 'French' }

function resolveLangName(lang) {
  return LANGUAGE_NAMES[lang] || LANGUAGE_NAMES.en
}

// modeA/modeB는 언어(영어/프랑스어)에 따라 프롬프트가 달라져서 함수로 생성한다.
// JSON 키는 "target"으로 언어중립적으로 둬서, 프랑스어를 요청할 때 "english"라는
// 필드명이 모델을 헷갈리게 하지 않도록 한다.
function modeAPrompt(lang) {
  const langName = resolveLangName(lang)
  return `You are a friendly ${langName} learning assistant for Korean speakers.
Given Korean text, suggest 3 natural ${langName} sentences.
Return ONLY this JSON, no markdown:
{
  "suggestions": [
    {
      "target": string (in ${langName}),
      "korean": string,
      "words": [{"word": string (in ${langName}), "meaning": string (Korean)}]
    }
  ]
}`
}

function modeBPrompt(lang) {
  const langName = resolveLangName(lang)
  return `You are a friendly ${langName} learning assistant for Korean speakers.
Given a ${langName} sentence, suggest 3 improved natural versions.
Return ONLY this JSON, no markdown:
{
  "suggestions": [
    {
      "target": string (in ${langName}),
      "korean": string,
      "change": string (Korean explanation of what changed)
    }
  ]
}`
}

const STATIC_SYSTEM_PROMPTS = {
  culture: `You are a cultural guide for Korean people learning English.
Generate one cultural insight card in JSON.
Return ONLY this JSON, no markdown:
{
  "category": string,
  "emoji": string,
  "title": string (Korean, question format),
  "description": string (Korean, 3-4 sentences),
  "expressions": [
    {
      "english": string,
      "korean": string,
      "example": string
    }
  ]
}`,
  topics: `You are a personalized vocabulary coach for a Korean speaker learning English.
You will be given a list of short diary entries the user recently wrote (in Korean or English), one per line.
Find 1 to 3 recurring real-life themes/topics that actually appear across these entries (e.g. 집안일, 회사 업무, 운동, 육아, 요리, 육아 등).
Only suggest themes clearly reflected in the given entries - never invent unrelated ones. If there isn't a clear recurring theme, return fewer topics (even zero).
For each theme, suggest 4-5 useful English words or short phrases related to that theme, with Korean meanings.
Return ONLY this JSON, no markdown:
{
  "topics": [
    {
      "title": string (Korean, short theme name, e.g. "집안일"),
      "emoji": string,
      "items": [
        {"english": string, "korean": string}
      ]
    }
  ]
}`
}

const VALID_TYPES = new Set(['modeA', 'modeB', 'culture', 'topics'])

function buildSystemPrompt(type, lang) {
  if (type === 'modeA') return modeAPrompt(lang)
  if (type === 'modeB') return modeBPrompt(lang)
  return STATIC_SYSTEM_PROMPTS[type]
}

function buildUserMessage(type, text) {
  if (type === 'culture') {
    return '오늘의 문화 카드를 하나 생성해주세요. 매번 다른 주제로 다양하게 만들어주세요.'
  }
  return text
}

function parseJsonSafely(raw) {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    const match = raw.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {
        return null
      }
    }
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '허용되지 않은 요청 방식이에요.' })
    return
  }

  const { type, text, lang } = req.body || {}

  if (!VALID_TYPES.has(type)) {
    res.status(400).json({ message: '알 수 없는 요청이에요. 다시 시도해주세요.' })
    return
  }

  if (type !== 'culture' && (!text || !text.trim())) {
    res.status(400).json({ message: '내용을 먼저 입력해주세요.' })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set')
    res.status(500).json({ message: 'AI 서비스 설정에 문제가 있어요. 잠시 후 다시 시도해주세요 🙏' })
    return
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      thinking: { type: 'disabled' },
      system: buildSystemPrompt(type, lang),
      messages: [{ role: 'user', content: buildUserMessage(type, text) }]
    })

    // content[0]이 항상 text 블록이라는 보장이 없으므로(예: thinking 블록이 먼저 올 수 있음) 타입으로 찾는다.
    const raw = response.content?.find((block) => block.type === 'text')?.text || ''
    const parsed = parseJsonSafely(raw)

    if (!parsed) {
      res.status(502).json({ message: 'AI 응답을 이해하지 못했어요. 다시 시도해주세요 🙏' })
      return
    }

    res.status(200).json(parsed)
  } catch (err) {
    console.error('AI request failed:', {
      status: err?.status,
      name: err?.name,
      message: err?.message,
      error: err?.error
    })
    res.status(500).json({ message: 'AI 요청 중 문제가 발생했어요. 잠시 후 다시 시도해주세요 🙏' })
  }
}
