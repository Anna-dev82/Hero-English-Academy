export type HeroLevel = 'new-hero' | 'brave-hero' | 'super-hero'

export type TopicId = 'colors' | 'animals' | 'food' | 'home' | 'actions' | 'final-boss'

export type MissionTopicId = Exclude<TopicId, 'final-boss'>

export type MissionActivity = 'listen' | 'match' | 'memory'

export type Screen =
  | 'start'
  | 'test'
  | 'results'
  | 'map'
  | 'rewards'
  | 'final-boss'
  | 'victory'
  | `${MissionTopicId}-listen`
  | `${MissionTopicId}-match`
  | `${MissionTopicId}-memory`

export type TestQuestionType =
  | 'listen-picture'
  | 'translation'
  | 'color'
  | 'phrase'
  | 'missing-letter'

export interface TestOption {
  id: string
  label: string
  emoji?: string
  color?: string
}

export interface TestQuestion {
  id: string
  type: TestQuestionType
  prompt: string
  speakText?: string
  options: TestOption[]
  correctId: string
}

export interface TestResult {
  score: number
  total: number
  heroLevel: HeroLevel
  completedAt: string
}

export interface TopicActivities {
  listen: boolean
  match: boolean
  memory: boolean
}

export interface GameProgress {
  xp: number
  crystals: number
  heroLevel: HeroLevel | null
  testResult: TestResult | null
  unlockedTopics: TopicId[]
  completedTopics: TopicId[]
  topicActivities: Record<MissionTopicId, TopicActivities>
  finalBossCompleted: boolean
}

export interface TopicInfo {
  id: TopicId
  emoji: string
  label: string
  locked: boolean
}

export interface RewardState {
  topicId: MissionTopicId | null
  xp: number
  crystals: number
}
