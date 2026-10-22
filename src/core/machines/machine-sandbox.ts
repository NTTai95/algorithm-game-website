import type { WarehouseArrayState } from '../domain/warehouse-array'
import type { MachineEvent } from '../domain/events'
import type { LevelMachine } from '../levels/types'
import { MACHINE_DOCS } from './machine-docs'
import { SingleCrane } from './single-crane'
import { WarehouseEnvironment } from './warehouse-env'
import { WeightScanner } from './weight-scanner'

/** Real machine instances driving one warehouse state (engine-side, never handed to player code). */
export interface MachineSet {
  readonly warehouse: WarehouseArrayState
  readonly wareHouse: WarehouseEnvironment
  readonly singleCrane: SingleCrane
  readonly weightScanner: WeightScanner
}

export function createMachineSet(warehouse: WarehouseArrayState): MachineSet {
  return {
    warehouse,
    wareHouse: new WarehouseEnvironment(warehouse),
    singleCrane: new SingleCrane(warehouse),
    weightScanner: new WeightScanner(warehouse),
  }
}

/**
 * Builds the VM context exposed to player code: only the machines allotted to the level,
 * and on each machine only the player-facing methods listed in MACHINE_DOCS.
 * Engine internals such as `getEvents()` / `clearEvents()` stay unreachable.
 */
export function createSandboxContext(
  machines: MachineSet,
  allowedMachines: readonly LevelMachine[]
): Record<string, object> {
  const context: Record<string, object> = {}

  for (const id of allowedMachines) {
    const target = machines[id] as unknown as Record<string, (...args: unknown[]) => unknown>
    const facade: Record<string, (...args: unknown[]) => unknown> = Object.create(null)
    for (const { name } of MACHINE_DOCS[id].methods) {
      facade[name] = (...args: unknown[]) => target[name](...args)
    }
    context[id] = Object.freeze(facade)
  }

  return context
}

/** All recorded machine events in chronological order. */
export function collectMachineEvents(machines: MachineSet): MachineEvent[] {
  return [...machines.weightScanner.getEvents(), ...machines.singleCrane.getEvents()].sort(
    (a, b) => (a.seq ?? 0) - (b.seq ?? 0)
  )
}

/** HUD / test-case counters derived from the event trace. */
export function computeMachineStats(machines: MachineSet): {
  movesCount: number
  comparisonsCount: number
  swapsCount: number
} {
  const events = collectMachineEvents(machines)
  const count = (...types: MachineEvent['type'][]) => events.filter((e) => types.includes(e.type)).length
  return {
    movesCount: count('CRANE_MOVE', 'CRANE_MOVE_START', 'SCANNER_MOVE', 'SCANNER_MOVE_START'),
    comparisonsCount: count('SCANNER_READ'),
    swapsCount: count('CRANE_SWAP'),
  }
}
