import { canSpeak, speakText } from '../utils/speech.js'

export default function SpeakButton({ text, lang = 'en-US', className = '' }) {
  if (!canSpeak() || !text) return null

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speakText(text, lang)
      }}
      aria-label="발음 듣기"
      className={`inline-flex items-center justify-center rounded-full bg-cardgreen text-forest w-7 h-7 shrink-0 active:scale-90 transition ${className}`}
    >
      🔊
    </button>
  )
}
