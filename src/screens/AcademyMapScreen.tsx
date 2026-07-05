import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { GameShell } from '@/components/layout/GameShell'
import { getMissionStatus, MissionCard } from '@/components/ui/MissionCard'
import { getMissionScreen, getNextActivity, TOPICS } from '@/constants/game'
import { useGame } from '@/context/GameContext'
import type { TopicId } from '@/types/game'

export function AcademyMapScreen() {
  const { progress, goTo, newlyUnlockedTopic, clearNewlyUnlocked, resetProgress, bossEncourage, clearBossEncourage } =
    useGame()

  useEffect(() => {
    return () => clearNewlyUnlocked()
  }, [clearNewlyUnlocked])

  const isUnlocked = (id: TopicId) => progress.unlockedTopics.includes(id)
  const isCompleted = (id: TopicId) =>
    id === 'final-boss' ? progress.finalBossCompleted : progress.completedTopics.includes(id)

  const handleTopicClick = (id: TopicId) => {
    if (!isUnlocked(id)) return

    if (id === 'final-boss') {
      goTo('final-boss')
      return
    }

    const isTopicCompleted = progress.completedTopics.includes(id)
    const nextActivity = getNextActivity(progress.topicActivities[id], isTopicCompleted)
    goTo(getMissionScreen(id, nextActivity ?? 'listen'))
  }

  const getSubtitle = (id: TopicId, unlocked: boolean, completed: boolean) => {
    if (completed) return 'Миссия выполнена! Можно пройти снова'
    if (!unlocked) return 'Скоро откроется'
    if (id === 'final-boss') return 'Сразись с профессором Forget!'
    return 'Нажми, чтобы начать'
  }

  return (
    <GameShell>
      <div className="flex flex-1 flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl"
          >
            🗺️
          </motion.span>
          <h2 className="mt-1 bg-gradient-to-r from-yellow-300 to-violet-200 bg-clip-text text-2xl font-black text-transparent">
            Карта Академии
          </h2>
          <p className="mt-1 text-sm text-white/70">Выбери миссию и спаси слова!</p>
        </motion.div>

        {bossEncourage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-amber-400/40 bg-amber-400/15 px-4 py-3 text-center"
          >
            <p className="text-sm font-bold text-amber-100">
              💪 Попробуй снова, герой! Профессор Forget почти побеждён!
            </p>
            <button
              type="button"
              onClick={clearBossEncourage}
              className="mt-2 text-xs text-white/50 underline"
            >
              Понятно
            </button>
          </motion.div>
        )}

        <div className="flex flex-col gap-3">
          {TOPICS.map((topic, i) => {
            const unlocked = isUnlocked(topic.id)
            const completed = isCompleted(topic.id)
            const status = getMissionStatus(topic.id, unlocked, completed, newlyUnlockedTopic)

            return (
              <MissionCard
                key={topic.id}
                emoji={topic.id === 'final-boss' ? '👹' : topic.emoji}
                label={topic.id === 'final-boss' ? 'Battle with Professor Forget' : topic.label}
                status={status}
                subtitle={getSubtitle(topic.id, unlocked, completed)}
                index={i}
                onClick={unlocked ? () => handleTopicClick(topic.id) : undefined}
              />
            )
          })}
        </div>

        <motion.button
          type="button"
          onClick={resetProgress}
          whileTap={{ scale: 0.97 }}
          className="mt-auto rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-xs font-medium text-white/40 transition hover:bg-white/10 hover:text-white/60"
        >
          Сбросить прогресс
        </motion.button>
      </div>
    </GameShell>
  )
}
