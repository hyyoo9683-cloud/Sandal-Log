const TABS = [
  { key: 'home', label: '홈', icon: HomeIcon },
  { key: 'record', label: '기록', icon: RecordIcon },
  { key: 'news', label: '뉴스', icon: NewsIcon },
  { key: 'podcast', label: '팟캐스트', icon: PodcastIcon }
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

export default function TabBar({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-app bg-white border-t border-[#e7e2d5] safe-bottom z-40">
      <div className="grid grid-cols-4">
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
                className={`text-[11px] ${isActive ? 'text-forest font-semibold' : 'text-[#9ca38f]'}`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
