# Hướng Dẫn Tương Tác & Chỉ Đạo AI (AI Operating Guide)

Tài liệu này giải thích cơ chế tư duy, giới hạn hành vi và cách thức giao tiếp hiệu quả nhất với các AI Coding Agent trong dự án.

---

## 1. Bản Chất Của AI Trong Hệ Thống Này

- **AI là Thực Thi Viên Có Kỷ Luật, Không Phải Đấng Tự Trị**: AI trong dự án này được lập trình để tuân thủ quy tắc nghiêm ngặt, tự kiểm tra ranh giới quyền hạn trước khi gõ code.
- **Tính Hoán Đổi (Interchangeability)**: Bạn có thể dùng Claude trên Máy 1, dùng Gemini trên Máy 2, hoặc chuyển đổi giữa các phiên chat khác nhau mà không sợ mất bối cảnh, vì mọi trạng thái đều được neo vào:
  - Nhánh Git
  - File task `.ai/tasks/active/TASK-XXX.md`
  - File nhật ký phiên `.ai/sessions/SESSION-XXX.md`

---

## 2. Mô Hình Đồng Thời (AI Concurrency Model)

Để tránh tình huống 2 AI dẫm chân lên nhau hoặc làm hỏng dữ liệu chung:

### Được Phép Chạy Song Song:
- Developer 1 bật AI trên nhánh `task/TASK-001-...` để làm tính năng Kho bãi.
- Developer 2 bật AI trên nhánh `task/TASK-002-...` để làm tính năng Cần cẩu.
*(Hai AI này chạy hoàn toàn độc lập, không xung đột file).*

### BẮT BUỘC Phải Chạy Tuần Tự (Chỉ 1 AI tại một thời điểm):
- **Trên nhánh `main`**: Chỉ một developer cho phép AI làm việc trên `main` để điều chỉnh kiến trúc hoặc tài liệu.
- **Trên nhánh `develop`**: Chỉ một developer cho phép AI chạy đánh giá tích hợp sprint.

---

## 3. Cách Prompt Cho AI Hiệu Quả Nhất

Khi bắt đầu một lượt tương tác với AI:
1. **Nhắc AI kiểm tra ranh giới**:
   > *"Hãy đọc `.ai/CONTROL.md`, kiểm tra nhánh Git hiện tại và file task được giao trước khi hành động."*
2. **Yêu cầu làm đúng vai trò của nhánh**:
   - Nếu đang ở `main`: *"Hãy rà soát tài liệu kiến trúc, không chạm vào /src/."*
   - Nếu đang ở `develop`: *"Hãy chạy test hồi quy và viết báo cáo đánh giá sprint, không sửa code."*
   - Nếu đang ở nhánh task: *"Hãy thực hiện thiết kế Phần 1 trong task trước khi bắt đầu code."*
3. **Khi AI phát hiện vấn đề**:
   > *"Nếu phát hiện xung đột hoặc sai lệch tài liệu, hãy tuân thủ chu trình DETECT -> DOCUMENT -> STOP và tạo Change Proposal hoặc Drift Report."*
