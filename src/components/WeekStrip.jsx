import { Check, Minus, Circle } from 'lucide-react'

export default function WeekStrip({ strip }) {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {strip.map((day) => (
        <div key={day.key} className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] text-fog">{day.dayLabel}</span>
          <span
            className={[
              'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium',
              day.status === 'done' && 'border-signal bg-signal-dim text-signal-soft',
              day.status === 'today' && 'border-signal/60 text-signal-soft',
              day.status === 'incomplete' && 'border-surface-3 text-mist',
              day.status === 'rest' && 'border-line-soft text-fog',
              day.status === 'upcoming' && 'border-line-soft text-fog/50',
            ].filter(Boolean).join(' ')}
          >
            {day.status === 'done' && <Check size={14} strokeWidth={2.5} />}
            {day.status === 'rest' && <Minus size={13} strokeWidth={2.5} />}
            {day.status === 'today' && <span className="tabular-nums">{day.completionPct}</span>}
            {day.status === 'incomplete' && <Circle size={11} strokeWidth={2.5} />}
            {day.status === 'upcoming' && <Circle size={11} strokeWidth={2} />}
          </span>
        </div>
      ))}
    </div>
  )
}
