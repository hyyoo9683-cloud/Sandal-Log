import { useEffect, useState } from 'react'
import { fetchPodcasts } from '../utils/podcastData.js'

const LEVEL_COLOR = {
  초급: 'bg-sage/30 text-forest',
  중급: 'bg-[#f6d97a]/50 text-forest',
  고급: 'bg-[#e39a9a]/40 text-forest'
}

export default function Podcast() {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    fetchPodcasts().then(setPodcasts)
  }, [])

  return (
    <div className="px-5 pt-6">
      <h1 className="text-[19px] font-bold text-forest mb-4">추천 팟캐스트</h1>

      <div className="space-y-3">
        {podcasts.map((p) => (
          <div key={p.id} className="bg-cardgreen rounded-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[15px] font-bold text-forest">{p.name}</p>
                <p className="text-[12px] text-forest/50">{p.publisher}</p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                  LEVEL_COLOR[p.level] || 'bg-white/60 text-forest'
                }`}
              >
                {p.level}
              </span>
            </div>

            <p className="text-[13px] text-forest/80 leading-relaxed mt-2">{p.description}</p>

            <div className="bg-white/70 rounded-[10px] p-3 mt-3">
              <p className="text-[11px] font-semibold text-forest/50 mb-1">추천 에피소드</p>
              <p className="text-[13px] font-semibold text-forest">{p.episode}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {p.expressions.map((exp, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold text-forest bg-white/70 px-2 py-1 rounded-full"
                >
                  {exp.english} = {exp.korean}
                </span>
              ))}
            </div>

            <a
              href={p.appleUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-forest text-white text-[13px] font-semibold rounded-[10px] py-2.5 mt-3"
            >
              Apple Podcasts에서 듣기
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
