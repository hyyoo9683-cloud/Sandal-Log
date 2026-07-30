// localStorage 헬퍼 - 기록, 임시저장, 문화카드 캐싱

const RECORDS_KEY = 'sandalog_records'
const DRAFT_KEY = 'sandalog_draft'
const CULTURE_PREFIX = 'sandalog_culture_'
const TOPICS_PREFIX = 'sandalog_topics_'

function safeParse(raw, fallback) {
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ---- 기록 ----
export function getRecords() {
  return safeParse(localStorage.getItem(RECORDS_KEY), [])
}

export function addRecord(record) {
  const records = getRecords()
  const newRecord = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...record
  }
  records.unshift(newRecord)
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
  return newRecord
}

export function updateRecord(id, updates) {
  const records = getRecords()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null
  const updated = { ...records[index], ...updates }
  records[index] = updated
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
  return updated
}

export function deleteRecord(id) {
  const records = getRecords().filter((r) => r.id !== id)
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
  return records
}

// ---- 임시저장 ----
export function getDraft() {
  return safeParse(localStorage.getItem(DRAFT_KEY), null)
}

export function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY)
}

// ---- 문화카드 (날짜별 캐싱) ----
export function getCultureCard(dateKey = todayKey()) {
  return safeParse(localStorage.getItem(CULTURE_PREFIX + dateKey), null)
}

export function saveCultureCard(card, dateKey = todayKey()) {
  localStorage.setItem(CULTURE_PREFIX + dateKey, JSON.stringify(card))
}

// ---- 기록 기반 주제 추천 (날짜별 캐싱) ----
export function getTopicsCache(dateKey = todayKey()) {
  return safeParse(localStorage.getItem(TOPICS_PREFIX + dateKey), null)
}

export function saveTopicsCache(topics, dateKey = todayKey()) {
  localStorage.setItem(TOPICS_PREFIX + dateKey, JSON.stringify(topics))
}
