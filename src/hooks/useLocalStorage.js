import { useEffect, useRef, useState } from 'react'

// Generic localStorage-backed state. Reads once on mount, writes on every
// change. Safe against private-browsing / storage-disabled environments —
// the app just falls back to in-memory state for that session.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable — continue silently, in-memory state still works
    }
  }, [key, value])

  return [value, setValue]
}
