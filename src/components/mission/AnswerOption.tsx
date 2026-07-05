import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type AnswerState = 'idle' | 'correct' | 'wrong' | 'highlight-correct'

interface AnswerOptionProps {
  children: ReactNode
  state?: AnswerState
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const stateStyles: Record<AnswerState, string> = {
  idle: 'border-white/25 bg-white/10 hover:border-white/50 hover:bg-white/15',
  correct: 'border-emerald-400 bg-emerald-400/25 ring-2 ring-emerald-400/60 shadow-lg shadow-emerald-500/20',
  wrong: 'border-rose-400/60 bg-rose-500/15 ring-2 ring-rose-400/40',
  'highlight-correct':
    'border-emerald-400 bg-emerald-400/20 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/15',
}

export function AnswerOption({
  children,
  state = 'idle',
  disabled,
  onClick,
  className = '',
}: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      animate={
        state === 'wrong'
          ? { x: [0, -8, 8, -6, 6, 0] }
          : state === 'correct'
            ? { scale: [1, 1.06, 1] }
            : {}
      }
      transition={{ duration: 0.45 }}
      className={`flex min-h-[5.5rem] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${stateStyles[state]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

interface FeedbackBannerProps {
  type: 'correct' | 'wrong' | 'encourage'
  message: string
}

export function FeedbackBanner({ type, message }: FeedbackBannerProps) {
  const styles = {
    correct: 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100',
    wrong: 'border-rose-400/40 bg-rose-500/15 text-rose-100',
    encourage: 'border-amber-400/40 bg-amber-500/15 text-amber-100',
  }

  const icons = { correct: '✨', wrong: '💪', encourage: '🦸' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold ${styles[type]}`}
    >
      {icons[type]} {message}
    </motion.div>
  )
}
