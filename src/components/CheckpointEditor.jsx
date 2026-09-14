import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import PhotoSlot from './PhotoSlot'

export default function CheckpointEditor({ week, checkpoint, targetLabel, onSave, onDeletePhoto, onClose }) {
  const panelRef = useRef(null)
  const [weight, setWeight] = useState(checkpoint?.weight != null ? String(checkpoint.weight) : '')
  const [pending, setPending] = useState({ front: null, side: null, back: null })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleClear = async (angle) => {
    setPending((p) => ({ ...p, [angle]: null }))
    if (checkpoint?.[`${angle}PhotoId`]) await onDeletePhoto(week, angle)
  }

  const handleSave = async () => {
    setSaving(true)
    await onSave(week, { weight, photos: pending })
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="absolute inset-0" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Week ${week} checkpoint`}
        className="relative flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 outline-none animate-rise-in sm:max-w-md sm:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-fog">Checkpoint</p>
            <h2 className="mt-1 font-display text-xl font-medium text-bone">Week {week}</h2>
            {targetLabel && <p className="mt-0.5 text-xs text-fog">{targetLabel}</p>}
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

        <label className="mt-5 block">
          <span className="text-xs font-medium text-fog">Weight (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 68.5"
            className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-[15px] text-bone outline-none focus:border-signal"
          />
        </label>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <PhotoSlot
            label="Front"
            photoId={checkpoint?.frontPhotoId}
            onPick={(file) => setPending((p) => ({ ...p, front: file }))}
            onClear={() => handleClear('front')}
          />
          <PhotoSlot
            label="Side"
            photoId={checkpoint?.sidePhotoId}
            onPick={(file) => setPending((p) => ({ ...p, side: file }))}
            onClear={() => handleClear('side')}
          />
          <PhotoSlot
            label="Back"
            photoId={checkpoint?.backPhotoId}
            onPick={(file) => setPending((p) => ({ ...p, back: file }))}
            onClear={() => handleClear('back')}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full rounded-xl bg-signal py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save checkpoint'}
        </button>
      </div>
    </div>
  )
}
