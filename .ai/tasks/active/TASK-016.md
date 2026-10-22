# TASK-016: Sửa Lỗi Gameplay & Chống Gian Lận Trên Các Màn Chơi

```yaml
TASK_ID: TASK-016
TITLE: Sửa Lỗi Gameplay & Chống Gian Lận Trên Các Màn Chơi
STATUS: READY_FOR_REVIEW
PRIORITY: HIGH
CREATED: 2026-10-22
CURRENT_BRANCH: task/TASK-016-gameplay-bugfixes
CURRENT_SESSION: SESSION-TASK-016
DEPENDENCIES: [TASK-014, TASK-015]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Theo yêu cầu của Developer ("kiểm tra các game xem có lỗi gì, nếu có thì fix"), khắc phục các lỗi phát hiện khi rà soát 4 màn chơi (0.1, 0.2, 0.3, bubble-sort):

| # | Lỗi | Mức độ |
| :--- | :--- | :--- |
| B1 | Người chơi gọi được mọi phương thức của máy (kể cả `clearEvents()` xoá dấu vết) → qua 5/5 test ẩn bằng gian lận | P0 |
| B2 | Mọi máy (kể cả `crane` cũ) truy cập được ở mọi màn, bất kể màn cấp máy nào | P0 |
| B3 | Canvas hiển thị sai mảng ban đầu ở màn hướng dẫn (scene không đọc `initialValues` từ registry) | P0 |
| B4 | Bấm "Chạy" sau khi chạy "Từng Bước" → kẹt ở trạng thái RUNNING, không có vòng lặp nào chạy | P0 |
| B5 | Màn hướng dẫn luôn báo thành công, không kiểm tra mục tiêu màn | P1 |
| B6 | Nút Chạy ở Bubble Sort chỉ kiểm tra `isSorted()`, không kiểm định bất biến | P1 |
| B7 | Nút kiểm định ở màn hướng dẫn dùng số liệu cũ, thông báo ghi "Bubble Sort", nhãn "5 Test Ẩn" sai | P1 |
| B8 | Sửa code khi đang tạm dừng → VM chạy code cũ, editor hiển thị code mới | P2 |
| B9 | Bấm "Từng Bước" liên tục → nhiều animation chồng lên nhau | P2 |
| B10 | Trần số bước không thống nhất (UI 10.000, kiểm định 50.000) | P2 |

### 2. Phạm Vi Công Việc (SCOPE)
- Sandbox máy móc theo màn: chỉ cấp máy trong `levelConfig.machines`, chỉ lộ các phương thức có trong `MACHINE_DOCS`; bỏ `Crane` cũ khỏi Playground và bộ kiểm định.
- Bộ kiểm tra mục tiêu màn hướng dẫn (`tutorial-validator.ts`).
- Sửa luồng Run/Pause/Step trong `PlaygroundPage` và scene Phaser.
- Cập nhật/thêm test.

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**: `src/core/machines/**`, `src/core/validator/**`, `src/core/vm/virtual-machine.ts`, `src/game/scenes/warehouse-scene.ts`, `src/pages/PlaygroundPage.tsx`, `src/components/control-bar.tsx`, `src/test/**`, `.ai/tasks/**`, `.ai/sessions/SESSION-TASK-016.md`
- **RESTRICTED FILES**: `src/core/parser/**`

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] **AC-16.1**: Code gian lận (`clearEvents()`, `crane.*`, gọi máy không được cấp) bị từ chối với thông báo lỗi rõ ràng.
- [x] **AC-16.2**: Canvas hiển thị đúng mảng ban đầu của từng màn ngay khi mở. *(Sửa theo phân tích mã; chờ Human xác nhận trên trình duyệt.)*
- [x] **AC-16.3**: Từng Bước → Chạy tiếp tục chạy đến hết; Tạm dừng → Chạy tiếp tục từ chỗ dừng. *(Sửa theo phân tích mã; chờ Human xác nhận trên trình duyệt.)*
- [x] **AC-16.4**: Màn hướng dẫn chỉ thành công khi đạt mục tiêu màn.
- [x] **AC-16.5**: Chạy Bubble Sort kiểm định bất biến khi kết thúc.
- [x] **AC-16.6**: typecheck, lint, test, build đều PASS.

---

## PHẦN 2: TRIỂN KHAI MÃ NGUỒN (IMPLEMENTATION)

### 1. Nhật Ký Triển Khai (IMPLEMENTATION NOTES)
- **B1/B2** `src/core/machines/machine-sandbox.ts` (mới): `createMachineSet`, `createSandboxContext` (chỉ cấp máy của màn; mỗi máy là object `Object.create(null)` đóng băng, chỉ chứa các hàm trong `MACHINE_DOCS`), `collectMachineEvents`, `computeMachineStats`. `PlaygroundPage` và `BubbleSortValidator.runHiddenTests` dùng sandbox; bỏ `Crane` cũ khỏi cả hai.
- **B3** `src/game/scenes/warehouse-scene.ts`: `init()` đọc `initialValues` từ registry của game (trước đây registry được ghi nhưng không ai đọc → canvas hiện mảng mặc định 7 thùng ở màn 4 thùng).
- **B4** `PlaygroundPage` + `control-bar.tsx`: theo dõi vòng lặp chạy bằng `runLoopTokenRef`; "Tiếp Tục" sau Tạm Dừng mở lại vòng lặp đang chờ, sau chế độ Từng Bước thì khởi động vòng lặp mới trên VM hiện tại. Nút "Tiếp Tục" trong ControlBar trước đây không thể hiển thị (điều kiện `isRunning && isPaused`).
- **B5** `src/core/validator/tutorial-validator.ts` (mới): kiểm tra mục tiêu màn theo dấu vết thao tác, độc lập với mảng (0.1 đọc đủ mọi thùng + máy quét về ô 0; 0.2 swap tại 0 rồi tại 1; 0.3 đo thùng 0 và 1 trước, swap đúng khi thùng 0 nặng hơn).
- **B6** Kết thúc lượt Chạy ở Bubble Sort gọi `validateTrace` (kiểm định bất biến) thay vì chỉ `isSorted()`.
- **B7** Nút kiểm định ở màn hướng dẫn chạy `runTutorialCheck` với số liệu mới, thông báo theo tên màn, nhãn "Kiểm Tra Nhiệm Vụ".
- **B8** Editor bị khoá khi đang Chạy hoặc Tạm Dừng (tránh VM chạy code cũ).
- **B9** Chặn bấm "Từng Bước" chồng lên nhau (`isSteppingRef`); vòng lặp chạy cũng chờ khi đang bước.
- **B10** `DEFAULT_STEP_BUDGET = 50000` trong `virtual-machine.ts`, dùng chung cho UI, test ẩn và màn hướng dẫn. Vòng lặp nhường luồng mỗi 200 bước không có hoạt ảnh để Tạm Dừng/Reset vẫn phản hồi.
- **Test**: `src/test/app/gameplay-fixes.test.ts` (mới, 16 test). `bubble-validator.test.ts`: test "tương thích ngược với crane cũ" (khẳng định đường gian lận) đổi thành test khẳng định `crane` bị từ chối.

### 2. Trạng Thái Đánh Giá Của AI (REVIEW STATUS)
- `npm run typecheck`: PASS · `npm run lint`: PASS · `npm run test:run`: PASS 129/129 · `npm run build`: PASS (~0.9s).
- Kịch bản gian lận gốc (`crane.*` + `clearEvents()`) nay bị từ chối.
- AC-16.2/16.3 là hành vi giao diện, chưa có E2E trình duyệt → cần Human kiểm tra trực quan.

### 3. Quyết Định Của Con Người (HUMAN DECISION)
*(Chờ Developer review nhánh `task/TASK-016-gameplay-bugfixes`)*
