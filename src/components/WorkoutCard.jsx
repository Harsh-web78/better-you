import { Dumbbell, ChevronRight, Moon } from 'lucide-react'

export default function WorkoutCard({ plan, done, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-3xl border border-line bg-surface p-5 text-left transition-colors hover:border-surface-3"
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            plan.isRest ? 'bg-rest/15 text-rest' : done ? 'bg-signal text-ink' : 'bg-surface-2 text-mist',
          ].join(' ')}
        >
          {plan.isRest ? <Moon size={16} strokeWidth={1.75} /> : <Dumbbell size={16} strokeWidth={1.75} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-bone">Today's workout</p>
          <p className="text-xs text-fog">{plan.focus}</p>
        </div>
        <ChevronRight size={16} className="shrink-0 text-fog" />
      </div>
    </button>
  )
}
