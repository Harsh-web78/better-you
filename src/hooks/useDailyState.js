import { useCallback, useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { TASKS, STREAK_THRESHOLD } from '../data/tasks'
import { WORKOUT_PLAN } from '../data/workoutPlan'
import { dateKey, addDays, weekdayIndex, weekDates, DAY_NAMES } from '../utils/date'

const STORAGE_KEY = 'betterYou:v1'
const TOTAL_TASKS = TASKS.length
const MAX_HISTORY_DAYS = 60
const MIN_WATER_TARGET = 1500
const MAX_WATER_TARGET = 5000

function isRestDay(key) {
  return !!WORKOUT_PLAN[weekdayIndex(key)]?.isRest
}

function emptyToday(key) {
  return { date: key, tasks: {}, water: 0, waterLog: [], fishOil: false, sleepHours: null }
}

function statsFor(todayObj) {
  const completedTasks = Object.values(todayObj.tasks).filter(Boolean).length
  const completionPct = Math.round((completedTasks / TOTAL_TASKS) * 100)
  return {
    completedTasks,
    totalTasks: TOTAL_TASKS,
    completionPct,
    waterMl: todayObj.water,
    workoutDone: !!todayObj.tasks.workout,
    sleepHours: todayObj.sleepHours ?? null,
    isRest: isRestDay(todayObj.date),
  }
}

function trimHistory(history) {
  const keys = Object.keys(history).sort()
  if (keys.length <= MAX_HISTORY_DAYS) return history
  const trimmed = { ...history }
  for (const k of keys.slice(0, keys.length - MAX_HISTORY_DAYS)) delete trimmed[k]
  return trimmed
}

// Brings persisted state up to the current calendar day: archives whatever
// was "today" into history, fills any fully-skipped days as misses, and
// hands back a fresh empty checklist for the new day. Idempotent — safe to
// call on every state update, not just once at mount.
function rollForward(data) {
  const todayKey = dateKey()
  if (!data.today) return { ...data, today: emptyToday(todayKey) }
  if (data.today.date === todayKey) return data

  const history = { ...data.history }
  let streak = data.streak

  const archived = statsFor(data.today)
  history[data.today.date] = archived
  streak = archived.completionPct >= STREAK_THRESHOLD * 100 ? streak + 1 : 0

  let cursor = addDays(data.today.date, 1)
  while (cursor < todayKey) {
    history[cursor] = {
      completedTasks: 0,
      totalTasks: TOTAL_TASKS,
      completionPct: 0,
      waterMl: 0,
      workoutDone: false,
      isRest: isRestDay(cursor),
      missed: true,
    }
    streak = 0
    cursor = addDays(cursor, 1)
  }

  return { ...data, today: emptyToday(todayKey), history: trimHistory(history), streak }
}

export function useDailyState() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, {
    version: 1,
    streak: 0,
    waterTarget: 3000,
    today: null,
    history: {},
  })

  // Catch day rollover on load, on tab refocus, and periodically in case
  // the app is simply left open across midnight.
  useEffect(() => {
    setData((prev) => rollForward(prev))
    const onVisible = () => {
      if (document.visibilityState === 'visible') setData((prev) => rollForward(prev))
    }
    document.addEventListener('visibilitychange', onVisible)
    const interval = setInterval(() => setData((prev) => rollForward(prev)), 60_000)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(interval)
    }
  }, [setData])

  const today = data.today ?? emptyToday(dateKey())
  const stats = useMemo(() => statsFor(today), [today])

  const toggleTask = useCallback((id) => {
    setData((prev) => {
      const base = rollForward(prev)
      const t = base.today
      return { ...base, today: { ...t, tasks: { ...t.tasks, [id]: !t.tasks[id] } } }
    })
  }, [setData])

  const addWater = useCallback((ml) => {
    setData((prev) => {
      const base = rollForward(prev)
      const t = base.today
      return {
        ...base,
        today: { ...t, water: Math.max(0, t.water + ml), waterLog: [...t.waterLog, ml] },
      }
    })
  }, [setData])

  const undoWater = useCallback(() => {
    setData((prev) => {
      const base = rollForward(prev)
      const t = base.today
      if (t.waterLog.length === 0) return base
      const last = t.waterLog[t.waterLog.length - 1]
      return {
        ...base,
        today: {
          ...t,
          water: Math.max(0, t.water - last),
          waterLog: t.waterLog.slice(0, -1),
        },
      }
    })
  }, [setData])

  const toggleFishOil = useCallback(() => {
    setData((prev) => {
      const base = rollForward(prev)
      const t = base.today
      return { ...base, today: { ...t, fishOil: !t.fishOil } }
    })
  }, [setData])

  const setSleepHours = useCallback((hours) => {
    setData((prev) => {
      const base = rollForward(prev)
      const t = base.today
      return { ...base, today: { ...t, sleepHours: t.sleepHours === hours ? null : hours } }
    })
  }, [setData])

  const setWaterTarget = useCallback((ml) => {
    setData((prev) => ({
      ...prev,
      waterTarget: Math.min(MAX_WATER_TARGET, Math.max(MIN_WATER_TARGET, ml)),
    }))
  }, [setData])

  const resetToday = useCallback(() => {
    setData((prev) => {
      const base = rollForward(prev)
      return { ...base, today: emptyToday(base.today.date) }
    })
  }, [setData])

  const weekOverview = useMemo(() => {
    const todayKey = dateKey()

    const days = weekDates(todayKey).map((key) => {
      const rest = isRestDay(key)
      const isToday = key === todayKey
      const isPast = key < todayKey
      const entry = isToday ? stats : data.history[key]

      const completionPct = entry?.completionPct ?? 0
      const waterMl = entry?.waterMl ?? 0
      const workoutDone = entry?.workoutDone ?? false

      const status = isToday
        ? (rest ? 'rest' : 'today')
        : isPast
          ? (rest ? 'rest' : completionPct >= STREAK_THRESHOLD * 100 ? 'done' : 'incomplete')
          : 'upcoming'

      const elapsed = isToday || isPast
      return { key, dayLabel: DAY_NAMES[weekdayIndex(key)], status, completionPct, waterMl, workoutDone, rest, elapsed }
    })

    const elapsedDays = days.filter((d) => d.elapsed)
    const weeklyCompletionAvg = elapsedDays.length
      ? Math.round(elapsedDays.reduce((sum, d) => sum + d.completionPct, 0) / elapsedDays.length)
      : 0
    const waterAverageMl = elapsedDays.length
      ? Math.round(elapsedDays.reduce((sum, d) => sum + d.waterMl, 0) / elapsedDays.length)
      : 0
    const workoutDaysCompleted = elapsedDays.filter((d) => !d.rest && d.workoutDone).length

    return {
      strip: days.map(({ key, dayLabel, status, completionPct, rest }) => ({ key, dayLabel, status, completionPct, rest })),
      weeklyCompletionAvg,
      waterAverageMl,
      workoutDaysCompleted,
    }
  }, [data.history, stats])

  return {
    today,
    stats,
    streak: data.streak,
    waterTarget: data.waterTarget,
    canUndoWater: today.waterLog.length > 0,
    weekOverview,
    toggleTask,
    addWater,
    undoWater,
    toggleFishOil,
    setSleepHours,
    setWaterTarget,
    resetToday,
  }
}
