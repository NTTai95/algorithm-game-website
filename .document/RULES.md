# Document Lifecycle Rules & Single Source of Truth (RULES.md)

Tài liệu này quy định các chuẩn mực bắt buộc về quản lý, cập nhật, lưu trữ và giải quyết mâu thuẫn tài liệu trong Document Lifecycle System.

---

## 1. Nguyên Tắc Single Source of Truth (SSOT)

1. **Một Nguồn Sự Thật Duy Nhất**:
   - Mỗi mẩu thông tin quan trọng (mục tiêu, kiến trúc, ranh giới module, hợp đồng API, quyết định kỹ thuật) chỉ được định nghĩa chính thức tại **MỘT** file duy nhất.
   - Các tài liệu khác chỉ được phép dẫn link tham chiếu (markdown link), tuyệt đối không copy toàn bộ nội dung sang file khác.
2. **Không Tạo Tài Liệu Thừa**:
   - Nghiêm cấm tạo tài liệu chỉ để "đầy đủ cây thư mục". Một dự án chỉ tạo những tài liệu thực sự cần thiết cho giai đoạn phát triển hiện tại.
3. **Cập Nhật Ngay Tại Nguồn**:
   - Khi có thay đổi kiến trúc hoặc hợp đồng đã được Human phê duyệt, tài liệu gốc tương ứng trong `current/` phải được cập nhật ngay trong Sprint đó.

---

## 2. Phân Biệt Ý Định (Intent) và Hành Vi Thực Tế (Behavior)

1. **Tài liệu phản ánh ý định (Design Intent)**: Mô tả những gì hệ thống được thiết kế để làm.
2. **Source code phản ánh hành vi thực tế (Implemented Behavior)**: Phản ánh những gì đang chạy.
3. **Xử lý mâu thuẫn**:
   - Không được giả định tài liệu luôn luôn đúng hơn code, hoặc code luôn luôn đúng hơn tài liệu.
   - Nếu phát hiện code khác với tài liệu:
     - Nếu code sai lệch ngoài ý muốn $\to$ Báo cáo sai lệch (DRIFT), sửa code để khớp tài liệu đã duyệt.
     - Nếu phát hiện thiết kế trong tài liệu không còn phù hợp $\to$ Đề xuất điều chỉnh (PROP) và chỉ cập nhật tài liệu sau khi Human phê duyệt.

---

## 3. Phân Loại 5 Cấp Độ Thông Tin

Trong mọi báo cáo, kế hoạch Sprint hoặc phân tích yêu cầu, AI phải phân biệt rõ ràng:

| Cấp độ | Định nghĩa | Mức độ ràng buộc |
| :--- | :--- | :--- |
| **1. Human-Requested** | Yêu cầu trực tiếp, rõ ràng từ Human | Bắt buộc tuân thủ |
| **2. Approved Decisions** | Quyết định kỹ thuật hoặc giải pháp đã được Human xác nhận | Có hiệu lực thi hành |
| **3. AI-Proposed** | Phương án, kiến trúc hoặc phân rã task do AI đề xuất | Chưa có hiệu lực, chờ Human review |
| **4. Unverified Assumptions** | Giả định AI tạm dùng khi thiếu thông tin | Phải ghi rõ là giả định, cần kiểm chứng |
| **5. Pending Questions** | Vấn đề đang chờ Human phản hồi | Chặn việc triển khai phạm vi liên quan |

---

## 4. Quản Lý Trạng Thái & Vòng Đời Tài Liệu

Mỗi tài liệu trong `.document/` (ngoại trừ framework files) bắt buộc phải có frontmatter chứa trường `STATUS`:

- `DRAFT`: Đang soạn thảo, chưa qua review.
- `REVIEWING`: Đang trình Human xem xét.
- `CONFIRMED`: Đã được Human phê duyệt, đang có hiệu lực thi hành.
- `DEPRECATED`: Không còn hiệu lực, đã có tài liệu thay thế (phải ghi rõ `REPLACED_BY`).
- `ARCHIVED`: Đã hoàn thành hoặc lưu trữ lịch sử, chỉ dùng để tra cứu quá khứ.

### Quy tắc lưu trữ (Archiving):
- Khi một Sprint kết thúc $\to$ chuyển file Sprint từ `sprints/active/` sang `sprints/completed/`.
- Khi một tài liệu dự án bị thay thế hoàn toàn $\to$ gắn trạng thái `DEPRECATED` kèm link tới tài liệu mới, hoặc chuyển vào `archive/` nếu không còn giá trị định tuyến active.
- Tài liệu trong `archive/` **tuyệt đối không được coi là yêu cầu hiện hành**.

---

## 5. Quy Tắc Hội Thoại Trực Tiếp (No File-Based Questions)

1. **Hỏi trực tiếp qua chat**:
   - Mọi câu hỏi làm rõ yêu cầu, xác minh giả định hoặc xin quyết định phải được đặt trực tiếp cho Human trong hội thoại.
2. **Nghiêm cấm tạo file câu hỏi**:
   - Không tạo các file như `QUESTIONS.md`, `CLARIFICATIONS.md` hay `TODO_HUMAN.md` để "đẩy" câu hỏi cho Human đọc sau.
3. **Không tự suy diễn câu trả lời**:
   - Nếu câu hỏi ảnh hưởng trực tiếp đến phạm vi, kiến trúc hoặc tiêu chí nghiệm thu $\to$ dừng phần việc liên quan và chờ Human trả lời.
