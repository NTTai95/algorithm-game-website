# TASK-011: Bố Cục 2 Bên (Split-Screen) & Nút Thu Nhỏ / Mở Rộng Code Editor

```yaml
TASK_ID: TASK-011
TITLE: Bố Cục 2 Bên (Split-Screen) & Nút Thu Nhỏ / Mở Rộng Code Editor
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-011-split-screen-layout
CURRENT_SESSION: SES-20261017-11
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
- Khắc phục triệt để vấn đề bố cục dọc khiến người dùng phải cuộn chuột lên xuống giữa việc viết code và quan sát canvas hoạt ảnh máy móc.
- Triển khai bố cục 2 bên (Split-Screen) cố định và tối ưu hóa không gian hiển thị:
  - **Cột Trái (Simulation Panel)**: Khung vẽ Phaser Canvas + Bảng chỉ số HUD + Thanh điều khiển (Play/Pause/Step/Speed/Validate).
  - **Cột Phải (Code Workspace)**: Trình soạn thảo mã CodeEditor + Sổ tay lệnh máy móc.
- Bổ sung nút chuyển đổi trạng thái **Thu nhỏ Code Editor (Collapse/Expand Code)**:
  - Khi thu nhỏ (`isEditorCollapsed = true`): Panel code co lại thành một thanh dock mỏng bên phải, vùng đồ họa Canvas tự động mở rộng chiếm 100% không gian hiển thị giúp người chơi quan sát toàn bộ chuyển động của robot cẩu, mắt đọc sensor và các thùng hàng mà không bị phân tâm.
  - Khi mở rộng (`isEditorCollapsed = false`): Bố cục trở về chế độ 2 bên cân bằng để tiếp tục code.
- Xử lý đồng bộ sự kiện Resize của Phaser Scene để canvas không bị méo hoặc co rúm khi chuyển đổi kích thước cột.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/styles/index.css`:
    - Định nghĩa lớp CSS `.main-playground` với CSS Grid 2 cột: `grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr)`.
    - Thêm modifier class `.main-playground.collapsed-editor`: `grid-template-columns: 1fr 48px` (hoặc ẩn hoàn toàn với nút dock nổi).
    - Thêm hiệu ứng transition chuyển đổi mượt mà giữa 2 trạng thái.
    - Đảm bảo responsive: Trên màn hình lớn bố cục 2 bên, trên màn hình nhỏ/tablet có thanh dock chuyển tab tiện lợi.
  - `src/pages/PlaygroundPage.tsx`:
    - Bổ sung state `isEditorCollapsed: boolean` (mặc định `false`).
    - Thêm nút bấm thu nhỏ/mở rộng trong Editor Header hoặc thanh công cụ (`[ ⇱ Thu nhỏ Code ]` / `[ ⇲ Mở rộng Code ]`).
    - Lắng nghe thay đổi kích thước và thông báo cho Phaser game canvas điều chỉnh viewport tương ứng.
  - `src/components/code-editor.tsx`:
    - Nhận prop `isCollapsed?: boolean` và callback `onToggleCollapse?: () => void`.
    - Render giao diện thu nhỏ (dock bar với icon Code và tooltip mở rộng).
- **Nằm ngoài phạm vi**:
  - Bộ sinh đề bài ngẫu nhiên (thuộc TASK-012).
  - Tô màu cú pháp (thuộc TASK-013).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/pages/PlaygroundPage.tsx`
  - `src/components/code-editor.tsx`
  - `src/styles/index.css`
  - `.ai/tasks/active/TASK-011.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/core/parser/**`
  - `src/core/vm/**`
  - `src/core/validator/**`

---

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [ ] **AC-11.1**: Vào bất kỳ màn chơi nào (0.1, 0.2, 0.3, bubble-sort), giao diện hiển thị 2 cột song song (Canvas bên trái, Editor bên phải) trên màn hình desktop, không bị trượt dọc để xem cả 2.
- [ ] **AC-11.2**: Bấm nút thu nhỏ Code: Editor thu gọn thành thanh dock hẹp hoặc ẩn mượt mà, Canvas tự động chiếm toàn bộ chiều rộng (100% width) để quan sát kết quả tốt nhất.
- [ ] **AC-11.3**: Bấm nút mở rộng Code: Editor xuất hiện trở lại ở vị trí ban đầu mà không làm mất nội dung code hoặc trạng thái mô phỏng.
- [ ] **AC-11.4**: Hoạt ảnh cơ khí của Phaser 3 không bị méo tỷ lệ (aspect ratio) khi chuyển đổi thu nhỏ / mở rộng.
