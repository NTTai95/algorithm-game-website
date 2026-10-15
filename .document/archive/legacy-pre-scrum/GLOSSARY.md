# Từ Điển Thuật Ngữ Dự Án (Project Glossary) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: GLOSSARY
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

## 1. Thuật Ngữ Nghiệp Vụ Kho Bãi & Sắp Xếp (Domain & Metaphor Terms)

| Thuật Ngữ | Tiếng Anh Chuẩn | Định Nghĩa Trong Dự Án | Trạng Thái |
| :--- | :--- | :--- | :--- |
| **Nhà kho** | `Warehouse` | Bối cảnh ẩn dụ vật lý đại diện cho cấu trúc dữ liệu mảng, chứa các ô lưu trữ liên tiếp. | CONFIRMED |
| **Thùng hàng** | `Box` | Phần tử dữ liệu trong mảng, mang giá trị số/trọng lượng xác định cần được sắp xếp theo thứ tự. | CONFIRMED |
| **Vị trí ô chứa** | `Storage Bay / Slot` | Vị trí chỉ số index cụ thể trong mảng nhà kho (0, 1, 2, ...). | CONFIRMED |
| **Cần cẩu** | `Crane` | Tác nhân cơ học thực hiện các thao tác di chuyển, nhấc thùng, so sánh và hạ thùng. | CONFIRMED |
| **Sự kiện mô phỏng** | `Simulation Event` | Thao tác nguyên tử tất định do giải thuật phát ra (`COMPARE`, `SWAP`, `LIFT`, `DROP`). | CONFIRMED |
| **Thuật toán sắp xếp** | `Sorting Algorithm` | Quy trình giải thuật toán học sắp xếp dãy phần tử (Bubble Sort, Insertion Sort,...). | CONFIRMED |
| **Động cơ mô phỏng** | `Simulation Engine` | Lõi xử lý thực thi thuật toán theo từng bước và phát ra luồng sự kiện mô phỏng. | CONFIRMED |

---

## 2. Khái Niệm Mở Rộng Dự Kiến (Future / Pending Concepts)

| Thuật Ngữ | Tiếng Anh Chuẩn | Định Nghĩa Dự Kiến | Trạng Thái |
| :--- | :--- | :--- | :--- |
| **Cần cẩu đơn** | `SingleCrane` | Mô hình cần cẩu đơn điểm thao tác tuần tự. | OPEN_QUESTION |
| **Cần cẩu đôi** | `DoubleCrane` | Mô hình 2 cần cẩu đồng thời để trực quan hóa kỹ thuật 2 con trỏ (Two Pointers) hoặc sắp xếp song song. | OPEN_QUESTION |
| **Tua lại bước** | `Replay / Time-Travel` | Bộ điều khiển cho phép tua lùi hoặc tua tiến lịch sử thực thi của giải thuật. | OPEN_QUESTION |
| **Màn chơi giáo dục** | `Level` | Cấp độ học tập với các thử thách dự đoán bước đi và độ phức tạp dữ liệu khác nhau. | OPEN_QUESTION |

---

## 3. Thuật Ngữ Kiến Trúc & Công Nghệ (Technical Terms)

| Viết Tắt | Tên Đầy Đủ | Định Nghĩa Kỹ Thuật |
| :--- | :--- | :--- |
| **DSA** | Data Structures & Algorithms | Cấu trúc dữ liệu và giải thuật máy tính. |
| **HUD** | Heads-Up Display | Lớp giao diện hiển thị thông số, thanh điều khiển trên màn hình game. |
| **Bridge** | Game-Scene Bridge | Giao diện giao tiếp trung gian kết nối state giữa React 19 và Phaser 3 Scene. |
| **ADR** | Architecture Decision Record | Bản ghi nhận quyết định kiến trúc chính thức của dự án. |
