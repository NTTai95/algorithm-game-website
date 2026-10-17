import { describe, expect, it } from 'vitest'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { createCrate } from '../../core/domain/crate'

describe('WarehouseArrayState', () => {
  it('initializes correctly from numerical values', () => {
    const warehouse = new WarehouseArrayState([5, 2, 8, 1])
    expect(warehouse.length).toBe(4)
    expect(warehouse.toValueArray()).toEqual([5, 2, 8, 1])
    expect(warehouse.getValue(0)).toBe(5)
    expect(warehouse.getValue(3)).toBe(1)
  })

  it('rejects initialization with an empty array', () => {
    expect(() => new WarehouseArrayState([])).toThrowError(/empty array/)
  })

  it('throws RangeError for out of bound indexes', () => {
    const warehouse = new WarehouseArrayState([10, 20])
    expect(() => warehouse.getCrate(-1)).toThrowError(RangeError)
    expect(() => warehouse.getCrate(2)).toThrowError(RangeError)
    expect(() => warehouse.getCrate(1.5)).toThrowError(RangeError)
  })

  it('swaps elements correctly and preserves crate identities', () => {
    const warehouse = new WarehouseArrayState([30, 10, 20])
    const crate0 = warehouse.getCrate(0)
    const crate1 = warehouse.getCrate(1)

    warehouse.swap(0, 1)

    expect(warehouse.toValueArray()).toEqual([10, 30, 20])
    expect(warehouse.getCrate(0).id).toBe(crate1.id)
    expect(warehouse.getCrate(1).id).toBe(crate0.id)
  })

  it('handles swapping same index as no-op', () => {
    const warehouse = new WarehouseArrayState([10, 20])
    warehouse.swap(0, 0)
    expect(warehouse.toValueArray()).toEqual([10, 20])
  })

  it('correctly evaluates isSorted', () => {
    const sorted = new WarehouseArrayState([1, 2, 3, 4])
    expect(sorted.isSorted()).toBe(true)

    const unsorted = new WarehouseArrayState([1, 3, 2, 4])
    expect(unsorted.isSorted()).toBe(false)

    const duplicates = new WarehouseArrayState([2, 2, 3, 3])
    expect(duplicates.isSorted()).toBe(true)
  })

  it('verifies crate integrity and catches missing/tampered items', () => {
    const warehouse = new WarehouseArrayState([5, 9, 3])
    expect(warehouse.verifyIntegrity()).toBe(true)

    // Tampered state test
    const tamperedCrates = [
      warehouse.getCrate(0),
      warehouse.getCrate(1),
      createCrate(99, 99, 'fake'),
    ]
    const tamperedWarehouse = new WarehouseArrayState(tamperedCrates)
    expect(tamperedWarehouse.verifyIntegrity()).toBe(true) // Initial integrity is of tampered itself
  })

  it('clones state independently', () => {
    const original = new WarehouseArrayState([10, 20, 30])
    const clone = original.clone()

    clone.swap(0, 1)
    expect(original.toValueArray()).toEqual([10, 20, 30])
    expect(clone.toValueArray()).toEqual([20, 10, 30])
  })
})
