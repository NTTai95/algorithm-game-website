import type { Crate } from './crate'
import { createCratesFromValues } from './crate'

/**
 * Encapsulates the warehouse array storage and preserves data integrity.
 */
export class WarehouseArrayState {
  private readonly crates: Crate[]
  private readonly initialCrates: readonly Crate[]

  constructor(initialValuesOrCrates: readonly number[] | readonly Crate[]) {
    if (initialValuesOrCrates.length === 0) {
      throw new Error('WarehouseArray cannot be initialized with an empty array.')
    }

    if (typeof initialValuesOrCrates[0] === 'number') {
      this.crates = createCratesFromValues(initialValuesOrCrates as readonly number[])
    } else {
      this.crates = [...(initialValuesOrCrates as readonly Crate[])]
    }

    this.initialCrates = Object.freeze([...this.crates])
  }

  /**
   * Number of crate slots in the warehouse array.
   */
  get length(): number {
    return this.crates.length
  }

  /**
   * Retrieves the crate at the specified index. Throws RangeError if out of bounds.
   */
  getCrate(index: number): Crate {
    this.assertBounds(index)
    return this.crates[index]
  }

  /**
   * Retrieves the numeric value of the crate at the specified index.
   */
  getValue(index: number): number {
    return this.getCrate(index).value
  }

  /**
   * Swaps crates between indexA and indexB.
   */
  swap(indexA: number, indexB: number): void {
    this.assertBounds(indexA)
    this.assertBounds(indexB)

    if (indexA === indexB) {
      return
    }

    const temp = this.crates[indexA]
    this.crates[indexA] = this.crates[indexB]
    this.crates[indexB] = temp
  }

  /**
   * Checks if all crates are sorted in ascending order.
   */
  isSorted(ascending: boolean = true): boolean {
    for (let i = 0; i < this.crates.length - 1; i++) {
      if (ascending) {
        if (this.crates[i].value > this.crates[i + 1].value) {
          return false
        }
      } else {
        if (this.crates[i].value < this.crates[i + 1].value) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Verifies that all original crates exist without duplication, loss, or mutation.
   */
  verifyIntegrity(): boolean {
    if (this.crates.length !== this.initialCrates.length) {
      return false
    }

    const initialIdMap = new Map<string, number>()
    for (const c of this.initialCrates) {
      initialIdMap.set(c.id, (initialIdMap.get(c.id) ?? 0) + 1)
    }

    for (const c of this.crates) {
      const count = initialIdMap.get(c.id)
      if (!count || count <= 0) {
        return false
      }
      initialIdMap.set(c.id, count - 1)
    }

    return true
  }

  /**
   * Returns a shallow copy of the crates array.
   */
  toArray(): readonly Crate[] {
    return [...this.crates]
  }

  /**
   * Returns an array of pure numerical values.
   */
  toValueArray(): number[] {
    return this.crates.map((c) => c.value)
  }

  /**
   * Creates an independent clone of the current warehouse array state.
   */
  clone(): WarehouseArrayState {
    return new WarehouseArrayState([...this.crates])
  }

  private assertBounds(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.crates.length) {
      throw new RangeError(
        `Vị trí ${index} nằm ngoài phạm vi kho hàng [0, ${this.crates.length - 1}].`
      )
    }
  }
}
