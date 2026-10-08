# Hướng Dẫn Tương Tác & Chỉ Đạo AI (AI Operating Guide)

Tài liệu này giải thích cơ chế tư duy, giới hạn hành vi và cách thức giao tiếp hiệu quả nhất với các AI Coding Agent trong dự án.

---

## 1. Bản Chất Của AI Trong Hệ Thống Này

- **AI là Thực Thi Viên Có Kỷ Luật, Không Phải Đấng Tự Trị**: AI trong dự án này được lập trình để tuân thủ quy tắc nghiêm ngặt, tự kiểm tra ranh giới quyền hạn trước khi gõ code.
- **Tính Hoán Đổi (Interchangeability)**: Bạn có thể dùng Claude trên Máy 1, dùng Gemini trên Máy 2, hoặc chuyển đổi giữa các phiên chat khác nhau mà không sợ mất bối cảnh, vì mọi trạng thái đều được neo vào:
  - Nhánh Git
  - File task `.ai/tasks/active/TASK-XXX.md`
  - File nhật ký phiên `.ai/sessions/SESSION-XXX.md`
- **Không Cố Định Danh Tính**: Không có "AI A" hay "AI B" cố định. Bất kỳ AI nào cũng có cùng năng lực và bị kiểm soát bởi cùng một giao thức.
- **Điều Khiển Bằng Lời Nhắc (Prompt-Driven)**: Bạn điều khiển AI bằng lời nhắc. Không cần chỉnh sửa thủ công các file giao thức như `.ai/CONTROL.md` để cấp phép cho AI.

---

## 2. Mô Hình Đồng Thời (AI Concurrency Model)

Để tránh tình huống 2 AI dẫm chân lên nhau hoặc làm hỏng dữ liệu chung:

### Được Phép Chạy Song Song:
- Developer 1 bật AI trên nhánh `task/TASK-001-...` để làm tính năng Kho bãi.
- Developer 2 bật AI trên nhánh `task/TASK-002-...` để làm tính năng Cần cẩu.
*(Hai AI này chạy hoàn toàn độc lập, đọc chung đặc tả `.ai/CONTROL.md` tĩnh, không xung đột file).*

### BẮT BUỘC Phải Chạy Tuần Tự (Chỉ 1 AI tại một thời điểm):
- **Trên nhánh `main`**: Chỉ một developer cho phép AI làm việc trên `main` để điều chỉnh kiến trúc hoặc tài liệu.
- **Trên nhánh `develop`**: Chỉ một developer cho phép AI chạy đánh giá tích hợp sprint.

---

## 3. Cách Prompt Cho AI Hiệu Quả Nhất

Bạn nên sử dụng các từ khóa lệnh chuẩn đã định nghĩa trong [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md) kết hợp với các từ bổ trợ:

### 1. Pha Thiết Kế Task:
> *"DESIGN TASK-004. Hoàn thiện Phần 1 (Kiến trúc, API, Data Flow, Test Plan) trong task file. Chưa code."*

### 2. Pha Triển Khai Code:
> *"IMPLEMENT TASK-004 theo specification đã được phê duyệt. Chỉ sửa các file trong ALLOWED FILES và viết unit test."*

### 3. Pha Chạy Test Độc Lập:
> *"TEST TASK-004, không sửa source."*

### 4. Pha Rà Soát Chất Lượng:
> *"REVIEW TASK-004 và kiểm tra tương thích với nhánh develop."*

### 5. Khi Cần Đề Xuất Ý Kiến:
> *"PROPOSE thay đổi API nếu cần, không được tự triển khai."*

### 6. Khi Muốn Dừng Hoặc Bàn Giao:
> *"Dừng viết code tại điểm an toàn. Chạy test, tạo commit WIP và ghi nhật ký bàn giao SESSION trước khi STOP."*

### 7. Khi AI Phát Hiện Sai Lệch:
> AI đã được huấn luyện để tự động kích hoạt chu trình:
> $$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{STOP} \longrightarrow \mathbf{HUMAN\ DECISION}$$
> Bạn chỉ cần đọc báo cáo sai lệch (`DRIFT-XXX.md`) hoặc đề xuất (`PROP-XXX.md`) của AI và đưa ra phán quyết.
