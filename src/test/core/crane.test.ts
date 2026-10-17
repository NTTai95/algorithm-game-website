import { describe, expect, it } from 'vitest'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { Crane } from '../../core/machines/crane'

describe('Crane machine module', () => {
  it('initializes at position 0 with correct length', () => {
    const warehouse = new WarehouseArrayState([40, 10, 20])
    const crane = new Crane(warehouse)

    expect(crane.position()).toBe(0)
    expect(crane.length()).toBe(3)
    expect(crane.read()).toBe(40)
  })

  it('moves forward and backward within valid warehouse bounds', () => {
    const warehouse = new WarehouseArrayState([10, 20, 30])
    const crane = new Crane(warehouse)

    expect(crane.prev()).toBe(false)
    expect(crane.position()).toBe(0)

    expect(crane.next()).toBe(true)
    expect(crane.position()).toBe(1)
    expect(crane.read()).toBe(20)

    expect(crane.next()).toBe(true)
    expect(crane.position()).toBe(2)
    expect(crane.read()).toBe(30)

    // Cannot move beyond last slot
    expect(crane.next()).toBe(false)
    expect(crane.position()).toBe(2)

    expect(crane.prev()).toBe(true)
    expect(crane.position()).toBe(1)
  })

  it('resets crane back to index 0', () => {
    const warehouse = new WarehouseArrayState([1, 2, 3, 4])
    const crane = new Crane(warehouse)

    crane.next()
    crane.next()
    expect(crane.position()).toBe(2)

    crane.reset()
    expect(crane.position()).toBe(0)

    // Resetting when already at 0 doesn't add duplicate move events
    const eventCount = crane.getEvents().length
    crane.reset()
    expect(crane.getEvents().length).toBe(eventCount)
  })

  it('compares adjacent crates correctly and emits CRANE_COMPARE events', () => {
    const warehouse = new WarehouseArrayState([25, 10, 25])
    const crane = new Crane(warehouse)

    // 25 > 10 => 1
    const res1 = crane.compare()
    expect(res1).toBe(1)

    crane.next()
    // 10 < 25 => -1
    const res2 = crane.compare()
    expect(res2).toBe(-1)

    crane.next()
    // At last slot (index 2), compare must throw error
    expect(() => crane.compare()).toThrowError(/vị trí cuối cùng/)

    const events = crane.getEvents()
    const compareEvents = events.filter((e) => e.type === 'CRANE_COMPARE')
    expect(compareEvents.length).toBe(2)
  })

  it('swaps adjacent crates correctly and emits CRANE_SWAP events', () => {
    const warehouse = new WarehouseArrayState([50, 20, 30])
    const crane = new Crane(warehouse)

    expect(crane.swap()).toBe(true)
    expect(warehouse.toValueArray()).toEqual([20, 50, 30])

    crane.next()
    expect(crane.swap()).toBe(true)
    expect(warehouse.toValueArray()).toEqual([20, 30, 50])

    crane.next()
    // At last slot (index 2), swap must throw error
    expect(() => crane.swap()).toThrowError(/vị trí cuối cùng/)
  })

  it('can execute a complete manual Bubble Sort algorithm', () => {
    const warehouse = new WarehouseArrayState([5, 1, 4, 2, 8])
    const crane = new Crane(warehouse)
    const n = crane.length()

    // Bubble Sort simulation using crane commands
    for (let i = 0; i < n - 1; i++) {
      crane.reset()
      for (let j = 0; j < n - i - 1; j++) {
        if (crane.compare() > 0) {
          crane.swap()
        }
        crane.next()
      }
    }

    expect(warehouse.isSorted()).toBe(true)
    expect(warehouse.toValueArray()).toEqual([1, 2, 4, 5, 8])
    expect(warehouse.verifyIntegrity()).toBe(true)

    const stats = crane.getStats()
    expect(stats.comparisonsCount).toBe(10) // 4 + 3 + 2 + 1 = 10
    expect(stats.swapsCount).toBeGreaterThan(0)
    expect(crane.getEvents().length).toBeGreaterThan(0)
  })

  it('clears event buffer properly', () => {
    const warehouse = new WarehouseArrayState([2, 1])
    const crane = new Crane(warehouse)

    crane.compare()
    crane.swap()
    expect(crane.getEvents().length).toBe(2)

    crane.clearEvents()
    expect(crane.getEvents().length).toBe(0)
  })
})
