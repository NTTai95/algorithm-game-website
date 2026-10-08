# Quy Trình: Tích Hợp & Hoàn Tất Task (Complete & Merge Task)

Quy trình này hướng dẫn cách Lập trình viên Con người chính thức merge nhánh task vào `develop` và đánh dấu task là `DONE`.

---

## Các Bước Thực Hiện:

1. **Chuyển sang nhánh `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. **Thực hiện lệnh merge nhánh task**:
   ```bash
   git merge --no-ff task/TASK-XXX-<slug> -m "Merge task/TASK-XXX-<slug> into develop"
   ```
   *(Lưu ý: Lệnh merge này đồng thời đưa cả mã nguồn triển khai và các file đề xuất `PROP-XXX.md` vào lịch sử của `develop`, bảo tồn vĩnh viễn tri thức dự án dùng chung).*
3. **Chạy lại bộ kiểm tra toàn diện trên `develop`**:
   ```bash
   npm run typecheck
   npm run lint
   npm run test:run
   npm run build
   ```
4. **Đóng task chính thức**:
   - Di chuyển file từ `.ai/tasks/active/TASK-XXX.md` sang `.ai/tasks/completed/TASK-XXX.md`.
   - Cập nhật trạng thái trong file task thành `STATUS: DONE`, điền hash commit merge và ngày tích hợp.
   - Xóa dòng tương ứng khỏi bảng `.ai/tasks/TASK_PROCESSING.md`.
5. **Xử lý các đề xuất đi kèm (nếu có)**:
   - Nếu có đề xuất `PROP-XXX.md` được duyệt (`APPROVED`), con người có thể tạo task mới trong `.ai/tasks/` hoặc lưu vào kế hoạch sprint tương lai.
6. **Commit và đẩy thay đổi trên `develop`**:
   ```bash
   git add .ai/tasks/
   git commit -m "TASK-XXX: complete and archive task"
   git push origin develop
   ```
7. **Xóa nhánh task trên local và remote (tùy chọn)**:
   ```bash
   git branch -d task/TASK-XXX-<slug>
   git push origin --delete task/TASK-XXX-<slug>
   ```
