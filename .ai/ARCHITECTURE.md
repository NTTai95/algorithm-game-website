# High-Level Architecture Principles

## Layered Architecture Overview
The platform follows a decoupled, unidirectional dependency structure:

```
Application (React UI, Routing, HUD, Menus)
     ↓
Game Systems (Session, Level Manager, Audio, Telemetry)
     ↓
Domain / Simulation (DSA Core, Algorithms, Sorting Engine, Step Emitters)
     ↓
Rendering / Presentation (Phaser 3 Canvas, Sprites, Animations, Effects)
```

## Core Architectural Principles

1. **Decoupled Simulation from Presentation**:
   - The algorithmic simulation engine (e.g., sorting algorithms, step generators, box arrays) MUST exist and be fully executable independent of Phaser or any visual rendering library.
   - Simulation state transitions emit deterministic events (e.g., `COMPARE`, `SWAP`, `LIFT`, `DROP`).
   - The visual rendering layer (Phaser 3) listens to these events and translates them into animations (e.g., crane motion, box lifting).

2. **Decoupled UI from Game Loop**:
   - React manages user interaction controls (play, pause, step forward, algorithm selection, speed control, explanation panels).
   - React does not embed internal game loops or direct sprite manipulation within components.

3. **Multi-Game Extensibility**:
   - While the first game is a Warehouse Sorting game (boxes, cranes, conveyors), the core architecture must easily accommodate future DSA games (e.g., Graph Traversals, Tree Balance, Pathfinding).

4. **Deterministic and Testable**:
   - Domain simulation code must be 100% testable via unit tests in Vitest without requiring a headless browser or canvas context.
