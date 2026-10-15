# SKILL-C07: Cập Nhật Tài Liệu và Ghi Nhận Quyết Định (Update Docs)

```yaml
SKILL_ID: SKILL-C07
GROUP: core
STATUS: ACTIVE
DEPENDS_ON: []
```

---

## Mục đích

Hướng dẫn AI cập nhật tài liệu kỹ thuật và ghi nhận quyết định thiết kế sau khi có thay đổi kiến trúc, API, hoặc quyết định quan trọng được phê duyệt.

---

## Kích hoạt khi

- Sau thay đổi kiến trúc hoặc API contract được duyệt.
- Command `DOCUMENT`.
- Proposal được APPROVED và cần implement.
- Sau khi task hoàn thành và có thay đổi đáng ghi nhận.
- Cập nhật `.code-map/` sau thay đổi source code.

## Không áp dụng khi

- Không có thay đổi thực chất (chỉ format code, rename biến nội bộ không ảnh hưởng API).

---

## Input cần có

- Thay đổi đã được thực hiện (code hoặc quyết định đã duyệt).
- Tài liệu cần cập nhật (được xác định từ bảng bên dưới).
- [Tùy chọn] `.code-map/INDEX.md` nếu cần cập nhật bản đồ code.

---

## Bảng: Thay đổi → Tài liệu cần cập nhật

| Loại thay đổi | Tài liệu cần xem xét |
|--------------|---------------------|
| Thêm/xóa/đổi tên module | `.document/SYSTEM_MAP.md`, `.code-map/` module tương ứng |
| Thay đổi API contract | `.document/interfaces/API_CONTRACTS.md`, `.code-map/` |
| Thay đổi kiến trúc tầng | `.document/ARCHITECTURE.md`, ADR mới |
| Quyết định kỹ thuật quan trọng | `.document/decisions/`, `reference/DECISIONS.md` |
| Thêm dependency npm | `.document/` (nếu ảnh hưởng kiến trúc) |
| Thay đổi hành vi domain | `.document/domain/`, `.code-map/` |
| Đổi tên hàm/class public | `.code-map/` module tương ứng |

---

## Các bước thực hiện

### Bước 1: Xác định tài liệu bị ảnh hưởng

Từ danh sách thay đổi (code diff hoặc PROP đã duyệt), tra bảng trên để xác định file tài liệu cần cập nhật.

### Bước 2: Cập nhật từng tài liệu

Nguyên tắc:
- Chỉ cập nhật phần thực sự thay đổi, không viết lại toàn bộ.
- Ghi ngày cập nhật (`LAST_UPDATED`).
- Không xóa lịch sử quyết định đã ghi — bổ sung hoặc cập nhật status.

Với `.code-map/`: Xem quy trình trong `.code-map/UPDATE_PROTOCOL.md`.

### Bước 3: Ghi ADR nếu cần

Khi quyết định kiến trúc quan trọng được phê duyệt và triển khai:
- Tạo file `ADR-NNN-<slug>.md` trong `.document/decisions/ADR/`.
- Cập nhật `reference/DECISIONS.md`.
- Sử dụng template từ `.ai/templates/documentation/`.

### Bước 4: Commit documentation riêng

Tài liệu nên được commit riêng khỏi code (hoặc cùng commit nếu nhỏ):
- Message: `TASK-XXX: update docs for <thay đổi>` hoặc `DOCUMENT: <mô tả>`.
- Không gộp commit tài liệu với commit proposal.

---

## Output phải tạo ra

- Tài liệu đã cập nhật (`.document/`, `.code-map/`, hoặc `reference/`).
- ADR mới nếu có quyết định kiến trúc.

## Cách xác minh kết quả

- Không có mâu thuẫn giữa tài liệu và code đã implement.
- Tất cả references đến file/symbol đã đổi tên được cập nhật.
- `LAST_UPDATED` được cập nhật trong tài liệu bị sửa.
