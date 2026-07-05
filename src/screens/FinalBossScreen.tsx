import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AnswerOption, FeedbackBanner } from '@/components/mission/AnswerOption'
import { MissionTaskLayout } from '@/components/mission/MissionTaskLayout'
import { GameShell } from '@/components/layout/GameShell'
import { ListenButton } from '@/components/ui/ListenButton'
import { BOSS_PASS_SCORE, BOSS_TOTAL, generateBossQuestions } from '@/constants/finalBoss'
import { useGame } from '@/context/GameContext'
import { useShuffledOptions } from '@/hooks/useShuffledOptions'
import { speakEnglish } from '@/utils/speech'

export function FinalBossScreen() {
  const { completeFinalBoss, goTo } = useGame()
  const [sessionKey] = useState(() => Date.now())
  const questions = useMemo(() => generateBossQuestions(BOSS_TOTAL), [sessionKey])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [locked, setLocked] = useState(false)

  const question = questions[index]
  const shuffledOptions = useShuffledOptions(question.options, `${sessionKey}-${index}`)

  useEffect(() => {
    const timer = setTimeout(() => speakEnglish(question.speakText), 400)
    return () => clearTimeout(timer)
  }, [index, question.speakText])

  const handleSelect = (optionId: string) => {
    if (locked) return

    setSelectedId(optionId)
    setLocked(true)
    const isCorrect = optionId === question.correctId
    setFeedback(isCorrect ? 'correct' : 'wrong')
    const newScore = isCorrect ? score + 1 : score

    setTimeout(() => {
      if (index + 1 >= questions.length) {
        completeFinalBoss(newScore >= BOSS_PASS_SCORE, newScore)
      } else {
        setScore(newScore)
        setIndex((i) => i + 1)
        setSelectedId(null)
        setFeedback(null)
        setLocked(false)
      }
    }, isCorrect ? 800 : 1100)
  }

  const getOptionState = (optionId: string) => {
    if (!selectedId) return 'idle' as const
    if (optionId === selectedId) {
      return feedback === 'correct' ? ('correct' as const) : ('wrong' as const)
    }
    if (feedback && optionId === question.correctId) return 'highlight-correct' as const
    return 'idle' as const
  }

  return (
    <GameShell>
      <MissionTaskLayout
        topicEmoji="👹"
        topicLabel="Final Boss"
        missionTitle="Battle with Professor Forget"
        instruction="Ответь на вопросы из всех тем и спаси английские слова!"
        taskIndex={index + 1}
        totalTasks={BOSS_TOTAL}
        onBack={() => goTo('map')}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border-2 border-rose-400/30 bg-rose-500/10 p-5 text-center">
              <p className="text-lg font-bold">{question.prompt}</p>
              <div className="mt-4">
                <ListenButton text={question.speakText} />
              </div>
            </div>

            <AnimatePresence>
              {feedback === 'wrong' && (
                <FeedbackBanner type="encourage" message="Попробуй ещё раз, герой!" />
              )}
              {feedback === 'correct' && (
                <FeedbackBanner type="correct" message="Отличный удар!" />
              )}
            </AnimatePresence>

            <p className="text-center text-sm text-white/50">
              Правильных: {score} · Нужно: {BOSS_PASS_SCORE}+
            </p>

            <div className="grid grid-cols-2 gap-3">
              {shuffledOptions.map((option) => (
                <AnswerOption
                  key={option.id}
                  state={getOptionState(option.id)}
                  disabled={locked}
                  onClick={() => handleSelect(option.id)}
                >
                  {option.hex ? (
                    <span
                      className="h-12 w-12 rounded-xl ring-2 ring-white/30"
                      style={{ backgroundColor: option.hex }}
                    />
                  ) : option.emoji ? (
                    <span className="text-4xl">{option.emoji}</span>
                  ) : null}
                  <span>{option.label}</span>
                </AnswerOption>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </MissionTaskLayout>
    </GameShell>
  )
}
