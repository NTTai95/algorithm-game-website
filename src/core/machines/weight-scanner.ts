import {
  type MachineEvent,
  type ScannerMoveEvent,
  type ScannerMoveStartEvent,
  type ScannerReadEvent,
  nextEventSequence,
} from '../domain/events'
import type { WarehouseArrayState } from '../domain/warehouse-array'

export interface IWeightScanner {
  getWeightBox(): number
  move(step?: number): boolean
  moveStart(): void
  position(): number
  getEvents(): readonly MachineEvent[]
  clearEvents(): void
}

export class WeightScanner implements IWeightScanner {
  private currentPosition: number = 0
  private events: MachineEvent[] = []
  private readonly state: WarehouseArrayState

  constructor(state: WarehouseArrayState) {
    this.state = state
  }

  /**
   * Reads and returns the weight of the box currently under the scanner.
   */
  getWeightBox(): number {
    const weight = this.state.getWeight(this.currentPosition)
    const event: ScannerReadEvent = {
      type: 'SCANNER_READ',
      seq: nextEventSequence(),
      index: this.currentPosition,
      weight,
      timestamp: Date.now(),
    }
    this.events.push(event)
    return weight
  }

  /**
   * Moves the scanner by `step` slots (defaults to 1).
   * Throws RangeError if target position is outside the warehouse boundary.
   */
  move(step: number = 1): boolean {
    const target = this.currentPosition + step
    if (target < 0 || target >= this.state.length) {
      throw new RangeError(
        `WeightScanner không thể di chuyển đến vị trí ${target} (ngoài phạm vi [0, ${this.state.length - 1}]).`
      )
    }

    const event: ScannerMoveEvent = {
      type: 'SCANNER_MOVE',
      seq: nextEventSequence(),
      from: this.currentPosition,
      to: target,
      step,
      timestamp: Date.now(),
    }
    this.events.push(event)
    this.currentPosition = target
    return true
  }

  /**
   * Immediately resets the scanner back to index 0.
   */
  moveStart(): void {
    const event: ScannerMoveStartEvent = {
      type: 'SCANNER_MOVE_START',
      seq: nextEventSequence(),
      from: this.currentPosition,
      to: 0,
      timestamp: Date.now(),
    }
    this.events.push(event)
    this.currentPosition = 0
  }

  /**
   * Returns current slot position of the scanner.
   */
  position(): number {
    return this.currentPosition
  }

  /**
   * Returns all recorded scanner events.
   */
  getEvents(): readonly MachineEvent[] {
    return [...this.events]
  }

  /**
   * Clears the event buffer.
   */
  clearEvents(): void {
    this.events = []
  }
}
