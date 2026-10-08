# Các Lệnh Môi Trường Phát Triển & Đóng Gói (Development Commands)

## 1. Cài Đặt Gói Phụ Thuộc
```bash
# Cài đặt dependencies (sử dụng npm.cmd trên Windows PowerShell)
npm install
```

## 2. Khởi Động Máy Chủ Phát Triển (Dev Server)
```bash
# Chạy Vite dev server tại cổng mặc định 5173
npm run dev

# Chạy và mở trực tiếp trình duyệt
npm run dev -- --open
```

## 3. Đóng Gói & Xem Trước Production (Build & Preview)
```bash
# Đóng gói sản phẩm (chạy typecheck và vite build)
npm run build

# Xem trước bản đóng gói production tại máy cục bộ
npm run preview
```
