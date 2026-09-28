import { useCallback, useEffect, useState } from 'react';

const KEY = 'better-you-habits-v1';

function fresh(date) {
  return { date, creatine: false, fishOil: false, sleepHours: null, gainer: false, skinAM: false, skinPM: false };
}

function read(today) {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && v.date === today) return { ...fresh(today), ...v, date: today };
  } catch {
    // malformed storage -> fresh day
  }
  return fresh(today);
}

// Lightweight daily health flags. Everything here is informational except
// where shown — gainer stays optional and never counts toward completion.
export function useHabits(todayKey) {
  const [state, setState] = useState(() => read(todayKey));

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

  const toggle = useCallback(
    (name) => {
      setState((s) => {
        const base = s.date === todayKey ? s : fresh(todayKey);
        return { ...base, [name]: !base[name] };
      });
    },
    [todayKey],
  );

  const setSleep = useCallback(
    (hours) => {
      setState((s) => {
        const base = s.date === todayKey ? s : fresh(todayKey);
        return { ...base, sleepHours: hours };
      });
    },
    [todayKey],
  );

  return { habits: state, toggle, setSleep };
}
