# Bản Đồ Hệ Thống & Cấu Trúc Mã Nguồn (System Map) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: SYSTEM_MAP
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-15
REPLACES: .ai/skills/project/module-boundaries.md (SKILL-P02) & profile.md (SKILL-P01 architecture parts)
```

Tài liệu này là **nguồn sự thật duy nhất (Single Source of Truth)** về cấu trúc cây thư mục, trách nhiệm module và ranh giới import (module boundaries) của dự án.

---

## 1. Cấu Trúc Cây Thư Mục Thực Tế (`src/`)

```
src/
├── app/               # Tầng khởi tạo và cấu hình ứng dụng, bridge React ↔ Phaser
│   └── index.ts       # Điểm xuất bản của module app
├── assets/            # Tài nguyên hình ảnh, biểu tượng (hero.png, react.svg, vite.svg)
├── components/        # Các thành phần giao diện React dùng chung (Buttons, HUD, Panels)
│   └── index.ts       # Điểm xuất bản của module components
├── core/              # Tầng Domain / Simulation: lõi giải thuật DSA thuần túy
│   └── index.ts       # Điểm xuất bản của module core
├── game/              # Tầng Rendering / Phaser scenes: tích hợp khung vẽ và hoạt ảnh
│   └── index.ts       # Điểm xuất bản của module game
├── pages/             # Các trang hiển thị chính của ứng dụng
│   └── index.ts       # Điểm xuất bản của module pages
├── styles/            # Định kiểu giao diện toàn cục
│   └── index.css      # CSS styles chính của ứng dụng
├── test/              # Bộ kiểm thử cơ sở hạ tầng và test cases
│   └── infrastructure.test.ts # Test xác thực hoạt động của Vitest
├── App.tsx            # Thành phần giao diện cấp cao nhất của React
└── main.tsx           # Điểm vào thực thi ứng dụng trình duyệt
```

---

## 2. Điểm Vào Của Hệ Thống (Entry Points)
- **Trình duyệt (Browser Entry)**: `src/main.tsx` — Khởi tạo React 19 root DOM.
- **Root Component**: `src/App.tsx` — Render giao diện tổng thể và khung chứa game.
- **Test Runner (Vitest)**: `vitest.config.ts` — Tự động thu thập `src/**/*.test.ts`.

---

## 3. Kiến Trúc Phân Lớp 4 Tầng & Nguyên Tắc Phụ Thuộc

Hệ thống tuân thủ cấu trúc phụ thuộc một chiều, nghiêm cấm phụ thuộc vòng (circular dependencies):

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

## 4. Ma Trận Ranh Giới Import (Import Boundary Matrix)

| Module | Được import từ | Cấm import từ |
| :--- | :--- | :--- |
| `src/core/` | (Không import từ module src/ khác) | Phaser, React, DOM, `src/game/`, `src/components/`, `src/app/`, `src/pages/` |
| `src/game/` | `src/core/` | `src/components/`, `src/pages/`, React components |
| `src/components/` | `src/core/` (types & interfaces only) | `src/game/`, Phaser, canvas element trực tiếp |
| `src/app/` | Tất cả (`src/core/`, `src/game/`, `src/components/`) | — (Bridge logic không được rò rỉ vào `components/` hay `game/`) |
| `src/pages/` | `src/components/`, `src/game/` (qua bridge), `src/core/` (types) | — |

---

## 5. Trách Nhiệm Chi Tiết Từng Module

### 5.1. `src/core/` — Domain / Simulation Layer
- **Trách nhiệm**: Mô hình dữ liệu (Box, Slot, Warehouse), thuật toán sắp xếp (Bubble Sort,...), sinh sự kiện tất định (`COMPARE`, `SWAP`, `LIFT`, `DROP`).
- **Được phép**: TypeScript thuần túy, utility TS không phụ thuộc môi trường.
- **Tuyệt đối cấm**:
  - `import Phaser from 'phaser'`
  - `import React from 'react'`
  - DOM APIs (`window`, `document`, canvas, requestAnimationFrame).
  - Import bất kỳ code nào từ `src/game/`, `src/components/`, `src/app/`, `src/pages/`.
- **Kiểm thử**: Chạy 100% trong Node.js (Vitest) không cần browser hay canvas.

### 5.2. `src/game/` — Rendering / Presentation Layer
- **Trách nhiệm**: Phaser 3 Game Instance, Scenes (Boot, Preload, WarehouseScene), Sprites, Animations, lắng nghe events phát ra từ Simulation Layer.
- **Được phép**: Phaser 3, TypeScript, import types & models từ `src/core/`.
- **Tuyệt đối cấm**:
  - Import từ `src/components/` hoặc `src/pages/`.
  - Tự ý thay đổi trạng thái giải thuật — chỉ được đọc và diễn hoạt trực quan sự kiện.
  - Import React components.

### 5.3. `src/components/` — UI Component Layer (React 19)
- **Trách nhiệm**: React UI elements: ControlPanel, SpeedSlider, StatusBar, HUD, lý thuyết giải thuật.
- **Được phép**: React 19, CSS modules / modern CSS, import types/interfaces từ `src/core/`.
- **Tuyệt đối cấm**:
  - Import từ `src/game/`.
  - Thao tác trực tiếp Phaser canvas hoặc sprites.
  - Import Phaser engine.

### 5.4. `src/app/` — Application / Bridge Layer
- **Trách nhiệm**: Khởi tạo cấu hình ứng dụng, đóng vai trò cầu nối (`Bridge`) giữa trạng thái React và khung vẽ Phaser 3.
- **Được phép**: Import từ tất cả module khác; React 19, Phaser 3, TypeScript.
- **Lưu ý**: Đây là nơi DUY NHẤT hai thế giới React và Phaser giao nhau. Logic bridge phải được cô lập tại đây.

### 5.5. `src/pages/` — Page Layer
- **Trách nhiệm**: Các trang hiển thị chính của ứng dụng (trang chủ, trang bài học sắp xếp kho hàng).
- **Được phép**: React 19 components, kết nối qua `src/components/` và `src/game/` (thông qua bridge).

---

## 6. Lệnh Thực Thi & Kiểm Tra Vi Phạm

### 6.1. Lệnh thao tác chính
```bash
npm run dev          # Dev server (Vite HMR)
npm run test         # Vitest watch mode
npm run test:run     # Vitest CI mode (1 lần)
npm run typecheck    # TypeScript strict check (tsc -b)
npm run lint         # ESLint kiểm tra cú pháp và imports
npm run build        # Production build
```

### 6.2. Kiểm tra vi phạm ranh giới
Sau mỗi lần thêm import mới hoặc sửa đổi kiến trúc:
```bash
npm run typecheck   # Phát hiện lỗi type hoặc import sai
npm run lint        # Phát hiện vi phạm quy tắc import
```

### 6.3. Xử lý khi phát hiện vi phạm
1. **Không tự ý thêm exception hoặc bypass ranh giới**.
2. Nếu mã nguồn sai ranh giới: sửa code để tuân thủ ma trận import ở Mục 4.
3. Nếu thực sự cần điều chỉnh kiến trúc: tạo đề xuất [`.ai/templates/changes/PROP_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/changes/PROP_TEMPLATE.md) theo quy trình tại [`.ai/protocol/PROPOSALS.md`](file:///d:/workspace/Algorithm-game-website/.ai/protocol/PROPOSALS.md) và chờ Human phê duyệt.
