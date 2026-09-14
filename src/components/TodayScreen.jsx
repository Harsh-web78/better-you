import { useMemo, useState } from 'react'
import { TASKS } from '../data/tasks'
import { WORKOUT_PLAN } from '../data/workoutPlan'
import { dateKey, weekdayIndex } from '../utils/date'
import { useDailyState } from '../hooks/useDailyState'

import DashboardHeader from './DashboardHeader'
import UpNextCard from './UpNextCard'
import ChecklistTimeline from './ChecklistTimeline'
import WaterTracker from './WaterTracker'
import FishOilCard from './FishOilCard'
import SleepCard from './SleepCard'
import WorkoutCard from './WorkoutCard'
import WorkoutModal from './WorkoutModal'
import SettingsMenu from './SettingsMenu'

export default function TodayScreen() {
  const {
    today, stats, streak, waterTarget, canUndoWater,
    toggleTask, addWater, undoWater, toggleFishOil, setSleepHours, setWaterTarget, resetToday,
  } = useDailyState()

  const [workoutOpen, setWorkoutOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const todayKey = dateKey()
  const plan = WORKOUT_PLAN[weekdayIndex(todayKey)]

  const nextTask = useMemo(
    () => TASKS.find((t) => !today.tasks[t.id]) ?? null,
    [today.tasks],
  )

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
      <DashboardHeader
        stats={stats}
        streak={streak}
        dateKey={todayKey}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="mt-6">
        <UpNextCard nextTask={nextTask} onToggle={toggleTask} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="mb-3 text-sm font-medium text-bone">Today's routine</h2>
          <ChecklistTimeline
            tasks={TASKS}
            doneMap={today.tasks}
            onToggle={toggleTask}
            onExpandWorkout={() => setWorkoutOpen(true)}
          />
        </div>

        <div className="space-y-4 lg:sticky lg:top-12 lg:self-start">
          <WorkoutCard plan={plan} done={stats.workoutDone} onOpen={() => setWorkoutOpen(true)} />
          <WaterTracker
            waterMl={today.water}
            target={waterTarget}
            canUndo={canUndoWater}
            onAdd={addWater}
            onUndo={undoWater}
            onSetTarget={setWaterTarget}
          />
          <FishOilCard taken={today.fishOil} onToggle={toggleFishOil} />
          <SleepCard hours={today.sleepHours} onSelect={setSleepHours} />
        </div>
      </div>

      {workoutOpen && <WorkoutModal plan={plan} onClose={() => setWorkoutOpen(false)} />}
      {settingsOpen && (
        <SettingsMenu onClose={() => setSettingsOpen(false)} onResetToday={resetToday} />
      )}
    </div>
  )
}
