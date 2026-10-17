# Kế Hoạch Sprint: SPRINT-003 — Hoàn Thiện Trải Nghiệm Lập Trình & Giao Diện Công Thái Học (UX/UI Polish & IDE Enhancements)

```yaml
DOCUMENT_ID: SPRINT-003
DOCUMENT_TYPE: SPRINT_PLAN
STATUS: ACTIVE
LAST_UPDATED: 2026-10-17
OWNER: Human & AI
SPRINT: SPRINT-003
DEPENDS_ON: [DOC-OVERVIEW, DOC-REQUIREMENTS, DOC-ARCHITECTURE, SPRINT-002]
```

---

## 1. Mục Tiêu Sprint (Sprint Goal & Value)
- **Mục tiêu cốt lõi**: Khắc phục triệt để các hạn chế trải nghiệm người dùng (UX) và lập trình (DX) phát hiện sau Sprint 2 trên toàn bộ chuỗi màn chơi (Tutorial 0.1, 0.2, 0.3 và Màn 1 Bubble Sort):
  1. **Bố cục 2 bên Split-Screen**: Phân tách rõ ràng giữa khu vực mô phỏng đồ họa và khu vực viết code, loại bỏ hoàn toàn việc phải cuộn chuột lên xuống; bổ sung nút **Thu nhỏ/Mở rộng Code Editor** để người chơi phóng to vùng quan sát đồ họa 100% chiều rộng khi cần.
  2. **Bộ sinh đề bài ngẫu nhiên (Random Problem Generator)**: Tạo mảng ngẫu nhiên và các preset đa dạng (Ngẫu nhiên, Đảo ngược, Gần sắp xếp, Trùng lặp) giúp người chơi kiểm thử thuật toán trên nhiều trường hợp mảng khác nhau.
  3. **Bộ tô màu cú pháp Java thời gian thực (Syntax Highlighting)**: Cung cấp giao diện code màu sắc sinh động, phân tách từ khóa Java, đối tượng máy móc, phương thức thao tác, số và chú thích theo phong cách Dark Cyber IDE hiện đại.
  4. **Sổ tay lệnh máy móc động theo ngữ cảnh từng màn (Context-Aware Machine Manual)**: Bổ sung đầy đủ lệnh của `wareHouse`, `WeightScanner`, `SingleCrane` và tự động lọc chỉ hiển thị chính xác các máy móc được cấp phát trong màn đó (không hiển thị dư, không hiển thị thiếu).
- **Giá trị mang lại**: Chuyển hóa AlgoWarehouse thành một môi trường web game học thuật toán công thái học cao cấp, tiện lợi, không gây mỏi mắt hay gián đoạn mạch tư duy khi code và quan sát thuật toán.

---

## 2. Phạm Vi Thực Hiện (Scope)

### Trong phạm vi (In-Scope):
- [ ] **Bố cục 2 bên (Split-Screen) & Nút Thu nhỏ Code Editor**:
  - Sửa đổi lớp CSS `.main-playground` thành CSS Grid 2 cột độc lập (`minmax(0, 1.1fr) minmax(0, 1fr)`).
  - Cột Trái: Canvas Phaser 3 + HUD Thống kê + Thanh điều khiển (Play/Pause/Step/Speed/Validate).
  - Cột Phải: Code Editor + Sổ tay lệnh máy móc.
  - Nút Thu nhỏ Code (`Collapse Editor`): Cho phép thu gọn khu vực code thành thanh dock hẹp, mở rộng 100% Canvas để xem robot vận hành; nút `Expand Editor` để mở lại 2 bên.
- [ ] **Bộ sinh đề bài ngẫu nhiên (Random Problem Generator)**:
  - Tạo module `src/core/levels/generator.ts` sinh mảng số theo ràng buộc kích thước (5–8 phần tử) và trọng số (5–99 kg).
  - Hỗ trợ các biến thể mảng: *Ngẫu nhiên hoàn toàn*, *Mảng đảo ngược (Reverse)*, *Mảng gần như sắp xếp (Nearly Sorted)*, *Mảng có phần tử trùng lặp (Duplicates)*.
  - Nút 🎲 **Đổi đề bài** trên thanh công cụ Playground: Khi bấm, khởi tạo lại mảng mới, cập nhật ngay lập tức lên Canvas và HUD.
- [ ] **Tô màu cú pháp Java (Syntax Highlighting)**:
  - Nâng cấp `CodeEditor` với bộ phân tích token và lớp hiển thị màu sắc thời gian thực:
    - Từ khóa: `public`, `static`, `void`, `int`, `boolean`, `if`, `else`, `for`, `while`, `break`, `return`, `true`, `false`.
    - Đối tượng máy móc: `wareHouse`, `WeightScanner`, `SingleCrane`.
    - Phương thức: `read`, `compare`, `swap`, `next`, `prev`, `length`, `position`, `getCountBox`, `getWeightBox`, `move`, `moveStart`.
    - Số, chuỗi, toán tử và chú thích (`// ...`, `/* ... */`).
  - Đảm bảo gõ phím mượt mà, cuộn đồng bộ, phím Tab thụt lề 4 space và nút Format Code.
- [ ] **Sổ tay lệnh máy móc động theo ngữ cảnh (Context-Aware Machine Manual)**:
  - Chuẩn hóa kho tài liệu API cho cả 3 máy: `wareHouse`, `WeightScanner`, `SingleCrane`.
  - Nhận diện `levelConfig.machines`:
    - Stage 0.1: Chỉ hiển thị `wareHouse` & `WeightScanner`.
    - Stage 0.2: Chỉ hiển thị `wareHouse` & `SingleCrane`.
    - Stage 0.3 & Màn 1 Bubble Sort: Hiển thị tab chọn đầy đủ cả 3 máy.
- [ ] **Tích hợp & Kiểm thử toàn diện**:
  - Đảm bảo tất cả tính năng tương thích 100% với các test hiện có, không có hồi quy (no regressions).

### Ngoài phạm vi (Out-of-Scope — Dành cho Sprint 4):
- Thuật toán Selection Sort (Màn 2) và Insertion Sort (Màn 3).
- Cỗ máy mới: `minMarker`, `lifter`.
- Hệ thống âm thanh âm học (Audio SFX).

---

## 3. Tiêu Chí Chấp Nhận Nghiệm Thu (Acceptance Criteria - AC)

- [ ] **AC-01 (Split-Screen Layout)**: Giao diện màn chơi hiển thị 2 cột song song trên màn hình desktop/laptop, không bị cuộn dọc giữa việc viết code và xem canvas.
- [ ] **AC-02 (Collapse/Expand Code Toggle)**: Bấm nút thu nhỏ giúp ẩn bảng code và mở rộng Canvas đồ họa lên tối đa; bấm mở rộng đưa giao diện về trạng thái chia đôi mượt mà.
- [ ] **AC-03 (Random Problem Generator)**: Bấm nút đổi đề bài sẽ sinh mảng ngẫu nhiên hợp lệ theo cấu hình của màn, cập nhật tức thì thùng hàng trên Canvas Phaser 3 và cho phép chạy mô phỏng/kiểm tra với mảng mới này.
- [ ] **AC-04 (Java Syntax Highlighting)**: Code trong editor có màu sắc rõ ràng (từ khóa, đối tượng máy móc, phương thức, số, chú thích) như IDE hiện đại; không bị giật lag khi gõ và đồng bộ hoàn hảo với dòng kẻ và thanh cuộn.
- [ ] **AC-05 (Context-Aware API Manual)**: Sổ tay lệnh hiển thị chính xác các máy móc được cấp phát cho màn hiện tại (Stage 0.1 chỉ hiện `wareHouse` + `WeightScanner`, Stage 0.2 chỉ hiện `wareHouse` + `SingleCrane`, Bubble Sort hiện đủ cả 3 máy); không hiển thị máy móc ngoài danh mục.
- [ ] **AC-06 (Quality Gates)**: Đạt 100% bài kiểm thử Vitest, 0 lỗi TypeScript (`tsc -b`), 0 lỗi ESLint, build production thành công.

---

## 4. Phân Rã Công Việc Kỹ Thuật (Sprint Tasks)

| Task ID | Tên công việc / Trách nhiệm | Module bị ảnh hưởng | ALLOWED FILES dự kiến | Phụ thuộc |
| :--- | :--- | :--- | :--- | :--- |
| `TASK-011` | Bố cục 2 bên Split-Screen & Nút Thu nhỏ Code Editor | UI Layout & CSS | `src/pages/PlaygroundPage.tsx`, `src/styles/index.css` | — |
| `TASK-012` | Bộ sinh đề bài ngẫu nhiên (Random Problem Generator) | Core Levels & UI | `src/core/levels/generator.ts`, `src/core/levels/index.ts`, `src/pages/PlaygroundPage.tsx`, `src/components/control-bar.tsx` | `TASK-011` |
| `TASK-013` | Bộ tô màu cú pháp Java chuẩn IDE hiện đại | Code Editor Component | `src/components/code-editor.tsx`, `src/styles/index.css`, `src/core/parser/syntax-highlighter.ts` | — |
| `TASK-014` | Sổ tay lệnh máy móc động theo ngữ cảnh từng màn | API Reference Component | `src/components/api-reference.tsx`, `src/core/machines/machine-docs.ts`, `src/pages/PlaygroundPage.tsx` | — |
| `TASK-015` | Tích hợp hệ thống, Kiểm thử E2E & Quality Gates | Test Suite & Verification | `src/test/**`, toàn bộ codebase | `TASK-011`..`TASK-014` |

---

## 5. Rủi Ro & Kế Hoạch Kiểm Soát (Risks & Dependencies)

| Rủi ro tiềm ẩn | Mức độ | Biện pháp giảm thiểu / Kế hoạch dự phòng |
| :--- | :--- | :--- |
| **Phaser Canvas bị biến dạng khi co giãn layout** | Trung bình | Lắng nghe sự kiện toggle thu nhỏ/mở rộng và gọi resize hoặc kích hoạt lại tỷ lệ màn hình của Phaser Scene. |
| **Lệch ký tự giữa lớp tô màu cú pháp và textarea** | Trung bình | Sử dụng cùng thuộc tính CSS font (monospace, line-height, letter-spacing, padding, border) và overlay đồng bộ vị trí scroll (`scrollTop`, `scrollLeft`). |
| **Mảng ngẫu nhiên rơi vào trường hợp đặc biệt không thể giải** | Thấp | Thiết lập bộ ràng buộc (min 5, max 8, trọng số dương trong khoảng 5-99) đảm bảo luôn là mảng hoán vị hợp lệ. |

---

## 6. Kế Hoạch Kiểm Thử & Nghiệm Thu (Verification Plan)
- **Kiểm thử tự động**:
  - `src/test/core/generator.test.ts`: Kiểm tra bộ sinh mảng ngẫu nhiên và các preset.
  - `src/test/app/contextual-manual.test.ts`: Kiểm tra lọc danh mục máy móc theo màn chơi.
  - `src/test/core/syntax-highlighter.test.ts`: Kiểm tra phân tách token cú pháp Java.
- **Cổng chất lượng**:
  - `npm run test:run` (100% pass, ≥ 60 tests).
  - `npm run typecheck` (0 error).
  - `npm run lint` (0 error).
  - `npm run build` (Production bundle sẵn sàng cho Vercel).
