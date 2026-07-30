import { useEffect, useState } from 'react'
import { getRecords, updateRecord } from '../utils/storage.js'
import SpeakButton from '../components/SpeakButton.jsx'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const LANG_META = {
  en: { flag: '🇺🇸', name: '영어', speech: 'en-US' },
  fr: { flag: '🇫🇷', name: '프랑스어', speech: 'fr-FR' }
}

function langMeta(code) {
  return LANG_META[code] || LANG_META.en
}

function formatDate(iso) {
  const d = new Date(iso)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = WEEKDAYS[d.getDay()]
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${m}월 ${day}일 (${weekday}) ${hh}:${mm}`
}

function modeLabel(record) {
  if (record.mode === 'B') return `${langMeta(record.lang).name}로 씀`
  return '한국어로 씀'
}

const inputClass =
  'w-full bg-cream border border-[#e7e2d5] rounded-[10px] p-2.5 text-[13px] text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage resize-none'

function RecordEditForm({ record, onSave, onCancel }) {
  const [original, setOriginal] = useState(record.original || '')
  const [english, setEnglish] = useState(record.english || '')
  const [korean, setKorean] = useState(record.korean || '')

  function handleSave() {
    if (!original.trim()) return
    onSave({
      original: original.trim(),
      english: record.english !== null ? english.trim() || null : null,
      korean: record.korean !== null ? korean.trim() || null : null
    })
  }

  return (
    <div className="space-y-2">
      {record.english !== null && (
        <>
          <textarea
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            rows={2}
            placeholder={`${langMeta(record.lang).name} 문장`}
            className={inputClass}
          />
          <textarea
            value={korean}
            onChange={(e) => setKorean(e.target.value)}
            rows={2}
            placeholder="한글 번역"
            className={inputClass}
          />
        </>
      )}
      <textarea
        value={original}
        onChange={(e) => setOriginal(e.target.value)}
        rows={2}
        placeholder="원문"
        className={inputClass}
      />
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          className="text-[12px] font-semibold text-forest/60 px-3 py-1.5 rounded-full"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={!original.trim()}
          className="text-[12px] font-semibold text-white bg-forest disabled:bg-forest/30 px-3.5 py-1.5 rounded-full"
        >
          저장
        </button>
      </div>
    </div>
  )
}

export default function History() {
  const [records, setRecords] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    setRecords(getRecords())
  }, [])

  function handleSaveEdit(id, updates) {
    const updated = updateRecord(id, updates)
    if (updated) {
      setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)))
    }
    setEditingId(null)
  }

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[19px] font-bold text-forest mb-1">나의 기록</h1>
      <p className="text-[13px] text-forest/60 mb-5">
        지금까지 쌓인 기록이 {records.length}개 있어요
      </p>

      {records.length === 0 && (
        <div className="bg-cardgreen rounded-card p-6 text-center">
          <p className="text-[22px] mb-3">🌿</p>
          <p className="text-[14px] text-forest/70 leading-relaxed">
            아직 쌓인 기록이 없어요.
            <br />
            기록 탭에서 오늘의 한 줄을 남겨보세요.
          </p>
        </div>
      )}

      <div className="space-y-3 pb-4">
        {records.map((r) => {
          const isEditing = editingId === r.id
          return (
            <div key={r.id} className="bg-white border border-[#e7e2d5] rounded-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-forest bg-cardgreen px-2 py-0.5 rounded-full">
                  {r.english && <span>{langMeta(r.lang).flag}</span>}
                  {modeLabel(r)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-forest/40">{formatDate(r.createdAt)}</span>
                  {!isEditing && (
                    <button
                      onClick={() => setEditingId(r.id)}
                      className="text-[11px] font-semibold text-forest/60 bg-cardgreen px-2 py-0.5 rounded-full"
                    >
                      ✏️ 수정
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <RecordEditForm
                  record={r}
                  onCancel={() => setEditingId(null)}
                  onSave={(updates) => handleSaveEdit(r.id, updates)}
                />
              ) : (
                <>
                  {r.english ? (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[15px] font-bold text-forest">{r.english}</p>
                        <SpeakButton text={r.english} lang={langMeta(r.lang).speech} className="mt-0.5" />
                      </div>
                      {r.korean && <p className="text-[13px] text-forest/70 mt-1">{r.korean}</p>}
                      <p className="text-[12px] text-forest/40 mt-2 italic">{r.original}</p>
                    </>
                  ) : (
                    <p className="text-[14px] text-forest/80 leading-relaxed">{r.original}</p>
                  )}

                  {r.words?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {r.words.map((w, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold text-forest bg-cardgreen px-2 py-1 rounded-full"
                        >
                          {w.word} · {w.meaning}
                        </span>
                      ))}
                    </div>
                  )}

                  {r.photo && (
                    <img
                      src={r.photo}
                      alt="기록 사진"
                      className="w-full max-h-48 object-cover rounded-[10px] mt-3"
                    />
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
