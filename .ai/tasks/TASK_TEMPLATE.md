# TASK-XXX: [Tiêu đề Task Ngắn Gọn]

```yaml
TASK_ID: TASK-XXX
TITLE: [Tiêu đề ngắn gọn của nhiệm vụ]
STATUS: READY # PLANNED | READY | CLAIMED | DESIGNING | IMPLEMENTING | TESTING | READY_FOR_REVIEW | REVIEWED | INTEGRATED | DONE | BLOCKED | PAUSED | REJECTED
PRIORITY: MEDIUM # LOW | MEDIUM | HIGH | CRITICAL
CREATED: YYYY-MM-DD
CURRENT_BRANCH: task/TASK-XXX-slug
CURRENT_SESSION: NONE
DEPENDENCIES: [] # Danh sách TASK-ID tiên quyết phải xong trước (ví dụ: [TASK-001])
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)
> *Phần này BẮT BUỘC phải được hoàn thiện đầy đủ và tự kiểm tra kỹ lưỡng trước khi bắt đầu viết bất kỳ dòng mã nguồn nào.*

### 1. Mục Tiêu (GOAL)
- [Mục tiêu kỹ thuật cụ thể mà task cần đạt được]

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**: [Những tính năng/thành phần nằm trong task]
- **Nằm ngoài phạm vi**: [Những việc tuyệt đối không làm trong task này]

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES** (Các file/thư mục ĐƯỢC PHÉP tạo hoặc chỉnh sửa):
  - `src/...`
  - `src/test/...`
- **RESTRICTED FILES** (Các file/thư mục TUYỆT ĐỐI CẤM chạm vào):
  - `.ai/CONTROL.md`
  - `.human/**`
  - `package.json`
- **FILES EXPECTED TO CHANGE** (Các file dự kiến sẽ thay đổi):
  - `...`
- **INTEGRATION POINTS** (Điểm kết nối với các hệ thống khác):
  - `...`

### 4. Hệ Thống Hiện Hữu (EXISTING SYSTEMS)
- [Các lớp, hàm, types hoặc module hiện có mà task sẽ tương tác hoặc kế thừa]

### 5. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
- [Định nghĩa trước các interface, type signatures dự kiến xuất bản]
```typescript
// Interfaces dự kiến
```

### 6. Luồng Dữ Liệu (DATA FLOW)
- [Mô tả chi tiết luồng dữ liệu vào -> biến đổi trạng thái -> sự kiện phát ra / kết quả trả về]

### 7. Thiết Kế Chi Tiết (DESIGN)
- [Chi tiết thuật toán, cấu trúc dữ liệu, state machine, cơ chế xử lý lỗi]

### 8. Kế Hoạch Kiểm Thử (TEST PLAN)
- [Kế hoạch unit test, test case biên, ca kiểm thử âm tính (negative tests)]

### 9. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [ ] Tiêu chí chức năng 1: ...
- [ ] Tiêu chí chức năng 2: ...
- [ ] `npm run typecheck` đạt 0 lỗi.
- [ ] `npm run lint` đạt 0 lỗi.
- [ ] `npm run test:run` vượt qua 100% (cả test mới và regression test).
- [ ] `npm run build` thành công, bundle sạch sẽ.
- [ ] Tài liệu liên quan được cập nhật đầy đủ.

### 10. Rủi Ro & Giải Pháp (RISKS)
- [Phân tích nguy cơ xung đột tệp dùng chung, hiệu năng, rò rỉ bộ nhớ]

### 11. Yêu Cầu Thay Đổi Kiến Trúc (CHANGE REQUIREMENTS)
- Task có yêu cầu sửa đổi kiến trúc ngoài scope hoặc API hiện có không?
  *(NẾU CÓ: Phải tạo `.ai/changes/proposals/PROP-XXX.md` trước và dừng lại chờ duyệt).*

---

## PHẦN 2: TRIỂN KHAI MÃ NGUỒN (IMPLEMENTATION)
> *Chỉ được thực hiện khi Phần 1 đã hoàn thiện, thỏa mãn ranh giới nhánh Git (`.ai/BRANCH_RULES.md`) và nhận được chỉ thị `IMPLEMENT` hợp lệ từ Con người theo `.ai/CONTROL.md`.*

### 1. Nhật Ký Triển Khai (IMPLEMENTATION NOTES)
- **Tệp đã tạo mới**:
  - `...`
- **Tệp đã chỉnh sửa**:
  - `...`
- **Chi tiết hiện thực hóa**:
  - `...`

### 2. Trạng Thái Đánh Giá Của AI (REVIEW STATUS)
- **Trạng thái**: `IMPLEMENTATION_COMPLETE`
- **Kết quả kiểm thử**:
  - Typecheck: PASS
  - Lint: PASS
  - Tests: PASS (X/X tests)
  - Build: PASS
- **Nhật ký phiên liên kết**: `.ai/sessions/SESSION-XXX.md`

### 3. Quyết Định Của Con Người (HUMAN DECISION)
- **Đánh giá của Developer**: `PENDING_REVIEW` | `APPROVED` | `REQUEST_CHANGES`
- **Ghi chú chỉ đạo**: [Ý kiến phản hồi từ Human Developer]

### 4. Thông Tin Hoàn Tất (COMPLETION INFORMATION)
- **Trạng thái cuối cùng**: `DONE`
- **Commit tích hợp**: `[Commit Hash trên develop]`
- **Người merge**: [Tên Human Developer]
- **Ngày tích hợp**: YYYY-MM-DD
