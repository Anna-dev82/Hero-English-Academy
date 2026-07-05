import { useMemo } from 'react'
import { shuffleArray } from '@/utils/shuffleArray'

export function useShuffledOptions<T>(items: readonly T[], shuffleKey: string | number): T[] {
  return useMemo(() => shuffleArray([...items]), [items, shuffleKey])
}
