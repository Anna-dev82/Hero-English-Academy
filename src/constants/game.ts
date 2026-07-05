import type { GameProgress, HeroLevel, MissionActivity, MissionTopicId, Screen, TopicId } from '@/types/game'

export const APP_NAME = 'Hero English Academy' as const
export const STORAGE_KEY = 'hero-english-academy-progress' as const

export const TOPIC_ORDER: TopicId[] = [
  'colors',
  'animals',
  'food',
  'home',
  'actions',
  'final-boss',
]

export const MISSION_TOPICS: MissionTopicId[] = ['colors', 'animals', 'food', 'home', 'actions']

export const HERO_LEVEL_LABELS: Record<HeroLevel, { label: string; emoji: string; color: string }> = {
  'new-hero': { label: 'New Hero', emoji: '🟢', color: 'text-emerald-400' },
  'brave-hero': { label: 'Brave Hero', emoji: '🟡', color: 'text-amber-400' },
  'super-hero': { label: 'Super Hero', emoji: '🟣', color: 'text-violet-400' },
}

export const TOPIC_REWARDS = { xp: 100, crystals: 10 } as const
export const ACTIVITY_XP = 20
export const REPLAY_ACTIVITY_XP = 5

export const TOPICS: { id: TopicId; emoji: string; label: string }[] = [
  { id: 'colors', emoji: '🎨', label: 'Colors' },
  { id: 'animals', emoji: '🐾', label: 'Animals' },
  { id: 'food', emoji: '🍎', label: 'Food' },
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'actions', emoji: '⚡', label: 'Actions' },
  { id: 'final-boss', emoji: '👹', label: 'Final Boss' },
]

export const ACTIVITY_ORDER: MissionActivity[] = ['listen', 'match', 'memory']
export const TOTAL_MISSION_TASKS = 3

export const ACTIVITY_TITLES: Record<MissionActivity, string> = {
  listen: 'Listen & Choose',
  match: 'Match',
  memory: 'Memory',
}

export const ACTIVITY_INDEX: Record<MissionActivity, number> = {
  listen: 1,
  match: 2,
  memory: 3,
}

export function getNextTopic(topicId: TopicId): TopicId | null {
  const index = TOPIC_ORDER.indexOf(topicId)
  if (index === -1 || index >= TOPIC_ORDER.length - 1) return null
  return TOPIC_ORDER[index + 1]
}

export function getTopicInfo(id: TopicId) {
  return TOPICS.find((t) => t.id === id)!
}

export function getMissionScreen(topicId: MissionTopicId, activity: MissionActivity): Screen {
  return `${topicId}-${activity}`
}

export function parseMissionScreen(screen: Screen): { topicId: MissionTopicId; activity: MissionActivity } | null {
  for (const topicId of MISSION_TOPICS) {
    for (const activity of ACTIVITY_ORDER) {
      if (screen === `${topicId}-${activity}`) return { topicId, activity }
    }
  }
  return null
}

export function createEmptyActivities(): Record<MissionActivity, boolean> {
  return { listen: false, match: false, memory: false }
}

export function createDefaultTopicActivities(): GameProgress['topicActivities'] {
  return {
    colors: createEmptyActivities(),
    animals: createEmptyActivities(),
    food: createEmptyActivities(),
    home: createEmptyActivities(),
    actions: createEmptyActivities(),
  }
}

export const DEFAULT_PROGRESS: GameProgress = {
  xp: 0,
  crystals: 0,
  heroLevel: null,
  testResult: null,
  unlockedTopics: [],
  completedTopics: [],
  topicActivities: createDefaultTopicActivities(),
  finalBossCompleted: false,
}

export function getNextActivity(
  activities: Record<MissionActivity, boolean>,
  isCompleted: boolean,
): MissionActivity | null {
  if (isCompleted) return 'listen'
  return ACTIVITY_ORDER.find((a) => !activities[a]) ?? null
}

export function getTopicRewardMessage(topicId: MissionTopicId): string {
  const messages: Record<MissionTopicId, string> = {
    colors: 'Ты спас все цвета от профессора Forget!',
    animals: 'Ты спас всех животных! Они снова говорят по-английски!',
    food: 'Ты вернул всю еду! Вкусные слова спасены!',
    home: 'Ты восстановил дом! Все предметы на месте!',
    actions: 'Ты освоил все действия! Ты настоящий супергерой!',
  }
  return messages[topicId]
}
