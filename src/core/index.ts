/**
 * Core Domain & Simulation Layer
 *
 * This layer contains pure TypeScript algorithm logic, step generation,
 * simulation models, deterministic event emitters, in-browser Java sandbox,
 * and algorithm invariant validators.
 * It remains completely independent of UI (React) and rendering (Phaser).
 */

// Domain models
export * from './domain/crate'
export * from './domain/events'
export * from './domain/warehouse-array'

// Machine interfaces & implementations
export * from './machines'

// Java Parser & Virtual Step Runner
export * from './parser/ast-types'
export * from './parser/lexer'
export * from './parser/parser'
export * from './vm/environment'
export * from './vm/virtual-machine'

// Algorithm Validators
export * from './validator/validator-types'
export * from './validator/bubble-sort-validator'

export const CORE_LAYER_STATUS = 'OPERATIONAL' as const
