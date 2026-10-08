# AI Command & Control Surface

```yaml
MODE: MASTER
CURRENT_TASK: NONE
COMMAND: INITIALIZE
ALLOW_CODE: YES
ALLOW_TEST: YES
ALLOW_COMMIT: YES
ALLOW_MERGE: NO
ALLOW_ARCHITECTURE_CHANGE: YES
ALLOW_DEPENDENCY_INSTALL: YES
```

## Governance and Ownership
- **Human Authority**: Human developers exclusively own, configure, and alter this file.
- **AI Permissions**: AI agents may **READ** this file to determine current execution parameters.
- **Strict Prohibition**: AI agents **MUST NOT** silently modify this file or elevate their own permissions under any circumstances.
- **Future Task-Based Enforcement**: In future task-based phases, this surface will enforce task assignment, branch boundaries, code editing allowances, and dependency constraints for each respective AI agent.
