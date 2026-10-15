# Kiến Trúc Hệ Thống: {{PROJECT_NAME}}

```yaml
DOCUMENT_ID: DOC-ARCHITECTURE
DOCUMENT_TYPE: ARCHITECTURE
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Mục Tiêu Kiến Trúc Cốt Lõi (Architectural Goals)
1. {{Mục tiêu 1 — ví dụ: Tách biệt logic nghiệp vụ khỏi giao diện hiển thị}}
2. {{Mục tiêu 2 — ví dụ: Khả năng kiểm thử 100% không cần môi trường đồ họa}}
3. {{Mục tiêu 3 — ví dụ: Khả năng mở rộng cho nhiều module tương tự}}

---

## 2. Mô Hình Phân Tầng & Chiều Phụ Thuộc (Layering & Dependency Direction)

```
┌──────────────────────────────────────────────┐
│  {{Tầng trên cùng — ví dụ: UI / Presentation}}│
└──────────────────────┬───────────────────────┘
                       ↓ {{Chiều phụ thuộc}}
┌──────────────────────────────────────────────┐
│  {{Tầng trung gian — ví dụ: Application/Sys}}│
└──────────────────────┬───────────────────────┘
                       ↓ {{Chiều phụ thuộc}}
┌──────────────────────────────────────────────┐
│  {{Tầng lõi — ví dụ: Domain / Core Logic}}   │
└──────────────────────────────────────────────┘
```

**Quy tắc bất biến**: {{Quy tắc định hướng phụ thuộc một chiều, cấm phụ thuộc vòng, cấm tầng dưới import tầng trên}}.

---

## 3. Trách Nhiệm Chi Tiết Theo Từng Tầng

### 3.1. {{Tên Tầng 1}}
- **Trách nhiệm**: {{Những việc tầng này chịu trách nhiệm}}
- **Được phép phụ thuộc vào**: {{Danh sách các tầng/thư viện hợp lệ}}
- **Cấm phụ thuộc vào**: {{Danh sách các tầng/thư viện bị cấm}}

### 3.2. {{Tên Tầng 2}}
- **Trách nhiệm**: {{Những việc tầng này chịu trách nhiệm}}
- **Được phép phụ thuộc vào**: {{Danh sách hợp lệ}}
- **Cấm phụ thuộc vào**: {{Danh sách bị cấm}}

---

## 4. Quyết Định Kiến Trúc Đã Phê Duyệt (Approved ADRs)
- [ADR-001: {{Tên quyết định 1}}](../governance/ADR-001-{{slug}}.md) — `CONFIRMED`
