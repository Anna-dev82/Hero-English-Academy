import {
  createDefaultTopicActivities,
  DEFAULT_PROGRESS,
  STORAGE_KEY,
  TOPIC_ORDER,
} from '@/constants/game'
import type { GameProgress, MissionTopicId, TopicActivities, TopicId } from '@/types/game'

function migrateLegacyActivities(parsed: Partial<GameProgress>): Record<MissionTopicId, TopicActivities> {
  const base = createDefaultTopicActivities()
  if (parsed.topicActivities) {
    return { ...base, ...parsed.topicActivities }
  }
  const legacy = (parsed as { colorsActivities?: TopicActivities }).colorsActivities
  if (legacy) {
    base.colors = {
      listen: legacy.listen ?? false,
      match: legacy.match ?? false,
      memory: legacy.memory ?? false,
    }
  }
  return base
}

function mergeProgress(parsed: Partial<GameProgress>): GameProgress {
  return {
    ...DEFAULT_PROGRESS,
    ...parsed,
    unlockedTopics: (parsed.unlockedTopics ?? []).filter((id) =>
      TOPIC_ORDER.includes(id as TopicId),
    ) as GameProgress['unlockedTopics'],
    completedTopics: (parsed.completedTopics ?? []).filter((id) =>
      TOPIC_ORDER.includes(id as TopicId),
    ) as GameProgress['completedTopics'],
    topicActivities: migrateLegacyActivities(parsed),
    finalBossCompleted: parsed.finalBossCompleted ?? false,
  }
}

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    return mergeProgress(JSON.parse(raw) as GameProgress)
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progress: GameProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasSavedGame(progress: GameProgress): boolean {
  return progress.testResult !== null || progress.xp > 0 || progress.unlockedTopics.length > 0
}
