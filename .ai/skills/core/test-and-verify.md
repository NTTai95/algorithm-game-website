# SKILL-C05: Kiểm Thử và Xác Minh (Test and Verify)

```yaml
SKILL_ID: SKILL-C05
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: [SKILL-T04, SKILL-P01]
```

---

## Mục đích

Hướng dẫn AI chạy kiểm thử đầy đủ, xác minh tính đúng đắn của code đã triển khai, phân biệt test nào cần viết thêm và test nào đã đủ.

---

## Kích hoạt khi

- Command `TEST` trên bất kỳ nhánh nào.
- Trước khi đánh dấu task `READY_FOR_REVIEW`.
- Sau khi apply patch từ Experimental Delegation.

## Không áp dụng khi

- Không có code thay đổi để test.

---

## Input cần có

- Acceptance criteria từ TASK-XXX.md.
- ALLOWED FILES (để biết phạm vi test).
- SKILL-T04 (Vitest conventions).
- SKILL-P01 (lệnh test của dự án).

---

## Các bước thực hiện

### Bước 1: Chạy bộ test hiện có

```bash
npm run test:run
```

Ghi nhận: số test pass, số fail, test nào fail và lý do.

### Bước 2: Kiểm tra regression

Đảm bảo test cũ không bị gãy:
- Tất cả test trong `src/test/` và `src/**/*.test.ts` phải pass.
- Nếu test cũ fail sau thay đổi → đây là regression bug → PHẢI sửa trước khi tiếp tục.

### Bước 3: Xác minh coverage theo Acceptance Criteria

Với mỗi Acceptance Criteria trong TASK-XXX.md:
- Xác nhận có test case tương ứng.
- Test case phải kiểm tra cả happy path và edge cases đã ghi trong Test Plan.

### Bước 4: Viết test còn thiếu

Ưu tiên viết test cho:
- Logic domain trong `src/core/` (không cần browser/canvas).
- Các hàm có nhiều nhánh điều kiện.
- Edge cases đã xác định trong Test Plan.

Không viết test giả tạo chỉ để tăng coverage số liệu.

### Bước 5: Chạy full verification

```bash
npm run typecheck    # TypeScript strict check
npm run lint         # ESLint
npm run test:run     # Vitest
npm run build        # Vite build
```

Tất cả phải pass mới được tiếp tục.

### Bước 6: Ghi báo cáo kết quả

Báo cáo TEST phải ghi rõ:
- Số test pass / fail.
- Các test case quan trọng đã viết.
- Kết quả typecheck, lint, build.
- Bất kỳ hạn chế nào (test chưa cover được gì và tại sao).

---

## Output phải tạo ra

- Báo cáo kết quả test (pass/fail + lý do).
- Test mới viết (nếu thiếu).
- Xác nhận tất cả Acceptance Criteria đã được test.

## Cách xác minh kết quả

- `npm run test:run` → 0 fail.
- `npm run typecheck` → 0 lỗi.
- `npm run lint` → 0 lỗi.
- `npm run build` → success.
- Mỗi Acceptance Criteria có ít nhất 1 test case.
