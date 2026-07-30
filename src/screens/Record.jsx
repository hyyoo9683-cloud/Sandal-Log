import { useEffect, useRef, useState } from 'react'
import { getKoreanSuggestions, getTargetCorrections } from '../utils/api.js'
import { getDraft, saveDraft, clearDraft, addRecord } from '../utils/storage.js'
import { fileToResizedDataUrl } from '../utils/image.js'
import SpeakButton from '../components/SpeakButton.jsx'

const MODE_A = 'A'
const MODE_B = 'B'

const LANGUAGES = [
  {
    code: 'en',
    label: '영어',
    flag: '🇺🇸',
    speech: 'en-US',
    placeholder: 'Write about your day in English... (Press Enter for AI suggestions)'
  },
  {
    code: 'fr',
    label: '프랑스어',
    flag: '🇫🇷',
    speech: 'fr-FR',
    placeholder: 'Écrivez votre journée en français... (Appuyez sur Entrée pour des suggestions)'
  }
]

function langInfo(code) {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0]
}

function seedHint(seed) {
  if (!seed) return null
  if (seed.type === 'culture' && seed.card) {
    const exp = seed.card.expressions?.[0]
    if (exp) return `💡 오늘의 표현: ${exp.english} (${exp.korean})`
    return `💡 오늘의 문화카드: ${seed.card.title}`
  }
  if (seed.type === 'news' && seed.article) {
    return `📰 ${seed.article.titleKo}`
  }
  return null
}

export default function Record({ seed, onDone }) {
  const [mode, setMode] = useState(MODE_A)
  const [lang, setLang] = useState('en')
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [saved, setSaved] = useState(null)
  const lastFetchedText = useRef('')

  // 임시저장 복원 (seed가 없을 때만)
  useEffect(() => {
    if (seed) return
    const draft = getDraft()
    if (draft) {
      setMode(draft.mode || MODE_A)
      setLang(draft.lang || 'en')
      setText(draft.text || '')
      setSuggestions(draft.suggestions || [])
      setSelectedIndex(draft.selectedIndex ?? null)
      setPhoto(draft.photo || null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 자동 임시저장
  useEffect(() => {
    if (saved) return
    saveDraft({ mode, lang, text, suggestions, selectedIndex, photo })
  }, [mode, lang, text, suggestions, selectedIndex, photo, saved])

  // 글자 수가 부족해지면 이전 제안은 정리 (자동 호출은 하지 않음 - 엔터 눌렀을 때만 호출)
  useEffect(() => {
    if (text.trim().length < 5) {
      setSuggestions([])
      setSelectedIndex(null)
      setError(null)
    }
  }, [text])

  function handleTextKeyDown(e) {
    if (e.key !== 'Enter' || e.shiftKey) return
    if (saved || loading) return
    if (text.trim().length < 5) return
    e.preventDefault()
    if (text === lastFetchedText.current) return
    fetchSuggestions(text)
  }

  async function fetchSuggestions(value) {
    setLoading(true)
    setError(null)
    setSelectedIndex(null)
    try {
      const result =
        mode === MODE_A
          ? await getKoreanSuggestions(value, lang)
          : await getTargetCorrections(value, lang)
      setSuggestions(result.suggestions || [])
      lastFetchedText.current = value
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function switchMode(next) {
    if (next === mode) return
    setMode(next)
    setSuggestions([])
    setSelectedIndex(null)
    setError(null)
    lastFetchedText.current = ''
  }

  function switchLang(next) {
    if (next === lang) return
    setLang(next)
    setSuggestions([])
    setSelectedIndex(null)
    setError(null)
    lastFetchedText.current = ''
  }

  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await fileToResizedDataUrl(file)
      setPhoto(dataUrl)
    } catch (err) {
      setError(err.message)
    }
  }

  function handleSave() {
    if (!text.trim()) return
    const chosen = selectedIndex !== null ? suggestions[selectedIndex] : null
    const record = addRecord({
      mode,
      lang,
      original: text,
      english: chosen?.target || null,
      korean: chosen?.korean || null,
      words: chosen?.words || [],
      change: chosen?.change || null,
      photo,
      seed: seed || null
    })
    clearDraft()
    setSaved(record)
  }

  function resetForNext() {
    setSaved(null)
    setText('')
    setSuggestions([])
    setSelectedIndex(null)
    setPhoto(null)
    setError(null)
    lastFetchedText.current = ''
    onDone?.()
  }

  if (saved) {
    return (
      <div className="px-5 pt-10 flex flex-col items-center text-center">
        <p className="text-[22px] mb-6">🌿</p>
        <h1 className="text-[19px] font-bold text-forest mb-6">오늘의 기록이 쌓였어요 🌿</h1>

        {saved.english && (
          <div className="w-full bg-cardgreen rounded-card p-5 mb-4 text-left">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[15px] font-bold text-forest">{saved.english}</p>
              <SpeakButton text={saved.english} lang={langInfo(saved.lang).speech} className="mt-0.5" />
            </div>
            {saved.korean && <p className="text-[13px] text-forest/70 mt-1">{saved.korean}</p>}
          </div>
        )}

        {saved.words?.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {saved.words.map((w, i) => (
              <span
                key={i}
                className="bg-sage/30 text-forest text-[12px] font-semibold px-3 py-1.5 rounded-full"
              >
                {w.word} · {w.meaning}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={resetForNext}
          className="w-full bg-forest text-white text-[15px] font-bold rounded-card py-3.5"
        >
          홈으로
        </button>
      </div>
    )
  }

  const hint = seedHint(seed)
  const current = langInfo(lang)

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[19px] font-bold text-forest mb-4">오늘의 기록</h1>

      {hint && (
        <div className="bg-cardgreen rounded-[10px] px-3.5 py-2.5 mb-4">
          <p className="text-[13px] text-forest/80">{hint}</p>
        </div>
      )}

      <div className="flex gap-1.5 mb-3">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => switchLang(l.code)}
            className={`text-[12px] font-semibold rounded-full px-3 py-1.5 transition ${
              lang === l.code
                ? 'bg-sage/30 text-forest border border-sage'
                : 'bg-white text-forest/50 border border-[#e7e2d5]'
            }`}
          >
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      <div className="flex bg-cardgreen rounded-full p-1 mb-4">
        <button
          onClick={() => switchMode(MODE_A)}
          className={`flex-1 text-[13px] font-semibold rounded-full py-2 transition ${
            mode === MODE_A ? 'bg-forest text-white' : 'text-forest/60'
          }`}
        >
          한국어로 써요
        </button>
        <button
          onClick={() => switchMode(MODE_B)}
          className={`flex-1 text-[13px] font-semibold rounded-full py-2 transition ${
            mode === MODE_B ? 'bg-forest text-white' : 'text-forest/60'
          }`}
        >
          {current.label}로 써요
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleTextKeyDown}
        placeholder={
          mode === MODE_A
            ? '오늘 있었던 일을 한국어로 적어보세요... (엔터로 AI 제안 받기)'
            : current.placeholder
        }
        rows={4}
        className="w-full bg-white border border-[#e7e2d5] rounded-card p-4 text-[15px] text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage resize-none"
      />

      <div className="mt-3">
        <label className="inline-flex items-center gap-2 text-[13px] font-semibold text-forest/70 bg-white border border-[#e7e2d5] rounded-full px-3.5 py-2 cursor-pointer">
          📷 사진 첨부
          <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </label>
        {photo && (
          <div className="relative mt-3 inline-block">
            <img src={photo} alt="첨부 사진" className="w-24 h-24 object-cover rounded-[10px]" />
            <button
              onClick={() => setPhoto(null)}
              className="absolute -top-2 -right-2 bg-forest text-white text-[11px] w-6 h-6 rounded-full"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="mt-5">
        {loading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-cardgreen rounded-card p-4 animate-pulse">
                <div className="h-4 w-2/3 bg-sage/30 rounded mb-2" />
                <div className="h-3 w-full bg-sage/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-cardgreen rounded-card p-4">
            <p className="text-[13px] text-forest/70 mb-2">{error}</p>
            <button
              onClick={() => fetchSuggestions(text)}
              className="text-[13px] font-semibold text-forest underline"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <div className="space-y-3">
            <p className="text-[13px] font-semibold text-forest/50">
              {mode === MODE_A ? 'AI 제안 문장' : 'AI 교정 제안'}
            </p>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-full text-left rounded-card p-4 border transition ${
                  selectedIndex === i
                    ? 'bg-sage/25 border-sage'
                    : 'bg-white border-[#e7e2d5]'
                }`}
              >
                <p className="text-[15px] font-bold text-forest">{s.target}</p>
                <p className="text-[13px] text-forest/70 mt-1">{s.korean}</p>

                {mode === MODE_A && s.words?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.words.map((w, wi) => (
                      <span
                        key={wi}
                        className="text-[11px] font-semibold text-forest bg-cardgreen px-2 py-1 rounded-full"
                      >
                        {w.word} = {w.meaning}
                      </span>
                    ))}
                  </div>
                )}

                {mode === MODE_B && s.change && (
                  <p className="text-[12px] text-forest/50 mt-2 italic">{s.change}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={!text.trim()}
        className="w-full mt-6 bg-forest disabled:bg-forest/30 text-white text-[15px] font-bold rounded-card py-3.5"
      >
        기록 저장하기
      </button>
    </div>
  )
}
