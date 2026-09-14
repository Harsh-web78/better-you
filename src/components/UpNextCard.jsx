import {
  Droplet, Sparkles, Utensils, Apple, Footprints, Zap, Dumbbell, Moon,
  BedDouble, Check, PartyPopper,
} from 'lucide-react'

const ICONS = { Droplet, Sparkles, Utensils, Apple, Footprints, Zap, Dumbbell, Moon, BedDouble }

// The direct answer to "what do I need to do right now" — the single
// nearest incomplete task, always visible at the top of the day.
export default function UpNextCard({ nextTask, onToggle }) {
  if (!nextTask) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border border-signal-dim bg-signal-dim/40 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal text-ink">
          <PartyPopper size={19} strokeWidth={2} />
        </span>
        <div>
          <p className="text-[15px] font-medium text-bone">Routine complete</p>
          <p className="text-xs text-fog">Everything on today's list is checked off.</p>
        </div>
      </div>
    )
  }

  const Icon = ICONS[nextTask.icon] ?? Utensils

  return (
    <button
      type="button"
      onClick={() => onToggle(nextTask.id)}
      className="flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-5 text-left transition-colors hover:border-surface-3"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 text-signal">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-fog">Up next · {nextTask.time}</p>
        <p className="mt-0.5 truncate text-[17px] font-medium text-bone">{nextTask.label}</p>
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fog transition-colors group-hover:text-bone">
        <Check size={16} strokeWidth={2} />
      </span>
    </button>
  )
}
