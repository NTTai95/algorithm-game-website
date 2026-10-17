# Bảng Điều Phối Nhiệm Vụ Đang Kích Hoạt (Active Task Board)

```yaml
BOARD_STATUS: ACTIVE (5 TASKS READY FOR SPRINT-002)
TASK_CAPACITY: 5 tasks
LAST_UPDATED: 2026-10-17
```

> **Ghi chú**: Bảng này là bảng điều phối nhẹ (lightweight board). Nội dung đặc tả kỹ thuật và thiết kế chi tiết của từng task được lưu trữ độc lập tại `.ai/tasks/active/TASK-XXX.md`.

---

## Danh Sách Nhiệm Vụ Kích Hoạt (Active Task Working Set)

| TASK ID | TITLE | STATUS | PRIORITY | DEPENDENCIES | CURRENT BRANCH | CURRENT SESSION |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TASK-006` | Data Model (Box Weight) & Multi-Machine (`wareHouse`, `WeightScanner`, `SingleCrane`) | DONE | HIGH | [] | `task/TASK-006-multi-machine-domain` | SES-20261017-06 |
| `TASK-007` | Java Parser & VM Runner (Method `solve`, `boolean`, `break`, Formatter) | DONE | HIGH | [`TASK-006`] | `task/TASK-007-java-parser-and-vm-oop` | SES-20261017-07 |
| `TASK-008` | Phaser 3 Warehouse Simulation (Multi-Machine & Scan Beam) | DONE | MEDIUM | [`TASK-006`] | `task/TASK-008-phaser-multimachine-simulation` | SES-20261017-08 |
| `TASK-009` | Bubble Sort Validator (Weight-based) & Diagnostic Feedback Engine | READY_FOR_REVIEW | HIGH | [`TASK-006`, `TASK-007`] | `task/TASK-009-bubble-validator-and-diagnostics` | SES-20261017-09 |
| `TASK-010` | App Shell, Home Page, Header Navigation, Modular Tutorials & UI Integration | READY | HIGH | [`TASK-008`, `TASK-009`] | `task/TASK-010-app-shell-home-and-tutorials` | NONE |


---

## Hướng Dẫn Nhanh Cho AI Khi Cập Nhật Bảng
1. **Khi nhận task**: Cập nhật dòng tương ứng thành `STATUS: CLAIMED`, điền `CURRENT_BRANCH` (`task/TASK-XXX-slug`) và `CURRENT_SESSION` (`SES-YYYYMMDD-XX`).
2. **Khi chuyển đổi trạng thái**: Đồng bộ trạng thái giữa file task và bảng này (`DESIGNING`, `IMPLEMENTING`, `TESTING`, `READY_FOR_REVIEW`, `PAUSED`, `BLOCKED`).
3. **Khi hoàn tất**: Khi con người đã merge vào `develop`, xóa dòng task khỏi bảng này và lưu trữ file vào `.ai/tasks/completed/`.
