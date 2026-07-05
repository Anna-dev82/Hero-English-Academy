export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Shuffle until no adjacent cards share the same pairId (best effort). */
export function shuffleMemoryDeck<T extends { pairId: string | number }>(
  cards: T[],
  maxAttempts = 20,
): T[] {
  let shuffled = shuffleArray(cards)
  let attempts = 0

  while (attempts < maxAttempts) {
    let hasAdjacentPair = false
    for (let i = 0; i < shuffled.length - 1; i++) {
      if (shuffled[i].pairId === shuffled[i + 1].pairId) {
        hasAdjacentPair = true
        break
      }
    }
    if (!hasAdjacentPair) return shuffled
    shuffled = shuffleArray(cards)
    attempts++
  }

  return shuffled
}
