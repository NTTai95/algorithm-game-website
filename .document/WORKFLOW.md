# Scrum Document Lifecycle Workflow (WORKFLOW.md)

Quy trình 6 giai đoạn vận hành vòng đời tài liệu và phát triển phần mềm theo mô hình Scrum giữa Human và AI.

```
[Giai đoạn A: Khởi tạo & Trao đổi] 
               ↓
[Giai đoạn B: Phân tích & Lên kế hoạch Sprint] 
               ↓
[Giai đoạn C: Human Review & Phê duyệt] 
               ↓ (Human chấp thuận)
[Giai đoạn D: Tạo tài liệu Sprint] 
               ↓
[Giai đoạn E: Thực hiện Sprint] 
               ↓
[Giai đoạn F: Review, Nghiệm thu & Kết thúc]
```

---

## Giai đoạn A — Khởi tạo và Trao đổi Yêu cầu (Discovery & Clarification)

### Mục tiêu:
Biến mô tả tự nhiên của Human thành hiểu biết có cấu trúc mà không đòi hỏi Human phải chuẩn bị tài liệu phức tạp trước.

### Các bước AI thực hiện:
1. **Đọc điểm vào**: Đọc [`.document/ROUTER.md`](./ROUTER.md) để xác định ngữ cảnh.
2. **Kiểm tra thông tin sẵn có**: Đọc tài liệu trong `.document/current/` (nếu đã có từ các Sprint trước). Nếu thư mục trống, coi đây là dự án mới bắt đầu từ khung trống.
3. **Phân tích yêu cầu**:
   - Xác định: **Điều đã biết**, **Điều chưa biết**, **Giả định cần kiểm chứng**, **Mâu thuẫn tiềm ẩn**.
4. **Hỏi trực tiếp qua hội thoại**:
   - Đặt câu hỏi trực tiếp cho Human trong chat về mục tiêu cốt lõi, phạm vi ưu tiên và tiêu chí chấp nhận.
   - **CẤM**: Tạo file Markdown chứa câu hỏi (như `QUESTIONS.md`).
   - **CẤM**: Tự suy diễn câu trả lời của Human đối với các quyết định quan trọng.
5. **Chờ phản hồi**: Nếu Human chỉ yêu cầu trao đổi hoặc phân tích sơ bộ $\to$ dừng lại ở mức thảo luận, **tuyệt đối không tự động tạo tài liệu Sprint chính thức** khi chưa có sự đồng ý.

---

## Giai đoạn B — Phân tích và Thiết kế Sprint (Sprint Planning & Roadmap)

### Mục tiêu:
Xây dựng phương án Sprint rõ ràng, khả thi và hỗ trợ lộ trình nhiều Sprint (Multi-Sprint Planning).

### Nội dung phương án Sprint:
- **Sprint Goal & Value**: Mục tiêu trọng tâm và giá trị mang lại cho người dùng/hệ thống.
- **In-Scope vs Out-of-Scope**: Ranh giới việc làm và việc KHÔNG làm trong Sprint này.
- **Acceptance Criteria (AC)**: Tiêu chí nghiệm thu định lượng, có thể kiểm chứng được (testable).
- **Affected Modules**: Các module hoặc thư mục dự kiến bị ảnh hưởng (nếu đã xác định).
- **Key Risks & Dependencies**: Rủi ro kỹ thuật, phụ thuộc bên ngoài hoặc giữa các task.
- **Verification Plan**: Kế hoạch kiểm thử (unit test, build, lint, verification gates).
- **Key Decisions Needed**: Các quyết định kỹ thuật cần Human phê duyệt trước khi làm.

### Hỗ trợ Lập kế hoạch Nhiều Sprint (Multi-Sprint Roadmap):
Khi Human yêu cầu lên kế hoạch trước 2–3 Sprint hoặc roadmap dài hơn, AI phân loại rõ 3 trạng thái:
1. **`ACTIVE` (Đang thực hiện)**: Duy nhất tối đa 1 Sprint tại một thời điểm.
2. **`APPROVED` (Đã duyệt, chưa bắt đầu)**: Sprint đã được Human chốt scope nhưng chưa kích hoạt làm.
3. **`PLANNED` / `IDEA` (Dự kiến / Ý tưởng tương lai)**: Kế hoạch mở, có thể thay đổi linh hoạt theo thực tế.

> **QUY TẮC CỐT LÕI**:
> - Không khóa cứng kiến trúc hoặc giải pháp kỹ thuật cho các Sprint tương lai xa khi yêu cầu chưa rõ.
> - Kế hoạch nhiều Sprint **KHÔNG** đồng nghĩa với quyền triển khai song song hoặc tự động làm tiếp.

---

## Giai đoạn C — Human Review và Phê duyệt (Approval Gate)

### Mục tiêu:
Tạo điểm kiểm soát chất lượng (Human-in-the-loop) trước khi sinh tài liệu và viết code.

### Phân định 5 loại thông tin trong trình bày:
1. **Yêu cầu của Human** (`[Human-Requested]`): Yêu cầu gốc từ người dùng.
2. **Đề xuất của AI** (`[AI-Proposed]`): Giải pháp kiến trúc/thiết kế AI đề xuất.
3. **Giả định chưa kiểm chứng** (`[Unverified Assumption]`): Tạm dùng, cần xác nhận.
4. **Quyết định đã duyệt** (`[Approved Decision]`): Human đã đồng ý.
5. **Câu hỏi chờ xử lý** (`[Pending Question]`): Cần Human trả lời để chốt scope.

### Xử lý khi Human thay đổi yêu cầu:
- Đánh giá ngay tác động tới: Sprint hiện tại, các Sprint đã lên kế hoạch phía sau, và tài liệu liên quan.
- Đề xuất phương án điều chỉnh phạm vi hoặc dời task sang Sprint sau.
- **CẤM**: Tự coi thay đổi là đã mặc nhiên được duyệt toàn bộ.

---

## Giai đoạn D — Tạo Tài Liệu Sprint (Sprint Documentation)

### Mục tiêu:
Chuyển hóa phương án đã duyệt thành tài liệu chính thức cho Sprint.

### Các bước thực hiện:
1. Chọn template phù hợp từ `.document/templates/`:
   - Bắt buộc: `.document/templates/sprint/SPRINT_PLAN_TEMPLATE.md`.
   - Nếu Sprint cần tài liệu kiến trúc/kỹ thuật mới: chọn template tương ứng trong `templates/technical/` hoặc `templates/project/`.
2. Tạo file Sprint tại: `.document/sprints/active/SPRINT-XXX-<slug>.md`.
3. Điền đầy đủ metadata chuẩn theo [`.document/schemas/metadata-schema.md`](./schemas/metadata-schema.md).
4. **Nguyên tắc độ dài**: Đủ ngắn gọn để tiết kiệm context window, nhưng đủ rõ ràng để một AI phiên làm việc sau có thể đọc và hiểu ngay mà không cần suy đoán.

---

## Giai đoạn E — Thực Hiện Sprint (Sprint Execution)

### Mục tiêu:
Triển khai code và cập nhật tài liệu trong phạm vi đã được phê duyệt.

### Quy tắc triển khai:
1. **Tuân thủ Branch Policy**:
   - Mọi task triển khai trên nhánh `task/TASK-XXX-<slug>`. Tuyệt đối không code trực tiếp trên `main` hoặc `develop`.
2. **Liên kết chặt chẽ**: Task phải trỏ trực tiếp tới Sprint Goal và Acceptance Criteria tương ứng.
3. **Cập nhật tài liệu sống**:
   - Khi có thay đổi kiến trúc/API thực tế phát sinh trong quá trình code $\to$ cập nhật ngay tài liệu trong `current/`.
4. **Các điều TUYỆT ĐỐI CẤM**:
   - **CẤM**: Âm thầm mở rộng phạm vi (scope creep).
   - **CẤM**: Sửa ngược Acceptance Criteria đã duyệt chỉ để hợp thức hóa code chạy sai hoặc chưa đạt.
   - **CẤM**: Tự giải quyết mâu thuẫn lớn với tài liệu mà không báo cáo Human.

---

## Giai đoạn F — Review, Nghiệm Thu và Kết Thúc Sprint (Closure)

### Mục tiêu:
Đóng Sprint dựa trên bằng chứng kiểm thử thực tế và nghiệm thu của Human.

### Các bước kết thúc Sprint:
1. **Xác minh Acceptance Criteria**:
   - Đối chiếu từng tiêu chí nghiệm thu trong file Sprint.
   - Báo cáo rõ: Test nào đã chạy (pass/fail), test nào chưa chạy hoặc chưa thể tự động hóa.
2. **Lập biên bản Sprint Review**:
   - Sử dụng `.document/templates/sprint/SPRINT_REVIEW_TEMPLATE.md`.
   - Ghi nhận: Kết quả đạt được, giới hạn còn tồn tại, nợ kỹ thuật (nếu có), bài học kinh nghiệm.
3. **Cập nhật tài liệu dự án**:
   - Nếu Sprint tạo ra hoặc thay đổi kiến trúc/ranh giới/mô hình: cập nhật phiên bản chính thức trong `.document/current/`.
4. **Đánh giá lại Sprint phía sau**:
   - Rà soát các Sprint trong `sprints/planned/` dựa trên kết quả thực tế của Sprint vừa đóng.
5. **Chuyển trạng thái lưu trữ**:
   - Di chuyển file Sprint từ `.document/sprints/active/` sang `.document/sprints/completed/`.
6. **Điều kiện hoàn thành**:
   - Chỉ đánh dấu Sprint hoàn thành khi có sự xác nhận nghiệm thu từ Human. Không bao giờ tự đóng Sprint chỉ vì code xong.
