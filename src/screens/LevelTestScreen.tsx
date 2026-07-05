import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AnswerOption, FeedbackBanner } from '@/components/mission/AnswerOption'
import { MissionTaskLayout } from '@/components/mission/MissionTaskLayout'
import { GameShell } from '@/components/layout/GameShell'
import { ListenButton } from '@/components/ui/ListenButton'
import { TEST_QUESTIONS } from '@/constants/testQuestions'
import { useGame } from '@/context/GameContext'
import { useShuffledOptions } from '@/hooks/useShuffledOptions'
import { speakEnglish } from '@/utils/speech'

export function LevelTestScreen() {
  const { completeTest } = useGame()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const question = TEST_QUESTIONS[index]
  const shuffledOptions = useShuffledOptions(question.options, question.id)
  const speakText = question.speakText ?? question.prompt

  useEffect(() => {
    const text =
      question.type === 'translation' && !question.speakText
        ? (question.prompt.match(/"([^"]+)"/)?.[1] ?? question.prompt)
        : speakText
    const timer = setTimeout(() => speakEnglish(text), 400)
    return () => clearTimeout(timer)
  }, [index, question, speakText])

  const handleSelect = (optionId: string) => {
    if (selectedId || isAdvancing) return

    setSelectedId(optionId)
    const isCorrect = optionId === question.correctId
    setFeedback(isCorrect ? 'correct' : 'wrong')
    const newScore = isCorrect ? score + 1 : score

    setIsAdvancing(true)
    setTimeout(() => {
      if (index + 1 >= TEST_QUESTIONS.length) {
        completeTest(newScore, TEST_QUESTIONS.length)
      } else {
        setScore(newScore)
        setIndex((i) => i + 1)
        setSelectedId(null)
        setFeedback(null)
        setIsAdvancing(false)
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
        topicEmoji="🦸"
        topicLabel="Hero Test"
        missionTitle="Тест на уровень"
        instruction="Ответь на вопросы — мы узнаем, какой ты герой!"
        taskIndex={index + 1}
        totalTasks={TEST_QUESTIONS.length}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border-2 border-white/15 bg-white/5 p-5 text-center">
              <p className="text-lg font-bold leading-snug">{question.prompt}</p>
              <div className="mt-4">
                <ListenButton
                  text={
                    question.type === 'translation' && !question.speakText
                      ? (question.prompt.match(/"([^"]+)"/)?.[1] ?? question.prompt)
                      : speakText
                  }
                />
              </div>
            </div>

            <AnimatePresence>
              {feedback === 'wrong' && (
                <FeedbackBanner type="encourage" message="Попробуй ещё раз, герой!" />
              )}
              {feedback === 'correct' && (
                <FeedbackBanner type="correct" message="Отлично!" />
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3">
              {shuffledOptions.map((option) => (
                <AnswerOption
                  key={option.id}
                  state={getOptionState(option.id)}
                  disabled={!!selectedId}
                  onClick={() => handleSelect(option.id)}
                >
                  {option.emoji && <span className="text-4xl">{option.emoji}</span>}
                  {option.color && (
                    <span
                      className="h-12 w-12 rounded-full ring-2 ring-white/30"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  <span className="text-base">{option.label}</span>
                </AnswerOption>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </MissionTaskLayout>
    </GameShell>
  )
}
