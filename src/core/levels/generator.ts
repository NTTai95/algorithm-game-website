export type ProblemPreset = 'random' | 'reversed' | 'nearly-sorted' | 'duplicates'

export interface GenerateArrayOptions {
  length?: number
  minLength?: number
  maxLength?: number
  minWeight?: number
  maxWeight?: number
  preset?: ProblemPreset
}

/** Playground problem bounds agreed in SPRINT-003 (5–8 boxes, 5–99 kg). */
export const PLAYGROUND_PROBLEM_BOUNDS = {
  minLength: 5,
  maxLength: 8,
  minWeight: 5,
  maxWeight: 99,
} as const

export const PRESET_LABELS: Record<ProblemPreset, string> = {
  random: '🎲 Ngẫu nhiên',
  reversed: '📉 Đảo ngược (Worst case)',
  'nearly-sorted': '📈 Gần sắp xếp',
  duplicates: '👯 Có trùng lặp',
}

/**
 * Returns a random integer between min and max inclusive.
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates an array of box weights based on options and pedagogical presets.
 */
export function generateProblemArray(options: GenerateArrayOptions = {}): number[] {
  const minLength = Math.max(3, options.minLength ?? 5)
  const maxLength = Math.max(minLength, options.maxLength ?? 7)
  const length = options.length ?? getRandomInt(minLength, maxLength)

  const minWeight = options.minWeight ?? 5
  const maxWeight = options.maxWeight ?? 95
  const preset = options.preset ?? 'random'

  switch (preset) {
    case 'reversed': {
      // Generate unique random weights and sort descending
      const weights = new Set<number>()
      while (weights.size < length) {
        weights.add(getRandomInt(minWeight, maxWeight))
      }
      return Array.from(weights).sort((a, b) => b - a)
    }

    case 'nearly-sorted': {
      // Generate sorted array, then swap 1 or 2 adjacent pairs
      const weights = new Set<number>()
      while (weights.size < length) {
        weights.add(getRandomInt(minWeight, maxWeight))
      }
      const sorted = Array.from(weights).sort((a, b) => a - b)
      // Pick a random index to swap with next
      const swapIndex = getRandomInt(0, sorted.length - 2)
      const temp = sorted[swapIndex]
      sorted[swapIndex] = sorted[swapIndex + 1]
      sorted[swapIndex + 1] = temp
      return sorted
    }

    case 'duplicates': {
      // Generate array with at least 1-2 duplicate weights
      const result: number[] = []
      // Base random value that will be duplicated
      const duplicateVal = getRandomInt(minWeight + 10, maxWeight - 10)
      result.push(duplicateVal, duplicateVal)

      while (result.length < length) {
        result.push(getRandomInt(minWeight, maxWeight))
      }

      // Shuffle so duplicates aren't always at indices 0 and 1
      for (let i = result.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i)
        const t = result[i]
        result[i] = result[j]
        result[j] = t
      }
      return result
    }

    case 'random':
    default: {
      // Generate diverse random array
      const result: number[] = []
      for (let i = 0; i < length; i++) {
        result.push(getRandomInt(minWeight, maxWeight))
      }
      return result
    }
  }
}
