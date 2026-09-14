import { useDailyState } from '../hooks/useDailyState'
import StreakHero from './StreakHero'
import ProgressSection from './ProgressSection'

export default function ProgressScreen() {
  const { stats, streak, weekOverview } = useDailyState()

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
      <header>
        <p className="text-sm text-mist">Consistency</p>
        <h1 className="mt-1 font-display text-2xl font-medium text-bone sm:text-3xl">Your progress</h1>
      </header>

      <div className="mt-6">
        <StreakHero streak={streak} />
      </div>

      <div className="mt-6">
        <ProgressSection stats={stats} weekOverview={weekOverview} />
      </div>
    </div>
  )
}
