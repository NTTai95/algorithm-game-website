import type { ComparisonResult, MachineEvent } from '../domain/events'

export interface CraneStats {
  readonly movesCount: number
  readonly comparisonsCount: number
  readonly swapsCount: number
}

/**
 * Standard machine interface for Crane in levels requiring adjacent element manipulation.
 */
export interface ICrane {
  /**
   * Moves the crane forward by 1 slot.
   * Returns true if moved, false if already at the last slot.
   */
  next(): boolean

  /**
   * Moves the crane backward by 1 slot.
   * Returns true if moved, false if already at the first slot.
   */
  prev(): boolean

  /**
   * Resets the crane position to index 0.
   */
  reset(): void

  /**
   * Returns the current slot index of the crane.
   */
  position(): number

  /**
   * Returns the total number of slots in the warehouse array.
   */
  length(): number

  /**
   * Reads the numeric value of the crate directly beneath the crane.
   */
  read(): number

  /**
   * Compares the crate at current position with the crate at position + 1.
   * Throws Error if crane is at the last slot.
   */
  compare(): ComparisonResult

  /**
   * Swaps the crate at current position with the crate at position + 1.
   * Throws Error if crane is at the last slot.
   */
  swap(): boolean

  /**
   * Returns the list of all recorded machine events emitted by the crane.
   */
  getEvents(): readonly MachineEvent[]

  /**
   * Clears the event buffer.
   */
  clearEvents(): void

  /**
   * Returns operational statistics.
   */
  getStats(): CraneStats
}
