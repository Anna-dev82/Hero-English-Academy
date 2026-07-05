import { motion } from 'framer-motion'
import { GameShell } from '@/components/layout/GameShell'
import { GameButton } from '@/components/ui/GameButton'
import { HERO_LEVEL_LABELS, TOPICS } from '@/constants/game'
import { useGame } from '@/context/GameContext'

export function VictoryScreen() {
  const { progress, goTo } = useGame()
  const hero = progress.heroLevel ? HERO_LEVEL_LABELS[progress.heroLevel] : null

  const completedLabels = progress.completedTopics
    .filter((id) => id !== 'final-boss')
    .map((id) => TOPICS.find((t) => t.id === id)?.label)
    .filter(Boolean)

  return (
    <GameShell>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-5 overflow-hidden text-center">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-2xl"
            style={{ left: `${5 + i * 8}%`, top: `${10 + (i % 4) * 18}%` }}
            animate={{ opacity: [0, 1, 0], y: [0, -40], rotate: [0, 360] }}
            transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, repeatDelay: 2 }}
          >
            {['✨', '⭐', '🌟', '💫'][i % 4]}
          </motion.span>
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="text-7xl"
        >
          🦸‍♂️
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-300 via-white to-violet-200 bg-clip-text text-3xl font-black text-transparent"
        >
          Ты спас английские слова!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xs text-white/80"
        >
          Профессор Forget побеждён! Академия снова в безопасности.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <div className="rounded-2xl border-2 border-yellow-400/50 bg-yellow-400/10 px-5 py-3">
            <p className="text-2xl font-black text-yellow-300">⭐ {progress.xp}</p>
            <p className="text-xs text-white/50">XP</p>
          </div>
          <div className="rounded-2xl border-2 border-violet-400/50 bg-violet-400/10 px-5 py-3">
            <p className="text-2xl font-black text-violet-300">💎 {progress.crystals}</p>
            <p className="text-xs text-white/50">Crystals</p>
          </div>
        </motion.div>

        {hero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-lg font-black ${hero.color}`}
          >
            {hero.emoji} {hero.label}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3"
        >
          <p className="text-sm font-bold text-white/60">Пройденные темы:</p>
          <p className="mt-1 font-black text-white">{completedLabels.join(' · ')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-xs"
        >
          <GameButton fullWidth icon="🗺️" onClick={() => goTo('map')}>
            Вернуться к карте
          </GameButton>
        </motion.div>
      </div>
    </GameShell>
  )
}
