# AI Task Workflow Lifecycle

Future AI agents must strictly follow the structured development lifecycle. **AI agents MUST NOT skip directly from task assignment to code implementation.**

```
ANALYZE
  ↓
DESIGN
  ↓
CONTRACT
  ↓
TEST PLAN
  ↓
CONFLICT CHECK
  ↓
IMPLEMENT
  ↓
TEST
  ↓
SELF REVIEW
  ↓
READY FOR REVIEW
  ↓
HUMAN REVIEW
  ↓
INTEGRATE
  ↓
DONE
```

## Detailed Phases

1. **ANALYZE**:
   - Read the task description in `.ai/tasks/active/`.
   - Inspect `.ai/CONTROL.md` to confirm active permissions.
   - Analyze dependencies, affected files, and existing domain models in `.ai/DOMAIN_MODEL.md`.

2. **DESIGN**:
   - Plan the required types, state machines, or components.
   - Ensure the plan maintains separation between Game Logic / Simulation and Presentation / Phaser.

3. **CONTRACT**:
   - Check `.ai/API_CONTRACTS.md`.
   - Ensure interfaces and function signatures align with existing contracts. If changes are needed, log a proposal in `.ai/changes/`.

4. **TEST PLAN**:
   - Formulate a test strategy before writing implementation code.
   - Identify edge cases, algorithm boundaries, and simulation states to test.

5. **CONFLICT CHECK**:
   - Check working tree, current Git branch (`task/TASK-XXX-*`), and recently integrated commits.
   - Verify that another AI agent's concurrent work does not collide with the targeted files.

6. **IMPLEMENT**:
   - Write clean, modular TypeScript code strictly within the assigned task boundaries.
   - Avoid touching unrelated files or introducing unauthorized packages.

7. **TEST**:
   - Run `npm run typecheck`, `npm run lint`, and `npm run test:run`.
   - Ensure 100% pass rate with zero type or lint errors.

8. **SELF REVIEW**:
   - Review Git diff (`git diff`).
   - Confirm no debug code, secrets, stray files, or unneeded refactors were introduced.

9. **READY FOR REVIEW**:
   - Commit changes adhering to commit standards (`TASK-XXX: description`).
   - Update task status in the task file to `READY_FOR_REVIEW`.
   - Record session notes in `.ai/sessions/`.

10. **HUMAN REVIEW**:
    - The human developers inspect the pull request or task branch.
    - Human developers provide feedback, request changes, or approve.

11. **INTEGRATE**:
    - Human developer merges the approved branch into `develop`.
    - Protected branches (`develop`, `main`) are exclusively merged under human control.

12. **DONE**:
    - Move task file from `.ai/tasks/active/` to `.ai/tasks/completed/`.
