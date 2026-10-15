# Mục Tiêu & Ranh Giới Phạm Vi (Goals & Scope) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: GOALS_AND_SCOPE
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

## 1. Mục Tiêu Dự Án (Project Goals)
- **G1 [CONFIRMED]**: Xây dựng nền tảng web trực quan, tương tác cao giúp người học hiểu bản chất các thuật toán sắp xếp thông qua bối cảnh ẩn dụ nhà kho.
- **G2 [CONFIRMED]**: Thiết lập kiến trúc phân tầng độc lập tuyệt đối giữa lõi mô phỏng thuật toán (Simulation/Core) và tầng hiển thị đồ họa (Phaser 3) để đảm bảo 100% khả năng kiểm thử không cần canvas/headless.
- **G3 [CONFIRMED]**: Tích hợp giao diện điều khiển React tinh gọn (Play, Pause, Step forward, Tốc độ, Lựa chọn thuật toán) kết nối mượt mà với khung vẽ Phaser 3.
- **G4 [CONFIRMED]**: Duy trì tính mở rộng đa trò chơi để có thể tích hợp các thuật toán DSA tiếp theo (Đồ thị, Cây, Quy hoạch động) trên cùng một nền tảng.

## 2. Những Điều Không Phải Mục Tiêu (Non-Goals)
- **NG1 [CONFIRMED]**: Không xây dựng hệ thống mạng xã hội, phòng chat hoặc tính năng đấu mạng nhiều người chơi (multiplayer) trong giai đoạn này.
- **NG2 [CONFIRMED]**: Không cài đặt các thư viện UI cồng kềnh (TailwindCSS, Material UI, Redux, Zustand) khi cấu trúc hiện tại với React hooks và Modern CSS đã đáp ứng hoàn hảo và nhẹ nhàng.
- **NG3 [CONFIRMED]**: Không cố gắng hỗ trợ tất cả các thuật toán DSA ngay từ đầu; chỉ tập trung tinh gọn và hoàn thiện trò chơi Sắp xếp Nhà kho (Warehouse Sorting) trước.

## 3. Ranh Giới Phạm Vi Hiện Tại (Scope Boundaries)

### 3.1. Thuộc Phạm Vi (In-Scope)
- **Trò chơi 1 - Warehouse Sorting**:
  - Bối cảnh nhà kho: các vị trí lưu trữ (storage bays/slots), thùng hàng (boxes) có trọng số.
  - Tác nhân cần cẩu (crane) di chuyển thùng hàng dựa trên các bước thuật toán.
  - Hỗ trợ tối thiểu thuật toán Bubble Sort làm thuật toán mở đầu.
  - Bảng điều khiển React cho phép: Bắt đầu, Tạm dừng, Bước tiếp (Step forward), Đổi tốc độ.
  - Lõi phát sinh sự kiện nguyên tử tất định (`COMPARE`, `SWAP`, `LIFT`, `DROP`).
  - Bộ kiểm thử tự động Vitest cho toàn bộ state transitions.

### 3.2. Nằm Ngoài Phạm Vi Hiện Tại (Out-of-Scope)
- Các trò chơi về Cây (Binary Trees), Đồ thị (Graphs, Dijkstra), Tìm đường (A*).
- Hệ thống backend lưu tài khoản người dùng hoặc cơ sở dữ liệu trên cloud.
- Tính năng tua ngược bước chạy (Step backward / Time travel debugging) - [Xem xét giai đoạn sau].
- Cần cẩu đôi (DoubleCrane) chạy song song - [Đang ở mức OPEN_QUESTION].

## 4. Các Ràng Buộc Khách Quan (Constraints)
- **Ràng buộc công nghệ**: Sử dụng React 19, TypeScript strict mode, Vite 8, Phaser 3.90, Vitest.
- **Ràng buộc kiểm thử**: Lõi mô phỏng phải chạy và pass 100% kiểm thử trong môi trường Node.js mà không cần khởi tạo canvas.
- **Ràng buộc hiệu năng**: Hoạt ảnh cần cẩu và thùng hàng trên Phaser 3 phải duy trì 60 FPS ổn định.

## 5. Tiêu Chí Thành Công Của Giai Đoạn 1 (Success Criteria)
- [ ] Lõi thuật toán Bubble Sort sinh đầy đủ chuỗi sự kiện sắp xếp hợp lệ cho bất kỳ mảng đầu vào nào.
- [ ] Tầng Phaser hiển thị mượt mà chuyển động cần cẩu và thùng hàng tương ứng với chuỗi sự kiện.
- [ ] Giao diện React điều khiển được trạng thái mô phỏng (Play/Pause/Step).
- [ ] 100% unit tests của lõi mô phỏng vượt qua với 0 lỗi lint và 0 lỗi typecheck.
