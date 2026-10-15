# Đặc Tả Yêu Cầu Kỹ Thuật (System Requirements) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: REQUIREMENTS
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

## 1. Yêu Cầu Chức Năng (Functional Requirements)

### FR-001: Khởi Tạo Trạng Thái Kho Hàng & Dữ Liệu Ban Đầu
- **Mã định danh**: `FR-001`
- **Trạng thái**: `CONFIRMED`
- **Mức độ ưu tiên**: `HIGH`
- **Mô tả**: Hệ thống cho phép khởi tạo mảng thùng hàng (Boxes) với số lượng và trọng số ngẫu nhiên hoặc do người dùng nhập vào.
- **Tiêu chí nghiệm thu**:
  - [ ] Mảng thùng hàng được sinh với các giá trị nguyên dương hợp lệ.
  - [ ] Mỗi thùng hàng được gán vị trí ô chứa (Slot) tương ứng trong nhà kho.

### FR-002: Lõi Mô Phỏng Thuật Toán Độc Lập (Simulation Engine)
- **Mã định danh**: `FR-002`
- **Trạng thái**: `CONFIRMED`
- **Mức độ ưu tiên**: `CRITICAL`
- **Mô tả**: Lõi mô phỏng nhận vào thuật toán sắp xếp (bắt đầu với Bubble Sort) và dữ liệu ban đầu, thực thi từng bước và phát ra các sự kiện nguyên tử tất định (`COMPARE`, `SWAP`, `LIFT`, `DROP`).
- **Tiêu chí nghiệm thu**:
  - [ ] Thực thi độc lập 100% trong môi trường Vitest / Node.js mà không cần Phaser hay React.
  - [ ] Sự kiện phát ra đầy đủ chỉ số ô chứa và thông tin so sánh/hoán đổi.

### FR-003: Hiển Thị Hoạt Ảnh Trên Khung Vẽ Phaser 3 (Visual Presentation)
- **Mã định danh**: `FR-003`
- **Trạng thái**: `CONFIRMED`
- **Mức độ ưu tiên**: `HIGH`
- **Mô tả**: Tầng Phaser 3 lắng nghe chuỗi sự kiện từ lõi mô phỏng và thực hiện hoạt ảnh tương ứng: Cần cẩu di chuyển đến ô chứa, hạ xuống nhấc thùng, so sánh, tráo đổi vị trí hoặc hạ thùng xuống.
- **Tiêu chí nghiệm thu**:
  - [ ] Cần cẩu di chuyển mượt mà, đúng tọa độ ô chứa.
  - [ ] Vị trí các thùng hàng trên màn hình khớp chính xác với trạng thái mảng dữ liệu logic.

### FR-004: Giao Diện Điều Khiển Người Dùng React (UI Controls)
- **Mã định danh**: `FR-004`
- **Trạng thái**: `CONFIRMED`
- **Mức độ ưu tiên**: `HIGH`
- **Mô tả**: Giao diện React hiển thị các nút điều khiển: Bắt đầu (Play), Tạm dừng (Pause), Bước tiếp theo (Step), Đặt lại (Reset), và Thanh trượt điều chỉnh tốc độ hoạt ảnh.
- **Tiêu chí nghiệm thu**:
  - [ ] Bấm Pause thì cần cẩu và thuật toán dừng lại tại điểm hoàn tất bước hiện tại.
  - [ ] Bấm Step thì thuật toán thực hiện đúng 1 bước nguyên tử tiếp theo.

---

## 2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### NFR-001: Khả Năng Kiểm Thử Không Cần Canvas (Headless Testability)
- **Mã định danh**: `NFR-001`
- **Trạng thái**: `CONFIRMED`
- **Loại yêu cầu**: `MAINTAINABILITY / TESTABILITY`
- **Mô tả**: Toàn bộ logic giải thuật và mô phỏng phải được kiểm thử tự động 100% trong Vitest mà không phụ thuộc canvas hay headless browser.

### NFR-002: Hiệu Năng & Độ Mượt Hoạt Ảnh (Frame Rate Performance)
- **Mã định danh**: `NFR-002`
- **Trạng thái**: `CONFIRMED`
- **Loại yêu cầu**: `PERFORMANCE`
- **Mô tả**: Hoạt ảnh của Phaser 3 phải duy trì ổn định ở 60 FPS trên các trình duyệt hiện đại tiêu chuẩn.

### NFR-003: Quản Lý Vòng Đời & Tránh Rò Rỉ Bộ Nhớ (Lifecycle Cleanliness)
- **Mã định danh**: `NFR-003`
- **Trạng thái**: `CONFIRMED`
- **Loại yêu cầu**: `RELIABILITY`
- **Mô tả**: Khi component React unmount, toàn bộ tài nguyên game Phaser (canvas, tweens, timers) phải được hủy bỏ sạch sẽ, không gây memory leak.

---

## 3. Bảng Theo Dõi Trạng Thái Yêu Cầu

| Mã Yêu Cầu | Tên Yêu Cầu | Loại | Trạng Thái | Giai Đoạn |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | Khởi tạo trạng thái kho hàng | Chức năng | CONFIRMED | Giai đoạn 1 |
| FR-002 | Lõi mô phỏng thuật toán | Chức năng | CONFIRMED | Giai đoạn 1 |
| FR-003 | Hoạt ảnh Phaser 3 | Chức năng | CONFIRMED | Giai đoạn 1 |
| FR-004 | Bảng điều khiển React UI | Chức năng | CONFIRMED | Giai đoạn 1 |
| NFR-001 | Kiểm thử không cần canvas | Phi chức năng | CONFIRMED | Xuyên suốt |
| NFR-002 | Hiệu năng 60 FPS | Phi chức năng | CONFIRMED | Xuyên suốt |
| NFR-003 | Quản lý vòng đời bộ nhớ | Phi chức năng | CONFIRMED | Xuyên suốt |
