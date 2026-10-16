# Hướng Dẫn Bắt Đầu Từ Repository Trống (.human/getting-started/02-starting-from-empty-project.md)

Tài liệu này hướng dẫn chi tiết quy trình từng bước dành cho Lập trình viên Con người (Human) khi bắt đầu dự án từ thời điểm **chưa có tài liệu dự án, chưa có kế hoạch Sprint hoặc chưa có mã nguồn sản phẩm**.

---

## 1. Triết Lý Bắt Đầu: Khung Trống (Blank Slate) & Tài Liệu Đúng Lúc (Just-In-Time)

Hệ thống quản lý vòng đời tài liệu (`.document/`) áp dụng triết lý:
- **Không dựng sẵn tài liệu giả định**: Repository mới bắt đầu từ bộ khung trống, không chứa các tài liệu kiến trúc mẫu đồ sộ để ép dự án phải tuân theo.
- **Tài liệu sinh ra theo nhu cầu (Just-In-Time Documentation)**: Tài liệu chỉ được tạo ra khi Sprint thực sự cần để thiết kế, lập trình hoặc nghiệm thu.
- **Human định hướng, AI cấu trúc hóa**: Bạn không cần tự viết tài liệu kỹ thuật phức tạp ngay từ đầu. Bạn chỉ cần mô tả ý tưởng sản phẩm tự nhiên bằng ngôn ngữ thông thường; AI sẽ làm rõ, cấu trúc hóa và đề xuất giải pháp.

---

## 2. Quy Trình 13 Bước Từ Ý Tưởng Đến Sprint Đầu Tiên

```
[BƯỚC 1 - 2: Khảo sát hiện trạng Repo]
               ↓
[BƯỚC 3: Cung cấp ý tưởng sản phẩm ban đầu qua Chat]
               ↓
[BƯỚC 4 - 5: Hội thoại làm rõ yêu cầu (Q&A trực tiếp)]
               ↓
[BƯỚC 6: Phân định 5 cấp độ thông tin]
               ↓
[BƯỚC 7 - 8: Xem xét & Điều chỉnh đề xuất Sprint 01]
               ↓
[BƯỚC 9: Human Phê Duyệt Kế Hoạch Sprint (Approval Gate)]
               ↓
[BƯỚC 10: Khởi tạo tài liệu Sprint (active/SPRINT-01.md)]
               ↓
[BƯỚC 11: Tạo task & Phân nhánh task/TASK-XXX]
               ↓
[BƯỚC 12: Giám sát AI thực thi (DESIGN -> IMPLEMENT -> TEST)]
               ↓
[BƯỚC 13: Nghiệm thu, Tích hợp & Chuẩn bị Sprint tiếp theo]
```

---

## 3. Hướng Dẫn Chi Tiết Từng Bước Kèm Mẫu Câu Thoại Thực Tế

### Bước 1: Xác Định Trạng Thái Ban Đầu Của Repository
Trước khi bắt đầu, mở terminal tại thư mục gốc của dự án và kiểm tra:
```bash
# 1. Kiểm tra nhánh Git hiện tại
git branch --show-current
# Kết quả mong đợi: main

# 2. Kiểm tra trạng thái working tree
git status
# Kết quả mong đợi: working tree clean

# 3. Kiểm tra cấu hình công nghệ và scripts có sẵn
cat package.json
```
> [!NOTE]
> Trong repository này, các công cụ nền tảng đã sẵn sàng trong `package.json`: Vite, React 19, Phaser 3, TypeScript, ESLint và Vitest.

### Bước 2: Kiểm Tra Trạng Thái Thư Mục `.document/`
Xác nhận tình trạng tài liệu hiện hành:
- Thư mục `.document/current/` hiện đang trống: Đây là trạng thái hoàn toàn bình thường đối với dự án mới.
- Thư mục `.document/sprints/active/` chưa có Sprint nào đang chạy.
- Các template chuẩn mực đã sẵn sàng tại `.document/templates/`.

### Bước 3: Cung Cấp Ý Tưởng Sản Phẩm Ban Đầu Cho AI
Bắt đầu một phiên hội thoại với AI trên nhánh `main`. Bạn hãy mô tả ý tưởng sản phẩm theo cách tự nhiên nhất: bài toán bạn muốn giải quyết, người dùng mục tiêu, và tính năng cốt lõi.

**Ví dụ câu lệnh gửi cho AI:**
> *"Tôi muốn xây dựng một website trò chơi tương tác trực quan giúp người học hiểu các thuật toán sắp xếp (Bubble Sort, Quick Sort) thông qua đồ họa và thao tác kéo thả mô phỏng kho hàng (Warehouse Game). AI hãy đóng vai trò Product Analyst và Lead Architect, khảo sát công nghệ hiện có và giúp tôi làm rõ yêu cầu."*

### Bước 4: AI Phân Tích & Đặt Câu Hỏi Làm Rõ (Discovery & Clarification)
Theo quy định tại `.document/RULES.md` (Mục 5) và `.skills/core/analyze-requirements.md` (SKILL-C01):
- **AI BẮT BUỘC phải hỏi trực tiếp qua chat**, tuyệt đối không tạo các file Markdown câu hỏi như `QUESTIONS.md`.
- AI sẽ chia yêu cầu của bạn thành:
  - **Điều đã biết**: React 19, Phaser 3, TypeScript, game mô phỏng kho bãi, thuật toán sắp xếp.
  - **Điều chưa biết**: Phong cách đồ họa, cấu trúc màn chơi, cơ chế ghi điểm, thiết bị hỗ trợ (desktop/mobile).
  - **Giả định kỹ thuật cần xác nhận**: Canvas Phaser nhúng trong React hay toàn màn hình; state game quản lý bằng React state hay logic thuần TypeScript.

### Bước 5: Human Trả Lời & Bổ Sung Thông Tin
Bạn trả lời các câu hỏi của AI để thu hẹp phạm vi.

**Ví dụ câu thoại trả lời:**
> *"1. Về kiến trúc: Logic thuật toán và mô hình kho bãi phải viết bằng TypeScript thuần túy, độc lập 100% với Phaser và React để dễ viết unit test.
> 2. Về giao diện: Khung ngoài dùng React điều khiển nút bấm, bên trong nhúng Canvas Phaser hiển thị các thùng hàng.
> 3. Về phạm vi Sprint 1: Chỉ tập trung xây dựng Domain Model cho Kho hàng (Slot, Box) và thuật toán Bubble Sort trong TypeScript thuần, chưa cần vẽ giao diện đồ họa."*

### Bước 6: Nhận Biết 5 Cấp Độ Thông Tin Trong Báo Cáo Của AI
Khi AI tổng hợp yêu cầu, bạn phải kiểm tra xem AI có phân định rõ 5 loại thông tin này không (theo chuẩn `.document/RULES.md`):

| Nhãn phân loại | Ý nghĩa | Mức độ ràng buộc |
| :--- | :--- | :--- |
| `[Human-Requested]` | Yêu cầu trực tiếp của bạn (ví dụ: tách biệt domain model thuần TypeScript). | **Bắt buộc tuân thủ 100%** |
| `[Approved Decision]` | Quyết định bạn đã duyệt (ví dụ: dùng Vitest để unit test domain logic). | **Có hiệu lực thi hành** |
| `[AI-Proposed]` | Phương án do AI đề xuất (ví dụ: chia thành 3 sub-module `core/slot`, `core/box`, `algorithms/bubble-sort`). | **Chưa có hiệu lực — Chờ bạn review** |
| `[Unverified Assumption]` | Giả định AI tạm dùng (ví dụ: giả định kích thước kho tối đa 10 ô). | **Cần bạn xác nhận trước khi code** |
| `[Pending Question]` | Câu hỏi còn tồn đọng (ví dụ: có cho phép 2 thùng cùng giá trị không?). | **Chặn phạm vi liên quan** |

### Bước 7: Xem Xét Đề Xuất Sprint Đầu Tiên (Sprint Planning)
AI sẽ trình bày phương án cho Sprint 1 (thường là Sprint nền tảng domain và kiến trúc). Bạn cần kiểm tra 5 yếu tố bắt buộc:
1. **Sprint Goal**: Mục tiêu duy nhất và rõ ràng của Sprint (ví dụ: *"Hoàn thành Lõi nghiệp vụ Kho hàng và Thuật toán Bubble Sort độc lập"*).
2. **In-Scope vs Out-of-Scope**: Ranh giới việc LÀM và KHÔNG LÀM.
3. **Acceptance Criteria (AC)**: Tiêu chí nghiệm thu định lượng, kiểm chứng được bằng test tự động.
4. **Kế hoạch kiểm thử (Verification Plan)**: `npm run typecheck`, `npm run lint`, `npm run test:run`, `npm run build`.
5. **Rủi ro & Phụ thuộc**.

### Bước 8: Yêu Cầu Điều Chỉnh Khi Cần Thiết
Nếu thấy phạm vi quá rộng hoặc AC chưa cụ thể, bạn yêu cầu AI cắt giảm.

**Ví dụ câu lệnh điều chỉnh:**
> *"Bỏ phần Quick Sort ra khỏi Sprint 1, đưa vào danh sách ý tưởng tương lai. Sprint 1 chỉ làm Bubble Sort. Bổ sung Acceptance Criteria: Unit test phải bao phủ trường hợp mảng rỗng và mảng đã được sắp xếp sẵn."*

### Bước 9: Human Phê Duyệt Kế Hoạch (Approval Gate)
Chỉ khi bạn hoàn toàn hài lòng với phạm vi và tiêu chí nghiệm thu, bạn mới ra lệnh phê duyệt kế hoạch.

**Ví dụ câu lệnh phê duyệt:**
> *"Tôi duyệt kế hoạch Sprint 1 với phạm vi và Acceptance Criteria như trên. Hãy tạo tài liệu Sprint chính thức."*

### Bước 10: Khởi Tạo Tài Liệu Sprint Chính Thức
AI sẽ sử dụng mẫu `.document/templates/sprint/SPRINT_PLAN_TEMPLATE.md` để tạo file:
`.document/sprints/active/SPRINT-01-warehouse-domain-core.md` với trạng thái `STATUS: ACTIVE`.

Nếu Sprint cần tài liệu kiến trúc gốc, AI sẽ sử dụng template tương ứng để tạo tài liệu trong `.document/current/` (ví dụ: `.document/current/ARCHITECTURE.md`).

### Bước 11: Tạo Task Và Phân Nhánh Git
Chuyển đổi các mục tiêu trong Sprint Plan thành các task cụ thể:
1. Tạo file task tại `.ai/tasks/active/TASK-001.md` từ `.ai/templates/tasks/TASK_TEMPLATE.md`.
2. Điền đầy đủ: `TASK_ID`, `GOAL`, `SCOPE`, `ALLOWED FILES`, `ACCEPTANCE CRITERIA`.
3. Đăng ký task vào bảng `.ai/tasks/TASK_PROCESSING.md` với trạng thái `STATUS: READY`.
4. Tạo nhánh Git bắt nguồn từ `develop`:
   ```bash
   git branch task/TASK-001-warehouse-domain develop
   git checkout task/TASK-001-warehouse-domain
   ```

### Bước 12: Giao Task & Giám Sát AI Thực Thi (Design Before Code)
Trên nhánh task vừa tạo, bạn ra lệnh cho AI thực hiện tuần tự:

**Giai đoạn Thiết kế (DESIGN):**
> *"DESIGN TASK-001. Hoàn thiện Phần 1 (Goal, Scope, API Contracts, Data Flow, Test Plan) trong .ai/tasks/active/TASK-001.md. TUYỆT ĐỐI CHƯA VIẾT CODE VÀO /src/."*

Bạn đọc lại thiết kế trong file task. Khi hài lòng, mới cho phép lập trình:

**Giai đoạn Lập trình (IMPLEMENT):**
> *"IMPLEMENT TASK-001 theo thiết kế đã duyệt. Chỉ sửa các file trong ALLOWED FILES và viết unit test tại src/core/."*

AI sẽ tự động chạy chuỗi kiểm tra chất lượng:
```bash
npm run typecheck && npm run lint && npm run test:run && npm run build
```
Khi đạt 100%, AI commit code (`TASK-001: ...`), commit proposal riêng nếu có (`PROP-XXX: ...`), push nhánh lên remote và cập nhật trạng thái `STATUS: READY_FOR_REVIEW`.

### Bước 13: Nghiệm Thu Đầu Tiên, Tích Hợp & Chuẩn Bị Sprint Kế Tiếp
1. Bạn mở terminal, chạy kiểm tra độc lập và xem diff (xem chi tiết tại [task-report-review.md](../reports/task-report-review.md)).
2. Tự mình thực hiện merge vào `develop`:
   ```bash
   git checkout develop
   git merge --no-ff task/TASK-001-warehouse-domain -m "Merge task/TASK-001 into develop"
   git push origin develop
   ```
3. Đóng task: chuyển file sang `.ai/tasks/completed/TASK-001.md` và chuyển trạng thái `STATUS: DONE`.
4. Khi toàn bộ các task của Sprint 1 hoàn tất: thực hiện quy trình đóng Sprint tại [04-sprint-review-and-next-sprint.md](../workflows/04-sprint-review-and-next-sprint.md).

