# EXPERIMENTAL-DELEGATE — Ủy Quyền Task Cho AI Phụ

```yaml
COMMAND_ID: EXPERIMENTAL-DELEGATE
STATUS: EXPERIMENTAL
ENABLED_BY_DEFAULT: false
AUTHORITY: DOC-040
RELATED: DOC-003 (CORE_RULES.md), DOC-004 (BRANCH_RULES.md), DOC-010 (COMMANDS.md)
LAST_UPDATED: 2026-10-15
```

> **EXPERIMENTAL — TẮT MẶC ĐỊNH**  
> Command này chỉ được kích hoạt khi Human yêu cầu rõ ràng bằng cú pháp `DELEGATE <task-description>` hoặc `EXPERIMENTAL-DELEGATE <task-description>`.  
> **Trong task thông thường, AI chính KHÔNG tự gọi command này.**

---

## 1. Mục đích và giới hạn

Command này cho phép AI chính phân tích một task, xác định phần công việc có thể tách độc lập, chuẩn bị **delegation package**, và nhận lại **PATCH** từ AI phụ để review và áp dụng.

**Không phụ thuộc bất kỳ service bên ngoài hay dependency mới.** Nếu môi trường hỗ trợ gọi AI worker trực tiếp, command mô tả cách dùng. Nếu không, AI chính tạo delegation package để chuyển thủ công. Không giả định đã gọi thành công nếu thực tế không thực hiện được.

---

## 2. Kích hoạt

### Cú pháp

```
DELEGATE <mô tả công việc>
hoặc
EXPERIMENTAL-DELEGATE <mô tả công việc>
```

### Điều kiện kích hoạt

- Human gõ lệnh rõ ràng theo cú pháp trên.
- AI đang trên nhánh `task/TASK-XXX-*` hoặc `main` (tùy phần việc).
- Công việc cần ủy quyền đã được AI chính đánh giá là phù hợp (xem Bước 3).

### KHÔNG kích hoạt khi

- Task thông thường mà Human không yêu cầu delegation.
- Công việc cần quyết định nghiệp vụ, kiến trúc, hay hợp đồng chưa xác định.
- Công việc quá nhỏ (chi phí coordination cao hơn lợi ích).

---

## 3. Trách nhiệm của AI chính

### Bước 1: Đánh giá tính phù hợp

Trước khi ủy quyền, AI chính phải đánh giá:

| Câu hỏi | Phải đánh giá |
|---------|--------------|
| Phần công việc có phạm vi rõ ràng, cố định? | Nếu không → giữ lại |
| Hợp đồng giao tiếp đã xác định và ổn định? | Nếu không → giữ lại |
| Có cách kiểm tra kết quả khách quan? | Nếu không → giữ lại |
| Chi phí chuẩn bị context + review có nhỏ hơn tự làm? | Nếu không → tự làm |
| Công việc có cần quyết định kiến trúc? | Nếu có → giữ lại |

**Nếu không thỏa điều kiện → AI chính tự thực hiện và báo cáo lý do không ủy quyền.**

### Bước 2: Phân rã và lựa chọn phần ủy quyền

- Chỉ ủy quyền phần có scope rõ ràng, hợp đồng ổn định.
- Giữ lại: quyết định nghiệp vụ, kiến trúc, hợp đồng liên module, phần chưa đủ thông tin.
- Không chia task thành nhiều phần chỉ để tăng số lượng AI tham gia.

### Bước 3: Tạo Delegation Package

Tạo file tại `.ai/changes/delegations/DEL-<TASK-ID>-<slug>.md` theo format trong Phần 4.

### Bước 4: Theo dõi và nhận PATCH

- Theo dõi kết quả từ AI phụ.
- Nhận PATCH hoặc unified diff.
- Thực hiện review theo Phần 6.

---

## 4. Cấu trúc Delegation Package

File: `.ai/changes/delegations/DEL-<TASK-ID>-<slug>.md`

```markdown
# Delegation Package: DEL-<ID>

## Metadata
- TASK_ID: TASK-XXX
- DELEGATED_SUBTASK: <mô tả ngắn phần được ủy quyền>
- CREATED_BY: <GIT BRANCH + SESSION>
- CREATED_AT: <timestamp>
- STATUS: PENDING | COMPLETED | REJECTED

## Mục tiêu công việc
<Mô tả rõ ràng, cụ thể AI phụ cần làm gì>

## Bối cảnh kỹ thuật cần thiết
<Chỉ gửi context thực sự cần. Không gửi toàn bộ tài liệu>

- Kiến trúc liên quan: [...]
- API contract áp dụng: [...]

## Tài liệu cần đọc (theo thứ tự)
1. `<file>` — lý do cần đọc
2. `<file>` — lý do cần đọc

## File được phép thay đổi
- `src/path/to/file.ts`
- `src/path/to/file.test.ts`

## Tuyệt đối cấm thay đổi
- Bất kỳ file nào không trong danh sách trên
- Tệp cấu hình, quy tắc trong `.ai/`, `.document/`

## Hợp đồng giao tiếp
<Interfaces, types, function signatures đã xác định>

## Giả định đã xác nhận
<Các giả định AI phụ được phép sử dụng>

## Ràng buộc không được vi phạm
- <Ràng buộc 1>
- <Ràng buộc 2>

## Tiêu chí nghiệm thu
- [ ] <Criterion 1>
- [ ] <Criterion 2>

## Test cần viết hoặc vượt qua
- `npm run test:run` phải pass
- Viết test cho: <danh sách unit test cần có>

## Định dạng kết quả trả về
- Unified diff (git format-patch hoặc diff -u)
- File: `DEL-<ID>-patch.diff`
- Kèm theo: báo cáo theo template Phần 5
```

**Quan trọng**: Không gửi secret, credential, thông tin nhạy cảm, hay tài liệu không liên quan.

---

## 5. Định dạng báo cáo của AI phụ

AI phụ trả về cùng với PATCH một báo cáo ngắn:

```markdown
# Báo cáo AI phụ: DEL-<ID>

## File bị ảnh hưởng
- `src/path/to/file.ts`

## Tóm tắt thay đổi
<Mô tả ngắn những gì đã thay đổi>

## Test đã viết
- <test case 1>
- <test case 2>

## Kết quả test
- typecheck: PASS / FAIL
- lint: PASS / FAIL
- test:run: PASS / FAIL (N tests, M passed)
- build: PASS / FAIL

## Giả định đã sử dụng
<Liệt kê các giả định được dùng khi không có thông tin rõ ràng>

## Hạn chế / Vấn đề chưa giải quyết
<Điều gì không làm được hoặc không chắc chắn>

## Khác biệt so với yêu cầu (nếu có)
<Giải thích>
```

---

## 6. Quy trình review và áp dụng PATCH (AI chính)

AI chính thực hiện tuần tự:

1. **Kiểm tra phạm vi**: Patch có đúng task và đúng ALLOWED FILES không? Files ngoài phạm vi → **TỪ CHỐI**.
2. **Kiểm tra an toàn**: Có thay đổi ngoài ý muốn, đường dẫn nguy hiểm, nội dung không liên quan không?
3. **Review logic**: Đối chiếu với hợp đồng và acceptance criteria trong delegation package.
4. **Kiểm tra phụ thuộc**: Có tác động ngoài phạm vi dự kiến không?
5. **Áp dụng patch** (chỉ khi review đủ điều kiện):
   ```bash
   git apply DEL-<ID>-patch.diff
   ```
6. **Chạy verification**:
   ```bash
   npm run typecheck && npm run lint && npm run test:run && npm run build
   ```
7. **Cập nhật `.code-map/`** nếu có thay đổi cần ghi.
8. **Báo cáo**: Phần nào chấp nhận, phần nào từ chối hoặc cần sửa lại.

**Kết quả AI phụ trả về ≠ bằng chứng hoàn thành task. AI chính vẫn chịu trách nhiệm cuối cùng.**

---

## 7. Phạm vi cấm tuyệt đối trong giai đoạn EXPERIMENTAL

AI phụ không được:
- Thay đổi `.ai/`, `.document/`, `.code-map/INDEX.md`, `.code-map/SCHEMA.md`.
- Thay đổi branch policy, workflow, quy tắc nền tảng.
- Mở rộng phạm vi ngoài ALLOWED FILES.
- Thay đổi hợp đồng giao tiếp chưa được phê duyệt.
- Tự commit, push, merge, hoặc sửa workspace chung.

### Điều kiện dừng của AI phụ

Nếu gặp bất kỳ tình huống sau, AI phụ phải DỪNG và báo cáo lại AI chính:
- Context thiếu để hoàn thành công việc.
- Hợp đồng không rõ hoặc mâu thuẫn.
- Không thể tạo patch đáng tin cậy.
- Phát hiện tác động lớn hơn phạm vi dự kiến.
- Cần thay đổi file ngoài ALLOWED FILES.

---

## 8. Không nâng cấp tự động

Cơ chế này ở trạng thái EXPERIMENTAL cho đến khi Human đánh giá và quyết định nâng cấp. Một lần chạy thành công không đủ để nâng cấp trạng thái.

Tiêu chí đánh giá sau Sprint:
- Chất lượng patch sau review.
- Tỷ lệ patch được chấp nhận ngay / cần sửa / bị từ chối.
- Khả năng vượt qua test sau tích hợp.
- Thời gian tiết kiệm so với AI chính tự làm.
- Số trường hợp vi phạm phạm vi hoặc hợp đồng.
