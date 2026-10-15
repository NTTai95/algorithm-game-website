# SKILL-C04: Triển Khai Tăng Dần (Implement Incremental)

```yaml
SKILL_ID: SKILL-C04
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: [SKILL-P01]
```

---

## Mục đích

Hướng dẫn quy trình triển khai code trong phạm vi task được giao: từ đọc thiết kế, viết code tăng dần, xác minh từng bước, đến commit đúng quy tắc.

---

## Kích hoạt khi

- Command `IMPLEMENT` trên nhánh `task/TASK-XXX-*`.
- Giai đoạn IMPLEMENTING trong vòng đời task.

## Không áp dụng khi

- Trên nhánh `main` hoặc `develop` — cấm tuyệt đối theo BRANCH_RULES.md.
- Phần 1 (Thiết kế) trong TASK-XXX.md chưa hoàn thành — phải thiết kế trước.

---

## Input cần có

- File task đang CLAIMED: `tasks/active/TASK-XXX.md` (Phần 1 đã hoàn thành).
- ALLOWED FILES của task.
- `.document/interfaces/API_CONTRACTS.md` (nếu task liên quan API).
- Technology skills tương ứng (SKILL-T01, T02, T03... tùy stack).
- SKILL-P01 (project profile — cấu trúc, lệnh test).

---

## Các bước thực hiện

### Bước 1: Đọc và xác nhận thiết kế

Trước khi viết bất kỳ dòng code nào:
- Đọc Phần 1 của TASK-XXX.md (mục tiêu, scope, API contract, data flow, test plan).
- Xác nhận không có conflict với task đang ACTIVE khác.
- Xác nhận ALLOWED FILES không chồng với file task khác đang được sửa.

**Nếu phát hiện vấn đề → DỪNG, báo cáo Human, không tự giải quyết.**

### Bước 2: Triển khai theo từng đơn vị nhỏ

Nguyên tắc:
- Viết code theo từng đơn vị logic nhỏ, có thể test độc lập.
- Không viết toàn bộ tính năng rồi test sau.
- Sau mỗi đơn vị: chạy test liên quan trước khi tiếp tục.

Thứ tự gợi ý:
1. Types/interfaces (nếu cần).
2. Logic domain (src/core/) — test trước.
3. Game system integration (src/game/) nếu cần.
4. UI components (src/components/, src/pages/) nếu cần.
5. Kết nối các tầng.

### Bước 3: Kiểm tra giới hạn phụ thuộc

Sau mỗi đơn vị code, kiểm tra:
- `src/core/` không import Phaser hay React.
- `src/game/` không import từ `src/components/`.
- Không có circular imports.

Tham chiếu: SKILL-P02 (module-boundaries).

### Bước 4: Xử lý phát hiện bất ngờ

Nếu phát hiện:
- **Kiến trúc/API cần thay đổi** → Tạo PROP-XXX.md (xem Rule 8 trong CORE_RULES.md).
- **Code hiện tại khác tài liệu** → Tạo DRIFT-XXX.md (xem Rule 9).
- **File ngoài ALLOWED FILES cần sửa** → DỪNG, báo Human.

Không tự giải quyết bằng cách sửa file ngoài scope.

### Bước 5: Verification trước commit

Chạy tuần tự, phải pass toàn bộ:
```bash
npm run typecheck    # 0 lỗi
npm run lint         # 0 lỗi  
npm run test:run     # Tất cả tests pass
npm run build        # Build thành công
```

Nếu có lỗi → sửa trong ALLOWED FILES → chạy lại.

### Bước 6: Commit đúng quy tắc

Tham chiếu: GIT_RULES.md (DOC-013).
- Commit implementation: `TASK-XXX: <mô tả ngắn>`
- Commit proposal (nếu có): `PROP-XXX: <mô tả>` — commit riêng, không gộp.

---

## Output phải tạo ra

- Code đã implement trong ALLOWED FILES.
- Unit tests tương ứng.
- Kết quả verification (typecheck, lint, test, build).
- Commit(s) đúng quy chuẩn.

## Cách xác minh kết quả

- Tất cả Acceptance Criteria trong TASK-XXX.md đạt 100%.
- Tất cả lệnh verification pass.
- Không có code ngoài ALLOWED FILES bị sửa.
- Task status cập nhật: `READY_FOR_REVIEW`.
