# Sổ Đăng Ký Hợp Đồng Giao Diện Công Khai (Public API Contracts) — Algorithm Game Website

```yaml
DOCUMENT_TYPE: API_CONTRACTS
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-09
```

Tài liệu này là sổ đăng ký các hợp đồng giao diện công khai và kết nối liên module ổn định của dự án. Một khi giao diện đã được đưa vào danh mục `CONFIRMED` tại đây, mọi thay đổi gây phá vỡ tương thích (breaking changes) bắt buộc phải thông qua quy trình đề xuất `PROP-XXX` trong `.ai/changes/proposals/` và được Human phê duyệt.

---

## 1. Trạng Thái Hiện Tại (Current State)

Trong giai đoạn khởi tạo nền tảng này, **chưa có API game hay mô phỏng nào được chốt chính thức (`CONFIRMED`)**. Theo đúng quy tắc an toàn của dự án, AI tuyệt đối không được tự ý bịa đặt API trước khi có task và thiết kế được phê duyệt.

---

## 2. Các Hợp Đồng Dự Kiến / Đang Chờ Thiết Kế (Pending Contracts)

Các hợp đồng sau đây được định hướng sẽ thiết kế chi tiết trong các task sắp tới:

### 2.1. `ISimulationEngine` [PROPOSED]
- **Mục đích**: Động cơ sinh bước chạy, phát sự kiện và quan sát trạng thái cho các mô phỏng giải thuật DSA.
- **Tầng sở hữu**: `src/core/` (Domain / Simulation).
- **Ràng buộc**: Độc lập 100% với canvas và DOM.

### 2.2. `ISimulationEvent` [PROPOSED]
- **Mục đích**: Cấu trúc dữ liệu sự kiện nguyên tử phát ra từ Simulation cho tầng hiển thị tiêu thụ (`COMPARE`, `SWAP`, `LIFT`, `DROP`).
- **Tầng sở hữu**: `src/core/` (Domain / Simulation).

### 2.3. `IAlgorithm` [PROPOSED]
- **Mục đích**: Interface tiêu chuẩn cho các thuật toán sắp xếp có thể cắm ghép (Bubble Sort, Insertion Sort,...).
- **Tầng sở hữu**: `src/core/` (Domain / Simulation).

### 2.4. `IWarehouseState` [PROPOSED]
- **Mục đích**: Bản chụp trạng thái (Snapshot) của các ô chứa (Slots), các thùng hàng (Boxes) và vị trí cần cẩu (Crane).
- **Tầng sở hữu**: `src/core/` (Domain / Simulation).

### 2.5. `IGameSceneBridge` [PROPOSED]
- **Mục đích**: Ranh giới giao tiếp hai chiều kết nối bảng điều khiển React 19 với khung chứa game Phaser 3.
- **Tầng sở hữu**: `src/app/` / `src/game/`.
