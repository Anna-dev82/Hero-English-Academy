import type { MissionTopicId } from '@/types/game'

export interface WordItem {
  id: string
  name: string
  speak: string
  emoji?: string
  hex?: string
}

export interface TopicWordsConfig {
  id: MissionTopicId
  emoji: string
  label: string
  words: WordItem[]
  listenInstruction: string
  matchInstruction: string
  memoryInstruction: string
}

export const TOPIC_WORDS: Record<MissionTopicId, TopicWordsConfig> = {
  colors: {
    id: 'colors',
    emoji: '🎨',
    label: 'Colors',
    listenInstruction: 'Нажми 🔊, послушай цвет и выбери правильную карточку!',
    matchInstruction: 'Соедини английское слово с правильным цветом!',
    memoryInstruction: 'Найди пары одинаковых цветов!',
    words: [
      { id: 'red', name: 'Red', speak: 'red', hex: '#ef4444', emoji: '🔴' },
      { id: 'blue', name: 'Blue', speak: 'blue', hex: '#3b82f6', emoji: '🔵' },
      { id: 'green', name: 'Green', speak: 'green', hex: '#22c55e', emoji: '🟢' },
      { id: 'yellow', name: 'Yellow', speak: 'yellow', hex: '#eab308', emoji: '🟡' },
      { id: 'pink', name: 'Pink', speak: 'pink', hex: '#ec4899', emoji: '🩷' },
      { id: 'orange', name: 'Orange', speak: 'orange', hex: '#f97316', emoji: '🟠' },
    ],
  },
  animals: {
    id: 'animals',
    emoji: '🐾',
    label: 'Animals',
    listenInstruction: 'Нажми 🔊, послушай животное и выбери картинку!',
    matchInstruction: 'Соедини слово с правильным животным!',
    memoryInstruction: 'Найди пары одинаковых животных!',
    words: [
      { id: 'cat', name: 'Cat', speak: 'cat', emoji: '🐱' },
      { id: 'dog', name: 'Dog', speak: 'dog', emoji: '🐶' },
      { id: 'rabbit', name: 'Rabbit', speak: 'rabbit', emoji: '🐰' },
      { id: 'bird', name: 'Bird', speak: 'bird', emoji: '🐦' },
      { id: 'fish', name: 'Fish', speak: 'fish', emoji: '🐟' },
      { id: 'lion', name: 'Lion', speak: 'lion', emoji: '🦁' },
    ],
  },
  food: {
    id: 'food',
    emoji: '🍎',
    label: 'Food',
    listenInstruction: 'Нажми 🔊, послушай слово и выбери еду!',
    matchInstruction: 'Соедини слово с правильной едой!',
    memoryInstruction: 'Найди пары одинаковой еды!',
    words: [
      { id: 'apple', name: 'Apple', speak: 'apple', emoji: '🍎' },
      { id: 'banana', name: 'Banana', speak: 'banana', emoji: '🍌' },
      { id: 'milk', name: 'Milk', speak: 'milk', emoji: '🥛' },
      { id: 'bread', name: 'Bread', speak: 'bread', emoji: '🍞' },
      { id: 'cheese', name: 'Cheese', speak: 'cheese', emoji: '🧀' },
      { id: 'water', name: 'Water', speak: 'water', emoji: '💧' },
    ],
  },
  home: {
    id: 'home',
    emoji: '🏠',
    label: 'Home',
    listenInstruction: 'Нажми 🔊, послушай слово и выбери предмет!',
    matchInstruction: 'Соедини слово с правильным предметом!',
    memoryInstruction: 'Найди пары одинаковых предметов!',
    words: [
      { id: 'bed', name: 'Bed', speak: 'bed', emoji: '🛏️' },
      { id: 'chair', name: 'Chair', speak: 'chair', emoji: '🪑' },
      { id: 'table', name: 'Table', speak: 'table', emoji: '🍽️' },
      { id: 'door', name: 'Door', speak: 'door', emoji: '🚪' },
      { id: 'window', name: 'Window', speak: 'window', emoji: '🪟' },
      { id: 'lamp', name: 'Lamp', speak: 'lamp', emoji: '💡' },
    ],
  },
  actions: {
    id: 'actions',
    emoji: '⚡',
    label: 'Actions',
    listenInstruction: 'Нажми 🔊, послушай действие и выбери картинку!',
    matchInstruction: 'Соедини слово с правильным действием!',
    memoryInstruction: 'Найди пары одинаковых действий!',
    words: [
      { id: 'jump', name: 'Jump', speak: 'jump', emoji: '🦘' },
      { id: 'run', name: 'Run', speak: 'run', emoji: '🏃' },
      { id: 'clap', name: 'Clap', speak: 'clap', emoji: '👏' },
      { id: 'sit', name: 'Sit', speak: 'sit', emoji: '🧘' },
      { id: 'stand', name: 'Stand', speak: 'stand', emoji: '🧍' },
      { id: 'sleep', name: 'Sleep', speak: 'sleep', emoji: '😴' },
    ],
  },
}

export function getAllWordsFromTopics(): WordItem[] {
  return Object.values(TOPIC_WORDS).flatMap((t) => t.words)
}
