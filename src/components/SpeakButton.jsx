import { canSpeak, speakEnglish } from '../utils/speech.js'

export default function SpeakButton({ text, className = '' }) {
  if (!canSpeak() || !text) return null

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speakEnglish(text)
      }}
      aria-label="영어 발음 듣기"
      className={`inline-flex items-center justify-center rounded-full bg-cardgreen text-forest w-7 h-7 shrink-0 active:scale-90 transition ${className}`}
    >
      🔊
    </button>
  )
}
