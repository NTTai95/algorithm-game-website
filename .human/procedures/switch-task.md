# Quy Trình: Điều Chuyển AI Sang Task Khác (Switch Task)

Quy trình này áp dụng khi cần điều động AI đang làm task dở dang sang một task khác có độ ưu tiên cao hơn.

---

## Các Bước Thực Hiện:
1. **Yêu cầu AI dừng lại an toàn**:
   Nhập prompt:
   > *"Dừng code tại điểm an toàn hiện tại. Chạy test nhanh. Tạo commit lưu vết toàn bộ công việc dở dang với thông điệp 'TASK-XXX: WIP pause at current state', push nhánh lên remote và ghi file bàn giao handoff trong .ai/sessions/."*
2. **Kiểm tra trạng thái Git**:
   Đảm bảo `git status` trả về working tree sạch sẽ (clean).
3. **Cập nhật trạng thái task cũ**:
   Trong `.ai/tasks/TASK_PROCESSING.md` và `.ai/tasks/active/TASK-XXX.md`, chuyển trạng thái task cũ sang `STATUS: PAUSED`.
4. **Chuyển sang nhánh của task mới**:
   ```bash
   git checkout task/TASK-YYY-<slug>
   ```
5. **Cập nhật `.ai/CONTROL.md`**:
   Đổi `CURRENT_TASK: TASK-YYY`, `COMMAND: IMPLEMENT` (hoặc `DESIGN`).
6. **Kích hoạt AI làm task mới**.
