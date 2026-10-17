# TASK-010: Xây Dựng App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials & Tích Hợp UI

```yaml
TASK_ID: TASK-010
TITLE: Xây Dựng App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials & Tích Hợp UI
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-010-app-shell-home-and-tutorials
CURRENT_SESSION: NONE
DEPENDENCIES: [TASK-006, TASK-007, TASK-008, TASK-009]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
1. Tái cấu trúc toàn bộ trải nghiệm người dùng với kiến trúc App Shell hiện đại:
   - **Thanh Header cố định**: Điều hướng linh hoạt giữa Trang Home, Chuỗi bài học Tutorials và Danh mục thuật toán sắp xếp.
   - **Trang Home (Landing & Campaign Hub)**: Giới thiệu sứ mệnh nền tảng, cơ chế kho hàng tự động, catalog các cỗ máy công nghiệp (`WarehouseEnvironment`, `WeightScanner`, `SingleCrane`) và sơ đồ chiến dịch mở khóa màn chơi.
2. Thiết kế hệ thống định tuyến Client-Side Routing hỗ trợ các endpoint:
   - `/` hoặc `#/`: Trang Home.
   - `#/tutorial/0.1`: Màn 0.1 — Làm quen `wareHouse` & `WeightScanner`.
   - `#/tutorial/0.2`: Màn 0.2 — Làm quen `SingleCrane`.
   - `#/tutorial/0.3`: Màn 0.3 — Hiệu chuẩn kết hợp cả 2 cỗ máy.
   - `#/level/bubble-sort`: Màn 1 — Sắp xếp nổi bọt với 2 cỗ máy theo khối lượng.
3. Nâng cấp thanh công cụ của Trình soạn thảo mã (Editor Toolbar):
   - Thêm nút **Format Code** (tự động căn lề thụt dòng mã nguồn Java đẹp mắt).
   - Tự động nạp mẫu code chuẩn tương ứng với màn chơi được chọn.
4. Tích hợp **Diagnostic Modal / Panel**:
   - Khi có lỗi (cú pháp, runtime, hoặc bất biến), hiển thị bảng chẩn đoán trực quan: số dòng lỗi, phân tích nguyên nhân và gợi ý khắc phục.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/components/layout/Header.tsx`: Thanh điều hướng xuyên suốt (Brand, Links, Stats, Level Dropdown).
  - `src/pages/HomePage.tsx`: Trang giới thiệu dự án, catalogue máy móc và danh sách màn chơi.
  - `src/pages/PlaygroundPage.tsx`: Trang chơi game tích hợp Split-screen (Monaco Editor + Controls + Phaser Canvas).
  - `src/components/editor/CodeEditor.tsx`: Tích hợp nút Format Code và Syntax Highlighting.
  - `src/components/feedback/DiagnosticModal.tsx`: Hiển thị báo cáo chẩn đoán lỗi chi tiết kèm gợi ý.
  - `src/core/levels/level-registry.ts`: Quản lý cấu hình màn chơi (0.1, 0.2, 0.3, Bubble Sort) độc lập và modular.
  - `src/App.tsx`: App Shell tích hợp Router và Navigation state.
  - `src/styles/`: Tinh chỉnh CSS hiện đại, phong cách Cyber-Industrial thẩm mỹ cao.
- **Nằm ngoài phạm vi**:
  - Selection Sort và Insertion Sort (Màn 2 và Màn 3 thuộc Sprint 3).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/components/**`
  - `src/pages/**`
  - `src/core/levels/**`
  - `src/styles/**`
  - `src/App.tsx`
  - `src/main.tsx`
  - `.ai/tasks/active/TASK-010.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `package.json`

---

### 4. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Routing & Navigation Test**:
   - Nhấp vào logo hoặc "Trang chủ" $\to$ chuyển về HomePage.
   - Nhấp vào "Màn 0.1 (Scanner)" $\to$ nạp đúng cấu hình và code mẫu của Stage 0.1.
   - Nhấp vào "Bubble Sort" $\to$ nạp đúng màn Bubble Sort với đầy đủ 2 cỗ máy.
2. **Editor & Format Code Test**:
   - Nhập một đoạn mã bị lệch thụt lề $\to$ Nhấp "Format Code" $\to$ Editor tự động căn chỉnh lề chuẩn.
3. **Diagnostic Test**:
   - Cố tình viết sai điều kiện so sánh hoặc nhảy cóc $\to$ Chạy code $\to$ Bảng chẩn đoán hiện đúng dòng code và gợi ý sửa.
4. **End-to-End Bubble Sort Test**:
   - Dán mã chuẩn từ Human $\to$ Chạy code $\to$ Cả 2 máy hoạt động $\to$ Thắng màn và hiển thị Victory modal.
5. Lệnh kiểm tra: `npm.cmd run test:run` && `npm.cmd run typecheck` && `npm.cmd run lint`.
