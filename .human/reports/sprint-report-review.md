# Bảng Kiểm Tra Báo Cáo Tổng Kết Sprint Cho Human (.human/reports/sprint-report-review.md)

Tài liệu này cung cấp checklist thực hành chi tiết giúp Lập trình viên Con người đánh giá, nghiệm thu biên bản Sprint Review và xác nhận điều kiện đóng Sprint theo chuẩn của Scrum Document Lifecycle System (`.document/WORKFLOW.md` Giai đoạn F).

> [!IMPORTANT]
> **QUY TẮC CỐT LÕI**: AI viết xong bản Sprint Review **KHÔNG ĐỒNG NGHĨA** với việc Sprint đã được hoàn tất. Chỉ có Lập trình viên Con người mới có thẩm quyền ký duyệt nghiệm thu và chuyển Sprint sang trạng thái `COMPLETED`.

---

## 1. Bảng Checklist Nghiệm Thu Sprint (7 Nhóm Tiêu Chí)

Mỗi khi toàn bộ task của Sprint đã được merge vào `develop` và AI nộp bản dự thảo Sprint Review, bạn hãy kiểm tra theo các tiêu chí sau:

### Tiêu Chí 1: Đánh Giá Mục Tiêu Cốt Lõi (Sprint Goal Achievement)
- [ ] **Mục tiêu có đạt được không**: Giá trị cam kết ban đầu của Sprint Goal trong file Sprint Plan có được hiện thực hóa trọn vẹn trong mã nguồn không?
- [ ] **Không bị pha loãng mục tiêu**: Sprint có bị cuốn theo các tính năng râu ria ngoài kế hoạch làm ảnh hưởng đến mục tiêu chính không?

### Tiêu Chí 2: Đối Chiếu Chi Tiết 100% Acceptance Criteria (AC Verification)
Mở file Sprint Plan tại `.document/sprints/active/SPRINT-XXX.md` và kiểm tra từng dòng tiêu chí nghiệm thu:
- [ ] **100% AC có bằng chứng kiểm thử đạt**: Từng tiêu chí đều có ca kiểm thử tự động tương ứng đã vượt qua (PASS).
- [ ] **Phát hiện tiêu chí chưa xác minh (`UNVERIFIED`)**: Nếu có tiêu chí nào AI chỉ tự khẳng định mà không có file test hoặc log chứng minh $\to$ Đánh dấu rõ là `UNVERIFIED` và yêu cầu bổ sung bằng chứng.
- [ ] **Không có tiêu chí bị sửa lén**: AI không được tự ý sửa đổi văn bản của Acceptance Criteria ban đầu để che giấu phần việc chưa làm xong.

### Tiêu Chí 3: Trạng Thái Từng Nhiệm Vụ (Task Completion & Status)
- [ ] **Tất cả các task đều đã vào `completed/`**: Toàn bộ các file task của Sprint đã được di chuyển từ `.ai/tasks/active/` sang `.ai/tasks/completed/` với trạng thái `STATUS: DONE`.
- [ ] **Bảng điều phối sạch sẽ**: Thư mục `.ai/tasks/TASK_PROCESSING.md` không còn dòng task nào của Sprint cũ đang treo.
- [ ] **Xử lý task bị chặn hoặc hoãn (nếu có)**: Các task chưa hoàn tất được chuyển về backlog hoặc dời sang Sprint tiếp theo kèm lý do rõ ràng.

### Tiêu Chí 4: Kiểm Thử Hồi Quy Tổng Thể Trên Nhánh `develop`
- [ ] Chạy độc lập trên máy của bạn trên nhánh `develop`:
  ```bash
  npm run typecheck && npm run lint && npm run test:run && npm run build
  ```
- [ ] **Không có lỗi hồi quy (No Regression Bugs)**: Các tính năng cũ được tích hợp từ các Sprint trước đó vẫn chạy hoàn toàn bình thường, không bị gãy test.

### Tiêu Chí 5: Xử Lý Toàn Bộ Đề Xuất (Proposals) Của Sprint
- [ ] **Không còn đề xuất ở trạng thái `PENDING`**: Mọi file `PROP-XXX.md` phát sinh trong Sprint đều đã có phán quyết của Human:
  - `APPROVE`: Đã lên danh sách để đưa vào kế hoạch Sprint tới.
  - `REJECT`: Đã ghi nhận lý do từ chối.
  - `DEFER`: Đã đưa vào backlog.

### Tiêu Chí 6: Cập Nhật Tài Liệu Sống Của Dự Án (`.document/current/`)
- [ ] **Đồng bộ kiến trúc & hợp đồng**: Nếu Sprint có thay đổi API, mô hình thực thể hoặc ranh giới module, các file tương ứng trong `.document/current/` (ví dụ: `ARCHITECTURE.md`, `API_CONTRACTS.md`) đã được cập nhật phiên bản mới nhất chưa?
- [ ] **Không tạo file tài liệu trùng lặp**: Đảm bảo tuân thủ nguyên tắc Single Source of Truth.

### Tiêu Chí 7: Ghi Nhận Nợ Kỹ Thuật & Bài Học Kinh Nghiệm (Retrospective)
- [ ] Biên bản Sprint Review đã liệt kê trung thực các nợ kỹ thuật (technical debt), mã nguồn chưa tối ưu hoặc các ca kiểm thử chưa thể tự động hóa.
- [ ] Đã rút ra bài học kinh nghiệm về cách ra lệnh cho AI để cải thiện hiệu suất trong Sprint tới.

---

## 2. Các Bước Đóng Sprint Chính Thức Sau Khi Nghiệm Thu

Khi bản báo cáo đáp ứng đầy đủ 7 tiêu chí trên:

1. **Human Ký Duyệt Báo Cáo**:
   - Cập nhật trường `STATUS: COMPLETED` trong file `.document/sprints/active/SPRINT-XXX.md`.
   - Ghi nhận `REVIEWED_BY: HUMAN_DEVELOPER` và ngày hoàn tất.
2. **Di Chuyển File Sprint Vào Thư Mục Lưu Trữ**:
   ```bash
   git mv .document/sprints/active/SPRINT-XXX.md .document/sprints/completed/
   ```
3. **Commit & Push Lưu Trữ Trên Nhánh `develop`**:
   ```bash
   git add .document/sprints/
   git commit -m "SPRINT-XXX: complete and archive sprint"
   git push origin develop
   ```
4. **Phát Hành Lên `main` (nếu đây là mốc phát hành phiên bản)**:
   ```bash
   git checkout main
   git merge --no-ff develop -m "Release Sprint X: integrate completed milestone"
   git push origin main
   ```
5. **Kích Hoạt Sprint Tiếp Theo**: Bắt đầu chọn hoặc lập kế hoạch cho Sprint mới.
