// 팟캐스트 데이터 소스.
// 지금은 고정 추천 4개를 반환하지만, 추후 RSS 피드를 파싱해 채울 수 있도록
// fetchPodcasts()라는 단일 인터페이스로 감싸둠.

const SAMPLE_PODCASTS = [
  {
    id: 'p1',
    name: 'The English We Speak',
    publisher: 'BBC',
    description: '매회 하나의 재미있는 일상 영어 표현을 짧게 소개하는 프로그램이에요.',
    level: '초급',
    episode: '“Cost an arm and a leg” — 엄청 비싸다는 표현',
    expressions: [
      { english: 'cost an arm and a leg', korean: '값이 엄청 비싸다' },
      { english: 'break the bank', korean: '큰돈이 들다' },
      { english: 'a steal', korean: '아주 저렴한 물건' }
    ],
    appleUrl: 'https://podcasts.apple.com/us/podcast/the-english-we-speak/id659940995'
  },
  {
    id: 'p2',
    name: '6 Minute English',
    publisher: 'BBC',
    description: '6분 안에 시사 주제를 다루며 핵심 어휘를 배우는 짧고 가벼운 프로그램이에요.',
    level: '초급',
    episode: 'Why do we procrastinate?',
    expressions: [
      { english: 'procrastinate', korean: '미루다, 꾸물거리다' },
      { english: 'get round to it', korean: '~할 시간을 내다' },
      { english: 'in the long run', korean: '장기적으로 보면' }
    ],
    appleUrl: 'https://podcasts.apple.com/us/podcast/6-minute-english/id1710599439'
  },
  {
    id: 'p3',
    name: 'All Ears English',
    publisher: 'Lindsay & Michelle',
    description: '미국인의 일상 문화와 자연스러운 회화 표현을 재미있게 다루는 팟캐스트예요.',
    level: '중급',
    episode: 'How to Sound More Confident in English',
    expressions: [
      { english: 'to wing it', korean: '준비 없이 즉흥적으로 하다' },
      { english: 'small talk', korean: '가벼운 잡담' },
      { english: 'to speak your mind', korean: '솔직하게 의견을 말하다' }
    ],
    appleUrl: 'https://podcasts.apple.com/us/podcast/all-ears-english-podcast/id936753859'
  },
  {
    id: 'p4',
    name: 'Stuff You Should Know',
    publisher: 'iHeartPodcasts',
    description: '역사, 과학, 문화 등 다양한 주제를 깊이 있게 다루는 대표적인 미국 팟캐스트예요.',
    level: '중급',
    episode: 'How Jet Lag Works',
    expressions: [
      { english: 'circadian rhythm', korean: '생체 리듬' },
      { english: 'to adjust to', korean: '~에 적응하다' },
      { english: 'a rule of thumb', korean: '경험에서 나온 대략적인 규칙' }
    ],
    appleUrl: 'https://podcasts.apple.com/us/podcast/stuff-you-should-know/id278981407'
  }
]

// 추후: RSS 피드 파싱 결과로 교체
export async function fetchPodcasts() {
  return SAMPLE_PODCASTS
}
