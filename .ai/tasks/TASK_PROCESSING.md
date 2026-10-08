# Task Processing Protocol

```yaml
CURRENT MODE: NO TASKS ACTIVE
TASK CAPACITY: 3-5 future tasks
```

## Task Lifecycle and Rules
1. **Creation**: Only human developers create or approve tasks in the task queue.
2. **Claiming**: An AI agent may claim a task marked `STATUS: READY` by recording its agent ID and transitioning the status to `STATUS: IN_PROGRESS` in the active task file.
3. **Explicit Ownership**: Task ownership is recorded directly in the task file. No AI agent may silently take, overwrite, or modify another agent's claimed task.
4. **Visibility**: Task status must be explicitly maintained across phases (`READY`, `IN_PROGRESS`, `READY_FOR_REVIEW`, `COMPLETED`).
5. **Completion & Integration**: Task completion requires human review and confirmation before the branch is merged into `develop` and the task file is archived to `.ai/tasks/completed/`.
