// 뉴스 데이터 소스.
// 지금은 고정 샘플 3개를 반환하지만, 추후 NewsAPI 등 실제 API로 교체할 수 있도록
// fetchNews()라는 단일 인터페이스로 감싸둠. News.jsx는 이 함수만 호출하면 됨.

const SAMPLE_NEWS = [
  {
    id: 'n1',
    category: '기술',
    titleEn: 'AI Tools Are Reshaping How Students Learn Languages',
    titleKo: 'AI 도구가 언어 학습 방식을 바꾸고 있다',
    summary:
      '전 세계 학생들이 AI 챗봇과 앱을 활용해 외국어를 배우는 사례가 늘고 있다. 실시간 교정과 맞춤형 대화 연습이 가능해지면서 기존 교재 중심 학습을 보완하고 있다. 전문가들은 AI가 완전한 대체재는 아니지만 훌륭한 연습 상대가 될 수 있다고 말한다.',
    words: [
      { word: 'reshape', meaning: '다시 형성하다' },
      { word: 'fluency', meaning: '유창함' },
      { word: 'tailored', meaning: '맞춤화된' }
    ]
  },
  {
    id: 'n2',
    category: '라이프스타일',
    titleEn: 'Why More People Are Taking Slow Mornings Seriously',
    titleKo: '왜 사람들은 여유로운 아침을 중요하게 여길까',
    summary:
      '바쁜 일상 속에서 아침 루틴을 천천히 시작하는 사람들이 늘고 있다. 커피 한 잔, 짧은 산책, 일기 쓰기 같은 작은 습관이 하루 전체의 스트레스를 줄여준다는 연구 결과가 나왔다. 전문가들은 완벽한 루틴보다 꾸준함이 더 중요하다고 조언한다.',
    words: [
      { word: 'routine', meaning: '루틴, 일과' },
      { word: 'mindful', meaning: '마음을 챙기는' },
      { word: 'consistency', meaning: '꾸준함' }
    ]
  },
  {
    id: 'n3',
    category: '환경',
    titleEn: 'Small Cities Are Leading the Way in Urban Green Spaces',
    titleKo: '소도시들이 도심 녹지 조성을 선도하고 있다',
    summary:
      '대도시보다 작은 규모의 도시들이 공원과 녹지 확충에 더 적극적으로 나서고 있다. 주민 참여형 프로젝트를 통해 유휴 부지를 정원으로 바꾸는 사례가 대표적이다. 이런 변화는 삶의 질 향상뿐 아니라 지역 공동체 회복에도 기여하고 있다.',
    words: [
      { word: 'urban', meaning: '도시의' },
      { word: 'initiative', meaning: '계획, 주도' },
      { word: 'community', meaning: '공동체' }
    ]
  }
]

// 추후: return fetch('https://newsapi.org/...').then(...) 형태로 교체
export async function fetchNews() {
  return SAMPLE_NEWS
}
