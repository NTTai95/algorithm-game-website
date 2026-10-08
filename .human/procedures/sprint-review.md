# Quy Trình: Đánh Giá & Kết Thúc Sprint (Sprint Review Procedure)

Quy trình này áp dụng khi toàn bộ các task trong sprint hiện tại đã được merge vào `develop`.

---

## Các Bước Thực Hiện:
1. **Chuyển sang nhánh `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. **Cấu hình AI ở chế độ DEVELOP**:
   Mở `.ai/CONTROL.md` và đặt:
   ```yaml
   MODE: DEVELOP
   CURRENT_TASK: NONE
   COMMAND: VERIFY
   ALLOW_CODE: NO
   ALLOW_TEST: YES
   ALLOW_COMMIT: YES
   ```
3. **Chỉ đạo AI chạy kiểm thử hồi quy và đánh giá tổng thể**:
   Prompt cho AI:
   > *"Hãy chạy kiểm tra typecheck, lint, toàn bộ bộ test và build trên develop. Phân tích tính tương thích giữa các tính năng vừa hoàn thành, lập danh sách nợ kỹ thuật (nếu có) và viết ghi chú đánh giá sprint vào .human/notes/."*
4. **Phát hành Sprint (Release to Main)**:
   Sau khi con người duyệt báo cáo đánh giá sprint trên `develop`:
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff develop -m "Release Sprint X: integrate completed features"
   git push origin main
   ```
5. **Bắt đầu Sprint tiếp theo**: Chuyển sang chuẩn bị task cho sprint mới.
