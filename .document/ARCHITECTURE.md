# Kiến Trúc Hệ Thống (System Architecture) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: ARCHITECTURE
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

## 1. Mục Tiêu Kiến Trúc Cốt Lõi (Architectural Goals)
1. **Phân Tách Rạch Ròi Giữa Mô Phỏng & Trình Diễn (Decoupled Simulation from Presentation)**:
   - Động cơ mô phỏng giải thuật (DSA Core, Sorting Engine, Step Generators, Box/Slot state) **BẮT BUỘC** tồn tại và thực thi hoàn toàn độc lập với Phaser 3 hoặc bất kỳ thư viện hiển thị đồ họa nào.
   - Các biến đổi trạng thái trong mô phỏng phát ra các sự kiện tất định (ví dụ: `COMPARE`, `SWAP`, `LIFT`, `DROP`).
   - Tầng hiển thị đồ họa (Phaser 3) thuần túy lắng nghe các sự kiện này và chuyển hóa chúng thành hoạt ảnh (cần cẩu di chuyển, nhấc thùng, hoán đổi).
2. **Tách Rời Giao Diện Người Dùng Khỏi Game Loop (Decoupled UI from Game Loop)**:
   - React đảm nhiệm giao diện điều khiển của người dùng (Play, Pause, Step forward, Lựa chọn thuật toán, Điều chỉnh tốc độ, Bảng giải thích lý thuyết).
   - React không nhúng vòng lặp game nội bộ (internal game loop) và không trực tiếp thao tác các sprite đồ họa bên trong component.
3. **Mở Rộng Cho Nhiều Loại Trò Chơi (Multi-Game Extensibility)**:
   - Mặc dù trò chơi đầu tiên là Trò chơi Sắp xếp Nhà kho (Warehouse Sorting: thùng hàng, ô chứa, cần cẩu), kiến trúc lõi được thiết kế để đón nhận các trò chơi thuật toán tiếp theo (Duyệt đồ thị, Cân bằng cây, Tìm đường) mà không phải đập bỏ thiết kế nền tảng.
4. **Tất Định & Khả Năng Kiểm Thử 100% Không Đầu (Deterministic & Testable)**:
   - Mã nguồn mô phỏng miền giải thuật phải kiểm thử được 100% thông qua các bài unit test trong Vitest mà không cần trình duyệt không đầu (headless browser) hay canvas context.

---

## 2. Kiến Trúc Phân Lớp 4 Tầng (4-Layer Unidirectional Architecture)

Hệ thống tuân thủ cấu trúc phụ thuộc một chiều, nghiêm cấm phụ thuộc vòng (circular dependencies):

```
┌────────────────────────────────────────────────────────┐
│      Application (React 19 UI, Routing, HUD, Menus)    │
└───────────────────────────┬────────────────────────────┘
                            │ Điều khiển & cấu hình
                            ▼
┌────────────────────────────────────────────────────────┐
│  Game Systems (Session, Level Manager, Audio, Bridge)  │
└───────────────────────────┬────────────────────────────┘
                            │ Kích hoạt & truyền dữ liệu
                            ▼
┌────────────────────────────────────────────────────────┐
│ Domain / Simulation (DSA Core, Step Emitters, States)  │
└───────────────────────────┬────────────────────────────┘
                            │ Phát sự kiện nguyên tử
                            ▼
┌────────────────────────────────────────────────────────┐
│ Rendering / Presentation (Phaser 3 Canvas, Sprites)    │
└────────────────────────────────────────────────────────┘
```

### Chi Tiết Từng Tầng:

### 2.1. Tầng Application (UI Shell - React 19)
- **Trách nhiệm**: Quản lý layout ứng dụng, thanh điều khiển, lựa chọn bài học, hiển thị thông số thống kê, bảng giải thích thuật toán từng bước cho người học.
- **Ranh giới**: Không can thiệp vào logic tính toán bước đi của thuật toán; không trực tiếp điều khiển tọa độ sprite của Phaser.

### 2.2. Tầng Game Systems (Điều Phối & Cầu Nối)
- **Trách nhiệm**: Quản lý phiên chơi (Session), màn chơi (Level), âm thanh, và đóng vai trò cầu nối (`Bridge`) giữa trạng thái React và khung vẽ Phaser 3.
- **Ranh giới**: Không chứa thuật toán DSA thuần túy; là tầng trung gian điều phối vòng đời game.

### 2.3. Tầng Domain / Simulation (Lõi Mô Phỏng Thuật Toán)
- **Trách nhiệm**: Lưu trữ trạng thái mô hình dữ liệu (kho hàng, các ô chứa, các thùng hàng), thực thi các bước thuật toán (Bubble Sort, etc.), sinh ra chuỗi sự kiện nguyên tử tất định.
- **Ranh giới**: Hoàn toàn là TypeScript thuần túy, 0% phụ thuộc vào Phaser, React hay DOM. Kiểm thử 100% trong Node.js.

### 2.4. Tầng Rendering / Presentation (Trình Diễn Đồ Họa - Phaser 3)
- **Trách nhiệm**: Khởi tạo Scene, tải assets hình ảnh, render canvas, lắng nghe sự kiện từ Simulation và chạy chuỗi tweens/animations của cần cẩu và thùng hàng.
- **Ranh giới**: Không tự ý biến đổi trạng thái thuật toán; chỉ phản ánh trực quan những gì Simulation đã phát ra.

---

## 3. Nguyên Tắc Nguồn Sự Thật Duy Nhất (Single Source of Truth)
- Tuyệt đối không duy trì 2 nguồn trạng thái cạnh tranh nhau cho cùng một trạng thái game.
- **Nguồn sự thật của thuật toán**: Nằm tại `Domain / Simulation Layer`.
- Tầng Rendering và UI chỉ là người quan sát (Observers) và trình chiếu trạng thái dựa trên các sự kiện phát ra từ Simulation Layer.

---

## 4. Quyết Định Kiến Trúc Đã Phê Duyệt
- [ADR-001: Kiến Trúc Phân Lớp Tách Rời Lõi Mô Phỏng Khỏi Phaser 3](./decisions/ADR/ADR-001-decoupled-architecture.md) - `CONFIRMED`.
