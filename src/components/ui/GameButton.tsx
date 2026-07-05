import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface GameButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: Variant
  fullWidth?: boolean
  icon?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50',
  secondary:
    'bg-white/15 text-white border border-white/25 backdrop-blur-sm hover:bg-white/25',
  ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/10',
}

export function GameButton({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  ...props
}: GameButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold transition-shadow ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  )
}
