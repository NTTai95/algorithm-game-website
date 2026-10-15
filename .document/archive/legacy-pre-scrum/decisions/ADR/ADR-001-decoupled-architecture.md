# ADR-001: Kiến Trúc Phân Lớp 4 Tầng Tách Rời Lõi Mô Phỏng Khỏi Phaser 3

```yaml
ADR_ID: ADR-001
TITLE: Kiến trúc phân lớp 4 tầng tách rời Lõi mô phỏng khỏi Phaser 3
STATUS: ACCEPTED
DATE: 2026-10-08
DECIDED_BY: Human Developers
AFFECTED_COMPONENTS: [src/core, src/game, src/components, src/app]
RELATED_ADRS: []
```

## 1. Trạng Thái (Status)
`ACCEPTED`

## 2. Bối Cảnh (Context)
Dự án Algorithm Game Website xây dựng trò chơi giáo dục giải thuật DSA với sự kết hợp giữa React 19 (giao diện điều khiển UI) và Phaser 3 (khung vẽ hoạt ảnh 2D). Trong các dự án game thông thường, logic trò chơi thường bị gắn chặt vào Game Loop của engine (update loop của Phaser) hoặc nhúng trực tiếp vào React state. Điều này dẫn tới hai hệ lụy nghiêm trọng:
1. Không thể kiểm thử tự động thuật toán toán học một cách độc lập không cần canvas context hoặc môi trường đồ họa.
2. Dễ xảy ra xung đột trạng thái (race conditions) hoặc có 2 nguồn sự thật cạnh tranh nhau giữa React và Phaser.

## 3. Vấn Đề Cần Giải Quyết (Problem Statement)
Làm thế nào để thiết kế kiến trúc hệ thống đảm bảo logic thuật toán toán học hoàn toàn chính xác, kiểm thử được 100% trong Node.js, trong khi vẫn cung cấp trải nghiệm đồ họa tương tác mượt mà và giao diện điều khiển hiện đại?

## 4. Các Phương Án Đã Xem Xét (Options Considered)

### Phương Án 1: Nhúng Logic Thuật Toán Trực Tiếp Vào Phaser Scene
- **Ưu điểm**: Viết code nhanh lúc đầu, gọi tween và update vị trí sprite ngay lập tức.
- **Nhược điểm**: Logic bị trói chặt vào Phaser; không thể chạy unit test trong Vitest mà không dựng canvas giả lập; không thể tái sử dụng cho các nền tảng khác.
- **Kết luận**: Bị từ chối.

### Phương Án 2: Quản Lý Toàn Bộ Bằng React State & Hooks
- **Ưu điểm**: Dễ ràng buộc với giao diện UI.
- **Nhược điểm**: React re-render liên tục khi thuật toán chạy từng bước; hiệu năng kém khi xử lý hoạt ảnh chuyển động 60 FPS phức tạp.
- **Kết luận**: Bị từ chối.

### Phương Án 3: Kiến Trúc Phân Lớp 4 Tầng Với Lõi Mô Phỏng Độc Lập Phát Sự Kiện (Được Chọn)
- **Ưu điểm**:
  - Tầng `Domain / Simulation` (src/core/) là TypeScript thuần túy, 0% phụ thuộc thư viện đồ họa.
  - Kiểm thử 100% trong Node.js / Vitest.
  - Tầng Phaser 3 thuần túy là Consumer lắng nghe sự kiện để chạy hoạt ảnh.
  - React 19 chỉ đảm nhiệm UI shell và gửi lệnh Play/Pause/Step qua Bridge.
- **Nhược điểm**: Đòi hỏi thiết kế kỹ lưỡng cấu trúc sự kiện mô phỏng ngay từ đầu.

## 5. Quyết Định Được Chọn (Decision)
Áp dụng mô hình kiến trúc phân lớp 4 tầng phụ thuộc một chiều:
$$\text{Application (React)} \longrightarrow \text{Game Systems (Bridge)} \longrightarrow \text{Domain / Simulation (Core)} \longrightarrow \text{Rendering (Phaser 3)}$$
Lõi thuật toán mô phỏng là nguồn sự thật duy nhất cho trạng thái logic của trò chơi.

## 6. Hệ Quả & Tác Động (Consequences)
- **Tích cực**:
  - Đảm bảo 100% khả năng kiểm thử tự động không đầu (headless testability).
  - Ngăn ngừa hoàn toàn rò rỉ bộ nhớ hoặc xung đột trạng thái giữa React và Phaser.
  - Mở rộng dễ dàng cho các bài toán DSA khác nhau mà không phải thay đổi cơ chế rendering.
- **Đánh đổi**:
  - Cần duy trì các hợp đồng sự kiện (`ISimulationEvent`) rõ ràng giữa Core và Game.

## 7. Phê Duyệt Của Con Người (Human Approval)
- **Phê duyệt**: Đã được thông qua bởi nhóm Human Developers trong mốc thiết lập kiến trúc nền tảng.
