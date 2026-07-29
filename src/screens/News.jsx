import { useEffect, useState } from 'react'
import { fetchNews } from '../utils/newsData.js'

export default function News({ onWriteAbout }) {
  const [articles, setArticles] = useState([])
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    fetchNews().then(setArticles)
  }, [])

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[19px] font-bold text-forest mb-4">오늘의 뉴스</h1>

      <div className="space-y-3">
        {articles.map((article) => {
          const expanded = expandedId === article.id
          return (
            <div key={article.id} className="bg-cardgreen rounded-card p-4">
              <button
                onClick={() => setExpandedId(expanded ? null : article.id)}
                className="w-full text-left"
              >
                <span className="inline-block text-[11px] font-semibold text-forest bg-white/60 px-2 py-0.5 rounded-full mb-2">
                  {article.category}
                </span>
                <p className="text-[15px] font-bold text-forest leading-snug">{article.titleEn}</p>
                <p className="text-[13px] text-forest/70 mt-1">{article.titleKo}</p>
              </button>

              {expanded && (
                <div className="mt-3 pt-3 border-t border-forest/10">
                  <p className="text-[13px] text-forest/80 leading-relaxed mb-3">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {article.words.map((w, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold text-forest bg-white/70 px-2 py-1 rounded-full"
                      >
                        {w.word} = {w.meaning}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onWriteAbout({ type: 'news', article })}
                    className="w-full bg-forest text-white text-[13px] font-semibold rounded-[10px] py-2.5"
                  >
                    이 뉴스로 한 줄 써보기
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
