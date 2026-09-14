import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function WorkoutModal({ plan, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="absolute inset-0" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${plan.title} workout details`}
        className="relative flex max-h-[85vh] w-full flex-col rounded-t-3xl border border-line bg-surface p-6 outline-none animate-rise-in sm:max-w-md sm:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-fog">Today's workout</p>
            <h2 className="mt-1 font-display text-xl font-medium text-bone">{plan.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-bone"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="mt-5 -mx-1 flex-1 space-y-1 overflow-y-auto px-1">
          {plan.exercises.map((ex) => (
            <li
              key={ex.name}
              className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 odd:bg-surface-2/60"
            >
              <span className="text-sm text-bone">{ex.name}</span>
              <span className="shrink-0 font-display text-sm tabular-nums text-mist">
                {ex.sets} × {ex.reps}
              </span>
            </li>
          ))}
        </ul>

        {plan.isRest && (
          <p className="mt-4 text-xs leading-relaxed text-fog">
            Recovery matters as much as training. Keep it light today.
          </p>
        )}
      </div>
    </div>
  )
}
