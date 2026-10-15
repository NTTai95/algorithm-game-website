# Quy Trình Cập Nhật Code Map (Update Protocol)

```yaml
DOCUMENT_TYPE: CODE_MAP_UPDATE_PROTOCOL
STATUS: CONFIRMED
```

---

## Nguyên tắc cốt lõi

1. **AI thực hiện thay đổi source code phải cập nhật bản đồ** của những khu vực bị ảnh hưởng trong phạm vi task.
2. **Bản đồ là navigation aid, không phải source of truth.** Khi mâu thuẫn, source code thắng.
3. **Index chung (`INDEX.md`) chỉ cập nhật khi module mới được tạo/xóa** — không cập nhật mỗi khi sửa nội dung module.
4. **Mọi thông tin phải dựa trên source code.** Khi chưa xác minh, ghi rõ `verified: false`.

---

## Khi nào cần cập nhật bản đồ

### BẮT BUỘC cập nhật:
- Tạo module/file/class/function mới (public API).
- Xóa hoặc đổi tên module/class/function.
- Thay đổi signature hoặc return type của public API.
- Thay đổi trách nhiệm chính của một module.
- Thay đổi phụ thuộc quan trọng (import mới giữa modules).
- Thay đổi tác động phụ hoặc events phát ra.
- Thay đổi điều kiện sử dụng hoặc ràng buộc.

### KHÔNG cần cập nhật:
- Chỉ format code (prettier, indent).
- Rename biến nội bộ (không ảnh hưởng API).
- Cải thiện comment/docstring không đổi hành vi.
- Sửa lỗi nhỏ không đổi contract.

---

## Quy trình cập nhật (Task-scoped)

```
1. AI thực hiện thay đổi source code
        ↓
2. Xác định module map bị ảnh hưởng
   (từ danh sách file đã sửa → tra INDEX.md)
        ↓
3. Mở modules/XXX.md tương ứng
        ↓
4. Cập nhật các trường bị thay đổi:
   - Thêm symbol mới (nếu tạo mới)
   - Sửa field bị thay đổi (signature, side_effects...)
   - Ghi STATUS: VERIFIED và LAST_VERIFIED: <ngày>
   - Xóa symbol không còn tồn tại
        ↓
5. Nếu tạo/xóa module: Cập nhật INDEX.md
        ↓
6. Commit tài liệu cùng hoặc sau commit code
   (có thể gộp vào commit task hoặc commit riêng)
```

---

## Xử lý khi phát hiện bản đồ lỗi thời

Khi AI đọc bản đồ và thấy thông tin không khớp source code:

```
1. Xác minh trạng thái thực tế (đọc source code)
        ↓
2. Xác định thông tin nào đã lỗi thời
        ↓
3. Kiểm tra: thông tin lỗi thời có thuộc phạm vi task không?
        ↓
   CÓ: Sửa ngay trong task này
   KHÔNG: Ghi note trong task session log,
          tạo PROP-XXX nếu ảnh hưởng đủ lớn,
          KHÔNG tự sửa ngoài phạm vi task
```

Không tự quyết định lại yêu cầu nghiệp vụ chỉ dựa vào thông tin trong bản đồ.

---

## Phân công cập nhật theo nhánh

| Nhánh | Được phép cập nhật |
|-------|--------------------|
| `task/TASK-XXX-*` | Module maps của khu vực code đang được sửa |
| `main` | INDEX.md tổng thể, SCHEMA.md, UPDATE_PROTOCOL.md |
| `develop` | Không cập nhật code-map (chỉ đọc) |

> Lý do không cập nhật trên develop: Tránh xung đột khi nhiều task branch có thể có thay đổi khác nhau chưa được merge.

---

## Phát hiện lỗi thường gặp

AI có thể phát hiện bản đồ lỗi thời bằng cách:

1. **Kiểm tra đường dẫn file**: `list_dir` hoặc `grep_search` để xác nhận file còn tồn tại.
2. **Kiểm tra symbol**: `grep_search` tên function/class trong source.
3. **Kiểm tra import**: `grep_search` để xác nhận dependency còn đúng.

Nếu công cụ tìm không thấy symbol được ghi trong bản đồ → bản đồ đã lỗi thời → xử lý theo quy trình trên.
