import { Flame, Settings } from 'lucide-react'
import ProgressRing from './ProgressRing'
import { formatLongDate, greeting } from '../utils/date'

export default function DashboardHeader({ stats, streak, dateKey, onOpenSettings }) {
  return (
    <header className="animate-rise-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-mist">{greeting()}</p>
          <h1 className="mt-1 font-display text-2xl font-medium text-bone sm:text-3xl">
            {formatLongDate(dateKey)}
          </h1>
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Settings"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-surface-3 hover:text-bone"
        >
          <Settings size={18} strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-5 rounded-3xl border border-line bg-surface p-5">
        <ProgressRing percent={stats.completionPct} size={72} stroke={6}>
          <span className="font-display text-lg font-semibold text-bone tabular-nums">
            {stats.completionPct}%
          </span>
        </ProgressRing>

        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-medium text-bone tabular-nums">
            {stats.completedTasks} / {stats.totalTasks}
            <span className="ml-2 font-sans text-sm font-normal text-mist">completed</span>
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-signal-soft">
            <Flame size={15} strokeWidth={2} className="text-signal" />
            <span className="font-medium text-bone tabular-nums">{streak}</span>
            <span className="text-mist">day streak</span>
          </div>
        </div>
      </div>
    </header>
  )
}
