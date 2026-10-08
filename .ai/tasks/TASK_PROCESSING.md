# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: IDLE (NO ACTIVE TASKS)
TASK_CAPACITY: 3-5 tasks
LAST_UPDATED: 2026-10-08
```

> **Ghi chú**: Bảng này là bảng điều phối nhẹ (lightweight board). Nội dung đặc tả kỹ thuật và thiết kế chi tiết của từng task được lưu trữ độc lập tại `.ai/tasks/active/TASK-XXX.md`.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *(Chưa có task nào kích hoạt)* | - | - | - | - | - | - |

---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`).
3. **Khi hoàn tất**: Khi con người đã merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
