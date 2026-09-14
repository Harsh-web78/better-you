import { keyToDate } from '../utils/date'

// Minimal hand-rolled SVG line chart — no charting dependency needed for
// one sparkline. Maps entries by actual date so gaps between weigh-ins
// are represented accurately, not just by index.
export default function WeightChart({ entries }) {
  const width = 320
  const height = 120
  const padX = 8
  const padY = 14

  if (entries.length === 0) return null

  const times = entries.map((e) => keyToDate(e.date).getTime())
  const kgs = entries.map((e) => e.kg)
  const minT = Math.min(...times)
  const maxT = Math.max(...times)
  const minK = Math.min(...kgs)
  const maxK = Math.max(...kgs)
  const kRange = maxK - minK || 1
  const tRange = maxT - minT || 1

  const x = (t) => padX + ((t - minT) / tRange) * (width - padX * 2)
  const y = (k) => height - padY - ((k - minK) / kRange) * (height - padY * 2)

  const points = entries.map((e) => [x(keyToDate(e.date).getTime()), y(e.kg)])
  const path = points.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      {points.length > 1 && (
        <path d={path} fill="none" stroke="var(--color-signal)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      )}
      {points.map(([px, py], i) => (
        <circle
          key={entries[i].date}
          cx={px}
          cy={py}
          r={i === points.length - 1 ? 3.5 : 2}
          fill={i === points.length - 1 ? 'var(--color-signal)' : 'var(--color-surface-3)'}
        />
      ))}
    </svg>
  )
}
