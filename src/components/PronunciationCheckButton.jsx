import { useEffect, useRef, useState } from 'react'
import { canListen, startListening } from '../utils/dictation.js'

const SAFETY_TIMEOUT_MS = 15000

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function isCloseMatch(target, heard) {
  const t = normalize(target)
  const h = normalize(heard)
  if (!t || !h) return false
  if (t === h) return true
  return h.includes(t) || t.includes(h)
}

export default function PronunciationCheckButton({ text, lang = 'en-US' }) {
  const [status, setStatus] = useState('idle') // idle | listening | correct | different
  const [heard, setHeard] = useState('')
  const recognizerRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      recognizerRef.current?.stop?.()
      clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!canListen() || !text) return null

  function stopListening(nextStatus = 'idle') {
    clearTimeout(timeoutRef.current)
    recognizerRef.current?.stop?.()
    setStatus(nextStatus)
  }

  function handleClick() {
    if (status === 'listening') {
      stopListening('idle')
      return
    }
    setStatus('listening')
    setHeard('')
    recognizerRef.current = startListening(lang, {
      onResult: (transcript) => {
        clearTimeout(timeoutRef.current)
        setHeard(transcript)
        setStatus(isCloseMatch(text, transcript) ? 'correct' : 'different')
      },
      onEnd: () => {
        clearTimeout(timeoutRef.current)
        // 사파리 등에서 onend가 결과보다 늦게/먼저 도착해도 idle로 덮어쓰지 않도록
        setStatus((prev) => (prev === 'listening' ? 'idle' : prev))
      },
      onError: () => {
        clearTimeout(timeoutRef.current)
        setStatus('idle')
      }
    })
    // 일부 브라우저는 stop() 후에도 onend가 안 올 수 있어 안전장치로 강제 종료
    timeoutRef.current = setTimeout(() => stopListening('idle'), SAFETY_TIMEOUT_MS)
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleClick}
        className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border transition ${
          status === 'listening'
            ? 'bg-[#c94f4f]/10 border-[#c94f4f] text-[#c94f4f]'
            : 'bg-white border-[#e7e2d5] text-forest/60'
        }`}
      >
        {status === 'listening' ? '🔴 듣는 중... (탭하면 종료)' : '🎙️ 내 발음 확인'}
      </button>
      {status === 'correct' && (
        <p className="text-[11px] text-forest mt-1">✅ 정확하게 들렸어요!</p>
      )}
      {status === 'different' && (
        <p className="text-[11px] text-[#c94f4f] mt-1">🤔 "{heard}"처럼 들렸어요. 다시 해볼까요?</p>
      )}
    </div>
  )
}
