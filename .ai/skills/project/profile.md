# SKILL-P01: Project Profile — Algorithm Game Website

```yaml
SKILL_ID: SKILL-P01
GROUP: project
STATUS: ACTIVE
DEPENDS_ON: []
REPLACES: reference/SKILLS.md (DOC-024) — nội dung được hợp nhất và mở rộng tại đây
```

> **Lưu ý**: File này thay thế và mở rộng `reference/SKILLS.md`. DOC-024 trong CATALOG vẫn trỏ vào `reference/SKILLS.md` nhưng file đó sẽ redirect về đây. Không xóa `reference/SKILLS.md` để tránh phá vỡ reference hiện có.

---

## 1. Thông tin dự án

| Thuộc tính | Giá trị |
|-----------|---------|
| Tên | Algorithm Game Website |
| Mục tiêu | Game tương tác trực quan hóa thuật toán DSA |
| Game đầu tiên | Warehouse Sorting (Sắp xếp kho hàng với cần cẩu) |
| Framework | React 19 + Phaser 3 + TypeScript + Vite |
| Test runner | Vitest |

---

## 2. Cấu trúc thư mục src/

```
src/
├── app/        → Khởi tạo ứng dụng, Bridge React↔Phaser
├── assets/     → Hình ảnh, sprite sheets
├── components/ → React UI components (HUD, controls)
├── core/       → Domain/Simulation: thuật toán thuần TypeScript
├── game/       → Phaser scenes, sprites, animations
├── pages/      → React pages
├── styles/     → CSS global
├── test/       → Test infrastructure
├── App.tsx     → Root component
└── main.tsx    → Browser entry point
```

**Kiến trúc 4 tầng** (phụ thuộc một chiều, không vòng):
```
Application (React) → Game Systems → Domain/Simulation → Rendering (Phaser)
```

---

## 3. Lệnh quan trọng

```bash
npm run dev          # Dev server (Vite HMR)
npm run test         # Vitest watch mode
npm run test:run     # Vitest CI (chạy 1 lần, dùng trước commit)
npm run typecheck    # TypeScript strict check
npm run lint         # ESLint
npm run build        # Production build
```

**Trước mỗi commit**: Chạy `typecheck`, `lint`, `test:run`, `build` — tất cả phải pass.

---

## 4. Quy ước TypeScript

- Strict mode bật toàn bộ.
- Không dùng `any` hoặc loose casting.
- Explicit interfaces cho domain models và simulation events.
- `erasableSyntaxOnly` + `verbatimModuleSyntax` bật.
- File `src/core/` phải là TypeScript thuần túy — không import Phaser, React, hay DOM.

---

## 5. Quy ước React 19

- Functional components với hooks.
- Tách biệt hoàn toàn React UI khỏi Phaser canvas.
- State: `useState`, `useReducer`, `useContext` — không dùng external state library chưa được duyệt.
- Components trong `src/components/` không được can thiệp trực tiếp canvas Phaser.

---

## 6. Quy ước Phaser 3

- Phaser 3 lifecycle: Boot → Preload → Scene management.
- Tách Phaser scenes (render/animation) khỏi core algorithm state.
- Cleanup lifecycle để tránh memory leak khi unmount.
- `src/game/` chỉ import từ `src/core/` — không import React components.

---

## 7. Quy ước Vitest

- Unit test cho tất cả domain models, algorithms, simulation state.
- Test coverage cao trên `src/core/` — deterministic, không cần browser/canvas.
- Watch mode: `npm run test`; CI mode: `npm run test:run`.
- Test file: `src/**/*.test.ts`.

---

## 8. Quy ước Git

- Nhánh task: `task/TASK-XXX-<slug>`.
- Commit message: `TASK-XXX: <mô tả>` (hoặc `PROP-XXX:`, `INIT-XXX:`).
- Không push trực tiếp hoặc merge vào `main` hoặc `develop`.

---

## 9. Ranh giới import (Module Boundaries)

| Module | Được import từ | Cấm import từ |
|--------|---------------|---------------|
| `src/core/` | (Không import gì) | Phaser, React, DOM |
| `src/game/` | `src/core/` | `src/components/`, `src/pages/` |
| `src/components/` | `src/core/` (types only) | `src/game/` |
| `src/app/` | Tất cả | — |
| `src/pages/` | `src/components/`, `src/game/`, `src/core/` | — |

Chi tiết đầy đủ: SKILL-P02 (module-boundaries.md).
