# Hướng Dẫn Quản Trị Git Cho Lập Trình Viên (Git Architecture Guide)

Git là xương sống kết nối giữa 2 lập trình viên con người và các phiên AI chạy trên các máy tính khác nhau.

---

## 1. Cấu Trúc Nhánh Và Quyền Hạn Tích Hợp

```
main (Bản phát hành chính thức, tài liệu gốc)
  ▲
  │ (Human merge develop -> main sau khi kết thúc Sprint)
  │
develop (Nhánh tích hợp các tính năng đã hoàn thiện)
  ▲
  │ (Human merge task/* -> develop sau khi duyệt PR/diff)
  │
task/TASK-XXX-<slug> (Các nhánh lập trình tính năng của AI)
```

- **Quy tắc vàng**: **Chỉ có Con Người mới thực hiện lệnh `merge`**. AI bị cấm tự ý merge vào `develop` hoặc `main`.

---

## 2. Quy Trình Merge Nhánh Task Vào `develop`
Khi AI hoàn thành task và chuyển trạng thái sang `READY_FOR_REVIEW`:
1. Chuyển sang nhánh `develop` trên máy của bạn và kéo code mới nhất:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Kiểm tra diff của nhánh task:
   ```bash
   git diff develop..task/TASK-XXX-<slug>
   ```
3. Merge nhánh task vào `develop` (khuyến khích dùng cờ `--no-ff` để lưu vết lịch sử):
   ```bash
   git merge --no-ff task/TASK-XXX-<slug> -m "Merge task/TASK-XXX-<slug> into develop"
   ```
4. Chạy kiểm tra tích hợp:
   ```bash
   npm run typecheck
   npm run lint
   npm run test:run
   npm run build
   ```
5. Đẩy nhánh `develop` lên GitHub:
   ```bash
   git push origin develop
   ```
6. Đóng task: Chuyển file từ `.ai/tasks/active/TASK-XXX.md` sang `.ai/tasks/completed/TASK-XXX.md`, cập nhật `STATUS: DONE`.
