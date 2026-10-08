# Hệ Thống Quản Lý Tác Vụ (Task Management System)

Thư mục này là trung tâm điều phối toàn bộ các nhiệm vụ phát triển kỹ thuật trong dự án **Website Trò Chơi Thuật Toán**.

---

## 1. Cấu Trúc Thư Mục
```
.ai/tasks/
├── README.md               # Tài liệu này (hướng dẫn vận hành hệ thống task)
├── TASK_PROCESSING.md      # Bảng điều phối nhẹ (hiển thị 3-5 task đang kích hoạt)
├── TASK_TEMPLATE.md        # Bản mẫu quy chuẩn để tạo task mới
├── active/                 # Chứa các task đang trong quá trình thực hiện (TASK-XXX.md)
├── completed/              # Lưu trữ các task đã được Human tích hợp và chuyển thành DONE
└── notes/                  # Các ghi chú kỹ thuật hoặc đặc tả chi tiết mở rộng của task
```

---

## 2. Quy Cách Đặt Tên File & Nhánh
- **Tệp task**: `TASK-XXX.md` *(ví dụ: `TASK-001.md`, `TASK-002.md`)*. Tuyệt đối không đặt tên tùy tiện như `task1.md` hay `fix-box.md`.
- **Nhánh Git tương ứng**: `task/TASK-XXX-<slug>` *(ví dụ: `task/TASK-001-warehouse-domain`)*.

---

## 3. Cửa Sổ Nhiệm Vụ Hoạt Động (Active Task Window)
- Bảng điều phối `TASK_PROCESSING.md` chỉ duy trì **tối đa từ 3 đến 5 task hoạt động đồng thời**.
- Không đưa toàn bộ backlog vào thư mục `active/`. Việc này giúp giữ cho ngữ cảnh dự án luôn tinh gọn và tránh xung đột phân tán.

---

## 4. Quy Trình Vận Hành Một Task
1. **Khởi tạo**: Lập trình viên con người sao chép `TASK_TEMPLATE.md` tạo file `active/TASK-XXX.md` và thêm dòng tương ứng vào `TASK_PROCESSING.md` với trạng thái `STATUS: READY`.
2. **Nhận việc (Claim)**: Một phiên AI kiểm tra task, cập nhật `CURRENT_BRANCH`, `CURRENT_SESSION`, và chuyển trạng thái sang `CLAIMED` $\to$ `DESIGNING`.
3. **Thiết kế**: AI hoàn thiện Phần 1 (Thiết kế, API, Test plan) trong file task.
4. **Triển khai**: AI kiểm tra Halt Rule, chuyển sang `IMPLEMENTING` và viết mã nguồn trên nhánh task.
5. **Đánh giá**: Hoàn tất code và test, AI chuyển sang `READY_FOR_REVIEW`.
6. **Tích hợp**: Con người kiểm tra diff, merge nhánh vào `develop`, chuyển file sang `completed/TASK-XXX.md` và đổi trạng thái thành `DONE`.
