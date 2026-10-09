# Chiến Lược Kiểm Thử Dự Án (Project Test Strategy) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: TEST_STRATEGY
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

Tài liệu này xác định các tiêu chuẩn kiểm thử tự động và cổng kiểm soát chất lượng kỹ thuật bắt buộc của dự án.

---

## 1. Triết Lý Kiểm Thử

1. **Khả Năng Kiểm Thử Không Cần Đầu (100% Headless Testable)**:
   - Toàn bộ các thuật toán DSA, logic nhà kho, các bước di chuyển của cần cẩu và bộ phát sự kiện phải được kiểm thử tự động 100% bằng Vitest mà không cần trình duyệt, không cần DOM và không cần khởi tạo canvas.
2. **Kiểm Thử Tính Tất Định (Deterministic Testing)**:
   - Các thuật toán sắp xếp phải được kiểm thử với các trường hợp dữ liệu cụ thể: mảng rỗng, mảng 1 phần tử, mảng đã sắp xếp, mảng đảo ngược, mảng có phần tử trùng lặp.
   - Kết quả các bước chạy và sự kiện sinh ra phải hoàn toàn có thể dự đoán trước được (deterministic).

---

## 2. Các Cấp Độ Kiểm Thử Trong Dự Án

### 2.1. Unit Testing (Kiểm Thử Đơn Vị)
- **Vị trí**: Đặt cạnh file nguồn hoặc trong thư mục `src/test/`.
- **Phạm vi**:
  - Các hàm tiện ích, cấu trúc dữ liệu cơ bản.
  - Từng thuật toán sắp xếp độc lập (Bubble Sort, etc.).
  - Các hàm tính toán tọa độ logic của ô chứa và thùng hàng.
- **Lệnh chạy**: `npm run test:run`.

### 2.2. Feature & State Transition Testing (Kiểm Thử Chuyển Đổi Trạng Thái)
- **Phạm vi**:
  - Chuỗi phát sinh sự kiện từ đầu đến cuối của một màn chơi mô phỏng.
  - Kiểm tra trạng thái kho hàng sau khi thuật toán kết thúc có đúng là mảng đã sắp xếp hay không.

### 2.3. Regression Testing (Kiểm Thử Hồi Quy)
- **Phạm vi**: Toàn bộ các test suite hiện có trong kho mã nguồn.
- **Yêu cầu**: 100% test cũ phải tiếp tục pass khi thêm tính năng mới.

---

## 3. Cổng Kiểm Soát Chất Lượng Bắt Buộc (Quality Verification Gates)

Một task chỉ được coi là hoàn tất về mặt kỹ thuật và đủ điều kiện đánh dấu `READY_FOR_REVIEW` khi vượt qua đầy đủ 5 cổng:

| Cổng | Lệnh Thực Thi | Tiêu Chuẩn Đạt |
| :--- | :--- | :--- |
| **Gate 1: Typecheck** | `npm run typecheck` | 0 lỗi TypeScript (`tsc -b`) |
| **Gate 2: Lint** | `npm run lint` | 0 lỗi, 0 cảnh báo ESLint |
| **Gate 3: Tests** | `npm run test:run` | 100% test cases pass |
| **Gate 4: Build** | `npm run build` | Đóng gói production thành công |
| **Gate 5: Docs** | Đối chiếu tài liệu | Đồng bộ task status, session log và các hợp đồng liên quan |
