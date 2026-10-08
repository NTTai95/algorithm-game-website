# Quy Trình: Kiểm Tra & Nghiệm Thu Task (Review Task)

Quy trình này áp dụng khi AI đã hoàn tất lập trình và chuyển trạng thái task sang `READY_FOR_REVIEW`.

---

## Các Bước Thực Hiện:

1. **Kiểm tra thông báo hoàn tất của AI**:
   - Đọc file nhật ký phiên mới nhất trong `.ai/sessions/` để xem danh sách file đã tạo/sửa, kết quả kiểm thử, và đặc biệt là các mục `PROPOSALS_CREATED` và `PROPOSALS_REFERENCED`.
2. **Kiểm tra lịch sử commit và tách biệt commit**:
   - Chạy lệnh kiểm tra commit trên nhánh task:
     ```bash
     git log develop..task/TASK-XXX-<slug> --oneline
     ```
   - Xác nhận có sự tách biệt rõ ràng giữa commit mã nguồn (`TASK-XXX: ...`) và commit đề xuất (`PROP-XXX: ...` nếu có).
3. **Kiểm tra diff mã nguồn và đề xuất**:
   - So sánh các thay đổi trên nhánh task với nhánh `develop`:
     ```bash
     git diff develop..task/TASK-XXX-<slug>
     ```
   - Nếu có file `.ai/changes/proposals/PROP-XXX.md`, đọc kỹ đề xuất xem có hợp lý không.
4. **Chạy kiểm tra độc lập trên máy con người**:
   ```bash
   npm run typecheck
   npm run lint
   npm run test:run
   npm run build
   ```
5. **Đối chiếu Tiêu chí Nghiệm thu (Acceptance Criteria)**:
   - Mở file `.ai/tasks/active/TASK-XXX.md` và kiểm tra bảng `RELATED_PROPOSALS` cùng các tiêu chí nghiệm thu đã đạt 100% chưa.
6. **Đưa ra quyết định (Human Decisions)**:
   - **Đối với Mã Nguồn Task**:
     - Nếu đạt yêu cầu: Thực hiện quy trình [`.human/procedures/complete-task.md`](file:///d:/workspace/Algorithm-game-website/.human/procedures/complete-task.md).
     - Nếu cần sửa thêm: Ghi nhận nhận xét vào phần `HUMAN DECISION` trong file task và yêu cầu AI khắc phục.
   - **Đối với Đề Xuất (PROP-XXX nếu có)**:
     - Ghi nhận phán quyết vào trường `HUMAN_DECISION` trong file đề xuất: `APPROVE`, `REJECT`, hoặc `DEFER`.
     - *Lưu ý*: Việc duyệt đề xuất (`APPROVE`) không làm thay đổi scope hiện tại của task mà sẽ được đưa vào backlog cho sprint tiếp theo.
