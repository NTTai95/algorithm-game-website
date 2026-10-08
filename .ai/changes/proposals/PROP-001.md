# PROP-001: Redesign of the Core Simulation Architecture (Decoupled Two-Stage Simulation & Deterministic Time-Travel Pipeline)

```yaml
PROPOSAL_ID: PROP-001
TITLE: Redesign of Core Simulation Architecture
AUTHOR_SESSION: SESSION-001
DATE: 2026-10-08
STATUS: PROPOSED
BREAKING_CHANGE: NO
TARGET_SYSTEM: src/core (Simulation, DSA Engine, Event Dispatch)
AFFECTED_DOCUMENTS:
  - .ai/ARCHITECTURE.md
  - .ai/DOMAIN_MODEL.md
  - .ai/API_CONTRACTS.md
```

---

## 1. Vấn Đề Gặp Phải (Problem Statement)

Kiến trúc mô phỏng hiện tại được mô tả sơ bộ tại [`.ai/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.ai/ARCHITECTURE.md) và [`.ai/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.ai/DOMAIN_MODEL.md) tồn tại 3 rủi ro thiết kế cốt lõi:

1. **Trộn lẫn tầng thuật toán thuần túy (Pure DSA) và ẩn dụ vật lý (Physical Metaphor - Warehouse/Crane)**:
   - Các sự kiện mô phỏng hiện đang được đề xuất bao gồm cả sự kiện thuật toán (`COMPARE`, `SWAP`) và sự kiện cơ khí (`LIFT`, `DROP`, `MOVE`).
   - Nếu thuật toán sắp xếp phát trực tiếp sự kiện `LIFT`/`DROP`, thuật toán sẽ bị gắn chặt (tightly coupled) vào giao diện nhà kho, làm suy yếu nguyên tắc mở rộng đa trò chơi (**Multi-Game Extensibility**) khi phát triển các chủ đề DSA khác (Đồ thị/Graph, Cây/Tree, Quy hoạch động/DP).
2. **Thiếu cơ chế tua ngược thời gian (Time-Travel / Step-Backward)**:
   - Luồng phát sự kiện xuôi một chiều (Unidirectional Forward Stream) khiến việc "Step Backward", "Scrubbing trên thanh Timeline" hoặc "Replay" trong React UI trở nên rất tốn kém hoặc bất khả thi nếu không phải chạy lại toàn bộ thuật toán từ bước 0 (`tick 0`).
3. **Mô hình trạng thái dễ phát sinh hiệu ứng lề (State Mutability Risk)**:
   - Chưa phân tách rõ ràng giữa **Thuật toán sinh vết (Trace Generator)**, **Bộ điều khiển trạng thái (State Reducer)**, và **Lịch trình hoạt ảnh (Animation Sequencer)**.

---

## 2. Thiết Kế Hiện Tại (Current Design)

Theo [`.ai/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.ai/ARCHITECTURE.md#L18-L22):
- Module thuật toán vừa thực thi sắp xếp vừa phát sự kiện trực tiếp tới tầng hiển thị:
  ```
  DSA Core -> Emits (COMPARE, SWAP, LIFT, DROP) -> Phaser 3 Renderer
  ```
- Chưa định nghĩa hợp đồng hoàn chỉnh cho `ISimulationEngine`, `ISimulationEvent` tại [`.ai/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.ai/API_CONTRACTS.md#L8-L14).

---

## 3. Thay Đổi Đề Xuất (Proposed Redesign)

Kiến trúc mô phỏng được tái thiết kế thành mô hình **2 giai đoạn (Two-Stage Pipeline)** kết hợp **Mẫu hình Lệnh/Trạng thái Bất biến (Immutable State Reducer & Command Pattern)**:

```
┌─────────────────────────────────────────────────────────────┐
│ STAGE 1: PURE ALGORITHMIC TRACE (src/core/algorithms)       │
│ - Thuần túy toán học & DSA, không phụ thuộc UI hay game     │
│ - Input: Mảng dữ liệu T[]                                   │
│ - Output: Generator<AlgorithmicStep<T>> hoặc Timeline<T>    │
│   (COMPARE, SWAP, ASSIGN, MARK_PIVOT, HIGHLIGHT_RANGE)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGE 2: METAPHOR TRANSLATOR / ADAPTER (src/core/adapters)  │
│ - Dịch các bước DSA trừu tượng thành hành động thế giới     │
│ - Warehouse Adapter:                                        │
│     SWAP(i, j) ──► [PICK(i), MOVE(to j), PLACE, ...]        │
│ - Graph Adapter / Tree Adapter (tương lai)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ SIMULATION CONTROLLER & STATE REDUCER (src/core/simulation) │
│ - Quản lý Play, Pause, Step Forward, Step Backward          │
│ - Snapshot Store (Time-Travel scrubbing)                    │
│ - Pure Reducer: (State_t, Step) => State_t+1                │
│ - Inverse Reducer: (State_t, Step) => State_t-1             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Dispatches View Events
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER (React HUD / Phaser 3 Canvas)            │
│ - Nhận các sự kiện hoạt ảnh đã được điều phối tuần tự       │
└─────────────────────────────────────────────────────────────┘
```

### Các Khái Niệm Cốt Lõi Được Tách Bạch:
1. `IAlgorithmTrace<T>`: Giao diện thuần túy chỉ trả về các thao tác logic trừu tượng trên dữ liệu.
2. `IMetaphorAdapter<TStep, TAction>`: Bộ chuyển đổi giữa thao tác thuật toán và hành động cơ học của kịch bản thế giới (nhà kho, cẩu trục, băng chuyền).
3. `ISimulationTimeline<TSnapshot, TAction>`: Quản lý lịch sử các bước thực thi, cho phép:
   - `stepForward()`
   - `stepBackward()`
   - `seekTo(stepIndex)`
   - `getCurrentSnapshot()`

---

## 4. Lý Do (Rationale & Benefits)

1. **Tuân thủ triệt để nguyên tắc đơn trách nhiệm (Single Responsibility Principle)**: Thuật toán chỉ lo logic sắp xếp/duyệt; bộ chuyển đổi lo kịch bản trực quan; controller lo điều khiển tua lùi/tua tới.
2. **Mở rộng đa trò chơi không giới hạn (Zero Metaphor Leakage)**: Khi thêm bài toán Đồ thị (Graph Traversal) hay Cây (AVL Tree), chỉ cần viết thêm thuật toán DSA và Adapter tương ứng mà không phải sửa lõi mô phỏng.
3. **Hỗ trợ Replay và Step-Backward 100% tất định**: Nhờ mô hình snapshot hoặc invertible command, người học có thể lùi lại từng bước để xem thuật toán hoạt động ra sao.
4. **Kiểm thử độc lập tuyệt đối (100% Testable in Vitest)**: Thuật toán và bộ sinh bước có thể kiểm thử toàn diện mà không cần render canvas, không cần mock Phaser, không phụ thuộc DOM.

---

## 5. Hệ Thống & Tệp Bị Ảnh Hưởng (Affected Systems)

- **Thư mục dự kiến**:
  - `src/core/algorithms/`: Chứa các thuật toán thuần túy (`bubbleSort.ts`, `insertionSort.ts`,...).
  - `src/core/adapters/`: Chứa các adapter chuyển đổi ngữ cảnh (`warehouseAdapter.ts`,...).
  - `src/core/simulation/`: Chứa timeline controller, state reducer, event bus.
  - `src/core/types/`: Chứa các định nghĩa interface chuẩn.
- **Tài liệu tài nguyên**:
  - [`.ai/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.ai/ARCHITECTURE.md): Cập nhật sơ đồ phân lớp và mô tả Two-Stage Simulation.
  - [`.ai/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.ai/DOMAIN_MODEL.md): Bổ sung `MetaphorAdapter`, `SimulationTimeline`, `AlgorithmicStep`.
  - [`.ai/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.ai/API_CONTRACTS.md): Chuẩn hóa các interface `IAlgorithmTrace`, `ISimulationTimeline`, `IMetaphorAdapter`.

---

## 6. Nhiệm Vụ Bị Ảnh Hưởng (Affected Tasks)

- **TEST-001 (Protocol Dry Run)**: **KHÔNG ẢNH HƯỞNG** (TEST-001 cách ly hoàn toàn trong `src/test/protocol-dry-run/`).
- **Các task phát triển tính năng trong tương lai (TASK-002+)**: Sẽ kế thừa trực tiếp cấu trúc phân tách này khi bắt đầu lập trình Core Domain.

---

## 7. Khả Năng Gây Phá Vỡ (Breaking Change Analysis)

- **BREAKING CHANGE**: **NO**.
- Dự án hiện đang ở giai đoạn khởi tạo nền tảng, chưa có mã nguồn sản phẩm nào trong `src/core/` hay `src/game/` phụ thuộc vào hợp đồng cũ.

---

## 8. Rủi Ro & Biện Pháp Giảm Thiểu (Risks & Mitigations)

| Rủi Ro | Biện Pháp Giảm Thiểu |
| :--- | :--- |
| **Gia tăng độ phức tạp trừu tượng (Over-engineering)** | Giữ các interface đơn giản, súc tích; chỉ định nghĩa các kiểu dữ liệu thực sự cần thiết cho Warehouse game trước mắt. |
| **Chi phí bộ nhớ khi lưu Snapshot Timeline** | Chỉ lưu snapshot đầy đủ cho mảng nhỏ (N <= 50 phần tử điển hình trong game giáo dục); với mảng lớn hơn chỉ lưu delta action và inverse action. |

---

## 9. Yêu Cầu Kiểm Thử (Tests Required Khi Được Phê Duyệt)

1. Unit test cho Algorithmic Trace: Kiểm tra tính đúng đắn của chuỗi sự kiện sắp xếp (ví dụ: Bubble Sort sinh đủ các bước compare/swap và kết quả cuối cùng được sắp xếp chính xác).
2. Unit test cho Adapter: Kiểm tra việc phân rã `Swap` thành chuỗi thao tác cẩu (`Pick`, `Move`, `Place`).
3. Unit test cho Timeline Controller: Kiểm tra `stepForward()`, `stepBackward()`, `seekTo()`, tính bất biến của trạng thái.

---

## 10. Khuyến Nghị & Hành Động Tiếp Theo (AI Recommendation)

- **Khuyến nghị**: Phê duyệt đề xuất (`ACCEPT`) để làm cơ sở chuẩn hóa [`.ai/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.ai/ARCHITECTURE.md) và [`.ai/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.ai/API_CONTRACTS.md) trước khi tạo các task lập trình tính năng `TASK-002+`.
- **Hành động ngay lập tức**:
  - Lưu đề xuất tại [`.ai/changes/proposals/PROP-001.md`](file:///d:/workspace/Algorithm-game-website/.ai/changes/proposals/PROP-001.md).
  - Tuân thủ quy tắc **STOP**: Không viết mã triển khai trong `/src/`. Chờ quyết định phê duyệt chính thức từ Con người.
