# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: SPRINT-003 ACTIVE (5 TASKS PLANNED)
TASK_CAPACITY: 5 tasks
LAST_UPDATED: 2026-10-17
```

> **Ghi chú**: Sprint 3 tập trung hoàn thiện giao diện Split-Screen 2 bên, nút thu nhỏ code, bộ sinh đề bài ngẫu nhiên, syntax highlighting cho Java và sổ tay lệnh máy móc động theo từng màn.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-011` | Bố cục 2 bên Split-Screen & Nút Thu nhỏ Code | `COMPLETED` | P0 | — | `task/TASK-011-split-screen-layout` | `SES-20261017-03` |
| `TASK-012` | Bộ sinh đề bài ngẫu nhiên (Random Problem Generator) | `COMPLETED` | P1 | `TASK-011` | `task/TASK-012-random-problem-generator` | `SES-20261017-03` |
| `TASK-013` | Tô màu cú pháp Java chuẩn IDE hiện đại (Syntax Highlighting) | `COMPLETED` | P0 | — | `task/TASK-013-java-syntax-highlighter` | `SES-20261019-13` |
| `TASK-014` | Sổ tay lệnh máy móc động theo ngữ cảnh từng màn | `READY_FOR_REVIEW` | P0 | — | `task/TASK-014-contextual-machine-manual` | `SESSION-TASK-014` |
| `TASK-015` | Tích hợp hệ thống, Kiểm thử E2E & Quality Gates | `PENDING` | P0 | `TASK-011`..`TASK-014` | `develop` | `SES-20261017-03` |

---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`, `BLOCKED`).
3. **Khi hoàn tất**: Khi đã hoàn tất và merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
