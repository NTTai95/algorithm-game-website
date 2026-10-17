# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: SPRINT-002 COMPLETE (ALL 5 TASKS COMPLETED)
TASK_CAPACITY: 5 tasks
LAST_UPDATED: 2026-10-17
```

> **Ghi chú**: Tất cả các nhiệm vụ từ `TASK-006` đến `TASK-010` của Sprint 2 đã hoàn thành và được lưu trữ độc lập tại `.ai/tasks/completed/`.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *(Trống)* | *Tất cả các task Sprint 2 đã hoàn thành* | - | - | - | - | - |

---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`, `BLOCKED`).
3. **Khi hoàn tất**: Khi đã hoàn tất và merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
