# Tri Thức Đặc Thù Dự Án (.document) — Algorithm Game Website

Thư mục `.document/` là **Nguồn Sự Thật Duy Nhất (Single Source of Truth)** về mục tiêu, yêu cầu, kiến trúc, mô hình nghiệp vụ, giao diện kỹ thuật và các quyết định kiến trúc của riêng dự án **Website Trò Chơi Thuật Toán (Algorithm Game Website)**.

Mọi tài liệu trong thư mục này được xây dựng từ các biểu mẫu chuẩn tại [`.ai/templates/documentation/`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/) và được chia sẻ, theo dõi bởi Git.

---

## 1. Bản Đồ Điều Hướng Nhanh

```
.document/
├── README.md               # Chỉ mục điều hướng tri thức dự án
├── PROJECT_OVERVIEW.md     # Bức tranh toàn cảnh, sứ mệnh và giá trị cốt lõi
├── GOALS_AND_SCOPE.md      # Mục tiêu, giới hạn phạm vi (In-scope / Out-of-scope)
├── REQUIREMENTS.md         # Đặc tả yêu cầu chức năng (FR) và phi chức năng (NFR)
├── ARCHITECTURE.md         # Kiến trúc phân lớp 4 tầng và các nguyên tắc bất biến
├── SYSTEM_MAP.md           # Sơ đồ cấu trúc thư mục src/ và ranh giới module
├── GLOSSARY.md             # Từ điển thuật ngữ, từ viết tắt và Ubiquitous Language
│
├── domain/
│   └── DOMAIN_MODEL.md     # Mô hình nghiệp vụ kho bãi, thùng hàng và cần cẩu
│
├── modules/
│   └── README.md           # Thư mục chứa đặc tả chi tiết từng module con
│
├── interfaces/
│   └── API_CONTRACTS.md    # Sổ đăng ký các hợp đồng API và giao diện công khai
│
├── flows/
│   └── DATA_FLOWS.md       # Luồng di chuyển dữ liệu và chuỗi phát sự kiện
│
├── quality/
│   └── TEST_STRATEGY.md    # Chiến lược kiểm thử tự động và cổng chất lượng
│
├── decisions/              # Nhật ký các quyết định kiến trúc của dự án (ADR)
│   ├── README.md
│   └── ADR/
│       └── ADR-001-decoupled-architecture.md
│
└── open-questions/
    └── OPEN_QUESTIONS.md   # Danh sách các câu hỏi và quyết định chưa chốt
```

---

## 2. Hệ Thống 4 Trạng Thái Xác Nhận Tri Thức

Mọi thông tin trong `.document/` đều được phân định rõ mức độ tin cậy:

| Trạng Thái | Ý Nghĩa Thực Tế | Thẩm Quyền |
| :--- | :--- | :--- |
| `CONFIRMED` | Đã được Human Developer xác nhận chính thức hoặc có quyết định bằng văn bản | Bất biến, AI bắt buộc tuân thủ |
| `PROPOSED` | Đang được đề xuất qua Proposal (`PROP-XXX`), chưa được duyệt | AI không được tự ý lập trình |
| `OPEN_QUESTION` | Vấn đề còn bỏ ngỏ, chưa có thông tin hoặc đang thảo luận | Nằm trong `OPEN_QUESTIONS.md` |
| `IMPLEMENTED` | Đã triển khai hoàn tất trong mã nguồn và vượt qua 100% kiểm thử | Được phản ánh trong source code |

---

## 3. Hướng Dẫn Đọc Dành Cho AI Theo Loại Nhiệm Vụ (Context Efficiency)

AI không cần đọc toàn bộ thư mục này cùng một lúc. Hãy nạp theo nhu cầu:

- **Khi nhận task lập trình**: Đọc task file $\to$ [`.document/interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md) $\to$ [`.document/domain/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.document/domain/DOMAIN_MODEL.md).
- **Khi làm việc với kiến trúc**: Đọc [`.document/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md) $\to$ [`.document/decisions/`](file:///d:/workspace/Algorithm-game-website/.document/decisions/).
- **Khi kiểm thử / verification**: Đọc [`.document/quality/TEST_STRATEGY.md`](file:///d:/workspace/Algorithm-game-website/.document/quality/TEST_STRATEGY.md).
- **Khi làm rõ yêu cầu**: Đọc [`.document/PROJECT_OVERVIEW.md`](file:///d:/workspace/Algorithm-game-website/.document/PROJECT_OVERVIEW.md) $\to$ [`.document/REQUIREMENTS.md`](file:///d:/workspace/Algorithm-game-website/.document/REQUIREMENTS.md).
