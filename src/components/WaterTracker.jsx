import { useState } from 'react'
import { Droplet, Undo2, Pencil, Check } from 'lucide-react'

const PRESETS = [2000, 2250, 2500, 2750, 3000, 3250, 3500]

export default function WaterTracker({ waterMl, target, canUndo, onAdd, onUndo, onSetTarget }) {
  const [editing, setEditing] = useState(false)
  const liters = (waterMl / 1000).toFixed(2)
  const targetLiters = (target / 1000).toFixed(2)
  const pct = Math.min(100, Math.round((waterMl / target) * 100))

  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-mist">
          <Droplet size={16} strokeWidth={1.75} />
          <h2 className="text-sm font-medium text-bone">Today's water</h2>
        </div>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          aria-label="Adjust daily water target"
          className="flex h-7 w-7 items-center justify-center rounded-full text-fog transition-colors hover:bg-surface-2 hover:text-bone"
        >
          {editing ? <Check size={14} /> : <Pencil size={13} />}
        </button>
      </div>

      <p className="mt-3 font-display text-3xl font-medium text-bone tabular-nums">
        {liters}
        <span className="text-lg text-mist"> / {targetLiters} L</span>
      </p>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-3">
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {editing ? (
        <div className="mt-4">
          <p className="mb-2 text-xs text-fog">Daily target</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((ml) => (
              <button
                key={ml}
                type="button"
                onClick={() => onSetTarget(ml)}
                className={[
                  'rounded-full border px-3 py-1.5 text-xs font-medium tabular-nums transition-colors',
                  target === ml
                    ? 'border-signal bg-signal-dim text-signal-soft'
                    : 'border-line text-mist hover:border-surface-3 hover:text-bone',
                ].join(' ')}
              >
                {(ml / 1000).toFixed(2)} L
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onAdd(250)}
            className="flex-1 rounded-xl border border-line py-2.5 text-sm font-medium text-bone transition-colors hover:border-surface-3 hover:bg-surface-2"
          >
            +250 ml
          </button>
          <button
            type="button"
            onClick={() => onAdd(500)}
            className="flex-1 rounded-xl border border-line py-2.5 text-sm font-medium text-bone transition-colors hover:border-surface-3 hover:bg-surface-2"
          >
            +500 ml
          </button>
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo last water entry"
            className="flex items-center justify-center rounded-xl border border-line px-3 text-mist transition-colors enabled:hover:border-surface-3 enabled:hover:text-bone disabled:opacity-30"
          >
            <Undo2 size={16} strokeWidth={1.75} />
          </button>
        </div>
      )}
    </section>
  )
}
