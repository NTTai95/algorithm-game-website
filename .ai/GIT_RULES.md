# Giao Thức Quản Lý Git (Git Development & Integration Protocol)

Trong dự án này, Git không chỉ đơn thuần là hệ thống quản lý mã nguồn, mà còn là:
- **Lịch sử phát triển dự án (Development History)**.
- **Lịch sử thực thi từng nhiệm vụ (Task History)**.
- **Lịch sử ghi nhận tri thức và đề xuất kiến trúc (Proposal History)**.
- **Lịch sử tích hợp và mốc phê duyệt của Con Người (Human Confirmation History)**.

---

## 1. Chuẩn Đặt Tên Thông Điệp Commit (Commit Naming Conventions)
Mỗi commit phải đại diện cho một thay đổi logic nguyên tử (atomic change). **Tuyệt đối cấm các commit mơ hồ** như `fix`, `update`, `test`, `changes`, `work`.

### Các Mẫu Chuẩn:
- **Khởi tạo nền tảng & giao thức**:
  `INIT-XXX: <mô tả nền tảng / giao thức>`
  *(Ví dụ: `INIT-001: establish project foundation`, `INIT-004: formalize shared proposal workflow`)*
- **Thực thi nhiệm vụ (Implementation Commit)**:
  `TASK-XXX: <mô tả ngắn gọn bằng thể mệnh lệnh>`
  *(Ví dụ: `TASK-001: implement warehouse slot domain model`, `TASK-021: implement crane system`)*
- **Đề xuất thay đổi kiến trúc/API (Proposal Commit)**:
  `PROP-XXX: <mô tả ngắn gọn đề xuất>`
  *(Ví dụ: `PROP-014: propose crane API revision`)*
- **Lưu trạng thái dở dang khi chuyển task (WIP Commit)**:
  `TASK-XXX: WIP pause at slot validation logic`

---

## 2. Quy Tắc Tách Biệt Commit & Theo Dõi Đề Xuất (Proposal Commit Separation)

Đề xuất (`Proposal`) là **tài sản dự án dùng chung (shared project artifact)**, được lưu trữ vĩnh viễn trên Git repository để mọi phiên AI và lập trình viên con người trên mọi máy tính đều nhìn thấy.

### Quy Định Bắt Buộc:
1. **Theo Dõi Đầy Đủ (Tracked Artifacts)**: Tệp `.ai/changes/proposals/PROP-XXX.md` **TUYỆT ĐỐI KHÔNG ĐƯỢC** để ở trạng thái `untracked` khi AI hoàn tất hoặc tạm dừng phiên làm việc. Mọi đề xuất đã tạo đều phải được `git add` và `git commit`.
2. **Tách Biệt Commit Triển Khai và Commit Đề Xuất (Separate Logical Commits)**:
   - **Implementation Commit**: Chứa mã nguồn tính năng, tests và tài liệu triển khai trong phạm vi của task.
   - **Proposal Commit**: Chứa tệp đề xuất `PROP-XXX.md` và các cập nhật liên kết trực tiếp trong task/session.
   - **CẤM GỘP CHUNG**: Tuyệt đối không gộp commit triển khai và commit đề xuất vào làm một (Cấm: `TASK-021: implement crane system and proposal`).
3. **Đẩy Lên Remote (Pushed to Remote Branch)**: Cả commit triển khai và commit đề xuất đều phải được `git push` lên nhánh task tương ứng để các phiên AI khác trên máy khác có thể kéo về (`git pull`) và tiếp nối công việc.

---

## 3. Quy Định Tạo Nhánh Task Từ `develop`
- AI khi đang ở nhánh task **KHÔNG ĐƯỢC PHÉP checkout sang `develop` hay `main`**.
- Để tạo một nhánh task mới mà không cần checkout sang `develop`, AI sử dụng lệnh phân nhánh trực tiếp từ tham chiếu `develop`:
  ```bash
  # Tạo nhánh mới bắt nguồn từ develop mà không cần chuyển sang develop
  git branch task/TASK-XXX-<slug> develop
  git checkout task/TASK-XXX-<slug>
  ```
- **Điều kiện tiên quyết trước khi tạo nhánh task**:
  1. Task `TASK-XXX` đã tồn tại trong `.ai/tasks/active/`.
  2. Con người đã phê duyệt task và trạng thái là `READY`.
  3. Mọi dependencies của task đã hoàn thành.
  4. Nhánh `develop` cục bộ đã được đồng bộ với phiên bản tích hợp mới nhất.

---

## 4. Quy Trình Hoàn Tất Task & Điểm Xác Nhận Của Con Người
AI **TUYỆT ĐỐI KHÔNG ĐƯỢC** tự động merge nhánh task vào `develop` hoặc `main`.

```
[Trên nhánh task/TASK-XXX-*]
1. AI chạy toàn bộ test, lint, typecheck, build.
2. AI kiểm tra thay đổi: mã nguồn, tests, proposals, drift reports.
3. AI tạo commit triển khai cho mã nguồn: TASK-XXX: <mô tả>
4. AI tạo commit đề xuất riêng (nếu có PROP mới): PROP-XXX: <mô tả>
5. AI cập nhật tài liệu task và session.
6. AI đẩy nhánh lên: git push origin task/TASK-XXX-<slug>
7. AI cập nhật trạng thái: STATUS: READY_FOR_REVIEW
8. AI hoàn tất nhật ký phiên bàn giao trong .ai/sessions/
  ↓
[Con Người Tiếp Quản]
9. Human Developer kiểm tra diff nhánh task (bao gồm cả mã nguồn và đề xuất kèm theo).
10. Human Developer quyết định:
    - Đối với Task: APPROVE hoặc REQUEST_CHANGES.
    - Đối với Proposal (nếu có): APPROVE, REJECT, hoặc DEFER.
11. Human Developer tự mình thực hiện lệnh merge nhánh task vào develop.
  ↓
[Hoàn Tất Chính Thức]
12. Task được chuyển sang STATUS: DONE và chuyển file vào .ai/tasks/completed/.
```

---

## 5. Các Lệnh Git Bị Cấm Tuyệt Đối Đối Với AI
AI **TUYỆT ĐỐI CẤM**:
- Force push (`git push -f`) lên bất kỳ nhánh chung nào (`main`, `develop`).
- Viết lại hoặc xóa lịch sử commit trên các nhánh được bảo vệ.
- Xóa nhánh `main` hoặc `develop`.
- Merge bất kỳ nhánh nào vào `main` hoặc `develop`.
- Bỏ sót tệp đề xuất (`PROP-XXX.md`) ở trạng thái untracked hoặc unpushed.
