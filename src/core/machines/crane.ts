import type { WarehouseArrayState } from '../domain/warehouse-array'
import type { ComparisonResult, MachineEvent } from '../domain/events'
import type { CraneStats, ICrane } from './machine-interface'

/**
 * Crane machine adapter.
 * Controls sequential mechanical traversal and adjacent element operations.
 */
export class Crane implements ICrane {
  private readonly warehouse: WarehouseArrayState
  private currentPosition: number = 0
  private readonly events: MachineEvent[] = []
  private movesCount: number = 0
  private comparisonsCount: number = 0
  private swapsCount: number = 0

  constructor(warehouse: WarehouseArrayState) {
    this.warehouse = warehouse
  }

  /**
   * Moves the crane forward 1 slot.
   */
  next(): boolean {
    if (this.currentPosition < this.warehouse.length - 1) {
      const from = this.currentPosition
      this.currentPosition += 1
      this.movesCount += 1
      this.events.push({
        type: 'CRANE_MOVE',
        from,
        to: this.currentPosition,
        timestamp: Date.now(),
      })
      return true
    }
    return false
  }

  /**
   * Moves the crane backward 1 slot.
   */
  prev(): boolean {
    if (this.currentPosition > 0) {
      const from = this.currentPosition
      this.currentPosition -= 1
      this.movesCount += 1
      this.events.push({
        type: 'CRANE_MOVE',
        from,
        to: this.currentPosition,
        timestamp: Date.now(),
      })
      return true
    }
    return false
  }

  /**
   * Resets the crane position back to index 0.
   */
  reset(): void {
    if (this.currentPosition !== 0) {
      const from = this.currentPosition
      this.currentPosition = 0
      this.movesCount += 1
      this.events.push({
        type: 'CRANE_MOVE',
        from,
        to: 0,
        timestamp: Date.now(),
      })
    }
  }

  /**
   * Current slot index.
   */
  position(): number {
    return this.currentPosition
  }

  /**
   * Total length of the array in the warehouse.
   */
  length(): number {
    return this.warehouse.length
  }

  /**
   * Reads the value at the crane's current position.
   */
  read(): number {
    return this.warehouse.getValue(this.currentPosition)
  }

  /**
   * Compares the crate at the current position with the adjacent crate at position + 1.
   * Throws an error if the crane is at the last slot.
   */
  compare(): ComparisonResult {
    if (this.currentPosition >= this.warehouse.length - 1) {
      throw new Error(
        `Cần cẩu đang ở vị trí cuối cùng (${this.currentPosition}), không thể so sánh với phần tử tiếp theo.`
      )
    }

    const indexA = this.currentPosition
    const indexB = this.currentPosition + 1
    const valueA = this.warehouse.getValue(indexA)
    const valueB = this.warehouse.getValue(indexB)

    let result: ComparisonResult = 0
    if (valueA > valueB) {
      result = 1
    } else if (valueA < valueB) {
      result = -1
    }

    this.comparisonsCount += 1
    this.events.push({
      type: 'CRANE_COMPARE',
      indexA,
      indexB,
      valueA,
      valueB,
      result,
      timestamp: Date.now(),
    })

    return result
  }

  /**
   * Swaps the crate at current position with adjacent crate at position + 1.
   * Throws an error if the crane is at the last slot.
   */
  swap(): boolean {
    if (this.currentPosition >= this.warehouse.length - 1) {
      throw new Error(
        `Cần cẩu đang ở vị trí cuối cùng (${this.currentPosition}), không thể hoán đổi với phần tử tiếp theo.`
      )
    }

    const indexA = this.currentPosition
    const indexB = this.currentPosition + 1
    const crateA = this.warehouse.getCrate(indexA)
    const crateB = this.warehouse.getCrate(indexB)

    this.warehouse.swap(indexA, indexB)
    this.swapsCount += 1

    this.events.push({
      type: 'CRANE_SWAP',
      indexA,
      indexB,
      crateA,
      crateB,
      timestamp: Date.now(),
    })

    return true
  }

  /**
   * Returns a copy of the emitted machine events.
   */
  getEvents(): readonly MachineEvent[] {
    return [...this.events]
  }

  /**
   * Clears the event buffer.
   */
  clearEvents(): void {
    this.events.length = 0
  }

  /**
   * Returns operational statistics for HUD and scoring.
   */
  getStats(): CraneStats {
    return {
      movesCount: this.movesCount,
      comparisonsCount: this.comparisonsCount,
      swapsCount: this.swapsCount,
    }
  }
}
