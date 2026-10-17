import { describe, expect, it } from 'vitest'
import {
  ALL_LEVELS,
  LEVEL_REGISTRY,
  getLevelById,
  parseRouteHash,
} from '../../core/levels/level-registry'
import { Parser } from '../../core/parser/parser'
import { VirtualMachine } from '../../core/vm/virtual-machine'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { WarehouseEnvironment } from '../../core/machines/warehouse-env'
import { SingleCrane } from '../../core/machines/single-crane'
import { WeightScanner } from '../../core/machines/weight-scanner'

describe('Level Registry & Route Parsing (TASK-010)', () => {
  it('registers all required modular levels (0.1, 0.2, 0.3, bubble-sort)', () => {
    expect(ALL_LEVELS.length).toBe(4)
    expect(LEVEL_REGISTRY['0.1']).toBeDefined()
    expect(LEVEL_REGISTRY['0.2']).toBeDefined()
    expect(LEVEL_REGISTRY['0.3']).toBeDefined()
    expect(LEVEL_REGISTRY['bubble-sort']).toBeDefined()
  })

  it('parses client-side hash routes accurately', () => {
    expect(parseRouteHash('')).toEqual({ page: 'home' })
    expect(parseRouteHash('#/')).toEqual({ page: 'home' })
    expect(parseRouteHash('/home')).toEqual({ page: 'home' })

    expect(parseRouteHash('#/tutorial/0.1')).toEqual({
      page: 'playground',
      levelId: '0.1',
    })
    expect(parseRouteHash('#/tutorial/0.2')).toEqual({
      page: 'playground',
      levelId: '0.2',
    })
    expect(parseRouteHash('#/tutorial/0.3')).toEqual({
      page: 'playground',
      levelId: '0.3',
    })
    expect(parseRouteHash('#/level/bubble-sort')).toEqual({
      page: 'playground',
      levelId: 'bubble-sort',
    })

    // Unknown routes fallback to home safely
    expect(parseRouteHash('#/unknown/route')).toEqual({ page: 'home' })
  })

  it('retrieves level configurations by ID with safe fallback', () => {
    const l1 = getLevelById('0.1')
    expect(l1.id).toBe('0.1')
    expect(l1.machines).toContain('weightScanner')

    const fallback = getLevelById('invalid-id')
    expect(fallback.id).toBe('bubble-sort')
  })

  it('ensures default code for every registered level parses cleanly and executes', () => {
    for (const level of ALL_LEVELS) {
      // 1. Parser verification
      const parser = new Parser(level.defaultCode)
      const ast = parser.parse()
      expect(ast.type).toBe('Program')
      expect(ast.body.length).toBeGreaterThan(0)

      // 2. VM loading & execution verification
      const warehouse = new WarehouseArrayState([...level.initialArray])
      const wareHouse = new WarehouseEnvironment(warehouse)
      const singleCrane = new SingleCrane(warehouse)
      const weightScanner = new WeightScanner(warehouse)

      const vm = new VirtualMachine()
      expect(() => {
        vm.load(level.defaultCode, { wareHouse, singleCrane, weightScanner }, { maxSteps: 10000 })
      }).not.toThrow()

      const res = vm.runAll()
      expect(res.done).toBe(true)
      expect(res.error).toBeUndefined()
    }
  })
})
