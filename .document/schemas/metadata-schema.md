# Document Metadata Schema (metadata-schema.md)

Tất cả các tài liệu được tạo trong hệ thống `.document/` (đặc biệt là trong `sprints/` và `current/`) phải tuân thủ định dạng YAML Frontmatter tiêu chuẩn dưới đây.

---

## 1. Schema Cấu Trúc YAML Frontmatter

```yaml
---
DOCUMENT_ID: string          # Định danh tài liệu, ví dụ: SPRINT-001, ARCH-001, SPEC-001
DOCUMENT_TYPE: enum          # SPRINT_PLAN | SPRINT_REVIEW | ARCHITECTURE | SYSTEM_MAP | MODULE_SPEC | API_CONTRACT | TEST_STRATEGY | ADR
STATUS: enum                 # DRAFT | REVIEWING | CONFIRMED | DEPRECATED | ARCHIVED
LAST_UPDATED: YYYY-MM-DD     # Ngày cập nhật gần nhất
OWNER: string                # Tác giả / Người chịu trách nhiệm (Human hoặc AI)
SPRINT: string               # Mã Sprint liên quan, ví dụ: SPRINT-001 (nếu có)
DEPENDS_ON: list<string>     # Danh sách DOCUMENT_ID mà tài liệu này phụ thuộc
SUPERSEDES: string           # DOCUMENT_ID tài liệu bị tài liệu này thay thế (nếu có)
---
```

---

## 2. Chi Tiết Các Trường Dữ Liệu

| Trường | Bắt buộc | Kiểu dữ liệu | Giá trị hợp lệ / Ví dụ | Giải thích |
| :--- | :--- | :--- | :--- | :--- |
| `DOCUMENT_ID` | Có | String | `SPRINT-001`, `MOD-CORE` | Mã định danh duy nhất trong toàn bộ repo |
| `DOCUMENT_TYPE` | Có | Enum | Xem danh sách bên dưới | Phân loại mục đích của tài liệu |
| `STATUS` | Có | Enum | `DRAFT`, `CONFIRMED`... | Trạng thái hiệu lực hiện tại |
| `LAST_UPDATED` | Có | Date (ISO) | `2026-10-15` | Ngày sửa đổi nội dung gần nhất |
| `SPRINT` | Không | String | `SPRINT-001` | Gắn tài liệu với chu kỳ Sprint tương ứng |
| `DEPENDS_ON` | Không | List | `["ARCH-001", "MOD-CORE"]` | Danh sách tài liệu bắt buộc phải đọc trước |
| `SUPERSEDES` | Không | String | `ARCH-000` | Tài liệu cũ bị thay thế hoàn toàn |

---

## 3. Danh Mục DOCUMENT_TYPE Hợp Lệ

- `SPRINT_PLAN`: Kế hoạch chi tiết của một Sprint.
- `SPRINT_REVIEW`: Biên bản nghiệm thu và đóng Sprint.
- `PROJECT_OVERVIEW`: Hồ sơ tổng quan về dự án.
- `REQUIREMENTS`: Đặc tả yêu cầu nghiệp vụ và tiêu chí chấp nhận.
- `ARCHITECTURE`: Kiến trúc hệ thống tổng thể, mô hình phân tầng.
- `SYSTEM_MAP`: Bản đồ cấu trúc thư mục, trách nhiệm module, ranh giới import.
- `MODULE_SPEC`: Đặc tả chi tiết một module con.
- `API_CONTRACT`: Hợp đồng giao diện, sự kiện hoặc API giữa các module.
- `DATA_FLOW`: Luồng dữ liệu, luồng điều khiển hoặc chuyển đổi trạng thái.
- `TEST_STRATEGY`: Chiến lược kiểm thử tự động và cổng kiểm soát chất lượng.
- `ADR`: Quyết định kiến trúc quan trọng (Architecture Decision Record).
