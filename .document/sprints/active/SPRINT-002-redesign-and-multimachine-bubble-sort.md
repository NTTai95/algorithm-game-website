# Kế Hoạch Sprint: SPRINT-002 — Tái Cấu Trúc UI, Kiến Trúc Đa Máy Móc & Chuẩn Hóa Bubble Sort OOP

```yaml
DOCUMENT_ID: SPRINT-002
DOCUMENT_TYPE: SPRINT_PLAN
STATUS: ACTIVE
LAST_UPDATED: 2026-10-17
OWNER: Human & AI
SPRINT: SPRINT-002
DEPENDS_ON: [DOC-OVERVIEW, DOC-REQUIREMENTS, DOC-ARCHITECTURE, SPRINT-001]
```

---

## 1. Mục Tiêu Sprint (Sprint Goal & Value)
- **Mục tiêu cốt lõi**: Tái thiết kế toàn diện giao diện với Trang Home và Header điều hướng các endpoint; nâng cấp kiến trúc máy móc theo nguyên tắc Single Responsibility (`wareHouse`, `WeightScanner`, `SingleCrane`); nâng cấp bộ phân tích Java Parser và Máy ảo hỗ trợ phương thức hướng đối tượng `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`, `boolean`, `break`; chia nhỏ Màn 0 thành chuỗi Tutorials theo từng máy; tích hợp chức năng Format Code và Chẩn đoán lỗi ngữ cảnh chi tiết.
- **Giá trị mang lại**: Chuyển đổi trải nghiệm từ mức prototype sang nền tảng web game giáo dục chuẩn mực: người học viết mã Java OOP chuyên nghiệp, quan sát 2 cỗ máy hoạt động nhịp nhàng trên Phaser 3, nắm rõ từng thao tác qua chuỗi bài học Màn 0 và nhận thông báo lỗi chi tiết, dễ hiểu.

---

## 2. Phạm Vi Thực Hiện (Scope)

### Trong phạm vi (In-Scope):
- [ ] **Giao diện & Điều hướng (App Shell & Routing)**:
  - Header điều hướng cố định (Logo, Home, Tutorials, Algorithms, Settings).
  - Trang Home giới thiệu tổng quan dự án, catalog cỗ máy và điều hướng tới các màn chơi.
  - Hệ thống định tuyến endpoint rõ ràng (`/`, `/tutorial/:stageId`, `/level/:algorithmId`).
- [ ] **Kiến trúc Đa máy móc (Multi-Machine Core)**:
  - Phân tách độc lập các cỗ máy:
    - `wareHouse`: `getCountBox()`.
    - `WeightScanner`: `getWeightBox()`, `move(step)`, `moveStart()`.
    - `SingleCrane`: `swap()`, `move(step)`, `moveStart()`.
  - Cập nhật thùng hàng với thuộc tính trọng số `weight` và sắp xếp theo `weight`.
- [ ] **Nâng cấp Java AST Parser & Virtual VM**:
  - Hỗ trợ khai báo method signature `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`.
  - Hỗ trợ tiêm tham số đối tượng máy móc (Dependency Injection) vào scope hàm `solve`.
  - Bổ sung cú pháp Java: `boolean`, phủ định `!var`, câu lệnh `break` thoát vòng lặp.
- [ ] **Code Editor Enhancements**:
  - Tích hợp tính năng **Format Code** tự động căn chỉnh thụt lề chuẩn.
  - Highlight cú pháp Java hoàn chỉnh.
- [ ] **Chẩn đoán lỗi thông minh (Diagnostic Feedback Engine)**:
  - Thông báo chi tiết lỗi cú pháp, lỗi máy móc ngoài biên độ, và vi phạm bất biến thuật toán.
  - Chỉ rõ dòng code vi phạm, giá trị thực tế vs giá trị kỳ vọng, kèm gợi ý sửa lỗi.
- [ ] **Chuỗi Màn 0 Tutorials theo từng cỗ máy**:
  - Stage 0.1: Làm quen `wareHouse` & `WeightScanner`.
  - Stage 0.2: Làm quen `SingleCrane`.
  - Stage 0.3: Phối hợp cả 2 máy trên mảng nhỏ.
- [ ] **Phaser 3 Multi-Machine Simulation**:
  - Render đồng thời cả `WeightScanner` (tia beam quét led) và `SingleCrane` (cơ cấu gắp tráo) trên thanh ray.
  - Cập nhật hoạt ảnh và hiển thị nhãn cân nặng sinh động.
- [ ] **Màn 1 Bubble Sort hoàn chỉnh**:
  - Hỗ trợ code mẫu chuẩn như thiết kế của Human.
  - Đảm bảo 100% tests Vitest, typecheck và lint đạt chuẩn.

### Ngoài phạm vi (Out-of-Scope — Chuyển sang Sprint 3 & 4):
- Selection Sort và Insertion Sort (Màn 2 & Màn 3 sẽ làm ở Sprint 3 trên nền tảng máy móc mới này).
- Hệ thống âm thanh âm học phức tạp (Audio SFX).
- Lưu dữ liệu lên Cloud Database (chỉ lưu LocalStorage).

---

## 3. Tiêu Chí Chấp Nhận Nghiệm Thu (Acceptance Criteria - AC)

- [ ] **AC-1 (Routing & Home Page)**: Người dùng có thể truy cập Trang Home, xem danh mục các màn chơi, nhấp chuyển màn thông qua Header hoặc thẻ màn chơi đến đúng URL endpoint tương ứng.
- [ ] **AC-2 (Method Signature Execution)**: Mã Java chuẩn bọc trong `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)` được Parser dịch chuẩn xác, VM thực thi từng lệnh ngắt bước qua các đối tượng được truyền vào.
- [ ] **AC-3 (Multi-Machine Behavior)**: `WeightScanner` có thể quét cân nặng (`getWeightBox()`) và di chuyển (`move`, `moveStart`); `SingleCrane` có thể đổi chỗ 2 thùng (`swap()`) và di chuyển độc lập. Phaser 3 hiển thị trực quan cả 2 cỗ máy.
- [ ] **AC-4 (Syntax & Statements)**: Parser & VM hỗ trợ đầy đủ `boolean swapped = false;`, `if (!swapped) break;`, toán tử `!`, `break` ngắt vòng lặp an toàn.
- [ ] **AC-5 (Format Code)**: Nhấp nút "Format Code" trong Editor sẽ tự động format và căn lề thụt dòng đoạn mã Java chuẩn đẹp.
- [ ] **AC-6 (Diagnostic Feedback)**: Khi code vi phạm (sai bất biến hoặc lỗi logic), hệ thống hiển thị bảng chẩn đoán chỉ rõ số dòng lỗi, nguyên nhân chi tiết và gợi ý khắc phục.
- [ ] **AC-7 (Modular Tutorials)**: Người chơi có thể hoàn thành lần lượt Stage 0.1, Stage 0.2 và Stage 0.3 với hướng dẫn riêng cho từng cỗ máy.
- [ ] **AC-8 (Bubble Sort Verification)**: Code mẫu chuẩn do Human cung cấp giải quyết thành công Màn 1 Bubble Sort, mảng được sắp xếp tăng dần theo `boxWeight`, vượt qua bộ test ẩn và đạt chiến thắng.
- [ ] **AC-9 (Quality Gates)**: Đạt 100% test suites tự động của Vitest, 0 lỗi TypeScript `typecheck` và 0 cảnh báo ESLint `lint`.

---

## 4. Phân Rã Công Việc Kỹ Thuật (Sprint Tasks)

| Task ID | Tên công việc / Trách nhiệm | Module bị ảnh hưởng | ALLOWED FILES | Phụ thuộc |
| :--- | :--- | :--- | :--- | :--- |
| `TASK-006` | Tái cấu trúc Domain Model (Box Weight) & Module Đa Máy Móc (`wareHouse`, `WeightScanner`, `SingleCrane`) | `src/core/domain/`, `src/core/machines/` | `src/core/domain/**`, `src/core/machines/**` | — |
| `TASK-007` | Nâng cấp Java AST Parser & Virtual VM Runner (hỗ trợ method `solve`, DI scope, `boolean`, `break`, format helper) | `src/core/parser/`, `src/core/vm/` | `src/core/parser/**`, `src/core/vm/**` | `TASK-006` |
| `TASK-008` | Cập nhật Phaser 3 Simulation Scene hiển thị đồng thời `WeightScanner` và `SingleCrane` | `src/game/` | `src/game/**` | `TASK-006` |
| `TASK-009` | Nâng cấp `BubbleSortValidator` theo `boxWeight` & Xây dựng Diagnostic Feedback Engine | `src/core/validator/` | `src/core/validator/**` | `TASK-007` |
| `TASK-010` | Xây dựng App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials (0.1, 0.2, 0.3) & Tích hợp Editor Format Code | `src/components/`, `src/pages/`, `src/App.tsx` | `src/components/**`, `src/pages/**`, `src/App.tsx` | `TASK-008`, `TASK-009` |

---

## 5. Rủi Ro & Kế Hoạch Kiểm Soát (Risks & Dependencies)

| Rủi ro tiềm ẩn | Mức độ | Biện pháp giảm thiểu / Kế hoạch dự phòng |
| :--- | :--- | :--- |
| Cú pháp Java Parser phức tạp khi xử lý khai báo hàm và kiểu biến `boolean` | Trung bình | Tận dụng recursive-descent parser hiện có, viết bộ test Vitest cô lập cho từng case syntax mới trước khi tích hợp vào VM. |
| Hiển thị cùng lúc 2 cỗ máy trên Phaser Canvas có thể bị che khuất nhau khi cùng đứng một vị trí | Thấp | Bố trí độ cao khác nhau trên thanh ray: `WeightScanner` chạy sát nóc thùng hàng với beam chiếu xuống, `SingleCrane` ở thanh ray cao hơn có móc gắp thả xuống. |
| Điều hướng SPA trên Vercel gặp lỗi 404 khi tải lại trang con | Thấp | Sử dụng HashRouter hoặc cấu hình rewrite chuẩn trong `vercel.json`. |

---

## 6. Kế Hoạch Kiểm Thử & Nghiệm Thu (Verification Plan)
- **Kiểm thử tự động**:
  - Bộ unit test cho các cỗ máy mới `WarehouseEnvironment`, `WeightScanner`, `SingleCrane`.
  - Bộ unit test cho Java Parser: method declaration `solve(...)`, `boolean`, `break`, format helper.
  - Bộ unit test cho `BubbleSortValidator` với kịch bản mã mẫu chuẩn của Human và các kịch bản gian lận.
  - Lệnh kiểm tra: `npm.cmd run test:run`.
- **Cổng chất lượng**:
  - `npm.cmd run typecheck` (0 errors).
  - `npm.cmd run lint` (0 errors).
  - `npm.cmd run build` (Build thành công bundle phân phối).
- **Kịch bản kiểm tra thủ công**:
  - Truy cập Trang Home $\to$ Chuyển qua lại giữa các màn chơi bằng Header.
  - Thử các màn Tutorial 0.1, 0.2, 0.3.
  - Chạy mã mẫu chuẩn của Bubble Sort: Kiểm tra hoạt ảnh beam quét của `WeightScanner` và hoạt ảnh tráo hộp của `SingleCrane`.
  - Thử nghiệm tính năng "Format Code" và kiểm tra hiển thị chẩn đoán lỗi khi cố tình viết sai.

---

## 7. Các Quyết Định Cần Human Phê Duyệt (Decisions for Approval)
- [x] **Quyết định 1**: Tách Màn 0 thành 3 màn nhỏ (0.1: Scanner, 0.2: Crane, 0.3: Phối hợp). — *Đã được Human duyệt*.
- [x] **Quyết định 2**: Phương thức giải thuật có signature `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`. — *Đã được Human duyệt qua ảnh code mẫu*.
- [x] **Quyết định 3**: Sắp xếp theo `boxWeight` của từng thùng hàng thay vì index ban đầu. — *Đã được Human duyệt*.
