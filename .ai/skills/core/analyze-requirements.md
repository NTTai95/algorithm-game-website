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

- Yêu cầu từ Human (prompt, user story, mô tả tính năng).
- Bối cảnh Sprint hiện tại (nếu có).
- [Tùy chọn] `.document/GOALS_AND_SCOPE.md`, `.document/REQUIREMENTS.md`.

---

## Các bước thực hiện

### Bước 1: Tách biệt vấn đề rõ với vấn đề chưa rõ

Với mỗi phần trong yêu cầu, phân loại:
- **Rõ**: có thể chuyển thành task ngay.
- **Chưa rõ**: thiếu thông tin, có nhiều cách hiểu, hoặc phụ thuộc quyết định chưa có.
- **Ngoài phạm vi Sprint**: mục tiêu tương lai, chưa cần thiết kế ngay.

### Bước 2: Đặt câu hỏi làm rõ (khi cần)

Chỉ hỏi khi thực sự cần thiết. Ưu tiên hỏi một lần, gộp tất cả câu hỏi.

Mẫu câu hỏi tốt:
- "Khi [hành vi X] xảy ra, hệ thống cần làm [A] hay [B]?"
- "Điều kiện [Y] là bắt buộc với Sprint này hay có thể để sau?"
- "Hiện tại đã có component [Z] xử lý vấn đề tương tự — cần tích hợp hay tạo mới?"

Không đặt câu hỏi mà câu trả lời có thể suy ra từ tài liệu hiện có.

### Bước 3: Xác định phạm vi Sprint

Phân biệt rõ:
- **Sprint hiện tại**: những gì phải hoàn thành để đạt mục tiêu Sprint.
- **Backlog tương lai**: mở rộng hợp lý nhưng không bắt buộc trong Sprint này.
- **Ngoài phạm vi**: không thuộc Sprint này dù có vẻ liên quan.

Không thiết kế trước cho backlog tương lai nếu chưa có quyết định.

### Bước 4: Xác định ràng buộc kỹ thuật

Kiểm tra:
- Có API contract nào liên quan không? (→ `.document/interfaces/API_CONTRACTS.md`)
- Có kiến trúc phân lớp nào ảnh hưởng? (→ `.document/ARCHITECTURE.md`)
- Có task nào đang ACTIVE có thể xung đột không? (→ `TASK_PROCESSING.md`)

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
