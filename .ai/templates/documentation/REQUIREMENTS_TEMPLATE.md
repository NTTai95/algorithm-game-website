# REQUIREMENTS_TEMPLATE.md

> **Mục Đích Tài Liệu**: Đặc tả toàn diện các yêu cầu chức năng (FR) và phi chức năng (NFR), kịch bản người dùng và tiêu chí nghiệm thu kiểm thử được.  
> **Khi Nào Sử Dụng**: Khi phân tích nghiệp vụ, lập danh sách tính năng cho sản phẩm trước khi chuyển giao thành task.  
> **Mục Bắt Buộc**: Mã yêu cầu (FR-xxx, NFR-xxx), Mô tả, Mức độ ưu tiên, Kịch bản người dùng, Tiêu chí nghiệm thu, Trạng thái.  
> **Mục Tùy Chọn**: Phụ thuộc giữa các yêu cầu, Ma trận truy xuất nguồn gốc (Traceability matrix).  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `GOALS_AND_SCOPE.md` để chứng minh tính phù hợp phạm vi và `domain/DOMAIN_MODEL.md` cho các thực thể.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Đánh dấu trạng thái yêu cầu (`CONFIRMED`, `PROPOSED`, `OPEN_QUESTION`, `IMPLEMENTED`).

---

# Đặc Tả Yêu Cầu Kỹ Thuật (System Requirements)

```yaml
DOCUMENT_TYPE: REQUIREMENTS
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Yêu Cầu Chức Năng (Functional Requirements)

### FR-001: [Tên Yêu Cầu 1]
- **Mã định danh**: `FR-001`
- **Trạng thái**: `[CONFIRMED | PROPOSED | OPEN_QUESTION | IMPLEMENTED]`
- **Mức độ ưu tiên**: `[CRITICAL | HIGH | MEDIUM | LOW]`
- **Mô tả**: [Mô tả chi tiết hành vi mà hệ thống phải thực hiện]
- **Kịch bản người dùng (User Scenario)**:
  - *Khi*: [Điều kiện kích hoạt / Hành động của người dùng]
  - *Thì*: [Phản hồi / Kết quả xử lý của hệ thống]
- **Tiêu chí nghiệm thu (Acceptance Criteria)**:
  - [ ] AC1: [Tiêu chí cụ thể 1]
  - [ ] AC2: [Tiêu chí cụ thể 2]

---

## 2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### NFR-001: [Tên Yêu Cầu Phi Chức Năng - Ví dụ: Hiệu Năng / Độ Trễ]
- **Mã định danh**: `NFR-001`
- **Trạng thái**: `[CONFIRMED | PROPOSED]`
- **Loại yêu cầu**: `[PERFORMANCE | USABILITY | RELIABILITY | SECURITY | MAINTAINABILITY]`
- **Mô tả**: [Quy chuẩn định lượng cần thỏa mãn]
- **Tiêu chí đo lường (Measurement Criteria)**:
  - [Chỉ số cụ thể, ví dụ: Thời gian phản hồi < 100ms, tỷ lệ khung hình >= 60 FPS]

---

## 3. Ràng Buộc Kỹ Thuật (Constraints)
- **C-001**: [Ràng buộc về nền tảng/môi trường vận hành]
- **C-002**: [Ràng buộc về khả năng tương thích trình duyệt/thiết bị]

---

## 4. Bảng Theo Dõi Trạng Thái Yêu Cầu (Requirements Traceability)

| ID | Tên Yêu Cầu | Loại | Trạng Thái | Task Triển Khai | Ghi Chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FR-001 | [Tên yêu cầu] | FR | CONFIRMED | [TASK-XXX hoặc CHƯA GIAO] | - |
| NFR-001 | [Tên yêu cầu] | NFR | CONFIRMED | [TASK-XXX hoặc CHƯA GIAO] | - |
