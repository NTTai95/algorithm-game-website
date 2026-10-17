import type { Crate } from './crate'

/**
 * Standard comparison result:
 * -1: valueA < valueB
 *  0: valueA === valueB
 *  1: valueA > valueB
 */
export type ComparisonResult = -1 | 0 | 1

// Legacy Crane events (kept for backwards compatibility)
export interface CraneMoveEvent {
  readonly type: 'CRANE_MOVE'
  readonly from: number
  readonly to: number
  readonly step?: number
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
  readonly weightA?: number
  readonly weightB?: number
  readonly timestamp: number
}

export interface CraneMoveStartEvent {
  readonly type: 'CRANE_MOVE_START'
  readonly from: number
  readonly to: 0
  readonly timestamp: number
}

// Multi-Machine: WeightScanner events
export interface ScannerReadEvent {
  readonly type: 'SCANNER_READ'
  readonly index: number
  readonly weight: number
  readonly timestamp: number
}

export interface ScannerMoveEvent {
  readonly type: 'SCANNER_MOVE'
  readonly from: number
  readonly to: number
  readonly step: number
  readonly timestamp: number
}

export interface ScannerMoveStartEvent {
  readonly type: 'SCANNER_MOVE_START'
  readonly from: number
  readonly to: 0
  readonly timestamp: number
}

export type MachineEvent =
  | CraneMoveEvent
  | CraneCompareEvent
  | CraneSwapEvent
  | CraneMoveStartEvent
  | ScannerReadEvent
  | ScannerMoveEvent
  | ScannerMoveStartEvent
