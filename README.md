# Algorithm Game Website

An educational Data Structures and Algorithms (DSA) web platform designed to transform algorithmic concepts into intuitive, interactive game experiences. The flagship game visualizes sorting algorithms through an industrial warehouse scenario involving boxes, conveyor slots, and mechanical cranes.

## Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Game Engine**: [Phaser 3](https://phaser.io/)
- **Test Runner**: [Vitest](https://vitest.dev/)
- **Linter**: [ESLint](https://eslint.org/) (Flat Configuration)
- **Styling**: Modern CSS / CSS Modules

The repository strictly adheres to a lightweight architecture with no heavy external UI libraries or state management frameworks.

## Architecture

The project maintains a strict layered separation of concerns:

```
Application (React UI, HUD, Controls)
     ↓
Game Systems (Session, Level Manager)
     ↓
Domain / Simulation (Deterministic Algorithm Execution & Step Emitters)
     ↓
Rendering / Presentation (Phaser 3 Scene, Animations, Visual Assets)
```

Game logic and sorting simulations are entirely decoupled from Phaser rendering, ensuring complete testability in headless environments.

## Development Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint check
npm run lint

# Run Vitest test suite once
npm run test:run

# Run Vitest in interactive watch mode
npm run test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

## Git Branch Model

- **`main`**: Protected branch representing the stable, approved foundation. Controlled exclusively by human developers. No direct AI commits or merges.
- **`develop`**: Integration branch for approved task completions. Controlled by human developers.
- **`task/TASK-XXX-<slug>`**: Dedicated feature/task branches created off `develop` for individual AI implementation tasks.

Commit message format follows:
`TASK-XXX: <short imperative description>` (or `INIT-001` for the initial foundation).

## Operational Protocol: `.ai` vs `.human`

- **`.ai/`**: Machine-readable protocol for AI coding agents. Contains operational rules (`AI_RULES.md`), state control (`CONTROL.md`), high-level architecture guidelines (`ARCHITECTURE.md`), ubiquitous vocabulary (`DOMAIN_MODEL.md`), API registries (`API_CONTRACTS.md`), and task tracking (`tasks/`).
- **`.human/`**: Dedicated workspace exclusively for human developers (notes, machine commands, local setup, planning). AI agents must **never** automatically inspect or process files in `.human/`. Any human instruction meant for AI agents is deliberately placed into `.ai/CONTROL.md` or other appropriate `.ai/` files.

## Project Status

- **Phase**: Master AI Initialization Complete
- **Active Task**: None (`CURRENT_MODE: NO TASKS ACTIVE`)
- **Status**: Technical foundation, test suite, and operational protocol established. Ready for human task definition.
