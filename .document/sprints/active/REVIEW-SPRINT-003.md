# Biên Bản Review & Nghiệm Thu Sprint: SPRINT-003

```yaml
DOCUMENT_ID: REVIEW-SPRINT-003
DOCUMENT_TYPE: SPRINT_REVIEW
STATUS: DRAFT
LAST_UPDATED: 2026-10-22
OWNER: Human & AI
SPRINT: SPRINT-003
DEPENDS_ON: [SPRINT-003]
```

---

## 1. Kết Quả Thực Tế Đạt Được (Actual Deliverables)

| Task | Nội dung | Trạng thái | Nhánh |
| :--- | :--- | :--- | :--- |
| `TASK-011` | Bố cục Split-Screen 2 cột + nút Thu nhỏ/Mở rộng Code Editor (Alt+C) | Đã merge vào `develop` | `task/TASK-011-split-screen-layout` |
| `TASK-012` | Bộ sinh đề bài ngẫu nhiên với 4 preset + nút 🎲 Đổi Đề Bài | Đã merge vào `develop` | `task/TASK-012-random-problem-generator` |
| `TASK-013` | Tô màu cú pháp Java (overlay `pre` + `textarea` trong suốt), Tab 4 space, Format Code | Đã merge vào `develop` | `task/TASK-013-java-syntax-highlighter` |
| `TASK-014` | Sổ tay lệnh máy móc theo từng màn (`machine-docs.ts`, tab theo máy) | READY_FOR_REVIEW | `task/TASK-014-contextual-machine-manual` |
| `TASK-015` | Tích hợp, test liên module, sửa lỗi tích hợp, quality gates | READY_FOR_REVIEW | `task/TASK-015-integration-quality-gates` (nối tiếp TASK-014) |

### Sửa lỗi tích hợp trong TASK-015
- **Đổi tốc độ / đổi đề không còn tạo lại game Phaser**: `GameCanvas` khởi tạo game đúng 1 lần mỗi lần mount; trước đây `onGameReady` phụ thuộc `speed` nên mỗi lần bấm 1x/2x/3x/5x game bị huỷ và tạo lại, canvas lệch với VM đang chạy.
- **Tắt WebAudio của Phaser** (`audio: { noAudio: true }`): loại bỏ lỗi `Cannot suspend/resume a closed AudioContext` khi game bị huỷ (StrictMode/điều hướng). Âm thanh nằm ngoài phạm vi Sprint 3.
- **Giới hạn đề bài đúng spec 5–8 thùng, 5–99 kg** qua hằng số `PLAYGROUND_PROBLEM_BOUNDS` (trước đây 5–6/5–7 thùng, tối đa 95 kg).

---

## 2. Bảng Xác Minh Tiêu Chí Chấp Nhận (Acceptance Criteria Verification)

| AC | Mô tả | Kết quả | Bằng chứng |
| :--- | :--- | :--- | :--- |
| AC-01 | Split-Screen 2 cột | PASS (tự động) · cần xác nhận trực quan | `split-layout.test.ts` |
| AC-02 | Thu nhỏ/Mở rộng Code Editor | PASS (tự động) · cần xác nhận trực quan | `split-layout.test.ts` |
| AC-03 | Đổi đề bài ngẫu nhiên, chạy & kiểm tra được với mảng mới | PASS | `generator.test.ts`, `sprint3-integration.test.ts` (160 đề sinh ngẫu nhiên × validator Bubble Sort) |
| AC-04 | Syntax highlighting | PASS (tự động) · cần xác nhận trực quan | `syntax-highlighter.test.ts`, `sprint3-integration.test.ts` (giữ nguyên văn bản nguồn) |
| AC-05 | Sổ tay lệnh đúng máy theo màn | PASS | `contextual-manual.test.ts` |
| AC-06 | Quality gates | PASS | Mục 3 |

> Chưa có công cụ E2E trình duyệt (Playwright) trong dự án; các AC giao diện được kiểm bằng unit/integration test + render tĩnh. Cần Human kiểm tra trực quan trên trình duyệt trước khi ký nghiệm thu.

---

## 3. Báo Cáo Kiểm Thử & Verification Gates

- **Kiểm tra kiểu dữ liệu**: `npm run typecheck` → **PASS** (0 errors).
- **Kiểm tra linter**: `npm run lint` → **PASS** (0 errors, 0 warnings).
- **Kiểm thử tự động**: `npm run test:run` → **PASS** (14/14 test files, 113/113 tests).
- **Đóng gói**: `npm run build` → **PASS** (~0.85s). Cảnh báo bundle JS 1.52 MB > 500 kB (có từ trước, do Phaser chưa code-split).

---

## 4. Tồn Đọng & Khuyến Nghị Cho Sprint 4

Các vấn đề phát hiện khi review, **ngoài phạm vi Sprint 3** nên chưa sửa:

1. **[P0] Lỗ hổng chống gian lận trong VM**: người chơi gọi được mọi phương thức của máy (kể cả `clearEvents()`), và mọi đối tượng trong context (kể cả `crane` cũ) đều truy cập được ở mọi màn. Đã kiểm chứng: dùng `crane.compare()/swap()` rồi `clearEvents()` vẫn qua 5/5 test ẩn Bubble Sort. Đề xuất: whitelist phương thức theo `MACHINE_DOCS`, chỉ bind máy theo `levelConfig.machines`, bỏ `Crane` khỏi context.
2. **[P1] Màn Tutorial luôn báo thành công** khi chạy hết mà không kiểm tra mục tiêu màn.
3. **[P1] Nút Chạy ở màn Bubble Sort chỉ kiểm tra `isSorted()`**, không kiểm định bất biến (chỉ nút Kiểm Định mới kiểm).
4. **[P2] Dọn dẹp**: `LevelConfig.apiDocs` không còn dùng (đã thay bằng `machine-docs.ts`); `validation-modal.tsx`, `code-templates.ts`, `src/app/index.ts` không được import.
5. **[P2] Code-split Phaser/Playground** để giảm bundle.
6. **[P2] Đồng bộ tài liệu**: REQUIREMENTS/OVERVIEW còn ghi Monaco Editor và Step Budget 50,000 (UI dùng 10,000).

---

## 5. Xác Nhận Nghiệm Thu Của Human (Human Sign-off)

- **Trạng thái nghiệm thu**: [ ] CHẤP THUẬN ĐÓNG SPRINT 3
- **Ghi chú của Human**: *(Chờ review & merge `task/TASK-014-*` và `task/TASK-015-*` vào `develop`)*
