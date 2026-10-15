# Mô Hình Miền Nghiệp Vụ & Từ Vựng Khái Niệm (Domain Model) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: DOMAIN_MODEL
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

Tài liệu này ghi nhận các khái niệm miền nghiệp vụ đã được thừa nhận cho nền tảng trò chơi giáo dục giải thuật. Chi tiết các kiểu dữ liệu và chữ ký API TypeScript sẽ được thiết lập theo từng task được giao.

---

## 1. Các Khái Niệm Cốt Lõi Ban Đầu (Initial Core Concepts)

- **Trò chơi (Game) [CONFIRMED]**: Trải nghiệm giáo dục tương tác cấp cao nhất bao bọc một chủ đề DSA cụ thể.
- **Nhà kho (Warehouse) [CONFIRMED]**: Ẩn dụ vật lý chính cho các thuật toán sắp xếp; chứa các dãy vị trí lưu trữ (storage bays/slots) và khu vực thao tác.
- **Thùng hàng (Box) [CONFIRMED]**: Một phần tử dữ liệu đơn lẻ cần được sắp xếp theo thứ tự, có trọng lượng/giá trị nhận diện (`value`), chỉ số hiển thị (`visual index`), và vị trí ô chứa hiện tại (`slot index`).
- **Cần cẩu (Crane) [CONFIRMED]**: Tác nhân cơ học thực thi các thao tác di chuyển, so sánh, nhấc bổng (`lift`), hoán đổi (`swap`) và hạ xuống (`drop`) các thùng hàng.
- **Thuật toán sắp xếp (Sorting Algorithm) [CONFIRMED]**: Quy trình DSA nền tảng được trình diễn (ví dụ: Bubble Sort, Insertion Sort, Quick Sort, Merge Sort).
- **Mô phỏng (Simulation) [CONFIRMED]**: Luồng thực thi tất định chạy thuật toán sắp xếp theo từng bước và theo dõi trạng thái cấu trúc dữ liệu.
- **Sự kiện mô phỏng (Simulation Event) [CONFIRMED]**: Thao tác nguyên tử được phát ra trong lúc thực thi mô phỏng:
  - `COMPARE(i, j)`: So sánh giá trị giữa 2 ô chứa.
  - `SWAP(i, j)`: Hoán đổi vị trí của 2 thùng hàng.
  - `MOVE(from, to)`: Di chuyển thùng hàng hoặc cần cẩu giữa 2 vị trí.
  - `HIGHLIGHT(index)`: Đánh dấu ô chứa hoặc thùng hàng đang được chú ý.

---

## 2. Các Khái Niệm Mở Rộng Dự Kiến Trong Tương Lai (Potential Future Concepts)

- **SingleCrane [OPEN_QUESTION]**: Mô hình cần cẩu đơn điểm hỗ trợ các thao tác tuần tự một vị trí tại một thời điểm.
- **DoubleCrane [OPEN_QUESTION]**: Mô hình cần cẩu đôi cho phép trực quan hóa các giải thuật hai con trỏ (Two Pointers) hoặc sắp xếp song song.
- **Replay / Time-Travel [OPEN_QUESTION]**: Bộ điều khiển phát lại tất định cho phép tua lùi, dừng, và bước ngược qua lịch sử thực thi của thuật toán.
- **Level [OPEN_QUESTION]**: Cấp độ tiến trình giáo dục với các ràng buộc, kích thước dữ liệu và mục tiêu bài học khác nhau.
- **Score [OPEN_QUESTION]**: Chỉ số đánh giá người học: độ chính xác khi dự đoán bước đi tiếp theo, mức độ hiểu độ phức tạp giải thuật.

---

## 3. Quy Tắc Nghiệp Vụ Bất Biến (Domain Invariants)
1. **Tính Bất Biến Của Dữ Liệu**: Số lượng thùng hàng trong nhà kho là cố định trong suốt quá trình chạy một bài toán sắp xếp (không tự sinh ra hoặc biến mất thùng hàng).
2. **Tính Hợp Lệ Của Slot**: Mỗi ô chứa (Slot) tại một thời điểm chỉ được chứa tối đa 1 thùng hàng, trừ khi cần cẩu đang nhấc thùng lên không trung.
3. **Tính Độc Lập Khách Quan**: Giá trị của thùng hàng là số nguyên dương hợp lệ, không phụ thuộc vào kích thước hay màu sắc hiển thị trên màn hình.
