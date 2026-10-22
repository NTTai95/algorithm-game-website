import { describe, expect, it } from 'vitest'
import { ALL_LEVELS, LEVEL_REGISTRY } from '../../core/levels/level-registry'
import {
  PLAYGROUND_PROBLEM_BOUNDS,
  generateProblemArray,
  type ProblemPreset,
} from '../../core/levels/generator'
import type { LevelConfig, LevelMachine } from '../../core/levels/types'
import { getMachineDocs } from '../../core/machines/machine-docs'
import { Parser } from '../../core/parser/parser'
import type { MethodDeclaration } from '../../core/parser/ast-types'
import { VirtualMachine } from '../../core/vm/virtual-machine'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { WarehouseEnvironment } from '../../core/machines/warehouse-env'
import { SingleCrane } from '../../core/machines/single-crane'
import { WeightScanner } from '../../core/machines/weight-scanner'
import { BubbleSortValidator } from '../../core/validator/bubble-sort-validator'
import { highlightJavaToHtml } from '../../core/parser/syntax-highlighter'

const PRESETS: readonly ProblemPreset[] = ['random', 'reversed', 'nearly-sorted', 'duplicates']
const ITERATIONS_PER_PRESET = 40

/** Runs level code with ONLY the machines that level allots (no legacy crane). */
function runLevelCode(level: LevelConfig, code: string, input: readonly number[]) {
  const warehouse = new WarehouseArrayState(input)
  const machines = {
    wareHouse: new WarehouseEnvironment(warehouse),
    singleCrane: new SingleCrane(warehouse),
    weightScanner: new WeightScanner(warehouse),
  }
  const context: Partial<Record<LevelMachine, object>> = {}
  for (const id of level.machines) context[id] = machines[id]

  const vm = new VirtualMachine()
  vm.load(code, context, { maxSteps: 50000 })
  const result = vm.runAll()
  return { result, warehouse, ...machines }
}

describe('Sprint 3 Integration (TASK-015)', () => {
  describe('Generator ↔ Playground bounds (AC-03)', () => {
    it.each(PRESETS)('preset "%s" stays within 5–8 boxes and 5–99 kg', (preset) => {
      for (let i = 0; i < ITERATIONS_PER_PRESET; i++) {
        const arr = generateProblemArray({ ...PLAYGROUND_PROBLEM_BOUNDS, preset })
        expect(arr.length).toBeGreaterThanOrEqual(PLAYGROUND_PROBLEM_BOUNDS.minLength)
        expect(arr.length).toBeLessThanOrEqual(PLAYGROUND_PROBLEM_BOUNDS.maxLength)
        expect(arr.every((w) => Number.isInteger(w) && w >= 5 && w <= 99)).toBe(true)
      }
    })
  })

  describe('Generator ↔ Bubble Sort validator', () => {
    const bubble = LEVEL_REGISTRY['bubble-sort']

    it.each(PRESETS)('reference solution passes invariant validation on "%s" problems', (preset) => {
      const validator = new BubbleSortValidator()
      for (let i = 0; i < ITERATIONS_PER_PRESET; i++) {
        const input = generateProblemArray({ ...PLAYGROUND_PROBLEM_BOUNDS, preset })
        const { result, warehouse, singleCrane, weightScanner } = runLevelCode(bubble, bubble.defaultCode, input)

        expect(result.error, `input ${JSON.stringify(input)}`).toBeUndefined()
        const report = validator.validateTrace(
          input,
          [...weightScanner.getEvents(), ...singleCrane.getEvents()],
          warehouse
        )
        expect(report.success, `${JSON.stringify(input)}: ${report.message}`).toBe(true)
      }
    })

    it('reference solution passes all hidden tests', () => {
      const report = new BubbleSortValidator().runHiddenTests(bubble.defaultCode)
      expect(report.success).toBe(true)
    })
  })

  describe('All levels run with only their allotted machines (AC-15.1)', () => {
    for (const level of ALL_LEVELS) {
      const sources = { defaultCode: level.defaultCode, ...level.templates }

      for (const [name, code] of Object.entries(sources)) {
        it(`level ${level.id} · ${name} runs on its initial array`, () => {
          const { result } = runLevelCode(level, code, level.initialArray)
          expect(result.error).toBeUndefined()
        })
      }

      it(`level ${level.id} · default code runs on generated arrays`, () => {
        for (const preset of PRESETS) {
          const input = generateProblemArray({ ...PLAYGROUND_PROBLEM_BOUNDS, preset })
          const { result } = runLevelCode(level, level.defaultCode, input)
          expect(result.error, `${preset} ${JSON.stringify(input)}`).toBeUndefined()
        }
      })
    }
  })

  describe('Level config ↔ solve() signature ↔ machine manual', () => {
    it.each(ALL_LEVELS.map((l) => [l.id, l] as const))(
      'level %s: solve() parameters match allotted machines and manual tabs',
      (_id, level) => {
        const program = new Parser(level.defaultCode).parse()
        const solve = program.body.find(
          (s): s is MethodDeclaration => s.type === 'MethodDeclaration' && s.name === 'solve'
        )
        expect(solve).toBeDefined()

        const params = solve!.params.map((p) => p.name).sort()
        expect(params).toEqual([...level.machines].sort())
        expect(getMachineDocs(level.machines).map((d) => d.id).sort()).toEqual(params)
      }
    )
  })

  describe('Syntax highlighter ↔ level code', () => {
    it.each(ALL_LEVELS.map((l) => [l.id, l] as const))(
      'level %s: highlighting preserves the exact source text',
      (_id, level) => {
        const html = highlightJavaToHtml(level.defaultCode)
        const text = html
          .replace(/<[^>]+>/g, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
        expect(text).toBe(level.defaultCode)
      }
    )
  })
})
