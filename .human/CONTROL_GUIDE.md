# Hướng Dẫn Cấu Hình Bảng Điều Khiển (CONTROL.md Guide)

Tệp [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md) là bề mặt điều khiển tối thượng do Lập trình viên Con người sở hữu và thiết lập để cấp phép hành vi cho AI.

---

## 1. Ý Nghĩa Các Trường Trong `CONTROL.md`

```yaml
MODE: [Chế độ vận hành]
CURRENT_TASK: [Mã nhiệm vụ hiện tại]
COMMAND: [Lệnh chỉ định cho AI]
ALLOW_CODE: [Quyền sửa code: YES / NO]
ALLOW_TEST: [Quyền chạy test: YES / NO]
ALLOW_COMMIT: [Quyền tạo commit: YES / NO]
ALLOW_MERGE: [Quyền merge: LUÔN LÀ NO]
ALLOW_ARCHITECTURE_CHANGE: [Quyền đổi kiến trúc: YES / NO]
ALLOW_DEPENDENCY_INSTALL: [Quyền cài thư viện: YES / NO]
```

---

## 2. Các Cấu Hình Mẫu Cho Từng Kịch Bản Thực Tế

### Kịch Bản 1: Khi giao AI làm việc trên Nhánh Task (`task/TASK-001-*`)
```yaml
MODE: TASK
CURRENT_TASK: TASK-001
COMMAND: IMPLEMENT
ALLOW_CODE: YES
ALLOW_TEST: YES
ALLOW_COMMIT: YES
ALLOW_MERGE: NO
ALLOW_ARCHITECTURE_CHANGE: NO
ALLOW_DEPENDENCY_INSTALL: NO
```

### Kịch Bản 2: Khi AI đang ở Nhánh `develop` để Chạy Test & Đánh Giá Tích Hợp
```yaml
MODE: DEVELOP
CURRENT_TASK: NONE
COMMAND: VERIFY
ALLOW_CODE: NO
ALLOW_TEST: YES
ALLOW_COMMIT: YES # Chỉ commit báo cáo/tài liệu kiểm thử
ALLOW_MERGE: NO
ALLOW_ARCHITECTURE_CHANGE: NO
ALLOW_DEPENDENCY_INSTALL: NO
```

### Kịch Bản 3: Khi AI đang ở Nhánh `main` để Quy Hoạch & Cập Nhật Giao Thức
```yaml
MODE: MAIN
CURRENT_TASK: NONE
COMMAND: PLAN
ALLOW_CODE: NO
ALLOW_TEST: YES
ALLOW_COMMIT: YES # Chỉ commit thay đổi trong .ai/ hoặc .human/
ALLOW_MERGE: NO
ALLOW_ARCHITECTURE_CHANGE: YES
ALLOW_DEPENDENCY_INSTALL: NO
```

### Kịch Bản 4: Khẩn Cấp Dừng Mọi Hành Động Của AI
```yaml
MODE: TASK
CURRENT_TASK: NONE
COMMAND: HALT
ALLOW_CODE: NO
ALLOW_TEST: NO
ALLOW_COMMIT: NO
ALLOW_MERGE: NO
ALLOW_ARCHITECTURE_CHANGE: NO
ALLOW_DEPENDENCY_INSTALL: NO
```

---

## 3. Khắc Phục Khi AI Bị Kích Hoạt "Halt Rule"
Nếu AI từ chối viết code và báo lỗi "HALT RULE VIOLATION":
1. Kiểm tra xem bạn có đang đứng ở nhánh `develop` hoặc `main` không? (Nếu có: Hãy checkout sang nhánh task thích hợp).
2. Kiểm tra xem `CURRENT_TASK` trong `CONTROL.md` có khớp với tên nhánh task không?
3. Kiểm tra xem file task trong `active/` đã hoàn thành Phần 1 (Thiết kế) và chuyển sang `IMPLEMENTING` chưa?
