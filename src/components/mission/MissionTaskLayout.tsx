import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MissionTaskLayoutProps {
  topicEmoji: string
  topicLabel: string
  missionTitle: string
  instruction: string
  taskIndex: number
  totalTasks: number
  onBack?: () => void
  children: ReactNode
  footer?: ReactNode
}

export function MissionTaskLayout({
  topicEmoji,
  topicLabel,
  missionTitle,
  instruction,
  taskIndex,
  totalTasks,
  onBack,
  children,
  footer,
}: MissionTaskLayoutProps) {
  const progress = (taskIndex / totalTasks) * 100

  return (
    <div className="flex flex-1 flex-col gap-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="self-start rounded-lg px-2 py-1 text-sm font-medium text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ← Карта
        </button>
      )}

      <div className="rounded-3xl border-2 border-violet-400/30 bg-gradient-to-br from-indigo-600/40 via-violet-700/30 to-blue-600/30 p-4 shadow-lg shadow-violet-900/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl ring-2 ring-white/20">
              {topicEmoji}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-yellow-300/90">{topicLabel}</p>
              <h2 className="text-lg font-black leading-tight">{missionTitle}</h2>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-black text-yellow-200 ring-1 ring-yellow-400/40">
            {taskIndex} / {totalTasks}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/80">{instruction}</p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-violet-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">{children}</div>

      {footer}
    </div>
  )
}
