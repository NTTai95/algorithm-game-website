# .code-map/ — Bản Đồ Tra Cứu Source Code

```yaml
DOCUMENT_TYPE: CODE_MAP_INDEX
STATUS: BOOTSTRAP
LAST_UPDATED: 2026-10-15
NOTE: Index này được khởi tạo từ tài liệu kiến trúc hiện có. Chi tiết từng module sẽ được bổ sung khi task implementation chạm vào module đó.
```

---

## Mục đích

Giúp AI tìm đúng module, class, hàm, trách nhiệm, API và quan hệ phụ thuộc mà không phải đọc toàn bộ repository.

**Đây là bản đồ điều hướng, không phải nguồn sự thật thay thế source code.**  
Khi thông tin trong bản đồ mâu thuẫn với source code, source code là đúng. AI phải cập nhật bản đồ.

---

## Cách sử dụng

```
YÊU CẦU THAY ĐỔI
    ↓
1. Xác định khái niệm/hành vi liên quan
    ↓
2. Tra INDEX này → tìm subsystem/module phù hợp
    ↓
3. Mở file map của module đó (modules/XXX.md)
    ↓
4. Đọc source code thực tại vị trí cần xác minh
    ↓
5. Mở rộng sang module khác nếu có phụ thuộc
```

**Không tải toàn bộ .code-map/ nếu chỉ liên quan một khu vực nhỏ.**

---

## Index theo Subsystem

| Subsystem | Module Map | Trách nhiệm chính | Trigger Keywords |
|-----------|-----------|-------------------|-----------------|
| Domain/Simulation | `modules/core.md` | Thuật toán DSA, state machine, step generation | algorithm, sort, bubble, state, box, slot, warehouse, simulation, event |
| Game/Rendering | `modules/game.md` | Phaser scenes, sprites, animation, canvas | phaser, scene, sprite, animation, tween, render, canvas, warehouse-scene |
| UI Components | `modules/components.md` | React HUD, controls, panels | react, component, button, panel, hud, control, speed, status |
| App/Bridge | `modules/app.md` | Entry point, React↔Phaser bridge, routing | app, main, bridge, mount, init, entry |
| Pages | `modules/pages.md` | React pages/routes | page, route, home, lesson |
| Test Infrastructure | `modules/test.md` | Test setup, shared fixtures | test, vitest, mock, fixture, setup |

---

## Routing Quick Reference

| Tình huống | Module map cần đọc |
|-----------|-------------------|
| Sửa thuật toán sắp xếp | `modules/core.md` |
| Sửa animation cần cẩu | `modules/game.md` |
| Thêm UI control mới | `modules/components.md` |
| Thay đổi game initialization | `modules/app.md` |
| Thêm trang mới | `modules/pages.md` |
| Thêm/sửa test infrastructure | `modules/test.md` |
| Thêm tính năng cross-cutting | Nhiều module — đọc tuần tự theo dependency |

---

## Phụ thuộc nhanh (Dependency Quick Reference)

```
core/ ← (không phụ thuộc ai)
game/ ← core/
components/ ← core/ (types only)
app/ ← core/, game/, components/
pages/ ← components/, app/
test/ ← core/ (chủ yếu)
```

---

## Trạng thái các module maps

| Module | File | Trạng thái | Ghi chú |
|--------|------|-----------|---------|
| core/ | `modules/core.md` | BOOTSTRAP | Mô tả tổng quan từ tài liệu kiến trúc; chi tiết class/function cần bổ sung khi task chạm vào |
| game/ | `modules/game.md` | BOOTSTRAP | Như trên |
| components/ | `modules/components.md` | BOOTSTRAP | Như trên |
| app/ | `modules/app.md` | BOOTSTRAP | Như trên |
| pages/ | `modules/pages.md` | BOOTSTRAP | Như trên |
| test/ | `modules/test.md` | BOOTSTRAP | Như trên |

> **BOOTSTRAP**: Được khởi tạo từ tài liệu kiến trúc, chưa xác minh từ source code chi tiết. AI phải xác minh trước khi dùng làm căn cứ quyết định.

---

## Xem thêm

- Quy trình cập nhật: [`UPDATE_PROTOCOL.md`](.code-map/UPDATE_PROTOCOL.md)
- Schema mô tả module: [`SCHEMA.md`](.code-map/SCHEMA.md)
- Kiến trúc tổng thể: [`.document/ARCHITECTURE.md`](.document/ARCHITECTURE.md)
- Cấu trúc thư mục: [`.document/SYSTEM_MAP.md`](.document/SYSTEM_MAP.md)
