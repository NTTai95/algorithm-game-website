# Giao Thức Vận Hành AI (.ai) — Reusable AI Operating Protocol

Thư mục `.ai/` là **Giao thức Vận hành Tự động hóa dành cho AI** (AI Operating Protocol). Thư mục này định nghĩa toàn bộ quy tắc hành vi, ranh giới quyền hạn, ngôn ngữ chỉ huy, vòng đời tác vụ và các biểu mẫu chuẩn hóa. 

> **Tính Chất Tái Sử Dụng (Portability)**:  
> Thư mục `.ai/` hoàn toàn độc lập với sản phẩm cụ thể và có thể tái sử dụng cho nhiều repository khác nhau mà không bị gắn chặt vào nghiệp vụ của Algorithm Game Website.  
> - **Quy tắc & Giao thức AI**: Nằm tại `.ai/`.  
> - **Sổ tay & Bộ nhớ của Human**: Nằm tại `.human/`.  
> - **Tri thức đặc thù của Dự án**: Nằm tại `.document/`.

---

## 1. Cơ Chế Đọc Tài Liệu Tiết Kiệm Ngữ Cảnh (Context-Efficient Tiered Ingestion)

AI **TUYỆT ĐỐI KHÔNG ĐỌC TOÀN BỘ** tài liệu khi khởi động một phiên làm việc. Hãy đọc theo 2 tầng:

### Tầng 1 — Luôn Cần Thiết (Bắt buộc nạp khi khởi động)
1. [`.ai/README.md`](file:///d:/workspace/Algorithm-game-website/.ai/README.md): Chỉ mục và cơ chế điều hướng.
2. [`.ai/AI_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/AI_RULES.md): 17 quy tắc tác nghiệp cốt lõi và rào chắn an toàn.
3. [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md): Đặc tả ngôn ngữ chỉ huy tĩnh và quy tắc giải mã prompt.
4. [`.ai/BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md): Ranh giới 3 nhánh Git (`main`, `develop`, `task/*`).
5. [`.ai/GIT_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/GIT_RULES.md): Chuẩn commit, quy tắc tách commit và bảo vệ nhánh.
6. File nhiệm vụ hiện tại (nếu đang được giao, ví dụ: `.ai/tasks/active/TASK-XXX.md`).

### Tầng 2 — Đọc Theo Nhu Cầu Tác Nghiệp (Chỉ nạp tài liệu liên quan đến loại task)
- **Khi triển khai tính năng (`IMPLEMENT`)**:
  - Đọc file task cụ thể trong `.ai/tasks/active/`.
  - Đọc [`.ai/WORKFLOW.md`](file:///d:/workspace/Algorithm-game-website/.ai/WORKFLOW.md).
  - Đọc hợp đồng liên quan trong [`.document/interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md) và [`.document/domain/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.document/domain/DOMAIN_MODEL.md).
- **Khi thay đổi hoặc khảo sát kiến trúc (`ANALYZE` / `DESIGN` / `PROPOSE`)**:
  - Đọc [`.document/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md).
  - Đọc [`.document/decisions/`](file:///d:/workspace/Algorithm-game-website/.document/decisions/) và [`.ai/templates/changes/PROP_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/changes/PROP_TEMPLATE.md).
- **Khi chạy và kiểm tra chất lượng (`TEST` / `REVIEW`)**:
  - Đọc [`.document/quality/TEST_STRATEGY.md`](file:///d:/workspace/Algorithm-game-website/.document/quality/TEST_STRATEGY.md).
- **Khi bàn giao phiên hoặc đổi task (`STOP` / `PAUSE`)**:
  - Đọc [`.ai/templates/sessions/SESSION_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/sessions/SESSION_TEMPLATE.md).
- **Khi tạo mới tài liệu dự án (`DOCUMENT`)**:
  - Đọc template tương ứng trong [`.ai/templates/documentation/`](file:///d:/workspace/Algorithm-game-website/.ai/templates/documentation/).

---

## 2. Bản Thể Hoán Đổi & Ranh Giới Quyền Hạn
- **Định danh tác nghiệp duy nhất**:
  $$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
- **Ranh giới nhánh Git**:
  - `main`: Chỉ dành cho Quy hoạch, Kiến trúc, Giao thức, Tài liệu. **TUYỆT ĐỐI CẤM SỬA `/src/`**. (Tuần tự: 1 AI).
  - `develop`: Chỉ dành cho Tích hợp, Kiểm thử hồi quy, Đánh giá Sprint. **TUYỆT ĐỐI CẤM SỬA `/src/`**. (Tuần tự: 1 AI).
  - `task/TASK-XXX-*`: Nhánh **DUY NHẤT ĐƯỢC PHÉP SỬA `/src/`** trong phạm vi `ALLOWED FILES`. (Đa tác nhân: chạy đồng thời).

---

## 3. Cấu Trúc Chi Tiết Thư Mục `.ai/`

```
.ai/
├── README.md               # Tài liệu này (Chỉ mục điều hướng & cơ chế nạp tầng)
├── AI_RULES.md             # Các quy tắc hành vi bắt buộc của AI
├── CONTROL.md              # Đặc tả ngôn ngữ chỉ huy tĩnh (Commands & Modifiers)
├── BRANCH_RULES.md         # Quy định quyền hạn 3 nhánh logic và ma trận dừng Halt Rule
├── GIT_RULES.md            # Quy chuẩn commit, phân nhánh và bảo vệ lịch sử
├── WORKFLOW.md             # Chu trình vòng đời tác vụ và các bước bàn giao
├── SKILLS.md               # Sổ đăng ký năng lực kỹ thuật cần thiết
├── DECISIONS.md            # Các quyết định kiến trúc của riêng AI Protocol (ADR-001 -> ADR-004)
│
├── skills/                 # Thư mục chứa các kỹ năng mở rộng
│   └── README.md
│
├── templates/              # Thư mục tập trung toàn bộ các biểu mẫu dùng chung
│   ├── README.md
│   ├── tasks/
│   │   └── TASK_TEMPLATE.md
│   ├── sessions/
│   │   └── SESSION_TEMPLATE.md
│   ├── changes/
│   │   ├── PROP_TEMPLATE.md
│   │   └── DRIFT_TEMPLATE.md
│   └── documentation/      # 12 template chuẩn hóa cho tài liệu dự án (.document/)
│       ├── README.md
│       ├── PROJECT_OVERVIEW_TEMPLATE.md
│       ├── GOALS_AND_SCOPE_TEMPLATE.md
│       ├── REQUIREMENTS_TEMPLATE.md
│       ├── ARCHITECTURE_TEMPLATE.md
│       ├── SYSTEM_MAP_TEMPLATE.md
│       ├── DOMAIN_MODEL_TEMPLATE.md
│       ├── MODULE_SPEC_TEMPLATE.md
│       ├── API_CONTRACTS_TEMPLATE.md
│       ├── DATA_FLOW_TEMPLATE.md
│       ├── TEST_STRATEGY_TEMPLATE.md
│       ├── GLOSSARY_TEMPLATE.md
│       └── ADR_TEMPLATE.md
│
├── tasks/                  # Quản lý tác vụ đang hoạt động và hoàn tất
│   ├── README.md
│   ├── TASK_PROCESSING.md  # Bảng điều phối nhẹ (3-5 active tasks)
│   ├── active/
│   ├── completed/
│   └── notes/
│
├── changes/                # Quản lý đề xuất và báo cáo sai lệch
│   ├── README.md
│   ├── proposals/          # Lưu trữ PROP-XXX.md
│   └── drift/              # Lưu trữ DRIFT-XXX.md
│
└── sessions/               # Lưu trữ nhật ký bàn giao phiên (SESSION-XXX.md)
    └── README.md
```
