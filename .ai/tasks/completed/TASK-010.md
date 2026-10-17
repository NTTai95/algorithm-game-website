# TASK-010: Xây Dựng App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials & Tích Hợp UI

```yaml
TASK_ID: TASK-010
TITLE: Xây Dựng App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials & Tích Hợp UI
STATUS: DONE
PRIORITY: HIGH
CREATED: 2026-10-17
COMPLETED: 2026-10-17
BRANCH: task/TASK-010-app-shell-home-and-tutorials
SESSION: SES-20261017-10
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
  - `src/pages/PlaygroundPage.tsx`: Trang chơi game tích hợp Split-screen (Monaco/Text Editor + Controls + Phaser Canvas).
  - `src/components/code-editor.tsx`: Tích hợp nút Format Code và Syntax Highlighting.
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
  - `src/test/app/**`
  - `.ai/tasks/completed/TASK-010.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `package.json`

---

## PHẦN 2: THỰC THI & NGHIỆM THU (IMPLEMENTATION & VERIFICATION)

### 1. Các Tệp Tin Đã Triển Khai
1. `src/core/levels/types.ts` & `src/core/levels/level-registry.ts`:
   - Định nghĩa `LevelConfig`, `LevelId`, `LevelMachine`.
   - Cấu hình 4 màn chơi: `0.1` (WeightScanner), `0.2` (SingleCrane), `0.3` (Combo), `bubble-sort` (Màn 1 Đa cỗ máy).
   - Bộ phân tích hash route `parseRouteHash` (`#/`, `#/tutorial/0.1`, `#/tutorial/0.2`, `#/tutorial/0.3`, `#/level/bubble-sort`).
2. `src/components/layout/Header.tsx`:
   - Thanh điều hướng cố định trên cùng, chứa Brand logo, nút Trang Chủ, Dropdown Màn 0 Hướng Dẫn, Dropdown Chiến Dịch DSA, và Tag màn chơi hiện tại.
3. `src/pages/HomePage.tsx`:
   - Giao diện Landing Page chuẩn Cyber-Industrial:
     - Hero Section giới thiệu dự án, CTA Button chuyển màn chơi, Terminal code preview.
     - Arsenal giới thiệu 3 cỗ máy: `wareHouse`, `WeightScanner`, `SingleCrane`.
     - Campaign Roadmap phân chia 2 chuỗi (Màn 0 Tutorials và Chiến dịch Sorting).
4. `src/pages/PlaygroundPage.tsx`:
   - Tích hợp không gian chơi Split-Screen linh hoạt theo cấu hình từng màn chơi.
   - Điều khiển mô phỏng Phaser 3 hai đường ray (`SingleCrane` trên ray giàn, `WeightScanner` trên ray cảm biến).
   - Đồng bộ thời gian thực các chỉ số di chuyển, quét/so sánh, hoán đổi và kiểm tra nghiệm thu.
5. `src/components/code-editor.tsx`:
   - Bổ sung nút **⚡ Format Code** tự động căn lề mã nguồn Java qua `formatJavaCode`.
   - Hỗ trợ nạp mẫu code chuẩn tương ứng theo từng màn chơi.
6. `src/components/feedback/DiagnosticModal.tsx`:
   - Bảng chẩn đoán lỗi sư phạm chi tiết: Badge phân loại lỗi, pill số dòng `📍 Dòng X`, so sánh trực quan Giá trị thực tế vs Kỳ vọng, và ô Gợi ý khắc phục sư phạm (💡).
7. `src/App.tsx`:
   - Tái cấu trúc thành App Shell hiện đại với Client-Side Hash Routing mượt mà, phản hồi lập tức không tải lại trang.
8. `src/styles/index.css`:
   - Bổ sung hơn 800 dòng CSS Cyber-Industrial phong cách dark mode cao cấp, responsive linh hoạt.
9. `src/test/app/levels-and-navigation.test.ts`:
   - Bộ kiểm thử tự động xác thực Level Registry, hash route routing và cú pháp mã mặc định của toàn bộ các màn chơi.

### 2. Kết Quả Kiểm Tra Chất Lượng (Quality Gates)
- **Vitest**: `54/54 tests passed` (9 test suites).
- **TypeScript**: `tsc -b` passed với 0 lỗi.
- **ESLint**: `eslint .` passed với 0 cảnh báo.
