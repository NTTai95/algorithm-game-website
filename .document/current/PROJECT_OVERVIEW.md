# Tổng Quan Dự Án: Sắp Xếp Kho Hàng Tự Động (AlgoWarehouse)

```yaml
DOCUMENT_ID: DOC-OVERVIEW
DOCUMENT_TYPE: PROJECT_OVERVIEW
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-16
OWNER: Human & AI
SPRINT: SPRINT-000
```

---

## 1. Sứ Mệnh & Mục Tiêu Dự Án (Purpose & Mission)

**AlgoWarehouse** là nền tảng web game giáo dục tương tác lấy cảm hứng từ phong cách của **CodeCombat**, tập trung chuyên sâu vào trực quan hóa và rèn luyện tư duy thực hành **7 thuật toán sắp xếp mảng (Array Sorting Algorithms)**.

Thay vì học thuật toán qua lý thuyết tĩnh hoặc giải bài tập trừu tượng, người chơi hóa thân thành kỹ sư điều hành hệ thống tự động hóa trong một **nhà kho công nghiệp thông minh (Automated Smart Warehouse)** không bóng người. Tại đây, mọi thao tác sắp xếp mảng dữ liệu được chuyển hóa thành các lệnh điều khiển máy móc cơ học vật lý (Cần cẩu trục gantry, cánh tay robot, băng chuyền phân loại, cảm biến quét trọng số, khay đệm).

### Các mục tiêu cốt lõi:
1. **Học sâu bản chất thuật toán**: Buộc người chơi hiểu tường tận cơ chế vận hành, bất biến (invariants) và chi phí tài nguyên của từng thuật toán.
2. **Bộ công cụ máy móc "Đủ - Không Dư - Không Thiếu" (Minimal & Sufficient Toolset)**: Các cỗ máy có tính tái sử dụng cao qua nhiều màn chơi, nhưng mỗi màn chỉ cấp phát đúng tập công cụ cần thiết cho thuật toán đó, ngăn chặn việc dùng công cụ sai lệch để phá vỡ bài toán.
3. **Cơ chế chống gian lận & Kiểm định bất biến (Invariant Enforcement)**: Người chơi chỉ có thể qua màn khi mã thực sự tái hiện chuẩn xác 100% thuật toán được chỉ định.
4. **Hỗ trợ ngôn ngữ lập trình Java đầu tiên**: Người chơi viết mã bằng cú pháp Java (hỗ trợ mở rộng đa ngôn ngữ trong tương lai). Mã chạy và gỡ lỗi từng bước trực tiếp trên trình duyệt.
5. **Triển khai miễn phí, tức thì trên Vercel**: Tối ưu hóa trên nền tảng Vite + React 19 + Phaser 3, sẵn sàng đưa lên Vercel không tốn chi phí máy chủ.

---

## 2. Đối Tượng Người Dùng Mục Tiêu (Target Users)

- **Sinh viên & Học viên CNTT**: Đang học môn Cấu trúc Dữ liệu & Giải thuật (DSA) với ngôn ngữ Java, cần trực quan hóa từng bước dịch chuyển mảng.
- **Người tự học lập trình & Luyện phỏng vấn**: Củng cố tư duy nền tảng, nắm chắc chuyển dịch trạng thái, số phép so sánh và số phép hoán đổi.
- **Giảng viên & Trợ giảng môn DSA**: Sử dụng làm công cụ trực quan trên lớp và bài tập thực hành tương tác.

---

## 3. Giá Trị Cốt Lõi (Core Values)

1. **Trực quan hóa vật lý (Physical Metaphor)**: Mỗi thao tác so sánh, hoán đổi, gán giá trị đều tương ứng với một động tác máy móc thực tế có chi phí (thời gian, năng lượng, bước đi).
2. **Tái sử dụng máy móc theo nguyên tắc công nghiệp**: Máy móc (như cần cẩu `crane`) được thiết kế module hóa, có thể dùng lại ở nhiều thuật toán khác nhau khi có cùng nhu cầu cơ học (ví dụ: hoán đổi liền kề).
3. **Tuân thủ thuật toán nghiêm ngặt (Strict Invariant Validation)**: Người chơi không thể "qua mặt" hệ thống bằng thuật toán khác hoặc dùng hàm sắp xếp có sẵn.
4. **Phản hồi tức thì & Gỡ lỗi từng bước (Step-by-Step & Time Travel)**: Hỗ trợ Chạy (Play), Tạm dừng (Pause), Tua từng bước (Step), và Tua lại (Rewind).
5. **Thẩm mỹ công nghiệp hiện đại (Cyber-Industrial Aesthetics)**: Phong cách nhà kho công nghiệp tự động, đèn tín hiệu trạng thái neon, âm thanh cơ khí sinh động.

---

## 4. Bối Cảnh Công Nghệ (Technology Context)

- **Framework giao diện**: React 19 (SPA)
- **Công cụ đóng gói & Máy chủ Dev**: Vite 8 (Tối ưu tuyệt đối cho Vercel Hobby Free Tier, Zero-config)
- **Game Engine**: Phaser 3 (Canvas/WebGL Renderer, quản lý sprite máy móc, thùng hàng, hiệu ứng vật lý)
- **Ngôn ngữ người chơi (In-Game Scripting)**: **Java** (Giai đoạn đầu), thiết kế kiến trúc cởi mở để mở rộng thêm Python, C++, JavaScript trong tương lai.
- **Bộ thông dịch & Máy ảo Client-Side (Java Sandbox)**: Bộ phân tích cú pháp (Parser) & Máy ảo AST / Bytecode Interpreter chạy trên Web Worker độc lập, ngăn treo trình duyệt và cho phép ngắt từng bước (`yield step`).
- **Trình soạn thảo mã (Code Editor)**: Monaco Editor hoặc CodeMirror 6, hỗ trợ tô màu cú pháp Java, đánh số dòng và gợi ý phương thức của máy móc.
- **Nền tảng triển khai**: Vercel (CI/CD tự động từ GitHub).

---

## 5. Danh Mục 7 Thuật Toán Sắp Xếp & Bộ Công Cụ Máy Móc (7 Algorithms & Machine Toolset)

| Màn (Chapter) | Thuật Toán | Bộ Máy Móc Được Cấp Phát | Cơ Chế Kiểm Định Bất Biến (Invariant Verification) |
| :--- | :--- | :--- | :--- |
| **Màn 0** | *Tutorial / Hiệu chuẩn máy móc* | Cần cẩu cơ bản (`crane`) | Làm quen lệnh: `crane.next()`, `crane.prev()`, `crane.compare()`, `crane.swap()` |
| **Màn 1** | **Bubble Sort** (Sắp xếp nổi bọt) | Cần cẩu cơ bản (`crane`) | **Quy tắc**: Chỉ được so sánh và đổi chỗ 2 thùng liền kề. <br>**Bất biến**: Sau mỗi lượt quét (`pass`), thùng nặng nhất của vùng chưa sắp xếp phải nổi bọt về đúng vị trí cuối. |
| **Màn 2** | **Selection Sort** (Sắp xếp chọn) | Cần cẩu di chuyển (`crane`) + Cảm biến ghi nhớ (`minMarker`) | **Quy tắc**: Phải quét hết mảng con chưa sắp xếp để lưu chỉ số nhỏ nhất vào `minMarker`, chỉ được hoán đổi đúng 1 lần duy nhất sau khi kết thúc quét. |
| **Màn 3** | **Insertion Sort** (Sắp xếp chèn) | Cần cẩu tay gắp nâng hạ (`lifter`) + Khay đệm tạm (`bufferSlot`) | **Quy tắc**: Nhấc 1 thùng lên khay đệm, lùi về sau dịch các thùng lớn hơn sang phải 1 ô, sau đó hạ thùng vào đúng vị trí. Đoạn $[0, i]$ luôn tăng dần. |
| **Màn 4** | **Merge Sort** (Sắp xếp trộn) | Băng chuyền chia đôi (`splitConveyor`) + Trạm hợp nhất (`mergeStation`) | **Quy tắc**: Chia mảng thành các phân đoạn độ dài 1, dùng 2 con trỏ so sánh đầu 2 băng chuyền để nạp tuần tự về băng chuyền chính theo thứ tự tăng dần. |
| **Màn 5** | **Quick Sort** (Sắp xếp nhanh) | Cột định vị Pivot (`pivotMarker`) + Cần cẩu phân vùng trái/phải (`leftCrane`, `rightCrane`) | **Quy tắc**: Chọn chốt Pivot, phân vùng sao cho mọi thùng bên trái nhỏ hơn hoặc bằng Pivot, mọi thùng bên phải lớn hơn Pivot. |
| **Màn 6** | **Heap Sort** (Sắp xếp vun đống) | Giàn nâng kệ hàng 2 nhánh (`binaryRack`) + Cần cẩu trích xuất gốc | **Quy tắc**: Vun đống cây nhị phân thỏa mãn tính chất Max-Heap (`parent >= children`), sau đó tráo gốc với lá cuối cùng và thu hẹp kích thước đống. |
| **Màn 7** | **Counting Sort** (Sắp xếp đếm) | Dàn phễu đếm tần suất (`countBins[]`) + Băng chuyền tái tạo | **Quy tắc**: Tuyệt đối **không có thao tác so sánh (`compare`)**. Đếm số lượng thùng có cùng giá trị vào các phễu, sau đó tính tổng tích lũy và chuyển hàng vào vị trí mới. |

---

## 6. Lộ Trình Phát Triển (Roadmap)

- **Sprint 0 (Hiện tại)**: Thống nhất yêu cầu, đặc tả kiến trúc, hợp đồng API và bộ kiểm định thuật toán.
- **Sprint 1**: Xây dựng Core Java Interpreter / Virtual AST Runner chạy độc lập + Hệ thống máy móc Màn 0 (Tutorial) và Màn 1 (Bubble Sort) trên Phaser 3.
- **Sprint 2**: Hoàn thiện Màn 2 (Selection Sort) & Màn 3 (Insertion Sort) + Giao diện Code Editor & Bộ đếm bước di chuyển.
- **Sprint 3**: Hoàn thiện Màn 4 (Merge Sort) & Màn 5 (Quick Sort).
- **Sprint 4**: Hoàn thiện Màn 6 (Heap Sort) & Màn 7 (Counting Sort) + Bộ test ẩn chống gian lận & Triển khai Vercel.
