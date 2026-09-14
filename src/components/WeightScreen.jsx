import { useState } from 'react'
import { Trash2, Scale } from 'lucide-react'
import { useWeightLog } from '../hooks/useWeightLog'
import { dateKey, formatShortDate } from '../utils/date'
import WeightChart from './WeightChart'

export default function WeightScreen() {
  const { entries, addEntry, removeEntry, todayEntry, latest, deltaFromFirst } = useWeightLog()
  const [input, setInput] = useState(todayEntry ? String(todayEntry.kg) : '')

  const handleLog = () => {
    const kg = Number(input)
    if (!input || Number.isNaN(kg) || kg <= 0) return
    addEntry(dateKey(), kg)
  }

  const recent = [...entries].reverse().slice(0, 14)

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
      <header>
        <p className="text-sm text-mist">Body weight</p>
        <h1 className="mt-1 font-display text-2xl font-medium text-bone sm:text-3xl">Weight tracking</h1>
      </header>

      <div className="mt-6 rounded-3xl border border-line bg-surface p-5">
        {latest ? (
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-4xl font-medium text-bone tabular-nums">
                {latest.kg}
                <span className="ml-1 text-lg text-mist">kg</span>
              </p>
              <p className="mt-1 text-xs text-fog">Last logged {formatShortDate(latest.date)}</p>
            </div>
            {deltaFromFirst !== 0 && (
              <p className="text-sm font-medium text-mist tabular-nums">
                {deltaFromFirst > 0 ? '+' : ''}{deltaFromFirst} kg since start
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-mist">
            <Scale size={18} strokeWidth={1.75} />
            <p className="text-sm">No weigh-ins yet — log your first one below.</p>
          </div>
        )}

        {entries.length > 1 && (
          <div className="mt-4 border-t border-line-soft pt-4">
            <WeightChart entries={entries} />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Weight in kg"
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-bone outline-none focus:border-signal"
        />
        <button
          type="button"
          onClick={handleLog}
          className="shrink-0 rounded-xl bg-signal px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          {todayEntry ? 'Update' : 'Log'}
        </button>
      </div>

      {recent.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-bone">Recent entries</h2>
          <ul className="space-y-1.5">
            {recent.map((e) => (
              <li
                key={e.date}
                className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3"
              >
                <span className="text-sm text-mist">{formatShortDate(e.date)}</span>
                <span className="text-sm font-medium text-bone tabular-nums">{e.kg} kg</span>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Remove the weigh-in from ${formatShortDate(e.date)}?`)) removeEntry(e.date)
                  }}
                  aria-label={`Remove entry from ${formatShortDate(e.date)}`}
                  className="-m-2 p-2 text-fog hover:text-bone"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
