# Quy Trình: Kiểm Tra & Nghiệm Thu Task (Review Task)

Quy trình này áp dụng khi AI đã hoàn tất lập trình và chuyển trạng thái task sang `READY_FOR_REVIEW`.

---

## Các Bước Thực Hiện:
1. **Kiểm tra thông báo hoàn tất của AI**:
   Đọc file nhật ký phiên mới nhất trong `.ai/sessions/` để xem danh sách file đã tạo/sửa và kết quả kiểm thử mà AI đã ghi nhận.
2. **Kiểm tra diff mã nguồn**:
   So sánh các thay đổi trên nhánh task với nhánh `develop`:
   ```bash
   git diff develop..task/TASK-XXX-<slug>
   ```
3. **Chạy kiểm tra độc lập trên máy con người**:
   ```bash
   npm run typecheck
   npm run lint
   npm run test:run
   npm run build
   ```
4. **Đối chiếu Tiêu chí Nghiệm thu (Acceptance Criteria)**:
   Mở file `.ai/tasks/active/TASK-XXX.md` và kiểm tra xem tất cả các tiêu chí đã được đáp ứng đầy đủ chưa.
5. **Đưa ra quyết định**:
   - Nếu đạt yêu cầu: Thực hiện quy trình [`.human/procedures/complete-task.md`](file:///d:/workspace/Algorithm-game-website/.human/procedures/complete-task.md).
   - Nếu cần sửa thêm: Ghi nhận nhận xét vào phần `HUMAN DECISION` trong file task và yêu cầu AI khắc phục.
