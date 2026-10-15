# SKILL-P02: Module Boundaries — Algorithm Game Website

```yaml
SKILL_ID: SKILL-P02
GROUP: project
STATUS: ACTIVE
DEPENDS_ON: [SKILL-P01]
```

---

## Mục đích

Cung cấp quy tắc ranh giới module chi tiết để AI không vi phạm kiến trúc phân lớp khi implement hoặc review code.

---

## Kiến trúc 4 tầng (Tóm tắt)

```
┌─────────────────────────────────────┐
│  Application Layer (React 19 UI)    │  src/app/, src/pages/
└───────────────────┬─────────────────┘
                    ↓ Điều khiển & cấu hình
┌─────────────────────────────────────┐
│  Game Systems (Bridge, Session)     │  src/app/ (bridge)
└───────────────────┬─────────────────┘
                    ↓ Kích hoạt & truyền dữ liệu
┌─────────────────────────────────────┐
│  Domain / Simulation (DSA Core)     │  src/core/
└───────────────────┬─────────────────┘
                    ↓ Phát sự kiện nguyên tử
┌─────────────────────────────────────┐
│  Rendering (Phaser 3 Canvas)        │  src/game/
└─────────────────────────────────────┘
```

**Quy tắc bất biến**: Phụ thuộc chỉ được đi từ trên xuống. Tầng dưới KHÔNG import tầng trên.

---

## Chi tiết ranh giới từng module

### `src/core/` — Domain/Simulation Layer

**Trách nhiệm**: Mô hình dữ liệu, thuật toán sắp xếp, sinh sự kiện tất định.

**Được phép**:
- TypeScript thuần túy.
- Import từ thư viện TypeScript utility (nếu không có DOM/browser API).

**Tuyệt đối cấm**:
- Import Phaser (`import Phaser from 'phaser'`).
- Import React (`import React from 'react'`).
- Import DOM API (`document`, `window`, `canvas`).
- Import từ `src/game/`, `src/components/`, `src/app/`, `src/pages/`.

**Kiểm tra**: Unit test toàn bộ trong Node.js, không cần canvas.

---

### `src/game/` — Rendering/Presentation Layer

**Trách nhiệm**: Phaser scenes, sprites, animations, lắng nghe simulation events.

**Được phép**:
- Import Phaser 3.
- Import TypeScript từ `src/core/` (types, interfaces, simulation engine).

**Tuyệt đối cấm**:
- Import từ `src/components/` hoặc `src/pages/`.
- Tự ý biến đổi trạng thái algorithm — chỉ được đọc và render.
- Import React components.

---

### `src/components/` — UI Component Layer

**Trách nhiệm**: React UI elements: ControlPanel, SpeedSlider, StatusBar, HUD.

**Được phép**:
- Import React 19.
- Import types/interfaces từ `src/core/` (chỉ types, không logic).
- CSS modules / modern CSS.

**Tuyệt đối cấm**:
- Import từ `src/game/`.
- Can thiệp trực tiếp Phaser canvas hoặc sprites.
- Import Phaser.

---

### `src/app/` — Application/Bridge Layer

**Trách nhiệm**: Khởi tạo app, bridge kết nối React ↔ Phaser.

**Được phép**:
- Import từ tất cả module khác.
- Phaser 3, React 19, TypeScript.

**Lưu ý**: Đây là nơi DUY NHẤT hai thế giới React và Phaser giao nhau. Bridge logic không được rò rỉ vào `src/components/` hay `src/game/`.

---

### `src/pages/` — Page Layer

**Trách nhiệm**: Trang hiển thị chính của ứng dụng.

**Được phép**:
- Import từ `src/components/`, `src/game/` (qua bridge), `src/core/` (types).
- React 19.

---

## Kiểm tra vi phạm nhanh

Chạy sau mỗi lần thêm import mới:
```bash
npm run typecheck   # Phát hiện type error qua import sai
npm run lint        # ESLint rules cho import order
```

Nếu phát hiện vi phạm ranh giới:
1. Không tự sửa bằng cách thêm exception.
2. Tạo PROP-XXX.md nếu cần thay đổi kiến trúc.
3. Hoặc sửa code để đúng ranh giới đã xác định.
