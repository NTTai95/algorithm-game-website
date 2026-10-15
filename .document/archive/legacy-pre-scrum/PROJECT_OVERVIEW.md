# Tổng Quan Dự Án (Project Overview) — Algorithm Game Website

```yaml
PROJECT_NAME: Algorithm Game Website
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
TECH_STACK: React 19, TypeScript, Vite 8, Phaser 3, Vitest, Modern CSS
```

## 1. Mục Đích Tồn Tại (Purpose)
**Website Trò Chơi Thuật Toán (Algorithm Game Website)** là một nền tảng giáo dục tương tác trực tuyến chuyên sâu về Cấu trúc Dữ liệu và Giải thuật (DSA). Sứ mệnh của dự án là phá vỡ rào cản học thuật khô khan bằng cách biến các thuật toán phức tạp thành các trò chơi trực quan, trực tiếp tương tác, giúp người học "thấy và chạm" vào từng bước vận hành của dữ liệu thay vì chỉ đọc mã nguồn trên giấy.

## 2. Người Dùng Mục Tiêu (Target Users)
- **Sinh viên Khoa học Máy tính & Công nghệ Thông tin**: Cần nắm bắt trực giác bản chất thuật toán để học tập và vượt qua các kỳ thi DSA.
- **Lập trình viên chuẩn bị phỏng vấn kỹ thuật**: Cần củng cố tư duy thuật toán, độ phức tạp thời gian/không gian ($O(N)$, $O(N \log N)$) thông qua mô phỏng trực quan.
- **Người tự học lập trình**: Những người học trực quan (visual learners) muốn tiếp cận kiến thức giải thuật dễ hiểu và hấp dẫn.

## 3. Bài Toán Được Giải Quyết (Problem Being Solved)
- **Khó khăn hiện nay**: Việc học DSA qua giáo trình truyền thống rất trừu tượng; các công cụ visualizer hiện có thường đơn điệu, thụ động (chỉ bấm Play xem thanh đổi màu) và thiếu tính tương tác dạng trò chơi (gamification).
- **Giải pháp của dự án**: Sử dụng bối cảnh ẩn dụ sinh động (nhà kho công nghiệp, thùng hàng, cần cẩu cơ học). Người chơi tương tác trực tiếp, dự đoán bước đi tiếp theo của thuật toán, tự tay giải quyết bài toán và quan sát hệ quả logic diễn ra ngay trên khung vẽ.

## 4. Giá Trị Cốt Lõi (Core Value)
1. **Trực giác hóa sâu sắc (Deep Visual Intuition)**: Mỗi thao tác dữ liệu (so sánh, hoán đổi, dịch chuyển) đều có biểu diễn vật lý tương ứng (cần cẩu nhấc thùng, so sánh trọng lượng, đặt vào ô chứa).
2. **Kiến trúc tách rời & Tất định (Deterministic & Decoupled Architecture)**: Lõi mô phỏng chạy hoàn toàn độc lập với công nghệ hiển thị, đảm bảo tính đúng đắn 100% của giải thuật toán học.
3. **Mở rộng đa trò chơi (Multi-Game Extensibility)**: Hệ thống được thiết kế mở để sau trò chơi sắp xếp trong nhà kho (Warehouse Sorting), có thể dễ dàng bổ sung các trò chơi khác (Cây nhị phân, Đồ thị, Tìm đường).

## 5. Trò Chơi Đầu Tiên (First Game Context)
- **Bối cảnh**: Kho hàng công nghiệp (Warehouse).
- **Thực thể dữ liệu**: Thùng hàng (Boxes) với các chỉ số trọng lượng/giá trị.
- **Tác nhân thực thi**: Cần cẩu cơ học (Crane) thực hiện so sánh, nhấc bổng, di chuyển và đặt thùng hàng.
- **Thuật toán minh họa ban đầu**: Thuật toán sắp xếp (Sorting Algorithms - Bubble Sort, Insertion Sort,...).

## 6. Trạng Thái Hiện Tại (Project Status)
- **Giai đoạn**: Hoàn tất Khởi tạo Kiến trúc & Chuẩn hóa Giao thức Vận hành.
- **Mã nguồn hiện có**: Khung dự án React + TypeScript + Vite + Phaser 3 + Vitest đã sẵn sàng; các thư mục phân tầng đã được cấu trúc.
- **Liên kết tài liệu chi tiết**:
  - [Mục tiêu & Ranh giới phạm vi](./GOALS_AND_SCOPE.md)
  - [Yêu cầu hệ thống](./REQUIREMENTS.md)
  - [Kiến trúc phân lớp](./ARCHITECTURE.md)
  - [Bản đồ cấu trúc mã nguồn](./SYSTEM_MAP.md)
  - [Mô hình nghiệp vụ miền](./domain/DOMAIN_MODEL.md)
  - [Hợp đồng giao diện công khai](./interfaces/API_CONTRACTS.md)
  - [Chiến lược kiểm thử](./quality/TEST_STRATEGY.md)
