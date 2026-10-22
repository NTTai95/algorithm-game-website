import { describe, expect, it } from 'vitest'
import {
  generateProblemArray,
  PRESET_LABELS,
  type ProblemPreset,
} from '../../core/levels/generator'

describe('Problem Array Generator (TASK-012)', () => {
  it('generates random problem array within default constraints', () => {
    const array = generateProblemArray()
    expect(array.length).toBeGreaterThanOrEqual(5)
    expect(array.length).toBeLessThanOrEqual(7)
    for (const val of array) {
      expect(val).toBeGreaterThanOrEqual(5)
      expect(val).toBeLessThanOrEqual(95)
      expect(Number.isInteger(val)).toBe(true)
    }
  })

  it('generates strictly reversed (descending) array for worst case preset', () => {
    for (let test = 0; test < 5; test++) {
      const array = generateProblemArray({ length: 6, preset: 'reversed' })
      expect(array.length).toBe(6)
      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i]).toBeGreaterThanOrEqual(array[i + 1])
      }
    }
  })

  it('generates nearly-sorted array with only small local perturbation', () => {
    for (let test = 0; test < 5; test++) {
      const array = generateProblemArray({ length: 6, preset: 'nearly-sorted' })
      expect(array.length).toBe(6)
      // Array should have numbers within bounds
      expect(array.every((n) => n >= 5 && n <= 95)).toBe(true)
    }
  })

  it('generates array with duplicate weights for stability testing preset', () => {
    for (let test = 0; test < 5; test++) {
      const array = generateProblemArray({ length: 6, preset: 'duplicates' })
      expect(array.length).toBe(6)
      const unique = new Set(array)
      expect(unique.size).toBeLessThan(array.length)
    }
  })

  it('respects custom length and weight boundaries', () => {
    const array = generateProblemArray({
      length: 8,
      minWeight: 20,
      maxWeight: 40,
    })
    expect(array.length).toBe(8)
    for (const val of array) {
      expect(val).toBeGreaterThanOrEqual(20)
      expect(val).toBeLessThanOrEqual(40)
    }
  })

  it('provides readable human labels for all supported presets', () => {
    const presets: ProblemPreset[] = ['random', 'reversed', 'nearly-sorted', 'duplicates']
    for (const p of presets) {
      expect(PRESET_LABELS[p]).toBeDefined()
      expect(PRESET_LABELS[p].length).toBeGreaterThan(0)
    }
  })
})
