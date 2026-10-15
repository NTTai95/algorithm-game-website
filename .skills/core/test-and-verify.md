# SKILL-C05: Kiểm Thử và Xác Minh (Test and Verify)

```yaml
SKILL_ID: SKILL-C05
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: []
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
- **Chiến lược kiểm thử & các cổng chất lượng của dự án**:
  - *Cách định vị*: Tra cứu qua [`.document/ROUTER.md`](../../.document/ROUTER.md) hoặc [`.ai/CATALOG.md`](../../.ai/CATALOG.md) (tìm Test Strategy / Quality Gates).
  - *Vị trí trong cấu trúc mới*: Nằm tại `.document/current/TEST_STRATEGY.md` (nếu đã được tạo qua Sprint).
  - *Đường dẫn tương đương*: Nếu không có đường dẫn mặc định, tìm tài liệu chiến lược kiểm thử tương đương được ghi nhận trong catalog/index.
  - *Xử lý khi thiếu (Khởi tạo trống)*: Nếu thư mục `.document/current/` chưa có tài liệu kiểm thử, tra cứu các lệnh kiểm thử và build có sẵn trong cấu hình dự án (ví dụ: scripts trong `package.json`), ghi nhận giới hạn này vào báo cáo kiểm thử và tiếp tục trong phạm vi có thể xác minh; **tuyệt đối không tự đặt ra chiến lược kiểm thử hoặc cổng chất lượng chưa được phê duyệt**.
- **Technology skills liên quan đến testing** (ví dụ: `tech/vitest.md` khi stack dự án dùng Vitest).




---

## Các bước thực hiện

### Bước 1: Chạy bộ test hiện có

Thực thi lệnh kiểm thử được định nghĩa trong tài liệu chiến lược kiểm thử hoặc cấu hình dự án (ví dụ tiêu chuẩn: `npm run test:run`):
```bash
npm run test:run
```

Ghi nhận: số test pass, số fail, test nào fail và lý do.

### Bước 2: Kiểm tra regression

Đảm bảo test cũ không bị gãy:
- Tất cả test hiện có trong repository (ví dụ: `src/test/` hoặc các thư mục kiểm thử tương đương) phải pass.
- Nếu test cũ fail sau thay đổi → đây là regression bug → PHẢI sửa trước khi tiếp tục.

### Bước 3: Xác minh coverage theo Acceptance Criteria

Với mỗi Acceptance Criteria trong TASK-XXX.md:
- Xác nhận có test case tương ứng.
- Test case phải kiểm tra cả happy path và edge cases đã ghi trong Test Plan.

### Bước 4: Viết test còn thiếu

Ưu tiên viết test cho:
- Logic domain / core độc lập (không cần browser hay môi trường hiển thị).
- Các hàm có nhiều nhánh điều kiện.
- Edge cases đã xác định trong Test Plan.


Không viết test giả tạo chỉ để tăng coverage số liệu.

### Bước 5: Chạy full verification

Chạy đầy đủ các cổng kiểm soát chất lượng của dự án (xác định từ tài liệu kiểm thử của repo hoặc scripts trong cấu hình dự án). Ví dụ tiêu chuẩn:
```bash
npm run typecheck    # TypeScript strict check (nếu dự án dùng TS)
npm run lint         # Linter
npm run test:run     # Test runner
npm run build        # Build đóng gói
```

Tất cả các cổng kiểm tra bắt buộc của dự án phải pass mới được tiếp tục.

### Bước 6: Ghi báo cáo kết quả

Báo cáo TEST phải ghi rõ:
- Số test pass / fail.
- Các test case quan trọng đã viết.
- Kết quả chạy các cổng verification (typecheck, lint, build...).
- Bất kỳ giới hạn nào (ví dụ: tài liệu kiểm thử chưa bao phủ, test chưa cover được gì và lý do kỹ thuật).


---

## Output phải tạo ra

- Báo cáo kết quả test (pass/fail + lý do).
- Test mới viết (nếu thiếu).
- Xác nhận tất cả Acceptance Criteria đã được test.

## Cách xác minh kết quả

- Toàn bộ lệnh test của dự án pass (ví dụ: `npm run test:run` → 0 fail).
- Toàn bộ cổng kiểm tra tĩnh pass (ví dụ: `npm run typecheck` → 0 lỗi, `npm run lint` → 0 lỗi).
- Cổng đóng gói build pass (ví dụ: `npm run build` → success).
- Mỗi Acceptance Criteria có ít nhất 1 test case.
