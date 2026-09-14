import { useState } from 'react'
import { useTransformation, CHECKPOINT_WEEKS } from '../hooks/useTransformation'
import { getStartDate } from '../utils/meta'
import { addDays, formatShortDate } from '../utils/date'
import CheckpointCard from './CheckpointCard'
import CheckpointEditor from './CheckpointEditor'
import BeforeAfter from './BeforeAfter'

export default function TransformScreen() {
  const { checkpoints, saveCheckpoint, deleteCheckpointPhoto } = useTransformation()
  const [openWeek, setOpenWeek] = useState(null)
  const startDate = getStartDate()

  const targetLabel = (week) => {
    if (checkpoints[week]?.loggedDate) return `Logged ${formatShortDate(checkpoints[week].loggedDate)}`
    if (startDate) return `Around ${formatShortDate(addDays(startDate, week * 7))}`
    return `${week * 7} days in`
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
      <header>
        <p className="text-sm text-mist">Transformation</p>
        <h1 className="mt-1 font-display text-2xl font-medium text-bone sm:text-3xl">
          Photos &amp; checkpoints
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">
          Log your weight and a front, side and back photo at each milestone.
          Everything stays on this device.
        </p>
      </header>

      <div className="mt-6 space-y-2.5">
        {CHECKPOINT_WEEKS.map((week) => (
          <CheckpointCard
            key={week}
            week={week}
            checkpoint={checkpoints[week]}
            targetLabel={targetLabel(week)}
            onOpen={() => setOpenWeek(week)}
          />
        ))}
      </div>

      <div className="mt-8">
        <BeforeAfter checkpoints={checkpoints} />
      </div>

      {openWeek != null && (
        <CheckpointEditor
          week={openWeek}
          checkpoint={checkpoints[openWeek]}
          targetLabel={targetLabel(openWeek)}
          onSave={saveCheckpoint}
          onDeletePhoto={deleteCheckpointPhoto}
          onClose={() => setOpenWeek(null)}
        />
      )}
    </div>
  )
}
