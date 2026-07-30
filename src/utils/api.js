// /api/ai 서버리스 함수 호출 클라이언트

const FRIENDLY_ERROR = 'AI 추천을 불러오지 못했어요. 잠시 후 다시 시도해주세요 🙏'

async function callAI(type, payload) {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...payload })
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody.message || FRIENDLY_ERROR)
    }

    return await res.json()
  } catch (err) {
    throw new Error(err.message || FRIENDLY_ERROR)
  }
}

export function getKoreanSuggestions(koreanText, lang = 'en') {
  return callAI('modeA', { text: koreanText, lang })
}

export function getTargetCorrections(targetText, lang = 'en') {
  return callAI('modeB', { text: targetText, lang })
}

export function getCultureCard() {
  return callAI('culture', {})
}

export function getTopicRecommendations(entriesText) {
  return callAI('topics', { text: entriesText })
}
