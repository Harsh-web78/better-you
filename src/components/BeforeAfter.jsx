import { useState } from 'react'
import { ImageOff, Images } from 'lucide-react'
import { CHECKPOINT_WEEKS } from '../hooks/useTransformation'
import { usePhotoUrl } from '../hooks/usePhotoUrl'

function ComparisonPhoto({ photoId, angle }) {
  const url = usePhotoUrl(photoId)
  return (
    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-surface-2">
      {url ? (
        <img src={url} alt={`${angle} photo`} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-fog">
          <ImageOff size={18} strokeWidth={1.5} />
        </div>
      )}
    </div>
  )
}

function WeekSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="rounded-full border border-line bg-ink px-3 py-1.5 text-sm font-medium text-bone outline-none focus:border-signal"
    >
      {options.map((w) => (
        <option key={w} value={w}>Week {w}</option>
      ))}
    </select>
  )
}

export default function BeforeAfter({ checkpoints }) {
  const loggedWeeks = CHECKPOINT_WEEKS.filter((w) => {
    const c = checkpoints[w]
    return c && (c.frontPhotoId || c.sidePhotoId || c.backPhotoId)
  })

  const [fromWeek, setFromWeek] = useState(null)
  const [toWeek, setToWeek] = useState(null)

  if (loggedWeeks.length < 2) {
    return (
      <section className="rounded-3xl border border-line bg-surface p-6 text-center">
        <Images size={22} strokeWidth={1.5} className="mx-auto text-fog" />
        <p className="mt-3 text-sm font-medium text-bone">Before / after</p>
        <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-fog">
          Log photos for at least two checkpoints to see a side-by-side comparison here.
        </p>
      </section>
    )
  }

  const from = loggedWeeks.includes(fromWeek) ? fromWeek : loggedWeeks[0]
  const to = loggedWeeks.includes(toWeek) ? toWeek : loggedWeeks[loggedWeeks.length - 1]
  const fromEntry = checkpoints[from]
  const toEntry = checkpoints[to]

  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <h2 className="text-sm font-medium text-bone">Before / after</h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex flex-col items-start gap-1.5">
          <WeekSelect value={from} onChange={setFromWeek} options={loggedWeeks} />
          {fromEntry?.weight != null && <p className="text-xs text-fog tabular-nums">{fromEntry.weight} kg</p>}
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <WeekSelect value={to} onChange={setToWeek} options={loggedWeeks} />
          {toEntry?.weight != null && <p className="text-xs text-fog tabular-nums">{toEntry.weight} kg</p>}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {['front', 'side', 'back'].map((angle) => (
          <div key={angle}>
            <p className="mb-1.5 text-xs font-medium capitalize text-fog">{angle}</p>
            <div className="grid grid-cols-2 gap-3">
              <ComparisonPhoto photoId={fromEntry?.[`${angle}PhotoId`]} angle={angle} />
              <ComparisonPhoto photoId={toEntry?.[`${angle}PhotoId`]} angle={angle} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
