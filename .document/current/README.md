# Tài Liệu Dự Án Đang Hiệu Lực (.document/current)

Thư mục này lưu trữ các tài liệu mô tả hiện trạng, kiến trúc, ranh giới và quy tắc nghiệp vụ chính thức của dự án.

---

## 1. Nguyên Tắc Khởi Tạo Trống (Blank Slate)

- Khi bắt đầu một dự án mới (hoặc thiết lập lại hệ thống), thư mục này hoàn toàn để **TRỐNG**.
- Tài liệu chỉ được tạo ra khi một Sprint thực sự cần và đã được Human phê duyệt.

---

## 2. Các Loại Tài Liệu Được Phép Lưu Tại Đây (Khi Được Tạo)

Khi dự án phát triển qua các Sprint, các tài liệu sau có thể được tạo từ template tương ứng:
- `PROJECT_OVERVIEW.md`: Tổng quan dự án, sứ mệnh, bài toán giải quyết.
- `REQUIREMENTS.md`: Yêu cầu chức năng và phi chức năng tổng thể.
- `ARCHITECTURE.md`: Kiến trúc hệ thống, phân tầng và các quyết định kiến trúc.
- `SYSTEM_MAP.md`: Cấu trúc source code thực tế, trách nhiệm thư mục và ma trận ranh giới import.
- `GLOSSARY.md`: Thuật ngữ nghiệp vụ dùng chung.
- `API_CONTRACTS.md`: Hợp đồng giao diện, API và sự kiện giữa các module.
- `TEST_STRATEGY.md`: Chiến lược kiểm thử tự động và cổng kiểm soát chất lượng.

---

## 3. Quy Tắc Duy Trì

1. **Chỉ chứa tài liệu CONFIRMED**: Mọi tài liệu nằm trong `current/` phải ở trạng thái `CONFIRMED`.
2. **Cập nhật đồng bộ**: Khi một Sprint làm thay đổi kiến trúc hoặc API thực tế, tài liệu tương ứng tại đây phải được cập nhật ngay trong Sprint đó.
3. **Lưu trữ khi thay thế**: Nếu tài liệu bị thay thế toàn diện bởi phiên bản mới, tài liệu cũ phải được chuyển vào `archive/` hoặc gắn nhãn `DEPRECATED`.
