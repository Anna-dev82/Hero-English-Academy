import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FeedbackBanner } from '@/components/mission/AnswerOption'
import { MissionTaskLayout } from '@/components/mission/MissionTaskLayout'
import { GameShell } from '@/components/layout/GameShell'
import {
  ACTIVITY_INDEX,
  ACTIVITY_TITLES,
  TOTAL_MISSION_TASKS,
} from '@/constants/game'
import { TOPIC_WORDS } from '@/constants/topicWords'
import { useGame } from '@/context/GameContext'
import type { MissionTopicId } from '@/types/game'
import { shuffleArray } from '@/utils/shuffleArray'
import { speakEnglish } from '@/utils/speech'

interface MatchItem {
  id: string
  pairId: string
  type: 'word' | 'visual'
  label?: string
  speak?: string
  hex?: string
  emoji?: string
}

interface MatchMissionProps {
  topicId: MissionTopicId
}

export function MatchMission({ topicId }: MatchMissionProps) {
  const { completeTopicActivity, goTo } = useGame()
  const config = TOPIC_WORDS[topicId]
  const [sessionKey] = useState(() => Date.now())
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [wrongFlash, setWrongFlash] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const { leftColumn, rightColumn } = useMemo(() => {
    const words: MatchItem[] = config.words.map((w) => ({
      id: `word-${w.id}`,
      pairId: w.id,
      type: 'word',
      label: w.name,
      speak: w.speak,
    }))
    const visuals: MatchItem[] = config.words.map((w) => ({
      id: `visual-${w.id}`,
      pairId: w.id,
      type: 'visual',
      hex: w.hex,
      emoji: w.emoji,
    }))
    return { leftColumn: shuffleArray(words), rightColumn: shuffleArray(visuals) }
  }, [config.words, sessionKey])

  const handleLeftClick = (item: MatchItem) => {
    if (matchedPairs.includes(item.pairId) || wrongFlash.length > 0) return
    if (item.speak) speakEnglish(item.speak)
    setSelectedLeft(item.id)
    setFeedback(null)
  }

  const handleRightClick = (item: MatchItem) => {
    if (!selectedLeft || matchedPairs.includes(item.pairId) || wrongFlash.length > 0) return

    const leftItem = leftColumn.find((l) => l.id === selectedLeft)!
    const isMatch = leftItem.pairId === item.pairId

    if (isMatch) {
      setFeedback('correct')
      const nextMatched = [...matchedPairs, item.pairId]
      setMatchedPairs(nextMatched)
      setSelectedLeft(null)

      if (nextMatched.length === config.words.length) {
        setTimeout(() => completeTopicActivity(topicId, 'match'), 900)
      } else {
        setTimeout(() => setFeedback(null), 700)
      }
    } else {
      setFeedback('wrong')
      setWrongFlash([selectedLeft, item.id])
      setTimeout(() => {
        setWrongFlash([])
        setSelectedLeft(null)
        setFeedback(null)
      }, 1100)
    }
  }

  const getState = (item: MatchItem, side: 'left' | 'right') => {
    if (matchedPairs.includes(item.pairId)) return 'matched'
    if (wrongFlash.includes(item.id)) return 'wrong'
    if (side === 'left' && selectedLeft === item.id) return 'selected'
    return 'idle'
  }

  const itemClass = (state: string) => {
    switch (state) {
      case 'matched':
        return 'border-emerald-400 bg-emerald-400/25 ring-2 ring-emerald-400/50'
      case 'wrong':
        return 'border-rose-400/60 bg-rose-500/15'
      case 'selected':
        return 'border-yellow-400 bg-yellow-400/20 ring-2 ring-yellow-400/50'
      default:
        return 'border-white/25 bg-white/10 hover:border-white/40'
    }
  }

  return (
    <GameShell>
      <MissionTaskLayout
        topicEmoji={config.emoji}
        topicLabel={config.label}
        missionTitle={ACTIVITY_TITLES.match}
        instruction={config.matchInstruction}
        taskIndex={ACTIVITY_INDEX.match}
        totalTasks={TOTAL_MISSION_TASKS}
        onBack={() => goTo('map')}
      >
        <AnimatePresence>
          {feedback === 'wrong' && (
            <FeedbackBanner type="encourage" message="Попробуй ещё раз, герой!" />
          )}
          {feedback === 'correct' && (
            <FeedbackBanner type="correct" message="Отличное соединение!" />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-white/50">Слова</p>
            {leftColumn.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLeftClick(item)}
                disabled={matchedPairs.includes(item.pairId)}
                className={`rounded-2xl border-2 px-3 py-4 text-base font-black transition sm:text-lg ${itemClass(getState(item, 'left'))}`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-white/50">
              {topicId === 'colors' ? 'Цвета' : 'Картинки'}
            </p>
            {rightColumn.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRightClick(item)}
                disabled={matchedPairs.includes(item.pairId) || !selectedLeft}
                className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 transition ${itemClass(getState(item, 'right'))}`}
              >
                {item.hex ? (
                  <span
                    className="h-10 w-10 rounded-xl ring-2 ring-white/30"
                    style={{ backgroundColor: item.hex }}
                  />
                ) : (
                  <span className="text-3xl">{item.emoji}</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm font-semibold text-white/60">
          Соединено: {matchedPairs.length} / {config.words.length}
        </p>
      </MissionTaskLayout>
    </GameShell>
  )
}
