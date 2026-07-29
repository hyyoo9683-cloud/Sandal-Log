const TABS = [
  { key: 'home', label: '홈', icon: HomeIcon },
  { key: 'record', label: '기록', icon: RecordIcon },
  { key: 'news', label: '뉴스', icon: NewsIcon },
  { key: 'podcast', label: '팟캐스트', icon: PodcastIcon },
  { key: 'history', label: '기록함', icon: HistoryIcon }
]

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 11.5L12 4L20 11.5" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V10" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RecordIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 4H15L19 8V20H5V4Z" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 12H16M8 16H13" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function NewsIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="15" rx="1.5" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" />
      <path d="M7.5 9H16.5M7.5 12.5H16.5M7.5 16H13" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PodcastIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="4" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" />
      <path d="M12 13V20M9 20H15" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HistoryIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C9.5 20 7.26 18.86 5.79 17.06" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20V17.06H6.94" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V12L14.5 13.5" stroke={active ? '#1a3d0a' : '#9ca38f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TabBar({ active, onChange }) {
  return (
    <>
      {/* 모바일: 하단 탭바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 mx-auto max-w-app bg-white border-t border-[#e7e2d5] safe-bottom z-40">
        <div className="grid grid-cols-5">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = active === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className="flex flex-col items-center justify-center gap-1 py-2.5"
              >
                <Icon active={isActive} />
                <span
                  className={`text-[10px] ${isActive ? 'text-forest font-semibold' : 'text-[#9ca38f]'}`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* PC: 좌측 사이드바 */}
      <nav className="hidden md:flex md:flex-col md:w-52 md:shrink-0 md:sticky md:top-10 md:self-start md:gap-1">
        <p className="px-3 pb-5 text-[16px] font-bold text-forest">🌿 산들로그</p>
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition ${
                isActive ? 'bg-cardgreen' : 'hover:bg-cardgreen/50'
              }`}
            >
              <Icon active={isActive} />
              <span
                className={`text-[14px] ${isActive ? 'text-forest font-semibold' : 'text-[#9ca38f]'}`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
