import { useCallback, useEffect, useMemo, useState } from 'react';
import { addDays } from '../utils/date';

export const COMPLETION_THRESHOLD = 80; // a day counts at 80%+ checklist
const KEY = 'better-you-history-v1';
const MAX_DAYS = 120;

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v === 'object' && v.days && typeof v.days === 'object') {
      return { days: v.days, best: typeof v.best === 'number' ? v.best : 0 };
    }
  } catch {
    // malformed storage -> start clean, never crash
  }
  return { days: {}, best: 0 };
}

function isComplete(entry) {
  return !!entry && typeof entry.pct === 'number' && entry.pct >= COMPLETION_THRESHOLD;
}

// Current streak: consecutive complete days ending today, or ending
// yesterday when today is still in progress. A missing day breaks it.
export function calcStreak(days, todayKey) {
  let streak = 0;
  let cursor = isComplete(days[todayKey]) ? todayKey : addDays(todayKey, -1);
  while (isComplete(days[cursor])) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function trim(days) {
  const keys = Object.keys(days).sort();
  if (keys.length <= MAX_DAYS) return days;
  const kept = { ...days };
  for (const k of keys.slice(0, keys.length - MAX_DAYS)) delete kept[k];
  return kept;
}

// Archive of daily completion snapshots + streaks. Snapshots are written by
// the App (which owns all live state); this hook never duplicates the
// checklist/water/habit stores, it only records their reported summaries.
export function useHistory(todayKey) {
  const [store, setStore] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      // storage unavailable -> in-memory only
    }
  }, [store]);

  const recordToday = useCallback((date, snap) => {
    setStore((prev) => {
      const prevSnap = prev.days[date];
      if (
        prevSnap &&
        prevSnap.pct === snap.pct &&
        prevSnap.done === snap.done &&
        prevSnap.total === snap.total &&
        prevSnap.waterMl === snap.waterMl
      ) {
        return prev; // unchanged -> no write, no rerender loop
      }
      const days = trim({ ...prev.days, [date]: snap });
      return { days, best: Math.max(prev.best || 0, calcStreak(days, date)) };
    });
  }, []);

  const streak = useMemo(() => calcStreak(store.days, todayKey), [store.days, todayKey]);

  return { days: store.days, streak, best: store.best, recordToday };
}
