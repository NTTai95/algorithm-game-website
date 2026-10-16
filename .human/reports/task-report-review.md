# Bảng Kiểm Tra Báo Cáo Nhiệm Vụ Cho Human (.human/reports/task-report-review.md)

Tài liệu này cung cấp checklist thực hành chi tiết giúp Lập trình viên Con người rà soát, kiểm chứng và nghiệm thu báo cáo hoàn thành nhiệm vụ (`TASK REPORT`) do AI nộp lại trước khi quyết định merge mã nguồn vào `develop`.

> [!WARNING]
> **NGUYÊN TẮC VÀNG**: Không bao giờ mặc định tin rằng một task đã hoàn tất chỉ vì AI báo cáo thành công trong chat. Mọi lời khẳng định của AI đều phải có bằng chứng kiểm chứng độc lập.

---

## 1. Bảng Checklist Kiểm Tra Task Report (5 Nhóm Tiêu Chí)

Mỗi khi AI thông báo `STATUS: READY_FOR_REVIEW`, bạn hãy mở terminal và thực hiện kiểm tra theo checklist sau:

### Nhóm A: Kiểm Tra Phạm Vi & Ranh Giới (Scope Verification)
- [ ] **Đúng mã Task**: Task ID trong báo cáo có khớp chính xác với task được giao không?
- [ ] **Tuân thủ `ALLOWED FILES`**: AI có chỉ tạo hoặc sửa các file nằm chính xác trong danh sách được phép không?
- [ ] **Không sửa mã nguồn ngoài phạm vi**: Có bất kỳ file nào trong các module khác hoặc tệp cấu hình nền tảng bị sửa lén không?
  - *Lệnh kiểm tra*:
    ```bash
    git diff --name-only develop..HEAD
    ```
- [ ] **Không tự ý đổi API Contract**: Các interface, types, function signature đã thỏa thuận trong Phần 1 có bị AI tự ý sửa đổi không?

### Nhóm B: Kiểm Tra Mã Nguồn & Tài Liệu (Source & Docs Verification)
- [ ] **Mã nguồn sạch, đúng chuẩn**: Không có code thừa, không có `console.log` thử nghiệm còn sót lại.
- [ ] **Không cài thư viện ngoài ý muốn**: File `package.json` có bị thêm thư viện npm nào mới không?
  - *Lệnh kiểm tra*:
    ```bash
    git diff develop..HEAD -- package.json
    ```
- [ ] **Đã cập nhật tài liệu liên quan**: Nếu task có tạo hàm hoặc class mới, các tài liệu kỹ thuật hoặc bản đồ code tương ứng đã được cập nhật chưa?

### Nhóm C: Kiểm Tra Kết Quả Kiểm Thử (Verification Gates)
Không dựa vào kết quả text do AI in ra trong hội thoại, bạn hãy tự tay chạy bộ 4 lệnh kiểm tra độc lập trên terminal của mình:
```bash
# 1. Kiểm tra lỗi kiểu dữ liệu
npm run typecheck

# 2. Kiểm tra chuẩn quy tắc code
npm run lint

# 3. Kiểm tra toàn bộ unit tests
npm run test:run

# 4. Kiểm tra đóng gói build
npm run build
```
- [ ] **`typecheck` = 0 lỗi**: Không có lỗi TypeScript.
- [ ] **`lint` = 0 lỗi, 0 cảnh báo**: Không vi phạm ESLint.
- [ ] **`test:run` = 100% pass**: Tất cả các unit test mới và cũ đều vượt qua.
- [ ] **Có viết test cho tính năng mới**: Đã có file `*.test.ts` tương ứng với logic mới viết trong `/src/`.
- [ ] **`build` thành công**: Mã nguồn đóng gói bình thường.

### Nhóm D: Kiểm Tra Lịch Sử & Tính Toàn Vẹn Git (Git Verification)
- [ ] **Đúng nhánh task**: Bạn đang đứng trên nhánh `task/TASK-XXX-<slug>`?
- [ ] **Tách biệt commit (Commit Separation)**: Commit triển khai và commit đề xuất (nếu có) có được tách thành các commit riêng rẽ không?
  - *Lệnh kiểm tra*:
    ```bash
    git log develop..HEAD --oneline
    ```
  - *Kết quả mong đợi*:
    - `a1b2c3d TASK-XXX: implement feature logic`
    - `e4f5g6h PROP-YYY: propose architecture revision` (nếu có)
- [ ] **Working tree sạch hoàn toàn**: Không còn file nào ở trạng thái `untracked` hoặc `modified` chưa commit:
  - *Lệnh kiểm tra*:
    ```bash
    git status
    ```
  - *Kết quả mong đợi*: `nothing to commit, working tree clean`.
- [ ] **Đã đẩy lên remote**: Nhánh task đã được `git push` lên GitHub.

### Nhóm E: Kiểm Tra Trạng Thái & Bàn Giao (Status & Handoff)
- [ ] **Trạng thái hợp lệ**: File task tại `.ai/tasks/active/TASK-XXX.md` và bảng `.ai/tasks/TASK_PROCESSING.md` hiển thị trạng thái tối đa là `STATUS: READY_FOR_REVIEW`.
- [ ] **AI không vượt quyền**: AI không tự ý đánh dấu `DONE` hoặc tự ý merge vào `develop`.
- [ ] **Nhật ký phiên đầy đủ**: Đã có file `.ai/sessions/SESSION-YYYYMMDD-XX.md` ghi nhận công việc đã làm và các vấn đề tồn đọng.

---

## 2. Các Quyết Định Nghiệm Thu Của Human

Sau khi kiểm tra theo checklist trên, bạn đưa ra một trong 2 quyết định:

### Trường Hợp 1: ĐẠT YÊU CẦU (APPROVE & MERGE)
Nếu tất cả các mục trên đều đạt chuẩn:
1. Bạn thực hiện merge nhánh task vào `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git merge --no-ff task/TASK-XXX-<slug> -m "Merge task/TASK-XXX-<slug> into develop"
   git push origin develop
   ```
2. Đóng task: Di chuyển file sang `.ai/tasks/completed/TASK-XXX.md` và chuyển trạng thái thành `STATUS: DONE`.

### Trường Hợp 2: YÊU CẦU SỬA LẠI (REQUEST CHANGES)
Nếu phát hiện vi phạm (ví dụ: thiếu unit test, gãy typecheck, sửa file ngoài scope):
1. **Tuyệt đối không merge**.
2. Gửi prompt yêu cầu AI khắc phục:
   > *"TASK-XXX chưa đạt tiêu chí nghiệm thu: Lệnh 'npm run typecheck' đang báo 2 lỗi tại src/core/slot.ts dòng 45. Hãy kiểm tra lại, sửa lỗi và chạy lại verification gates trước khi nộp lại báo cáo."*
