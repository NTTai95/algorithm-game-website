# .ai/ — AI Operating Protocol

Thư mục này là **Giao thức Vận hành AI** (AI Operating Protocol) — tái sử dụng được giữa các repository.  
Tri thức đặc thù dự án nằm tại `.document/`. Sổ tay Human nằm tại `.human/`.

> **Danh Tính Tác Nghiệp**: `Operational Identity = GIT BRANCH + TASK ID + SESSION ID`

---

## 1. ALWAYS-LOAD (Bắt buộc — đọc theo thứ tự)

| # | File | Mục đích |
|---|------|---------|
| 1 | File này (đã xong) | Entry point |
| 2 | [`CATALOG.md`](.ai/CATALOG.md) | Index định tuyến — stable IDs cho mọi tài liệu |
| 3 | [`rules/CORE_RULES.md`](.ai/rules/CORE_RULES.md) | 17 quy tắc bắt buộc + stop conditions |
| 4 | [`rules/BRANCH_RULES.md`](.ai/rules/BRANCH_RULES.md) | Ranh giới quyền hạn nhánh Git (bất biến) |
| 5 | [`tasks/TASK_PROCESSING.md`](.ai/tasks/TASK_PROCESSING.md) | Bảng task đang kích hoạt |

**Sau 5 file này, AI đủ context để ANALYZE hoặc từ chối hành động bất hợp lệ.**

---

## 2. CONDITIONAL LOAD (Chỉ đọc khi cần)

| Khi nào | Đọc |
|---------|-----|
| Cần parse lệnh phức tạp / mơ hồ | [`protocol/COMMANDS.md`](.ai/protocol/COMMANDS.md) |
| Command là DESIGN / IMPLEMENT / TEST | [`protocol/WORKFLOW.md`](.ai/protocol/WORKFLOW.md) |
| Cần tạo PROP-XXX hoặc DRIFT-XXX | [`protocol/PROPOSALS.md`](.ai/protocol/PROPOSALS.md) |
| Command là COMMIT / PUSH | [`rules/GIT_RULES.md`](.ai/rules/GIT_RULES.md) |
| Claim / tiếp tục task cụ thể | `tasks/active/TASK-XXX.md` |
| STOP / PAUSE / bàn giao | [`templates/sessions/SESSION_TEMPLATE.md`](.ai/templates/sessions/SESSION_TEMPLATE.md) |
| Lệnh liên quan kiến trúc | [`.document/ARCHITECTURE.md`](.document/ARCHITECTURE.md) |
| IMPLEMENT tính năng | [`.document/interfaces/API_CONTRACTS.md`](.document/interfaces/API_CONTRACTS.md) |
| TEST / REVIEW | [`.document/quality/TEST_STRATEGY.md`](.document/quality/TEST_STRATEGY.md) |

---

## 3. ON-DEMAND (Chỉ khi tạo artifact)

| Khi nào | File |
|---------|------|
| Tạo task mới | [`templates/tasks/TASK_TEMPLATE.md`](.ai/templates/tasks/TASK_TEMPLATE.md) |
| Tạo proposal | [`templates/changes/PROP_TEMPLATE.md`](.ai/templates/changes/PROP_TEMPLATE.md) |
| Tạo drift report | [`templates/changes/DRIFT_TEMPLATE.md`](.ai/templates/changes/DRIFT_TEMPLATE.md) |
| Tạo tài liệu dự án | [`templates/documentation/`](.ai/templates/documentation/) |
| Cần quy ước tech stack | [`reference/SKILLS.md`](.ai/reference/SKILLS.md) |
| Cần hiểu lịch sử thiết kế | [`reference/DECISIONS.md`](.ai/reference/DECISIONS.md) |

---

## 4. THỨ TỰ QUYỀN HẠN (Khi mâu thuẫn)

```
1. rules/BRANCH_RULES.md   ← Rào chắn bất biến (cao nhất)
2. rules/CORE_RULES.md     ← Quy tắc bắt buộc
3. rules/GIT_RULES.md      ← Chuẩn Git
4. protocol/COMMANDS.md    ← Ngôn ngữ chỉ huy
5. protocol/WORKFLOW.md    ← Quy trình vận hành
6. protocol/PROPOSALS.md   ← Quy trình đề xuất
7. CATALOG.md              ← Định tuyến (không ghi đè rule)
```

> CATALOG.md và README.md KHÔNG được dùng để ghi đè bất kỳ rule nào.

---

## 5. XỬ LÝ KHI KHÔNG TÌM THẤY QUY TẮC

```
Không tìm thấy quy tắc áp dụng?
  → Kiểm tra CATALOG.md (tìm document liên quan theo keyword)
  → Không tìm thấy: DỪNG → Báo cáo Human → Chờ chỉ thị
  → TUYỆT ĐỐI CẤM tự suy diễn quyền chưa được cấp
```

---

## 6. RANH GIỚI THƯ MỤC

```
.ai/        → AI Operating Protocol (reusable, project-agnostic)
.document/  → Project knowledge (architecture, API, domain, quality)
.human/     → Human operating manual (AI không tự động nạp trên task/* và develop)
```

---

## 7. CẤU TRÚC .ai/

```
.ai/
├── README.md                    ← Entry point (file này)
├── CATALOG.md                   ← Stable-ID document index + routing
├── rules/
│   ├── CORE_RULES.md            ← 17 mandatory rules (DOC-003)
│   ├── BRANCH_RULES.md          ← 3-branch permission matrix (DOC-004)
│   └── GIT_RULES.md             ← Commit + push protocol (DOC-013)
├── protocol/
│   ├── COMMANDS.md              ← Command vocabulary + modifiers (DOC-010)
│   ├── WORKFLOW.md              ← Task lifecycle state machine (DOC-011)
│   └── PROPOSALS.md             ← Proposal + drift protocol — single authority (DOC-012)
├── tasks/
│   ├── TASK_PROCESSING.md       ← Active task board (DOC-005)
│   ├── active/                  ← Active task files
│   ├── completed/               ← Archived task files
│   └── notes/                   ← Task notes
├── sessions/                    ← Session handoff logs
├── changes/
│   ├── proposals/               ← PROP-XXX.md files
│   └── drift/                   ← DRIFT-XXX.md files
├── templates/
│   ├── tasks/TASK_TEMPLATE.md
│   ├── sessions/SESSION_TEMPLATE.md
│   ├── changes/{PROP,DRIFT}_TEMPLATE.md
│   └── documentation/           ← 12 document templates for .document/
└── reference/
    ├── DECISIONS.md             ← ADR-001 to ADR-004 (historical)
    └── SKILLS.md                ← Tech stack reference (project-specific)
```
