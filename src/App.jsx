import { useState } from 'react'
import TabBar from './components/TabBar.jsx'
import Home from './screens/Home.jsx'
import Record from './screens/Record.jsx'
import News from './screens/News.jsx'
import Podcast from './screens/Podcast.jsx'
import History from './screens/History.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  // 다른 탭에서 기록 탭으로 넘어갈 때 미리 채워줄 텍스트/문맥
  const [recordSeed, setRecordSeed] = useState(null)

  function goToRecord(seed) {
    setRecordSeed(seed || null)
    setTab('record')
  }

  return (
    <div className="min-h-screen bg-cream md:flex md:justify-center">
      <div className="md:flex md:w-full md:max-w-4xl md:items-start md:gap-8 md:px-6 md:py-10">
        <TabBar active={tab} onChange={setTab} />

        <div className="mx-auto max-w-app md:mx-0 md:max-w-xl min-h-screen md:min-h-0 bg-cream md:bg-white relative pb-20 md:pb-10 md:rounded-2xl md:border md:border-[#e7e2d5] md:shadow-sm">
          {tab === 'home' && <Home onStartRecord={goToRecord} />}
          {tab === 'record' && (
            <Record seed={recordSeed} onDone={() => setRecordSeed(null)} />
          )}
          {tab === 'news' && <News onWriteAbout={goToRecord} />}
          {tab === 'podcast' && <Podcast />}
          {tab === 'history' && <History />}
        </div>
      </div>
    </div>
  )
}
