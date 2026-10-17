# Đặc Tả Yêu Cầu Hệ Thống: Sắp Xếp Kho Hàng Tự Động (AlgoWarehouse)

```yaml
DOCUMENT_ID: DOC-REQUIREMENTS
DOCUMENT_TYPE: REQUIREMENTS
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-16
OWNER: Human & AI
SPRINT: SPRINT-000
```

---

## 1. Yêu Cầu Chức Năng (Functional Requirements - FR)

### Nhóm 1: Hệ Thống Màn Chơi & Môi Trường Kho Hàng (Levels & Simulation)

| Mã FR | Tên yêu cầu | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| `FR-001` | **Chiến dịch màn chơi (Campaign System)** | Chuỗi màn chơi gồm: Chuỗi màn hướng dẫn theo từng máy móc (Tutorial Stages 0.1, 0.2, 0.3) và 7 màn thuật toán chính: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting Sort. Mở khóa tuần tự. | P0 |
| `FR-001A` | **Trang Home & Header Navigation** | Hệ thống định tuyến endpoint rõ ràng: Trang Home giới thiệu tổng quan, catalog cỗ máy và điều hướng tới các màn; Thanh Header cố định xuyên suốt cho phép chuyển đổi nhanh giữa Home, Tutorials, và Algorithms. | P0 |
| `FR-001B` | **Chuỗi Màn 0 Đa Máy Móc (Modular Tutorials)** | Màn 0 được chia thành các màn nhỏ độc lập để người chơi làm quen từng cỗ máy trước khi bước vào giải thuật toán: Stage 0.1 (`wareHouse` + `WeightScanner`), Stage 0.2 (`SingleCrane`), Stage 0.3 (Phối hợp 2 máy). | P0 |
| `FR-002` | **Mô phỏng máy móc kho hàng** | Khung vẽ thể hiện mảng thùng hàng mang trọng số (`weight`), thanh ray trên không, đồng thời hiển thị nhiều cỗ máy cơ học (Cần cẩu `SingleCrane`, Cảm biến quét `WeightScanner`) chạy trên đường ray. | P0 |
| `FR-003` | **Tái sử dụng máy móc theo nguyên tắc Single Responsibility** | Mỗi cỗ máy đảm nhiệm đúng 1 chức năng cơ học: `wareHouse` cung cấp thông tin kho (`getCountBox()`), `WeightScanner` quét khối lượng (`getWeightBox()`, `move(step)`, `moveStart()`), `SingleCrane` hoán đổi vị trí (`swap()`, `move(step)`, `moveStart()`). | P0 |
| `FR-004` | **Hoạt ảnh cơ khí thời gian thực** | Khi lệnh máy móc được thực thi, Phaser 3 hiển thị chuyển động cơ khí mượt mà (trượt ray, hạ móc kẹp, nhấc thùng, hoán đổi vị trí, tia beam quét cảm biến). | P0 |
| `FR-005` | **Điều khiển mô phỏng thời gian** | Người chơi có thể Chạy (Play), Tạm dừng (Pause), Tua từng lệnh (Step Forward), Tua lại (Step Backward) và chỉnh tốc độ (Speed Slider 1x - 5x). | P1 |

---

### Nhóm 2: Trình Soạn Thảo Mã & Bộ Thực Thi Ngôn Ngữ Java (Java Scripting & Sandbox)

| Mã FR | Tên yêu cầu | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| `FR-006` | **Trình biên soạn mã trong game** | Giao diện Code Editor (Monaco) hỗ trợ tô màu cú pháp Java chuẩn, đánh số dòng, và tích hợp nút **Format Code** tự động căn chỉnh thụt lề chuẩn đẹp. | P0 |
| `FR-007` | **Hỗ trợ cú pháp Java & Phương thức `solve(...)`** | Người chơi viết mã bên trong phương thức Java chuẩn: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`. Hỗ trợ khai báo biến, `boolean`, `if/else`, vòng lặp `for`/`while`, câu lệnh `break`, và toán tử logic/so sánh. | P0 |
| `FR-008` | **Kiến trúc mở rộng đa ngôn ngữ (Language-Agnostic Core)** | Hệ thống phân tách rõ: tầng Parser dịch cú pháp mã người chơi (Java) thành chuỗi bytecode/lệnh chuẩn nội bộ để điều khiển máy móc. | P1 |
| `FR-009` | **Máy ảo an toàn chạy tại Client (In-Browser Sandbox)** | Bộ thực thi mã người chơi chạy trên Web Worker độc lập, ngắt chạy an toàn (Step Yielding), bảo vệ trình duyệt khỏi treo do vòng lặp vô tận (`infinite loop`) và áp trần số bước tối đa (Step Budget: ví dụ 50,000 steps). | P0 |
| `FR-014` | **Chẩn đoán lỗi chi tiết (Diagnostic Feedback)** | Hệ thống không chỉ báo vi phạm chung chung mà phân tích ngữ cảnh cụ thể: chỉ rõ số dòng lỗi, loại lỗi (Cú pháp / Lỗi máy móc / Vi phạm bất biến), giá trị thực tế vs giá trị kỳ vọng, kèm gợi ý sửa lỗi trực quan. | P0 |

---

### Nhóm 3: Đặc Tả Bộ Công Cụ Máy Móc Theo Từng Màn (Machine Toolset Specification)

| Màn Chơi | Công Cụ Cung Cấp | Các Phương Thức Điều Khiển (Java API) | Mục Đích Cung Cấp ("Đủ, Không Dư, Không Thiếu") |
| :--- | :--- | :--- | :--- |
| **Tutorial 0.1** | `wareHouse`, `weightScanner` | `wareHouse.getCountBox()`, `weightScanner.getWeightBox()`, `weightScanner.move(n)`, `weightScanner.moveStart()` | Làm quen thao tác đọc số lượng thùng và quét khối lượng từng thùng hàng. |
| **Tutorial 0.2** | `wareHouse`, `singleCrane` | `wareHouse.getCountBox()`, `singleCrane.swap()`, `singleCrane.move(n)`, `singleCrane.moveStart()` | Làm quen thao tác di chuyển và hoán đổi 2 thùng hàng liền kề của cần cẩu. |
| **Tutorial 0.3** | `wareHouse`, `singleCrane`, `weightScanner` | Phối hợp cả 2 máy trên mảng nhỏ (3-4 phần tử) | Làm quen việc phối hợp quét khối lượng và quyết định hoán đổi. |
| **Bubble Sort** | `wareHouse`, `singleCrane`, `weightScanner` | `weightScanner.getWeightBox()`, `weightScanner.move(n)`, `weightScanner.moveStart()`, `singleCrane.swap()`, `singleCrane.move(n)`, `singleCrane.moveStart()` | Sắp xếp mảng theo **khối lượng của box (`boxWeight`)**. Chỉ được hoán đổi 2 box liền kề bằng `singleCrane`. |
| **Selection Sort** | `wareHouse`, `singleCrane`, `weightScanner`, `minMarker` | `minMarker.mark()`, `minMarker.position()`, `minMarker.clear()` | Ghi nhớ vị trí nhỏ nhất và hoán đổi đúng 1 lần sau mỗi pass. |
| **Insertion Sort** | `wareHouse`, `lifter`, `bufferSlot` | `lifter.pick()`, `lifter.drop()`, `lifter.shiftRight()` | Nhấc thùng lên khay đệm, dịch các thùng lớn hơn sang phải rồi hạ thùng vào vị trí. |
| **Merge Sort** | `splitConveyor`, `mergeStation` | `splitConveyor.split(start, end)`, `mergeStation.compareHeads()` | Phân nhánh mảng con và hợp nhất tuần tự theo thứ tự tăng dần. |
| **Quick Sort** | `pivotMarker`, `leftCrane`, `rightCrane` | `pivotMarker.set(index)`, `leftCrane.next()`, `rightCrane.prev()` | Chọn Pivot và phân vùng hai phía. |
| **Heap Sort** | `binaryRack`, `singleCrane` | `binaryRack.getParent(i)`, `binaryRack.getLeft(i)`, `binaryRack.getRight(i)` | Vun đống Max-Heap và trích xuất phần tử lớn nhất. |
| **Counting Sort** | `scanner`, `countBins[]`, `outputConveyor` | `countBins[val].increment()`, `outputConveyor.place(val, pos)` | **Tuyệt đối không so sánh trực tiếp**. Đếm tần suất và đưa về vị trí đích. |

---

### Nhóm 4: Cơ Chế Kiểm Định Thuật Toán & Chống Gian Lận (Invariant Verification & Anti-Cheat)

| Mã FR | Tên yêu cầu | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| `FR-010` | **Kiểm tra mảng đích theo khối lượng** | Mảng sau khi chạy xong phải có khối lượng tăng dần chuẩn xác 100%, bảo toàn đúng các phần tử gốc (không làm rơi, mất, hoặc sửa đổi giá trị thùng hàng). | P0 |
| `FR-011` | **Bộ kiểm định bất biến thuật toán (Algorithm Invariant Validator)** | Giám sát lịch sử hành vi máy móc (Execution Trace) để xác thực người chơi đã lập trình đúng bản chất thuật toán của màn đó:<br>- **Bubble Sort**: Bắt buộc dùng `weightScanner` để đọc khối lượng và so sánh; mọi phép hoán đổi bằng `singleCrane` bắt buộc là 2 thùng liền kề; sau mỗi pass thứ $k$, thùng có khối lượng lớn thứ $k$ phải nằm cố định tại vị trí $N - k$.<br>- **Selection Sort**: Phải quét qua đoạn chưa sắp xếp, tìm min rồi mới hoán đổi đúng 1 lần.<br>- **Insertion Sort**: Luôn duy trì bất biến đoạn đầu $[0, i]$ tăng dần sau khi chèn xong.<br>- **Merge Sort**: Bắt buộc chia mảng và hợp nhất 2 mảng con đã sắp thứ tự.<br>- **Quick Sort**: Bắt buộc chọn Pivot và phân vùng hai phía.<br>- **Heap Sort**: Bắt buộc cây nhị phân được chuyển thành Max-Heap.<br>- **Counting Sort**: Bắt buộc ghi nhận tần suất vào các phễu đếm và không được sử dụng thao tác so sánh. | P0 |
| `FR-012` | **Bộ test ẩn (Hidden Test Suites)** | Sau khi mã vượt qua mảng minh họa, hệ thống tự động kiểm thử ngầm trên 4 trường hợp đặc biệt: mảng ngẫu nhiên khác, mảng đảo ngược (worst case), mảng đã sắp xếp (best case), mảng có nhiều phần tử trùng lặp. | P1 |
| `FR-013` | **Trần số bước thao tác (Move/Step Budget)** | Mỗi màn có định mức số bước di chuyển tối đa tương ứng với độ phức tạp lý thuyết của thuật toán đó, ngăn chặn giải thuật vét cạn bừa bãi. | P1 |

---

## 2. Yêu Cầu Phi Chức Năng (Non-Functional Requirements - NFR)

| Mã NFR | Nhóm yêu cầu | Tiêu chuẩn đo lường | Tiêu chí chấp nhận |
| :--- | :--- | :--- | :--- |
| `NFR-001` | **Khả năng triển khai Vercel (Zero-Cost Deployment)** | Đóng gói tự động trên nền Vite + React | Đóng gói sản phẩm thành công 100% bằng lệnh `npm run build`, chạy mượt mà trên Vercel gói miễn phí (Hobby Tier). |
| `NFR-002` | **Tốc độ khung hình (Frame Rate)** | Hoạt ảnh cơ khí trên Phaser 3 Canvas | Duy trì ổn định 60 FPS trên màn hình máy tính thông thường, chuyển động cơ khí mượt mà, không giật lag. |
| `NFR-003` | **Tính độc lập của lõi thuật toán (Decoupled Architecture)** | Tầng mô phỏng DSA và máy ảo Java tách biệt hoàn toàn khỏi Phaser & React UI | Có thể chạy kiểm thử tự động 100% trên dòng lệnh (Vitest/Node.js) mà không cần nạp giao diện đồ họa. |
| `NFR-004` | **Thời gian khởi tạo & thực thi** | Thời gian dịch mã Java sang lệnh ảo máy móc | Dưới 100ms cho đoạn mã người chơi thông thường. |
| `NFR-005` | **Trải nghiệm thẩm mỹ (Cyber-Industrial Aesthetics)** | Giao diện đồ họa công nghiệp hiện đại | Phong cách nhà kho công nghiệp tự động hóa, phối màu hài hòa, đèn trạng thái neon, âm thanh phản hồi cơ khí chân thực. |

---

## 3. Ranh Giới Phạm Vi Sản Phẩm (Scope Boundaries)

### 3.1. Bao gồm (In-Scope - Giai đoạn 1 & 2):
- Web app chơi trên trình duyệt máy tính để bàn/laptop.
- 7 màn thuật toán chính: Bubble, Selection, Insertion, Merge, Quick, Heap, Counting Sort + Màn Tutorial.
- Trình soạn thảo mã và Bộ thông dịch mã Java an toàn tại trình duyệt.
- Thư viện máy móc dạng module hóa tái sử dụng.
- Bộ kiểm định bất biến thuật toán và bộ test ẩn chống gian lận.
- Triển khai miễn phí trên Vercel.

### 3.2. Không bao gồm (Out-of-Scope - Chưa làm ở giai đoạn đầu):
- Hỗ trợ màn hình điện thoại (Mobile Phone) do cần không gian hiển thị code và sàn nhà kho.
- Hệ thống tài khoản người dùng đa người chơi (Multiplayer / PvP) hoặc Backend Server phức tạp (toàn bộ tiến độ lưu tạm trên LocalStorage trình duyệt).
- Các thuật toán ngoài sắp xếp mảng (như đồ thị, tìm kiếm chuỗi, quy hoạch động tổng quát).
