import { useEffect, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ensureStartDate } from './utils/meta'
import { dateKey } from './utils/date'
import LandingPage from './components/LandingPage'
import BottomNav from './components/BottomNav'
import TodayScreen from './components/TodayScreen'
import ProgressScreen from './components/ProgressScreen'
import TransformScreen from './components/TransformScreen'
import WeightScreen from './components/WeightScreen'

const SCREENS = {
  today: TodayScreen,
  progress: ProgressScreen,
  transform: TransformScreen,
  weight: WeightScreen,
}

export default function App() {
  // Returning users who have already started land straight on Today — the
  // landing page is only for first-time visitors.
  const [hasStarted, setHasStarted] = useLocalStorage('betterYou:hasStarted', false)
  const [tab, setTab] = useState('today')

  useEffect(() => {
    if (hasStarted) ensureStartDate(dateKey())
  }, [hasStarted])

  if (!hasStarted) {
    return (
      <LandingPage
        onStart={() => {
          ensureStartDate(dateKey())
          setHasStarted(true)
        }}
      />
    )
  }

  const Screen = SCREENS[tab]

  return (
    <div className="pb-20">
      <Screen />
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
