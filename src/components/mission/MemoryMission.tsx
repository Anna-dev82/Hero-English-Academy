import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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
import { shuffleMemoryDeck } from '@/utils/shuffleArray'

interface MemoryCard {
  id: string
  pairId: string
  name: string
  hex?: string
  emoji?: string
}

function buildDeck(sessionKey: number, topicId: MissionTopicId): MemoryCard[] {
  const words = TOPIC_WORDS[topicId].words
  const cards: MemoryCard[] = []
  words.forEach((word) => {
    cards.push(
      { id: `${sessionKey}-${word.id}-a`, pairId: word.id, name: word.name, hex: word.hex, emoji: word.emoji },
      { id: `${sessionKey}-${word.id}-b`, pairId: word.id, name: word.name, hex: word.hex, emoji: word.emoji },
    )
  })
  return shuffleMemoryDeck(cards)
}

interface MemoryMissionProps {
  topicId: MissionTopicId
}

export function MemoryMission({ topicId }: MemoryMissionProps) {
  const { completeTopicActivity, goTo } = useGame()
  const config = TOPIC_WORDS[topicId]
  const [sessionKey] = useState(() => Date.now())
  const deck = useMemo(() => buildDeck(sessionKey, topicId), [sessionKey, topicId])
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [lock, setLock] = useState(false)
  const [wrongPair, setWrongPair] = useState<string[]>([])

  const pairCount = config.words.length

  useEffect(() => {
    if (matched.length === pairCount) {
      const t = setTimeout(() => completeTopicActivity(topicId, 'memory'), 900)
      return () => clearTimeout(t)
    }
  }, [matched, pairCount, completeTopicActivity, topicId])

  const handleFlip = (card: MemoryCard) => {
    if (lock || flipped.includes(card.id) || matched.includes(card.pairId)) return

    const next = [...flipped, card.id]
    setFlipped(next)

    if (next.length === 2) {
      setLock(true)
      const [a, b] = next.map((id) => deck.find((c) => c.id === id)!)
      if (a.pairId === b.pairId) {
        setMatched((m) => [...m, a.pairId])
        setFlipped([])
        setWrongPair([])
        setLock(false)
      } else {
        setWrongPair(next)
        setTimeout(() => {
          setFlipped([])
          setWrongPair([])
          setLock(false)
        }, 1000)
      }
    }
  }

  const isColorTopic = topicId === 'colors'

  return (
    <GameShell>
      <MissionTaskLayout
        topicEmoji={config.emoji}
        topicLabel={config.label}
        missionTitle={ACTIVITY_TITLES.memory}
        instruction={config.memoryInstruction}
        taskIndex={ACTIVITY_INDEX.memory}
        totalTasks={TOTAL_MISSION_TASKS}
        onBack={() => goTo('map')}
      >
        <div className="grid grid-cols-4 gap-2">
          {deck.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.pairId)
            const isMatched = matched.includes(card.pairId)
            const isWrong = wrongPair.includes(card.id)

            return (
              <motion.button
                key={card.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFlip(card)}
                animate={isWrong ? { x: [0, -5, 5, -4, 4, 0] } : {}}
                className={`aspect-square rounded-xl border-2 ${
                  isMatched
                    ? 'border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                    : isWrong
                      ? 'border-rose-400/50'
                      : 'border-white/20'
                }`}
                style={{ perspective: 600 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 text-xl font-black text-white/80"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    ?
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl p-1"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      backgroundColor: isColorTopic && card.hex ? card.hex : undefined,
                      background: !isColorTopic
                        ? 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(139,92,246,0.8))'
                        : undefined,
                    }}
                  >
                    <span className="text-xl">{card.emoji}</span>
                    <span className="text-[9px] font-black text-white drop-shadow-md">{card.name}</span>
                  </div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>

        <p className="text-center text-sm font-semibold text-white/60">
          Найдено пар: {matched.length} / {pairCount}
        </p>

        {wrongPair.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm font-bold text-amber-200"
          >
            💪 Попробуй ещё раз, герой!
          </motion.p>
        )}
      </MissionTaskLayout>
    </GameShell>
  )
}
