# Đặc Tả Kỹ Thuật Module: {{MODULE_NAME}}

```yaml
DOCUMENT_ID: MOD-{{MODULE_ID}}
DOCUMENT_TYPE: MODULE_SPEC
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Trách Nhiệm Module (Single Responsibility)
{{Mô tả ngắn gọn mục đích và giới hạn trách nhiệm của module này trong hệ thống.}}

---

## 2. Giao Diện Công Khai (Public API)
- **Exports chính**:
  - `{{FunctionName / ClassName}}`: {{Mô tả chức năng}}
  - `{{TypeName / InterfaceName}}`: {{Mô tả cấu trúc dữ liệu}}

---

## 3. Ranh Giới & Phụ Thuộc (Boundaries & Dependencies)
- **Internal Only**: {{Những hàm, file nội bộ không được export ra ngoài}}
- **External Dependencies**: {{Các module khác mà module này được phép gọi}}

---

## 4. Chiến Lược Kiểm Thử (Testing Strategy)
- **Vị trí file test**: `{{Đường dẫn test}}`
- **Các ca kiểm thử trọng tâm**: {{Danh sách kịch bản unit test}}
