# Thư Viện Templates (.document/templates)

Thư mục này chứa các mẫu tài liệu chuẩn hóa, độc lập với công nghệ và ngôn ngữ, chỉ sử dụng các placeholder (ví dụ: `{{PROJECT_NAME}}`, `{{SPRINT_ID}}`).

---

## Danh Mục Templates

### 1. Quản Lý Sprint (`sprint/`)
- [`SPRINT_PLAN_TEMPLATE.md`](./sprint/SPRINT_PLAN_TEMPLATE.md): Mẫu kế hoạch Sprint (Mục tiêu, In/Out Scope, Acceptance Criteria, Tasks, Risks).
- [`SPRINT_REVIEW_TEMPLATE.md`](./sprint/SPRINT_REVIEW_TEMPLATE.md): Mẫu biên bản review và nghiệm thu đóng Sprint.

### 2. Định Nghĩa Dự Án (`project/`)
- [`PROJECT_OVERVIEW_TEMPLATE.md`](./project/PROJECT_OVERVIEW_TEMPLATE.md): Mẫu hồ sơ tổng quan dự án.
- [`REQUIREMENTS_TEMPLATE.md`](./project/REQUIREMENTS_TEMPLATE.md): Mẫu đặc tả yêu cầu chức năng (FR) và phi chức năng (NFR).
- [`GLOSSARY_TEMPLATE.md`](./project/GLOSSARY_TEMPLATE.md): Mẫu từ điển thuật ngữ nghiệp vụ.

### 3. Kiến Trúc & Kỹ Thuật (`technical/`)
- [`ARCHITECTURE_TEMPLATE.md`](./technical/ARCHITECTURE_TEMPLATE.md): Mẫu kiến trúc hệ thống và phân tầng.
- [`SYSTEM_MAP_TEMPLATE.md`](./technical/SYSTEM_MAP_TEMPLATE.md): Mẫu cấu trúc mã nguồn và ma trận ranh giới import.
- [`MODULE_SPEC_TEMPLATE.md`](./technical/MODULE_SPEC_TEMPLATE.md): Mẫu đặc tả kỹ thuật chi tiết của một module con.
- [`API_CONTRACT_TEMPLATE.md`](./technical/API_CONTRACT_TEMPLATE.md): Mẫu hợp đồng dữ liệu, interface và sự kiện giữa các module.
- [`DATA_FLOW_TEMPLATE.md`](./technical/DATA_FLOW_TEMPLATE.md): Mẫu luồng dữ liệu và chuyển đổi trạng thái.
- [`TEST_STRATEGY_TEMPLATE.md`](./technical/TEST_STRATEGY_TEMPLATE.md): Mẫu chiến lược kiểm thử và cổng kiểm soát chất lượng.

### 4. Quản Trị Kiến Trúc (`governance/`)
- [`ADR_TEMPLATE.md`](./governance/ADR_TEMPLATE.md): Mẫu ghi nhận quyết định kiến trúc quan trọng (Architecture Decision Record).

---

> **Lưu ý**: AI chỉ đọc các file trong thư mục này khi cần tạo tài liệu mới theo yêu cầu của Sprint.
