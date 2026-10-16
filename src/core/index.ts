/**
 * Core Domain & Simulation Layer
 *
 * This layer contains pure TypeScript algorithm logic, step generation,
 * simulation models, and deterministic event emitters.
 * It remains completely independent of UI (React) and rendering (Phaser).
 */

// Domain models
export * from './domain/crate'
export * from './domain/events'
export * from './domain/warehouse-array'

// Machine interfaces & implementations
export * from './machines/machine-interface'
export * from './machines/crane'

export const CORE_LAYER_STATUS = 'OPERATIONAL' as const
