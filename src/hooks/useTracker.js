import { useEffect, useMemo, useState } from 'react';
import { dateKey } from '../utils/date';

const PREFIX = 'better-you-checks-'; // storage key format unchanged

function readChecks(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

// Daily routine + posture checklist. Accepts the shared local-day key from
// useLocalDay so there is exactly one rollover source in the app.
export function useTracker(todayKey = dateKey()) {
  const key = PREFIX + todayKey;
  const [checks, setChecks] = useState(() => readChecks(key));

  // New local calendar day -> load that day's checklist (yesterday's data
  // stays under its own key; history snapshots are owned by useHistory).
  useEffect(() => {
    setChecks(readChecks(key));
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checks));
    } catch {
      // storage unavailable -> in-memory only
    }
  }, [key, checks]);

  const toggle = (id) => setChecks((v) => ({ ...v, [id]: !v[id] }));
  const done = useMemo(() => Object.values(checks).filter(Boolean).length, [checks]);
  return { checks, toggle, done };
}
