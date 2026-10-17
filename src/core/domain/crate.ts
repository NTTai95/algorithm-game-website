/**
 * Domain model representing a warehouse crate carrying weight.
 */

export interface Crate {
  readonly id: string
  readonly weight: number
  readonly value: number // Alias to weight for backwards compatibility
  readonly initialIndex: number
}

/**
 * Creates a single Crate object with a specified weight.
 */
export function createCrate(weight: number, initialIndex: number, idPrefix: string = 'box'): Crate {
  return {
    id: `${idPrefix}-${initialIndex}-${weight}`,
    weight,
    value: weight,
    initialIndex,
  }
}

/**
 * Converts an array of numerical weights/values into an array of Crates with unique IDs.
 */
export function createCratesFromValues(values: readonly number[]): Crate[] {
  return values.map((val, idx) => createCrate(val, idx))
}

/**
 * Converts an array of numerical weights into an array of Crates.
 */
export function createCratesFromWeights(weights: readonly number[]): Crate[] {
  return weights.map((w, idx) => createCrate(w, idx))
}
