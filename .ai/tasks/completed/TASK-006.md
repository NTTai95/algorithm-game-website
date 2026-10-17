# TASK-006: Tái Cấu Trúc Domain Model (Box Weight) & Module Đa Máy Móc (Warehouse, WeightScanner, SingleCrane)

```yaml
TASK_ID: TASK-006
TITLE: Tái Cấu Trúc Domain Model (Box Weight) & Module Đa Máy Móc
STATUS: DONE
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-006-multi-machine-domain
CURRENT_SESSION: SES-20261017-06
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Chuyển đổi từ mô hình 1 cỗ máy gộp sang kiến trúc cỗ máy phân tách độc lập (Single Responsibility):
1. Cập nhật thực thể thùng hàng `Box` / `Crate`: Thuộc tính cốt lõi cần sắp xếp là **khối lượng (`weight`)**, đi kèm định danh `id` và vị trí ban đầu `initialIndex`.
2. Xây dựng module môi trường kho hàng `WarehouseEnvironment` (`wareHouse`): cung cấp thông tin tổng thể mảng thùng hàng như `getCountBox()`.
3. Xây dựng module cỗ máy cảm biến cân nặng `WeightScanner`: chịu trách nhiệm duy nhất là quét khối lượng tại vị trí đứng (`getWeightBox()`), di chuyển về trước `move(step)` và quay về đầu `moveStart()`.
4. Xây dựng module cỗ máy cần cẩu `SingleCrane`: chịu trách nhiệm duy nhất là hoán đổi vị trí của 2 thùng hàng liền kề (`swap()`), di chuyển về trước `move(step)` và quay về đầu `moveStart()`.
5. Phát ra danh mục sự kiện chuẩn xác (`ScannerEvent`, `CraneEvent`) để Phaser 3 và Invariant Validator tiêu thụ.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/domain/crate.ts`: Mở rộng thuộc tính `weight: number`, `id: string`, `initialIndex: number`.
  - `src/core/domain/warehouse-array.ts`: Hỗ trợ đọc khối lượng theo index, hoán đổi tại index của cần cẩu.
  - `src/core/domain/events.ts`: Danh mục sự kiện đa máy móc:
    - `SCANNER_READ`: `index`, `weight`, `timestamp`.
    - `SCANNER_MOVE`: `from`, `to`, `step`, `timestamp`.
    - `SCANNER_MOVE_START`: `from`, `to: 0`, `timestamp`.
    - `CRANE_SWAP`: `indexA`, `indexB`, `weightA`, `weightB`, `timestamp`.
    - `CRANE_MOVE`: `from`, `to`, `step`, `timestamp`.
    - `CRANE_MOVE_START`: `from`, `to: 0`, `timestamp`.
  - `src/core/machines/warehouse-env.ts`: Class `WarehouseEnvironment` triển khai interface `wareHouse` (`getCountBox()`).
  - `src/core/machines/weight-scanner.ts`: Class `WeightScanner` triển khai `getWeightBox()`, `move(step)`, `moveStart()`, `position()`.
  - `src/core/machines/single-crane.ts`: Class `SingleCrane` triển khai `swap()`, `move(step)`, `moveStart()`, `position()`.
  - `src/core/machines/index.ts`: Export toàn bộ các cỗ máy.
  - Unit tests cho cả 3 module trong `src/test/core/`.
- **Nằm ngoài phạm vi**:
  - Nâng cấp Parser Java (thuộc TASK-007).
  - Hoạt ảnh Phaser 3 (thuộc TASK-008).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/domain/**`
  - `src/core/machines/**`
  - `src/test/core/warehouse-array.test.ts`
  - `src/test/core/multi-machine.test.ts`
  - `.ai/tasks/active/TASK-006.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/game/**`
  - `src/components/**`
  - `src/core/parser/**`
  - `package.json`

---

### 4. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)

```typescript
export interface Crate {
  readonly id: string;
  readonly weight: number;
  readonly initialIndex: number;
}

export interface IWarehouseEnvironment {
  getCountBox(): number;
}

export interface IWeightScanner {
  getWeightBox(): number;
  move(step?: number): boolean;
  moveStart(): void;
  position(): number;
  getEvents(): readonly MachineEvent[];
  clearEvents(): void;
}

export interface ISingleCrane {
  swap(): boolean;
  move(step?: number): boolean;
  moveStart(): void;
  position(): number;
  getEvents(): readonly MachineEvent[];
  clearEvents(): void;
}
```

---

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
- `WarehouseEnvironment`: Kiểm tra `getCountBox()` trả về đúng độ dài mảng ban đầu.
- `WeightScanner`:
  - Đọc `getWeightBox()` trả về đúng `weight` của box tại vị trí hiện tại.
  - `move(1)` dịch chuyển con trỏ sang phải 1 đơn vị; chặn di chuyển vượt quá biên độ kho.
  - `moveStart()` đưa con trỏ scanner về vị trí 0 lập tức.
- `SingleCrane`:
  - `swap()` hoán đổi 2 box tại vị trí `pos` và `pos + 1`. Không thể swap nếu `pos >= count - 1`.
  - `move(1)` dịch chuyển cần cẩu; `moveStart()` đưa cần cẩu về vị trí 0.
- Lệnh kiểm tra: `npm.cmd run test:run` && `npm.cmd run typecheck`.
