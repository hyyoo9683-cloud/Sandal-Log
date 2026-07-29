// 브라우저 내장 음성합성 API로 영어 문장을 읽어주는 유틸 (무료, API 키 불필요)

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speakEnglish(text) {
  if (!canSpeak() || !text) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.95
  window.speechSynthesis.speak(utterance)
}
