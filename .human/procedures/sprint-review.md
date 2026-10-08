# Quy Trình: Đánh Giá & Kết Thúc Sprint (Sprint Review Procedure)

Quy trình này áp dụng khi toàn bộ các task trong sprint hiện tại đã được merge vào `develop`.

---

## Các Bước Thực Hiện:
1. **Chuyển sang nhánh `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. **Chỉ đạo AI chạy kiểm thử hồi quy và đánh giá tổng thể bằng prompt**:
   Gửi prompt cho AI:
   > *"TEST toàn bộ hệ thống trên develop và REPORT đánh giá sprint. Chạy typecheck, lint, test:run, build. Phân tích tính tương thích giữa các tính năng vừa tích hợp, liệt kê nợ kỹ thuật (nếu có) và ghi báo cáo vào .human/notes/."*
   *(Lưu ý: Bạn **không cần chỉnh sửa `CONTROL.md`**; AI trên nhánh `develop` tự động tuân thủ Branch Rules: cấm sửa `/src/`, chỉ chạy test và lập báo cáo).*
3. **Phát hành Sprint (Release to Main)**:
   Sau khi con người duyệt báo cáo đánh giá sprint trên `develop`:
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff develop -m "Release Sprint X: integrate completed features"
   git push origin main
   ```
4. **Bắt đầu Sprint tiếp theo**: Chuyển sang chuẩn bị task cho sprint mới.
