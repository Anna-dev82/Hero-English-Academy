import { motion } from 'framer-motion'
import { HeroCharacter } from '@/components/hero/HeroCharacter'
import { AcademyBackground } from '@/components/layout/AcademyBackground'
import { GameButton } from '@/components/ui/GameButton'
import { APP_NAME } from '@/constants/game'
import { useGame } from '@/context/GameContext'

export function StartScreen() {
  const { hasSave, startNewGame, continueGame, resetProgress } = useGame()

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-gradient-to-b from-indigo-700 via-violet-800 to-indigo-950">
      <AcademyBackground />

      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute right-0 top-1/4 h-48 w-48 rounded-full bg-violet-400/25 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-between px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-3 inline-block rounded-2xl bg-white/10 px-4 py-2 text-5xl backdrop-blur-sm ring-2 ring-yellow-400/30"
          >
            🦸
          </motion.div>
          <h1 className="bg-gradient-to-r from-yellow-300 via-white to-violet-200 bg-clip-text text-3xl font-black tracking-tight text-transparent drop-shadow sm:text-4xl">
            {APP_NAME}
          </h1>
          <p className="mt-2 text-sm font-medium text-indigo-100/90">
            Верни слова, украденные профессором Forget!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <HeroCharacter size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex w-full max-w-sm flex-col gap-3"
        >
          {hasSave && (
            <GameButton fullWidth icon="▶" variant="secondary" onClick={continueGame}>
              Продолжить
            </GameButton>
          )}
          <GameButton fullWidth icon="🚀" onClick={startNewGame}>
            Начать обучение
          </GameButton>
          {hasSave && (
            <button
              type="button"
              onClick={resetProgress}
              className="py-2 text-center text-xs font-medium text-white/40 transition hover:text-white/70"
            >
              Сбросить прогресс
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
