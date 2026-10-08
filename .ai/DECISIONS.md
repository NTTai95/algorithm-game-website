# Architecture Decision Records (ADR)

## ADR-001: Establish AI-Assisted Task-Based Development Protocol

### Status
Accepted

### Context
The project is built by two human developers collaborating with two independent AI coding agents operating from separate machines and sharing a central Git repository. Without a formal, machine-readable protocol and branch isolation, multi-agent AI development risks code collisions, architectural drift, out-of-scope refactoring, and hallucinated dependencies.

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
