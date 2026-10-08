# AI Skill Registry

This registry catalogues required proficiencies and conventions for AI agents operating on this repository.

## 1. TypeScript
- Strict typing enabled; avoid `any` or loose type casting.
- Explicit interfaces for domain models and simulation events.
- Adhere to `erasableSyntaxOnly` and `verbatimModuleSyntax` compiler settings.

## 2. React
- React 19 functional components with hooks.
- Decouple UI shell/HUD from the Phaser canvas and game simulation.
- Lightweight state handling using standard React hooks (useState, useReducer, useContext).

## 3. Vite
- ESM bundler configuration.
- Asset handling via standard Vite import mechanisms.
- Fast HMR maintenance without circular dependency leaks.

## 4. Phaser 3
- Phaser 3 game lifecycle (Boot, Preload, Scene management).
- Separation of Phaser scenes (rendering/animation) from core algorithm state.
- Lifecycle cleanups to prevent canvas memory leaks during unmounts.

## 5. Testing (Vitest)
- Fast unit tests for all domain models, algorithms, and simulation state transitions.
- High test coverage on deterministic sorting steps and crane events.
- Script usage: `npm run test:run` for CI/checks, `npm run test` for watch mode.

## 6. Git
- Branch-scoped task discipline (`task/TASK-XXX-*`).
- Commit messaging standard: `TASK-XXX: description` (or `INIT-001` for foundation).
- Never push directly to or merge into `main` or `develop`.

## 7. Architecture
- Strict layered design: Application -> Game Systems -> Domain/Simulation -> Presentation/Phaser.
- Event-driven communication between simulation core and visual presentation.

## 8. Documentation
- Keep `.ai/` specifications updated when contracts or models evolve.
- Clean, concise technical comments explaining non-obvious algorithms and design decisions.
