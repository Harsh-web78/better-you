import {
  Droplet, Sparkles, Utensils, Apple, Footprints, Zap, Dumbbell, Moon,
  BedDouble, Check, ChevronRight,
} from 'lucide-react'

const ICONS = { Droplet, Sparkles, Utensils, Apple, Footprints, Zap, Dumbbell, Moon, BedDouble }

export default function TaskItem({ task, done, isLast, onToggle, onExpand }) {
  const Icon = ICONS[task.icon] ?? Utensils

  return (
    <li className="relative flex gap-4 pl-1">
      {/* timeline spine */}
      <div className="flex flex-col items-center pt-1.5">
        <span
          className={[
            'flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            done ? 'border-signal bg-signal' : 'border-surface-3 bg-ink',
          ].join(' ')}
        />
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-line-soft" style={{ minHeight: '2.75rem' }} />
        )}
      </div>

      <div className="flex-1 pb-5">
        <p className="mb-1.5 font-display text-[11px] tracking-wide text-fog tabular-nums">
          {task.time}
        </p>

        <div
          className={[
            'group flex w-full items-center gap-1 rounded-2xl border pr-2 transition-all duration-200',
            done ? 'border-signal-dim bg-signal-dim/40' : 'border-line bg-surface hover:border-surface-3 hover:bg-surface-2',
          ].join(' ')}
        >
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            aria-pressed={done}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
          >
            <span
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
                done ? 'bg-signal text-ink' : 'bg-surface-2 text-mist group-hover:text-bone',
              ].join(' ')}
            >
              {done ? <Check size={17} strokeWidth={2.75} className="animate-check-pop" /> : <Icon size={16} strokeWidth={1.75} />}
            </span>

            <span className="min-w-0 flex-1">
              <span className={['block text-[15px] leading-snug transition-colors', done ? 'text-mist line-through decoration-fog/50' : 'text-bone'].join(' ')}>
                {task.label}
              </span>
              {task.detail && (
                <span className="block text-xs text-fog">{task.detail}</span>
              )}
            </span>
          </button>

          {task.expandable && (
            <button
              type="button"
              aria-label="View workout details"
              onClick={onExpand}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-fog transition-colors hover:bg-surface-3 hover:text-bone"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
