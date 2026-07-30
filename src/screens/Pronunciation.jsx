import { useState } from 'react'
import { PRONUNCIATION_TOPICS } from '../utils/pronunciationData.js'
import SpeakButton from '../components/SpeakButton.jsx'

export default function Pronunciation() {
  const [openId, setOpenId] = useState(PRONUNCIATION_TOPICS[0]?.id ?? null)

  return (
    <div className="px-5 pt-6 pb-4">
      <h1 className="text-[19px] font-bold text-forest mb-1">발음 가이드</h1>
      <p className="text-[13px] text-forest/60 mb-5">
        한국인이 자주 헷갈리는 영어 발음 포인트를 모았어요
      </p>

      <div className="space-y-3">
        {PRONUNCIATION_TOPICS.map((topic) => {
          const isOpen = openId === topic.id
          return (
            <div
              key={topic.id}
              className="bg-white border border-[#e7e2d5] rounded-card overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[18px]">{topic.emoji}</span>
                  <span className="text-[15px] font-bold text-forest">{topic.title}</span>
                </span>
                <span className="text-[12px] text-forest/40 shrink-0 ml-2">
                  {isOpen ? '접기' : '보기'}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-[#e7e2d5]">
                  <p className="text-[13px] text-forest/70 leading-relaxed mt-3 mb-3">
                    {topic.tip}
                  </p>
                  <div className="space-y-2">
                    {topic.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 bg-cardgreen/60 rounded-[10px] px-3 py-2.5"
                      >
                        <div>
                          <p className="text-[14px] font-bold text-forest">{ex.word}</p>
                          <p className="text-[12px] text-forest/60 mt-0.5">{ex.note}</p>
                        </div>
                        <SpeakButton text={ex.word} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
