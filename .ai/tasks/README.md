# .ai/tasks/ — Task Management

| Thư mục / File | Nội dung |
|----------------|---------|
| `TASK_PROCESSING.md` | Bảng điều phối nhẹ (3-5 tasks kích hoạt) — ALWAYS-LOAD |
| `active/TASK-XXX.md` | Task đang thực hiện — CONDITIONAL |
| `completed/TASK-XXX.md` | Task đã hoàn tất và tích hợp — HISTORICAL |
| `notes/` | Ghi chú kỹ thuật hoặc đặc tả mở rộng |

---

## Naming Convention

- Task files: `TASK-XXX.md` (ví dụ: `TASK-001.md`)
- Git branch tương ứng: `task/TASK-XXX-<slug>`
- Template: DOC-020 (`templates/tasks/TASK_TEMPLATE.md`)

---

## Quy trình vận hành

Xem DOC-011 (`protocol/WORKFLOW.md`) để biết quy trình đầy đủ từ PLANNED → DONE.

Active task window: **Tối đa 3-5 tasks** trong `TASK_PROCESSING.md`.
