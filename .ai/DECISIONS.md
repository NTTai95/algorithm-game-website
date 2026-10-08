# Architecture Decision Records (ADR)

## ADR-001: Establish AI-Assisted Task-Based Development Protocol

### Status
Accepted

### Context
The project is built by two human developers collaborating with AI coding agents operating from separate machines and sharing a central Git repository. Without a formal, machine-readable protocol and branch isolation, multi-agent AI development risks code collisions, architectural drift, out-of-scope refactoring, and hallucinated dependencies.

### Decision
1. **Establish `.ai/` Workspace**: Provide a structured, machine-readable protocol directory where rules, architecture guidelines, domain vocabularies, active control permissions, and task assignments reside.
2. **Establish `.human/` Workspace**: Provide a distinct directory reserved solely for human documentation, notes, and local operations, shielded from automatic AI ingestion.
3. **Incorporate Git into Operational Control**: Enforce strict branch policies (`main` and `develop` under human control, task work isolated to `task/TASK-XXX-*` branches) and atomic commit messages linked to tasks.
4. **Isolated Task Branches**: Require that all subsequent AI coding work occurs in isolated task branches, preventing concurrent AI agents from interfering with each other's workspaces.
5. **Human Supremacy**: Humans maintain final authority over task definition, architectural proposals, code review, branch merges, and project integrations.

### Consequences
- Clear operational boundaries for any AI joining the repository.
- Safe concurrent multi-agent development without state collisions.
- Transparent audit trail of all architectural changes and implementation steps.

---

## ADR-002: Interchangeable AI Identity & Deterministic Halt Rule

### Status
Accepted

### Context
Using static identities like `AGENT_A` or `AGENT_B` creates fragile coupling to specific machines and complicates session handoffs or parallel agent work. Furthermore, without a deterministic check between `CONTROL.md`, Git branches, and task states, an AI could inadvertently commit to integration branches or execute out-of-order tasks.

### Decision
1. **Interchangeable AI Identity**: Operational identity is determined dynamically by:
   $$\text{TASK ID} + \text{GIT BRANCH} + \text{SESSION ID}$$
   No permanent agent identities are used; any AI on any machine can continue an active task following the handoff protocol.
2. **Deterministic Halt Rule**: AI agents must verify the 6-point consistency check (`CONTROL.md` $\leftrightarrow$ `Git Branch` $\leftrightarrow$ `Task State`) before writing any code (`COMMAND: IMPLEMENT`). Any mismatch requires an immediate halt.
3. **Separation of `.human/`**: Split `.human/` into `.human/shared/` and `.human/local/` (git-ignored) to allow individual workstation flexibility while keeping collaborative human documents synchronized.
4. **Distinction Between Changes and Drift**: Formalize `CHANGE PROPOSAL` (intentional design alterations) vs `DRIFT REPORT` (observed discrepancies between code and documentation), both requiring human arbitration.

### Consequences
- True multi-machine, multi-agent interchangeability.
- Prevention of unauthorized code writes on integration branches.
- Clear, standardized process for handling documentation/code discrepancies.

---

## ADR-003: 3-Branch Role Architecture, Sequential Control, and Human Operating System

### Status
Accepted

### Context
Allowing any branch to be modified arbitrarily or blurring the lines between system design, integration verification, and task implementation leads to race conditions, documentation clobbering, and unverified code merges. Furthermore, the human developers need a comprehensive operating manual to orchestrate multiple AI sessions predictably.

### Decision
1. **Strict 3-Branch Logic**:
   - `main`: Exclusively for Planning, System Architecture, and Protocol Maintenance. **Modification of `/src/` is strictly forbidden.**
   - `develop`: Exclusively for Integration Verification, Regression Testing, and Sprint Review. **Modification of `/src/` is strictly forbidden.**
   - `task/TASK-XXX-<slug>`: **The ONLY branch where `/src/` feature implementation is permitted.**
2. **Sequential vs. Concurrent Execution**:
   - `main` and `develop` operate strictly sequentially: only one AI session may operate on `main` at a time, and only one AI on `develop` at a time.
   - Multiple AI sessions may run concurrently ONLY on separate `task/*` branches.
   - Each AI session may own exactly ONE active task at a time ("1 AI = 1 Task").
3. **Human Operating Manual Structure**:
   - Build a comprehensive, standardized `.human/` operating manual containing guides, command cheatsheets, and step-by-step procedures (`procedures/start-session.md`, `assign-task.md`, `stop-ai.md`, `switch-task.md`, `review-task.md`, `complete-task.md`, `sprint-review.md`).
4. **Git Milestones & Integration Exclusivity**:
   - AI commits only within task scope and marks `READY_FOR_REVIEW`.
   - Merging task branches into `develop` is strictly a Human confirmation action. Tasks only become `DONE` after human integration.

### Consequences
- Absolute protection of `/src/` code on planning and integration branches.
- Deterministic, conflict-free multi-agent parallelization on task branches.
- Complete operational clarity for human developers orchestrating the project.
