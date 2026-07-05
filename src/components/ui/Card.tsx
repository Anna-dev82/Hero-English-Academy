import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
}

export function Card({ children, className = '', onClick, selected, disabled }: CardProps) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={disabled ? undefined : onClick}
      whileHover={onClick && !disabled ? { scale: 1.04, y: -2 } : undefined}
      whileTap={onClick && !disabled ? { scale: 0.96 } : undefined}
      className={`rounded-2xl border bg-white/10 p-4 backdrop-blur-md transition ${
        selected
          ? 'border-amber-400 bg-amber-400/20 ring-2 ring-amber-400/50'
          : 'border-white/20 hover:border-white/40'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
