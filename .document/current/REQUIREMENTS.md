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
| `FR-001` | **Chiến dịch màn chơi (Campaign System)** | Chuỗi màn chơi gồm: Màn hướng dẫn cơ bản (Tutorial) và 7 màn thuật toán chính: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort. Mở khóa tuần tự khi hoàn thành. | P0 |
| `FR-002` | **Mô phỏng máy móc kho hàng** | Khung vẽ thể hiện mảng thùng hàng mang nhãn số, thanh ray trên không, cần cẩu cơ học, băng chuyền, trạm phân loại, khay đệm và đèn tín hiệu trạng thái. | P0 |
| `FR-003` | **Tái sử dụng máy móc theo nguyên tắc module** | Máy móc được thiết kế dạng module tái sử dụng qua nhiều màn: ví dụ `crane` di chuyển và đổi chỗ được dùng lại ở Bubble Sort, Selection Sort,... Nhưng mỗi màn chỉ cấp phát đúng tập công cụ "Đủ - Không dư - Không thiếu". | P0 |
| `FR-004` | **Hoạt ảnh cơ khí thời gian thực** | Khi lệnh máy móc được thực thi, Phaser 3 hiển thị chuyển động cơ khí mượt mà (trượt ray, hạ móc kẹp, nhấc thùng, hoán đổi vị trí, quét cảm biến). | P0 |
| `FR-005` | **Điều khiển mô phỏng thời gian** | Người chơi có thể Chạy (Play), Tạm dừng (Pause), Tua từng lệnh (Step Forward), Tua lại (Step Backward) và chỉnh tốc độ (Speed Slider 1x - 5x). | P1 |

---

### Nhóm 2: Trình Soạn Thảo Mã & Bộ Thực Thi Ngôn Ngữ Java (Java Scripting & Sandbox)

| Mã FR | Tên yêu cầu | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| `FR-006` | **Trình biên soạn mã trong game** | Giao diện Code Editor (Monaco / CodeMirror) hỗ trợ cú pháp Java: từ khóa, cấu trúc lệnh, thụt lề tự động, đánh số dòng và gợi ý phương thức của máy móc (IntelliSense/Autocomplete). | P0 |
| `FR-007` | **Hỗ trợ cú pháp Java cốt lõi** | Người chơi viết bằng cú pháp Java hợp lệ: khai báo biến, vòng lặp (`for`, `while`), câu lệnh điều kiện (`if`, `else`), toán tử số học/logic, và gọi các phương thức máy móc. | P0 |
| `FR-008` | **Kiến trúc mở rộng đa ngôn ngữ (Language-Agnostic Core)** | Hệ thống phân tách rõ: tầng Parser dịch cú pháp mã người chơi (Java, sau này thêm Python/JS/C++) thành chuỗi bytecode/lệnh chuẩn nội bộ để điều khiển máy móc. | P1 |
| `FR-009` | **Máy ảo an toàn chạy tại Client (In-Browser Sandbox)** | Bộ thực thi mã người chơi chạy trên Web Worker độc lập, ngắt chạy an toàn (Step Yielding), bảo vệ trình duyệt khỏi treo do vòng lặp vô tận (`infinite loop`) và áp trần số bước tối đa (Step Budget: ví dụ 50,000 steps). | P0 |

---

### Nhóm 3: Đặc Tả Bộ Công Cụ Máy Móc Theo Từng Màn (Machine Toolset Specification)

| Màn Chơi | Công Cụ Cung Cấp | Các Phương Thức Điều Khiển (Java API) | Mục Đích Cung Cấp ("Đủ, Không Dư, Không Thiếu") |
| :--- | :--- | :--- | :--- |
| **Tutorial** | `crane` | `crane.next()`, `crane.prev()`, `crane.read()`, `crane.compare()`, `crane.swap()` | Làm quen với việc điều khiển di chuyển và thao tác thùng hàng. |
| **Bubble Sort** | `crane` | `crane.next()`, `crane.prev()`, `crane.compare()`, `crane.swap()`, `crane.reset()`, `crane.length()` | Chỉ cho phép di chuyển tuần tự và hoán đổi 2 thùng liền kề. Không cung cấp con trỏ nhảy cóc (`jump`). |
| **Selection Sort** | `crane`, `minMarker` | `crane.moveTo(i)`, `crane.read()`, `crane.compareWith(marker)`, `minMarker.markAt(i)`, `crane.swapWith(i, j)` | Cần cẩu có thể ghi nhớ vị trí nhỏ nhất vào trạm `minMarker` và hoán đổi trực tiếp với vị trí đầu mảng chưa sắp xếp. |
| **Insertion Sort** | `lifter`, `bufferSlot` | `lifter.pick()`, `lifter.drop()`, `lifter.shiftRight()`, `bufferSlot.compareWithCurrent()` | Tay nâng nhấc thùng lên khay đệm, dịch các thùng lớn hơn sang phải 1 ô rồi hạ thùng vào vị trí trống. |
| **Merge Sort** | `splitConveyor`, `mergeStation` | `splitConveyor.split(start, end)`, `mergeStation.compareHeads()`, `mergeStation.takeFrom(subConveyorId)` | Băng chuyền hỗ trợ phân nhánh mảng con đệ quy và trạm so sánh đầu 2 băng chuyền để gộp tuần tự. |
| **Quick Sort** | `pivotMarker`, `leftCrane`, `rightCrane` | `pivotMarker.set(index)`, `leftCrane.next()`, `rightCrane.prev()`, `crane.swapAt(i, j)` | Cọc chốt Pivot và 2 cần cẩu quét từ 2 biên vào giữa để phân vùng mảng con. |
| **Heap Sort** | `binaryRack`, `crane` | `binaryRack.getParent(i)`, `binaryRack.getLeft(i)`, `binaryRack.getRight(i)`, `binaryRack.swap(i, j)` | Giàn kệ phân tầng theo chỉ số cây nhị phân phục vụ thuật toán Vun đống (Heapify) và trích xuất Max. |
| **Counting Sort** | `scanner`, `countBins[]`, `outputConveyor` | `scanner.read(index)`, `countBins[val].increment()`, `countBins[val].getCount()`, `outputConveyor.place(val, pos)` | **Tuyệt đối không có lệnh so sánh (`compare`)**. Sử dụng các phễu đếm tần suất và băng chuyền định vị trực tiếp. |

---

### Nhóm 4: Cơ Chế Kiểm Định Thuật Toán & Chống Gian Lận (Invariant Verification & Anti-Cheat)

| Mã FR | Tên yêu cầu | Mô tả chi tiết | Độ ưu tiên |
| :--- | :--- | :--- | :--- |
| `FR-010` | **Kiểm tra mảng đích (Sorted Integrity)** | Mảng sau khi chạy xong phải có thứ tự tăng dần chuẩn xác 100%, bảo toàn đúng các phần tử gốc (không làm rơi, mất, hoặc sửa đổi giá trị thùng hàng). | P0 |
| `FR-011` | **Bộ kiểm định bất biến thuật toán (Algorithm Invariant Validator)** | Giám sát lịch sử hành vi máy móc (Execution Trace) để xác thực người chơi đã lập trình đúng bản chất thuật toán của màn đó:<br>- **Bubble Sort**: Mọi phép hoán đổi bắt buộc phải là 2 thùng liền kề ($|idx_1 - idx_2| = 1$); sau mỗi pass thứ $k$, thùng lớn thứ $k$ phải nằm cố định tại vị trí $N - k$.<br>- **Selection Sort**: Phải có thao tác quét qua đoạn chưa sắp xếp, tìm cực trị nhỏ nhất rồi mới hoán đổi đúng 1 lần vào đầu đoạn.<br>- **Insertion Sort**: Luôn duy trì bất biến đoạn đầu $[0, i]$ đã sắp xếp tăng dần sau khi chèn xong thùng thứ $i+1$.<br>- **Merge Sort**: Bắt buộc có thao tác chia mảng thành các mảng con và hợp nhất 2 mảng con đã sắp thứ tự.<br>- **Quick Sort**: Bắt buộc chọn Pivot và phân vùng hai phía trước khi sắp xếp đệ quy.<br>- **Heap Sort**: Bắt buộc cây nhị phân được chuyển thành Max-Heap trước khi đưa phần tử lớn nhất về cuối mảng.<br>- **Counting Sort**: Bắt buộc ghi nhận tần suất vào các phễu đếm và không được sử dụng bất kỳ thao tác so sánh hai thùng trực tiếp nào. | P0 |
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
