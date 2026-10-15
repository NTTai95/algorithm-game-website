# .ai/skills/ — Skills Index & Routing

**Authority**: DOC-030 (Skills System). ON-DEMAND — không nạp mặc định.  
**Related**: DOC-003 (CORE_RULES.md) · DOC-010 (COMMANDS.md) · DOC-031 (Skills Project Profile)

> **Nguyên tắc**: Skills mô tả CÁCH thực hiện công việc. Quyền hạn, giới hạn và quy tắc nền tảng vẫn nằm ở `.ai/rules/`. Skills không được ghi đè quy tắc bất kỳ trong `.ai/rules/`.

---

## Cách sử dụng Index này

**Trước khi nạp bất kỳ skill nào**, AI đọc bảng này để chọn đúng skill cần thiết.

```
YÊU CẦU ĐẾN
    ↓
Xác định loại công việc (core? tech? project?)
    ↓
Tra bảng Index → tìm Skill ID phù hợp
    ↓
Kiểm tra WHEN_TO_LOAD và EXCLUDES
    ↓
Nạp skill file tương ứng
    ↓
Nạp skill phụ thuộc nếu cần (DEPENDS_ON)
    ↓
Áp dụng vào task hiện tại
```

**Không nạp toàn bộ skills theo mặc định.** Chỉ nạp khi trigger khớp.

---

## NHÓM A: Core Skills (Quy trình phổ quát, không phụ thuộc công nghệ)

| Skill ID | File | Mục đích | Kích hoạt khi | Không áp dụng khi |
|----------|------|----------|---------------|-------------------|
| SKILL-C01 | `core/analyze-requirements.md` | Phân tích và làm rõ yêu cầu | Nhận yêu cầu mới còn mơ hồ; ANALYZE command | Yêu cầu đã rõ hoàn toàn |
| SKILL-C02 | `core/plan-sprint.md` | Lập kế hoạch Sprint | Human yêu cầu lên kế hoạch Sprint mới | Trong task đang triển khai |
| SKILL-C03 | `core/breakdown-tasks.md` | Phân rã yêu cầu thành task | Sau khi yêu cầu đã rõ; cần tạo task mới | Task đã được tạo đầy đủ |
| SKILL-C04 | `core/implement-incremental.md` | Triển khai tăng dần | IMPLEMENT command trên nhánh task/* | Trên nhánh main/develop |
| SKILL-C05 | `core/test-and-verify.md` | Kiểm thử và xác minh | TEST command; trước READY_FOR_REVIEW | Không có task code |
| SKILL-C06 | `core/review-code.md` | Review code | REVIEW command | Trên nhánh không có code |
| SKILL-C07 | `core/update-docs.md` | Cập nhật tài liệu & ghi nhận quyết định | Sau thay đổi kiến trúc/API; DOCUMENT command | Không có thay đổi cần ghi |

---

## NHÓM B: Technology Skills (Quy ước kỹ thuật theo stack)

| Skill ID | File | Mục đích | Kích hoạt khi | Không áp dụng khi |
|----------|------|----------|---------------|-------------------|
| SKILL-T01 | `tech/typescript.md` | Quy ước TypeScript | Task liên quan TypeScript types/interfaces | Task không có TS code |
| SKILL-T02 | `tech/react.md` | Quy ước React 19 | Task liên quan React components/hooks | Task không có React code |
| SKILL-T03 | `tech/phaser.md` | Quy ước Phaser 3 | Task liên quan Phaser scenes/sprites | Task không có Phaser code |
| SKILL-T04 | `tech/vitest.md` | Quy ước Vitest testing | TEST command; viết unit test | Không có test cần viết |
| SKILL-T05 | `tech/vite.md` | Quy ước Vite build | Liên quan bundler/build config | Không có build config |

> **Lưu ý**: Chỉ tạo technology skills cho stack thực tế của dự án. Không tạo trước cho công nghệ chưa dùng.

---

## NHÓM C: Project Profile (Thông tin đặc thù repository)

| Skill ID | File | Mục đích | Kích hoạt khi |
|----------|------|----------|---------------|
| SKILL-P01 | `project/profile.md` | Stack, cấu trúc, quy ước, lệnh test của dự án | Bất kỳ task implementation nào |
| SKILL-P02 | `project/module-boundaries.md` | Ranh giới module đã xác định | IMPLEMENT liên quan nhiều module |

---

## Thứ tự ưu tiên khi xung đột

Khi skill mô tả cách làm khác với quy tắc trong `.ai/rules/`, **rules luôn thắng**:

```
BRANCH_RULES.md > CORE_RULES.md > GIT_RULES.md > Skills
```

Skills chỉ bổ sung CHI TIẾT TRIỂN KHAI trong phạm vi được rules cho phép.

---

## Routing Quick Reference

| Tình huống | Core Skill | Tech Skills | Project |
|-----------|-----------|------------|---------|
| Nhận yêu cầu mơ hồ | SKILL-C01 | — | — |
| Lên kế hoạch Sprint | SKILL-C02 | — | SKILL-P01 |
| Tạo task mới | SKILL-C03 | — | SKILL-P01 |
| IMPLEMENT TypeScript/React | SKILL-C04 | SKILL-T01, T02 | SKILL-P01, P02 |
| IMPLEMENT Phaser scene | SKILL-C04 | SKILL-T01, T03 | SKILL-P01, P02 |
| Viết unit test Vitest | SKILL-C05 | SKILL-T04 | SKILL-P01 |
| REVIEW code | SKILL-C06 | Theo stack liên quan | SKILL-P01 |
| Cập nhật tài liệu | SKILL-C07 | — | — |
