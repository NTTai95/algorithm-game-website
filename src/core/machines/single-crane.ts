import {
  type CraneMoveEvent,
  type CraneMoveStartEvent,
  type CraneSwapEvent,
  type MachineEvent,
  nextEventSequence,
} from '../domain/events'
import type { WarehouseArrayState } from '../domain/warehouse-array'

export interface ISingleCrane {
  swap(): boolean
  move(step?: number): boolean
  moveStart(): void
  position(): number
  getEvents(): readonly MachineEvent[]
  clearEvents(): void
}

export class SingleCrane implements ISingleCrane {
  private currentPosition: number = 0
  private events: MachineEvent[] = []
  private readonly state: WarehouseArrayState

  constructor(state: WarehouseArrayState) {
    this.state = state
  }

  /**
   * Swaps the two adjacent crates at currentPosition and currentPosition + 1.
   * Throws RangeError if currentPosition is at or beyond the last slot.
   */
  swap(): boolean {
    if (this.currentPosition >= this.state.length - 1) {
      throw new RangeError(
        `SingleCrane không thể swap tại vị trí ${this.currentPosition} vì không có thùng hàng kế tiếp.`
      )
    }

    const indexA = this.currentPosition
    const indexB = this.currentPosition + 1
    const crateA = this.state.getCrate(indexA)
    const crateB = this.state.getCrate(indexB)

    this.state.swap(indexA, indexB)

    const event: CraneSwapEvent = {
      type: 'CRANE_SWAP',
      seq: nextEventSequence(),
      indexA,
      indexB,
      crateA,
      crateB,
      weightA: crateA.weight,
      weightB: crateB.weight,
      timestamp: Date.now(),
    }
    this.events.push(event)
    return true
  }

  /**
   * Moves the crane by `step` slots (defaults to 1).
   * Throws RangeError if target position is outside the warehouse boundary.
   */
  move(step: number = 1): boolean {
    const target = this.currentPosition + step
    if (target < 0 || target >= this.state.length) {
      throw new RangeError(
        `SingleCrane không thể di chuyển đến vị trí ${target} (ngoài phạm vi [0, ${this.state.length - 1}]).`
      )
    }

    const event: CraneMoveEvent = {
      type: 'CRANE_MOVE',
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
   * Immediately resets the crane position back to index 0.
   */
  moveStart(): void {
    const event: CraneMoveStartEvent = {
      type: 'CRANE_MOVE_START',
      seq: nextEventSequence(),
      from: this.currentPosition,
      to: 0,
      timestamp: Date.now(),
    }
    this.events.push(event)
    this.currentPosition = 0
  }

  /**
   * Returns current slot position of the crane.
   */
  position(): number {
    return this.currentPosition
  }

  /**
   * Returns all recorded crane events.
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
