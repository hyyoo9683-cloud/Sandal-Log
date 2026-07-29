// 브라우저 내장 음성합성 API로 영어 문장을 읽어주는 유틸 (무료, API 키 불필요)
// 기기에 더 자연스러운(Enhanced/Premium/Neural 등) 영어 음성이 설치돼 있으면 그걸 우선 사용한다.

const QUALITY_HINTS = ['enhanced', 'premium', 'neural', 'natural', 'siri']

let cachedVoices = []

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function refreshVoices() {
  if (!canSpeak()) return
  const voices = window.speechSynthesis.getVoices()
  if (voices.length) cachedVoices = voices
}

if (canSpeak()) {
  refreshVoices()
  // 일부 브라우저(Chrome 등)는 음성 목록을 비동기로 늦게 채워준다.
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoices)
}

function scoreVoice(voice) {
  const name = voice.name.toLowerCase()
  const lang = voice.lang?.toLowerCase() || ''
  let score = 0
  if (lang === 'en-us') score += 2
  else if (lang.startsWith('en')) score += 1
  if (QUALITY_HINTS.some((hint) => name.includes(hint))) score += 3
  if (voice.localService === false) score += 1 // 네트워크 기반 음성이 대체로 더 자연스러움
  return score
}

function pickBestVoice() {
  refreshVoices()
  const enVoices = cachedVoices.filter((v) => v.lang?.toLowerCase().startsWith('en'))
  if (!enVoices.length) return null
  return [...enVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
}

export function speakEnglish(text) {
  if (!canSpeak() || !text) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.95

  const voice = pickBestVoice()
  if (voice) {
    try {
      utterance.voice = voice
    } catch {
      // 음성 선택에 실패해도 기본 음성으로 계속 재생
    }
  }

  window.speechSynthesis.speak(utterance)
}
