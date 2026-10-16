# Quy Trình Thực Thi Task & Nghiệm Thu Mã Nguồn (.human/workflows/03-task-execution-and-review.md)

Tài liệu này hướng dẫn chi tiết quy trình chỉ đạo, theo dõi và nghiệm thu một nhiệm vụ (Task) phát triển mã nguồn giữa Lập trình viên Con người và AI theo chuẩn của AI Operating Protocol (`.ai/`).

---

## 1. Sơ Đồ Vòng Đời Một Nhiệm Vụ (Task Lifecycle)

```
[1. ĐIỀU KIỆN SẴN SÀNG: Task ở trạng thái READY trên bảng điều phối]
                                ↓
[2. PHÂN NHÁNH GIT: git branch task/TASK-XXX-<slug> develop]
                                ↓
[3. THIẾT KẾ TRƯỚC KHI CODE: AI hoàn thành Phần 1 (DESIGN) trong task file]
                                ↓
[4. HUMAN DUYỆT THIẾT KẾ: Cho phép chuyển sang IMPLEMENT]
                                ↓
[5. LẬP TRÌNH & TEST: Chỉ sửa trong ALLOWED FILES, viết unit test]
    ├── Phát hiện vấn đề kiến trúc ──> Tạo PROP-XXX (Non-blocking hoặc Blocking)
    └── Bị chuyển việc gấp ─────────> WIP Commit, Push, Session Handoff (PAUSED)
                                ↓
[6. VERIFICATION GATES: npm run typecheck, lint, test:run, build (100% PASS)]
                                ↓
[7. COMMIT & PUSH TÁCH BIỆT: Commit mã nguồn riêng, commit proposal riêng]
                                ↓
[8. BÀN GIAO: AI cập nhật STATUS: READY_FOR_REVIEW]
                                ↓
[9. HUMAN REVIEW & MERGE: Con người test độc lập & merge vào develop]
                                ↓
[10. ĐÓNG TASK: Chuyển task sang completed/, cập nhật STATUS: DONE]
```

---

## 2. Chi Tiết Từng Khâu Vận Hành

### Bước 1: Kiểm Tra Điều Kiện Sẵn Sàng (Definition of Ready - DoR)
Một task chỉ được coi là sẵn sàng để giao cho AI khi:
1. File task đã tồn tại tại `.ai/tasks/active/TASK-XXX.md` dựa theo template chuẩn.
2. Mục tiêu (`GOAL`), phạm vi (`SCOPE`), và tiêu chí nghiệm thu (`ACCEPTANCE CRITERIA`) đã được định nghĩa rõ ràng.
3. Ranh giới tệp tin được phép chạm vào (`ALLOWED FILES`) đã được chỉ định cụ thể (ví dụ: `src/core/controller/**`, `src/core/controller/**/*.test.ts`).
4. Các task phụ thuộc (dependencies) đã hoàn tất và được tích hợp vào `develop`.
5. Dòng task trên bảng `.ai/tasks/TASK_PROCESSING.md` hiển thị trạng thái `STATUS: READY`.

### Bước 2: Tạo Nhánh Git Cho Task
Theo quy tắc an toàn Git (`.ai/rules/GIT_RULES.md` Mục 3), nhánh task bắt buộc phải phân nhánh từ phiên bản `develop` mới nhất:
```bash
# Đồng bộ develop cục bộ
git checkout develop
git pull origin develop

# Tạo nhánh task mới và checkout sang nhánh đó
git branch task/TASK-002-game-controller develop
git checkout task/TASK-002-game-controller
```
> [!WARNING]
> Tuyệt đối không tạo nhánh task từ `main` hoặc từ một nhánh task chưa hoàn tất khác.

### Bước 3: Chỉ Đạo AI Thiết Kế Trước Khi Viết Code (Design Before Code)
Quy tắc bất biến Rule 7 (`.ai/rules/CORE_RULES.md`) quy định: **AI BẮT BUỘC phải hoàn thành Phần 1 (Thiết kế kỹ thuật) trong file task trước khi được phép viết mã nguồn vào `/src/`**.

**Gửi prompt cho AI:**
> *"DESIGN TASK-002. Hoàn thiện toàn bộ Phần 1 (Goal, Scope, File Isolation, API Contracts, Data Flow, Test Plan, Acceptance Criteria) trong .ai/tasks/active/TASK-002.md. TUYỆT ĐỐI CHƯA ĐƯỢC VIẾT MÃ NGUỒN VÀO /src/."*

### Bước 4: Human Xem Xét & Duyệt Bản Thiết Kế
Bạn mở file `.ai/tasks/active/TASK-002.md` và kiểm tra:
- Các kiểu dữ liệu (TypeScript interfaces), hàm, class dự kiến có hợp lý không?
- Kế hoạch kiểm thử có liệt kê đầy đủ các ca biên (edge cases) không?
- Có vi phạm kiến trúc phân lớp hay hợp đồng API đã duyệt không?

Nếu đồng ý, bạn cho phép AI bắt tay vào lập trình:
**Gửi prompt kích hoạt IMPLEMENT:**
> *"Tôi duyệt bản thiết kế Phần 1 của TASK-002. Bắt đầu IMPLEMENT TASK-002 theo đúng đặc tả. Chỉ chỉnh sửa các file trong ALLOWED FILES và viết unit test độc lập."*

### Bước 5: Giám Sát Trong Quá Trình Triển Khai
Trong khi AI lập trình, hệ thống có hai cơ chế bảo vệ tự động:

#### A. Xử lý khi AI phát hiện cải tiến hoặc vấn đề kiến trúc (Proposals)
AI sẽ tự động đánh giá tính chất theo `.ai/protocol/PROPOSALS.md`:
- **Không chặn (Non-blocking)**: Vấn đề không cản trở việc hoàn thành task hiện tại. AI tạo file `.ai/changes/proposals/PROP-XXX.md` với `BLOCKS_CURRENT_TASK: NO`, tiếp tục hoàn thành task và commit proposal riêng.
- **Có chặn (Blocking)**: Vấn đề mâu thuẫn căn bản với kiến trúc hoặc API khiến task không thể làm đúng (`BLOCKS_CURRENT_TASK: YES`). AI sẽ **DỪNG LẠI NGAY LẬP TỨC (HALT)**, đánh dấu task `BLOCKED`, commit phần việc dở dang, push lên remote và chờ bạn phán quyết (`APPROVE`, `REJECT` hoặc `DEFER`).

#### B. Xử lý khi bạn cần đổi task khẩn cấp (Task Preemption)
Nếu bạn cần AI dừng `TASK-002` để làm gấp `TASK-003`:
1. Không bắt AI xóa bỏ code dở dang. Hãy gửi prompt:
   > *"Dừng code ở trạng thái ổn định. Chạy kiểm tra, tạo commit WIP, commit riêng proposal nếu có, push nhánh task/TASK-002-... lên GitHub và ghi nhật ký bàn giao SESSION trước khi STOP."*
2. Sau khi AI đẩy nhánh sạch sẽ và cập nhật task sang `PAUSED`, bạn checkout sang nhánh task mới và tiếp tục làm việc.

### Bước 6: Bộ 4 Cổng Kiểm Tra Chất Lượng Bắt Buộc (Verification Gates)
Trước khi bàn giao, AI bắt buộc phải chạy và vượt qua 100% chuỗi 4 lệnh:
```bash
# 1. Typecheck: 0 lỗi kiểu dữ liệu TypeScript
npm run typecheck

# 2. Lint: 0 lỗi vi phạm quy tắc code
npm run lint

# 3. Test: 100% unit tests và feature tests vượt qua
npm run test:run

# 4. Build: Đóng gói ứng dụng thành công
npm run build
```

### Bước 7: Quy Tắc Tách Biệt Commit & Push Lên Remote
Theo chuẩn `.ai/rules/GIT_RULES.md`:
- **Commit mã nguồn triển khai**: `TASK-XXX: <mô tả>` (chỉ chứa file code, test, docs trong scope).
- **Commit đề xuất (nếu có)**: `PROP-XXX: <mô tả>` (chỉ chứa file proposal và cập nhật liên kết).
- **Tuyệt đối cấm gộp hai commit này làm một**.
- AI thực hiện `git push origin task/TASK-XXX-<slug>` để lưu trữ tri thức lên kho chứa dùng chung.

### Bước 8: Bàn Giao Cho Con Người Nghiệm Thu
AI cập nhật:
- Trạng thái trong file task và bảng `TASK_PROCESSING.md` thành `STATUS: READY_FOR_REVIEW`.
- Soạn nhật ký bàn giao tại `.ai/sessions/SESSION-YYYYMMDD-XX.md`.
- Báo cáo cho bạn danh sách file thay đổi và kết quả test.
*(AI TUYỆT ĐỐI CẤM tự đánh dấu `DONE` hoặc tự merge nhánh).*

### Bước 9: Human Review & Tích Hợp Vào `develop`
1. Bạn mở terminal trên máy tính của mình, chạy kiểm tra và xem diff theo [task-report-review.md](../reports/task-report-review.md).
2. Tự mình thực hiện lệnh merge:
   ```bash
   git checkout develop
   git pull origin develop
   git merge --no-ff task/TASK-002-game-controller -m "Merge task/TASK-002-game-controller into develop"
   ```
3. Chạy lại bộ 4 lệnh kiểm tra chất lượng trên nhánh `develop`:
   ```bash
   npm run typecheck && npm run lint && npm run test:run && npm run build
   ```
4. Đẩy nhánh `develop` đã tích hợp lên GitHub:
   ```bash
   git push origin develop
   ```

### Bước 10: Đóng Task Chính Thức (Archive)
1. Di chuyển file task từ `.ai/tasks/active/TASK-002.md` sang `.ai/tasks/completed/TASK-002.md`.
2. Cập nhật trong file task: `STATUS: DONE`, điền commit hash của lệnh merge và ngày tích hợp.
3. Xóa dòng tương ứng khỏi bảng `.ai/tasks/TASK_PROCESSING.md`.
4. Commit thay đổi đóng task trên `develop`:
   ```bash
   git add .ai/tasks/
   git commit -m "TASK-002: complete and archive task"
   git push origin develop
   ```

