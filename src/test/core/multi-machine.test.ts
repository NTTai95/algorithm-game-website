import { describe, expect, it } from 'vitest'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { SingleCrane } from '../../core/machines/single-crane'
import { WarehouseEnvironment } from '../../core/machines/warehouse-env'
import { WeightScanner } from '../../core/machines/weight-scanner'

describe('Multi-Machine Architecture (WarehouseEnvironment, WeightScanner, SingleCrane)', () => {
  it('WarehouseEnvironment returns count of boxes accurately', () => {
    const warehouse = new WarehouseArrayState([45, 12, 89, 33])
    const env = new WarehouseEnvironment(warehouse)

    expect(env.getCountBox()).toBe(4)
    expect(env.length()).toBe(4)
  })

  it('WeightScanner reads crate weight and moves step-by-step', () => {
    const warehouse = new WarehouseArrayState([15, 42, 8])
    const scanner = new WeightScanner(warehouse)

    expect(scanner.position()).toBe(0)
    expect(scanner.getWeightBox()).toBe(15)

    expect(scanner.move(1)).toBe(true)
    expect(scanner.position()).toBe(1)
    expect(scanner.getWeightBox()).toBe(42)

    expect(scanner.move(1)).toBe(true)
    expect(scanner.position()).toBe(2)
    expect(scanner.getWeightBox()).toBe(8)

    // Moving beyond boundary throws RangeError
    expect(() => scanner.move(1)).toThrowError(RangeError)

    // moveStart resets scanner back to index 0
    scanner.moveStart()
    expect(scanner.position()).toBe(0)
    expect(scanner.getWeightBox()).toBe(15)

    const events = scanner.getEvents()
    expect(events.some((e) => e.type === 'SCANNER_READ')).toBe(true)
    expect(events.some((e) => e.type === 'SCANNER_MOVE')).toBe(true)
    expect(events.some((e) => e.type === 'SCANNER_MOVE_START')).toBe(true)
  })

  it('SingleCrane swaps adjacent crates and moves independently', () => {
    const warehouse = new WarehouseArrayState([50, 20, 30])
    const crane = new SingleCrane(warehouse)

    expect(crane.position()).toBe(0)
    expect(crane.swap()).toBe(true)
    expect(warehouse.toWeightArray()).toEqual([20, 50, 30])

    expect(crane.move(1)).toBe(true)
    expect(crane.position()).toBe(1)
    expect(crane.swap()).toBe(true)
    expect(warehouse.toWeightArray()).toEqual([20, 30, 50])

    // Move to last slot (index 2)
    expect(crane.move(1)).toBe(true)
    expect(crane.position()).toBe(2)

    // Swapping at last position (index 2 of 3) throws RangeError
    expect(() => crane.swap()).toThrowError(RangeError)

    // moveStart returns crane to index 0
    crane.moveStart()
    expect(crane.position()).toBe(0)

    const events = crane.getEvents()
    expect(events.filter((e) => e.type === 'CRANE_SWAP').length).toBe(2)
    expect(events.some((e) => e.type === 'CRANE_MOVE_START')).toBe(true)
  })

  it('executes user standard Bubble Sort algorithm with multiple machines', () => {
    const initialWeights = [64, 34, 25, 12, 22, 11, 90]
    const warehouse = new WarehouseArrayState(initialWeights)
    const wareHouse = new WarehouseEnvironment(warehouse)
    const singleCrane = new SingleCrane(warehouse)
    const weightScanner = new WeightScanner(warehouse)

    // Exact Java algorithm logic matching the user image
    const countBox = wareHouse.getCountBox()

    for (let i = 0; i < countBox - 1; i++) {
      let swapped = false

      for (let j = 0; j < countBox - 1 - i; j++) {
        const boxWeight1 = weightScanner.getWeightBox()
        weightScanner.move(1)
        const boxWeight2 = weightScanner.getWeightBox()

        if (boxWeight1 > boxWeight2) {
          singleCrane.swap()
          swapped = true
        }

        singleCrane.move(1)
      }

      if (!swapped) {
        break
      }

      singleCrane.moveStart()
      weightScanner.moveStart()
    }

    expect(warehouse.isSorted()).toBe(true)
    expect(warehouse.toWeightArray()).toEqual([11, 12, 22, 25, 34, 64, 90])
    expect(warehouse.verifyIntegrity()).toBe(true)

    // Events are emitted by both machines
    expect(weightScanner.getEvents().length).toBeGreaterThan(0)
    expect(singleCrane.getEvents().length).toBeGreaterThan(0)
  })

  it('clears event buffers properly', () => {
    const warehouse = new WarehouseArrayState([10, 20])
    const scanner = new WeightScanner(warehouse)
    const crane = new SingleCrane(warehouse)

    scanner.getWeightBox()
    crane.swap()
    expect(scanner.getEvents().length).toBe(1)
    expect(crane.getEvents().length).toBe(1)

    scanner.clearEvents()
    crane.clearEvents()
    expect(scanner.getEvents().length).toBe(0)
    expect(crane.getEvents().length).toBe(0)
  })
})
