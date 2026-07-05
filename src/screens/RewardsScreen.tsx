import { motion } from 'framer-motion'
import { GameShell } from '@/components/layout/GameShell'
import { GameButton } from '@/components/ui/GameButton'
import { getTopicInfo, getTopicRewardMessage } from '@/constants/game'
import { useGame } from '@/context/GameContext'

export function RewardsScreen() {
  const { goTo, newlyUnlockedTopic, lastReward, clearNewlyUnlocked } = useGame()
  const unlockedTopic = newlyUnlockedTopic ? getTopicInfo(newlyUnlockedTopic) : null
  const completedTopic = lastReward?.topicId ? getTopicInfo(lastReward.topicId) : null
  const message = lastReward?.topicId ? getTopicRewardMessage(lastReward.topicId) : ''

  const handleGoToMap = () => {
    clearNewlyUnlocked()
    goTo('map')
  }

  return (
    <GameShell>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-5 overflow-hidden text-center">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-xl"
            style={{ left: `${10 + i * 9}%`, top: `${15 + (i % 3) * 20}%` }}
            animate={{ opacity: [0, 1, 0], y: [0, -30, -60], rotate: [0, 180] }}
            transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
          >
            {['✨', '⭐', '💫', '🌟'][i % 4]}
          </motion.span>
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 rounded-full bg-yellow-400/30 blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative text-7xl">{completedTopic?.emoji ?? '🏆'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-3xl font-black text-transparent"
        >
          Миссия выполнена!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xs text-white/80"
        >
          {message}
        </motion.p>

        {lastReward && (
          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="rounded-2xl border-2 border-yellow-400/50 bg-gradient-to-b from-yellow-400/25 to-amber-500/10 px-6 py-4 shadow-lg shadow-yellow-500/20"
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-4xl"
              >
                ⭐
              </motion.span>
              <p className="mt-1 text-2xl font-black text-yellow-300">+{lastReward.xp}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">XP</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="rounded-2xl border-2 border-violet-400/50 bg-gradient-to-b from-violet-400/25 to-indigo-500/10 px-6 py-4 shadow-lg shadow-violet-500/20"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl"
              >
                💎
              </motion.span>
              <p className="mt-1 text-2xl font-black text-violet-300">+{lastReward.crystals}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Crystals</p>
            </motion.div>
          </div>
        )}

        {unlockedTopic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="relative mt-2 w-full max-w-xs"
          >
            <motion.div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-yellow-400/40 via-violet-400/40 to-blue-400/40 blur-lg"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="relative rounded-2xl border-2 border-yellow-400/60 bg-gradient-to-br from-indigo-600/90 to-violet-700/90 px-5 py-4">
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-sm font-bold uppercase tracking-widest text-yellow-300"
              >
                🎉 Новый уровень открыт!
              </motion.p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-4xl">{unlockedTopic.emoji}</span>
                <span className="text-2xl font-black">{unlockedTopic.label}</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="w-full max-w-xs"
        >
          <GameButton fullWidth icon="🗺️" onClick={handleGoToMap}>
            Вернуться к карте
          </GameButton>
        </motion.div>
      </div>
    </GameShell>
  )
}
