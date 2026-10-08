# Public API Contracts

This file serves as the registry of stable, public APIs and cross-module interfaces. Once an interface is committed here, breaking changes require an approved proposal in `.ai/changes/`.

## Current State
No game or simulation APIs are finalized during this initialization phase. In accordance with project rules, arbitrary APIs must not be invented prematurely.

## Pending Contracts
- `ISimulationEngine`: Step generator, event emitter, and state inspector for DSA simulations.
- `ISimulationEvent`: Atomic event structure for renderer consumption.
- `IAlgorithm`: Standard interface for pluggable sorting algorithms.
- `IWarehouseState`: Snapshot model of slots, boxes, and crane positions.
- `IGameSceneBridge`: Communication boundary connecting React UI controls with the Phaser 3 game container.
