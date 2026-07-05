import { motion } from 'framer-motion'
import { HERO_LEVEL_LABELS } from '@/constants/game'
import { useGame } from '@/context/GameContext'

export function ProfileBar() {
  const { progress } = useGame()
  const hero = progress.heroLevel ? HERO_LEVEL_LABELS[progress.heroLevel] : null

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 flex items-center justify-between gap-2 rounded-2xl border border-white/20 bg-indigo-950/70 px-4 py-3 shadow-lg shadow-indigo-900/50 backdrop-blur-lg"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/10 px-3 py-1.5 text-sm font-bold ring-1 ring-yellow-400/30">
          <span>⭐</span>
          <span className="text-yellow-200">{progress.xp}</span>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-violet-500/20 to-indigo-500/10 px-3 py-1.5 text-sm font-bold ring-1 ring-violet-400/30">
          <span>💎</span>
          <span className="text-violet-200">{progress.crystals}</span>
        </div>
      </div>
      {hero && (
        <div className={`flex items-center gap-1.5 text-sm font-bold ${hero.color}`}>
          <span>🦸</span>
          <span>{hero.emoji}</span>
          <span className="hidden sm:inline">{hero.label}</span>
        </div>
      )}
    </motion.header>
  )
}
