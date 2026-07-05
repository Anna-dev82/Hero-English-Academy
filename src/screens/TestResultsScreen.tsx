import { motion } from 'framer-motion'
import { GameShell } from '@/components/layout/GameShell'
import { GameButton } from '@/components/ui/GameButton'
import { HeroCharacter } from '@/components/hero/HeroCharacter'
import { HERO_LEVEL_LABELS } from '@/constants/game'
import { useGame } from '@/context/GameContext'

export function TestResultsScreen() {
  const { progress, goTo } = useGame()
  const result = progress.testResult
  if (!result) return null

  const hero = HERO_LEVEL_LABELS[result.heroLevel]

  return (
    <GameShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-6xl"
        >
          {hero.emoji}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-violet-300">
            Твой уровень героя
          </p>
          <h2 className={`mt-1 text-4xl font-black ${hero.color}`}>{hero.label}</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-xs text-lg text-white/80"
        >
          Отлично! Ты готов к приключениям в Академии. Профессор Forget не победит!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <HeroCharacter size="sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs"
        >
          <GameButton fullWidth icon="🗺️" onClick={() => goTo('map')}>
            Открыть карту академии
          </GameButton>
        </motion.div>

        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-2xl"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              y: -120 - Math.random() * 80,
              x: (Math.random() - 0.5) * 200,
            }}
            transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: '40%',
            }}
          >
            {['⭐', '✨', '💫', '🌟'][i % 4]}
          </motion.span>
        ))}
      </div>
    </GameShell>
  )
}
