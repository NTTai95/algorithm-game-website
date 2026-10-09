# Bộ Template Chuẩn Hóa Cho Tài Liệu Dự Án (.ai/templates/documentation)

Thư mục này chứa bộ biểu mẫu chuẩn mực để khởi tạo toàn bộ hệ thống tài liệu dự án (`.document/`). Toàn bộ các template trong thư mục này được thiết kế **hoàn toàn độc lập** với bất kỳ dự án cụ thể nào, cho phép mang sang dự án mới để tái sử dụng ngay lập tức.

---

## 1. Danh Mục Các Biểu Mẫu

| Tên Biểu Mẫu | Mục Đích Tài Liệu | Khi Nào Sử Dụng |
| :--- | :--- | :--- |
| [`PROJECT_OVERVIEW_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/PROJECT_OVERVIEW_TEMPLATE.md) | Giới thiệu tổng quan dự án, mục đích, người dùng mục tiêu, giá trị cốt lõi | Khởi tạo dự án hoặc cập nhật định vị sản phẩm |
| [`GOALS_AND_SCOPE_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/GOALS_AND_SCOPE_TEMPLATE.md) | Xác định mục tiêu, giới hạn phạm vi (In-scope/Out-of-scope), tiêu chí thành công | Lập kế hoạch dự án, phân kỳ giai đoạn |
| [`REQUIREMENTS_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/REQUIREMENTS_TEMPLATE.md) | Yêu cầu chức năng, phi chức năng, kịch bản người dùng, tiêu chí nghiệm thu | Định nghĩa tính năng trước khi thiết kế |
| [`ARCHITECTURE_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/ARCHITECTURE_TEMPLATE.md) | Kiến trúc tổng thể, phân tầng trách nhiệm, ranh giới hệ thống, quy tắc bất biến | Thiết kế kiến trúc nền tảng và các module lớn |
| [`SYSTEM_MAP_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/SYSTEM_MAP_TEMPLATE.md) | Sơ đồ cấu trúc thư mục, trách nhiệm module, điểm vào, bản đồ phụ thuộc | Quy hoạch cây thư mục mã nguồn và ranh giới |
| [`DOMAIN_MODEL_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/DOMAIN_MODEL_TEMPLATE.md) | Thực thể nghiệp vụ, mối quan hệ, quy tắc kinh doanh, từ vựng chung | Mô hình hóa miền nghiệp vụ trước khi code |
| [`MODULE_SPEC_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/MODULE_SPEC_TEMPLATE.md) | Đặc tả kỹ thuật chi tiết của một module con cụ thể | Phát triển hoặc tái cấu trúc một module lớn |
| [`API_CONTRACTS_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/API_CONTRACTS_TEMPLATE.md) | Hợp đồng giao diện công khai, chữ ký hàm, tham số, lỗi, trạng thái tương thích | Thiết lập API giữa các tầng hoặc module dùng chung |
| [`DATA_FLOW_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/DATA_FLOW_TEMPLATE.md) | Luồng di chuyển dữ liệu, sự kiện, sở hữu trạng thái, xử lý lỗi | Thiết kế các luồng xử lý phức tạp đa bước |
| [`TEST_STRATEGY_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/TEST_STRATEGY_TEMPLATE.md) | Chiến lược kiểm thử toàn diện, cấp độ test, ranh giới test, cổng nghiệm thu | Thiết lập quy trình đảm bảo chất lượng kỹ thuật |
| [`GLOSSARY_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/GLOSSARY_TEMPLATE.md) | Từ điển thuật ngữ, từ viết tắt, tên module, từ vựng chuyên ngành | Thống nhất ngôn ngữ giữa Con người và AI |
| [`ADR_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/ADR_TEMPLATE.md) | Nhật ký quyết định kiến trúc và kỹ thuật quan trọng | Ghi nhận quyết định kiến trúc sau khi Human duyệt |

---

## 2. Hệ Thống 4 Cấp Độ Xác Nhận (Confirmation Levels)

Mọi mục thông tin trong tài liệu sinh ra từ template bắt buộc phải được gán nhãn trạng thái rõ ràng:

1. `CONFIRMED`: Đã có quyết định chính thức hoặc được Human phê duyệt.
2. `PROPOSED`: AI đang đề xuất, chưa được con người đồng thuận.
3. `OPEN_QUESTION`: Thông tin còn thiếu, đang chờ giải đáp hoặc cần khảo sát thêm.
4. `IMPLEMENTED`: Đã được hiện thực hóa trong mã nguồn và kiểm chứng bằng test suite.

> **Quy Tắc An Toàn**:
> - AI tuyệt đối không tự nâng `PROPOSED` thành `CONFIRMED`.
> - Không tự ý bịa đặt nội dung giả định để lấp đầy các mục còn trống.

---

## 3. Quy Tắc Dẫn Chiếu Và Chống Lặp Nội Dung

- Mỗi tài liệu có một trách nhiệm duy nhất (Single Responsibility).
- Dẫn chiếu bằng đường dẫn tương đối hoặc Markdown link thay vì sao chép nguyên văn.
- Khi cập nhật thông tin, chỉ sửa ở tài liệu sở hữu nguồn sự thật gốc (Single Source of Truth).
