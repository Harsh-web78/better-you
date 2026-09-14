// Local-time date helpers. Everything keys off YYYY-MM-DD in the user's
// own timezone so "today" always matches their wall clock, not UTC.

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const DAY_NAMES_FULL = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function keyToDate(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key, delta) {
  const d = keyToDate(key)
  d.setDate(d.getDate() + delta)
  return dateKey(d)
}

export function weekdayIndex(key = dateKey()) {
  return keyToDate(key).getDay() // 0 = Sunday ... 6 = Saturday
}

export function formatLongDate(key = dateKey()) {
  return keyToDate(key).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(key) {
  return keyToDate(key).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 5) return 'Still up'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

// Monday-start week containing `key`, returned as an array of 7 date keys.
export function weekDates(key = dateKey()) {
  const idx = weekdayIndex(key) // 0..6, Sun..Sat
  const mondayOffset = idx === 0 ? -6 : 1 - idx
  const monday = addDays(key, mondayOffset)
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}
