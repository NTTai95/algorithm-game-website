# Mandatory AI Operational Rules

Every AI coding agent operating in this repository MUST strictly follow these rules:

1. **Read Rules First**: Read `.ai/AI_RULES.md`, `.ai/CONTROL.md`, and relevant `.ai/` specifications before writing or modifying code.
2. **Inspect Existing Systems**: Thoroughly inspect existing code, components, and domain types before proposing or creating new abstractions.
3. **No Redundancy**: Do not duplicate existing classes, utilities, algorithms, or components. Reuse verified code.
4. **No Silent Architectural Shifts**: Do not silently alter or redesign the architectural layer boundaries (Application -> Game Systems -> Domain/Simulation -> Rendering).
5. **Protect Public Contracts**: Do not rename, remove, or modify public APIs and interfaces without explicit proposal and human approval.
6. **No Unauthorized Dependencies**: Do not install new third-party libraries or packages without explicit human authorization.
7. **No Unrelated Refactoring**: Do not perform cosmetic, stylistic, or unrelated refactoring outside of the assigned task scope.
8. **Strict Task Scoping**: Do not touch files or systems beyond the boundary of your claimed task.
9. **Meaningful Testing**: Write clear, comprehensive unit and integration tests for all newly added domain logic and core functionality.
10. **Verify Test Integrity**: Always run `npm run typecheck`, `npm run lint`, and `npm run test:run` after making changes to ensure zero regressions.
11. **Propose Architectural Changes**: If an architectural requirement arises, document it under `.ai/changes/` rather than implementing it unilaterally.
12. **Halt on Conflict**: When conflicting requirements, code drift, or test failures are detected, halt immediately and report instead of making assumptions.
13. **Human Supremacy**: Human developers retain ultimate architectural, task approval, integration, and operational authority.
14. **Verify Peer Work**: Do not blindly trust or assume code or documentation written by another AI agent on another machine is correct without verifying against the project source of truth.
15. **Git History Preservation**: Treat Git commit history as an immutable record of development history; follow conventional and task-scoped commit rules.
16. **Respect `.human/` Boundary**: Never automatically read, inspect, parse, or rely on files in `.human/`. That directory is exclusively for human developers.
