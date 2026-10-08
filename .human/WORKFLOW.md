# Hướng Dẫn Vận Hành Quy Trình Sprint (Sprint & Development Workflow)

Tài liệu này hướng dẫn cách hai lập trình viên con người tổ chức chu trình phát triển (Sprint) phối hợp cùng các AI.

---

## 1. Chu Trình Một Vòng Lặp Sprint (Sprint Loop)

```
GIAI ĐOẠN 1: SPRINT PLANNING (Trên nhánh main)
- Hai developer thống nhất mục tiêu sprint tiếp theo.
- Rà soát các đề xuất đã được phê duyệt (APPROVED Proposals) để chuyển thành Task mới.
- Lên danh sách 3-5 task cụ thể đưa vào .ai/tasks/TASK_PROCESSING.md.
- Thiết lập trạng thái task là READY.
  ↓
GIAI ĐOẠN 2: TASK EXECUTION (Trên các nhánh task/TASK-XXX-*)
- Các phiên AI phân nhánh từ develop và thực hiện song song từng task theo chỉ đạo bằng prompt của con người.
- AI thiết kế (DESIGN), viết code (IMPLEMENT), chạy unit test (TEST).
- Nếu phát hiện vấn đề: AI tạo PROP-XXX.md, commit riêng và push lên remote.
- AI nộp báo cáo READY_FOR_REVIEW.
  ↓
GIAI ĐOẠN 3: INTEGRATION & SPRINT REVIEW (Trên nhánh develop)
- Con người duyệt và merge các nhánh task hoàn tất vào develop.
- Đánh giá các đề xuất kỹ thuật đi kèm: APPROVE, REJECT, hoặc DEFER.
- Chạy toàn bộ test tích hợp và kiểm thử hồi quy trên develop.
- Đánh giá khả năng tương thích giữa các tính năng.
  ↓
GIAI ĐOẠN 4: SPRINT RELEASE & CLOSING (develop -> main)
- Khi toàn bộ mục tiêu sprint đạt chuẩn, con người merge develop vào main.
- Tạo tag phiên bản (nếu cần).
- Chuẩn bị bước vào sprint kế tiếp.
```

---

## 2. Quản Lý Đề Xuất Cải Tiến (Proposals) Trong Sprint

- **Đề Xuất Là Tri Thức Dùng Chung**: Trong lúc lập trình, nếu AI phát hiện cải tiến kiến trúc/API, AI sẽ tạo `PROP-XXX.md` và đẩy lên Git. Cả hai developer trên hai máy đều có thể đọc được đề xuất này sau khi kéo nhánh về.
- **Quyết Định Của Con Người**:
  - `APPROVE`: Đề xuất được chấp thuận. Con người sẽ tạo task chính thức ở Sprint tiếp theo để triển khai.
  - `REJECT`: Đề xuất không phù hợp, lưu lại lý do từ chối để tránh các AI sau lặp lại.
  - `DEFER`: Đề xuất hữu ích nhưng hoãn lại cho giai đoạn sau.
- **Không Tự Động Code**: Đề xuất được duyệt không tự động cấp quyền viết mã. AI chỉ được viết mã khi có Task chính thức.

---

## 3. Phân Công Giữa Hai Developer Con Người
- **Giao tiếp chủ động**: Khi một developer chuẩn bị gán task cho AI trên máy mình, hãy đảm bảo task đó chưa bị máy của developer kia nhận (kiểm tra `CURRENT_SESSION` trên GitHub).
- **Tránh sửa chung file**: Khi lên kế hoạch task, hãy cố gắng phân chia ranh giới module rõ ràng để các nhánh task không chỉnh sửa trùng một file nguồn.
