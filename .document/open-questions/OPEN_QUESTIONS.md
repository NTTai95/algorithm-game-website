# Danh Sách Các Câu Hỏi & Quyết Định Còn Mở (Open Questions) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: OPEN_QUESTIONS
STATUS: OPEN
LAST_UPDATED: 2026-10-09
```

Tài liệu này theo dõi các câu hỏi thiết kế, các quyết định còn bỏ ngỏ hoặc chưa đủ thông tin cần Human Developer phân xử. AI tuyệt đối **KHÔNG ĐƯỢC TỰ Ý SUY ĐOÁN** hoặc biến các câu hỏi mở này thành quyết định đã được duyệt (`CONFIRMED`).

---

## 1. Danh Sách Câu Hỏi Kiến Trúc & Thiết Kế Đang Chờ Quyết Định

### OQ-001: Đặc Tả Chi Tiết Cơ Chế Hoạt Động Của Cần Cẩu (SingleCrane vs DoubleCrane)
- **Trạng thái**: `OPEN_QUESTION`
- **Mô tả**: Trong giai đoạn 1 với Bubble Sort, một cần cẩu đơn (`SingleCrane`) tuần tự nhấc từng thùng hàng là đủ, hay cần thiết kế ngay mô hình hai tay gắp/hai cần cẩu (`DoubleCrane`) để so sánh đồng thời 2 thùng hàng?
- **Khuyến nghị của AI**: Bắt đầu với `SingleCrane` để tối giản độ phức tạp giai đoạn MVP; tạo interface mở để nâng cấp `DoubleCrane` khi làm việc với thuật toán 2 con trỏ hoặc Quick Sort.
- **Quyết định của Human**: [Chờ phản hồi]

### OQ-002: Lộ Trình Các Thuật Toán Sắp Xếp Tiếp Theo Sau Bubble Sort
- **Trạng thái**: `OPEN_QUESTION`
- **Mô tả**: Sau khi hoàn tất Bubble Sort, thuật toán tiếp theo nên là Insertion Sort, Selection Sort hay Quick Sort?
- **Quyết định của Human**: [Chờ phản hồi]

### OQ-003: Định Dạng Cấu Trúc Dữ Liệu Của Màn Chơi (Level Configuration Schema)
- **Trạng thái**: `OPEN_QUESTION`
- **Mô tả**: Màn chơi giáo dục sẽ được định nghĩa bằng JSON tĩnh (Static JSON config) hay sinh ngẫu nhiên theo seed? Các thử thách tương tác người chơi (Quiz/Prediction) sẽ có schema cụ thể như thế nào?
- **Quyết định của Human**: [Chờ phản hồi]

### OQ-004: Pipeline Quản Lý Tài Nguyên Đồ Họa Của Trò Chơi
- **Trạng thái**: `OPEN_QUESTION`
- **Mô tả**: Tài nguyên hình ảnh (Spritesheets cần cẩu, thùng hàng, background nhà kho) sẽ sử dụng đồ họa pixel art, vector SVG hay kết hợp các hình khối hình học vẽ bằng Phaser Graphics trong giai đoạn đầu?
- **Khuyến nghị của AI**: Sử dụng Phaser Graphics vẽ hình khối kết hợp biểu tượng tối giản trong giai đoạn đầu để tập trung hoàn thiện logic và tương tác trước khi tích hợp assets mỹ thuật chi tiết.
- **Quyết định của Human**: [Chờ phản hồi]
