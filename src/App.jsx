import { useState } from 'react'
import TabBar from './components/TabBar.jsx'
import Home from './screens/Home.jsx'
import Record from './screens/Record.jsx'
import News from './screens/News.jsx'
import Podcast from './screens/Podcast.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  // 다른 탭에서 기록 탭으로 넘어갈 때 미리 채워줄 텍스트/문맥
  const [recordSeed, setRecordSeed] = useState(null)

  function goToRecord(seed) {
    setRecordSeed(seed || null)
    setTab('record')
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-app min-h-screen bg-cream relative pb-20">
        {tab === 'home' && <Home onStartRecord={goToRecord} />}
        {tab === 'record' && (
          <Record seed={recordSeed} onDone={() => setRecordSeed(null)} />
        )}
        {tab === 'news' && <News onWriteAbout={goToRecord} />}
        {tab === 'podcast' && <Podcast />}
      </div>
      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
