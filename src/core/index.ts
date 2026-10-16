/**
 * Core Domain & Simulation Layer
 *
 * This layer contains pure TypeScript algorithm logic, step generation,
 * simulation models, deterministic event emitters, and in-browser Java sandbox.
 * It remains completely independent of UI (React) and rendering (Phaser).
 */

// Domain models
export * from './domain/crate'
export * from './domain/events'
export * from './domain/warehouse-array'

// Machine interfaces & implementations
export * from './machines/machine-interface'
export * from './machines/crane'

// Java Parser & Virtual Step Runner
export * from './parser/ast-types'
export * from './parser/lexer'
export * from './parser/parser'
export * from './vm/environment'
export * from './vm/virtual-machine'

export const CORE_LAYER_STATUS = 'OPERATIONAL' as const
