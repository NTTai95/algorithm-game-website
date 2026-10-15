# Module Map: game/ (`src/game/`)

```yaml
MODULE: game
PATH: src/game/
STATUS: BOOTSTRAP
LAST_VERIFIED: 2026-10-15 (từ tài liệu kiến trúc — chưa đọc source trực tiếp)
VERIFIED_BY: CATALOG_ANALYSIS
```

> **BOOTSTRAP**: Thông tin từ `.document/ARCHITECTURE.md`. Xác minh với source trước khi dùng làm căn cứ.

---

## Trách nhiệm chính

Module `src/game/` là **tầng Rendering / Presentation**. Chịu trách nhiệm khởi tạo Phaser scenes, tải assets, render canvas, lắng nghe sự kiện từ Simulation và chạy chuỗi tweens/animations của cần cẩu và thùng hàng.

**Ranh giới bất biến**: Không tự ý biến đổi trạng thái thuật toán. Chỉ phản ánh trực quan những gì Simulation đã phát ra.

---

## Entry Point

- File: `src/game/index.ts`
- Trạng thái: Tồn tại (từ SYSTEM_MAP.md), nội dung chưa xác minh.

---

## Các thành phần dự kiến (BOOTSTRAP — chưa xác minh)

### Phaser Scenes (dự kiến)
- **BootScene** — Boot và preload assets.
- **WarehouseScene** — Scene chính: render kho hàng, cần cẩu, thùng hàng.

### Animation/Sprites (dự kiến)
- Crane sprite và animations (lift, move, drop).
- Box sprite.
- Slot visualization.

> AI nhận task liên quan `game/` phải đọc source để xác minh tên class/file thực tế.

---

## Phụ thuộc module

- **Imports từ**: `src/core/` (domain models, event types, simulation engine).
- **Tuyệt đối cấm import**: `src/components/`, `src/pages/`.
- **Được import bởi**: `src/app/` (bridge).

---

## Khu vực test

- Test Phaser logic khó — tập trung test non-rendering logic nếu có.
- Simulation events được test trong `src/core/`.

---

## Khu vực cần kiểm tra khi thay đổi

- Thay đổi event types trong core/ → phải kiểm tra scene listener trong game/.
- Thay đổi scene lifecycle → kiểm tra bridge trong app/.
- Thêm animation mới → không ảnh hưởng core/ nhưng cần test visual.
