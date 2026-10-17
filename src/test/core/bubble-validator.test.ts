import { describe, expect, it } from 'vitest'
import { BubbleSortValidator } from '../../core/validator/bubble-sort-validator'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'

describe('BubbleSortValidator', () => {
  const validator = new BubbleSortValidator()

  it('approves a canonical Bubble Sort Java program across all hidden tests', () => {
    const validJavaBubbleSort = `
      int n = crane.length();
      for (int i = 0; i < n - 1; i++) {
        crane.reset();
        for (int j = 0; j < n - i - 1; j++) {
          if (crane.compare() > 0) {
            crane.swap();
          }
          crane.next();
        }
      }
    `

    const result = validator.runHiddenTests(validJavaBubbleSort)

    expect(result.passed).toBe(true)
    expect(result.violationReason).toBeUndefined()
    expect(result.testCases.length).toBe(5)
    for (const tc of result.testCases) {
      expect(tc.passed).toBe(true)
      expect(tc.movesCount).toBeGreaterThan(0)
    }
  })

  it('rejects solutions that do not sort the array', () => {
    const incompleteCode = `
      // Does only one comparison and stops
      crane.compare();
    `

    const result = validator.runHiddenTests(incompleteCode)

    expect(result.passed).toBe(false)
    expect(result.violationReason).toMatch(/chưa được sắp xếp/i)
  })

  it('rejects solutions with syntax errors gracefully', () => {
    const invalidSyntaxCode = `
      int x = ;
    `

    const result = validator.runHiddenTests(invalidSyntaxCode)

    expect(result.passed).toBe(false)
    expect(result.violationReason).toBeDefined()
  })

  it('rejects infinite loops safely via step budget', () => {
    const infiniteLoopCode = `
      while (true) {
        crane.next();
      }
    `

    const result = validator.runHiddenTests(infiniteLoopCode)

    expect(result.passed).toBe(false)
    expect(result.violationReason).toMatch(/vượt quá giới hạn/i)
  })

  it('rejects non-adjacent swap violation in trace', () => {
    const warehouse = new WarehouseArrayState([5, 1, 4])

    // Synthesize an illegal non-adjacent swap event
    const illegalEvents = [
      {
        type: 'CRANE_SWAP' as const,
        indexA: 0,
        indexB: 2,
        crateA: warehouse.getCrate(0),
        crateB: warehouse.getCrate(2),
        timestamp: Date.now(),
      },
    ]

    const check = validator.validateTrace([5, 1, 4], illegalEvents, warehouse)
    expect(check.valid).toBe(false)
    expect(check.reason).toMatch(/liền kề|kề nhau/i)
  })
})
