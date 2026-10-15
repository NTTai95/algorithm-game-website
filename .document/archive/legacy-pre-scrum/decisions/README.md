# Nhật Ký Quyết Định Kiến Trúc Dự Án (.document/decisions)

Thư mục này ghi nhận các Quyết Định Kiến Trúc (Architecture Decision Records - ADR) của riêng dự án **Algorithm Game Website**.

> **Phân Biệt Rạch Ròi**:
> - Các quyết định về **Giao thức Vận hành AI** (Branching, Control language, Identity, Session handoff) được lưu tại [`.ai/DECISIONS.md`](file:///d:/workspace/Algorithm-game-website/.ai/DECISIONS.md).
> - Các quyết định về **Kiến trúc, Nghiệp vụ và Thiết kế Game** của sản phẩm được lưu tại thư mục này (`.document/decisions/ADR/`).

---

## 1. Danh Mục Các Quyết Định Đã Được Chấp Thuận

| Mã ADR | Tiêu Đề Quyết Định | Trạng Thái | Ngày Duyệt |
| :--- | :--- | :--- | :--- |
| [`ADR-001`](file:///d:/workspace/Algorithm-game-website/.document/decisions/ADR/ADR-001-decoupled-architecture.md) | Kiến trúc phân lớp 4 tầng tách rời Lõi mô phỏng khỏi Phaser 3 | ACCEPTED | 2026-10-08 |

---

## 2. Quy Trình Tạo Quyết Định Mới

1. Sử dụng biểu mẫu chuẩn tại [`.ai/templates/documentation/ADR_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/ADR_TEMPLATE.md).
2. Tạo file tại `.document/decisions/ADR/ADR-XXX-<slug>.md`.
3. Chỉ chuyển trạng thái sang `ACCEPTED` khi có sự phê duyệt chính thức từ Human Developer.
