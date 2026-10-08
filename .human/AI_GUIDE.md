# Hướng Dẫn Tương Tác & Chỉ Đạo AI (AI Operating Guide)

Tài liệu này giải thích cơ chế tư duy, giới hạn hành vi và cách thức giao tiếp hiệu quả nhất với các AI Coding Agent trong dự án.

---

## 1. Bản Chất Của AI Trong Hệ Thống Này

- **AI là Thực Thi Viên Có Kỷ Luật, Không Phải Đấng Tự Trị**: AI trong dự án này được lập trình để tuân thủ quy tắc nghiêm ngặt, tự kiểm tra ranh giới quyền hạn trước khi gõ code.
- **Tính Hoán Đổi (Interchangeability)**: Bạn có thể dùng Claude trên Máy 1, dùng Gemini trên Máy 2, hoặc chuyển đổi giữa các phiên chat khác nhau mà không sợ mất bối cảnh, vì mọi trạng thái đều được neo vào:
  - Nhánh Git
  - File task `.ai/tasks/active/TASK-XXX.md`
  - File nhật ký phiên `.ai/sessions/SESSION-XXX.md`
  - Thư mục đề xuất dùng chung `.ai/changes/proposals/PROP-XXX.md`
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

## 3. Cơ Chế Đề Xuất Dùng Chung Qua Git (Shared Proposals via Git)

- **Đề Xuất Là Tài Sản Dùng Chung**: Khi một AI phát hiện cơ hội hoặc nhu cầu cải tiến kiến trúc/API, đề xuất `PROP-XXX.md` được tự động tạo, commit riêng rẽ và push lên remote task branch qua Git.
- **Con Người Không Cần Hỏi**: Bạn không cần phải hỏi *"Em có tạo đề xuất nào không?"*. Quy trình làm việc của AI tự động ghi nhận vào Git và bảng task/session.
- **Chia Sẻ Đa Máy Tính / Đa AI**:
  - AI trên Máy A tạo `PROP-014` và push lên.
  - Lập trình viên trên Máy B kéo code về (`git pull`), AI trên Máy B lập tức đọc được `PROP-014` và hiểu nguyên nhân, rủi ro mà không cần xem lại lịch sử chat của Máy A.
- **Quyền Phán Quyết Thuộc Về Con Người**:
  - Con người xem xét đề xuất sau khi AI nộp task hoặc khi review sprint.
  - Bạn có thể đưa ra quyết định: **`APPROVE`** (Duyệt), **`REJECT`** (Từ chối), hoặc **`DEFER`** (Hoãn).
  - Đề xuất được duyệt **không tự động biến thành code** ngay; bạn sẽ đưa đề xuất đó vào kế hoạch sprint dưới dạng một Task mới hoặc chỉ thị cụ thể.

---

## 4. Cách Prompt Cho AI Hiệu Quả Nhất

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
> *"Dừng viết code tại điểm an toàn. Chạy test, tạo commit WIP, commit riêng proposals nếu có, push nhánh và ghi nhật ký bàn giao SESSION trước khi STOP."*

### 7. Khi AI Phát Hiện Sai Lệch Hoặc Đổi Kiến Trúc:
> AI đã được huấn luyện để tự động kích hoạt chu trình:
> $$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{STOP} \longrightarrow \mathbf{HUMAN\ DECISION}$$
> Bạn chỉ cần đọc báo cáo sai lệch (`DRIFT-XXX.md`) hoặc đề xuất (`PROP-XXX.md`) của AI và đưa ra phán quyết.
