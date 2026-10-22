# TASK-015: Tích Hợp Hệ Thống, Kiểm Thử Toàn Diện E2E & Quality Gates

```yaml
TASK_ID: TASK-015
TITLE: Tích Hợp Hệ Thống, Kiểm Thử Toàn Diện E2E & Quality Gates
STATUS: READY_FOR_REVIEW
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-015-integration-quality-gates
CURRENT_SESSION: SESSION-TASK-015
DEPENDENCIES: [TASK-011, TASK-012, TASK-013, TASK-014]  # Nhánh tạo nối tiếp từ task/TASK-014-contextual-machine-manual
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
- Tích hợp liền mạch toàn bộ các tính năng mới của Sprint 3:
  1. Bố cục 2 bên Split-Screen với nút thu nhỏ/mở rộng Code Editor.
  2. Bộ sinh đề bài ngẫu nhiên (Random Problem Generator) với 4 presets.
  3. Trình tô màu cú pháp Java thời gian thực chuẩn phong cách IDE hiện đại.
  4. Sổ tay lệnh máy móc động hiển thị chính xác theo từng màn chơi.
- Đảm bảo tính toàn vẹn hệ thống, không gây hồi quy (no regressions) trên tất cả các màn chơi:
  - Tutorial Stage 0.1 (`wareHouse` + `WeightScanner`).
  - Tutorial Stage 0.2 (`wareHouse` + `SingleCrane`).
  - Tutorial Stage 0.3 (Phối hợp đa máy).
  - Level 1: Bubble Sort (Sắp xếp theo khối lượng `boxWeight` với kiểm định bất biến và test ẩn).
- Vượt qua 100% các cổng kiểm định chất lượng nghiêm ngặt (Quality Gates):
  - Vitest unit tests: 100% tests pass (kèm các test mới cho generator, highlighter, contextual manual).
  - TypeScript compilation: `tsc -b` (0 error).
  - ESLint static analysis: `eslint .` (0 warning / 0 error).
  - Production build: `vite build` (đóng gói bundle tối ưu, sẵn sàng deploy Vercel).

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - Chạy và kiểm tra toàn bộ chuỗi test suites trong `src/test/`.
  - Bổ sung test kiểm thử tích hợp giữa generator và validator nếu cần.
  - Tinh chỉnh CSS responsive và visual polish để đảm bảo giao diện đẹp mắt, thẩm mỹ cao (Cyber-Industrial Aesthetics) trên các trình duyệt máy tính để bàn và laptop.
  - Cập nhật tài liệu nghiệm thu Sprint 3 (`REVIEW-SPRINT-003.md`).
- **Nằm ngoài phạm vi**:
  - Thêm tính năng mới ngoài phạm vi Sprint 3.

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/**`
  - `.ai/tasks/active/TASK-015.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - None

---

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] **AC-15.1**: Toàn bộ 4 màn chơi (0.1, 0.2, 0.3, bubble-sort) hoạt động trơn tru với bố cục 2 bên, đổi đề bài ngẫu nhiên, syntax highlighting và sổ tay lệnh máy móc chuẩn xác. *(Đạt qua test tích hợp; chờ Human xác nhận trực quan trên trình duyệt.)*
- [x] **AC-15.2**: Toàn bộ unit tests Vitest vượt qua 100% (dự kiến ≥ 65 tests).
- [x] **AC-15.3**: Kiểm tra kiểu TypeScript (`npm run typecheck`) đạt 0 lỗi.
- [x] **AC-15.4**: Kiểm tra mã nguồn ESLint (`npm run lint`) đạt 0 cảnh báo và 0 lỗi.
- [x] **AC-15.5**: Đóng gói sản phẩm (`npm run build`) thành công trong dưới 2 giây.

---

## PHẦN 2: TRIỂN KHAI MÃ NGUỒN (IMPLEMENTATION)

### 1. Nhật Ký Triển Khai (IMPLEMENTATION NOTES)
- **Nhánh**: `task/TASK-015-integration-quality-gates` được tạo nối tiếp từ `task/TASK-014-contextual-machine-manual` (TASK-014 chưa merge vào `develop`). Cần merge TASK-014 trước hoặc merge chung.
- `src/test/app/sprint3-integration.test.ts` (mới, 31 test):
  - Generator ↔ giới hạn Playground (4 preset × 40 lần).
  - Generator ↔ BubbleSortValidator: lời giải mẫu qua kiểm định bất biến trên 160 đề ngẫu nhiên + 5/5 test ẩn.
  - Mọi màn (0.1, 0.2, 0.3, bubble-sort): code mặc định và mọi template chạy không lỗi khi CHỈ cấp đúng máy của màn (không có `crane` cũ), trên mảng ban đầu và mảng sinh ngẫu nhiên.
  - Tham số `solve(...)` ↔ `levelConfig.machines` ↔ tab sổ tay lệnh khớp nhau.
  - Syntax highlighter giữ nguyên văn bản nguồn của code mỗi màn.
- **Sửa lỗi tích hợp**:
  - `src/components/game-canvas.tsx`: game Phaser chỉ khởi tạo 1 lần mỗi mount (props mới đọc qua ref). Trước đây đổi tốc độ làm huỷ/tạo lại game giữa lúc chạy.
  - `src/game/config.ts`: `audio: { noAudio: true }` — hết lỗi `closed AudioContext` trong console.
  - `src/core/levels/generator.ts` + `src/pages/PlaygroundPage.tsx`: hằng số `PLAYGROUND_PROBLEM_BOUNDS` (5–8 thùng, 5–99 kg) theo SPRINT-003.
- `.document/sprints/active/REVIEW-SPRINT-003.md`: bản nháp biên bản nghiệm thu (STATUS: DRAFT).

### 2. Trạng Thái Đánh Giá Của AI (REVIEW STATUS)
- `npm run typecheck`: PASS · `npm run lint`: PASS (0 cảnh báo) · `npm run test:run`: PASS 113/113 · `npm run build`: PASS (~0.85s).
- Chưa có E2E trình duyệt (dự án chưa cài Playwright). Cần Human kiểm tra trực quan 4 màn trên trình duyệt.
- Tồn đọng ngoài phạm vi (xem REVIEW-SPRINT-003 mục 4): lỗ hổng chống gian lận trong VM (P0).

### 3. Quyết Định Của Con Người (HUMAN DECISION)
*(Chờ Developer review nhánh `task/TASK-015-integration-quality-gates`)*
