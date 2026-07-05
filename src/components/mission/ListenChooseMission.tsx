import { AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AnswerOption, FeedbackBanner } from '@/components/mission/AnswerOption'
import { MissionTaskLayout } from '@/components/mission/MissionTaskLayout'
import { GameShell } from '@/components/layout/GameShell'
import { ListenButton } from '@/components/ui/ListenButton'
import {
  ACTIVITY_INDEX,
  ACTIVITY_TITLES,
  TOTAL_MISSION_TASKS,
} from '@/constants/game'
import { TOPIC_WORDS } from '@/constants/topicWords'
import { useGame } from '@/context/GameContext'
import { useShuffledOptions } from '@/hooks/useShuffledOptions'
import type { MissionTopicId } from '@/types/game'
import { shuffleArray } from '@/utils/shuffleArray'
import { speakEnglish } from '@/utils/speech'

const ROUNDS_COUNT = 4
const PASS_SCORE = 3

interface ListenChooseMissionProps {
  topicId: MissionTopicId
}

export function ListenChooseMission({ topicId }: ListenChooseMissionProps) {
  const { completeTopicActivity, goTo } = useGame()
  const config = TOPIC_WORDS[topicId]
  const [sessionKey] = useState(() => Date.now())
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [locked, setLocked] = useState(false)

  const rounds = useMemo(
    () => shuffleArray([...config.words]).slice(0, ROUNDS_COUNT),
    [config.words, sessionKey],
  )
  const current = rounds[round]
  const options = useShuffledOptions(config.words, `${sessionKey}-${round}`)

  useEffect(() => {
    if (!current) return
    const timer = setTimeout(() => speakEnglish(current.speak), 400)
    return () => clearTimeout(timer)
  }, [current])

  const handleSelect = (id: string) => {
    if (locked || !current) return

    setSelected(id)
    setLocked(true)
    const correct = id === current.id

    if (correct) {
      setFeedback('correct')
      const newScore = score + 1
      setTimeout(() => {
        if (round + 1 >= rounds.length) {
          if (newScore >= PASS_SCORE) {
            completeTopicActivity(topicId, 'listen')
          } else {
            setRound(0)
            setScore(0)
            setSelected(null)
            setFeedback(null)
            setLocked(false)
          }
        } else {
          setScore(newScore)
          setRound((r) => r + 1)
          setSelected(null)
          setFeedback(null)
          setLocked(false)
        }
      }, 900)
    } else {
      setFeedback('wrong')
      setTimeout(() => {
        setSelected(null)
        setFeedback(null)
        setLocked(false)
      }, 1200)
    }
  }

  if (!current) return null

  const isColorTopic = topicId === 'colors'

  return (
    <GameShell>
      <MissionTaskLayout
        topicEmoji={config.emoji}
        topicLabel={config.label}
        missionTitle={ACTIVITY_TITLES.listen}
        instruction={config.listenInstruction}
        taskIndex={ACTIVITY_INDEX.listen}
        totalTasks={TOTAL_MISSION_TASKS}
        onBack={() => goTo('map')}
      >
        <div className="rounded-2xl border-2 border-white/15 bg-white/5 p-5 text-center shadow-inner">
          <p className="text-base font-bold">
            {isColorTopic ? 'Какой цвет ты слышишь?' : 'Что ты слышишь?'}
          </p>
          <div className="mt-4">
            <ListenButton text={current.speak} />
          </div>
        </div>

        <AnimatePresence>
          {feedback === 'wrong' && (
            <FeedbackBanner type="encourage" message="Попробуй ещё раз, герой!" />
          )}
          {feedback === 'correct' && (
            <FeedbackBanner type="correct" message="Супер! Ты настоящий герой!" />
          )}
        </AnimatePresence>

        <p className="text-center text-sm font-semibold text-white/50">
          Раунд {round + 1} из {rounds.length}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((word) => {
            let state: 'idle' | 'correct' | 'wrong' | 'highlight-correct' = 'idle'
            if (selected === word.id) {
              state = feedback === 'correct' ? 'correct' : feedback === 'wrong' ? 'wrong' : 'idle'
            } else if (locked && feedback === 'correct' && word.id === current.id) {
              state = 'highlight-correct'
            }

            return (
              <AnswerOption
                key={word.id}
                state={state}
                disabled={locked}
                onClick={() => handleSelect(word.id)}
              >
                {isColorTopic && word.hex ? (
                  <span
                    className="h-16 w-16 rounded-2xl shadow-lg ring-2 ring-white/25"
                    style={{ backgroundColor: word.hex }}
                  />
                ) : (
                  <span className="text-5xl">{word.emoji}</span>
                )}
                <span>{word.name}</span>
              </AnswerOption>
            )
          })}
        </div>
      </MissionTaskLayout>
    </GameShell>
  )
}
