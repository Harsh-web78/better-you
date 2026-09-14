import { Plus, Camera } from 'lucide-react'
import { usePhotoUrl } from '../hooks/usePhotoUrl'

export default function CheckpointCard({ week, checkpoint, targetLabel, onOpen }) {
  const thumbUrl = usePhotoUrl(checkpoint?.frontPhotoId)
  const hasEntry = !!checkpoint?.loggedDate

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-4 text-left transition-colors hover:border-surface-3"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-2 text-fog">
        {thumbUrl ? (
          <img src={thumbUrl} alt={`Week ${week} front photo`} className="h-full w-full object-cover" />
        ) : (
          <Camera size={20} strokeWidth={1.5} />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-medium text-bone">Week {week}</p>
        <p className="truncate text-xs text-fog">{targetLabel}</p>
        {checkpoint?.weight != null && (
          <p className="mt-1 text-sm text-signal-soft tabular-nums">{checkpoint.weight} kg</p>
        )}
      </div>

      {hasEntry ? (
        <span className="shrink-0 rounded-full border border-signal-dim px-3 py-1 text-xs font-medium text-signal-soft">
          Logged
        </span>
      ) : (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-fog">
          <Plus size={15} />
        </span>
      )}
    </button>
  )
}
