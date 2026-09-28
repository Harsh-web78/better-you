import { useEffect, useState } from 'react';
import { dateKey } from '../utils/date';

// Single shared "today" source for the whole app. Local-timezone YYYY-MM-DD,
// refreshed on mount, every 30s, and whenever the tab becomes visible again
// (covers sleep/wake and midnight rollover while open). The guarded setter
// means no rerender unless the calendar day actually changed.
export function useLocalDay() {
  const [day, setDay] = useState(() => dateKey());
  useEffect(() => {
    const check = () => {
      const k = dateKey();
      setDay((prev) => (prev === k ? prev : k));
    };
    check();
    const t = setInterval(check, 30000);
    const onVis = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(t);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return day;
}
