import { CheckCircle2, CalendarDays, Droplet, Dumbbell } from 'lucide-react'
import WeekStrip from './WeekStrip'

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <Icon size={15} strokeWidth={1.75} className="text-signal" />
      <p className="mt-2.5 font-display text-xl font-medium text-bone tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-fog">{label}</p>
    </div>
  )
}

export default function ProgressSection({ stats, weekOverview }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-bone">This week</h2>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <StatTile icon={CheckCircle2} label="Today" value={`${stats.completionPct}%`} />
        <StatTile icon={CalendarDays} label="This week" value={`${weekOverview.weeklyCompletionAvg}%`} />
        <StatTile icon={Droplet} label="Water avg" value={`${(weekOverview.waterAverageMl / 1000).toFixed(1)} L`} />
        <StatTile icon={Dumbbell} label="Workouts" value={`${weekOverview.workoutDaysCompleted}/6`} />
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <WeekStrip strip={weekOverview.strip} />
      </div>
    </section>
  )
}
