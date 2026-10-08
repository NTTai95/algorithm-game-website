# Các Lệnh Kiểm Thử & Kiểm Tra Chuẩn Code (Testing & Verification Commands)

## 1. Kiểm Tra Toàn Diện Bộ 4 Lệnh Bắt Buộc
Mỗi khi nghiệm thu task hoặc trước khi merge nhánh, chạy lần lượt 4 lệnh sau:

```bash
# 1. Kiểm tra kiểu dữ liệu TypeScript (0 lỗi)
npm run typecheck

# 2. Kiểm tra chuẩn cú pháp và quy tắc mã nguồn ESLint (0 lỗi, 0 cảnh báo)
npm run lint

# 3. Chạy toàn bộ bộ kiểm thử tự động một lần (100% pass)
npm run test:run

# 4. Kiểm tra khả năng đóng gói không lỗi
npm run build
```

## 2. Kiểm Thử Tương Tác Trong Khi Lập Trình (Watch Mode)
```bash
# Chạy Vitest ở chế độ theo dõi thay đổi file (tự động test lại khi lưu file)
npm run test
```
