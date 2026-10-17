# Tổng Quan Dự Án: Sắp Xếp Kho Hàng Tự Động (AlgoWarehouse)

```yaml
DOCUMENT_ID: DOC-OVERVIEW
DOCUMENT_TYPE: PROJECT_OVERVIEW
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-17
OWNER: Human & AI
SPRINT: SPRINT-002 (COMPLETED)
```

---

## 1. Sứ Mệnh & Mục Tiêu Dự Án (Purpose & Mission)

**AlgoWarehouse** là nền tảng web game giáo dục tương tác lấy cảm hứng từ phong cách của **CodeCombat**, tập trung chuyên sâu vào trực quan hóa và rèn luyện tư duy thực hành **7 thuật toán sắp xếp mảng (Array Sorting Algorithms)**.

Thay vì học thuật toán qua lý thuyết tĩnh hoặc giải bài tập trừu tượng, người chơi hóa thân thành kỹ sư điều hành hệ thống tự động hóa trong một **nhà kho công nghiệp thông minh (Automated Smart Warehouse)** không bóng người. Tại đây, mọi thao tác sắp xếp mảng dữ liệu được chuyển hóa thành các lệnh điều khiển máy móc cơ học vật lý (Cần cẩu gantry, cảm biến quét trọng số, cánh tay robot, băng chuyền phân loại, khay đệm).

### Các mục tiêu cốt lõi:
1. **Học sâu bản chất thuật toán**: Buộc người chơi hiểu tường tận cơ chế vận hành, bất biến (invariants) và chi phí tài nguyên của từng thuật toán.
2. **Bộ công cụ máy móc phân tách theo chức năng (Single Responsibility Machine Toolset)**: Mỗi cỗ máy thực hiện đúng một nhiệm vụ cơ học (ví dụ `WeightScanner` chỉ quét khối lượng, `SingleCrane` chỉ hoán đổi vị trí), người chơi điều phối các máy móc thông qua phương thức Java chuẩn.
3. **Cơ chế chống gian lận & Kiểm định bất biến (Invariant Enforcement)**: Người chơi chỉ có thể qua màn khi mã thực sự tái hiện chuẩn xác 100% thuật toán được chỉ định.
4. **Hỗ trợ ngôn ngữ lập trình Java hướng đối tượng**: Người chơi viết mã bằng cú pháp Java với hàm `solve(...)` nhận các đối tượng máy móc làm tham số. Mã chạy và gỡ lỗi từng bước trực tiếp trên trình duyệt kèm chẩn đoán lỗi chi tiết.
5. **Trải nghiệm web game hoàn chỉnh**: Trang Home giới thiệu, Header điều hướng, Màn hướng dẫn chia nhỏ theo từng cỗ máy, và Editor hỗ trợ tô màu + format code tự động.
6. **Triển khai miễn phí, tức thì trên Vercel**: Tối ưu hóa trên nền tảng Vite + React 19 + Phaser 3, sẵn sàng đưa lên Vercel không tốn chi phí máy chủ.

---

## 2. Đối Tượng Người Dùng Mục Tiêu (Target Users)

- **Sinh viên & Học viên CNTT**: Đang học môn Cấu trúc Dữ liệu & Giải thuật (DSA) với ngôn ngữ Java, cần trực quan hóa từng bước dịch chuyển mảng.
- **Người tự học lập trình & Luyện phỏng vấn**: Củng cố tư duy nền tảng, nắm chắc chuyển dịch trạng thái, số phép so sánh và số phép hoán đổi.
- **Giảng viên & Trợ giảng môn DSA**: Sử dụng làm công cụ trực quan trên lớp và bài tập thực hành tương tác.

---

## 3. Giá Trị Cốt Lõi (Core Values)

1. **Trực quan hóa vật lý (Physical Metaphor)**: Mỗi thao tác so sánh, hoán đổi, gán giá trị đều tương ứng với một động tác máy móc thực tế có chi phí (thời gian, năng lượng, bước đi). Thứ cần sắp xếp là **khối lượng của box (`boxWeight`)**.
2. **Tái sử dụng máy móc theo nguyên tắc công nghiệp**: Máy móc được thiết kế module hóa, có thể dùng lại ở nhiều thuật toán khác nhau khi có cùng nhu cầu cơ học.
3. **Tuân thủ thuật toán nghiêm ngặt (Strict Invariant Validation)**: Người chơi không thể "qua mặt" hệ thống bằng thuật toán khác hoặc dùng hàm sắp xếp có sẵn. Chẩn đoán chỉ rõ nguyên nhân và dòng vi phạm.
4. **Phản hồi tức thì & Gỡ lỗi từng bước (Step-by-Step & Time Travel)**: Hỗ trợ Chạy (Play), Tạm dừng (Pause), Tua từng bước (Step), và Tua lại (Rewind).
5. **Thẩm mỹ công nghiệp hiện đại (Cyber-Industrial Aesthetics)**: Phong cách nhà kho công nghiệp tự động, đèn tín hiệu trạng thái neon, âm thanh cơ khí sinh động.

---

## 4. Bối Cảnh Công Nghệ (Technology Context)

- **Framework giao diện**: React 19 (SPA, Client-Side Routing với Header và Home Page)
- **Công cụ đóng gói & Máy chủ Dev**: Vite 8 (Tối ưu tuyệt đối cho Vercel Hobby Free Tier, Zero-config)
- **Game Engine**: Phaser 3 (Canvas/WebGL Renderer, quản lý đa sprite máy móc, thùng hàng, hiệu ứng vật lý)
- **Ngôn ngữ người chơi (In-Game Scripting)**: **Java** với hàm chuẩn `public static void solve(...)`, hỗ trợ mở rộng thêm ngôn ngữ trong tương lai.
- **Bộ thông dịch & Máy ảo Client-Side (Java Sandbox)**: Bộ phân tích cú pháp (Parser) & Máy ảo AST / Bytecode Interpreter chạy trên Web Worker độc lập, hỗ trợ `boolean`, `break`, `if/else`, vòng lặp lồng nhau và trần số bước (Step Budget: 50,000 steps).
- **Trình soạn thảo mã (Code Editor)**: Monaco Editor hỗ trợ tô màu cú pháp Java, đánh số dòng, format code tự động và hiển thị chẩn đoán lỗi chi tiết.
- **Nền tảng triển khai**: Vercel (CI/CD tự động từ GitHub).

---

## 5. Danh Mục 7 Thuật Toán Sắp Xếp & Bộ Công Cụ Máy Móc (7 Algorithms & Machine Toolset)

| Màn (Chapter) | Thuật Toán | Bộ Máy Móc Được Cấp Phát | Cơ Chế Kiểm Định Bất Biến (Invariant Verification) |
| :--- | :--- | :--- | :--- |
| **Màn 0** | *Modular Machine Tutorials* | Từng máy móc riêng biệt theo màn nhỏ:<br>- 0.1: `wareHouse`, `WeightScanner`<br>- 0.2: `SingleCrane`<br>- 0.3: Hiệu chuẩn kết hợp | Hướng dẫn sử dụng và làm chủ từng thao tác máy móc trước khi giải thuật toán. |
| **Màn 1** | **Bubble Sort** (Sắp xếp nổi bọt) | `wareHouse`, `SingleCrane`, `WeightScanner` | **Quy tắc**: Dùng `WeightScanner` đọc `boxWeight`, dùng `SingleCrane` hoán đổi 2 box liền kề.<br>**Bất biến**: Sau mỗi lượt quét (`pass`), box có khối lượng lớn nhất của vùng chưa sắp xếp phải về đúng vị trí cuối. |
| **Màn 2** | **Selection Sort** (Sắp xếp chọn) | `wareHouse`, `SingleCrane`, `WeightScanner`, `minMarker` | **Quy tắc**: Quét tìm box có khối lượng nhỏ nhất lưu vào `minMarker`, chỉ được hoán đổi đúng 1 lần duy nhất sau khi kết thúc quét. |
| **Màn 3** | **Insertion Sort** (Sắp xếp chèn) | `wareHouse`, `lifter`, `bufferSlot` | **Quy tắc**: Nhấc 1 thùng lên khay đệm, lùi về sau dịch các thùng lớn hơn sang phải 1 ô, sau đó hạ thùng vào đúng vị trí. Đoạn $[0, i]$ luôn tăng dần theo khối lượng. |
| **Màn 4** | **Merge Sort** (Sắp xếp trộn) | `splitConveyor`, `mergeStation` | **Quy tắc**: Chia mảng thành các phân đoạn độ dài 1, dùng 2 con trỏ so sánh đầu 2 băng chuyền để nạp tuần tự về băng chuyền chính theo thứ tự tăng dần. |
| **Màn 5** | **Quick Sort** (Sắp xếp nhanh) | `pivotMarker`, `leftCrane`, `rightCrane` | **Quy tắc**: Chọn chốt Pivot, phân vùng sao cho mọi thùng bên trái nhỏ hơn hoặc bằng Pivot, mọi thùng bên phải lớn hơn Pivot. |
| **Màn 6** | **Heap Sort** (Sắp xếp vun đống) | `binaryRack`, `crane` | **Quy tắc**: Vun đống cây nhị phân thỏa mãn tính chất Max-Heap (`parent >= children`), sau đó tráo gốc với lá cuối cùng và thu hẹp kích thước đống. |
| **Màn 7** | **Counting Sort** (Sắp xếp đếm) | `scanner`, `countBins[]`, `outputConveyor` | **Quy tắc**: Tuyệt đối **không có thao tác so sánh (`compare`)**. Đếm số lượng thùng có cùng giá trị vào các phễu, sau đó tính tổng tích lũy và chuyển hàng vào vị trí mới. |

---

## 6. Lộ Trình Phát Triển (Roadmap)

- **Sprint 1 (Đã hoàn thành)**: Xây dựng Core Java Interpreter / Virtual Runner chạy độc lập + Nguyên mẫu Vertical Slice với Bubble Sort cơ bản trên Phaser 3 & React.
- **Sprint 2 (Đã hoàn thành)**: 
  - Tái cấu trúc Giao diện & Điều hướng: Trang Home giới thiệu dự án, Header navigation xuyên suốt, cấu trúc endpoint/routing chuẩn.
  - Kiến trúc Đa máy móc (Multi-Machine Architecture): Phân tách độc lập `wareHouse`, `WeightScanner`, `SingleCrane`.
  - Chuỗi Màn 0 (Modular Tutorials) chia thành các màn nhỏ tương ứng với từng cỗ máy.
  - Nâng cấp Java AST Parser & Virtual VM hỗ trợ cú pháp phương thức `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`, `boolean`, `break`.
  - Tích hợp tính năng Format Code và Chẩn đoán lỗi chi tiết (Diagnostic Feedback với dòng lỗi và gợi ý sửa).
  - Hoàn thiện Màn 1 Bubble Sort mới với 2 máy chạy song hành trên Canvas Phaser 3 sắp xếp theo khối lượng (`boxWeight`).
- **Sprint 3 (Chuẩn bị thực hiện)**: Hoàn thiện Màn 2 (Selection Sort) & Màn 3 (Insertion Sort) + Cảm biến `minMarker` & Tay gắp `lifter`.
- **Sprint 4 (Dự kiến)**: Hoàn thiện Màn 4 (Merge Sort) & Màn 5 (Quick Sort).
- **Sprint 5 (Dự kiến)**: Hoàn thiện Màn 6 (Heap Sort) & Màn 7 (Counting Sort) + Bộ test ẩn chống gian lận & Triển khai Vercel.

