# TASK-005: Tích Hợp Giao Diện React UI (Code Editor + HUD + Phaser Canvas)

```yaml
TASK_ID: TASK-005
TITLE: Tích hợp Giao diện React UI (Code Editor + HUD + Phaser Canvas)
STATUS: DONE
PRIORITY: HIGH
CREATED: 2026-10-16
CURRENT_BRANCH: task/TASK-005-react-ui-integration
CURRENT_SESSION: SES-20261016-05
DEPENDENCIES: [TASK-003, TASK-004]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Xây dựng giao diện ứng dụng hoàn chỉnh bằng React 19 theo phong cách nhà kho công nghiệp hiện đại (Cyber-Industrial Aesthetics), tích hợp Trình soạn thảo mã Java (Monaco Editor / CodeMirror), Khung vẽ mô phỏng Phaser 3, Thanh điều khiển phát lại (Run, Pause, Step, Rewind, Speed), Bảng chỉ số hiệu năng (Số phép so sánh, Số lượt hoán đổi, Số bước di chuyển), Hướng dẫn màn chơi và Hộp thoại thông báo kết quả (Victory Modal / Violation Diagnostic Report).

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/components/editor/java-editor.tsx`: Component trình soạn thảo mã Java với cú pháp tô màu, tự động hoàn thiện phương thức `crane.*`.
  - `src/components/controls/playback-controls.tsx`: Cụm nút Play, Pause, Step Forward, Step Backward, Reset, và Slider chỉnh tốc độ.
  - `src/components/game/game-container.tsx`: Vùng chứa canvas Phaser 3 an toàn, hỗ trợ resize và unmount sạch sẽ.
  - `src/components/hud/level-hud.tsx`: Bảng thông số: Số bước di chuyển, So sánh, Hoán đổi, Ngân sách bước (`Step Budget`).
  - `src/components/modal/result-modal.tsx`: Hộp thoại chúc mừng khi vượt qua màn chơi và vượt 4 bài test ẩn, hoặc thông báo chi tiết lỗi vi phạm bất biến khi thất bại.
  - `src/components/docs/machine-docs-panel.tsx`: Bảng tra cứu nhanh tài liệu phương thức máy móc dành cho người chơi.
  - `src/App.tsx`: Lắp ráp thành màn chơi hoàn chỉnh cho Màn Tutorial & Màn 1 (Bubble Sort).
  - `src/styles/`: Tinh chỉnh CSS hiện đại, phong cách dark-mode công nghiệp, glassmorphism, hiệu ứng đèn báo neon.
- **Nằm ngoài phạm vi**:
  - Tầng lõi máy ảo (đã hoàn thành trong TASK-002).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/components/**`
  - `src/styles/**`
  - `src/App.tsx`
  - `src/test/components/**`
  - `.ai/tasks/active/TASK-005.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/**`
- **RESTRICTED FILES**:
  - `.ai/rules/**`
  - `.human/**`
  - `package.json`

### 4. Hệ Thống Hiện Hữu (EXISTING SYSTEMS)
- Kế thừa toàn bộ hệ thống lõi: Data Model & Crane (`TASK-001`), Java Parser & VM (`TASK-002`), BubbleSortValidator (`TASK-003`), và Phaser Warehouse Scene (`TASK-004`).

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Kiểm tra vòng đời Component**:
   - Khi load trang: Khung vẽ Phaser và Code Editor khởi tạo thành công.
   - Khi unmount: Không rò rỉ bộ nhớ hoặc listeners.
2. **Kịch bản người dùng hoàn chỉnh (End-to-End User Flow)**:
   - Người chơi bấm "Chạy (Run)": Mã được dịch, máy ảo chạy, sự kiện được phát cho Phaser, hoạt ảnh chuyển động đồng bộ.
   - Người chơi bấm "Tạm dừng (Pause)": Hoạt ảnh và máy ảo dừng ngay lập tức.
   - Người chơi bấm "Từng bước (Step)": Cần cẩu thực hiện đúng 1 thao tác tiếp theo.
   - Kết thúc: Nếu đạt chuẩn Bubble Sort, hiển thị Victory Modal. Nếu gian lận, hiển thị Violation Report.

### 6. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] Giao diện người dùng hiện đại, sắc nét, phản hồi mượt mà, đạt chuẩn thẩm mỹ Cyber-Industrial.
- [x] Trình soạn thảo mã hiển thị tốt cú pháp Java và gợi ý phương thức của cỗ máy `crane`.
- [x] Toàn bộ cụm nút điều khiển thời gian (Play, Pause, Step, Reset, Speed) hoạt động chính xác.
- [x] Bảng HUD cập nhật số lần so sánh và hoán đổi theo thời gian thực.
- [x] Hiển thị thông báo kết quả chuẩn xác khi người chơi giải thành công hoặc vi phạm luật.
- [x] Đạt 100% kiểm tra `npm.cmd run typecheck`, `npm.cmd run lint` và `npm.cmd run test:run`.
- [x] Đóng gói thành công với `npm.cmd run build` sẵn sàng cho Vercel.

---

## PHẦN 2: TIẾN TRÌNH THỰC HIỆN (EXECUTION PROGRESS)
- [x] Thiết kế chi tiết Phần 1 hoàn tất.
- [x] Tạo nhánh `task/TASK-005-react-ui-integration`.
- [x] Khởi tạo phiên làm việc `SESSION-TASK-005.md`.
- [x] Xây dựng các UI Components (Editor, Controls, HUD, Modal).
- [x] Tích hợp trọn gói End-to-End trong `src/App.tsx`.
- [x] Chạy kiểm thử toàn bộ hệ thống & kiểm tra đóng gói build.
- [x] Hoàn tất kiểm tra chất lượng & cập nhật bảng task.
