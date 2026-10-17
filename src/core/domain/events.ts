import type { Crate } from './crate'

/**
 * Standard comparison result:
 * -1: valueA < valueB
 *  0: valueA === valueB
 *  1: valueA > valueB
 */
export type ComparisonResult = -1 | 0 | 1

export interface CraneMoveEvent {
  readonly type: 'CRANE_MOVE'
  readonly from: number
  readonly to: number
  readonly timestamp: number
}

export interface CraneCompareEvent {
  readonly type: 'CRANE_COMPARE'
  readonly indexA: number
  readonly indexB: number
  readonly valueA: number
  readonly valueB: number
  readonly result: ComparisonResult
  readonly timestamp: number
}

export interface CraneSwapEvent {
  readonly type: 'CRANE_SWAP'
  readonly indexA: number
  readonly indexB: number
  readonly crateA: Crate
  readonly crateB: Crate
  readonly timestamp: number
}

export type MachineEvent = CraneMoveEvent | CraneCompareEvent | CraneSwapEvent
