# Code Map Schema — Mô Tả Cấu Trúc Bản Đồ

```yaml
DOCUMENT_TYPE: CODE_MAP_SCHEMA
STATUS: CONFIRMED
```

---

## Mục đích

Xác định schema chuẩn cho các file map trong `.code-map/modules/`. AI phải tuân thủ schema này khi tạo mới hoặc cập nhật module map.

---

## Schema: Module Map

Mỗi file trong `modules/` mô tả một module (thư mục cấp 1 trong `src/`).

```markdown
# Module: <tên-module> (`src/<path>/`)

## Trạng thái map
- STATUS: BOOTSTRAP | PARTIAL | VERIFIED
- LAST_VERIFIED: <ngày xác minh với source code>
- VERIFIED_BY: <TASK-ID> | MANUAL

## Trách nhiệm chính
<Mô tả 2-3 câu về module này làm gì trong hệ thống>

## Entry Point
- File: `src/<path>/index.ts`
- Export: <danh sách public API được export>

## Các thành phần quan trọng

### <ClassName hoặc FunctionName>
- **File**: `src/<path>/<file>.ts`
- **Mô tả**: <1 câu ngắn>
- **Mục đích**: <Dùng để làm gì>
- **Input**: <tham số, kiểu>
- **Output/Return**: <giá trị, kiểu>
- **Tác động phụ**: <event phát ra, state thay đổi, hoặc "none">
- **Ràng buộc**: <điều kiện đặc biệt, pre/post conditions>
- **Phụ thuộc**: <hàm/class khác được gọi>
- **Test**: `src/<path>/<file>.test.ts`

## Phụ thuộc module
- **Imports từ**: <danh sách module được import>
- **Được import bởi**: <danh sách module import module này>

## Khu vực cần kiểm tra khi thay đổi
<Danh sách những gì dễ bị ảnh hưởng khi sửa module này>
```

---

## Mức độ chi tiết theo loại thành phần

| Loại | Mức độ mô tả | Lý do |
|------|-------------|-------|
| Public API, domain entry points | Đầy đủ (tất cả fields) | Quan trọng, được dùng nhiều |
| Business logic, state machines | Đầy đủ | Tác động lớn khi sai |
| Internal helper functions đơn giản | Ngắn gọn (chỉ tên + mô tả 1 câu) | Chi phí duy trì cao, lợi ích thấp |
| Configuration, constants | Chỉ ghi khi có logic đặc biệt | Thường tự giải thích |

---

## Trạng thái xác minh

| Status | Ý nghĩa | Hành động AI |
|--------|---------|-------------|
| BOOTSTRAP | Khởi tạo từ tài liệu, chưa đọc source | Xác minh với source code trước khi dùng |
| PARTIAL | Một số phần đã xác minh, phần khác chưa | Ghi rõ phần nào đã xác minh |
| VERIFIED | Đã đọc source code, thông tin khớp | Tin cậy nhưng vẫn kiểm tra khi có nghi ngờ |

---

## Schema: Symbol Entry (Hàm/Class quan trọng)

Dùng cho API, domain logic, và điểm vào luồng xử lý:

```yaml
symbol: FunctionOrClassName
file: src/path/to/file.ts
line_range: "10-45"          # Tùy chọn — cập nhật khi có thông tin
description: Ngắn gọn, 1 câu
purpose: Dùng khi nào, bởi ai
inputs:
  - name: paramName
    type: TypeName
    note: Ràng buộc nếu có
outputs:
  type: ReturnType
  note: Mô tả kết quả
side_effects:
  - "Phát event X khi Y"
  - "Thay đổi state Z"
  - none
dependencies:
  - FunctionB (trong cùng module)
  - ModuleX.ClassY (module khác)
tests: src/path/to/file.test.ts
verified: false  # true sau khi đọc source code xác minh
```
