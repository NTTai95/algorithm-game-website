# Document Lifecycle System (.document)

Hệ thống quản lý vòng đời tài liệu theo mô hình Scrum, có thể tái sử dụng độc lập giữa nhiều repository phần mềm.

---

## 1. Triết Lý & Nguyên Tắc Vận Hành

1. **Khởi Tạo Trống (Blank Slate)**:
   - Một repository mới (hoặc dự án áp dụng hệ thống) bắt đầu từ bộ khung trống, không chứa tài liệu dự án giả định trước.
   - Không áp đặt một bộ tài liệu cố định (như Architecture, System Map, Test Strategy...) cho mọi dự án.
2. **Tài Liệu Sinh Ra Theo Nhu Cầu (Just-In-Time Documentation)**:
   - Tài liệu chỉ được tạo khi Sprint thực sự cần để phục vụ thiết kế, triển khai hoặc nghiệm thu.
   - Không tạo tài liệu chỉ để lấp đầy cấu trúc thư mục.
3. **Human Quyết Định, AI Phân Tích & Thực Thi**:
   - **Human**: Mô tả ý tưởng tự nhiên, đặt mục tiêu, phạm vi và phê duyệt quyết định.
   - **AI**: Đọc router, đặt câu hỏi làm rõ qua hội thoại, đề xuất phương án & Sprint plan, tạo tài liệu theo template và triển khai trong phạm vi được duyệt.
4. **Single Source of Truth (SSOT)**:
   - Mỗi thông tin cốt lõi chỉ có một nguồn sự thật duy nhất.
   - Phân biệt rõ "tài liệu mô tả ý định" (intent) với "source code thực tế" (behavior). Mâu thuẫn phải được ghi nhận và giải quyết, không tự ý suy diễn.

---

## 2. Ranh Giới 3 Trụ Cột

| Trụ Cột | Trách Nhiệm | Phạm Vi Chứa |
| :--- | :--- | :--- |
| **`.ai/`** (AI Governance) | Quyền hạn, quy tắc Git, branch, kiểm soát thay đổi, delegation | Quy tắc vận hành AI độc lập với dự án cụ thể |
| **`.skills/`** (Reusable Skills) | Phương pháp thực hiện: phân tích yêu cầu, chia task, implement, test, cập nhật docs | Quy trình và hướng dẫn kỹ thuật tái sử dụng |
| **`.document/`** (Lifecycle System) | Vòng đời tài liệu, router, quy tắc SSOT, quy trình Scrum, templates, schemas, và tài liệu dự án được tạo qua các Sprint | Framework quản lý tài liệu + dữ liệu sống của dự án |

---

## 3. Cấu Trúc Hệ Thống

```
.document/
├── README.md                      ← Entry point (file này)
├── ROUTER.md                      ← Cơ chế định tuyến và tiết kiệm context
├── RULES.md                       ← Quy tắc quản lý tài liệu & Single Source of Truth
├── WORKFLOW.md                    ← Quy trình Scrum 6 giai đoạn (A -> F)
│
├── templates/                     ← Thư viện template chuẩn hóa (chỉ chứa placeholder)
│   ├── sprint/                    ← Template Sprint Plan & Sprint Review
│   ├── project/                   ← Template Overview, Requirements, Glossary
│   ├── technical/                 ← Template Architecture, System Map, API, Test Strategy
│   └── governance/                ← Template ADR (Architecture Decision Record)
│
├── schemas/                       ← Chuẩn metadata và trạng thái vòng đời
│   ├── metadata-schema.md         ← Chuẩn frontmatter cho mọi tài liệu
│   └── sprint-schema.md           ← Chuẩn trạng thái & chuyển dịch Sprint
│
├── sprints/                       ← Quản lý Sprint theo vòng đời Scrum
│   ├── active/                    ← Sprint đang thực hiện (tối đa 1 Sprint)
│   ├── planned/                   ← Các Sprint dự kiến / backlog đã hoặc chưa duyệt
│   └── completed/                 ← Các Sprint đã nghiệm thu hoàn thành
│
├── current/                       ← Tài liệu dự án đang hiệu lực (được sinh ra qua Sprint)
│   └── (trống khi khởi tạo — chỉ tạo on-demand khi Human phê duyệt)
│
└── archive/                       ← Tài liệu lịch sử, không thuộc active context
    └── legacy-pre-scrum/          ← Tài liệu cũ trước khi áp dụng hệ thống (nếu có)
```

---

## 4. Hướng Dẫn Bắt Đầu Nhanh Cho AI

> **QUY TẮC BẮT BUỘC**: AI **KHÔNG ĐƯỢC** đọc toàn bộ thư mục `.document/` trong mọi lượt xử lý.  
> Hãy đọc [`.document/ROUTER.md`](./ROUTER.md) để xác định chính xác tài liệu cần đọc cho từng tình huống.
