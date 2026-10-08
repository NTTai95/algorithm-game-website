# Giao Thức Quản Lý Git (Git Development & Integration Protocol)

Trong dự án này, Git không chỉ đơn thuần là hệ thống quản lý mã nguồn, mà còn là:
- **Lịch sử phát triển dự án (Development History)**.
- **Lịch sử thực thi từng nhiệm vụ (Task History)**.
- **Lịch sử tích hợp và mốc phê duyệt của Con Người (Human Confirmation History)**.

---

## 1. Chuẩn Đặt Tên Thông Điệp Commit (Commit Naming Conventions)
Mỗi commit phải đại diện cho một thay đổi logic nguyên tử (atomic change). **Tuyệt đối cấm các commit mơ hồ** như `fix`, `update`, `test`, `changes`, `work`.

### Các Mẫu Chuẩn:
- **Khởi tạo nền tảng**:
  `INIT-001: establish project foundation`
- **Củng cố giao thức**:
  `INIT-002: harden AI development protocol`
- **Thực thi nhiệm vụ**:
  `TASK-XXX: <mô tả ngắn gọn bằng thể mệnh lệnh>`
  *(Ví dụ: `TASK-001: implement warehouse slot domain model`, `TASK-002: add crane event emitter unit tests`)*
- **Lưu trạng thái dở dang khi chuyển task**:
  `TASK-XXX: WIP pause at slot validation logic`

---

## 2. Quy Định Tạo Nhánh Task Từ `develop`
- AI khi đang ở nhánh task **KHÔNG ĐƯỢC PHÉP checkout sang `develop` hay `main`**.
- Để tạo một nhánh task mới mà không cần checkout sang `develop`, AI sử dụng lệnh phân nhánh trực tiếp từ tham chiếu `develop`:
  ```bash
  # Tạo nhánh mới bắt nguồn từ develop mà không cần chuyển sang develop
  git branch task/TASK-XXX-<slug> develop
  git checkout task/TASK-XXX-<slug>
  ```
- **Điều kiện tiên quyết trước khi tạo nhánh task**:
  1. Task `TASK-XXX` đã tồn tại trong `.ai/tasks/active/`.
  2. Con người đã phê duyệt task và trạng thái là `READY`.
  3. Mọi dependencies của task đã hoàn thành.
  4. Nhánh `develop` cục bộ đã được đồng bộ với phiên bản tích hợp mới nhất.

---

## 3. Quy Trình Hoàn Tất Task & Điểm Xác Nhận Của Con Người
AI **TUYỆT ĐỐI KHÔNG ĐƯỢC** tự động merge nhánh task vào `develop` hoặc `main`.

```
[Trên nhánh task/TASK-XXX-*]
1. AI chạy toàn bộ test, lint, typecheck, build.
2. AI cập nhật tài liệu và tạo commit hoàn chỉnh.
3. AI đẩy nhánh lên: git push origin task/TASK-XXX-<slug>
4. AI cập nhật trạng thái: STATUS: READY_FOR_REVIEW
5. AI tạo nhật ký phiên bàn giao trong .ai/sessions/
  ↓
[Con Người Tiếp Quản]
6. Human Developer kiểm tra diff nhánh task.
7. Human Developer quyết định: APPROVE hoặc REQUEST_CHANGES.
8. Human Developer tự mình thực hiện lệnh merge vào develop.
  ↓
[Hoàn Tất Chính Thức]
9. Task được chuyển sang STATUS: DONE và chuyển file vào .ai/tasks/completed/.
```

---

## 4. Các Lệnh Git Bị Cấm Tuyệt Đối Đối Với AI
AI **TUYỆT ĐỐI CẤM**:
- Force push (`git push -f`) lên bất kỳ nhánh chung nào (`main`, `develop`).
- Viết lại hoặc xóa lịch sử commit trên các nhánh được bảo vệ.
- Xóa nhánh `main` hoặc `develop`.
- Merge bất kỳ nhánh nào vào `main` hoặc `develop`.
