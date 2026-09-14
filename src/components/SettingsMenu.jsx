import { useEffect, useRef, useState } from 'react'
import { X, RotateCcw } from 'lucide-react'

export default function SettingsMenu({ onClose, onResetToday }) {
  const panelRef = useRef(null)
  const [confirming, setConfirming] = useState(false)

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
        aria-label="Settings"
        className="relative w-full rounded-t-3xl border border-line bg-surface p-6 outline-none animate-rise-in sm:max-w-sm sm:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <h2 className="font-display text-lg font-medium text-bone">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-mist transition-colors hover:bg-surface-2 hover:text-bone"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-line-soft p-4">
          <div className="flex items-center gap-2 text-bone">
            <RotateCcw size={15} strokeWidth={1.75} />
            <p className="text-sm font-medium">Reset today's progress</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-fog">
            Clears today's checklist, water and fish oil. Your streak and past days are untouched.
          </p>

          {confirming ? (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => { onResetToday(); setConfirming(false); onClose() }}
                className="flex-1 rounded-xl bg-signal py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Confirm reset
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-xl border border-line py-2 text-sm font-medium text-mist hover:text-bone"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-3 w-full rounded-xl border border-line py-2 text-sm font-medium text-bone transition-colors hover:border-surface-3 hover:bg-surface-2"
            >
              Reset today
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
