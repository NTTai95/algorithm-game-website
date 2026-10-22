import { WarehouseArrayState } from '../domain/warehouse-array'
import type { CraneSwapEvent, ScannerReadEvent } from '../domain/events'
import type { LevelMachine } from '../levels/types'
import {
  collectMachineEvents,
  computeMachineStats,
  createMachineSet,
  createSandboxContext,
  type MachineSet,
} from '../machines/machine-sandbox'
import { DEFAULT_STEP_BUDGET, VirtualMachine } from '../vm/virtual-machine'
import { DiagnosticEngine } from './diagnostic-engine'
import type { DiagnosticReport } from './diagnostic-types'
import type { TestCaseResult } from './validator-types'

export type TutorialLevelId = '0.1' | '0.2' | '0.3'

export interface TutorialObjectiveResult {
  readonly passed: boolean
  readonly reason?: string
  readonly actual?: string
  readonly expected?: string
}

const PASS: TutorialObjectiveResult = { passed: true }

/**
 * Checks the stage objective of a tutorial level from the machine trace.
 * Rules are array-independent so they keep working with randomized problems.
 */
export function checkTutorialObjective(
  levelId: TutorialLevelId,
  initialWeights: readonly number[],
  machines: MachineSet
): TutorialObjectiveResult {
  const events = collectMachineEvents(machines)
  const reads = events.filter((e): e is ScannerReadEvent => e.type === 'SCANNER_READ')
  const swaps = events.filter((e): e is CraneSwapEvent => e.type === 'CRANE_SWAP')
  const n = initialWeights.length

  switch (levelId) {
    case '0.1': {
      const readIndices = new Set(reads.map((r) => r.index))
      const missing = Array.from({ length: n }, (_, i) => i).filter((i) => !readIndices.has(i))
      if (missing.length > 0) {
        return {
          passed: false,
          reason: `Máy quét chưa đọc khối lượng của thùng tại vị trí: ${missing.join(', ')}.`,
          actual: `Đã đọc ${readIndices.size}/${n} thùng`,
          expected: `Đọc đủ ${n}/${n} thùng hàng`,
        }
      }
      if (machines.weightScanner.position() !== 0) {
        return {
          passed: false,
          reason: 'Máy quét chưa được đưa về vị trí ban đầu sau khi quét xong.',
          actual: `Máy quét đang ở ô ${machines.weightScanner.position()}`,
          expected: 'Gọi weightScanner.moveStart() để về ô 0',
        }
      }
      return PASS
    }

    case '0.2': {
      const swapStarts = swaps.map((s) => s.indexA)
      if (swapStarts.length !== 2 || swapStarts[0] !== 0 || swapStarts[1] !== 1) {
        return {
          passed: false,
          reason: 'Cần hoán đổi cặp thùng (0, 1) trước, sau đó di chuyển cần cẩu và hoán đổi cặp (1, 2).',
          actual: swapStarts.length
            ? `Các lần swap tại vị trí: ${swapStarts.join(', ')}`
            : 'Chưa có lần swap nào',
          expected: 'Swap tại vị trí 0, rồi swap tại vị trí 1',
        }
      }
      return PASS
    }

    case '0.3': {
      const firstSwapSeq = swaps[0]?.seq ?? Number.POSITIVE_INFINITY
      const readBeforeSwap = (index: number) =>
        reads.some((r) => r.index === index && (r.seq ?? 0) < firstSwapSeq)
      if (!readBeforeSwap(0) || !readBeforeSwap(1)) {
        return {
          passed: false,
          reason: 'Phải dùng weightScanner đo khối lượng thùng 0 và thùng 1 trước khi quyết định hoán đổi.',
          actual: `Đã đo trước khi swap: ${[0, 1].filter(readBeforeSwap).join(', ') || 'không thùng nào'}`,
          expected: 'Đo cả thùng 0 và thùng 1',
        }
      }
      const shouldSwap = initialWeights[0] > initialWeights[1]
      const swappedFirstPair = swaps.length === 1 && swaps[0].indexA === 0
      if (shouldSwap ? !swappedFirstPair : swaps.length > 0) {
        return {
          passed: false,
          reason: shouldSwap
            ? `Thùng 0 (${initialWeights[0]}kg) nặng hơn thùng 1 (${initialWeights[1]}kg) nên phải swap đúng 1 lần tại vị trí 0.`
            : `Thùng 0 (${initialWeights[0]}kg) không nặng hơn thùng 1 (${initialWeights[1]}kg) nên không được swap.`,
          actual: `${swaps.length} lần swap`,
          expected: shouldSwap ? '1 lần swap tại vị trí 0' : '0 lần swap',
        }
      }
      return PASS
    }
  }
}

/** Builds the diagnostic report shown in the modal for a tutorial run. */
export function createTutorialReport(
  levelTitle: string,
  initialWeights: readonly number[],
  machines: MachineSet,
  objective: TutorialObjectiveResult
): DiagnosticReport {
  const testCase: TestCaseResult = {
    name: levelTitle,
    input: initialWeights,
    passed: objective.passed,
    error: objective.reason,
    ...computeMachineStats(machines),
  }

  if (!objective.passed) {
    return {
      ...DiagnosticEngine.fromInvariantViolation(
        objective.reason ?? 'Chưa hoàn thành mục tiêu màn chơi.',
        { actual: objective.actual, expected: objective.expected },
        [testCase],
        levelTitle
      ),
      hint: 'Đọc lại phần "Nhiệm vụ" phía trên và chỉnh code để hoàn thành đúng yêu cầu của màn.',
      hiddenTestsPassed: 0,
      totalHiddenTests: 1,
    }
  }

  return {
    ...DiagnosticEngine.createSuccessReport([testCase], 1, levelTitle),
    message: `Hoàn thành nhiệm vụ ${levelTitle}!`,
  }
}

/**
 * Runs tutorial code on a fresh warehouse with only the allotted machines and checks the objective.
 */
export function runTutorialCheck(
  levelId: TutorialLevelId,
  levelTitle: string,
  allowedMachines: readonly LevelMachine[],
  javaCode: string,
  input: readonly number[]
): DiagnosticReport {
  const machines = createMachineSet(new WarehouseArrayState(input))
  const vm = new VirtualMachine()

  try {
    vm.load(javaCode, createSandboxContext(machines, allowedMachines), { maxSteps: DEFAULT_STEP_BUDGET })
  } catch (err: unknown) {
    return { ...DiagnosticEngine.fromParserError(err, [], levelTitle), totalHiddenTests: 1 }
  }

  const result = vm.runAll()
  if (result.error) {
    return {
      ...DiagnosticEngine.fromVMError(result.error, result.currentLine, result.stepCount, [], levelTitle),
      totalHiddenTests: 1,
    }
  }

  return createTutorialReport(levelTitle, input, machines, checkTutorialObjective(levelId, input, machines))
}
