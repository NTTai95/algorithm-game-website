# .human - Human Developer Workspace

## Purpose & Scope
This directory is exclusively reserved for the human developers. It is **NOT** part of the automated AI context, and AI agents are strictly forbidden from automatically scanning, ingesting, or acting on files contained within this directory.

## Acceptable Uses
Human developers may use this directory to store:
- Personal development and scratch notes (`notes/`)
- Machine-specific commands and terminal aliases (`commands/`)
- Local workstation setup scripts and environment instructions (`setup/`)
- Human-only deliberations, roadmap notes, and strategic decisions (`decisions/`)
- Historical records, retrospectives, and manual procedure logs (`history/`)

## Operational Separation
- **`.human/`**: Human private context and manual operating records.
- **`.ai/`**: AI operational workspace and machine-readable protocol.

> **Instruction Flow**: If a human developer wishes to convey an instruction, rule, or constraint to future AI agents, it must be intentionally documented in `.ai/CONTROL.md` or the corresponding specification file under `.ai/`.

## Security Notice
Do **NOT** commit secrets, passwords, API keys, personal access tokens, private credentials, or sensitive machine paths into tracked files in this directory.
