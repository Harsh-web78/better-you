import { Flame } from 'lucide-react'

function streakMessage(streak) {
  if (streak === 0) return 'Complete today to start your streak.'
  if (streak < 3) return 'Building momentum — keep going.'
  if (streak < 7) return "You're on a roll."
  if (streak < 14) return 'One full week of discipline.'
  if (streak < 30) return 'Consistency is compounding.'
  return "This is who you are now."
}

export default function StreakHero({ streak }) {
  return (
    <div className="flex items-center gap-5 rounded-3xl border border-line bg-surface p-6">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-signal-dim text-signal">
        <Flame size={28} strokeWidth={2} />
      </span>
      <div>
        <p className="font-display text-4xl font-medium text-bone tabular-nums">{streak}</p>
        <p className="text-sm text-mist">day streak</p>
        <p className="mt-1 text-xs text-fog">{streakMessage(streak)}</p>
      </div>
    </div>
  )
}
