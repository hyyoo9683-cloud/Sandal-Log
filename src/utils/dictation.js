// 브라우저 내장 음성 인식 API로 말한 내용을 텍스트로 받아쓰는 유틸 (무료, API 키 불필요)

function getRecognitionClass() {
  return typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
}

export function canListen() {
  return !!getRecognitionClass()
}

// onResult(transcript), onEnd(), onError(message) 콜백을 받아 인식기를 만들고 바로 시작한다.
// 반환된 객체의 .stop()으로 중간에 멈출 수 있다.
export function startListening(lang, { onResult, onEnd, onError }) {
  const RecognitionClass = getRecognitionClass()
  if (!RecognitionClass) {
    onError?.('이 브라우저는 음성 입력을 지원하지 않아요.')
    return { stop() {} }
  }

  const recognizer = new RecognitionClass()
  recognizer.lang = lang
  recognizer.interimResults = false
  recognizer.maxAlternatives = 1

  recognizer.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(' ')
      .trim()
    if (transcript) onResult?.(transcript)
  }

  recognizer.onerror = (event) => {
    if (event.error === 'no-speech') {
      onError?.('음성이 들리지 않았어요. 다시 시도해주세요.')
    } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      onError?.('마이크 권한을 허용해주세요.')
    } else {
      onError?.('음성 인식 중 문제가 발생했어요.')
    }
  }

  recognizer.onend = () => onEnd?.()

  try {
    recognizer.start()
  } catch {
    onError?.('음성 인식을 시작하지 못했어요.')
  }

  return recognizer
}
