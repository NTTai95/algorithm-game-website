# SKILL-C04: Triển Khai Tăng Dần (Implement Incremental)

```yaml
SKILL_ID: SKILL-C04
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: []
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

- File task đang CLAIMED: `.ai/tasks/active/TASK-XXX.md` (Phần 1 đã hoàn thành).
- ALLOWED FILES của task.
- **Tài liệu kiến trúc & ranh giới module của dự án**:
  - *Cách định vị*: Tra cứu qua [`.document/ROUTER.md`](../../.document/ROUTER.md) hoặc [`.ai/CATALOG.md`](../../.ai/CATALOG.md) (tìm System Map / Architecture / Module Boundaries).
  - *Vị trí trong cấu trúc mới*: Nằm tại `.document/current/` (ví dụ: `.document/current/SYSTEM_MAP.md` hoặc `.document/current/ARCHITECTURE.md` nếu đã được tạo qua Sprint).
  - *Đường dẫn tương đương*: Nếu không có đường dẫn mặc định, tìm tài liệu kiến trúc tương đương được ghi nhận trong catalog/index của dự án.
  - *Xử lý khi thiếu (Khởi tạo trống)*: Nếu thư mục `.document/current/` chưa có tài liệu tương đương, ghi nhận giới hạn này vào task/session log và tiếp tục triển khai trong phạm vi file được giao; **tuyệt đối không tự suy diễn hoặc tạo quy tắc kiến trúc mới chưa được phê duyệt**.
- **Hợp đồng giao diện (API Contracts)**:
  - Tra cứu qua [`.document/ROUTER.md`](../../.document/ROUTER.md) (vị trí: `.document/current/API_CONTRACTS.md` nếu đã được tạo qua Sprint).

- **Technology skills tương ứng** — chỉ nạp skills **có file thực tế**:
  - SKILL-T01 (`tech/typescript.md`) — luôn cần cho TypeScript code.
  - SKILL-T04 (`tech/vitest.md`) — khi viết test.
  - SKILL-T02/T03/T05 — **PLANNED, chưa có file**. Nếu task cần, tạo skill trước rồi mới áp dụng.



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

Thứ tự gợi ý (ví dụ cho dự án phân tầng / game):
1. Types/interfaces (nếu cần).
2. Logic domain (ví dụ: `src/core/`) — test trước.
3. System orchestration / integration (ví dụ: `src/game/`) nếu cần.
4. UI components (ví dụ: `src/components/`, `src/pages/`) nếu cần.
5. Kết nối các tầng.

### Bước 3: Kiểm tra ranh giới module (Module Boundaries)

Sau mỗi đơn vị code, kiểm tra tính toàn vẹn phụ thuộc:
- **Đối chiếu import**: Tra cứu Ma trận Ranh giới Import từ tài liệu kiến trúc của dự án (nằm tại `.document/current/SYSTEM_MAP.md` hoặc tài liệu tương đương được định tuyến qua [`.document/ROUTER.md`](../../.document/ROUTER.md)).
- **Nguyên tắc phân tầng**: Tuân thủ nghiêm ngặt nguyên tắc phụ thuộc một chiều; cấm phụ thuộc vòng. Các tầng domain/core không được phụ thuộc vào rendering, UI framework hoặc môi trường bên ngoài.
- **Kiểm tra tự động**: Chạy các lệnh kiểm tra kiểu và lint của dự án (ví dụ: `npm run typecheck`, `npm run lint`) để phát hiện sớm các vi phạm import.
- **Xử lý khi thiếu tài liệu**: Nếu repository chưa có ma trận ranh giới chính thức trong `.document/current/`, duy trì tính cô lập tối đa của module đang sửa theo thiết kế đã duyệt trong task; tuyệt đối không tự ý thêm phụ thuộc xuyên tầng.




### Bước 4: Xử lý phát hiện bất ngờ

Nếu phát hiện:
- **Kiến trúc/API cần thay đổi** → Tạo PROP-XXX.md (xem Rule 8 trong CORE_RULES.md).
- **Code hiện tại khác tài liệu** → Tạo DRIFT-XXX.md (xem Rule 9).
- **File ngoài ALLOWED FILES cần sửa** → DỪNG, báo Human.

Không tự giải quyết bằng cách sửa file ngoài scope.

### Bước 5: Verification trước commit

Chạy tuần tự toàn bộ cổng kiểm tra của dự án (dưới đây là ví dụ cho stack Node/TypeScript; điều chỉnh theo scripts/commands thực tế của repository):
```bash
npm run typecheck    # (Ví dụ) Kiểm tra kiểu dữ liệu tĩnh: 0 lỗi
npm run lint         # (Ví dụ) Kiểm tra linter: 0 lỗi  
npm run test:run     # (Ví dụ) Chạy toàn bộ test suites: Tất cả pass
npm run build        # (Ví dụ) Đóng gói ứng dụng: Thành công
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
