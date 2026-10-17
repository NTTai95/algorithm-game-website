# TASK-004: Xây Dựng Scene Phaser 3 Hiển Thị Kho Hàng & Hoạt Ảnh Cẩu

```yaml
TASK_ID: TASK-004
TITLE: Xây dựng Scene Phaser 3 hiển thị kho hàng & Hoạt ảnh cẩu
STATUS: READY_FOR_REVIEW
PRIORITY: MEDIUM
CREATED: 2026-10-16
CURRENT_BRANCH: task/TASK-004-phaser-warehouse-presentation
CURRENT_SESSION: SES-20261016-04
DEPENDENCIES: [TASK-001]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Xây dựng bối cảnh nhà kho công nghiệp tự động thông qua Scene Phaser 3 (`WarehouseScene`), bao gồm thanh ray trên cao, các thùng hàng mang nhãn số/màu sắc trực quan, và cỗ máy Cần cẩu (`CraneSprite`) có cánh tay gắp cơ khí. Tầng hiển thị lắng nghe các sự kiện máy móc (`MachineEvent`) từ lõi mô phỏng để kích hoạt hoạt ảnh di chuyển, quét laser so sánh và hoán đổi thùng hàng mượt mà 60 FPS, hỗ trợ điều chỉnh tốc độ chuyển động từ 1x đến 5x.

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/game/config.ts`: Cấu hình game engine Phaser 3 (kích thước canvas, physics, scale mode).
  - `src/game/scenes/warehouse-scene.ts`: Scene chính hiển thị kho hàng, đường ray, bệ đỡ hàng.
  - `src/game/sprites/crate-sprite.ts`: Đối tượng thùng hàng trực quan (hình khối, nhãn số, highlight khi được so sánh).
  - `src/game/sprites/crane-sprite.ts`: Đối tượng Cần cẩu trục (chân trượt trên ray, dây cáp, móc gắp, tia laser quét dữ liệu).
  - `src/game/controllers/animation-controller.ts`: Bộ điều khiển hàng đợi hoạt ảnh (Animation Queue), chuyển hóa chuỗi sự kiện `CRANE_MOVE`, `CRANE_COMPARE`, `CRANE_SWAP` thành chuỗi tween động.
  - `src/game/events/presentation-bridge.ts`: Cầu nối trung gian nhận sự kiện từ Core VM và điều phối tới Phaser Scene.
- **Nằm ngoài phạm vi**:
  - Tầng trình soạn thảo mã React UI (thuộc TASK-005).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/game/**`
  - `src/test/game/**`
  - `.ai/tasks/active/TASK-004.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/**`
- **RESTRICTED FILES**:
  - `src/core/**`
  - `package.json`

### 4. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
```typescript
export interface IWarehousePresentation {
  initWarehouse(initialValues: number[]): void;
  playEvent(event: MachineEvent): Promise<void>;
  resetToState(values: number[]): void;
  setSpeed(speedMultiplier: number): void;
  destroy(): void;
}
```

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Khởi tạo Scene**: Đảm bảo khởi tạo đúng số lượng thùng hàng tương ứng với mảng đầu vào.
2. **Xử lý sự kiện tuần tự**: Các sự kiện `CRANE_MOVE`, `CRANE_COMPARE`, `CRANE_SWAP` được xử lý đúng thứ tự hàng đợi (FIFO), không bị đè hoạt ảnh.
3. **Cơ chế dọn dẹp bộ nhớ (Cleanup)**: Đảm bảo hủy game instance và giải phóng tài nguyên WebGL/Canvas sạch sẽ khi component React unmount.

### 6. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] Khởi tạo khung vẽ Phaser 3 hiển thị chuẩn đường ray, cần cẩu và dãy thùng hàng.
- [x] Hoạt ảnh cần cẩu trượt trên ray khớp với vị trí ô mảng.
- [x] Hiệu ứng quét laser phát sáng khi cẩu thực hiện so sánh (`CRANE_COMPARE`).
- [x] Hoạt ảnh nhấc thùng, tráo vị trí và hạ thùng mượt mà khi xảy ra hoán đổi (`CRANE_SWAP`).
- [x] Hỗ trợ điều chỉnh tốc độ hoạt ảnh linh hoạt (1x đến 5x).
- [x] `npm.cmd run typecheck` và `npm.cmd run lint` đạt 0 lỗi.

---

## PHẦN 2: TIẾN TRÌNH THỰC HIỆN (EXECUTION PROGRESS)
- [x] Thiết kế chi tiết Phần 1 hoàn tất.
- [x] Tạo nhánh `task/TASK-004-phaser-warehouse-presentation`.
- [x] Khởi tạo phiên làm việc `SESSION-TASK-004.md`.
- [x] Triển khai `WarehouseScene` & Sprite Renderer.
- [x] Triển khai `AnimationController` & Event Bridge.
- [x] Kiểm tra tích hợp đồ họa & hoạt ảnh.
- [x] Hoàn tất kiểm tra chất lượng & cập nhật bảng task.
