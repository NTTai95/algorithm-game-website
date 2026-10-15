# SKILL-C01: Phân Tích và Làm Rõ Yêu Cầu (Analyze Requirements)

```yaml
SKILL_ID: SKILL-C01
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: []
```

---

## Mục đích

Giúp AI phân tích yêu cầu từ Human, phân biệt điều đã rõ với điều cần làm rõ, xác định phạm vi Sprint hiện tại với dự định tương lai, và chuẩn bị đủ thông tin trước khi chia task hoặc thiết kế.

---

## Kích hoạt khi

- Nhận yêu cầu tính năng mới còn mơ hồ hoặc thiếu thông tin.
- Command: `ANALYZE` nhắm vào một yêu cầu.
- Chuẩn bị trước khi dùng SKILL-C03 (phân rã task).

## Không áp dụng khi

- Yêu cầu đã được làm rõ đầy đủ và task đã có trong `TASK_PROCESSING.md`.
- Đang ở giai đoạn IMPLEMENT — skill này không giúp triển khai code.

---

## Input cần có

- Yêu cầu từ Human (prompt, user story, mô tả tính năng bằng ngôn ngữ tự nhiên).
- Bối cảnh Sprint hiện tại (nếu có trong `.document/sprints/active/`).
- [Tùy chọn] Tài liệu dự án đang hiệu lực (tra cứu qua `.document/ROUTER.md` trong `.document/current/` nếu tồn tại).

---

## Các bước thực hiện

### Bước 1: Tách biệt vấn đề rõ với vấn đề chưa rõ

Với mỗi phần trong yêu cầu, phân loại thành 4 nhóm:
- **Đã biết (Knowns)**: Yêu cầu rõ ràng từ Human, có thể chuyển thành task/AC.
- **Chưa biết (Unknowns)**: Thiếu thông tin, có nhiều cách hiểu, hoặc cần quyết định kỹ thuật.
- **Giả định (Assumptions)**: Giả định tạm thời AI đưa ra, cần được Human xác nhận.
- **Ngoài phạm vi (Out-of-Scope)**: Tính năng mở rộng, mục tiêu tương lai, không thuộc Sprint này.

### Bước 2: Đặt câu hỏi làm rõ trực tiếp qua chat

- **Hỏi trực tiếp trong hội thoại**: Đặt câu hỏi ngắn gọn, trọng tâm, gộp câu hỏi liên quan.
- **TUYỆT ĐỐI CẤM**: Tạo file Markdown riêng (như `QUESTIONS.md`) để chứa câu hỏi.
- **TUYỆT ĐỐI CẤM**: Tự suy diễn câu trả lời của Human đối với các quyết định ảnh hưởng đến phạm vi hoặc tiêu chí nghiệm thu.
- **Phân loại thông tin rõ ràng** khi trình bày:
  - `[Human-Requested]`: Yêu cầu gốc của Human.
  - `[AI-Proposed]`: Đề xuất của AI.
  - `[Unverified Assumption]`: Giả định cần kiểm chứng.
  - `[Pending Question]`: Câu hỏi đang chờ trả lời.

### Bước 3: Xác định phạm vi và bối cảnh Sprint

Phân biệt rõ:
- **Sprint hiện tại**: Những gì bắt buộc phải hoàn thành để đạt Sprint Goal.
- **Sprint kế tiếp / Backlog tương lai**: Các ý tưởng hoặc mở rộng hợp lý nhưng dời sang Sprint sau.
- **Ngoài phạm vi**: Những gì hệ thống không làm.

> **Lưu ý**: Nếu Human chỉ yêu cầu phân tích hoặc trao đổi sơ bộ, dừng lại ở mức thảo luận; **không tự ý tạo file Sprint chính thức** khi chưa có sự chấp thuận.

### Bước 4: Xác định ràng buộc kỹ thuật

Kiểm tra theo `.document/ROUTER.md`:
- Có hợp đồng giao diện / API nào liên quan trong `.document/current/` không?
- Có tài liệu kiến trúc hoặc ranh giới module nào trong `.document/current/` không?
- Có task nào đang ACTIVE có thể xung đột không? (→ `.ai/tasks/TASK_PROCESSING.md`)
- *Nếu chưa có tài liệu dự án tương ứng*: Ghi nhận giới hạn, không tự bịa ra kiến trúc chưa duyệt.


### Bước 5: Tổng hợp kết quả phân tích

Trình bày:
1. **Những gì đã rõ** — có thể chia task ngay.
2. **Những điểm cần làm rõ** — câu hỏi gửi Human (nếu có).
3. **Phạm vi Sprint** — ranh giới rõ ràng.
4. **Ràng buộc kỹ thuật đã xác định** — không cần giải quyết hết trong bước này.

---

## Output phải tạo ra

- Báo cáo phân tích: những điểm rõ, điểm chưa rõ, phạm vi.
- Danh sách câu hỏi làm rõ (nếu cần).
- Sẵn sàng chuyển sang SKILL-C03 sau khi yêu cầu đủ rõ.

## Cách xác minh kết quả

- Mỗi phần yêu cầu đã được phân loại (rõ / chưa rõ / ngoài phạm vi).
- Không có giả định ẩn nào về hành vi chưa được xác nhận.
- Phạm vi Sprint được xác định rõ ràng.
