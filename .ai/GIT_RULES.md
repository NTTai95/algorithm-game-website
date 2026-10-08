# Git Development Protocol

Git is a fundamental component of the project's multi-agent control structure. All agents must operate within these branch boundaries and commit standards.

## Branch Hierarchy

### `main`
- **Owner**: Human controlled exclusively.
- **Status**: Stable, production-ready approved foundation.
- **Rule**: AI agents must **NEVER** commit directly to, push directly to, or merge into `main`.

### `develop`
- **Owner**: Human controlled integration branch.
- **Status**: Active integration target for completed and approved tasks.
- **Rule**: AI agents must branch off `develop` when starting tasks. AI agents must **NEVER** directly push to or merge into `develop` without explicit human authorization.

### `task/TASK-XXX-<slug>`
- **Owner**: Claiming AI agent.
- **Scope**: Exactly one logical task or feature.
- **Rule**: AI implementation takes place exclusively on these task branches.

## Branch Inspection Protocol
Before performing any git operation or editing files, future AI agents must:
1. Run `git status` and `git branch --show-current` to identify the active branch.
2. Confirm the active branch matches the claimed task ID in `.ai/CONTROL.md`.
3. Respect all branch permissions and guardrails.

## Commit Message Conventions
Every commit must represent a single, atomic logical change.

### Format
`<TASK_ID>: <imperative description>`

### Examples
- `TASK-001: create warehouse domain models`
- `TASK-002: implement crane event emitter`
- `INIT-001: establish project foundation` *(Initialization commit)*

## Prohibited Git Actions
AI agents MUST NEVER:
- Force push (`git push -f`) to any shared or protected branches.
- Rewrite history on `main` or `develop`.
- Delete `main` or `develop`.
- Merge any branch into `main` or `develop` without explicit human review and execution.
