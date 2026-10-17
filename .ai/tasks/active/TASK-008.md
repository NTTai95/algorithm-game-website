# TASK-008: Cập Nhật Phaser 3 Simulation Scene (Hiển Thị Đồng Thời WeightScanner & SingleCrane)

```yaml
TASK_ID: TASK-008
TITLE: Cập Nhật Phaser 3 Simulation Scene (Đa Cỗ Máy & Hoạt Ảnh Quét Cân Nặng)
STATUS: READY_FOR_REVIEW
PRIORITY: MEDIUM
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-008-phaser-multimachine-simulation
CURRENT_SESSION: SES-20261017-08
DEPENDENCIES: [TASK-006]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Nâng cấp Scene đồ họa Phaser 3 từ 1 cỗ máy đơn lẻ sang hệ thống mô phỏng đa cỗ máy công nghiệp:
1. Render đồng thời **`WeightScanner`** (Cảm biến quét cân nặng) và **`SingleCrane`** (Cần cẩu hoán đổi) trên sân khấu kho hàng.
2. Thiết kế layout 2 tầng ray hoặc độ cao khác nhau để 2 cỗ máy có thể đứng cùng 1 vị trí mảng mà không bị che khuất lẫn nhau:
   - Tầng trên: Cần cẩu `SingleCrane` với kết cấu gantry và dây cáp/ngàm gắp hạ xuống.
   - Tầng dưới/trung gian: Thiết bị cảm biến `WeightScanner` có module mắt đọc quang học.
3. Hoạt ảnh chuyên biệt:
   - Khi `WeightScanner.getWeightBox()`: Kích hoạt hiệu ứng tia laser/beam quang học neon chiếu thẳng vào thùng hàng, nhấp nháy chỉ số cân nặng.
   - Khi `SingleCrane.swap()`: Hạ ngàm gắp 2 thùng hàng, nhấc lên nhẹ và tráo đổi vị trí với hiệu ứng tia lửa cơ học (sparks).
   - Khi `move(step)` / `moveStart()`: Trượt ray mượt mà về vị trí tương ứng.
4. Hiển thị nhãn thùng hàng rõ ràng thông số khối lượng `weight`.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/game/scenes/WarehouseScene.ts`:
    - Tạo và quản lý sprite/container cho `WeightScanner`.
    - Cập nhật sprite/container cho `SingleCrane`.
    - Xử lý các sự kiện `SCANNER_READ`, `SCANNER_MOVE`, `SCANNER_MOVE_START`, `CRANE_SWAP`, `CRANE_MOVE`, `CRANE_MOVE_START`.
    - Hiệu ứng hình ảnh (laser beam cho scanner, claw tween cho crane).
  - `src/game/config.ts`: Cấu hình độ cao ray, tốc độ tween, bảng màu neon công nghiệp.
  - `src/test/game/presentation.test.ts`: Cập nhật bài test headless xác nhận đăng ký và xử lý đầy đủ các sự kiện đa máy móc.
- **Nằm ngoài phạm vi**:
  - Tầng React UI & Routing (thuộc TASK-010).
  - Tầng Logic Máy ảo (thuộc TASK-007).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/game/**`
  - `src/test/game/**`
  - `.ai/tasks/active/TASK-008.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/core/**`
  - `src/components/**`
  - `package.json`

---

### 4. Kế Hoạch Kiểm Thử (TEST PLAN)
1. Khởi tạo scene nhận danh sách thùng hàng có `weight`.
2. Gửi chuỗi sự kiện mô phỏng hỗn hợp: Scanner đọc $\to$ Scanner di chuyển $\to$ Crane di chuyển $\to$ Crane đổi chỗ $\to$ Reset về đầu.
3. Kiểm tra không có lỗi crash đồ họa và các tween chuyển động kết thúc ở đúng tọa độ X tương ứng với index.
4. Lệnh kiểm tra: `npm.cmd run test:run` && `npm.cmd run typecheck`.
