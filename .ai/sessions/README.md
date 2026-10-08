# AI Session Log Protocol

This directory provides persistent handoff and execution records between disparate AI coding sessions operating on separate machines.

## Purpose
Because two separate AI agents run independently on different workstations, session logs ensure transparent context preservation across restarts, task handoffs, and branch transitions.

## Session Record Format
At the conclusion of a significant work session or prior to handoff, an AI agent creates a file named `SESSION-<DATE>-<AGENT_ID>-<TASK_ID>.md` documenting:
- **Timestamp & Machine**: Execution date, time, and environment context.
- **Active Branch**: Verified Git branch name.
- **Claimed Task**: Task identifier and current lifecycle phase.
- **Current Mode**: Operational mode verified from `.ai/CONTROL.md`.
- **Files Changed**: Inventory of modified or created files.
- **Tests Performed**: Output summary of `npm run test:run`, `npm run lint`, and `npm run typecheck`.
- **Unresolved Issues / Blockers**: Any questions, anomalies, or edge cases encountered.
- **Handoff Notes**: Clear, concise briefing for the next human or AI developer picking up the task.
