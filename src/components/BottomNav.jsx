import { Home, TrendingUp, Camera, Scale } from 'lucide-react'

const TABS = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'transform', label: 'Transform', icon: Camera },
  { id: 'weight', label: 'Weight', icon: Scale },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 pb-safe backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-5xl items-stretch justify-around px-2 pt-1.5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors"
            >
              <Icon
                size={21}
                strokeWidth={isActive ? 2.25 : 1.75}
                className={isActive ? 'text-signal' : 'text-fog'}
              />
              <span className={['text-[11px] font-medium', isActive ? 'text-bone' : 'text-fog'].join(' ')}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
