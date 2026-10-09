# Bản Đồ Hệ Thống & Cấu Trúc Mã Nguồn (System Map) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: SYSTEM_MAP
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

## 1. Cấu Trúc Cây Thư Mục Thực Tế (`src/`)

```
src/
├── app/               # Tầng khởi tạo và cấu hình ứng dụng
│   └── index.ts       # Điểm xuất bản của module app
├── assets/            # Tài nguyên hình ảnh, biểu tượng (hero.png, react.svg, vite.svg)
├── components/        # Các thành phần giao diện React dùng chung (Buttons, HUD, Panels)
│   └── index.ts       # Điểm xuất bản của module components
├── core/              # Tầng Domain / Simulation: lõi giải thuật DSA thuần túy
│   └── index.ts       # Điểm xuất bản của module core
├── game/              # Tầng Game Systems & Phaser scenes: tích hợp khung vẽ và hoạt ảnh
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
- **Trình duyệt (Browser Entry)**: `src/main.tsx` - Khởi tạo React 19 root DOM.
- **Root Component**: `src/App.tsx` - Render giao diện tổng thể và khung chứa game.
- **Test Runner (Vitest)**: `vitest.config.ts` tự động thu thập `src/**/*.test.ts`.

---

## 3. Trách Nhiệm Chi Tiết Theo Thư Mục

| Thư Mục | Trách Nhiệm Kiến Trúc | Thư Viện Được Phép Dùng |
| :--- | :--- | :--- |
| `src/core/` | Chứa toàn bộ mô hình dữ liệu (Box, Slot, Warehouse), thuật toán sắp xếp và bộ sinh bước chạy | **Chỉ TypeScript thuần túy**. TUYỆT ĐỐI CẤM import Phaser hoặc React. |
| `src/game/` | Chứa Phaser Game Instance, Scenes (Preload, WarehouseScene), Sprites và Animations | Phaser 3, TypeScript, và import từ `src/core/`. CẤM import từ React components. |
| `src/components/` | Bảng điều khiển (ControlPanel), thanh trượt tốc độ (SpeedSlider), thanh trạng thái (StatusBar) | React 19, CSS modules / modern CSS. CẤM can thiệp trực tiếp canvas Phaser. |
| `src/app/` | Khởi tạo cấu hình ứng dụng, bridge kết nối React và Phaser | React 19, Phaser 3, TypeScript. |
| `src/pages/` | Trang chủ, trang bài học sắp xếp kho hàng | React 19 components. |
| `src/test/` | Kiểm thử đơn vị, kiểm thử tích hợp không cần canvas | Vitest, TypeScript. |

---

## 4. Bản Đồ Phụ Thuộc Hợp Lệ (Allowed Import Rules)
- `src/core/` $\to$ Độc lập tuyệt đối. Không import từ bất kỳ thư mục anh em nào.
- `src/game/` $\to$ Được phép import từ `src/core/`.
- `src/components/` $\to$ Được phép import types/interfaces từ `src/core/`.
- `src/app/` & `src/pages/` $\to$ Được phép kết nối `src/components/`, `src/game/`, `src/core/`.
