# .ai - Giao Thức Phát Triển Tự Động Hóa Cho AI (Development Protocol)

## 1. Mục Đích
Thư mục `.ai/` là trung tâm lưu trữ toàn bộ quy tắc vận hành, kiến trúc, hợp đồng API và trạng thái điều khiển ở dạng máy đọc được (machine-readable) dành cho tất cả các AI Agent tham gia phát triển dự án **Website Trò Chơi Thuật Toán (Algorithm Game Website)**.

Bất kỳ AI Agent nào khi tiếp cận repository này **BẮT BUỘC PHẢI ĐỌC** và tuân thủ tuyệt đối các quy định trong thư mục này trước khi đọc mã nguồn hoặc thực hiện bất kỳ nhiệm vụ nào.

## 2. Bản Thể AI Có Thể Hoán Đổi (Interchangeable AI Model)
Dự án sử dụng cơ chế thực thi dựa trên nhiệm vụ (task-based execution). Hệ thống **KHÔNG** phân chia danh tính cố định thành AI A hay AI B. 
Danh tính và quyền hạn tác nghiệp của một AI được xác định duy nhất bởi:
$$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
Mọi AI Agent trên các máy tính khác nhau đều có thể tiếp nhận và bàn giao công việc thông qua giao thức Git, Task và Session đã chuẩn hóa.

## 3. Ranh Giới Quyền Hạn Theo Nhánh Git (Xem chi tiết tại `.ai/BRANCH_RULES.md`)
- **`main`**: Nhánh Quy hoạch & Kiến trúc hệ thống. **TUYỆT ĐỐI CẤM SỬA `/src/`**. (Chỉ 1 AI hoạt động).
- **`develop`**: Nhánh Tích hợp, Kiểm thử hồi quy & Đánh giá Sprint. **TUYỆT ĐỐI CẤM SỬA `/src/`**. (Chỉ 1 AI hoạt động).
- **`task/TASK-XXX-*`**: Nhánh Triển khai tính năng. **DUY NHẤT ĐƯỢC PHÉP SỬA `/src/`** trong phạm vi task scope. (Cho phép nhiều AI chạy song song).

## 4. Mối Quan Hệ Giữa `.ai/` và `.human/`
- **`.ai/`**: Không gian vận hành máy của AI. AI phải tham khảo thư mục này để hiểu kiến trúc, luồng làm việc và quyền hạn thực thi.
- **`.human/`**: Sổ tay vận hành và bộ nhớ riêng của con người. AI trên nhánh task/develop **TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ ĐỘNG ĐỌC**, quét hay suy diễn các file trong `.human/`. Chỉ AI trên nhánh `main` mới được phép bảo trì tài liệu trong `.human/` dưới sự chỉ đạo của con người.

## 5. Danh Mục Tài Liệu Cốt Lõi Trong `.ai/`
- [`.ai/AI_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/AI_RULES.md): 16 quy tắc tác nghiệp bắt buộc dành cho AI.
- [`.ai/BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md): Ranh giới quyền hạn chi tiết và ma trận an toàn 3 nhánh logic.
- [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md): Bảng điều khiển quyền hạn và quy tắc dừng an toàn (Halt Rule).
- [`.ai/WORKFLOW.md`](file:///d:/workspace/Algorithm-game-website/.ai/WORKFLOW.md): Chu trình vòng đời phát triển 10 trạng thái và quy trình bàn giao.
- [`.ai/GIT_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/GIT_RULES.md): Quy chuẩn phân nhánh, commit và bảo vệ nhánh chính.
- [`.ai/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.ai/ARCHITECTURE.md): Kiến trúc phân lớp tách rời giữa Thuật toán và Phaser 3.
- [`.ai/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.ai/DOMAIN_MODEL.md): Từ vựng mô hình nghiệp vụ kho bãi, thùng hàng và cần cẩu.
- [`.ai/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.ai/API_CONTRACTS.md): Sổ đăng ký các hợp đồng API công khai ổn định.
- [`.ai/DECISIONS.md`](file:///d:/workspace/Algorithm-game-website/.ai/DECISIONS.md): Nhật ký các quyết định kiến trúc (ADR).
- [`.ai/tasks/`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/): Hệ thống quản lý task, bảng điều phối `TASK_PROCESSING.md` và mẫu task `TASK_TEMPLATE.md`.
- [`.ai/changes/`](file:///d:/workspace/Algorithm-game-website/.ai/changes/): Hệ thống đề xuất thay đổi (`proposals/`) và báo cáo sai lệch (`drift/`).
- [`.ai/sessions/`](file:///d:/workspace/Algorithm-game-website/.ai/sessions/): Nhật ký bàn giao ngữ cảnh và mẫu phiên `SESSION_TEMPLATE.md`.
