# GOALS_AND_SCOPE_TEMPLATE.md

> **Mục Đích Tài Liệu**: Phân định rạch ròi mục tiêu (Goals/Non-goals) và ranh giới phạm vi (Scope/Out-of-scope) để ngăn ngừa tình trạng trôi dạt phạm vi (scope creep).  
> **Khi Nào Sử Dụng**: Khi khởi tạo dự án, bắt đầu một milestone/release mới hoặc khi phân định ranh giới cho giai đoạn MVP.  
> **Mục Bắt Buộc**: Mục tiêu chính, Non-goals, Trong phạm vi, Ngoài phạm vi, Ràng buộc, Tiêu chí thành công.  
> **Mục Tùy Chọn**: Phân kỳ theo giai đoạn (Phase 1, Phase 2), Các quyết định còn mở.  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `REQUIREMENTS.md` cho các tính năng chi tiết và `ARCHITECTURE.md` cho giới hạn kỹ thuật.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Sử dụng nhãn `[CONFIRMED]` cho mục tiêu đã duyệt và `[OPEN_QUESTION]` cho phạm vi đang thảo luận.

---

# Mục Tiêu & Phạm Vi Dự Án (Goals and Scope)

```yaml
DOCUMENT_TYPE: GOALS_AND_SCOPE
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Mục Tiêu Dự Án (Project Goals)
Các mục tiêu cốt lõi mà dự án bắt buộc phải đạt được:
- **G1 [CONFIRMED]**: [Mục tiêu 1]
- **G2 [CONFIRMED]**: [Mục tiêu 2]
- **G3 [PROPOSED]**: [Mục tiêu 3 - Đang đề xuất]

## 2. Những Điều Không Phải Mục Tiêu (Non-Goals)
Những khía cạnh dự án chủ động quyết định **KHÔNG** theo đuổi để tối ưu hóa nguồn lực:
- **NG1 [CONFIRMED]**: [Non-goal 1 - Ví dụ: Không xây dựng mạng xã hội nội bộ]
- **NG2 [CONFIRMED]**: [Non-goal 2 - Ví dụ: Không hỗ trợ thiết bị cấu hình quá thấp]

## 3. Ranh Giới Phạm Vi (Scope Boundaries)

### 3.1. Thuộc Phạm Vi Hiện Tại (In-Scope)
- [Tính năng/Thành phần 1 nằm trong giai đoạn hiện tại]
- [Tính năng/Thành phần 2 nằm trong giai đoạn hiện tại]

### 3.2. Nằm Ngoài Phạm Vi Hiện Tại (Out-of-Scope)
- [Tính năng/Ý tưởng bị hoãn hoặc không thuộc phạm vi này]
- [Các tích hợp chưa cần thiết trong giai đoạn này]

## 4. Các Ràng Buộc Khách Quan (Constraints)
- **Ràng buộc công nghệ**: [Ví dụ: Không dùng thư viện bên ngoài không cần thiết]
- **Ràng buộc hiệu năng**: [Ví dụ: Tải trang dưới 2 giây, chạy 60 FPS]
- **Ràng buộc kiến trúc**: [Ví dụ: Mô phỏng độc lập hoàn toàn với tầng hiển thị]

## 5. Tiêu Chí Thành Công (Success Criteria)
- [ ] **SC1**: [Tiêu chí đo lường được 1]
- [ ] **SC2**: [Tiêu chí đo lường được 2]

## 6. Các Quyết Định Còn Mở (Open Decisions)
- **OD1 [OPEN_QUESTION]**: [Vấn đề chưa chốt phạm vi - Liên kết tới open-questions/OPEN_QUESTIONS.md]
