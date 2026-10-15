# Kế Hoạch Sprint: {{SPRINT_ID}} — {{SPRINT_TITLE}}

```yaml
DOCUMENT_ID: {{SPRINT_ID}}
DOCUMENT_TYPE: SPRINT_PLAN
STATUS: DRAFT # DRAFT | REVIEWING | APPROVED | ACTIVE
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
DEPENDS_ON: [{{DEPENDENT_SPRINT_OR_DOC_IDS}}]
```

---

## 1. Mục Tiêu Sprint (Sprint Goal & Value)
- **Mục tiêu cốt lõi**: {{Mô tả 1-2 câu về mục tiêu quan trọng nhất của Sprint này}}
- **Giá trị mang lại**: {{Giá trị cụ thể đem lại cho người dùng cuối hoặc hệ thống}}

---

## 2. Phạm Vi Thực Hiện (Scope)

### Trong phạm vi (In-Scope):
- [ ] {{Hạng mục 1}}
- [ ] {{Hạng mục 2}}
- [ ] {{Hạng mục 3}}

### Ngoài phạm vi (Out-of-Scope — Không làm trong Sprint này):
- {{Hạng mục loại trừ 1 — dời sang Sprint sau hoặc không làm}}
- {{Hạng mục loại trừ 2}}

---

## 3. Tiêu Chí Chấp Nhận Nghiệm Thu (Acceptance Criteria - AC)

*Mỗi AC phải định lượng được và có thể kiểm chứng bằng test hoặc kịch bản cụ thể:*

- [ ] **AC-1**: {{Khi thực hiện hành động X, hệ thống phải phản hồi Y}}
- [ ] **AC-2**: {{Dữ liệu đầu vào A phải sinh ra kết quả tất định B}}
- [ ] **AC-3**: {{Các bài kiểm thử tự động tương ứng phải đạt 100%}}

---

## 4. Phân Rã Công Việc Kỹ Thuật (Sprint Tasks)

| Task ID | Tên công việc / Trách nhiệm | Module / Tầng bị ảnh hưởng | ALLOWED FILES dự kiến | Phụ thuộc |
| :--- | :--- | :--- | :--- | :--- |
| `TASK-001` | {{Tên công việc 1}} | {{Module A}} | `{{path/to/files}}` | — |
| `TASK-002` | {{Tên công việc 2}} | {{Module B}} | `{{path/to/files}}` | `TASK-001` |

---

## 5. Rủi Ro & Kế Hoạch Kiểm Soát (Risks & Dependencies)

| Rủi ro tiềm ẩn | Mức độ | Biện pháp giảm thiểu / Kế hoạch dự phòng |
| :--- | :--- | :--- |
| {{Mô tả rủi ro kỹ thuật hoặc phụ thuộc}} | Cao / Trung bình / Thấp | {{Phương án xử lý}} |

---

## 6. Kế Hoạch Kiểm Thử & Nghiệm Thu (Verification Plan)
- **Kiểm thử tự động**: {{Các lệnh kiểm thử hoặc test cases cần chạy}}
- **Cổng chất lượng**: {{Các tiêu chuẩn kiểm tra như typecheck, lint, build...}}
- **Kịch bản kiểm tra thủ công (nếu cần)**: {{Các bước người dùng kiểm tra}}

---

## 7. Các Quyết Định Cần Human Phê Duyệt (Decisions for Approval)
- [ ] **Quyết định 1**: {{Vấn đề cần quyết định}} — *Đề xuất của AI*: {{Phương án đề xuất}}
