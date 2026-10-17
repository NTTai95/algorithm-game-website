# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: ACTIVE (SPRINT-002 IN PROGRESS)
TASK_CAPACITY: 5 tasks
LAST_UPDATED: 2026-10-17
```

> **Ghi chú**: Bảng này là bảng điều phối nhẹ (lightweight board). Nội dung đặc tả kỹ thuật và thiết kế chi tiết của từng task được lưu trữ độc lập tại `.ai/tasks/active/TASK-XXX.md`.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-010` | App Shell, Home Page, Header Navigation, Modular Tutorials & UI Integration | READY | HIGH | [`TASK-008`, `TASK-009`] | `task/TASK-010-app-shell-home-and-tutorials` | NONE |

---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`, `BLOCKED`).
3. **Khi hoàn tất**: Khi đã hoàn tất và merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
