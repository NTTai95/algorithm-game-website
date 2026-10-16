# Quy Trình Nghiệm Thu Sprint & Chuyển Tiếp Sprint Kế Tiếp (.human/workflows/04-sprint-review-and-next-sprint.md)

Tài liệu này hướng dẫn chi tiết các bước Lập trình viên Con người đánh giá toàn diện, lập biên bản tổng kết, nghiệm thu đóng Sprint hiện tại và chuẩn bị cho Sprint tiếp theo theo chuẩn của Document Lifecycle System (`.document/WORKFLOW.md` Giai đoạn F) và Branch Rules (`.ai/rules/BRANCH_RULES.md`).

---

## 1. Sơ Đồ Quy Trình Đóng Sprint

```
[1. ĐIỀU KIỆN TIÊN QUYẾT: Toàn bộ task trong Sprint đã merge vào develop]
                                ↓
[2. KIỂM THỬ HỒI QUY TRÊN DEVELOP: npm run typecheck, lint, test:run, build]
                                ↓
[3. ĐỐI CHIẾU 100% ACCEPTANCE CRITERIA: Kiểm chứng bằng chứng thực tế]
                                ↓
[4. RÀ SOÁT CÁC ĐỀ XUẤT (PROP-XXX): Quyết định APPROVE, REJECT hoặc DEFER]
                                ↓
[5. LẬP BIÊN BẢN SPRINT REVIEW: Theo template SPRINT_REVIEW_TEMPLATE.md]
                                ↓
[6. CẬP NHẬT TÀI LIỆU SỐNG: Đồng bộ các thay đổi vào .document/current/]
                                ↓
[7. HUMAN RELEASE: Merge develop -> main (khi đạt mốc phát hành)]
                                ↓
[8. LƯU TRỮ SPRINT: Di chuyển active/SPRINT-XXX sang completed/]
                                ↓
[9. KÍCH HOẠT SPRINT KẾ TIẾP: Chuyển planned/ sang active/]
```

---

## 2. Các Bước Thực Hiện Chi Tiết

### Bước 1: Kiểm Tra Điều Kiện Bắt Đầu Sprint Review
Sprint chỉ sẵn sàng để tổng kết khi:
1. Mọi task kỹ thuật thuộc phạm vi Sprint đã hoàn thành và được bạn merge vào nhánh `develop`.
2. Không còn task nào đang dở dang ở trạng thái `IN_PROGRESS` hay `READY_FOR_REVIEW`.
3. Bảng điều phối `.ai/tasks/TASK_PROCESSING.md` đã được dọn sạch các task của Sprint này.

### Bước 2: Chuyển Sang Nhánh `develop` & Chạy Kiểm Thử Hồi Quy Tổng Thể
Mở terminal, chuyển sang nhánh `develop`:
```bash
git checkout develop
git pull origin develop
```
Ra lệnh cho AI đóng vai trò Kỹ sư Tích hợp & QA trên `develop` (tuân thủ Branch Rules: cấm sửa `/src/`, chỉ chạy test và lập báo cáo):

**Gửi prompt cho AI:**
> *"TEST toàn bộ hệ thống trên nhánh develop và REPORT đánh giá hồi quy Sprint. Chạy typecheck, lint, test:run và build. Liệt kê tổng số test đã chạy, kiểm tra xem có tính năng cũ nào bị ảnh hưởng không và báo cáo chi tiết. TUYỆT ĐỐI CẤM SỬA /src/."*

### Bước 3: Đối Chiếu 100% Tiêu Chí Nghiệm Thu (Acceptance Criteria)
Bạn mở file Sprint đang chạy tại `.document/sprints/active/SPRINT-XXX.md`.
Rà soát từng dòng checkbox trong mục `Acceptance Criteria`:
- **Đạt (PASS)**: Có ca kiểm thử tự động tương ứng đã chạy và vượt qua trong `npm run test:run`.
- **Chưa đạt hoặc Chưa xác minh (UNVERIFIED)**: Nếu có tiêu chí nào AI chỉ tự khẳng định mà không có file test hoặc log chứng minh $\to$ Yêu cầu AI bổ sung test trước khi cho phép đóng Sprint.

### Bước 4: Xử Lý Toàn Bộ Đề Xuất (Proposals) Của Sprint
Kiểm tra thư mục `.ai/changes/proposals/`:
- Mở từng file `PROP-XXX.md` được tạo trong Sprint vừa qua.
- Với mỗi đề xuất, bạn ghi nhận quyết định vào trường `HUMAN_DECISION`:
  - **`APPROVE`**: Bạn chấp thuận đề xuất. Đề xuất này sẽ được chuyển thành một Task cụ thể trong kế hoạch Sprint kế tiếp.
  - **`REJECT`**: Từ chối đề xuất, ghi rõ lý do để các phiên AI sau không đề xuất lại.
  - **`DEFER`**: Ý tưởng tốt nhưng tạm hoãn, lưu vào backlog.

### Bước 5: Lập Biên Bản Sprint Review
AI sử dụng mẫu `.document/templates/sprint/SPRINT_REVIEW_TEMPLATE.md` để soạn bản tổng kết.
Nội dung biên bản phải thể hiện rõ:
1. **Mục tiêu đã đạt được so với cam kết ban đầu**.
2. **Bảng đối chiếu Acceptance Criteria**: Kèm theo lệnh test và bằng chứng kiểm thử.
3. **Nợ kỹ thuật (Technical Debt)**: Những phần chưa tối ưu, thiếu tài liệu hoặc cần cải tiến.
4. **Các bài học kinh nghiệm (Retrospective)**: Ghi nhận cách phối hợp giữa Human và AI.

### Bước 6: Cập Nhật Tài Liệu Dự Án Sống (`.document/current/`)
Nếu các task trong Sprint vừa qua làm thay đổi cấu trúc kiến trúc, ranh giới module, hoặc hợp đồng API:
- AI cập nhật các file tương ứng trong `.document/current/` (ví dụ: `.document/current/ARCHITECTURE.md`, `.document/current/SYSTEM_MAP.md`).
- Đây là bước bảo đảm tài liệu dự án luôn phản ánh đúng hành vi thực tế của code.

### Bước 7: Phát Hành Từ `develop` Sang `main` (Release Gate)
Khi một mốc tính năng đã đạt độ chín muồi và được bạn nghiệm thu đầy đủ:
```bash
git checkout main
git pull origin main

# Merge develop vào main
git merge --no-ff develop -m "Release Sprint X: complete features and integration"

# Đẩy lên remote
git push origin main
```
> [!NOTE]
> Bước này chỉ thực hiện bởi Con người. AI bị cấm tuyệt đối chạy lệnh merge từ `develop` vào `main`.

### Bước 8: Đóng & Lưu Trữ Sprint (Archive)
1. Di chuyển file Sprint từ:
   `.document/sprints/active/SPRINT-XXX.md` $\longrightarrow$ `.document/sprints/completed/SPRINT-XXX.md`
2. Cập nhật frontmatter trong file Sprint:
   - `STATUS: COMPLETED`
   - `COMPLETED_AT: YYYY-MM-DD`
   - `REVIEWED_BY: HUMAN_DEVELOPER`
3. Commit và đẩy thay đổi lưu trữ lên Git:
   ```bash
   git add .document/sprints/
   git commit -m "SPRINT-XXX: complete and archive sprint"
   git push origin develop
   ```

### Bước 9: Chuẩn Bị & Kích Hoạt Sprint Tiếp Theo
1. Lúc này thư mục `.document/sprints/active/` đã TRỐNG.
2. Bạn mở `.document/sprints/planned/` để chọn Sprint tiếp theo.
3. Nếu Sprint tiếp theo đã ở trạng thái `APPROVED` $\to$ Di chuyển file vào `.document/sprints/active/` và cập nhật `STATUS: ACTIVE`.
4. Nếu chưa có kế hoạch $\to$ Bắt đầu vòng lập kế hoạch mới theo hướng dẫn tại [02-requirements-and-sprint-planning.md](02-requirements-and-sprint-planning.md).

