# TASK-014: Sổ Tay Lệnh Máy Móc Động Theo Ngữ Cảnh Từng Màn (Context-Aware Machine Manual)

```yaml
TASK_ID: TASK-014
TITLE: Sổ Tay Lệnh Máy Móc Động Theo Ngữ Cảnh Từng Màn
STATUS: READY_FOR_REVIEW
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-014-contextual-machine-manual
CURRENT_SESSION: SESSION-TASK-014
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
- Khắc phục triệt để các hạn chế của sổ tay lệnh (`ApiReference`) hiện tại:
  1. Hiện chỉ có tài liệu của `Crane`, hoàn toàn thiếu tài liệu về `wareHouse`, `WeightScanner`, `SingleCrane`.
  2. Bị gán cứng: Màn nào cũng hiển thị cùng một bảng thông tin, dẫn tới việc màn không có cỗ máy đó vẫn hiện (dư) hoặc màn có máy móc mới lại không thấy lệnh (thiếu).
- Xây dựng từ điển API máy móc chuẩn hóa (`src/core/machines/machine-docs.ts`):
  - **`wareHouse`**:
    - `wareHouse.getCountBox()`: `int` — Trả về tổng số lượng thùng hàng trong kho mảng.
    - `wareHouse.isSorted()`: `boolean` — Kiểm tra mảng hiện tại đã được sắp xếp tăng dần theo khối lượng hay chưa.
  - **`WeightScanner`**:
    - `weightScanner.getWeightBox()`: `int` — Quét và đọc khối lượng thùng hàng tại vị trí cảm biến đang đứng.
    - `weightScanner.move(int step)`: `void` — Di chuyển cảm biến tiến (+) hoặc lùi (-) `step` ô trên thanh ray.
    - `weightScanner.moveStart()`: `void` — Đưa cảm biến quay trở về vị trí đầu tiên (ô 0).
    - `weightScanner.position()`: `int` — Trả về chỉ số vị trí ô hiện tại của cảm biến (bắt đầu từ 0).
  - **`SingleCrane`**:
    - `singleCrane.swap()`: `void` — Hoán đổi vị trí thùng hàng hiện tại với thùng hàng liền kề kế tiếp (+1).
    - `singleCrane.move(int step)`: `void` — Di chuyển cần cẩu tiến (+) hoặc lùi (-) `step` ô trên thanh ray.
    - `singleCrane.moveStart()`: `void` — Đưa cần cẩu quay trở về vị trí đầu tiên (ô 0).
    - `singleCrane.position()`: `int` — Trả về chỉ số vị trí ô hiện tại của cần cẩu (bắt đầu từ 0).
- Lọc động theo cấu hình màn chơi (`levelConfig.machines`):
  - **Tutorial 0.1**: Hiển thị chính xác `wareHouse` & `WeightScanner`.
  - **Tutorial 0.2**: Hiển thị chính xác `wareHouse` & `SingleCrane`.
  - **Tutorial 0.3 & Bubble Sort**: Hiển thị tab chuyển đổi tiện lợi giữa cả 3 máy (`wareHouse`, `WeightScanner`, `SingleCrane`).
  - Tuyệt đối **không hiển thị thừa** cỗ máy mà màn chơi đó không cấp, và **không hiển thị thiếu** bất kỳ hàm nào người chơi được phép gọi.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/machines/machine-docs.ts`:
    - Định nghĩa cấu trúc `MachineMethodDoc`, `MachineDoc`.
    - Dữ liệu API đầy đủ cho `wareHouse`, `WeightScanner`, `SingleCrane` kèm mô tả chi tiết bằng tiếng Việt.
  - `src/components/api-reference.tsx`:
    - Nhận prop `allowedMachines?: MachineType[]` hoặc `levelId?: LevelId`.
    - Lọc danh sách máy móc theo props truyền vào.
    - Thiết kế tab chuyển đổi trực quan giữa các cỗ máy (nếu màn chơi có từ 2 máy trở lên).
    - Thêm nút thu gọn / mở rộng bảng lệnh.
  - `src/pages/PlaygroundPage.tsx`:
    - Truyền danh sách `allowedMachines={levelConfig.machines}` vào component `ApiReference`.
  - `src/styles/index.css`:
    - Phong cách tab neon Cyber-Industrial cho từng máy móc (`tab-scanner`, `tab-crane`, `tab-warehouse`).
  - `src/test/app/contextual-manual.test.ts`:
    - Kiểm tra logic lọc máy móc đúng chuẩn theo từng màn chơi.
- **Nằm ngoài phạm vi**:
  - Máy móc của Sprint 4 (`minMarker`, `lifter`).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/machines/machine-docs.ts`
  - `src/core/machines/index.ts`
  - `src/components/api-reference.tsx`
  - `src/components/index.ts`
  - `src/pages/PlaygroundPage.tsx`
  - `src/styles/index.css`
  - `src/test/app/contextual-manual.test.ts`
  - `.ai/tasks/active/TASK-014.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/core/parser/**`
  - `src/core/vm/**`

---

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] **AC-14.1**: Vào Tutorial 0.1, sổ tay lệnh chỉ hiển thị tài liệu của `wareHouse` và `WeightScanner`, không có `SingleCrane`.
- [x] **AC-14.2**: Vào Tutorial 0.2, sổ tay lệnh chỉ hiển thị tài liệu của `wareHouse` và `SingleCrane`, không có `WeightScanner`.
- [x] **AC-14.3**: Vào Tutorial 0.3 và Bubble Sort, sổ tay lệnh có đầy đủ tab cho cả 3 máy (`wareHouse`, `WeightScanner`, `SingleCrane`).
- [x] **AC-14.4**: Toàn bộ chữ ký hàm, kiểu trả về và mô tả chức năng bằng tiếng Việt chính xác 100% với mã thực tế.
- [x] **AC-14.5**: Unit test kiểm tra lọc máy móc đạt 100% pass.

---

## PHẦN 2: TRIỂN KHAI MÃ NGUỒN (IMPLEMENTATION)

### 1. Nhật Ký Triển Khai (IMPLEMENTATION NOTES)
- `src/core/machines/machine-docs.ts` (mới): `MachineMethodDoc`, `MachineDoc`, từ điển `MACHINE_DOCS` cho `wareHouse`, `WeightScanner`, `SingleCrane` và hàm lọc `getMachineDocs(allowedMachines)` trả về theo thứ tự cố định (wareHouse → WeightScanner → SingleCrane).
- `src/components/api-reference.tsx`: bỏ bảng `crane.*` gán cứng; nhận prop `allowedMachines`, hiển thị tab cho từng máy (khi ≥ 2 máy), mô tả máy và bảng lệnh; giữ nút thu gọn/mở rộng.
- `src/pages/PlaygroundPage.tsx`: truyền `allowedMachines={levelConfig.machines}`.
- `src/styles/index.css`: tab neon `api-tab-wareHouse` (emerald), `api-tab-weightScanner` (cyan), `api-tab-singleCrane` (amber).
- `src/test/app/contextual-manual.test.ts` (mới): 8 test — lọc theo từng màn, đối chiếu hai chiều tài liệu ↔ phương thức runtime, kiểu trả về thực tế, và render component bằng `react-dom/server`.

### 2. Sai Lệch So Với Thiết Kế (DEVIATIONS)
- **Không đưa `wareHouse.isSorted()`**: `WarehouseEnvironment` không có hàm này (và file nằm ngoài ALLOWED FILES). Theo AC-14.4 (chính xác 100% với mã thực tế) nên không ghi vào sổ tay.
- **Kiểu trả về `swap()` / `move()` là `boolean`** (không phải `void` như bản thiết kế) vì mã thực tế trả về `true`.
- **Không ghi `wareHouse.length()`**: đây là alias tương thích ngược, không phải API dành cho người chơi.
- `LevelConfig.apiDocs` trong `level-registry.ts` hiện không còn được dùng (ngoài ALLOWED FILES nên chưa xoá) — đề xuất dọn ở task sau.

### 3. Trạng Thái Đánh Giá Của AI (REVIEW STATUS)
- `npm run typecheck`: PASS (0 lỗi) · `npm run lint`: PASS · `npm run test:run`: PASS 82/82 · `npm run build`: PASS.

### 4. Quyết Định Của Con Người (HUMAN DECISION)
*(Chờ Developer review nhánh `task/TASK-014-contextual-machine-manual`)*
