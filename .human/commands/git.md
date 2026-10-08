# Các Câu Lệnh Git Thường Dùng (Git Commands)

## 1. Đồng Bộ Mã Nguồn
```bash
# Kiểm tra trạng thái làm việc
git status

# Xem lịch sử commit ngắn gọn
git log --oneline -n 10

# Kéo mã nguồn mới nhất từ develop
git checkout develop
git pull origin develop
```

## 2. Quản Lý Nhánh Task
```bash
# Tạo nhánh task mới bắt nguồn từ develop
git checkout -b task/TASK-001-warehouse-domain develop

# Đẩy nhánh task lên remote lần đầu
git push -u origin task/TASK-001-warehouse-domain

# Xem tất cả các nhánh
git branch -a
```

## 3. Merge Nhánh Task Vào Develop (Dành Riêng Cho Human)
```bash
# Chuyển sang develop
git checkout develop

# Merge nhánh task (tạo commit merge rõ ràng)
git merge --no-ff task/TASK-001-warehouse-domain -m "Merge task/TASK-001-warehouse-domain into develop"

# Đẩy develop đã tích hợp lên remote
git push origin develop
```
