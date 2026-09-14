import { useEffect, useRef, useState } from 'react'
import { Camera, X } from 'lucide-react'
import { usePhotoUrl } from '../hooks/usePhotoUrl'

// A single front/side/back photo picker. Shows the already-saved photo
// (by id) until the user picks a new one, at which point a local preview
// of the picked file takes over — nothing is persisted until Save.
export default function PhotoSlot({ label, photoId, onPick, onClear }) {
  const inputRef = useRef(null)
  const [pendingPreview, setPendingPreview] = useState(null)
  const savedUrl = usePhotoUrl(photoId)

  useEffect(() => () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview)
  }, [pendingPreview])

  const displayUrl = pendingPreview ?? savedUrl

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (pendingPreview) URL.revokeObjectURL(pendingPreview)
    setPendingPreview(URL.createObjectURL(file))
    onPick(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2"
      >
        {displayUrl ? (
          <img src={displayUrl} alt={`${label} progress photo`} className="h-full w-full object-cover" />
        ) : (
          <Camera size={22} strokeWidth={1.5} className="text-fog" />
        )}
      </button>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-mist">{label}</span>
        {displayUrl && (
          <button
            type="button"
            onClick={() => {
              if (pendingPreview) { URL.revokeObjectURL(pendingPreview); setPendingPreview(null) }
              onClear()
            }}
            aria-label={`Remove ${label} photo`}
            className="-m-1.5 p-1.5 text-fog hover:text-bone"
          >
            <X size={13} />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        aria-label={`Upload ${label} photo`}
      />
    </div>
  )
}
