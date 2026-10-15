# SKILL-T01: TypeScript Conventions

```yaml
SKILL_ID: SKILL-T01
GROUP: tech
STATUS: ACTIVE
DEPENDS_ON: []
```

---

## Mục đích

Quy ước TypeScript cụ thể cho dự án. Bổ sung chi tiết kỹ thuật cho SKILL-C04 khi task liên quan TypeScript types, interfaces, và strict mode.

---

## Kích hoạt khi

Task thực sự cần viết hoặc sửa TypeScript code. Kết hợp với SKILL-C04.

---

## Quy ước bắt buộc

### Strict Mode Settings (tsconfig.app.json)
- `strict: true` — bật toàn bộ strict checks.
- `erasableSyntaxOnly: true` — không dùng non-standard TypeScript syntax.
- `verbatimModuleSyntax: true` — import/export phải rõ ràng.

### Không được làm
- `any` type — nếu thực sự cần, ghi comment giải thích và tạo TODO.
- Loose casting: `as unknown as T` — tạo PROP nếu cần thay đổi type design.
- Non-null assertion `!` trừ khi đã kiểm tra bằng guard.
- Type assertion để lách lỗi compiler — sửa type design đúng cách.

### Định nghĩa types/interfaces
- Domain models: explicit interface với từng field rõ ràng.
- Events: discriminated union types cho simulation events (`COMPARE`, `SWAP`, etc.).
- Public API: luôn export types rõ ràng, không dùng inferred return types cho public functions.

### Tổ chức file
- Mỗi file: 1 concern chính.
- Export từ `index.ts` của từng module — không import sâu vào internal files của module khác.
- Types shared giữa tầng: đặt ở tầng thấp nhất trong hierarchy (thường là `src/core/`).

### Kiểm tra TypeScript
```bash
npm run typecheck   # phải = 0 errors trước commit
```
