import { useCallback, useEffect, useState } from 'react';

export const WATER_GOAL_ML = 3000; // ~2.5-3.0 L/day starting target
const KEY = 'better-you-water-v1';

function fresh(date) {
  return { date, ml: 0, log: [] };
}

function read(today) {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && v.date === today && typeof v.ml === 'number' && Array.isArray(v.log)) return v;
  } catch {
    // malformed storage -> fresh day
  }
  return fresh(today);
}

// Daily water intake. Own key, local-date rollover, never UTC.
export function useWater(todayKey) {
  const [state, setState] = useState(() => read(todayKey));

  // New local calendar day -> fresh value (previous day is simply left
  // behind; history snapshots are owned by useHistory, not duplicated here).
  useEffect(() => {
    setState(read(todayKey));
  }, [todayKey]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage unavailable -> in-memory only
    }
  }, [state]);

  const add = useCallback(
    (ml) => {
      setState((s) => {
        const base = s.date === todayKey ? s : fresh(todayKey);
        return { ...base, ml: Math.max(0, base.ml + ml), log: [...base.log, ml] };
      });
    },
    [todayKey],
  );

  const undo = useCallback(() => {
    setState((s) => {
      if (s.date !== todayKey || s.log.length === 0) return s.date === todayKey ? s : fresh(todayKey);
      const last = s.log[s.log.length - 1];
      return { ...s, ml: Math.max(0, s.ml - last), log: s.log.slice(0, -1) };
    });
  }, [todayKey]);

  const reset = useCallback(() => {
    setState(fresh(todayKey));
  }, [todayKey]);

  return { ml: state.ml, canUndo: state.log.length > 0, add, undo, reset };
}
