# Quy Trình: Tạo & Giao Nhiệm Vụ Cho AI (Assign Task)

Quy trình này hướng dẫn cách tạo một task mới từ backlog và đưa vào luồng thực thi của AI.

---

## Các Bước Thực Hiện:
1. **Tạo file đặc tả task**:
   Sao chép `.ai/tasks/TASK_TEMPLATE.md` thành `.ai/tasks/active/TASK-XXX.md`.
2. **Điền đầy đủ các mục trong Phần 1 (Thiết kế ban đầu)**:
   - Mục tiêu (`GOAL`), Phạm vi (`SCOPE`), Ranh giới tệp tin (`ALLOWED FILES`, `RESTRICTED FILES`).
   - Tiêu chí nghiệm thu (`ACCEPTANCE CRITERIA`).
3. **Cập nhật Bảng điều phối**:
   Thêm dòng task mới vào `.ai/tasks/TASK_PROCESSING.md` với trạng thái `STATUS: READY`.
4. **Tạo nhánh Git cho task**:
   Tạo nhánh mới từ `develop` mới nhất:
   ```bash
   git branch task/TASK-XXX-<slug> develop
   git checkout task/TASK-XXX-<slug>
   ```
5. **Cấu hình file điều khiển**:
   Cập nhật `.ai/CONTROL.md`:
   ```yaml
   MODE: TASK
   CURRENT_TASK: TASK-XXX
   COMMAND: DESIGN
   ALLOW_CODE: YES
   ALLOW_TEST: YES
   ALLOW_COMMIT: YES
   ALLOW_MERGE: NO
   ```
6. **Kích hoạt AI**:
   Chỉ đạo AI: *"Hãy bắt đầu thực hiện TASK-XXX. Hoàn thiện Phần 1 (Thiết kế chi tiết) trước khi viết code."*
