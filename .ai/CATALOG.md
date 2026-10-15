# CATALOG — Document Index & Routing Metadata

> **Mục đích**: Giúp AI lựa chọn tài liệu dựa trên metadata TRƯỚC KHI đọc nội dung.  
> **Quy tắc**: CATALOG không ghi đè quy tắc của bất kỳ tài liệu nào.  
> **Authority**: CATALOG là nguồn định tuyến, không phải nguồn quy phạm.

---

## ALWAYS-LOAD Documents

| ID | Path | Purpose | Load When |
|----|------|---------|-----------|
| DOC-001 | `.ai/README.md` | Entry point + routing | Every session (first) |
| DOC-002 | `.ai/CATALOG.md` | This file — document index | Every session (second) |
| DOC-003 | `.ai/rules/CORE_RULES.md` | 17 mandatory behavioral rules | Every session |
| DOC-004 | `.ai/rules/BRANCH_RULES.md` | 3-branch permission matrix | Every session |
| DOC-005 | `.ai/tasks/TASK_PROCESSING.md` | Active task board | Every session |

---

## CONDITIONAL Documents

| ID | Path | Purpose | Trigger Keywords | Use When |
|----|------|---------|-----------------|----------|
| DOC-010 | `.ai/protocol/COMMANDS.md` | Command vocabulary + modifiers | lệnh, ANALYZE, DESIGN, IMPLEMENT, TEST, REVIEW, REPORT, PROPOSE, DOCUMENT, COMMIT, PUSH, STOP | Khi lệnh cần giải thích hoặc có modifier |
| DOC-011 | `.ai/protocol/WORKFLOW.md` | Task lifecycle state machine | DESIGN, IMPLEMENT, TEST, vòng đời task, giao thức bàn giao, PAUSED, BLOCKED | Khi thực hiện bất kỳ giai đoạn phát triển nào |
| DOC-012 | `.ai/protocol/PROPOSALS.md` | Single authority for proposal + drift | PROPOSE, PROP-XXX, DRIFT-XXX, đề xuất kiến trúc, sai lệch tài liệu | Khi cần tạo hoặc xử lý proposal hoặc drift report |
| DOC-013 | `.ai/rules/GIT_RULES.md` | Commit + push protocol | COMMIT, PUSH, git, commit message, force push | Khi thực hiện COMMIT hoặc PUSH |
| DOC-014 | `.ai/tasks/active/TASK-XXX.md` | Individual task detail | claim, CLAIMED, IMPLEMENTING, task scope, ALLOWED FILES | Khi nhận hoặc tiếp tục một task cụ thể |
| DOC-015 | `.ai/templates/sessions/SESSION_TEMPLATE.md` | Session handoff format | STOP, PAUSE, bàn giao, SESSION, handoff | Khi cần ghi nhật ký phiên làm việc |
| DOC-016 | `.document/ROUTER.md` | Document Lifecycle System Router | tài liệu, kiến trúc, sprint, requirements, test | Định tuyến tra cứu tài liệu dự án và vòng đời Sprint |
| DOC-017 | `.document/sprints/active/` | Active Sprint specification | Sprint, active sprint, mục tiêu sprint, AC | Khi thực hiện hoặc kiểm tra task trong Sprint hiện tại |
| DOC-018 | `.document/current/` | Confirmed project documentation | architecture, system map, api contract, test strategy | Khi cần thông tin kiến trúc / ranh giới đã được phê duyệt |

---

## ON-DEMAND Documents

| ID | Path | Purpose | Use When |
|----|------|---------|----------|
| DOC-020 | `.ai/templates/tasks/TASK_TEMPLATE.md` | Task file template | Khi tạo file task mới |
| DOC-021 | `.ai/templates/changes/PROP_TEMPLATE.md` | Proposal format | Khi tạo PROP-XXX.md |
| DOC-022 | `.ai/templates/changes/DRIFT_TEMPLATE.md` | Drift report format | Khi tạo DRIFT-XXX.md |
| DOC-023 | `.document/templates/` | Document Lifecycle Templates | Khi tạo tài liệu dự án hoặc Sprint mới |
| DOC-024 | `.ai/reference/SKILLS.md` | Tech stack reference (legacy redirect) | Xem DOC-029 (`.skills/INDEX.md`) & `.document/ROUTER.md` |
| DOC-025 | `.ai/reference/DECISIONS.md` | ADR-001 to ADR-004 | Khi cần hiểu lịch sử thiết kế giao thức |
| DOC-040 | `.ai/protocol/EXPERIMENTAL-DELEGATE.md` | Experimental delegation command | CHỈ khi Human kích hoạt bằng lệnh DELEGATE |


---

## Skills System Documents (ON-DEMAND — không nạp mặc định)

| ID | Path | Purpose | Use When |
|----|------|---------|----------|
| DOC-029 | `.skills/INDEX.md` | Thư viện Skills dùng chung (Core + Tech) | Điểm vào tra cứu skills |
| DOC-033 | `.skills/core/analyze-requirements.md` | Analyze requirements (SKILL-C01) — **AVAILABLE** | Yêu cầu mới còn mơ hồ |
| DOC-034 | `.skills/core/breakdown-tasks.md` | Breakdown tasks (SKILL-C03) — **AVAILABLE** | Sau khi yêu cầu đã rõ, cần tạo task |
| DOC-035 | `.skills/core/implement-incremental.md` | Implement incremental (SKILL-C04) — **AVAILABLE** | IMPLEMENT command |
| DOC-036 | `.skills/core/test-and-verify.md` | Test and verify (SKILL-C05) — **AVAILABLE** | TEST command; trước READY_FOR_REVIEW |
| DOC-037 | `.skills/core/update-docs.md` | Update docs (SKILL-C07) — **AVAILABLE** | Sau thay đổi kiến trúc/API |
| DOC-038 | `.skills/tech/typescript.md` | TypeScript conventions (SKILL-T01) — **AVAILABLE** | Task liên quan TypeScript |
| DOC-039 | `.skills/tech/vitest.md` | Vitest conventions (SKILL-T04) — **AVAILABLE** | Viết/chạy unit test |

> **Lưu ý**: Thông tin dự án và ranh giới module được quản lý động qua Document Lifecycle System tại `.document/` (DOC-016 `.document/ROUTER.md`, DOC-017 `sprints/active/`, DOC-018 `current/`). Các ID DOC-030, DOC-031, DOC-032 đã được hợp nhất về `.document/` và DOC-029.




## Code Map Documents (ON-DEMAND)

| ID | Path | Purpose | Use When |
|----|------|---------|----------|
| DOC-041 | `.code-map/INDEX.md` | Code map routing index | Cần tìm module liên quan trước khi đọc code |
| DOC-042 | `.code-map/SCHEMA.md` | Code map schema | Khi tạo/cập nhật module map |
| DOC-043 | `.code-map/UPDATE_PROTOCOL.md` | Code map update protocol | Sau khi sửa source code |
| DOC-044 | `.code-map/modules/core.md` | src/core/ module map | Task liên quan domain/algorithm |
| DOC-045 | `.code-map/modules/game.md` | src/game/ module map | Task liên quan Phaser rendering |

## HISTORICAL Documents

| ID | Path | Purpose | Use When |
|----|------|---------|----------|
| DOC-050 | `.ai/tasks/completed/TASK-XXX.md` | Completed task records | Khi điều tra lịch sử task |
| DOC-051 | `.ai/sessions/SESSION-XXX.md` | Past session logs | Khi tiếp nối task từ phiên trước |
| DOC-052 | `.ai/changes/proposals/PROP-XXX.md` | Filed proposals | Khi xem xét đề xuất đã tạo |
| DOC-053 | `.ai/changes/drift/DRIFT-XXX.md` | Filed drift reports | Khi điều tra sai lệch đã ghi nhận |
| DOC-054 | `.ai/changes/delegations/DEL-XXX.md` | Delegation packages | Khi review delegation task history |

---

## Routing Quick Reference

| Tình huống | Documents bắt buộc | Documents có điều kiện |
|-----------|-------------------|----------------------|
| Bắt đầu phiên mới | DOC-001..005 | DOC-014 (nếu có task active) |
| Claim task | DOC-001..005 | DOC-011, DOC-014 |
| DESIGN task | DOC-001..005 | DOC-010, DOC-011, DOC-014 |
| IMPLEMENT task | DOC-001..005 | DOC-010..011, DOC-014, DOC-016 (system map), DOC-017, DOC-029 (skills) |
| IMPLEMENT (cần tìm module) | DOC-001..005 | DOC-041 (code-map index) → DOC-044/045 |
| TEST | DOC-001..005 | DOC-014, DOC-018, DOC-036 (SKILL-C05) |
| PROPOSE | DOC-001..005 | DOC-012, DOC-021 |
| COMMIT + PUSH | DOC-001..005 | DOC-013 |
| STOP / PAUSE | DOC-001..005 | DOC-015 |
| Phân tích kiến trúc | DOC-001..005 | DOC-010, DOC-016 |
| Yêu cầu mơ hồ | DOC-001..005 | DOC-033 (SKILL-C01) |
| Tạo task mới | DOC-001..005 | DOC-034 (SKILL-C03), DOC-020 |
| Drift / sai lệch | DOC-001..005 | DOC-012, DOC-022 |
| Xung đột quy tắc | DOC-001..004 | Xem Authority Hierarchy trong README.md |
| DELEGATE (khi Human yêu cầu) | DOC-001..005 | DOC-040 (EXPERIMENTAL-DELEGATE) |
