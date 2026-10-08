# Quy Trình: Dừng AI Khẩn Cấp (Emergency Stop AI)

Quy trình này áp dụng khi phát hiện AI đang đi chệch hướng, sửa file ngoài phạm vi, hoặc vi phạm kiến trúc.

---

## Các Bước Thực Hiện:
1. **Dừng phiên chat ngay lập tức**: Nhấn nút Dừng/Hủy (Cancel/Stop generation) trên giao diện IDE.
2. **Ra lệnh STOP dứt khoát qua prompt**:
   Gửi prompt cho AI:
   > *"STOP ngay lập tức. Giữ nguyên toàn bộ trạng thái kho chứa, không sửa đổi bất kỳ tệp tin nào và báo cáo vị trí hiện tại."*
   *(Lưu ý: Bạn **không cần chỉnh sửa `CONTROL.md`**; lệnh STOP có hiệu lực ngay lập tức theo quy ước giao thức).*
3. **Kiểm tra thay đổi chưa commit**:
   ```bash
   git status
   git diff
   ```
4. **Xử lý mã nguồn bị lỗi**:
   - Nếu AI sửa sai file hoặc tạo code rác: Dùng `git restore <file>` hoặc `git clean -fd` để loại bỏ các thay đổi không mong muốn.
5. **Đánh giá lại yêu cầu**: Xem lại prompt hoặc file task để làm rõ phạm vi trước khi cho AI tiếp tục.
