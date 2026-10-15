# Hợp Đồng Giao Diện & API: {{CONTRACT_NAME}}

```yaml
DOCUMENT_ID: API-{{CONTRACT_ID}}
DOCUMENT_TYPE: API_CONTRACT
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
```

---

## 1. Mô Tả Khái Quát (Overview)
{{Mô tả giao diện hoặc chuỗi sự kiện được quy ước giữa các module.}}

---

## 2. Đặc Tả Dữ Liệu Trao Đổi (Data Structures / Events)

```typescript
// {{Định nghĩa interface hoặc discriminated union types mẫu}}
export interface {{EventOrDataType}} {
  type: '{{EVENT_NAME}}';
  payload: {
    {{field_1}}: {{type_1}};
  };
}
```

---

## 3. Quy Ước Bắt Buộc (Invariants & Constraints)
1. {{Quy ước 1 — ví dụ: Dữ liệu bất biến sau khi phát ra}}
2. {{Quy ước 2 — ví dụ: Tầng nhận sự kiện không được sửa đổi trực tiếp dữ liệu nguồn}}
