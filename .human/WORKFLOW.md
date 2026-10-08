# Hướng Dẫn Vận Hành Quy Trình Sprint (Sprint & Development Workflow)

Tài liệu này hướng dẫn cách hai lập trình viên con người tổ chức chu trình phát triển (Sprint) phối hợp cùng các AI.

---

## 1. Chu Trình Một Vòng Lặp Sprint (Sprint Loop)

```
GIAI ĐOẠN 1: SPRINT PLANNING (Trên nhánh main)
- Hai developer thống nhất mục tiêu sprint tiếp theo.
- Lên danh sách 3-5 task cụ thể đưa vào .ai/tasks/TASK_PROCESSING.md.
- Thiết lập trạng thái task là READY.
  ↓
GIAI ĐOẠN 2: TASK EXECUTION (Trên các nhánh task/TASK-XXX-*)
- Các phiên AI phân nhánh từ develop và thực hiện song song từng task theo chỉ đạo bằng prompt của con người.
- AI thiết kế (DESIGN), viết code (IMPLEMENT), chạy unit test (TEST), cam kết commit sạch sẽ.
- AI nộp báo cáo READY_FOR_REVIEW.
  ↓
GIAI ĐOẠN 3: INTEGRATION & SPRINT REVIEW (Trên nhánh develop)
- Con người duyệt và merge các nhánh task hoàn tất vào develop.
- Chạy toàn bộ test tích hợp và kiểm thử hồi quy trên develop.
- Đánh giá khả năng tương thích giữa các tính năng.
  ↓
GIAI ĐOẠN 4: SPRINT RELEASE & CLOSING (develop -> main)
- Khi toàn bộ mục tiêu sprint đạt chuẩn, con người merge develop vào main.
- Tạo tag phiên bản (nếu cần).
- Chuẩn bị bước vào sprint kế tiếp.
```

---

## 2. Phân Công Giữa Hai Developer Con Người
- **Giao tiếp chủ động**: Khi một developer chuẩn bị gán task cho AI trên máy mình, hãy đảm bảo task đó chưa bị máy của developer kia nhận (kiểm tra `CURRENT_SESSION` trên GitHub).
- **Tránh sửa chung file**: Khi lên kế hoạch task, hãy cố gắng phân chia ranh giới module rõ ràng để các nhánh task không chỉnh sửa trùng một file nguồn.
