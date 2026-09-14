import { Check, Pill } from 'lucide-react'

export default function FishOilCard({ taken, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={taken}
      className={[
        'w-full rounded-3xl border p-5 text-left transition-all duration-200',
        taken ? 'border-signal-dim bg-signal-dim/40' : 'border-line bg-surface hover:border-surface-3',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
            taken ? 'bg-signal text-ink' : 'bg-surface-2 text-mist',
          ].join(' ')}
        >
          {taken ? <Check size={17} strokeWidth={2.75} className="animate-check-pop" /> : <Pill size={16} strokeWidth={1.75} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-bone">Fish oil</p>
          <p className="text-xs text-fog">Take with lunch or dinner</p>
        </div>
        <span className={['text-xs font-medium', taken ? 'text-signal-soft' : 'text-fog'].join(' ')}>
          {taken ? 'Taken' : 'Not yet'}
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-fog">
        Follow the dose on your product label.
      </p>
    </button>
  )
}
