# Kế Hoạch Sprint: SPRINT-001 — Khởi Tạo Nền Tảng Lõi & Màn Chơi Bubble Sort

```yaml
DOCUMENT_ID: SPRINT-001
DOCUMENT_TYPE: SPRINT_PLAN
STATUS: COMPLETED
LAST_UPDATED: 2026-10-16
OWNER: Human & AI
SPRINT: SPRINT-001
DEPENDS_ON: [DOC-OVERVIEW, DOC-REQUIREMENTS, DOC-ARCHITECTURE]
```

---

## 1. Mục Tiêu Sprint (Sprint Goal & Value)
- **Mục tiêu cốt lõi**: Xây dựng kiến trúc lõi độc lập gồm Máy ảo thực thi lệnh ảo (Java Step-Yielding VM Runner), mô hình cỗ máy Cần cẩu cơ bản (`crane`), và bộ kiểm định bất biến thuật toán Bubble Sort (Invariant Validator) kèm màn chơi kiểm thử trực quan với Phaser 3.
- **Giá trị mang lại**: Cung cấp nguyên mẫu hoàn chỉnh đầu tiên (End-to-End Vertical Slice): Người chơi có thể viết code Java điều khiển `crane.next()`, `crane.compare()`, `crane.swap()` để giải quyết màn Tutorial và màn Bubble Sort, được kiểm tra chống gian lận tự động và quan sát hoạt ảnh trên giao diện.

---

## 2. Phạm Vi Thực Hiện (Scope)

### Trong phạm vi (In-Scope):
- [x] Xây dựng mô hình miền dữ liệu kho hàng: `WarehouseArrayState` (thùng hàng có id, trọng số, vị trí).
- [x] Xây dựng module cỗ máy `Crane`: các hành động `next()`, `prev()`, `compare()`, `swap()`, `position()`, `length()`.
- [x] Xây dựng bộ thông dịch Java AST an toàn (Java Parser/Interpreter) hỗ trợ biến số, `for`, `while`, `if/else`, và gọi phương thức của `crane`.
- [x] Xây dựng bộ kiểm định bất biến thuật toán Bubble Sort (`BubbleSortValidator`):
  - Chỉ cho phép hoán đổi liền kề.
  - Bắt buộc sau mỗi lượt quét ($k$), phần tử lớn nhất của vùng chưa sắp xếp phải về đúng vị trí $N - k$.
  - Kiểm thử bổ sung trên 5 bộ test ẩn (ngược, xuôi, ngẫu nhiên, trùng lặp, mảng 2 phần tử).
- [x] Tích hợp Phaser 3 hiển thị kho hàng, đường ray, cần cẩu và thùng hàng chuyển động theo sự kiện.
- [x] Đảm bảo 100% logic lõi có bài kiểm thử Vitest tự động và đạt chuẩn typecheck/lint.

### Ngoài phạm vi (Out-of-Scope — Dành cho các Sprint sau):
- 6 thuật toán còn lại (Selection, Insertion, Merge, Quick, Heap, Counting Sort).
- Hệ thống âm thanh âm thanh phức tạp.
- Lưu tiến độ lên cơ sở dữ liệu từ xa (Cloud Database).

---

## 3. Tiêu Chí Chấp Nhận Nghiệm Thu (Acceptance Criteria - AC)

- [x] **AC-1**: Khi người chơi nhập mã Java đúng thuật toán Bubble Sort, cần cẩu di chuyển và hoán đổi các thùng hàng theo đúng quy tắc, mảng cuối cùng được sắp xếp tăng dần và hệ thống thông báo chiến thắng.
- [x] **AC-2**: Nếu người chơi nhập mã chỉ đổi chỗ trực tiếp không theo Bubble Sort (ví dụ nhảy cóc hoặc chỉ sắp xếp sai quy tắc), bộ `BubbleSortValidator` từ chối cho qua màn và chỉ rõ lý do vi phạm bất biến.
- [x] **AC-3**: Vòng lặp vô tận trong mã Java bị ngắt an toàn bởi giới hạn số bước (`Step Budget: 50,000 steps`) mà không làm đơ trình duyệt.
- [x] **AC-4**: 100% unit tests của bộ Parser, Máy ảo VM, Crane và BubbleSortValidator vượt qua thành công với `npm.cmd run test:run`.
- [x] **AC-5**: Toàn bộ dự án vượt qua `npm.cmd run typecheck` và `npm.cmd run lint`.

---

## 4. Phân Rã Công Việc Kỹ Thuật (Sprint Tasks)

| Task ID | Tên công việc | Module bị ảnh hưởng | ALLOWED FILES | Phụ thuộc |
| :--- | :--- | :--- | :--- | :--- |
| `TASK-001` | Xây dựng Data Model kho hàng & Module cỗ máy Crane | `src/core/domain/`, `src/core/machines/` | `src/core/domain/**`, `src/core/machines/**` | — |
| `TASK-002` | Xây dựng Java Parser & Virtual Step Runner | `src/core/parser/`, `src/core/vm/` | `src/core/parser/**`, `src/core/vm/**` | `TASK-001` |
| `TASK-003` | Xây dựng Bubble Sort Invariant Validator & Test Suites | `src/core/validator/` | `src/core/validator/**` | `TASK-002` |
| `TASK-004` | Xây dựng Scene Phaser 3 hiển thị kho hàng & Hoạt ảnh cẩu | `src/game/` | `src/game/**` | `TASK-001` |
| `TASK-005` | Tích hợp giao diện React UI (Code Editor + Phaser Canvas) | `src/components/`, `src/App.tsx` | `src/components/**`, `src/App.tsx` | `TASK-003`, `TASK-004` |

---

## 5. Kế Hoạch Kiểm Thử & Cổng Chất Lượng (Verification Plan)
- Chạy `npm.cmd run typecheck`
- Chạy `npm.cmd run lint`
- Chạy `npm.cmd run test:run`
- Chạy thử nghiệm trên trình duyệt với kịch bản Bubble Sort mẫu và kịch bản gian lận mẫu.
