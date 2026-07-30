import { useEffect, useState } from 'react'
import { getCultureCard as fetchCultureCard, getTopicRecommendations } from '../utils/api.js'
import {
  getCultureCard as readCachedCard,
  saveCultureCard,
  todayKey,
  getRecords,
  getTopicsCache,
  saveTopicsCache
} from '../utils/storage.js'
import SpeakButton from '../components/SpeakButton.jsx'

const MIN_RECORDS_FOR_TOPICS = 3
const MAX_ENTRIES_FOR_TOPICS = 20

function getGreeting(hour) {
  if (hour >= 6 && hour < 12) {
    return { text: '좋은 아침이에요 ☀️', sub: '오늘도 산들바람처럼' }
  }
  if (hour >= 12 && hour < 18) {
    return { text: '오후도 여유롭게 🌿', sub: '오늘 어떤 순간이 있었나요?' }
  }
  if (hour >= 18 && hour < 22) {
    return { text: '오늘 하루 수고했어요 🌙', sub: '오늘의 한 문장을 남겨볼까요?' }
  }
  return { text: '늦은 밤이네요 ✨', sub: '오늘을 한 줄로 기록해볼까요?' }
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 390 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="390" height="180" fill="#eaf3de" rx="0" />
      {/* 산 능선 */}
      <path d="M0 140 L60 90 L120 130 L180 70 L240 125 L300 85 L390 135 L390 180 L0 180 Z" fill="#c9e3a8" opacity="0.7" />
      <path d="M0 160 L80 120 L160 150 L230 110 L320 150 L390 130 L390 180 L0 180 Z" fill="#97c459" opacity="0.85" />
      {/* 바람 결 */}
      <path d="M40 50 Q70 40 100 50 T160 50" stroke="#1a3d0a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M220 35 Q250 25 280 35 T340 35" stroke="#1a3d0a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M30 75 Q55 68 80 75" stroke="#1a3d0a" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25" />
      {/* 해/달 느낌의 원 */}
      <circle cx="320" cy="45" r="18" fill="#f6d97a" opacity="0.9" />
    </svg>
  )
}

export default function Home({ onStartRecord }) {
  const [greeting, setGreeting] = useState(() => getGreeting(new Date().getHours()))
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [topics, setTopics] = useState(null) // null = 아직 로드 전, [] = 추천 없음
  const [topicsLoading, setTopicsLoading] = useState(false)
  const [topicsError, setTopicsError] = useState(null)
  const [expandedTopic, setExpandedTopic] = useState(null)

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()))
    loadCultureCard()
    loadTopics()
  }, [])

  async function loadCultureCard() {
    const key = todayKey()
    const cached = readCachedCard(key)
    if (cached) {
      setCard(cached)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await fetchCultureCard()
      setCard(result)
      saveCultureCard(result, key)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadTopics(force = false) {
    const records = getRecords()
    if (records.length < MIN_RECORDS_FOR_TOPICS) {
      setTopics([])
      return
    }

    const key = todayKey()
    if (!force) {
      const cached = getTopicsCache(key)
      if (cached) {
        setTopics(cached)
        return
      }
    }

    const entriesText = records
      .slice(0, MAX_ENTRIES_FOR_TOPICS)
      .map((r) => r.original)
      .filter(Boolean)
      .join('\n')

    if (!entriesText.trim()) {
      setTopics([])
      return
    }

    setTopicsLoading(true)
    setTopicsError(null)
    try {
      const result = await getTopicRecommendations(entriesText)
      const list = result.topics || []
      setTopics(list)
      saveTopicsCache(list, key)
    } catch (err) {
      setTopicsError(err.message)
    } finally {
      setTopicsLoading(false)
    }
  }

  return (
    <div className="px-5 pt-6">
      <HeroIllustration />

      <div className="mt-6">
        <h1 className="text-[20px] font-bold text-forest leading-snug">{greeting.text}</h1>
        <p className="text-[15px] text-forest/70 mt-1">{greeting.sub}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-[13px] font-semibold text-forest/60 mb-2 tracking-wide">오늘의 문화카드</h2>

        {loading && (
          <div className="bg-cardgreen rounded-card p-5 animate-pulse">
            <div className="h-4 w-24 bg-sage/30 rounded mb-3" />
            <div className="h-5 w-full bg-sage/30 rounded mb-2" />
            <div className="h-3 w-full bg-sage/20 rounded mb-1" />
            <div className="h-3 w-3/4 bg-sage/20 rounded" />
          </div>
        )}

        {!loading && error && (
          <div className="bg-cardgreen rounded-card p-5">
            <p className="text-[14px] text-forest/70 mb-3">{error}</p>
            <button
              onClick={loadCultureCard}
              className="text-[13px] font-semibold text-forest underline"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {!loading && !error && card && (
          <div className="bg-cardgreen rounded-card p-5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[18px]">{card.emoji}</span>
              <span className="text-[12px] font-semibold text-forest/60 bg-white/60 px-2 py-0.5 rounded-full">
                {card.category}
              </span>
            </div>
            <h3 className="text-[16px] font-bold text-forest mb-2">{card.title}</h3>
            <p className="text-[14px] text-forest/80 leading-relaxed mb-4">{card.description}</p>

            <div className="space-y-3">
              {(card.expressions || []).slice(0, 2).map((exp, i) => (
                <div key={i} className="bg-white/70 rounded-[10px] p-3">
                  <p className="text-[14px] font-bold text-forest">{exp.english}</p>
                  <p className="text-[13px] text-forest/70 mt-0.5">{exp.korean}</p>
                  <p className="text-[12px] text-forest/50 mt-1 italic">{exp.example}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onStartRecord({ type: 'culture', card })}
              className="w-full mt-4 bg-forest text-white text-[14px] font-semibold rounded-[10px] py-3"
            >
              이 표현으로 기록하기
            </button>
          </div>
        )}
      </div>

      {(topicsLoading || topicsError || (topics && topics.length > 0)) && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-semibold text-forest/60 tracking-wide">
              나의 기록에서 발견한 주제
            </h2>
            {!topicsLoading && (topics?.length > 0 || topicsError) && (
              <button
                onClick={() => loadTopics(true)}
                className="text-[11px] font-semibold text-forest/50 underline"
              >
                다시 추천받기
              </button>
            )}
          </div>

          {topicsLoading && (
            <div className="bg-cardgreen rounded-card p-5 animate-pulse">
              <div className="h-4 w-24 bg-sage/30 rounded" />
            </div>
          )}

          {!topicsLoading && topicsError && (
            <div className="bg-cardgreen rounded-card p-4">
              <p className="text-[13px] text-forest/70 mb-2">{topicsError}</p>
              <button
                onClick={() => loadTopics(true)}
                className="text-[13px] font-semibold text-forest underline"
              >
                다시 시도하기
              </button>
            </div>
          )}

          {!topicsLoading && !topicsError && topics && topics.length > 0 && (
            <div className="space-y-2">
              {topics.map((topic) => {
                const isOpen = expandedTopic === topic.title
                return (
                  <div
                    key={topic.title}
                    className="bg-white border border-[#e7e2d5] rounded-card overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTopic(isOpen ? null : topic.title)}
                      className="w-full flex items-center justify-between px-4 py-3"
                    >
                      <span className="flex items-center gap-2 text-[14px] font-bold text-forest">
                        <span>{topic.emoji}</span>
                        {topic.title}
                      </span>
                      <span className="text-[12px] text-forest/40">{isOpen ? '접기' : '보기'}</span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-3 space-y-2 border-t border-[#e7e2d5]">
                        {(topic.items || []).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-2 bg-cardgreen/60 rounded-[10px] px-3 py-2"
                          >
                            <div>
                              <p className="text-[13px] font-semibold text-forest">{item.english}</p>
                              <p className="text-[12px] text-forest/60">{item.korean}</p>
                            </div>
                            <SpeakButton text={item.english} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => onStartRecord(null)}
        className="w-full mt-6 bg-sage text-forest text-[15px] font-bold rounded-card py-3.5 shadow-sm"
      >
        오늘의 기록 시작하기
      </button>
    </div>
  )
}
