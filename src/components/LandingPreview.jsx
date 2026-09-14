import { Check, Droplet, Utensils, Dumbbell } from 'lucide-react'
import ProgressRing from './ProgressRing'

const SAMPLE = [
  { label: 'Wake up + 500 ml water', icon: Droplet, done: true },
  { label: 'Protein-rich breakfast', icon: Utensils, done: true },
  { label: 'Workout — Chest, Side Delts & Triceps', icon: Dumbbell, done: false },
]

export default function LandingPreview() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-line bg-surface p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-4 border-b border-line-soft pb-4">
        <ProgressRing percent={58} size={56} stroke={5}>
          <span className="font-display text-sm font-semibold text-bone">58%</span>
        </ProgressRing>
        <div>
          <p className="font-display text-lg font-medium text-bone tabular-nums">7 / 12</p>
          <p className="text-xs text-fog">completed today</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {SAMPLE.map(({ label, icon: Icon, done }) => (
          <li
            key={label}
            className={[
              'flex items-center gap-3 rounded-xl border px-3.5 py-3',
              done ? 'border-signal-dim bg-signal-dim/40' : 'border-line',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                done ? 'bg-signal text-ink' : 'bg-surface-2 text-mist',
              ].join(' ')}
            >
              {done ? <Check size={13} strokeWidth={3} /> : <Icon size={13} strokeWidth={1.75} />}
            </span>
            <span className={['text-sm', done ? 'text-mist line-through decoration-fog/50' : 'text-bone'].join(' ')}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
