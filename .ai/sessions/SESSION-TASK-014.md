# SESSION-TASK-014: Sổ Tay Lệnh Máy Móc Động Theo Ngữ Cảnh Từng Màn

```yaml
SESSION_ID: SESSION-TASK-014
DATE: 2026-10-22
TASK_ID: TASK-014
GIT_BRANCH: task/TASK-014-contextual-machine-manual
COMMAND: IMPLEMENT
BRANCH_ROLE: TASK
START_STATE: CLEAN
FINAL_STATUS: READY_FOR_REVIEW
```

---

## 1. Tệp Tin Đã Đọc (FILES READ)
- `.ai/rules/BRANCH_RULES.md`, `.ai/rules/GIT_RULES.md`
- `.ai/tasks/active/TASK-014.md`
- `src/components/api-reference.tsx`, `src/core/levels/level-registry.ts`, `src/core/machines/*.ts`, `src/pages/PlaygroundPage.tsx`

## 2. Tệp Tin Đã Tạo (FILES CREATED)
- `src/core/machines/machine-docs.ts`
- `src/test/app/contextual-manual.test.ts`
- `.ai/sessions/SESSION-TASK-014.md`

## 3. Tệp Tin Đã Sửa Đổi (FILES MODIFIED)
- `src/core/machines/index.ts`
- `src/components/api-reference.tsx`
- `src/pages/PlaygroundPage.tsx`
- `src/styles/index.css`
- `.ai/tasks/active/TASK-014.md`, `.ai/tasks/TASK_PROCESSING.md`

## 4. Kết Quả Kiểm Thử (TEST RESULTS)
- **`npm run typecheck`**: PASS (0 lỗi)
- **`npm run lint`**: PASS (0 lỗi, 0 cảnh báo)
- **`npm run test:run`**: PASS 82/82 (13 files)

## 5. Kết Quả Đóng Gói (BUILD RESULT)
- **`npm run build`**: PASS (cảnh báo chunk > 500 kB có từ trước, không phát sinh mới)

## 6. Vấn Đề Gặp Phải (PROBLEMS)
- Thiết kế yêu cầu `wareHouse.isSorted()` nhưng mã thực tế không có → không đưa vào sổ tay (xem DEVIATIONS trong TASK-014).

## 7. Đề Xuất Thay Đổi Liên Quan (PROPOSALS)
### PROPOSALS_CREATED
- NONE
### PROPOSALS_REFERENCED
- NONE

## 8. Báo Cáo Sai Lệch Tài Liệu (DRIFT REPORTS)
- NONE

## 9. Nhật Ký Bàn Giao (HANDOFF)
- Commit cục bộ trên `task/TASK-014-contextual-machine-manual`, chưa push. Chờ Developer review & merge vào `develop`.
