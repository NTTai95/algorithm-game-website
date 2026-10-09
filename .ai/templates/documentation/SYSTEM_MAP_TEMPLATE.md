# SYSTEM_MAP_TEMPLATE.md

> **Mục Đích Tài Liệu**: Ánh xạ toàn bộ cấu trúc thư mục, các tệp/thư mục quan trọng, điểm vào thực thi, trách nhiệm của từng module và bản đồ phụ thuộc giữa chúng.  
> **Khi Nào Sử Dụng**: Khi thiết lập hoặc thay đổi cấu trúc mã nguồn, hỗ trợ AI nắm bắt bức tranh tổng thể trước khi code.  
> **Mục Bắt Buộc**: Cây thư mục hệ thống, Điểm vào chính, Trách nhiệm module, Bản đồ phụ thuộc giữa các gói.  
> **Mục Tùy Chọn**: Quy ước đặt tên file, Hướng dẫn điều hướng nhanh.  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `ARCHITECTURE.md` cho lý thuyết kiến trúc và `modules/` cho đặc tả chi tiết từng module con.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Đánh dấu các module `[CONFIRMED]`, `[PROPOSED]` hoặc `[CHƯA TRIỂN KHAI]`.

---

# Bản Đồ Hệ Thống & Cấu Trúc Thư Mục (System Map)

```yaml
DOCUMENT_TYPE: SYSTEM_MAP
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Cấu Trúc Thư Mục Tổng Thể (Directory Tree)

```
src/
├── app/               # Điểm khởi tạo và cấu hình ứng dụng chính
├── assets/            # Tài nguyên tĩnh (ảnh, âm thanh, fonts)
├── components/        # Các thành phần giao diện người dùng dùng chung
├── core/              # Lõi nghiệp vụ, domain models, thuật toán độc lập
├── game/              # Hệ thống trò chơi, tích hợp engine trình diễn
├── pages/             # Các trang ứng dụng hoặc màn hình chính
├── styles/            # Định kiểu dáng và CSS toàn cục
└── test/              # Môi trường kiểm thử và các test dùng chung
```

## 2. Điểm Vào Của Hệ Thống (Entry Points)
- **Application Entry Point**: `src/main.tsx` (hoặc tương đương) - Điểm khởi động ứng dụng.
- **Root Component**: `src/App.tsx` - Khung giao diện cấp cao nhất.
- **Global Styles**: `src/styles/index.css` - Thiết lập thiết kế nền tảng.
- **Test Entry Point**: `src/test/` - Nơi chứa cấu hình và test hạ tầng.

## 3. Trách Nhiệm Của Từng Module (Module Responsibilities)

| Thư Mục / Module | Trách Nhiệm Chính | Tầng Kiến Trúc | Trạng Thái |
| :--- | :--- | :--- | :--- |
| `src/app/` | Khởi tạo môi trường, thiết lập ngữ cảnh | Application | CONFIRMED |
| `src/core/` | Lõi thuật toán, thực thể miền thuần túy | Domain / Core | CONFIRMED |
| `src/game/` | Điều phối màn chơi, cầu nối hiển thị | Game Systems | CONFIRMED |
| `src/components/` | Giao diện nút bấm, bảng điều khiển, HUD | UI Shell | CONFIRMED |
| `src/pages/` | Màn hình chọn bài học, màn hình chơi | Application | CONFIRMED |

## 4. Ma Trận Phụ Thuộc (Dependency Matrix)
Nguyên tắc: Module chỉ được phép import từ các module mà nó phụ thuộc hợp lệ.

- `src/core/`: **CẤM** import từ bất kỳ module nào khác trong `src/` (hoàn toàn độc lập).
- `src/game/`: Được phép import từ `src/core/`. **CẤM** import từ `src/components/` hoặc `src/pages/`.
- `src/components/`: Được phép import các types từ `src/core/`.
- `src/app/` & `src/pages/`: Được phép kết nối các tầng lại với nhau thông qua cầu nối giao tiếp.

## 5. Quy Ước Đặt Tên Tệp Tin (File Naming Conventions)
- **Component**: PascalCase (ví dụ: `ControlPanel.tsx`).
- **Module logic / Service**: camelCase (ví dụ: `simulationEngine.ts`).
- **Domain entity / Model**: PascalCase hoặc camelCase tùy quy chuẩn dự án.
- **Test file**: Đặt cạnh file cần test hoặc trong `src/test/`, định dạng `*.test.ts`.
