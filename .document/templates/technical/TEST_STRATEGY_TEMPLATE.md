# Chiến Lược Kiểm Thử Dự Án: {{PROJECT_NAME}}

```yaml
DOCUMENT_ID: DOC-TEST-STRATEGY
DOCUMENT_TYPE: TEST_STRATEGY
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Triết Lý Kiểm Thử (Testing Philosophy)
1. {{Triết lý 1 — ví dụ: Kiểm thử độc lập không phụ thuộc môi trường đồ họa/DOM}}
2. {{Triết lý 2 — ví dụ: Kiểm thử tính tất định của thuật toán với các edge cases}}

---

## 2. Các Cấp Độ Kiểm Thử (Testing Levels)

### 2.1. Kiểm Thử Đơn Vị (Unit Testing)
- **Vị trí code test**: `{{Đường dẫn thư mục test}}`
- **Phạm vi**: {{Các hàm, lớp hoặc cấu trúc dữ liệu cơ bản}}
- **Lệnh thực thi**: `{{Lệnh chạy test đơn vị}}`

### 2.2. Kiểm Thử Tích Hợp (Integration Testing)
- **Phạm vi**: {{Tích hợp giữa các module con}}
- **Lệnh thực thi**: `{{Lệnh chạy test tích hợp}}`

---

## 3. Cổng Kiểm Soát Chất Lượng Bắt Buộc (Quality Verification Gates)

Một task/Sprint chỉ được coi là hoàn tất khi vượt qua đầy đủ các cổng:

| Cổng kiểm tra | Lệnh thực thi | Tiêu chuẩn đạt |
| :--- | :--- | :--- |
| **Gate 1: Kiểu dữ liệu / Syntax** | `{{Lệnh typecheck}}` | 0 lỗi |
| **Gate 2: Quy chuẩn mã (Lint)** | `{{Lệnh lint}}` | 0 lỗi, 0 cảnh báo |
| **Gate 3: Kiểm thử tự động** | `{{Lệnh run tests}}` | 100% test cases pass |
| **Gate 4: Đóng gói (Build)** | `{{Lệnh build}}` | Build thành công |
| **Gate 5: Đồng bộ tài liệu** | Đối chiếu tài liệu | Task log, Acceptance Criteria khớp 100% |
