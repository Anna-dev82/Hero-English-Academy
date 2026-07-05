import type { HeroLevel, TestQuestion } from '@/types/game'

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 'q1',
    type: 'listen-picture',
    prompt: 'Listen and choose the picture',
    speakText: 'cat',
    options: [
      { id: 'a', label: 'Cat', emoji: '🐱' },
      { id: 'b', label: 'Dog', emoji: '🐶' },
      { id: 'c', label: 'Bird', emoji: '🐦' },
      { id: 'd', label: 'Fish', emoji: '🐟' },
    ],
    correctId: 'a',
  },
  {
    id: 'q2',
    type: 'translation',
    prompt: 'What is "Dog" in Russian?',
    options: [
      { id: 'a', label: 'Кошка' },
      { id: 'b', label: 'Собака' },
      { id: 'c', label: 'Птица' },
      { id: 'd', label: 'Рыба' },
    ],
    correctId: 'b',
  },
  {
    id: 'q3',
    type: 'color',
    prompt: 'What color is the sky?',
    speakText: 'blue',
    options: [
      { id: 'a', label: 'Red', color: '#ef4444' },
      { id: 'b', label: 'Blue', color: '#3b82f6' },
      { id: 'c', label: 'Green', color: '#22c55e' },
      { id: 'd', label: 'Yellow', color: '#eab308' },
    ],
    correctId: 'b',
  },
  {
    id: 'q4',
    type: 'phrase',
    prompt: 'Hello, my ___ is Anna.',
    speakText: 'Hello, my name is Anna',
    options: [
      { id: 'a', label: 'name' },
      { id: 'b', label: 'book' },
      { id: 'c', label: 'car' },
      { id: 'd', label: 'tree' },
    ],
    correctId: 'a',
  },
  {
    id: 'q5',
    type: 'missing-letter',
    prompt: 'r_d',
    speakText: 'red',
    options: [
      { id: 'a', label: 'e' },
      { id: 'b', label: 'a' },
      { id: 'c', label: 'o' },
      { id: 'd', label: 'i' },
    ],
    correctId: 'a',
  },
  {
    id: 'q6',
    type: 'listen-picture',
    prompt: 'Listen and choose the picture',
    speakText: 'apple',
    options: [
      { id: 'a', label: 'Apple', emoji: '🍎' },
      { id: 'b', label: 'Banana', emoji: '🍌' },
      { id: 'c', label: 'Grape', emoji: '🍇' },
      { id: 'd', label: 'Orange', emoji: '🍊' },
    ],
    correctId: 'a',
  },
  {
    id: 'q7',
    type: 'translation',
    prompt: 'What is "Red" in Russian?',
    options: [
      { id: 'a', label: 'Синий' },
      { id: 'b', label: 'Зелёный' },
      { id: 'c', label: 'Красный' },
      { id: 'd', label: 'Жёлтый' },
    ],
    correctId: 'c',
  },
  {
    id: 'q8',
    type: 'color',
    prompt: 'Choose the green color',
    speakText: 'green',
    options: [
      { id: 'a', label: 'Red', color: '#ef4444' },
      { id: 'b', label: 'Blue', color: '#3b82f6' },
      { id: 'c', label: 'Green', color: '#22c55e' },
      { id: 'd', label: 'Yellow', color: '#eab308' },
    ],
    correctId: 'c',
  },
  {
    id: 'q9',
    type: 'phrase',
    prompt: 'I ___ happy.',
    speakText: 'I am happy',
    options: [
      { id: 'a', label: 'is' },
      { id: 'b', label: 'am' },
      { id: 'c', label: 'are' },
      { id: 'd', label: 'be' },
    ],
    correctId: 'b',
  },
  {
    id: 'q10',
    type: 'missing-letter',
    prompt: 'bl_e',
    speakText: 'blue',
    options: [
      { id: 'a', label: 'u' },
      { id: 'b', label: 'a' },
      { id: 'c', label: 'o' },
      { id: 'd', label: 'i' },
    ],
    correctId: 'a',
  },
]

export function getHeroLevelFromScore(score: number): HeroLevel {
  if (score >= 8) return 'super-hero'
  if (score >= 4) return 'brave-hero'
  return 'new-hero'
}
