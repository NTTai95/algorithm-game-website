# Quy Trình: Tạo & Giao Nhiệm Vụ Cho AI (Assign Task)

Quy trình này hướng dẫn cách tạo một task mới từ backlog và đưa vào luồng thực thi của AI.

---

## Các Bước Thực Hiện:
1. **Tạo file đặc tả task**:
   Sao chép [`.ai/tasks/TASK_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/TASK_TEMPLATE.md) thành `.ai/tasks/active/TASK-XXX.md`.
2. **Điền đầy đủ các mục trong Phần 1 (Thiết kế ban đầu)**:
   - Mục tiêu (`GOAL`), Phạm vi (`SCOPE`), Ranh giới tệp tin (`ALLOWED FILES`, `RESTRICTED FILES`).
   - Tiêu chí nghiệm thu (`ACCEPTANCE CRITERIA`).
3. **Cập nhật Bảng điều phối**:
   Thêm dòng task mới vào [`.ai/tasks/TASK_PROCESSING.md`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/TASK_PROCESSING.md) với trạng thái `STATUS: READY`.
4. **Tạo nhánh Git cho task**:
   Tạo nhánh mới từ `develop` mới nhất:
   ```bash
   git branch task/TASK-XXX-<slug> develop
   git checkout task/TASK-XXX-<slug>
   ```
5. **Chỉ đạo AI bắt đầu pha thiết kế qua prompt**:
   Gửi prompt cho AI:
   > *"DESIGN TASK-XXX. Hoàn thiện Phần 1 (Thiết kế chi tiết, API, Data Flow, Test Plan) trong .ai/tasks/active/TASK-XXX.md. Chưa viết code."*
   *(Lưu ý: Bạn **không cần chỉnh sửa `CONTROL.md`**; AI sẽ tự động diễn giải lệnh theo đặc tả tĩnh).*
6. **Sau khi duyệt thiết kế**:
   Chỉ đạo AI triển khai mã nguồn:
   > *"IMPLEMENT TASK-XXX theo thiết kế đã được duyệt. Chỉ chỉnh sửa các file trong ALLOWED FILES và viết unit test."*
