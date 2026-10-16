# Tổng Quan Hệ Thống AI Development Framework (.human/getting-started/01-system-overview.md)

Tài liệu này cung cấp bức tranh toàn cảnh về cách thức vận hành, triết lý phối hợp và ranh giới quyền lực giữa **Lập trình viên Con người (Human Developer)** và **Các Tác tử AI (AI Agents)** trong repository này.

---

## 1. Triết Lý Cốt Lõi: Human-in-the-Loop & Phân Quyền Tuyệt Đối

Hệ thống phát triển này không phải là một quy trình AI tự hành hoàn toàn (autonomous agent). Toàn bộ framework được xây dựng dựa trên nguyên tắc **Con Người Là Quyền Lực Tối Cao**:

```
                       ┌─────────────────────────┐
                       │  HUMAN DEVELOPER (BẠN)  │
                       │   Quyết định & Nghiệm thu│
                       └────────────┬────────────┘
                                    │ Ra lệnh qua Prompt & Duyệt kết quả
                                    ▼
                       ┌─────────────────────────┐
                       │     AI CODING AGENT     │
                       │    Thiết kế & Lập trình │
                       └────────────┬────────────┘
                                    │ Ràng buộc bởi Giao thức
                                    ▼
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│     .ai/     │             │  .document/  │             │   .skills/   │
│Quy tắc, phân │             │Vòng đời Scrum│             │Kỹ năng tái sử│
│quyền & lệnh  │             │& tri thức DA │             │dụng (TS, Vit)│
└──────────────┘             └──────────────┘             └──────────────┘
```

### 4 Nguyên Tắc Vận Hành Nền Tảng:

1. **Con Người Ra Quyết Định (Decide & Approve)**:
   - Bạn xác định ý tưởng sản phẩm, mục tiêu, phạm vi và tiêu chí nghiệm thu.
   - Bạn phê duyệt kế hoạch Sprint, duyệt thiết kế kỹ thuật và phán quyết các đề xuất thay đổi (`PROP-XXX`).
   - **Chỉ có Con người mới có quyền thực hiện merge nhánh Git vào `develop` hoặc `main` và đánh dấu task là `DONE`**.
2. **AI Thực Thi Có Kỷ Luật (Implement, Test & Document)**:
   - AI chịu trách nhiệm phân tích yêu cầu, soạn thảo chi tiết thiết kế, viết mã nguồn trong phạm vi cho phép, viết unit test và cập nhật tài liệu liên quan.
   - AI **tuyệt đối không được vượt quyền**: không tự ý mở rộng phạm vi (scope creep), không tự ý cài thư viện npm, không tự merge nhánh, và không tự coi công việc là hoàn thành khi chưa có sự nghiệm thu của bạn.
3. **Git Làm Trục Xương Sống & Nguồn Sự Thật Dùng Chung (Git-Centric Collaboration)**:
   - Toàn bộ bối cảnh làm việc, tiến độ, đề xuất và lịch sử tích hợp đều được neo vào Git.
   - Bạn và các AI trên các máy tính khác nhau giao tiếp và đồng bộ trạng thái thông qua các commit, branch và file Markdown có cấu trúc.
4. **AI Không Cố Định Danh Tính (Interchangeable AI Identity)**:
   - Không tồn tại khái niệm "AI của máy A" hay "AI của máy B". Bất kỳ mô hình LLM nào tham gia vào dự án đều có quyền hạn bình đẳng và danh tính tác nghiệp được xác định bởi:
     $$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$

---

## 2. Bản Đồ Ranh Giới 4 Thư Mục Hệ Thống

Repository được phân chia ranh giới trách nhiệm nghiêm ngặt giữa 4 thư mục quản trị:

| Thư mục | Tên gọi | Mục đích | Hướng dẫn sử dụng ngữ cảnh cho Human |
| :--- | :--- | :--- | :--- |
| **`.human/`** | **Human Operating Manual** | Sổ tay vận hành, quy trình thao tác chuẩn, checklist kiểm tra báo cáo và bộ nhớ riêng của con người. | **Dành riêng cho Human**: Không cần copy vào chat prompt để tiết kiệm tối đa context window cho code. |
| **`.ai/`** | **AI Operating Protocol** | Bộ quy tắc bất biến, phân quyền nhánh Git, từ điển lệnh chỉ huy, quản lý bảng task và các đề xuất thay đổi. | **Quy tắc AI**: AI tự động đọc và tuân thủ khi nhận lệnh từ bạn. Bạn không cần chỉnh sửa các file này. |
| **`.document/`** | **Document Lifecycle System** | Khung quản lý vòng đời tài liệu theo Scrum, template, schema, các Sprint (active/planned/completed) và tài liệu sống của dự án (`current/`). | **Tri thức dự án**: AI tra cứu theo nhu cầu từng task. Bạn phê duyệt nội dung tại đây. |
| **`.skills/`** | **Skills Library** | Thư viện kỹ năng tái sử dụng (phân tích yêu cầu, chia task, quy ước TypeScript, Vitest). | **Kỹ năng tái sử dụng**: AI nạp on-demand theo công nghệ và loại task. |

---

## 3. Ranh Giới Quyền Hạn Theo Nhánh Git (Branch Matrix)

Để bảo đảm mã nguồn sản phẩm không bao giờ bị phá vỡ ngoài ý muốn, hệ thống áp dụng ma trận phân quyền 3 tầng nhánh bất biến:

```
                  ┌──────────────────────────────────────────────┐
                  │                    MAIN                      │
                  │   Quy hoạch / Kiến trúc / Giao thức / Docs   │
                  │             (TUYỆT ĐỐI CẤM SỬA /src/)        │
                  │                [Tuần tự: 1 AI duy nhất]       │
                  └──────────────────────┬───────────────────────┘
                                         │ Human duyệt & merge
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │                   DEVELOP                    │
                  │      Tích hợp / Đánh giá hồi quy / Sprint    │
                  │             (TUYỆT ĐỐI CẤM SỬA /src/)        │
                  │                [Tuần tự: 1 AI duy nhất]       │
                  └──────────────────────┬───────────────────────┘
                                         │ Phân nhánh task mới
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │             task/TASK-XXX-<slug>             │
                  │              Lập trình & Unit Test           │
                  │      (DUY NHẤT ĐƯỢC PHÉP CHỈNH SỬA /src/)    │
                  │          [Đa tác nhân: Chạy đồng thời]       │
                  └──────────────────────────────────────────────┘
```

- **Nhánh `main`**: Dành cho lập kế hoạch Sprint, tài liệu kiến trúc tổng thể, quy chuẩn giao thức. **AI cấm tuyệt đối sửa bất kỳ file nào trong `/src/`**.
- **Nhánh `develop`**: Dành cho kiểm tra tích hợp, chạy kiểm thử hồi quy tổng thể và viết báo cáo đánh giá Sprint. **AI cấm tuyệt đối sửa mã nguồn sản phẩm trong `/src/`**.
- **Nhánh `task/TASK-XXX-<slug>`**: Nhánh duy nhất cho phép AI viết mã nguồn và unit test, nhưng **chỉ được sửa các file nằm chính xác trong danh sách `ALLOWED FILES` của task**.

---

## 4. Vòng Đời Trạng Thái Sprint và Task

Hệ thống chuẩn hóa 2 vòng đời trạng thái tách biệt:

### Vòng Đời Sprint (Scrum Lifecycle)
```
[PLANNED / IDEA] ──(Human duyệt)──> [APPROVED] ──(Kích hoạt)──> [ACTIVE] 
   (Lên kế hoạch)                    (Chốt scope)            (Tối đa 1 Sprint)
                                                                  │
[COMPLETED] <──(Human nghiệm thu)── [REVIEWING] <─────────────────┘
 (Lưu trữ)                           (Xác minh 100% AC)
```

### Vòng Đời Nhiệm Vụ (Task State Machine)
```
[PLANNED] ──> [READY] ──> [CLAIMED] ──> [DESIGNING] ──> [IMPLEMENTING] ──> [TESTING]
                                                                               │
[DONE] <──(Human merge develop)── [INTEGRATED] <──(Human duyệt)── [READY_FOR_REVIEW]
```
*(Các trạng thái ngoại lệ: `BLOCKED` khi vướng đề xuất kiến trúc hoặc phụ thuộc chưa xong; `PAUSED` khi tạm dừng để đổi task khẩn cấp).*

---

## 5. Vai Trò Của Lập Trình Viên Con Người Trong Chu Trình Hằng Ngày

Mỗi ngày làm việc với AI, bạn sẽ đóng vai trò như một **Product Owner kiêm Lead Architect**:

1. **Khởi đầu phiên**: Kiểm tra nhánh Git, pull mã nguồn mới nhất từ `develop`, kiểm tra bảng task hoạt động `.ai/tasks/TASK_PROCESSING.md`.
2. **Giao việc và chỉ đạo**: Sử dụng các câu lệnh tự nhiên hoặc lệnh chuẩn (`ANALYZE`, `DESIGN`, `IMPLEMENT`, `TEST`, `REVIEW`, `REPORT`, `PROPOSE`, `STOP`) gửi cho AI trong chat.
3. **Phê duyệt thiết kế (Design Before Code)**: Trước khi AI gõ code vào `/src/`, bạn xem xét Phần 1 của file task (`Goal`, `Scope`, `API Contracts`, `Test Plan`) để đảm bảo AI hiểu đúng kiến trúc.
4. **Giám sát và phân xử đề xuất**: Khi AI tạo đề xuất `PROP-XXX.md` (cải tiến kiến trúc hoặc phá vỡ hợp đồng API), bạn đưa ra phán quyết: `APPROVE`, `REJECT` hoặc `DEFER`.
5. **Nghiệm thu và tích hợp**: Khi AI báo cáo `READY_FOR_REVIEW`, bạn chạy bộ 4 lệnh kiểm tra chất lượng độc lập trên máy của mình (`typecheck`, `lint`, `test:run`, `build`), kiểm tra diff Git, và tự tay merge nhánh task vào `develop`.

---

## 6. Tài Liệu Hướng Dẫn Tiếp Theo

Tùy vào hoàn cảnh hiện tại của dự án, hãy chuyển tới tài liệu tương ứng:

- **Nếu repository hoàn toàn mới hoặc chưa có tài liệu/mã nguồn**: Đọc ngay [02-starting-from-empty-project.md](02-starting-from-empty-project.md).
- **Nếu tiếp quản dự án đã có sẵn mã nguồn và lịch sử phát triển**: Đọc [03-joining-existing-project.md](03-joining-existing-project.md).
- **Nếu cần tra cứu danh mục lệnh và cú pháp chỉ huy**: Đọc [commands-reference.md](../operations/commands-reference.md).
- **Nếu muốn kiểm tra báo cáo bàn giao của AI**: Đọc [task-report-review.md](../reports/task-report-review.md).

