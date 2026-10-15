# .ai/ — AI Operating Protocol

Thư mục này là **Giao thức Vận hành AI** (AI Operating Protocol) — tái sử dụng được giữa các repository.  
Tri thức đặc thù dự án nằm tại `.document/`. Sổ tay Human nằm tại `.human/`.

> **Danh Tính Tác Nghiệp**: `Operational Identity = GIT BRANCH + TASK ID + SESSION ID`

---

## 1. ALWAYS-LOAD (Bắt buộc — đọc theo thứ tự)

| # | File | Mục đích |
|---|------|---------|
| 1 | File này (đã xong) | Entry point |
| 2 | [`CATALOG.md`](CATALOG.md) | Index định tuyến — stable IDs cho mọi tài liệu |
| 3 | [`rules/CORE_RULES.md`](rules/CORE_RULES.md) | 17 quy tắc bắt buộc + stop conditions |
| 4 | [`rules/BRANCH_RULES.md`](rules/BRANCH_RULES.md) | Ranh giới quyền hạn nhánh Git (bất biến) |
| 5 | [`tasks/TASK_PROCESSING.md`](tasks/TASK_PROCESSING.md) | Bảng task đang kích hoạt |

**Sau 5 file này, AI đủ context để ANALYZE hoặc từ chối hành động bất hợp lệ.**

---

## 2. CONDITIONAL LOAD (Chỉ đọc khi cần)

| Khi nào | Đọc |
|---------|-----|
| Cần parse lệnh phức tạp / mơ hồ | [`protocol/COMMANDS.md`](protocol/COMMANDS.md) |
| Command là DESIGN / IMPLEMENT / TEST | [`protocol/WORKFLOW.md`](protocol/WORKFLOW.md) |
| Cần tạo PROP-XXX hoặc DRIFT-XXX | [`protocol/PROPOSALS.md`](protocol/PROPOSALS.md) |
| Command là COMMIT / PUSH | [`rules/GIT_RULES.md`](rules/GIT_RULES.md) |
| Claim / tiếp tục task cụ thể | `tasks/active/TASK-XXX.md` |
| STOP / PAUSE / bàn giao | [`templates/sessions/SESSION_TEMPLATE.md`](templates/sessions/SESSION_TEMPLATE.md) |
| Tra cứu tài liệu kiến trúc / sprint / test | [`.document/ROUTER.md`](../.document/ROUTER.md) (DOC-016) |
| Yêu cầu mơ hồ hoặc cần chọn skill | [`.skills/INDEX.md`](../.skills/INDEX.md) (DOC-029) |
| Cần tìm module trước khi đọc code | [`.code-map/INDEX.md`](../.code-map/INDEX.md) (DOC-041) |
| Human kích hoạt DELEGATE | [`protocol/EXPERIMENTAL-DELEGATE.md`](protocol/EXPERIMENTAL-DELEGATE.md) (DOC-040) |

---

## 3. ON-DEMAND (Chỉ khi tạo artifact)

| Khi nào | File |
|---------|------|
| Tạo task mới | [`templates/tasks/TASK_TEMPLATE.md`](templates/tasks/TASK_TEMPLATE.md) |
| Tạo proposal | [`templates/changes/PROP_TEMPLATE.md`](templates/changes/PROP_TEMPLATE.md) |
| Tạo drift report | [`templates/changes/DRIFT_TEMPLATE.md`](templates/changes/DRIFT_TEMPLATE.md) |
| Tạo tài liệu dự án hoặc Sprint | [`.document/templates/`](../.document/templates/) (DOC-023) |
| Cần quy ước tech stack nhanh | [`reference/SKILLS.md`](reference/SKILLS.md) (DOC-024, legacy redirect) |

| Cần hiểu lịch sử thiết kế | [`reference/DECISIONS.md`](reference/DECISIONS.md) |
| Cần skill cụ thể | Xem [`.skills/INDEX.md`](../.skills/INDEX.md) → chọn skill có file |
| Cần bản đồ module | Xem [`.code-map/INDEX.md`](../.code-map/INDEX.md) và chọn module map |

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
│   ├── PROPOSALS.md             ← Proposal + drift protocol (DOC-012)
│   └── EXPERIMENTAL-DELEGATE.md ← [EXPERIMENTAL] Delegation command (DOC-040)
├── tasks/
│   ├── TASK_PROCESSING.md       ← Active task board (DOC-005)
│   ├── active/                  ← Active task files
│   ├── completed/               ← Archived task files
│   └── notes/                   ← Task notes
├── sessions/                    ← Session handoff logs
├── changes/
│   ├── proposals/               ← PROP-XXX.md files
│   ├── drift/                   ← DRIFT-XXX.md files
│   └── delegations/             ← DEL-XXX.md packages [EXPERIMENTAL]
├── templates/
│   ├── tasks/TASK_TEMPLATE.md
│   ├── sessions/SESSION_TEMPLATE.md
│   ├── changes/{PROP,DRIFT}_TEMPLATE.md
│   └── documentation/           ← 12 document templates for .document/
└── reference/
    ├── DECISIONS.md             ← ADR-001 to ADR-004 (historical)
    └── SKILLS.md                ← Legacy redirect → .document/ và .skills/INDEX.md

.skills/                         ← Cross-project skills library (DOC-029)
├── INDEX.md                     ← Routing index: available + planned skills
├── core/                        ← Core skills (SKILL-C01/C03/C04/C05/C07)
└── tech/                        ← Technology skills (SKILL-T01/T04; T02/T03/T05: PLANNED)

.code-map/                       ← Source code navigation map (DOC-041)
├── INDEX.md                     ← Routing index: concept → module
├── SCHEMA.md                    ← Schema cho module map files
├── UPDATE_PROTOCOL.md          ← Khi nào và cách cập nhật bản đồ
└── modules/                     ← Chi tiết từng module (BOOTSTRAP — xác minh với source)
    ├── core.md                  ← src/core/ map
    └── game.md                  ← src/game/ map

.document/                       ← Document Lifecycle System (Scrum-based)
├── README.md                    ← Entry point & nguyên tắc 3 trụ cột
├── ROUTER.md                    ← Router phân tầng & định tuyến context
├── RULES.md                     ← Quy tắc quản lý tài liệu & Single Source of Truth
├── WORKFLOW.md                  ← Quy trình Scrum 6 giai đoạn (A -> F)
├── templates/                   ← Thư viện template (Sprint, Project, Technical, Governance)
├── schemas/                     ← Metadata & Sprint lifecycle schemas
├── sprints/                     ← Quản lý Sprint (active/, planned/, completed/)
├── current/                     ← Tài liệu dự án đang hiệu lực (tạo on-demand)
└── archive/                     ← Kho lưu trữ lịch sử (legacy-pre-scrum/)
```

