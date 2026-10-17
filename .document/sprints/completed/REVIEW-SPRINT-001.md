# Biên Bản Review & Nghiệm Thu Sprint: SPRINT-001

```yaml
DOCUMENT_ID: REVIEW-SPRINT-001
DOCUMENT_TYPE: SPRINT_REVIEW
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-17
OWNER: Human & AI
SPRINT: SPRINT-001
DEPENDS_ON: [SPRINT-001]
```

---

## 1. Kết Quả Thực Tế Đạt Được (Actual Deliverables)
- **Tóm tắt kết quả**: Đã hoàn thiện toàn bộ nền tảng cốt lõi (Vertical Slice) của AlgoWarehouse gồm:
  1. Mô hình miền dữ liệu kho hàng `WarehouseArrayState` và module cỗ máy `Crane` (`next`, `prev`, `compare`, `swap`, `position`, `length`).
  2. Java AST Parser & Step-Yielding Virtual Runner hỗ trợ biến, toán tử, vòng lặp (`for`, `while`), câu lệnh điều kiện (`if`/`else`), và giới hạn bước an toàn (Step Budget: 50.000 bước).
  3. Bộ kiểm định bất biến thuật toán Bubble Sort (`BubbleSortValidator`) ngăn chặn gian lận, chỉ cho phép hoán đổi liền kề và kiểm thử trên 5 bộ test ẩn.
  4. Môi trường đồ họa Phaser 3 tái hiện nhà kho công nghiệp sống động (đường ray, cần cẩu cơ học, thùng hàng chuyển động, hiệu ứng glow/sparks khi so sánh/hoán đổi).
  5. Giao diện người dùng React 19 tích hợp Monaco Editor hỗ trợ cú pháp Java, thanh điều khiển bước (Play, Pause, Step Next, Step Prev, Speed, Reset), bảng chỉ số (So sánh, Hoán đổi, Bước máy ảo), modal chiến thắng và modal cảnh báo vi phạm thuật toán.
- **So sánh với mục tiêu ban đầu**: **Đạt 100%** theo kế hoạch `SPRINT-001-core-foundation.md`.

---

## 2. Bảng Xác Minh Tiêu Chí Chấp Nhận (Acceptance Criteria Verification)

| Mã AC | Tiêu chí nghiệm thu | Trạng thái | Bằng chứng kiểm chứng (Test results / Evidence) |
| :--- | :--- | :--- | :--- |
| `AC-1` | Khi người chơi nhập mã Java đúng thuật toán Bubble Sort, cần cẩu di chuyển và hoán đổi các thùng hàng theo đúng quy tắc, mảng cuối cùng được sắp xếp tăng dần và hệ thống thông báo chiến thắng. | **ĐẠT** | Đã kiểm thử thành công trên trình duyệt thực tế & bộ test tự động `src/test/core/bubble-validator.test.ts`. |
| `AC-2` | Nếu người chơi nhập mã chỉ đổi chỗ trực tiếp không theo Bubble Sort, bộ `BubbleSortValidator` từ chối cho qua màn và chỉ rõ lý do vi phạm bất biến. | **ĐẠT** | `src/test/core/bubble-validator.test.ts` (test cases gian lận, nhảy cóc, sai thứ tự). |
| `AC-3` | Vòng lặp vô tận trong mã Java bị ngắt an toàn bởi giới hạn số bước (`Step Budget: 50,000 steps`) mà không làm đơ trình duyệt. | **ĐẠT** | `src/test/core/vm.test.ts` (infinite loop budget rejection test). |
| `AC-4` | 100% unit tests của bộ Parser, Máy ảo VM, Crane và BubbleSortValidator vượt qua thành công với `npm.cmd run test:run`. | **ĐẠT** | Vitest: 37/37 tests pass trên 7 test files. |
| `AC-5` | Toàn bộ dự án vượt qua `npm.cmd run typecheck` và `npm.cmd run lint`. | **ĐẠT** | TypeScript & ESLint pass 0 lỗi. |

---

## 3. Báo Cáo Kiểm Thử & Verification Gates

- **Kiểm tra kiểu dữ liệu / cú pháp**: `npm.cmd run typecheck` $\to$ **PASS** (0 errors).
- **Kiểm tra linter**: `npm.cmd run lint` $\to$ **PASS** (0 errors).
- **Kiểm thử tự động**: `npm.cmd run test:run` $\to$ **PASS** (7/7 test suites, 37/37 tests passed).
- **Kiểm tra đóng gói / build**: `npm.cmd run build` $\to$ **PASS**.

---

## 4. Giới Hạn, Nợ Kỹ Thuật & Vấn Đề Tồn Đọng (Limitations & Technical Debt)
- **Giới hạn hiện tại**:
  - Mới chỉ có Màn 1 (Bubble Sort) và Màn 0 (Tutorial); chưa có Màn 2..7.
  - Bộ máy móc hiện tại chỉ có duy nhất `crane` (Cần cẩu cơ bản). Chưa có `minMarker` (Selection Sort) hay `lifter`/`bufferSlot` (Insertion Sort).
  - Chưa có hệ thống âm thanh (SFX cơ khí, còi hiệu nhà kho).
  - Chưa lưu tiến độ người chơi vào LocalStorage / Cloud.
- **Nợ kỹ thuật ghi nhận**:
  - Quản lý cấu hình màn chơi (Level Config) hiện đang gắn cứng tại `App.tsx` $\to$ Cần tách thành Level Registry / Level System module hóa linh hoạt cho các màn chơi tiếp theo.
- **Bugs chưa giải quyết**: Không có bug nghẽn phát sinh.

---

## 5. Tác Động Đến Lộ Trình Sprint Tiếp Theo (Impact on Next Sprints)
- Sprint 1 đã cung cấp nền tảng kiến trúc vững chắc, cho phép cắm thêm máy móc mới và validator mới mà không làm vỡ các module hiện hữu.
- Sẵn sàng chuyển sang **Sprint 2** theo kế hoạch lộ trình:
  - Màn 2: **Selection Sort** (Cần cẩu `crane` + Cảm biến ghi nhớ `minMarker`).
  - Màn 3: **Insertion Sort** (Tay gắp nâng hạ `lifter` + Khay đệm tạm `bufferSlot`).
  - Nâng cấp Level Selector & Quản lý trạng thái màn chơi.

---

## 6. Xác Nhận Nghiệm Thu Của Human (Human Sign-off)
- **Trạng thái nghiệm thu**: [x] CHẤP THUẬN ĐÓNG SPRINT
- **Ghi chú của Human**: Xác nhận nghiệm thu Sprint 1 sau khi trực tiếp xem và trải nghiệm website. Tiến hành bàn luận document để định hình chi tiết cho Sprint 2.
