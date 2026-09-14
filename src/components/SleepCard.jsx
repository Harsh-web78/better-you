import { Moon } from 'lucide-react'

const OPTIONS = [5, 6, 7, 8, 9]

export default function SleepCard({ hours, onSelect }) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2 text-mist">
        <Moon size={16} strokeWidth={1.75} />
        <h2 className="text-sm font-medium text-bone">Sleep</h2>
      </div>
      <p className="mt-2 text-xs text-fog">Hours last night</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {OPTIONS.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => onSelect(h)}
            aria-pressed={hours === h}
            className={[
              'flex h-9 min-w-9 items-center justify-center rounded-full border px-2.5 text-sm font-medium tabular-nums transition-colors',
              hours === h
                ? 'border-signal bg-signal-dim text-signal-soft'
                : 'border-line text-mist hover:border-surface-3 hover:text-bone',
            ].join(' ')}
          >
            {h}{h === 9 ? '+' : ''}
          </button>
        ))}
      </div>
    </section>
  )
}
