# Module Map: core/ (`src/core/`)

```yaml
MODULE: core
PATH: src/core/
STATUS: BOOTSTRAP
LAST_VERIFIED: 2026-10-15 (từ tài liệu kiến trúc — chưa đọc source trực tiếp)
VERIFIED_BY: CATALOG_ANALYSIS
```

> **BOOTSTRAP**: Thông tin này được khởi tạo từ `.document/ARCHITECTURE.md` và `.document/SYSTEM_MAP.md`. AI đang implement task liên quan đến module này phải xác minh với source code thực tế trước khi đưa ra quyết định.

---

## Trách nhiệm chính

Module `src/core/` là **tầng Domain / Simulation** — lõi thuật toán DSA thuần túy. Chịu trách nhiệm lưu trữ trạng thái mô hình dữ liệu (kho hàng, ô chứa, thùng hàng), thực thi các bước thuật toán, và sinh chuỗi sự kiện nguyên tử tất định.

**Ranh giới bất biến**: Hoàn toàn TypeScript thuần túy. Zero phụ thuộc vào Phaser, React, hoặc DOM. Kiểm thử 100% trong Node.js.

---

## Entry Point

- File: `src/core/index.ts`
- Trạng thái: Tồn tại (xác nhận từ SYSTEM_MAP.md), nội dung chưa xác minh chi tiết.

---

## Các thành phần dự kiến (BOOTSTRAP — chưa xác minh)

Dựa trên mục tiêu kiến trúc (Warehouse Sorting game với Bubble Sort):

### Domain Models (dự kiến)
- **Box** — Đối tượng thùng hàng cần sắp xếp.
- **Slot** — Ô chứa trên kho hàng.
- **Warehouse / WarehouseState** — Trạng thái toàn bộ kho hàng tại một bước.

### Algorithm / Step Generation (dự kiến)
- **SortingAlgorithm / BubbleSort** — Thực thi thuật toán, sinh sequence các step.
- **StepGenerator / StepEmitter** — Sinh chuỗi sự kiện nguyên tử (`COMPARE`, `SWAP`, `LIFT`, `DROP`).

### Simulation Events (dự kiến)
- Discriminated union type cho các sự kiện: `COMPARE`, `SWAP`, `LIFT`, `DROP`.

> **Lưu ý**: Tên class/function thực tế có thể khác. AI nhận task liên quan đến `core/` phải đọc `src/core/index.ts` và source thực tế để xác minh, sau đó cập nhật map này với thông tin VERIFIED.

---

## Phụ thuộc module

- **Imports từ**: Không import từ module nào trong `src/`.
- **Được import bởi**: `src/game/`, `src/components/` (types only), `src/app/`, `src/pages/`.

---

## Khu vực test

- **Chính**: `src/test/infrastructure.test.ts` (test infrastructure).
- **Dự kiến**: `src/core/**/*.test.ts` (unit tests theo module).

---

## Khu vực cần kiểm tra khi thay đổi

- Thay đổi domain model → kiểm tra game/ (scene, sprites dùng model đó).
- Thay đổi event types → kiểm tra game/ (scene lắng nghe events).
- Thay đổi algorithm output → kiểm tra toàn bộ unit tests trong core/.
- Thêm algorithm mới → cần cập nhật map này và `.document/ARCHITECTURE.md`.
