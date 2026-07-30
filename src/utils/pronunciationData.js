// 한국인이 자주 헷갈리는 발음 가이드 (정적 데이터, AI 호출 없음)

export const EN_PRONUNCIATION_TOPICS = [
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

export const FR_PRONUNCIATION_TOPICS = [
  {
    id: 'fr-r',
    emoji: '🗣️',
    title: '프랑스어 R',
    tip: '한국어 ㄹ이나 영어 R과 완전히 달라요. 혀 끝은 아래 앞니 뒤에 두고, 목구멍 안쪽에서 가글하듯 울려서 내는 소리예요.',
    examples: [
      { word: 'rouge', note: '빨간색 — 목구멍에서 가글하듯' },
      { word: 'rue', note: '거리, 길' },
      { word: 'Paris', note: '파리 — 끝의 r도 목구멍 소리' },
      { word: 'merci', note: '고마워요' }
    ]
  },
  {
    id: 'fr-nasal',
    emoji: '👃',
    title: '콧소리 모음 (an / on / in)',
    tip: '한국어엔 없는 소리예요. 입은 모음 모양을 만들되, 입으로 나가는 공기를 막고 코로 소리를 내보내요.',
    examples: [
      { word: 'bon', note: '좋은 — [옹] 콧소리' },
      { word: 'pain', note: '빵 — [앙] 콧소리' },
      { word: 'enfant', note: '아이 — [엉펑] 콧소리 두 번' },
      { word: 'un', note: '하나 — [엉] 콧소리' }
    ]
  },
  {
    id: 'fr-silent-consonant',
    emoji: '🤫',
    title: '끝자음 묵음',
    tip: '단어 끝의 자음은 대부분 소리 내지 않아요. c, r, f, l로 끝나면 대체로 소리를 내는 편이에요(단어 "CaReFuL"로 외워보세요).',
    examples: [
      { word: 'petit', note: '작은 — 끝의 t는 묵음' },
      { word: 'beaucoup', note: '많이 — 끝의 p는 묵음' },
      { word: 'chat', note: '고양이 — 끝의 t는 묵음' },
      { word: 'chef', note: '셰프, 우두머리 — f는 소리 냄 (CaReFuL)' }
    ]
  },
  {
    id: 'fr-liaison',
    emoji: '🔗',
    title: '리에종 (연음)',
    tip: '평소엔 묵음인 끝자음이, 다음 단어가 모음으로 시작하면 이어서 소리가 나요. 단어를 뚝뚝 끊지 말고 연결해서 읽어보세요.',
    examples: [
      { word: 'les amis', note: '친구들 — "레자미"처럼 이어짐' },
      { word: 'vous avez', note: '당신은 가지고 있다 — "부자베"' },
      { word: 'nous avons', note: '우리는 가지고 있다 — "누자봉"' }
    ]
  },
  {
    id: 'fr-u-vs-ou',
    emoji: '👄',
    title: 'U vs OU',
    tip: 'u [y]는 "이" 입모양을 만든 채로 입술만 동그랗게 오므려서 내는, 한국어에 없는 소리예요. ou [u]는 한국어 "우"와 비슷해요.',
    examples: [
      { word: 'tu', note: '너 — u 발음, 입술 동그랗게' },
      { word: 'tout', note: '모두 — ou 발음, 한국어 "우"' },
      { word: 'rue', note: '거리 — u 발음' },
      { word: 'roue', note: '바퀴 — ou 발음' }
    ]
  },
  {
    id: 'fr-accent',
    emoji: '📐',
    title: '악상(accent)에 따른 모음 구분',
    tip: 'é는 입을 옆으로 당겨서 짧고 또렷하게 [에], è/ê는 입을 좀 더 벌려서 [애]에 가깝게 발음해요.',
    examples: [
      { word: 'étudiant', note: '학생 — é는 [에]' },
      { word: 'père', note: '아버지 — è는 좀 더 벌어진 [애]' },
      { word: 'être', note: '~이다 — ê도 벌어진 소리' }
    ]
  }
]

// 하위 호환용 (예전엔 영어 목록만 있었음)
export const PRONUNCIATION_TOPICS = EN_PRONUNCIATION_TOPICS
