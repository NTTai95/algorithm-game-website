import type { MachineEvent } from '../domain/events'
import type { WarehouseArrayState } from '../domain/warehouse-array'
import type { TestCaseResult } from './validator-types'

export type DiagnosticErrorType =
  | 'SYNTAX'
  | 'MACHINE_RUNTIME'
  | 'INVARIANT'
  | 'UNSORTED'

export type DiagnosticSeverity = 'ERROR' | 'WARNING' | 'INFO'

export interface DiagnosticContextDetails {
  readonly actual: string
  readonly expected: string
  readonly indices?: readonly [number, number]
}

export interface DiagnosticReport {
  readonly success: boolean
  /** Backwards-compatible alias for success */
  readonly passed: boolean
  /** Backwards-compatible alias for success in trace validation */
  readonly valid: boolean
  readonly algorithmName: string
  readonly errorType?: DiagnosticErrorType
  readonly severity?: DiagnosticSeverity
  readonly message: string
  /** Backwards-compatible alias for message in trace validation */
  readonly reason?: string
  /** Backwards-compatible alias for failure message in test runner */
  readonly violationReason?: string
  readonly lineNumber?: number
  readonly stepIndex?: number
  readonly contextDetails?: DiagnosticContextDetails
  readonly hint?: string
  readonly hiddenTestsPassed?: number
  readonly totalHiddenTests?: number
  readonly testCases: readonly TestCaseResult[]
}

export interface IBubbleSortValidator {
  validateTrace(
    initialWeights: readonly number[],
    events: readonly MachineEvent[],
    finalArrayState: WarehouseArrayState
  ): DiagnosticReport

  runHiddenTests(javaCode: string): DiagnosticReport
}
