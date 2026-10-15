# .skills/ — Skills Library (Cross-Project)

Thư viện quy trình và hướng dẫn kỹ thuật có thể tái sử dụng giữa các dự án.

## Cấu trúc

```
.skills/
├── INDEX.md                  ← Routing index (file này)
├── core/                     ← Core skills: quy trình phổ quát, không phụ thuộc stack
│   ├── analyze-requirements.md
│   ├── breakdown-tasks.md
│   ├── implement-incremental.md
│   ├── test-and-verify.md
│   └── update-docs.md
└── tech/                     ← Technology skills: quy ước kỹ thuật theo công nghệ
    ├── typescript.md
    └── vitest.md
```

> **Nguyên tắc phân định ranh giới**:
> - `.skills/`: Quy trình làm việc và hướng dẫn kỹ thuật tái sử dụng.
> - `.ai/`: Quy tắc nền tảng, quyền hạn và cơ chế vận hành AI.
> - `.document/`: Kiến thức, profile, kiến trúc và ranh giới module thực tế của từng dự án.

---

## Phân biệt các thành phần

| Thành phần | Vị trí | Nội dung | Tính chất |
|------------|--------|---------|-----------|
| Core skills | `.skills/core/` | Quy trình phổ quát (phân tích yêu cầu, chia task, implement, test, cập nhật tài liệu) | Tái sử dụng liên dự án |
| Technology skills | `.skills/tech/` | Quy ước kỹ thuật theo ngôn ngữ/framework (TypeScript, Vitest,...) | Tái sử dụng theo công nghệ |
| Project Documentation | `.document/` | Profile dự án, kiến trúc, bản đồ hệ thống, ma trận ranh giới module | Riêng biệt từng repository |

---

## Cách sử dụng Index này

AI đọc bảng này trước khi nạp bất kỳ skill nào:

```
YÊU CẦU ĐẾN
    ↓
Xác định loại công việc & công nghệ
    ↓
Tra bảng AVAILABLE SKILLS → tìm Skill ID
    ↓
Kiểm tra WHEN_TO_LOAD — trigger có khớp không?
    ↓
Nạp skill file → đối chiếu với tài liệu dự án trong .document/
    ↓
Áp dụng vào task
```

**Không nạp toàn bộ skills mặc định.** Chỉ nạp khi trigger khớp.

---

## NHÓM A: Core Skills — AVAILABLE (có file, có thể nạp)

| Skill ID | File | Mục đích | Kích hoạt khi | Không áp dụng khi |
|----------|------|----------|---------------|-------------------|
| SKILL-C01 | `core/analyze-requirements.md` | Phân tích và làm rõ yêu cầu | Nhận yêu cầu mới còn mơ hồ; ANALYZE command | Yêu cầu đã rõ hoàn toàn |
| SKILL-C03 | `core/breakdown-tasks.md` | Phân rã yêu cầu thành task | Sau khi yêu cầu đã rõ; cần tạo task mới | Task đã được tạo đầy đủ |
| SKILL-C04 | `core/implement-incremental.md` | Triển khai tăng dần | IMPLEMENT command trên nhánh task/* | Trên nhánh main/develop |
| SKILL-C05 | `core/test-and-verify.md` | Kiểm thử và xác minh | TEST command; trước READY_FOR_REVIEW | Không có task code |
| SKILL-C07 | `core/update-docs.md` | Cập nhật tài liệu & ghi nhận quyết định | Sau thay đổi kiến trúc/API; DOCUMENT command | Không có thay đổi cần ghi |

> SKILL-C02 (plan-sprint) và SKILL-C06 (review-code): được lên kế hoạch, xem mục PLANNED bên dưới.

---

## NHÓM B: Technology Skills — AVAILABLE (có file, có thể nạp)

| Skill ID | File | Mục đích | Kích hoạt khi | Không áp dụng khi |
|----------|------|----------|---------------|-------------------|
| SKILL-T01 | `tech/typescript.md` | Quy ước TypeScript | Task liên quan TypeScript types/interfaces | Task không có TS code |
| SKILL-T04 | `tech/vitest.md` | Quy ước Vitest testing | TEST command; viết unit test | Không có test cần viết |

---

## NHÓM B: Technology Skills — PLANNED (chưa có file, không thể nạp)

> **Chú ý AI**: Các entries dưới đây chưa có file tương ứng. **Không tải hoặc tham chiếu chúng như skill đã có.**  
> Khi một task cần skill chưa tồn tại → workflow yêu cầu tạo và xác minh skill trước rồi mới áp dụng.

| Skill ID | Mục đích | Trạng thái | Khi nào tạo |
|----------|----------|-----------|-------------|
| SKILL-T02 | Quy ước React 19 | PLANNED — chưa có file | Khi Sprint đầu tiên implement React component |
| SKILL-T03 | Quy ước Phaser 3 | PLANNED — chưa có file | Khi Sprint đầu tiên implement Phaser scene |
| SKILL-T05 | Quy ước Vite build | PLANNED — chưa có file | Khi task liên quan Vite config |

---

## Thông tin dự án cụ thể (Project Context)

Thông tin dự án, kiến trúc, ranh giới module và kế hoạch Sprint được quản lý linh hoạt qua Document Lifecycle System tại `.document/`:
- **Định tuyến tài liệu**: Tra cứu theo [`.document/ROUTER.md`](../.document/ROUTER.md).
- **Tài liệu dự án đang hiệu lực**: Nằm tại `.document/current/` (được tạo on-demand qua từng Sprint).
- **Kế hoạch & nhiệm vụ Sprint**: Nằm tại `.document/sprints/active/`.
- *Xử lý khi chưa có tài liệu*: Tuân thủ quy trình fallback tại `.document/ROUTER.md`, không tự suy diễn kiến trúc chưa duyệt.

---

## Thứ tự ưu tiên khi xung đột

```
BRANCH_RULES.md > CORE_RULES.md > GIT_RULES.md > Skills
```

Skills chỉ bổ sung chi tiết quy trình triển khai trong phạm vi được rules cho phép. Skills không ghi đè quy tắc nền tảng hay quyết định của Human.

---

## Routing Quick Reference

| Tình huống | Core Skill | Tech Skills | Project Document Context |
|-----------|-----------|------------|--------------------------|
| Nhận yêu cầu mơ hồ | SKILL-C01 | — | Tra cứu `.document/ROUTER.md` (Giai đoạn A) |
| Lập kế hoạch Sprint / Chia task | SKILL-C03 | — | `.document/sprints/active/` & `current/` |
| IMPLEMENT code | SKILL-C04 | SKILL-T01 | `.document/current/` (nếu có tài liệu kiến trúc) |
| IMPLEMENT + Unit test | SKILL-C04 + C05 | SKILL-T01, T04 | `.document/current/` (nếu có tài liệu test) |
| IMPLEMENT React component | SKILL-C04 | SKILL-T01, **T02\*** | `.document/current/` |
| IMPLEMENT Phaser scene | SKILL-C04 | SKILL-T01, **T03\*** | `.document/current/` |
| Viết unit test | SKILL-C05 | SKILL-T04 | `.document/current/` hoặc test scripts của repo |
| Cập nhật tài liệu | SKILL-C07 | — | `.document/current/` & `.document/sprints/` |

\*Skills đánh dấu: PLANNED — tạo trước khi áp dụng.

