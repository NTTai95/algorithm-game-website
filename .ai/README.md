# .ai - Machine-Readable Development Protocol

## Purpose
The `.ai/` directory serves as the definitive, machine-readable operational protocol and knowledge repository for all AI coding agents working on the **Algorithm Game Website** project.

Any AI agent interacting with this repository MUST read and adhere to the guidelines, architecture boundaries, and control states defined within this directory before reading codebase files or performing tasks.

## Core Rules for AI Agents
1. **Protocol Compliance**: Files in `.ai/` are binding operational contracts, not mere suggestions.
2. **Operational Boundaries**: AI agents operate under the permissions dictated by `.ai/CONTROL.md`.
3. **Collaboration Protocol**: This repository is shared between two human developers and two independent AI agents running on separate machines. Coordination occurs strictly through the structured protocols documented in `.ai/tasks/`, `.ai/changes/`, `.ai/sessions/`, and Git branch standards in `.ai/GIT_RULES.md`.

## Relationship Between `.ai/` and `.human/`
- **`.ai/`**: AI-operational workspace. AI agents must consult this directory to understand project constraints, architectures, domain models, workflows, and task permissions.
- **`.human/`**: Human-only workspace. AI agents **MUST NOT** automatically inspect, read, or process files inside `.human/`. If human developers want an instruction or decision to govern AI behavior, they will explicitly migrate or record that instruction into `.ai/CONTROL.md` or the appropriate `.ai/` specification file.
