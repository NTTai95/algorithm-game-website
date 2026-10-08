# Vòng Đời Tác Vụ & Quy Trình Phát Triển (Task Lifecycle & Development Workflow)

Quy trình phát triển trong dự án được tổ chức chặt chẽ theo từng giai đoạn chuẩn mực. **AI tuyệt đối không được nhảy cóc từ khi nhận task sang viết mã nguồn.**

---

## 1. Vòng Đời Trạng Thái Của Task (State Lifecycle)

```
PLANNED (Được lên kế hoạch bởi Human)
  ↓
READY (Đã đủ điều kiện, sẵn sàng thực hiện)
  ↓
CLAIMED (Được một phiên AI nhận làm)
  ↓
DESIGNING (AI đang hoàn thiện Phần 1: Thiết Kế)
  ↓
IMPLEMENTING (AI đang viết mã nguồn trên nhánh task)
  ↓
TESTING (AI đang chạy bộ kiểm thử toàn diện)
  ↓
READY_FOR_REVIEW (AI hoàn tất, chờ con người đánh giá)
  ↓
REVIEWED (Human đã xem xét: Duyệt hoặc Yêu cầu sửa)
  ↓
INTEGRATED (Human merge nhánh task vào develop)
  ↓
DONE (Hoàn tất chính thức, lưu trữ vào completed/)
```

*Các trạng thái ngoại lệ:*
- `BLOCKED`: Bị nghẽn do phụ thuộc chưa xong hoặc chờ quyết định kiến trúc.
- `PAUSED`: Tạm dừng khi Human điều chuyển AI sang task khẩn cấp khác.
- `REJECTED`: Task bị hủy bỏ hoặc thay thế.

> **Quy Tắc Chốt Hạ**: Chỉ có **Lập Trình Viên Con Người** mới có quyền chuyển task sang trạng thái `DONE` sau khi đã merge vào `develop`. AI chỉ được phép đánh dấu tối đa là `READY_FOR_REVIEW`.

---

## 2. Quy Trình "Thiết Kế Trước Khi Viết Code" (Design Before Code)

Mọi task phát triển trên nhánh `task/TASK-XXX-*` phải trải qua đầy đủ chuỗi 8 bước logic trước khi bắt đầu sửa file mã nguồn:

```
TASK ASSIGNMENT
  ↓
1. ANALYSIS (Khảo sát kiến trúc, scope, ranh giới file)
  ↓
2. DESIGN (Thiết kế giải pháp, phân tách lớp)
  ↓
3. API CONTRACT (Định nghĩa giao diện, types dự kiến)
  ↓
4. DATA FLOW (Mô tả luồng dữ liệu & sự kiện phát ra)
  ↓
5. TEST PLAN (Xác định ca kiểm thử, test biên)
  ↓
6. CONFLICT CHECK (Kiểm tra xung đột với task khác & Halt Rule)
  ↓
7. IMPLEMENTATION (Viết mã nguồn strictly trong ALLOWED FILES)
  ↓
8. VERIFICATION (Typecheck, Lint, Test, Build)
```

---

## 3. Quy Trình Bàn Giao Khi Chuyển Đổi Task Dở Dang

Nếu con người yêu cầu AI chuyển sang làm task khác trước khi task hiện tại hoàn tất, AI **BẮT BUỘC** phải thực hiện đầy đủ chuỗi thao tác an toàn:
1. Dừng viết mã tại điểm biên an toàn, không để code gãy cú pháp.
2. Chạy xác minh kiểm thử thích hợp để ghi nhận trạng thái hiện tại.
3. Tạo commit cho toàn bộ thay đổi dở dang (`TASK-XXX: WIP description`).
4. Đẩy (push) nhánh task hiện tại lên Git repository.
5. Cập nhật file `TASK-XXX.md` và `TASK_PROCESSING.md` sang trạng thái `PAUSED` hoặc `IN_PROGRESS`.
6. Soạn nhật ký bàn giao chi tiết tại `.ai/sessions/SESSION-XXX.md`:
   - Ghi rõ điểm đã dừng lại.
   - Ghi rõ các vấn đề còn tồn đọng.
   - Hướng dẫn cụ thể hành động tiếp theo cho phiên AI sau.
7. **Tuyệt đối không để lại bất kỳ file nào chưa commit trong working tree.**
