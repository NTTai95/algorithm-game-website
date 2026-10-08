# Giao Thức Nhật Ký Phiên Làm Việc (AI Session Log Protocol)

Thư mục này lưu trữ các biên bản làm việc và bàn giao ngữ cảnh giữa các phiên làm việc của AI trên các máy tính độc lập.

---

## 1. Mục Đích
Do hai lập trình viên con người làm việc với hai AI Agent độc lập chạy trên hai máy tính khác nhau thông qua một Git repository chung, các phiên làm việc cần một cơ chế lưu vết chuẩn mực để bảo toàn ngữ cảnh, tránh phụ thuộc vào bộ nhớ tạm của bất kỳ phiên chat nào.

Mỗi AI khi bắt đầu một phiên làm việc mới có thể đọc nhật ký phiên gần nhất để nắm bắt ngay:
- Nhánh Git đang thao tác.
- Task đang được giải quyết và trạng thái của nó.
- Những file đã thay đổi và kết quả chạy test.
- Những việc chưa hoàn thành và lưu ý bàn giao.

---

## 2. Quy Cách Đặt Tên File Nhật Ký
File nhật ký phiên được tạo theo mẫu:
`SESSION-[YYYYMMDD]-[SESSION_ID]-[TASK_ID].md`

*Ví dụ:*
`SESSION-20261008-SES01-TASK-001.md`

---

## 3. Sử Dụng Mẫu Chuẩn (Session Template)
Khi ghi nhật ký phiên, AI **BẮT BUỘC** phải tuân theo cấu trúc đã được chuẩn hóa tại:
[`.ai/sessions/SESSION_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/sessions/SESSION_TEMPLATE.md)

---

## 4. Nguyên Tắc An Toàn
- **Không ngụy tạo lịch sử**: Không tạo các file session giả mạo khi chưa có phiên làm việc thực tế.
- **Không lưu bí mật**: Tuyệt đối không ghi access token, API key hoặc đường dẫn nhạy cảm vào nhật ký phiên.
