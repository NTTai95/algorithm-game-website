# SKILL-C03: Phân Rã Yêu Cầu Thành Task (Breakdown Tasks)

```yaml
SKILL_ID: SKILL-C03
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: [SKILL-C01]
```

---

## Mục đích

Giúp AI chuyển yêu cầu đã làm rõ thành các task cụ thể, có ranh giới module rõ ràng, phụ thuộc được kiểm soát, và tiêu chí nghiệm thu đo lường được.

---

## Kích hoạt khi

- Yêu cầu đã được phân tích xong (SKILL-C01 đã chạy hoặc yêu cầu đã rõ).
- Human yêu cầu lên kế hoạch task hoặc tạo task mới.
- Chuẩn bị backlog cho Sprint.

## Không áp dụng khi

- Yêu cầu chưa đủ rõ → chạy SKILL-C01 trước.
- Task đã tồn tại và đang ACTIVE — không tạo trùng.

---

## Input cần có

- Yêu cầu đã phân tích (output của SKILL-C01 hoặc yêu cầu đã rõ).
- `.document/ARCHITECTURE.md` — ranh giới tầng kiến trúc.
- `.document/SYSTEM_MAP.md` — ranh giới module.
- `.ai/tasks/TASK_PROCESSING.md` — task đang active để tránh xung đột.
- Template: `.ai/templates/tasks/TASK_TEMPLATE.md`.

---

## Các bước thực hiện

### Bước 1: Xác định ranh giới module

Với từng phần công việc trong yêu cầu, xác định:
- Module nào chịu trách nhiệm chính?
- Module nào bị ảnh hưởng theo (secondary)?
- Phụ thuộc giữa các phần có thể chia thành task?

Tham chiếu: `.document/ARCHITECTURE.md` và `.document/SYSTEM_MAP.md`.

### Bước 2: Phân rã thành task độc lập

Nguyên tắc phân rã:
- Mỗi task có thể hoàn thành trên một nhánh task/* riêng.
- Task A không bị chặn bởi Task B trừ khi thực sự cần output của B.
- Mỗi task có ALLOWED FILES rõ ràng, không chồng lấn trừ khi bắt buộc.
- Mỗi task có tiêu chí nghiệm thu (acceptance criteria) đo lường được.

Tránh: tạo task quá nhỏ (chi tiết triển khai nên trong task) hoặc quá lớn (không thể review trong 1 PR).

### Bước 3: Xác định thứ tự và phụ thuộc

```
Task A → Task B → Task C
         ↓
       Task D (độc lập với C)
```

Ghi rõ:
- Task nào có thể chạy song song (trên các nhánh task/* khác nhau).
- Task nào phải chờ task khác DONE trước.
- Phụ thuộc nào chỉ là kỹ thuật (code) và phụ thuộc nào là nghiệp vụ (logic).

### Bước 4: Tạo file task

Với mỗi task, tạo file theo template `.ai/templates/tasks/TASK_TEMPLATE.md`:
- TASK ID (theo quy ước `TASK-NNN`).
- Tiêu đề ngắn gọn, rõ mục tiêu.
- ALLOWED FILES (danh sách file được phép thay đổi).
- Phần 1 — Thiết kế: để trống, AI nhận task sẽ điền.
- Tiêu chí nghiệm thu: cụ thể, đo lường được.

### Bước 5: Cập nhật bảng task

Thêm task mới vào `TASK_PROCESSING.md` với status `PLANNED` hoặc `READY`.

---

## Output phải tạo ra

- Danh sách task mới với ID, tiêu đề, phụ thuộc.
- File `.ai/tasks/active/TASK-NNN.md` cho từng task đủ điều kiện.
- Bảng `TASK_PROCESSING.md` được cập nhật.

## Cách xác minh kết quả

- Mỗi task có ALLOWED FILES không chồng lấn với task đang ACTIVE khác.
- Thứ tự phụ thuộc hợp lý, không có vòng lặp.
- Tiêu chí nghiệm thu có thể kiểm tra được (không chỉ "hoạt động tốt").
