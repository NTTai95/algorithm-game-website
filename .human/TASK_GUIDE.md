# Hướng Dẫn Quản Trị Nhiệm Vụ (Task Management Guide)

Tài liệu này hướng dẫn cách thức con người lập kế hoạch, viết đặc tả, phê duyệt và đóng một nhiệm vụ trong dự án.

---

## 1. Cách Tạo Một Task Mới Chuẩn Quy Cách

1. **Sao chép mẫu chuẩn**:
   Sao chép [`.ai/tasks/TASK_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/TASK_TEMPLATE.md) thành `.ai/tasks/active/TASK-XXX.md`.
2. **Điền thông tin ban đầu**:
   - `TASK_ID`: Mã tăng dần theo định dạng 3 chữ số (`TASK-001`, `TASK-002`,...).
   - `TITLE`: Tên ngắn gọn của tính năng.
   - `GOAL`: Mục tiêu kỹ thuật cần đạt.
   - `SCOPE`: Phân định rõ làm gì và không làm gì.
   - `ALLOWED FILES`: Chỉ định cụ thể file hoặc thư mục mà AI được phép chạm vào (ví dụ: `src/core/warehouse/**`, `src/test/unit/**`).
   - `RESTRICTED FILES`: Các file cấm sửa.
   - `RELATED_PROPOSALS`: Tham chiếu đề xuất liên quan (nếu có).
   - `ACCEPTANCE CRITERIA`: Danh sách checkbox tiêu chí hoàn tất.
3. **Cập nhật Bảng điều phối**:
   Thêm một dòng mới vào `.ai/tasks/TASK_PROCESSING.md` với trạng thái `STATUS: READY`.

---

## 2. Quản Lý Cửa Sổ Nhiệm Vụ Hoạt Động (Active Window)
- Bảng điều phối chỉ nên chứa **tối đa từ 3 đến 5 task đang kích hoạt** cùng một lúc.
- Không đưa quá nhiều task chưa sẵn sàng vào `active/`. Hãy để các ý tưởng tương lai trong backlog ghi chú của con người tại `.human/notes/`.

---

## 3. Cách Xử Lý Khi Cần Đổi Task Khẩn Cấp (Task Preemption)
Nếu bạn đang để AI làm `TASK-001` nhưng muốn AI dừng lại để làm gấp `TASK-002`:
1. Không bắt AI vứt bỏ code dở dang. Hãy yêu cầu:
   > *"Dừng code ở trạng thái ổn định, tạo commit WIP, commit riêng proposal nếu có, push nhánh và ghi nhật ký bàn giao handoff cho TASK-001 trước khi chuyển sang task mới."*
2. Sau khi AI commit sạch sẽ, chuyển sang nhánh của task mới (`task/TASK-002-...`) và ra lệnh cho phiên AI bằng prompt (ví dụ: `"DESIGN TASK-002"` hoặc `"IMPLEMENT TASK-002"`). Bạn không cần sửa file `CONTROL.md`.
3. Xem chi tiết tại [`.human/procedures/switch-task.md`](file:///d:/workspace/Algorithm-game-website/.human/procedures/switch-task.md).

---

## 4. Mối Quan Hệ Giữa Nhiệm Vụ (Task) Và Đề Xuất (Proposal)

Hệ thống phân định rạch ròi giữa việc đề xuất và việc thực thi:
$$\mathbf{PROPOSAL} \neq \mathbf{TASK} \neq \mathbf{IMPLEMENTATION}$$

1. **Đề Xuất (Proposal)**: *"Đây là một cải tiến/thay đổi tiềm năng."* Được lưu tại `.ai/changes/proposals/PROP-XXX.md`.
2. **Nhiệm Vụ (Task)**: *"Gói công việc đã được Con người chính thức phê duyệt để hiện thực hóa."*
3. **Tham Chiếu Trong Task**: Mỗi file task có bảng `RELATED_PROPOSALS` ghi nhận các đề xuất phát sinh hoặc liên quan mà không sao chép lại toàn bộ nội dung đề xuất.
4. **Hai Tình Huống Phát Sinh Đề Xuất**:
   - **Không chặn (Non-blocking)**: AI vẫn hoàn thành task, commit riêng mã nguồn (`TASK-XXX: ...`) và commit riêng đề xuất (`PROP-XXX: ...`), push cả hai lên nhánh task.
   - **Chặn (Blocking)**: Đề xuất mâu thuẫn căn bản với kiến trúc của task (`BLOCKS_CURRENT_TASK: YES`), AI đánh dấu task `BLOCKED`, dừng triển khai phần việc bị ảnh hưởng và chờ bạn quyết định.
5. **Sau Khi Con Người Phê Duyệt Đề Xuất (`APPROVED`)**: Đề xuất không tự động triển khai ngay mà sẽ được Con người tạo thành một Task mới hoặc chỉ định rõ ràng trong sprint kế tiếp.
