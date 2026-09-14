import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { dateKey } from '../utils/date'

// A flat, date-keyed weight log — one entry per calendar day. Shared by
// the Weight screen (manual quick-add) and the Transformation tracker
// (checkpoint weigh-ins write here too, so there's one history either way).
export function useWeightLog() {
  const [log, setLog] = useLocalStorage('betterYou:weightLog', [])

  const entries = useMemo(() => [...log].sort((a, b) => a.date.localeCompare(b.date)), [log])

  const addEntry = useCallback((date, kg) => {
    setLog((prev) => [...prev.filter((e) => e.date !== date), { date, kg }])
  }, [setLog])

  const removeEntry = useCallback((date) => {
    setLog((prev) => prev.filter((e) => e.date !== date))
  }, [setLog])

  const today = dateKey()
  const todayEntry = entries.find((e) => e.date === today) ?? null
  const latest = entries[entries.length - 1] ?? null
  const first = entries[0] ?? null
  const deltaFromFirst = latest && first && latest.date !== first.date
    ? Math.round((latest.kg - first.kg) * 10) / 10
    : 0

  return { entries, addEntry, removeEntry, todayEntry, latest, first, deltaFromFirst }
}
