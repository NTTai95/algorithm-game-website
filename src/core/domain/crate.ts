/**
 * Domain model representing a warehouse crate carrying a numerical value.
 */

export interface Crate {
  readonly id: string
  readonly value: number
  readonly initialIndex: number
}

/**
 * Creates a single Crate object.
 */
export function createCrate(value: number, initialIndex: number, idPrefix: string = 'crate'): Crate {
  return {
    id: `${idPrefix}-${initialIndex}-${value}`,
    value,
    initialIndex,
  }
}

/**
 * Converts an array of numerical values into an array of Crates with unique IDs.
 */
export function createCratesFromValues(values: readonly number[]): Crate[] {
  return values.map((val, idx) => createCrate(val, idx))
}
