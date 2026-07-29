import { useEffect, useState } from 'react'
import { getRecords } from '../utils/storage.js'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function formatDate(iso) {
  const d = new Date(iso)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = WEEKDAYS[d.getDay()]
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${m}월 ${day}일 (${weekday}) ${hh}:${mm}`
}

function modeLabel(mode) {
  return mode === 'B' ? '영어로 씀' : '한국어로 씀'
}

export default function History() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    setRecords(getRecords())
  }, [])

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
        {records.map((r) => (
          <div key={r.id} className="bg-white border border-[#e7e2d5] rounded-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-forest bg-cardgreen px-2 py-0.5 rounded-full">
                {modeLabel(r.mode)}
              </span>
              <span className="text-[11px] text-forest/40">{formatDate(r.createdAt)}</span>
            </div>

            {r.english ? (
              <>
                <p className="text-[15px] font-bold text-forest">{r.english}</p>
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
          </div>
        ))}
      </div>
    </div>
  )
}
