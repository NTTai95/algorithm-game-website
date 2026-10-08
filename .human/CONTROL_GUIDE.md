# Sổ Tay Điều Khiển AI Qua Lời Nhắc (AI Prompt & Control Guide)

Tệp [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md) là **Đặc tả ngôn ngữ chỉ huy tĩnh (Static Command Specification)** của hệ thống. 

> **QUY TẮC CỐT LÕI DÀNH CHO CON NGƯỜI**:
> - Bạn **KHÔNG CẦN CHỈNH SỬA** tệp `CONTROL.md` cho mỗi lần giao task hay mỗi phiên làm việc.
> - `CONTROL.md` không chứa trạng thái tạm thời (`CURRENT_TASK`, `ALLOW_CODE`). Nó đóng vai trò là "từ điển quy ước" để AI hiểu bạn muốn gì.
> - Bạn điều khiển AI trực tiếp và linh hoạt **THÔNG QUA LỜI NHẮC (PROMPTS)** trong giao diện trò chuyện.
> - `CONTROL.md` chỉ được chỉnh sửa khi nhóm phát triển muốn nâng cấp hoặc tinh chỉnh bản thân giao thức ngôn ngữ chỉ huy.

---

## 1. Từ Vựng Lệnh Tiêu Chuẩn (Command Vocabulary)

Khi bạn ra lệnh, AI sẽ tự động phân loại ý định của bạn về các mệnh lệnh nền tảng sau:

| Mệnh Lệnh | Ý Nghĩa | AI Có Được Sửa Mã Nguồn `/src/` Không? | Mục Đích Sử Dụng |
| :--- | :--- | :--- | :--- |
| **`ANALYZE`** | Phân tích, khảo sát, tìm lỗi | **TUYỆT ĐỐI KHÔNG** | Yêu cầu AI đọc hiểu, truy vết lỗi hoặc đánh giá giải pháp trước khi làm |
| **`DESIGN`** | Thiết kế kỹ thuật, lập kế hoạch | **TUYỆT ĐỐI KHÔNG** | Soạn thảo Phần 1 (API, Data Flow, Test Plan) trong file task |
| **`IMPLEMENT`** | Viết code tính năng & unit test | **CÓ** (Chỉ trong task scope trên nhánh `task/*`) | Triển khai mã nguồn sau khi thiết kế đã hoàn chỉnh |
| **`TEST`** | Chạy kiểm thử tự động, lint | **KHÔNG** | Chạy `npm run test:run`, `typecheck`, `lint`, `build` mà không sửa code sản phẩm |
| **`REVIEW`** | Rà soát code, kiểm tra diff | **TUYỆT ĐỐI KHÔNG** | Đánh giá chất lượng mã nguồn trước khi tích hợp |
| **`REPORT`** | Lập báo cáo tiến độ, nợ kỹ thuật | **KHÔNG** | Viết báo cáo tổng kết sprint hoặc hiện trạng kiến trúc |
| **`PROPOSE`** | Đề xuất thay đổi kiến trúc/API | **KHÔNG** (Chỉ tạo file proposal) | Soạn thảo đề xuất cải tiến khi phát hiện vấn đề lớn |
| **`DOCUMENT`** | Biên soạn, cập nhật tài liệu | **KHÔNG** | Cập nhật tài liệu kỹ thuật trong `.ai/` hoặc `.human/` |
| **`COMMIT`** | Tạo commit Git chuẩn mực | **KHÔNG** | Lưu vết các thay đổi đã qua kiểm tra |
| **`PUSH`** | Đẩy nhánh lên GitHub | **KHÔNG** | Đồng bộ nhánh task lên kho chứa từ xa |
| **`STOP`** | Dừng khẩn cấp, ngừng làm việc | **TUYỆT ĐỐI KHÔNG** | Buộc AI dừng ngay lập tức tại vị trí hiện tại |

---

## 2. Các Từ Bổ Trợ Giúp Tinh Chỉnh Ý Định (Command Modifiers)

Bạn có thể kết hợp các từ bổ trợ vào câu nhắc để định hướng AI chặt chẽ:

- **`ONLY`**: Chỉ làm duy nhất việc đó, không làm thêm bước nào khác.
  - *Ví dụ*: `"ANALYZE TASK-003 ONLY."`
- **`DO_NOT` / `WITHOUT`**: Ràng buộc cấm thực hiện một hành động cụ thể.
  - *Ví dụ*: `"DESIGN TASK-003, DO NOT IMPLEMENT."`
  - *Ví dụ*: `"TEST TASK-003 WITHOUT MODIFYING SOURCE."`
- **`INSPECT`**: Khảo sát hiện trạng trước khi bắt tay làm.
  - *Ví dụ*: `"INSPECT module Crane trước khi thiết kế."`
- **`PREPARE`**: Chuẩn bị khung kiểm thử hoặc quy cách.
  - *Ví dụ*: `"PREPARE Test Plan cho TASK-002."`
- **`CONTINUE` / `RESUME`**: Tiếp tục công việc từ phiên trước dựa trên Session Log.
  - *Ví dụ*: `"RESUME TASK-001 từ điểm dừng trước."`

---

## 3. Các Mẫu Lời Nhắc (Prompt) Chuẩn Cho Từng Tình Huống

Bạn có thể dùng tiếng Việt hoặc tiếng Anh tự nhiên. AI sẽ tự động phân tích câu của bạn theo chuẩn `CONTROL.md`:

### Tình Huống 1: Giao Task Mới (Pha Thiết Kế)
> *"DESIGN TASK-001. Hoàn thiện Phần 1 (Mục tiêu, API, Data Flow, Test Plan) trong file task. Chưa viết code vào /src/."*

### Tình Huống 2: Cho Phép Triển Khai Sau Khi Đã Duyệt Thiết Kế
> *"IMPLEMENT TASK-001 theo thiết kế đã phê duyệt. Chỉ chỉnh sửa các file trong ALLOWED FILES và viết unit test."*

### Tình Huống 3: Yêu Cầu Chạy Kiểm Thử Độc Lập
> *"TEST TASK-001. Chạy toàn bộ test, lint và typecheck. Không sửa bất kỳ mã nguồn nào."*

### Tình Huống 4: Rà Soát Trước Khi Tích Hợp
> *"REVIEW TASK-001 diff so với nhánh develop. Đánh giá tính tuân thủ kiến trúc và hợp đồng API."*

### Tình Huống 5: Yêu Cầu Đề Xuất Thay Đổi (Không Tự Ý Sửa)
> *"PROPOSE giải pháp thay đổi giao diện Crane Controller. Chỉ viết proposal, KHÔNG ĐƯỢC tự triển khai."*

### Tình Huống 6: Dừng Khẩn Cấp
> *"STOP ngay lập tức. Báo cáo vị trí hiện tại và giữ nguyên kho chứa."*

---

## 4. Tại Sao Prompt Của Bạn Không Thể Phá Vỡ Branch Rules?

Hệ thống được thiết kế theo nguyên tắc an toàn phòng vệ (Defense-in-Depth):
1. **Lời nhắc của bạn thể hiện Ý Định (Intent)**.
2. **`CONTROL.md` diễn giải ý định đó thành Mệnh Lệnh (Command)**.
3. **`BRANCH_RULES.md` quyết định nhánh hiện tại có năng lực thực thi lệnh đó hay không**.

*Ví dụ*: Nếu bạn đang đứng ở nhánh `main` và vô tình prompt:
> *"Hãy triển khai tính năng Thùng hàng cho TASK-001"*

AI sẽ phân tích:
- Lệnh: `IMPLEMENT`
- Nhánh hiện tại: `main`
- Rào chắn Branch Rules: `main` cấm sửa `/src/`!
- Hành động của AI: **DỪNG LẠI (STOP)** và thông báo cho bạn: *"Không thể triển khai code trên nhánh main. Vui lòng chuyển sang nhánh task tương ứng."*

Cơ chế này bảo vệ kho chứa của bạn an toàn 100% trước những nhầm lẫn vô ý.
