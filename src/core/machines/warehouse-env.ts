import type { WarehouseArrayState } from '../domain/warehouse-array'

/**
 * Interface representing the warehouse environment as exposed to user Java scripts.
 * In Java code: `wareHouse.getCountBox()`
 */
export interface IWarehouseEnvironment {
  getCountBox(): number
  length(): number
}

export class WarehouseEnvironment implements IWarehouseEnvironment {
  private readonly state: WarehouseArrayState

  constructor(state: WarehouseArrayState) {
    this.state = state
  }

  /**
   * Returns the total count of boxes in the warehouse.
   */
  getCountBox(): number {
    return this.state.length
  }

  /**
   * Alias for getCountBox() for backwards compatibility.
   */
  length(): number {
    return this.state.length
  }
}
