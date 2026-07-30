// 한국인이 자주 헷갈리는 영어 발음 가이드 (정적 데이터, AI 호출 없음)

export const PRONUNCIATION_TOPICS = [
  {
    id: 'r-vs-l',
    emoji: '👅',
    title: 'R vs L',
    tip: 'R은 혀가 입천장 어디에도 닿지 않게 뒤로 살짝 마는 느낌으로, L은 혀 끝을 윗니 뒤 잇몸에 붙였다 떼면서 발음해요.',
    examples: [
      { word: 'right', note: 'right(오른쪽/맞다) — 혀가 입천장에 안 닿아요' },
      { word: 'light', note: 'light(빛/가벼운) — 혀 끝을 잇몸에 붙여요' },
      { word: 'rice', note: 'rice(쌀)' },
      { word: 'lice', note: 'lice(이, 벌레)' },
      { word: 'play', note: 'play(놀다)' },
      { word: 'pray', note: 'pray(기도하다)' }
    ]
  },
  {
    id: 'er-sound',
    emoji: '🌀',
    title: 'ear / year / early 같은 er 발음',
    tip: '철자는 비슷해 보여도 발음이 다 달라요. ear는 [이어], year는 y로 시작하는 [이어], early/earn/learn은 강세가 있는 [어r] 소리예요.',
    examples: [
      { word: 'ear', note: '귀 — [이어]' },
      { word: 'year', note: '년, 해 — y로 시작하는 [이어]' },
      { word: 'early', note: '이른, 일찍 — [얼리]' },
      { word: 'earn', note: '벌다 — [언]' },
      { word: 'learn', note: '배우다 — [런]' },
      { word: 'world', note: '세계 — [월드]' }
    ]
  },
  {
    id: 'f-vs-p',
    emoji: '💨',
    title: 'F vs P',
    tip: 'F는 아랫입술을 윗니로 살짝 물고 바람을 내보내요. P는 입술을 완전히 붙였다가 터뜨리듯 열어요.',
    examples: [
      { word: 'coffee', note: '커피 — 아랫입술을 윗니로 살짝' },
      { word: 'copy', note: '복사 — 입술을 붙였다 떼기' },
      { word: 'fan', note: '팬, 선풍기' },
      { word: 'pan', note: '프라이팬' }
    ]
  },
  {
    id: 'v-vs-b',
    emoji: '🐝',
    title: 'V vs B',
    tip: 'V는 윗니를 아랫입술에 살짝 대고 진동시켜요(붕~). B는 입술을 완전히 닫았다가 터뜨려요.',
    examples: [
      { word: 'van', note: '밴, 승합차' },
      { word: 'ban', note: '금지하다' },
      { word: 'very', note: '매우' },
      { word: 'berry', note: '베리, 열매' }
    ]
  },
  {
    id: 'th-sound',
    emoji: '👄',
    title: 'TH 발음 (think / this)',
    tip: '혀 끝을 윗니와 아랫니 사이에 살짝 물듯이 내밀고 바람을 내보내요. 성대를 안 울리면 think, 울리면 this예요.',
    examples: [
      { word: 'think', note: '생각하다 — 성대 안 울림' },
      { word: 'sink', note: '가라앉다 — s로 발음하면 안 돼요' },
      { word: 'this', note: '이것 — 성대 울림' },
      { word: 'three', note: '셋' }
    ]
  },
  {
    id: 'short-long-vowel',
    emoji: '📏',
    title: '짧은 모음 vs 긴 모음',
    tip: '한국어엔 없는 구분이라 헷갈리기 쉬워요. ship의 i는 짧고 편하게, sheep의 ee는 입을 옆으로 더 벌려서 길게 발음해요.',
    examples: [
      { word: 'ship', note: '배 — 짧은 발음' },
      { word: 'sheep', note: '양 — 긴 발음' },
      { word: 'bit', note: '조금 — 짧은 발음' },
      { word: 'beat', note: '이기다, 박자 — 긴 발음' }
    ]
  },
  {
    id: 'final-consonant',
    emoji: '🛑',
    title: '끝소리에 모음 붙이지 않기',
    tip: '한국어 습관대로 book을 "부크으"처럼 끝에 모음을 붙이지 말고, 입 모양만 만들고 소리를 딱 멈추는 느낌으로 끝내요.',
    examples: [
      { word: 'book', note: '책 — "부크으" 아니고 "북"에서 딱 멈춤' },
      { word: 'cat', note: '고양이 — "캐트으" 아니고 "캩"' },
      { word: 'desk', note: '책상' },
      { word: 'help', note: '돕다' }
    ]
  }
]
