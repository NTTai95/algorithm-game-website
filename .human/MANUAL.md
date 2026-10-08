# Cẩm Nang Vận Hành Hệ Thống Phát Triển (Human Operating Manual)

Tài liệu này là hướng dẫn tổng hợp dành cho 2 lập trình viên con người nhằm vận hành dự án phối hợp giữa Con Người và Nhiều Phiên AI trên các máy tính khác nhau một cách trơn tru, không xung đột.

---

## 1. Triết Lý Vận Hành Tổng Thể

Hệ thống được thiết kế theo nguyên tắc:
- **Con Người Ra Quyết Định (Decide & Approve)**: Định hướng sản phẩm, tạo task, phê duyệt kiến trúc, duyệt mã nguồn, thực hiện merge Git.
- **AI Thực Thi Có Kiểm Soát (Implement, Test & Document)**: Phân tích, thiết kế chi tiết, lập trình, viết unit test, ghi chú phiên và đề xuất cải tiến.
- **Git Làm Trục Xương Sống (Single Source of Truth)**: Mọi giao tiếp giữa các AI và giữa con người với AI đều thông qua file văn bản và lịch sử Git.
- **AI Không Cố Định Danh Tính**: Không có "AI của máy A" hay "AI của máy B". Mọi AI đều hoạt động dựa trên:
  $$\text{Vai Trò AI} = \text{Nhánh Git Hiện Tại} + \text{Mã Task} + \text{Session ID}$$

---

## 2. Bản Đồ Vai Trò Của Các Nhánh Git Đối Với Con Người

Khi chỉ đạo AI, bạn cần biết chính xác nhánh nào phục vụ mục đích gì:

| Nhánh | Mục Đích Đối Với Con Người | Vai Trò Của AI Trên Nhánh | AI Có Được Sửa `/src/` Không? |
| :--- | :--- | :--- | :--- |
| **`main`** | Định hình kiến trúc, quy hoạch hệ thống, cập nhật luật chơi và tài liệu vận hành | AI đóng vai trò Kiến trúc sư: rà soát tài liệu, lập kế hoạch, phát hiện mâu thuẫn | **TUYỆT ĐỐI CẤM** |
| **`develop`** | Tích hợp các tính năng đã xong, chạy hồi quy, đánh giá kết quả sprint | AI đóng vai trò Kỹ sư Tích hợp & QA: chạy test, xác minh tính tương thích, viết báo cáo | **TUYỆT ĐỐI CẤM** |
| **`task/TASK-XXX-*`** | Nơi diễn ra công việc lập trình thực tế cho một tính năng cụ thể | AI đóng vai trò Kỹ sư Lập trình: viết code, viết test, tạo commit, đẩy nhánh | **CÓ (trong phạm vi task)** |

---

## 3. Quy Trình Vận Hành Một Ngày Làm Việc Điển Hình

### Bước 1: Khởi động hoặc tiếp tục công việc
- Mở terminal, kiểm tra `git status` và pull code mới nhất từ nhánh `develop`.
- Xem bảng điều phối `.ai/tasks/TASK_PROCESSING.md` để biết tình trạng các task hiện tại.

### Bước 2: Chỉ đạo AI thực hiện nhiệm vụ
- Nếu giao task mới: Xem quy trình [`.human/procedures/assign-task.md`](file:///d:/workspace/Algorithm-game-website/.human/procedures/assign-task.md).
- Ra lệnh cho AI trực tiếp qua lời nhắc (prompt) với các lệnh chuẩn (`DESIGN`, `IMPLEMENT`, `TEST` theo hướng dẫn tại [`.human/CONTROL_GUIDE.md`](file:///d:/workspace/Algorithm-game-website/.human/CONTROL_GUIDE.md)). Bạn không cần chỉnh sửa file `CONTROL.md`.

### Bước 3: Nghiệm thu và Tích hợp
- Khi AI báo cáo `READY_FOR_REVIEW`, con người kiểm tra diff trên GitHub/Git.
- Chạy thử test trên nhánh task.
- Nếu đạt yêu cầu: Con người tự mình thực hiện lệnh merge nhánh task vào `develop`.
- Chuyển trạng thái task thành `DONE`.

---

## 4. Xử Lý Khi Có Xung Đột Hoặc AI Báo Dừng (Halt)

Khi AI dừng lại và báo cáo vi phạm **Halt Rule** hoặc tạo **Drift Report**:
1. **Bình tĩnh kiểm tra nguyên nhân**: Xem nhật ký phiên gần nhất trong `.ai/sessions/` hoặc file trong `.ai/changes/`.
2. **Không ép AI vượt quyền**: Nếu nhánh Git không khớp với task, hãy kiểm tra xem bạn đã checkout đúng nhánh task chưa.
3. **Phân xử sai lệch**: Nếu code khác với tài liệu, quyết định xem code đúng hay tài liệu đúng, sau đó trực tiếp chỉnh sửa hoặc chỉ đạo AI cập nhật.
