# Đặc Tả Ngôn Ngữ Chỉ Huy AI (AI Command Protocol — COMMANDS.md)

**Authority**: DOC-010. Đặc tả tĩnh — không thay đổi theo session hay task.  
**Related**: DOC-003 (CORE_RULES.md) · DOC-004 (BRANCH_RULES.md) · DOC-011 (WORKFLOW.md)

> `COMMANDS.md` KHÔNG PHẢI nơi lưu session state. KHÔNG PHẢI công tắc cấp quyền tạm thời.  
> Đây là **từ điển tĩnh** để AI diễn giải prompt của Human. Human điều khiển AI **qua prompt, không qua file này**.

---

## 1. LUỒNG XỬ LÝ LỆNH (Control Flow)

```
HUMAN PROMPT
    ↓
COMMANDS.md (parse intent)
    ↓
Command + Target + Scope + Result + Restrictions + Constraints
    ↓
BRANCH_RULES check (nhánh Git có cho phép không?)
    ↓
TASK SCOPE check (task hợp lệ? file trong ALLOWED FILES?)
    ↓
ARCHITECTURE check (phá vỡ API contract không?)
    ↓
EXECUTE | PROPOSE | STOP
```

---

## 2. BẢNG LỆNH CHUẨN (Command Vocabulary)

| Command | Ý nghĩa | Sửa /src/? | Kết quả kỳ vọng |
|---------|---------|-----------|-----------------|
| `ANALYZE` | Khảo sát, tìm hiểu, đánh giá hiện trạng | KHÔNG | Báo cáo phân tích |
| `DESIGN` | Soạn thảo giải pháp kỹ thuật, API, Test Plan | KHÔNG | Bản thiết kế chi tiết trong TASK-XXX.md |
| `IMPLEMENT` | Lập trình mã nguồn theo thiết kế đã duyệt | CÓ (chỉ trên task/*) | Mã nguồn + unit tests |
| `TEST` | Chạy test tự động, lint, typecheck, build | KHÔNG | Báo cáo pass/fail |
| `REVIEW` | Đánh giá chất lượng code, diff, compliance | KHÔNG | Báo cáo review |
| `REPORT` | Tổng hợp trạng thái, nợ kỹ thuật, sprint | KHÔNG (chỉ file báo cáo) | Bản báo cáo Markdown |
| `PROPOSE` | Soạn thảo đề xuất thay đổi kiến trúc/API | KHÔNG (chỉ PROP-XXX.md) | File PROP-XXX.md + commit riêng |
| `DOCUMENT` | Tạo/cập nhật tài liệu kỹ thuật | KHÔNG /src/ | Tài liệu Markdown |
| `COMMIT` | Tạo commit Git nguyên tử | KHÔNG | Git commit sạch |
| `PUSH` | Đẩy nhánh hiện tại lên remote | KHÔNG | Nhánh remote đồng bộ |
| `STOP` | Dừng khẩn cấp toàn bộ hoạt động | KHÔNG | Báo cáo dừng + nguyên nhân |

---

## 3. CÁC TỪ BỔ TRỢ (Command Modifiers)

| Modifier | Ý nghĩa | Ví dụ |
|----------|---------|-------|
| `ONLY` | Chỉ làm đúng hành vi được chỉ định | `ANALYZE TASK-003 ONLY` |
| `DO_NOT` / `WITHOUT` | Cấm một hành động cụ thể | `DESIGN TASK-003, DO NOT IMPLEMENT` |
| `INSPECT` | Khảo sát sơ bộ trước khi kết luận | `INSPECT cấu trúc module Crane` |
| `PREPARE` | Chuẩn bị khung tài liệu/test chưa vào code | `PREPARE Test Plan cho TASK-002` |
| `CONTINUE` / `RESUME` | Tiếp tục từ phiên trước dựa trên Session Log | `RESUME TASK-001` |

> **Natural Language Mapping**: Human không bắt buộc gõ đúng chữ hoa. AI tự phân tích câu tiếng Việt/Anh để quy về Command + Modifier.

---

## 4. PHÂN TÍCH PROMPT — 6 TRƯỜNG BẮT BUỘC

Khi nhận prompt, AI PHẢI trích xuất 6 trường trước khi hành động:

1. **COMMAND**: Lệnh chính (từ bảng trên)
2. **TARGET**: Đối tượng (TASK-XXX, module, file, nhánh Git)
3. **SCOPE**: Phạm vi tệp tin được phép
4. **INTENDED RESULT**: Kết quả Human mong đợi
5. **RESTRICTIONS**: Điều cấm bổ sung từ modifier hoặc ngữ cảnh
6. **CONSTRAINTS**: Ràng buộc khách quan (vai trò nhánh, trạng thái task, API contracts)

---

## 5. THỨ TỰ QUYỀN LỰC (Precedence)

```
Human Intent → Command Interpretation → Branch Rules → Task Scope → Architecture → Execution
```

- Prompt của Human KHÔNG vượt qua Branch Rules.
- Prompt của Human KHÔNG mở rộng Task Scope.
- Khi có xung đột: `DO NOT GUESS → DETECT → DOCUMENT → STOP → AWAIT HUMAN DECISION`

---

## 6. MÔ HÌNH ĐA TÁC NHÂN (Multi-AI Concurrency)

- File này hoàn toàn **phi trạng thái (stateless)** — nhiều AI đọc cùng lúc không xung đột.
- Không AI nào được ghi mutable state vào COMMANDS.md.
- Danh tính tác nghiệp = `GIT BRANCH + TASK ID + SESSION ID`.
