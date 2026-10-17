# TASK-001: Xây Dựng Data Model Kho Hàng & Module Cỗ Máy Crane

```yaml
TASK_ID: TASK-001
TITLE: Xây dựng Data Model kho hàng & Module cỗ máy Crane
STATUS: READY_FOR_REVIEW
PRIORITY: HIGH
CREATED: 2026-10-16
CURRENT_BRANCH: task/TASK-001-core-domain-and-crane
CURRENT_SESSION: SES-20261016-01
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Xây dựng mô hình dữ liệu cốt lõi (Domain Model) cho kho hàng chứa mảng thùng hàng và triển khai module cỗ máy cơ học Cần cẩu (`Crane`). Module này quản lý chuyển dịch trạng thái tất định (deterministic state transitions), cung cấp giao diện điều khiển chuẩn cho ngôn ngữ người chơi và phát ra các sự kiện hành động (`MachineEvent`) phục vụ trực quan hóa trên Phaser 3 và kiểm định bất biến (Invariant Validator).

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/domain/crate.ts`: Kiểu dữ liệu thùng hàng (`Crate`), nhãn giá trị, định danh.
  - `src/core/domain/warehouse-array.ts`: Lớp quản lý trạng thái mảng kho hàng, bảo toàn số lượng phần tử.
  - `src/core/domain/events.ts`: Danh mục sự kiện máy móc (`MachineEvent`, `CraneMoveEvent`, `CraneCompareEvent`, `CraneSwapEvent`).
  - `src/core/machines/crane.ts`: Lớp cỗ máy `Crane` triển khai các phương thức `next()`, `prev()`, `compare()`, `swap()`, `reset()`, `position()`, `length()`, `read()`.
  - `src/core/machines/machine-interface.ts`: Interface chuẩn cho các cỗ máy.
  - Unit tests toàn diện với Vitest cho Domain Model và Crane trong `src/test/core/`.
- **Nằm ngoài phạm vi**:
  - Trình phân tích cú pháp Java AST (thuộc TASK-002).
  - Scene đồ họa Phaser 3 (thuộc TASK-004).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/domain/**`
  - `src/core/machines/**`
  - `src/test/core/**`
  - `.ai/tasks/active/TASK-001.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/**`
- **RESTRICTED FILES**:
  - `.ai/rules/**`
  - `.human/**`
  - `package.json`
  - `src/game/**`
  - `src/components/**`

### 4. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
```typescript
export interface Crate {
  readonly id: string;
  readonly value: number;
  readonly initialIndex: number;
}

export type ComparisonResult = -1 | 0 | 1; // -1: crate[i] < crate[i+1], 0: ==, 1: >

export interface CraneMoveEvent {
  type: 'CRANE_MOVE';
  from: number;
  to: number;
  timestamp: number;
}

export interface CraneCompareEvent {
  type: 'CRANE_COMPARE';
  indexA: number;
  indexB: number;
  valueA: number;
  valueB: number;
  result: ComparisonResult;
  timestamp: number;
}

export interface CraneSwapEvent {
  type: 'CRANE_SWAP';
  indexA: number;
  indexB: number;
  crateA: Crate;
  crateB: Crate;
  timestamp: number;
}

export type MachineEvent = CraneMoveEvent | CraneCompareEvent | CraneSwapEvent;

export interface ICrane {
  next(): boolean;
  prev(): boolean;
  reset(): void;
  position(): number;
  length(): number;
  read(): number;
  compare(): ComparisonResult;
  swap(): boolean;
  getEvents(): readonly MachineEvent[];
  clearEvents(): void;
}
```

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
1. `WarehouseArray`:
   - Khởi tạo từ mảng số nguyên hợp lệ.
   - Truy xuất phần tử theo chỉ số, từ chối chỉ số ngoài giới hạn.
   - Hoán đổi vị trí 2 phần tử, đảm bảo giá trị và id được bảo toàn.
2. `Crane`:
   - Di chuyển `next()` và `prev()`, chặn không cho di chuyển ra ngoài biên mảng $[0, length - 1]$.
   - `compare()` so sánh chuẩn xác giá trị tại `position` và `position + 1`, ném lỗi nếu `position == length - 1`.
   - `swap()` hoán đổi chuẩn xác 2 thùng liền kề, phát sự kiện `CRANE_SWAP`.
   - Kiểm tra nhật ký sự kiện (`events log`) được phát ra chính xác theo trình tự.

### 6. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] Khởi tạo mảng thùng hàng đúng số lượng và bảo toàn dữ liệu.
- [x] Cần cẩu di chuyển đúng biên, báo lỗi khi vượt ranh giới mảng.
- [x] `crane.compare()` trả về đúng kết quả so sánh -1, 0, 1 giữa 2 thùng liền kề.
- [x] `crane.swap()` hoán đổi đúng vị trí 2 thùng liền kề và phát sinh sự kiện đầy đủ.
- [x] 100% unit tests trong `src/test/core/crane.test.ts` đạt kết quả xanh (PASS).
- [x] `npm.cmd run typecheck` đạt 0 lỗi.
- [x] `npm.cmd run lint` đạt 0 lỗi.

---

## PHẦN 2: TIẾN TRÌNH THỰC HIỆN (EXECUTION PROGRESS)
- [x] Thiết kế chi tiết Phần 1 hoàn tất.
- [x] Tạo nhánh `task/TASK-001-core-domain-and-crane`.
- [x] Khởi tạo phiên làm việc `SESSION-TASK-001.md`.
- [x] Triển khai Domain Model (`Crate`, `WarehouseArrayState`, `Events`).
- [x] Triển khai Machine Module (`Crane`).
- [x] Viết Unit Tests & chạy kiểm thử đạt 100%.
- [x] Hoàn tất kiểm tra chất lượng & cập nhật bảng task.
