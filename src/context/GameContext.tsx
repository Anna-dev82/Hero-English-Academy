import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ACTIVITY_ORDER,
  ACTIVITY_XP,
  DEFAULT_PROGRESS,
  getMissionScreen,
  getNextActivity,
  getNextTopic,
  MISSION_TOPICS,
  REPLAY_ACTIVITY_XP,
  TOPIC_REWARDS,
} from '@/constants/game'
import type {
  GameProgress,
  MissionActivity,
  MissionTopicId,
  RewardState,
  Screen,
  TopicId,
} from '@/types/game'
import { clearProgress, hasSavedGame, loadProgress, saveProgress } from '@/utils/storage'

interface GameContextValue {
  progress: GameProgress
  screen: Screen
  hasSave: boolean
  newlyUnlockedTopic: TopicId | null
  lastReward: RewardState | null
  bossEncourage: boolean
  clearBossEncourage: () => void
  goTo: (screen: Screen) => void
  startNewGame: () => void
  continueGame: () => void
  resetProgress: () => void
  completeTopicActivity: (topicId: MissionTopicId, activity: MissionActivity) => void
  completeFinalBoss: (won: boolean, score: number) => void
  clearNewlyUnlocked: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

function findResumeMission(progress: GameProgress): Screen | null {
  for (const topicId of MISSION_TOPICS) {
    if (!progress.unlockedTopics.includes(topicId)) continue
    const isCompleted = progress.completedTopics.includes(topicId)
    const next = getNextActivity(progress.topicActivities[topicId], isCompleted)
    if (next && !isCompleted) return getMissionScreen(topicId, next)
  }
  return null
}

function ensureGameStarted(progress: GameProgress): GameProgress {
  if (progress.unlockedTopics.length > 0) return progress
  return {
    ...progress,
    unlockedTopics: ['colors'],
    heroLevel: progress.heroLevel ?? 'new-hero',
  }
}

function getResumeScreen(progress: GameProgress): Screen {
  const ready = ensureGameStarted(progress)

  const mission = findResumeMission(ready)
  if (mission) return mission

  if (
    ready.completedTopics.includes('actions') &&
    ready.unlockedTopics.includes('final-boss') &&
    !ready.finalBossCompleted
  ) {
    return 'final-boss'
  }

  return 'map'
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress())
  const [screen, setScreen] = useState<Screen>('start')
  const [newlyUnlockedTopic, setNewlyUnlockedTopic] = useState<TopicId | null>(null)
  const [lastReward, setLastReward] = useState<RewardState | null>(null)
  const [bossEncourage, setBossEncourage] = useState(false)

  const persist = useCallback((next: GameProgress) => {
    setProgress(next)
    saveProgress(next)
  }, [])

  const hasSave = useMemo(() => hasSavedGame(progress), [progress])

  const goTo = useCallback((next: Screen) => setScreen(next), [])

  const clearNewlyUnlocked = useCallback(() => setNewlyUnlockedTopic(null), [])
  const clearBossEncourage = useCallback(() => setBossEncourage(false), [])

  const startNewGame = useCallback(() => {
    const next = ensureGameStarted(progress)
    if (next !== progress) persist(next)
    setScreen('map')
  }, [persist, progress])

  const continueGame = useCallback(() => {
    const next = ensureGameStarted(progress)
    if (next !== progress) persist(next)
    setScreen(getResumeScreen(next))
  }, [persist, progress])

  const resetProgress = useCallback(() => {
    clearProgress()
    setProgress({ ...DEFAULT_PROGRESS })
    setNewlyUnlockedTopic(null)
    setLastReward(null)
    setBossEncourage(false)
    setScreen('start')
  }, [])

  const completeTopicActivity = useCallback(
    (topicId: MissionTopicId, activity: MissionActivity) => {
      const isReplay = progress.completedTopics.includes(topicId)
      const activities = { ...progress.topicActivities[topicId], [activity]: true }
      const allDone = ACTIVITY_ORDER.every((a) => activities[a])
      const xpGain = isReplay ? REPLAY_ACTIVITY_XP : ACTIVITY_XP

      const next: GameProgress = {
        ...progress,
        topicActivities: { ...progress.topicActivities, [topicId]: activities },
        xp: progress.xp + xpGain,
      }

      if (allDone && !isReplay) {
        const nextTopic = getNextTopic(topicId)
        next.completedTopics = [...progress.completedTopics, topicId]
        next.xp += TOPIC_REWARDS.xp
        next.crystals += TOPIC_REWARDS.crystals

        if (nextTopic && !progress.unlockedTopics.includes(nextTopic)) {
          next.unlockedTopics = [...new Set([...progress.unlockedTopics, nextTopic])]
          setNewlyUnlockedTopic(nextTopic)
        }

        setLastReward({ topicId, xp: TOPIC_REWARDS.xp, crystals: TOPIC_REWARDS.crystals })
        persist(next)
        setScreen('rewards')
        return
      }

      persist(next)

      if (isReplay) {
        const idx = ACTIVITY_ORDER.indexOf(activity)
        const nextActivity = ACTIVITY_ORDER[idx + 1]
        setScreen(nextActivity ? getMissionScreen(topicId, nextActivity) : 'map')
        return
      }

      setScreen('map')
    },
    [persist, progress],
  )

  const completeFinalBoss = useCallback(
    (won: boolean, score: number) => {
      if (won) {
        const next: GameProgress = {
          ...progress,
          finalBossCompleted: true,
          xp: progress.xp + 200,
          crystals: progress.crystals + 25,
        }
        persist(next)
        setScreen('victory')
      } else {
        persist({ ...progress, xp: progress.xp + score * 5 })
        setBossEncourage(true)
        setScreen('map')
      }
    },
    [persist, progress],
  )

  const value = useMemo(
    () => ({
      progress,
      screen,
      hasSave,
      newlyUnlockedTopic,
      lastReward,
      bossEncourage,
      goTo,
      startNewGame,
      continueGame,
      resetProgress,
      completeTopicActivity,
      completeFinalBoss,
      clearNewlyUnlocked,
      clearBossEncourage,
    }),
    [
      progress,
      screen,
      hasSave,
      newlyUnlockedTopic,
      lastReward,
      bossEncourage,
      goTo,
      startNewGame,
      continueGame,
      resetProgress,
      completeTopicActivity,
      completeFinalBoss,
      clearNewlyUnlocked,
      clearBossEncourage,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
