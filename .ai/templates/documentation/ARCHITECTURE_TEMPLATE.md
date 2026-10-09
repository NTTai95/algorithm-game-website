# ARCHITECTURE_TEMPLATE.md

> **Mục Đích Tài Liệu**: Đặc tả kiến trúc tổng thể của hệ thống: mục tiêu kiến trúc, ranh giới hệ thống, các tầng phân tách, nguyên tắc phụ thuộc một chiều, sở hữu trạng thái, điểm mở rộng và các quyết định đã duyệt.  
> **Khi Nào Sử Dụng**: Thiết lập nền tảng kỹ thuật ban đầu của dự án, hoặc khi có đề xuất tái cấu trúc tầng kiến trúc.  
> **Mục Bắt Buộc**: Mục tiêu kiến trúc, Phân tầng trách nhiệm, Ranh giới phụ thuộc, Sở hữu dữ liệu & trạng thái, Cơ chế giao tiếp, Các quyết định đã phê duyệt.  
> **Mục Tùy Chọn**: Biểu đồ thành phần, Điểm mở rộng trong tương lai, Câu hỏi kiến trúc chưa giải quyết.  
> **Quy Tắc Dẫn Chiếu**: Dẫn sang `SYSTEM_MAP.md` cho sơ đồ thư mục, `interfaces/API_CONTRACTS.md` cho chữ ký cụ thể, và `decisions/ADR/` cho lịch sử quyết định.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Phân tách rõ ràng giữa kiến trúc `CONFIRMED` và các phương án `PROPOSED`.

---

# Kiến Trúc Hệ Thống (System Architecture)

```yaml
DOCUMENT_TYPE: ARCHITECTURE
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Mục Tiêu Kiến Trúc (Architectural Goals)
1. **[Tính tách rời / Decoupling]**: [Mô tả mục tiêu phân tách giữa logic và giao diện/trình diễn]
2. **[Khả năng kiểm thử / Testability]**: [Mô tả khả năng kiểm thử độc lập mà không cần môi trường hiển thị]
3. **[Khả năng mở rộng / Extensibility]**: [Mô tả cách thức hệ thống đón nhận tính năng mới mà không sửa lõi]
4. **[Hiệu năng & Ổn định / Performance & Stability]**: [Mục tiêu kiểm soát tài nguyên và bộ nhớ]

## 2. Phân Tầng Trách Nhiệm (Layered Architecture)
Mô hình phụ thuộc một chiều từ trên xuống dưới:

```
[Layer 1: Application / UI Shell]
       ↓ (chỉ phụ thuộc tầng dưới)
[Layer 2: Domain Systems / Orchestration]
       ↓
[Layer 3: Core Domain / Simulation]
       ↓ (độc lập hoàn toàn với tầng hiển thị)
[Layer 4: Rendering / Presentation]
```

### Chi Tiết Từng Tầng:
- **Tầng 1 - [Tên Tầng 1]**:
  - Trách nhiệm: [Mô tả trách nhiệm cốt lõi]
  - Thành phần: [Các component/modules chính]
  - Ràng buộc: [Những gì tầng này KHÔNG được phép làm]
- **Tầng 2 - [Tên Tầng 2]**:
  - Trách nhiệm: [Mô tả trách nhiệm cốt lõi]
  - Thành phần: [Các component/modules chính]
  - Ràng buộc: [Những gì tầng này KHÔNG được phép làm]
- **Tầng 3 - [Tên Tầng 3]**:
  - Trách nhiệm: [Mô tả trách nhiệm cốt lõi]
  - Thành phần: [Các component/modules chính]
  - Ràng buộc: [Những gì tầng này KHÔNG được phép làm]

## 3. Ranh Giới Hệ Thống & Nguyên Tắc Bất Biến (System Boundaries & Invariants)
- **Bất biến 1 [CONFIRMED]**: [Ví dụ: Lõi domain không được import thư viện rendering hoặc UI]
- **Bất biến 2 [CONFIRMED]**: [Ví dụ: Trạng thái nguồn sự thật duy nhất (Single Source of Truth)]
- **Bất biến 3 [CONFIRMED]**: [Ví dụ: Giao tiếp qua luồng sự kiện tất định (Deterministic Events)]

## 4. Quyền Sở Hữu Dữ Liệu & Quản Lý Trạng Thái (Data Ownership & State Management)
- **Chủ sở hữu trạng thái gốc (State Authority)**: [Module nào chịu trách nhiệm lưu trữ và biến đổi state?]
- **Luồng truyền trạng thái**: [Cách thức state được thông báo hoặc đồng bộ sang các tầng khác]
- **Ngăn ngừa xung đột**: [Cách đảm bảo không có 2 nguồn sự thật cạnh tranh nhau]

## 5. Cơ Chế Giao Tiếp Giữa Các Module (Inter-Module Communication)
- **Mô hình giao tiếp**: [Event-driven, Callbacks, Direct API calls, Pub/Sub,...]
- **Quy chuẩn sự kiện**: [Cấu trúc thông điệp sự kiện truyền giữa các tầng]

## 6. Điểm Mở Rộng Hệ Thống (Extension Points)
- **Plugin / Pluggable Interface**: [Cách cắm thêm thuật toán/tính năng mới]
- **Adapter Layer**: [Khả năng thay thế thư viện bên thứ ba mà không sửa đổi domain]

## 7. Các Quyết Định Kiến Trúc Đã Phê Duyệt (Approved Decisions)
- [ADR-001: Tên quyết định](./decisions/ADR/ADR-001.md) - `CONFIRMED`

## 8. Các Câu Hỏi Kiến Trúc Chưa Giải Quyết (Unresolved Architecture Questions)
- **AQ-001 [OPEN_QUESTION]**: [Vấn đề kiến trúc đang thảo luận - Tham chiếu open-questions/OPEN_QUESTIONS.md]
