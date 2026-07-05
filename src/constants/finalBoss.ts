import type { WordItem } from '@/constants/topicWords'
import { TOPIC_WORDS } from '@/constants/topicWords'
import type { MissionTopicId } from '@/types/game'
import { shuffleArray } from '@/utils/shuffleArray'

export interface BossQuestion {
  id: string
  type: 'listen-picture' | 'translation' | 'word-picture'
  prompt: string
  speakText: string
  correctId: string
  options: { id: string; label: string; emoji?: string; hex?: string }[]
}

function makeListenQuestion(word: WordItem, pool: WordItem[]): BossQuestion {
  const options = shuffleArray([word, ...shuffleArray(pool.filter((w) => w.id !== word.id)).slice(0, 3)])
  return {
    id: `listen-${word.id}`,
    type: 'listen-picture',
    prompt: 'Listen and choose the picture',
    speakText: word.speak,
    correctId: word.id,
    options: options.map((w) => ({
      id: w.id,
      label: w.name,
      emoji: w.emoji,
      hex: w.hex,
    })),
  }
}

function makeWordPictureQuestion(word: WordItem, pool: WordItem[]): BossQuestion {
  const options = shuffleArray([word, ...shuffleArray(pool.filter((w) => w.id !== word.id)).slice(0, 3)])
  return {
    id: `wp-${word.id}`,
    type: 'word-picture',
    prompt: `Find: ${word.name}`,
    speakText: word.speak,
    correctId: word.id,
    options: options.map((w) => ({
      id: w.id,
      label: w.name,
      emoji: w.emoji,
      hex: w.hex,
    })),
  }
}

function makeTranslationQuestion(word: WordItem, topicId: MissionTopicId, pool: WordItem[]): BossQuestion {
  const topic = TOPIC_WORDS[topicId]
  const options = shuffleArray([word, ...shuffleArray(pool.filter((w) => w.id !== word.id)).slice(0, 3)])
  return {
    id: `tr-${word.id}`,
    type: 'translation',
    prompt: `Which word is "${topic.label}" — ${word.emoji ?? word.name}?`,
    speakText: word.speak,
    correctId: word.id,
    options: options.map((w) => ({ id: w.id, label: w.name })),
  }
}

export function generateBossQuestions(count = 10): BossQuestion[] {
  const allWords: { word: WordItem; topicId: MissionTopicId }[] = []
  for (const topicId of Object.keys(TOPIC_WORDS) as MissionTopicId[]) {
    TOPIC_WORDS[topicId].words.forEach((word) => allWords.push({ word, topicId }))
  }

  const pool = shuffleArray(allWords)
  const questions: BossQuestion[] = []
  const types: BossQuestion['type'][] = ['listen-picture', 'word-picture', 'translation']

  for (let i = 0; i < count; i++) {
    const entry = pool[i % pool.length]
    const flatPool = allWords.map((e) => e.word)
    const type = types[i % types.length]

    if (type === 'listen-picture') {
      questions.push(makeListenQuestion(entry.word, flatPool))
    } else if (type === 'word-picture') {
      questions.push(makeWordPictureQuestion(entry.word, flatPool))
    } else {
      questions.push(makeTranslationQuestion(entry.word, entry.topicId, flatPool))
    }
  }

  return shuffleArray(questions)
}

export const BOSS_PASS_SCORE = 7
export const BOSS_TOTAL = 10
