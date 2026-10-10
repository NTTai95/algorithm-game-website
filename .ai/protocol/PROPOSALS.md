# Giao Thức Đề Xuất & Báo Cáo Sai Lệch (Proposals & Drift Protocol — PROPOSALS.md)

**Authority**: DOC-012. Nguồn quy phạm DUY NHẤT cho proposal và drift protocol.  
**Related**: DOC-003 (CORE_RULES.md) · DOC-011 (WORKFLOW.md) · DOC-013 (GIT_RULES.md) · DOC-021 (PROP_TEMPLATE) · DOC-022 (DRIFT_TEMPLATE)

> Tài liệu này là nguồn duy nhất có thẩm quyền về proposal và drift. Không tham chiếu sang file cũ (AI_RULES.md hoặc changes/README.md) cho 2 chủ đề này.

---

## 1. PHÂN BIỆT BỐN KHÁI NIỆM CỐT LÕI

$$\mathbf{PROPOSAL} \neq \mathbf{TASK} \neq \mathbf{IMPLEMENTATION} \neq \mathbf{HUMAN\\ APPROVAL}$$

| Khái Niệm | Ý Nghĩa | Vị Trí |
|-----------|---------|--------|
| **PROPOSAL** | "Đây là cải tiến tiềm năng" | `.ai/changes/proposals/PROP-XXX.md` |
| **HUMAN DECISION** | "Con người duyệt / từ chối / hoãn" | Trường `HUMAN_DECISION` trong proposal |
| **TASK** | "Thay đổi được phê chuẩn để triển khai" | `.ai/tasks/active/TASK-XXX.md` |
| **IMPLEMENTATION** | "Đã lập trình và vượt qua kiểm thử" | Mã nguồn trong `/src/` + Git commits |

> **LƯU Ý**: `APPROVED PROPOSAL ≠ IMPLEMENTED CHANGE`. Đề xuất được duyệt không cho phép AI code ngay — phải có Task chính thức.

---

## 2. PROPOSAL LÀ TÀI SẢN DỰ ÁN DÙNG CHUNG

Proposal KHÔNG phải thông tin cục bộ trên máy cá nhân. Proposal là **tri thức phát triển dùng chung** của toàn dự án.

**Yêu cầu bắt buộc với mọi proposal:**
- PHẢI lưu tại `.ai/changes/proposals/PROP-XXX.md`
- PHẢI được Git theo dõi (`git add`), commit riêng (`PROP-XXX: ...`), push lên remote
- PHẢI được tham chiếu trong task (`RELATED_PROPOSALS`) và session log
- CẤM để proposal ở trạng thái untracked khi kết thúc phiên
- CẤM giấu proposal trong bộ nhớ chat
- CẤM tự ý triển khai proposal khi chưa có Task chính thức

---

## 3. HAI KỊCH BẢN KHI PHÁT HIỆN ĐỀ XUẤT

### CASE A — Non-Blocking (Không chặn Task hiện tại)
```
AI phát hiện cơ hội cải tiến → không cản trở task
    ↓
Tạo PROP-XXX.md (BLOCKS_CURRENT_TASK: NO)
    ↓
Tiếp tục hoàn tất task theo scope đã định
    ↓
Commit triển khai: TASK-XXX: <mô tả>
    ↓
Commit đề xuất riêng: PROP-XXX: <mô tả>
    ↓
Cập nhật tham chiếu trong TASK-XXX và SESSION
    ↓
Push → READY_FOR_REVIEW
```

### CASE B — Blocking (Chặn Task hiện tại)
```
AI phát hiện kiến trúc xung đột căn bản với task
    ↓
DETECT → DOCUMENT → CREATE PROP-XXX (BLOCKS_CURRENT_TASK: YES)
    ↓
MARK Task là BLOCKED trong task file và TASK_PROCESSING.md
    ↓
DỪNG NGAY phần việc bị ảnh hưởng
    ↓
Commit WIP + Commit Proposal riêng biệt
    ↓
Push → Bàn giao cho Human
    ↓
HUMAN DECISION (APPROVE / REJECT / DEFER)
```

> **CẤM**: Tự chế workaround để tránh việc dừng task khi gặp blocking.

---

## 4. TÁCH BIỆT COMMIT (Commit Separation Rule)

| Commit Type | Nội dung | Format |
|-------------|---------|--------|
| Implementation commit | Mã nguồn, tests, tài liệu triển khai thuộc task scope | `TASK-XXX: <mô tả>` |
| Proposal commit | File PROP-XXX.md và tham chiếu tài liệu liên quan | `PROP-XXX: <mô tả>` |

**TUYỆT ĐỐI CẤM** gộp cả hai vào một commit.

---

## 5. VÒNG ĐỜI TRẠNG THÁI PROPOSAL

```
CREATED
    ↓
PENDING_HUMAN_REVIEW
    ↓
APPROVED | REJECTED | DEFERRED
```

- **APPROVED**: Human lên kế hoạch tạo Task mới để triển khai.
- **REJECTED**: Giữ nguyên trong Git để tránh AI sau lặp lại đề xuất.
- **DEFERRED**: Hợp lý nhưng chưa ưu tiên, lưu lại cho tương lai.

---

## 6. CẤU TRÚC FILE PROP-XXX.md

Sử dụng template tại DOC-021 (`templates/changes/PROP_TEMPLATE.md`). Các trường bắt buộc:

`PROP-XXX: TITLE | CREATED | CREATED_BY (session ID, không dùng AGENT_A/B) | SOURCE | STATUS | PROBLEM | CURRENT_DESIGN | PROPOSED_CHANGE | REASON | AFFECTED_SYSTEMS | AFFECTED_FILES | AFFECTED_TASKS | API/INTERFACE IMPACT | BREAKING_CHANGE | BLOCKS_CURRENT_TASK | RISKS | TEST_IMPACT | RECOMMENDED_ACTION | HUMAN_DECISION`

---

## 7. HỆ THỐNG BÁO CÁO SAI LỆCH (Drift System)

Khi mã nguồn thực tế và tài liệu thiết kế không thống nhất:

**CẤM**:
- Tự sửa code cho khớp tài liệu
- Tự sửa tài liệu cho khớp code
- Tự đoán bên nào đúng hơn

**PHẢI**:
```
DETECT → DOCUMENT (DRIFT-XXX.md) → STOP → HUMAN DECISION
```

File DRIFT-XXX.md tại `.ai/changes/drift/`, dùng template DOC-022 (`templates/changes/DRIFT_TEMPLATE.md`).

Nội dung cần ghi: Mã báo cáo | Kỳ vọng theo tài liệu | Hiện thực trong code | Điểm sai lệch cụ thể | Hệ thống bị ảnh hưởng | Hậu quả tiềm ẩn | Khuyến nghị.

---

## 8. HỢP TÁC ĐA TÁC NHÂN

```
Máy A (AI Session 01): TASK → phát hiện vấn đề → Tạo PROP-XXX → Commit riêng → Push
Máy B (AI Session 02): git pull → đọc được PROP-XXX ngay lập tức
→ Nắm được: vấn đề, lý do chưa triển khai, ảnh hưởng, quyết định Human
```

**Nguyên tắc**: Không thông tin thiết yếu nào được phép bị giam hãm trong lịch sử chat cục bộ của AI.
