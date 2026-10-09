# SESSION-XXX: [Mô Tả Ngắn Gọn Phiên Làm Việc]

```yaml
SESSION_ID: SESSION-XXX # Ví dụ: SESSION-001
DATE: YYYY-MM-DD HH:mm:ss
TASK_ID: TASK-XXX # Hoặc NONE nếu phiên thuộc MASTER/MAIN/DEVELOP
GIT_BRANCH: task/TASK-XXX-slug # Hoặc main / develop
COMMAND: IMPLEMENT # Lệnh nhận từ prompt: ANALYZE | DESIGN | IMPLEMENT | TEST | REVIEW | REPORT | PROPOSE | DOCUMENT | COMMIT | PUSH | STOP
BRANCH_ROLE: TASK # MAIN | DEVELOP | TASK (Vai trò xác định bởi nhánh Git)
START_STATE: CLEAN # Trạng thái bắt đầu: CLEAN | DIRTY | RESUMED
FINAL_STATUS: READY_FOR_REVIEW # IN_PROGRESS | PAUSED | READY_FOR_REVIEW | BLOCKED | HANDOFF
```

---

## 1. Tệp Tin Đã Đọc (FILES READ)
- `.ai/CONTROL.md`
- `.ai/BRANCH_RULES.md`
- `.ai/tasks/active/TASK-XXX.md`
- `...`

## 2. Tệp Tin Đã Tạo (FILES CREATED)
- `...`

## 3. Tệp Tin Đã Sửa Đổi (FILES MODIFIED)
- `...`

## 4. Kết Quả Kiểm Thử (TEST RESULTS)
- **Kiểm tra kiểu dữ liệu (`npm run typecheck`)**: [PASS: 0 lỗi / FAIL]
- **Kiểm tra chuẩn code (`npm run lint`)**: [PASS: 0 lỗi, 0 cảnh báo / FAIL]
- **Kiểm thử tự động (`npm run test:run`)**: [PASS: X/Y tests passed]

## 5. Kết Quả Đóng Gói (BUILD RESULT)
- **Đóng gói sản phẩm (`npm run build`)**: [PASS / FAIL kèm kích thước bundle]

## 6. Vấn Đề Gặp Phải (PROBLEMS)
- [Mô tả chi tiết các vướng mắc, lỗi phát sinh hoặc điểm bất thường]

## 7. Đề Xuất Thay Đổi Liên Quan (PROPOSALS)

### PROPOSALS_CREATED
- [Ví dụ: PROP-014 (hoặc NONE nếu không tạo đề xuất mới)]

### PROPOSALS_REFERENCED
- [Ví dụ: PROP-009 (hoặc NONE nếu không tham chiếu đề xuất nào)]

## 8. Báo Cáo Sai Lệch Tài Liệu (DRIFT REPORTS)
- [Liên kết tới `.ai/changes/drift/DRIFT-XXX.md` nếu phát hiện sai lệch (hoặc NONE)]

## 9. Nhật Ký Bàn Giao (HANDOFF)
- **Trạng thái nhánh Git**: [Sạch sẽ / Đã commit và push / Còn dở dang]
- **Công việc đã hoàn tất trong phiên**:
  1. ...
- **Công việc chưa hoàn thành (Work Incomplete)**:
  1. ...
- **Điểm dừng chính xác (Where Work Stopped)**:
  - [Mô tả rõ ràng file, hàm hoặc logic mà phiên trước dừng lại]
- **Hành động tiếp theo cho AI phiên sau (Next Action)**:
  1. ...
