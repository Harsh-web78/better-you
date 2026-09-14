// Program start date — used to label transformation checkpoints ("Week 4"
// etc.) relative to when you actually began. Set once, first run, and
// never overwritten after that.
const KEY = 'betterYou:meta'

export function ensureStartDate(today) {
  try {
    const raw = window.localStorage.getItem(KEY)
    const meta = raw ? JSON.parse(raw) : {}
    if (!meta.startDate) {
      meta.startDate = today
      window.localStorage.setItem(KEY, JSON.stringify(meta))
    }
    return meta.startDate
  } catch {
    return today
  }
}

export function getStartDate() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw).startDate : null
  } catch {
    return null
  }
}
