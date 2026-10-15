# Luồng Dữ Liệu & Chuyển Đổi Trạng Thái: {{FLOW_NAME}}

```yaml
DOCUMENT_ID: FLOW-{{FLOW_ID}}
DOCUMENT_TYPE: DATA_FLOW
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Sơ Đồ Chu Trình Dữ Liệu (Lifecycle / Sequence Flow)

```
[Khởi Tạo / Kích Hoạt]
         ↓ {{Dữ liệu đầu vào}}
[Xử Lý / Tính Toán Trạng Thái]
         ↓ {{Sự kiện / Dữ liệu trung gian}}
[Hiển Thị / Phản Hồi]
```

---

## 2. Mô Tả Chi Tiết Từng Bước

1. **Bước 1 — {{Tên bước 1}}**:
   - Tác nhân: `{{Component / Module}}`
   - Đầu vào: `{{Input data}}`
   - Xử lý: `{{Logic xử lý}}`
   - Đầu ra: `{{Output event / state}}`
2. **Bước 2 — {{Tên bước 2}}**:
   - ...
