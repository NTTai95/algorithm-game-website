# Quy Trình: Bắt Đầu Một Phiên Làm Việc Mới (Start Session)

Quy trình này áp dụng mỗi khi một developer ngồi vào máy tính để bắt đầu ca làm việc cùng AI.

---

## Các Bước Thực Hiện:
1. **Kiểm tra trạng thái Git cục bộ**:
   ```bash
   git status
   ```
   Đảm bảo thư mục làm việc sạch sẽ, không có thay đổi dở dang chưa được commit.
2. **Kéo mã nguồn mới nhất từ remote**:
   ```bash
   git checkout develop
   git pull origin develop
   ```
3. **Xem bảng điều phối nhiệm vụ**:
   Mở file `.ai/tasks/TASK_PROCESSING.md` để xem:
   - Những task nào đang ở trạng thái `IN_PROGRESS` (có đồng nghiệp đang làm không?).
   - Những task nào đang ở trạng thái `READY` có thể nhận làm ngay.
4. **Xác định mục tiêu của phiên**:
   - Nếu làm tiếp task cũ: Checkout sang nhánh `task/TASK-XXX-<slug>` tương ứng.
   - Nếu nhận task mới: Xem quy trình [`.human/procedures/assign-task.md`](file:///d:/workspace/Algorithm-game-website/.human/procedures/assign-task.md).
