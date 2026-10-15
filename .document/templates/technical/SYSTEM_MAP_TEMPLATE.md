# Bản Đồ Hệ Thống & Cấu Trúc Mã Nguồn: {{PROJECT_NAME}}

```yaml
DOCUMENT_ID: DOC-SYSTEM-MAP
DOCUMENT_TYPE: SYSTEM_MAP
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Cấu Trúc Cây Thư Mục Thực Tế (`{{SRC_ROOT}}`)

```
{{SRC_ROOT}}/
├── {{module_1}}/      # {{Mô tả trách nhiệm module 1}}
│   └── index.ts
├── {{module_2}}/      # {{Mô tả trách nhiệm module 2}}
│   └── index.ts
└── main.ts            # {{Điểm vào ứng dụng}}
```

---

## 2. Điểm Vào Của Hệ Thống (Entry Points)
- **Điểm vào chính**: `{{Đường dẫn file entry}}`
- **Bộ chạy kiểm thử**: `{{Đường dẫn file config test}}`

---

## 3. Ma Trận Ranh Giới Import (Import Boundary Matrix)

| Module | Được phép import từ | Tuyệt đối cấm import từ |
| :--- | :--- | :--- |
| `{{module_1}}` | {{Danh sách module hợp lệ}} | {{Danh sách module hoặc thư viện bị cấm}} |
| `{{module_2}}` | {{Danh sách module hợp lệ}} | {{Danh sách bị cấm}} |

---

## 4. Lệnh Kiểm Tra Vi Phạm Ranh Giới (Boundary Verification Commands)
```bash
{{Lệnh typecheck hoặc linter kiểm tra import}}
```
