import { motion } from 'framer-motion'
import type { TopicId } from '@/types/game'

export type MissionStatus = 'locked' | 'unlocked' | 'completed' | 'newly-unlocked'

interface MissionCardProps {
  emoji: string
  label: string
  status: MissionStatus
  subtitle: string
  index: number
  onClick?: () => void
}

export function getMissionStatus(
  id: TopicId,
  unlocked: boolean,
  completed: boolean,
  newlyUnlocked: TopicId | null,
): MissionStatus {
  if (completed) return 'completed'
  if (newlyUnlocked === id) return 'newly-unlocked'
  if (unlocked) return 'unlocked'
  return 'locked'
}

export function MissionCard({
  emoji,
  label,
  status,
  subtitle,
  index,
  onClick,
}: MissionCardProps) {
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isActive = status === 'unlocked' || status === 'newly-unlocked'
  const isGlowing = status === 'unlocked' || status === 'newly-unlocked'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 120 }}
      className="relative"
    >
      {isGlowing && (
        <motion.div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/50 via-violet-400/50 to-blue-400/50 blur-md"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <motion.button
        type="button"
        onClick={onClick}
        disabled={isLocked}
        whileHover={isActive ? { scale: 1.02, y: -2 } : undefined}
        whileTap={isActive ? { scale: 0.98 } : undefined}
        className={`relative flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
          isLocked
            ? 'cursor-not-allowed border-slate-600/50 bg-slate-800/60 text-slate-500'
            : isCompleted
              ? 'border-amber-400/60 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-orange-500/20 shadow-lg shadow-amber-500/10'
              : 'border-violet-300/40 bg-gradient-to-r from-indigo-600/80 via-violet-600/70 to-blue-600/80 shadow-lg shadow-violet-500/20'
        }`}
      >
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl ${
            isLocked
              ? 'bg-slate-700/80'
              : isCompleted
                ? 'bg-amber-400/25 ring-2 ring-amber-400/50'
                : 'bg-white/15 ring-2 ring-white/20'
          }`}
        >
          {isLocked ? '🔒' : emoji}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`truncate text-lg font-black ${isLocked ? 'text-slate-400' : 'text-white'}`}>
            {label}
          </p>
          <p className={`text-sm ${isLocked ? 'text-slate-500' : 'text-white/70'}`}>{subtitle}</p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1">
          {isCompleted && (
            <>
              <span className="text-xl">✅</span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg"
              >
                ⭐
              </motion.span>
            </>
          )}
          {status === 'newly-unlocked' && (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-black text-indigo-900"
            >
              NEW!
            </motion.span>
          )}
          {isActive && !isCompleted && status !== 'newly-unlocked' && (
            <span className="rounded-full bg-yellow-400/90 px-2.5 py-1 text-xs font-black text-indigo-900">
              GO!
            </span>
          )}
        </div>
      </motion.button>
    </motion.div>
  )
}
