# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: ACTIVE (1 TASK READY)
TASK_CAPACITY: 3-5 tasks
LAST_UPDATED: 2026-10-08
```

> **Ghi chú**: Bảng này là bảng điều phối nhẹ (lightweight board). Nội dung đặc tả kỹ thuật và thiết kế chi tiết của từng task được lưu trữ độc lập tại `.ai/tasks/active/TASK-XXX.md`.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TEST-001 | Protocol Dry Run | READY | LOW | [] | task/TEST-001-protocol-dry-run | NONE |
| TASK-001 | Data Model & Crane Module | DONE | HIGH | [] | task/TASK-001-core-domain-and-crane | SES-20261016-01 |
| TASK-002 | Java Parser & VM Step Runner | DONE | HIGH | [TASK-001] | task/TASK-002-java-parser-and-vm | SES-20261016-02 |
| TASK-003 | Bubble Sort Validator & Test Suites | READY_FOR_REVIEW | HIGH | [TASK-002] | task/TASK-003-bubble-sort-validator | SES-20261016-03 |
| TASK-004 | Phaser 3 Warehouse Presentation | READY | MEDIUM | [TASK-001] | task/TASK-004-phaser-warehouse-presentation | NONE |
| TASK-005 | React UI Integration & End-to-End | READY | HIGH | [TASK-003, TASK-004] | task/TASK-005-react-ui-integration | NONE |

---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`, `BLOCKED`).
3. **Khi hoàn tất**: Khi con người đã merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
