import { Dumbbell, Utensils, Droplet, Moon, Target, ArrowRight } from 'lucide-react'
import LandingPreview from './LandingPreview'

const BENEFITS = [
  { icon: Dumbbell, title: 'Train consistently', copy: 'Show up for the workout on the schedule, even the short ones.' },
  { icon: Utensils, title: 'Eat enough protein', copy: 'Hit your meals so recovery and muscle gain actually happen.' },
  { icon: Droplet, title: 'Stay hydrated', copy: 'Small amounts through the day, tracked without the guesswork.' },
  { icon: Moon, title: 'Sleep and recover', copy: 'Wind down on time so tomorrow starts from a full tank.' },
  { icon: Target, title: 'Build discipline', copy: 'One completed day at a time is how the streak — and you — grow.' },
]

export default function LandingPage({ onStart }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-medium leading-[1.08] text-bone sm:text-5xl lg:text-[3.25rem]">
            Build your better self.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">
            One day. One routine. One stronger you.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start today's routine
            <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LandingPreview />
        </div>
      </section>

      <section className="border-t border-line-soft py-16 sm:py-20">
        <ul>
          {BENEFITS.map(({ icon: Icon, title, copy }, i) => (
            <li
              key={title}
              className={[
                'flex items-start gap-5 py-6',
                i !== 0 && 'border-t border-line-soft',
              ].join(' ')}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-signal">
                <Icon size={19} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-lg font-medium text-bone">{title}</p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-mist">{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 items-center gap-10 border-t border-line-soft py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-medium leading-tight text-bone">
            Your day, simplified.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
            You already know what you need to do. Better You turns your training,
            meals, water, supplements and sleep into one simple checklist you can
            actually follow — every day, without overthinking it.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <MiniTimeline />
        </div>
      </section>

      <section className="border-t border-line-soft py-20 text-center sm:py-24">
        <h2 className="font-display text-3xl font-medium text-bone sm:text-4xl">
          Stop planning. Start checking.
        </h2>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Start today
        </button>
      </section>

      <footer className="border-t border-line-soft py-8 text-center text-sm text-fog">
        Better You — Progress through consistency.
      </footer>
    </div>
  )
}

function MiniTimeline() {
  const rows = [
    { time: '7:00 AM', label: 'Wake up + water', done: true },
    { time: '1:00 PM', label: 'Lunch', done: true },
    { time: '5:00 PM', label: 'Workout', done: false },
    { time: '11:00 PM', label: 'Sleep', done: false },
  ]
  return (
    <div className="w-full max-w-sm rounded-3xl border border-line bg-surface p-6">
      <ol>
        {rows.map((row, i) => (
          <li key={row.time} className="relative flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <span className={['h-2.5 w-2.5 rounded-full border-2', row.done ? 'border-signal bg-signal' : 'border-surface-3'].join(' ')} />
              {i !== rows.length - 1 && <span className="mt-1 w-px flex-1 bg-line-soft" style={{ minHeight: '2.25rem' }} />}
            </div>
            <div className="pb-5">
              <p className="text-[11px] tabular-nums text-fog">{row.time}</p>
              <p className={['mt-0.5 text-sm', row.done ? 'text-mist line-through decoration-fog/50' : 'text-bone'].join(' ')}>
                {row.label}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
