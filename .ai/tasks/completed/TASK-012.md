# TASK-012: Bộ Sinh Đề Bài Ngẫu Nhiên (Random Problem Generator) & Preset Đa Dạng

```yaml
TASK_ID: TASK-012
TITLE: Bộ Sinh Đề Bài Ngẫu Nhiên & Preset Đa Dạng
STATUS: DONE
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-012-random-problem-generator
CURRENT_SESSION: SES-20261017-12
DEPENDENCIES: [TASK-011]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
- Giải quyết hạn chế mỗi màn chơi chỉ có một mảng khởi tạo cố định (ví dụ Bubble Sort luôn là `[45, 12, 89, 33, 7]`).
- Cung cấp cho người chơi công cụ sinh đề bài ngẫu nhiên để thử thách thuật toán với nhiều trường hợp mảng khác nhau.
- Hỗ trợ các kịch bản (Presets) thực tiễn trong giảng dạy và luyện tập thuật toán:
  - **Random (Ngẫu nhiên chuẩn)**: Phân phối khối lượng ngẫu nhiên trong khoảng 5–99 kg, độ dài từ 5 đến 8 phần tử.
  - **Reversed (Đảo ngược hoàn toàn)**: Mảng có thứ tự giảm dần (trường hợp xấu nhất - Worst Case của Bubble Sort).
  - **Nearly Sorted (Gần như đã sắp xếp)**: Mảng đã tăng dần chỉ có 1–2 cặp phần tử bị đảo vị trí.
  - **With Duplicates (Có phần tử trùng lặp)**: Mảng chứa ít nhất 2 thùng hàng có khối lượng bằng nhau (kiểm tra tính ổn định của thuật toán - Stability).
- Tích hợp nút 🎲 **"Đổi đề bài" (Randomize Problem)** trên giao diện Playground:
  - Khi bấm, sinh mảng mới, khởi tạo lại môi trường `WarehouseArrayState`, cập nhật ngay lập tức các sprite thùng hàng trên Phaser Scene và reset các bộ đếm HUD.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/levels/generator.ts`:
    - Hàm `generateRandomArray(options)`:
      - `length`: min, max (mặc định 5–8 phần tử).
      - `minWeight`, `maxWeight` (mặc định 5–99).
      - `preset`: `'random' | 'reversed' | 'nearly-sorted' | 'duplicates'`.
    - Đảm bảo dữ liệu mảng sinh ra luôn hợp lệ, không chứa số âm hoặc NaN.
  - `src/core/levels/index.ts`:
    - Export các hàm và types liên quan đến generator.
  - `src/pages/PlaygroundPage.tsx`:
    - Quản lý state `currentArray: number[]` thay vì luôn lấy `levelConfig.initialArray` tĩnh.
    - Hàm `handleRandomizeProblem(preset?)`:
      - Sinh mảng mới dựa trên ràng buộc của màn hiện tại.
      - Dừng mô phỏng đang chạy nếu có (`handleReset()`).
      - Cập nhật Phaser scene với mảng mới (`resetToState(newArray)`).
      - Cập nhật state hiển thị HUD.
  - `src/components/control-bar.tsx`:
    - Thêm nút 🎲 **Đổi đề bài** với menu popover hoặc dropdown chọn preset (*Ngẫu nhiên, Đảo ngược, Gần xong, Trùng lặp*).
  - `src/test/core/generator.test.ts`:
    - Unit test cho generator bao phủ tất cả 4 presets, kiểm tra độ dài và miền giá trị.
- **Nằm ngoài phạm vi**:
  - Sửa đổi logic Invariant Validator (đã hỗ trợ mảng tùy ý từ Sprint 2).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/levels/generator.ts`
  - `src/core/levels/index.ts`
  - `src/core/levels/types.ts`
  - `src/pages/PlaygroundPage.tsx`
  - `src/components/control-bar.tsx`
  - `src/styles/index.css`
  - `src/test/core/generator.test.ts`
  - `.ai/tasks/active/TASK-012.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/core/parser/**`
  - `src/core/vm/**`

---

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] **AC-12.1**: Module `generator.ts` sinh được mảng ngẫu nhiên và đúng đặc tả cho cả 4 preset: random, reversed, nearly-sorted, duplicates.
- [x] **AC-12.2**: Bấm nút 🎲 "Đổi đề bài" trên Playground: các thùng hàng trên Canvas Phaser 3 lập tức đổi thành các giá trị khối lượng mới và nhãn cân nặng tương ứng.
- [x] **AC-12.3**: Người chơi có thể bấm Chạy (Run) hoặc Từng bước (Step) để giải thuật toán trên mảng mới này bình thường.
- [x] **AC-12.4**: Unit test đạt 100% độ bao phủ cho `generator.ts`.

---

## PHẦN 2: KẾT QUẢ THỰC THI (IMPLEMENTATION SUMMARY)

1. **Module Sinh Đề Bài Ngẫu Nhiên (`src/core/levels/generator.ts`)**:
   - Triển khai hàm `generateProblemArray(options)` hỗ trợ 4 preset đặc tả:
     - `random`: Mảng ngẫu nhiên hoàn toàn trong khoảng 5–95 kg.
     - `reversed`: Mảng sắp xếp giảm dần (Worst Case của Bubble Sort).
     - `nearly-sorted`: Mảng đã tăng dần nhưng bị hoán đổi 1 vị trí lân cận.
     - `duplicates`: Mảng chứa ít nhất 2 thùng hàng có khối lượng bằng nhau (Stability test).
2. **Giao Diện Điều Khiển Playground (`ControlBar.tsx` & `PlaygroundPage.tsx`)**:
   - Thêm nút 🎲 **"Đổi Đề Bài"** cùng menu chọn preset nhanh (`select-preset`).
   - Quản lý `currentArray` động: Khi đổi đề bài, tự động reset Phaser Scene với các sprite thùng hàng mang khối lượng mới, reset môi trường mô phỏng và bộ đếm HUD.
   - Hỗ trợ chạy thuật toán và kiểm định trên mảng tùy biến này.
3. **Kiểm Thử & Cổng Chất Lượng**:
   - Thêm bộ test `src/test/core/generator.test.ts` (6 test cases).
   - Đạt 64/64 bài kiểm thử Vitest (100% pass).
   - TypeScript `tsc -b`: 0 lỗi.
   - ESLint: 0 cảnh báo / 0 lỗi.
   - Production build `vite build`: thành công trong 738ms.
