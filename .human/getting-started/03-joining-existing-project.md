# Hướng Dẫn Tiếp Quản Dự Án Đang Hoạt Động (.human/getting-started/03-joining-existing-project.md)

Tài liệu này hướng dẫn Lập trình viên Con người tiếp quản, khôi phục bối cảnh và điều phối AI khi quay trở lại một dự án đã có sẵn mã nguồn, tài liệu hoặc đã đi qua nhiều Sprint.

---

## 1. Bản Đồ Kiểm Tra Hiện Trạng Nhanh (8 Điểm Khảo Sát)

Trước khi gửi bất kỳ yêu cầu mới nào cho AI, bạn hãy thực hiện lần lượt 8 bước kiểm tra khách quan sau:

```
1. GIT BRANCH & WORKING TREE ──> git branch, git status
               ↓
2. SPRINT HIỆN TẠI ────────────> .document/sprints/active/
               ↓
3. ACTIVE TASK BOARD ──────────> .ai/tasks/TASK_PROCESSING.md
               ↓
4. QUYẾT ĐỊNH KIẾN TRÚC ───────> .document/current/ và .ai/changes/proposals/
               ↓
5. THAY ĐỔI CHƯA TÍCH HỢP ─────> git log develop..HEAD, uncommitted diff
               ↓
6. NHẬT KÝ PHIÊN GẦN NHẤT ─────> .ai/sessions/SESSION-XXX.md
               ↓
7. RÀ SOÁT TÀI LIỆU LỖI THỜI ──> .document/ROUTER.md, .document/RULES.md
               ↓
8. XÁC MINH TEST RUNTIME ──────> npm run typecheck, lint, test:run, build
```

---

## 2. Chi Tiết Các Bước Tiếp Quản

### Bước 1: Kiểm Tra Branch và Working Tree
Mở terminal và gõ các lệnh sau để xác định bạn đang đứng ở đâu:
```bash
# Xem nhánh hiện tại
git branch --show-current

# Kiểm tra xem có file nào bị sửa dở hoặc chưa commit không
git status
```
- Nếu đang ở nhánh `task/TASK-XXX-*`: Có một task đang làm dở dang trên máy bạn.
- Nếu đang ở nhánh `develop` hoặc `main`: Bạn đang ở nhánh quản trị/tích hợp.
- Nếu có file `modified` hoặc `untracked`: Xem ngay ai đã sửa và tại sao chưa commit. Tuyệt đối không xóa hay commit bừa bãi trước khi xác minh bối cảnh.

### Bước 2: Xác Định Sprint Hiện Tại
Mở thư mục `.document/sprints/active/`:
- **Nếu có 1 file Sprint** (ví dụ: `SPRINT-02-warehouse-visualizer.md`): Đây là Sprint đang chạy. Đọc file này để nắm:
  - `Sprint Goal`: Mục tiêu trọng tâm.
  - `Acceptance Criteria`: Các tiêu chí đã đạt và chưa đạt.
  - `Scope`: Ranh giới những gì được làm và không được làm trong Sprint này.
- **Nếu thư mục `active/` TRỐNG**: Hệ thống đang ở giữa hai Sprint. Kiểm tra `.document/sprints/planned/` để xem Sprint tiếp theo đã được Human duyệt (`APPROVED`) chưa, hoặc chuyển sang giai đoạn Sprint Planning.

### Bước 3: Xác Định Các Task Đang Kích Hoạt
Mở tệp `.ai/tasks/TASK_PROCESSING.md`. Bạn sẽ thấy bảng điều phối gồm các task:
- Cột `STATUS`:
  - `READY`: Task đã được lập kế hoạch, sẵn sàng gán.
  - `CLAIMED` / `DESIGNING` / `IMPLEMENTING` / `TESTING`: Đang được một phiên AI thực hiện.
  - `READY_FOR_REVIEW`: AI đã hoàn tất, đang chờ bạn nghiệm thu.
  - `BLOCKED`: Task bị nghẽn (do phụ thuộc hoặc do vướng proposal kiến trúc).
  - `PAUSED`: Task đang bị tạm dừng giữa chừng.
- Cột `CURRENT BRANCH` và `CURRENT SESSION`: Cho biết nhánh Git và phiên làm việc gần nhất liên quan đến task.

### Bước 4: Xem Các Quyết Định Kiến Trúc & Đề Xuất Đang Có Hiệu Lực
- **Tài liệu kiến trúc hiện hành**: Tra cứu trong `.document/current/` (ví dụ: `ARCHITECTURE.md`, `SYSTEM_MAP.md`, `API_CONTRACTS.md`).
- **Các đề xuất đang chờ phán quyết**: Kiểm tra `.ai/changes/proposals/`:
  - Mở các file `PROP-XXX.md`.
  - Kiểm tra trường `STATUS`: `PENDING` (chờ bạn duyệt), `APPROVED` (đã duyệt, chờ lập task), `REJECTED` (bị từ chối) hoặc `DEFER` (hoãn).
  - Kiểm tra trường `BLOCKS_CURRENT_TASK`: Nếu là `YES`, task liên quan đang bị dừng để chờ bạn ra quyết định.

### Bước 5: Xác Định Thay Đổi Chưa Được Tích Hợp
Kiểm tra các commit mới trên nhánh hiện tại so với `develop`:
```bash
# Xem các commit chưa tích hợp vào develop
git log develop..HEAD --oneline

# Xem diff cụ thể
git diff develop..HEAD
```
Phân biệt rõ:
- Commit mã nguồn: `TASK-XXX: ...`
- Commit đề xuất: `PROP-XXX: ...`
- Commit tạm dừng: `TASK-XXX: WIP pause ...`

### Bước 6: Đọc Báo Cáo & Nhật Ký Bàn Giao Gần Nhất (Session Log)
Mở tệp nhật ký phiên gần nhất tại `.ai/sessions/`:
- Tìm file có ngày gần nhất: `SESSION-YYYYMMDD-XX.md`.
- Đọc các mục:
  - `POSITION`: Vị trí dừng lại của phiên trước.
  - `UNRESOLVED_ISSUES`: Các vấn đề kỹ thuật chưa giải quyết.
  - `PROPOSALS_CREATED` / `PROPOSALS_REFERENCED`: Các đề xuất phát sinh.
  - `NEXT_ACTIONS`: Hành động khuyến nghị cho phiên tiếp theo.

### Bước 7: Chạy Bộ 4 Lệnh Kiểm Tra Runtime Độc Lập
Không chỉ tin vào nhật ký của phiên trước, bạn hãy tự tay chạy bộ kiểm tra trên máy tính của mình:
```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```
- Nếu cả 4 lệnh đều xanh (PASS): Mã nguồn hiện tại đang ở trạng thái ổn định.
- Nếu có lỗi đỏ (FAIL): Đọc kỹ thông báo lỗi. Bạn cần yêu cầu AI khắc phục lỗi trước khi giao việc mới.

---

## 3. Cách Bàn Giao Ngữ Cảnh Giữa Các Phiên AI (Session Handoff)

Khi bạn mở một cửa sổ chat mới với AI (hoặc đổi từ Claude sang Gemini, hoặc chuyển máy làm việc):
1. Không cần giải thích lại toàn bộ lịch sử dự án từ đầu.
2. AI mới chỉ cần được trỏ vào danh tính tác nghiệp hiện tại:
   - Nhánh Git đang đứng.
   - Task ID đang thực hiện.
   - File nhật ký phiên gần nhất.

**Mẫu prompt tiếp tục công việc (RESUME Task):**
> *"RESUME TASK-001 trên nhánh task/TASK-001-warehouse-domain. Đọc nhật ký bàn giao tại .ai/sessions/SESSION-20261015-01.md và kiểm tra git status. Báo cáo hiện trạng công việc dở dang và đề xuất bước xử lý tiếp theo. KHÔNG SỬA CODE KHI CHƯA ĐƯỢC DUYỆT."*

---

## 4. Xử Lý Khi Báo Cáo Của Phiên Trước Không Đủ Căn Cứ

Nếu bạn phát hiện phiên AI trước tuyên bố "Đã hoàn thành 100%" nhưng khi kiểm tra thực tế:
- Git không có commit hoặc working tree còn bẩn (`untracked files`).
- Chạy `npm run test:run` bị lỗi gãy (failing tests).
- Chưa có unit test cho các tính năng mới.

**Hành động bắt buộc của Human:**
1. **DỪNG NGAY**: Không merge nhánh vào `develop`. Không chuyển task thành `DONE`.
2. **Gửi prompt yêu cầu AI xác minh lại bằng chứng**:
   > *"Báo cáo phiên trước tuyên bố hoàn tất nhưng chạy test thực tế bị lỗi. Hãy chạy 'npm run test:run' và 'git status', phân tích nguyên nhân lỗi và giải thích tại sao có sự sai lệch này. Chưa sửa mã nguồn khi chưa phân tích xong."*
3. Đọc hướng dẫn chi tiết tại [task-report-review.md](../reports/task-report-review.md) và [warnings-and-red-flags.md](../reports/warnings-and-red-flags.md).

---

## 5. Xử Lý Khi Tài Liệu Thiếu Hoặc Chưa Khởi Tạo (Fallback Protocol)

Theo quy định tại `.document/ROUTER.md` (Mục 4):
- Nếu bạn thấy thư mục `.document/current/` bị thiếu tài liệu kiến trúc hoặc hợp đồng API cho một tính năng cũ:
  - **Không hoảng loạn**: Không tự ý yêu cầu AI bịa ra tài liệu kiến trúc đồ sộ ngay lập tức.
  - **Dựa trên cấu hình thực tế**: Nguồn sự thật lúc này là mã nguồn hiện hữu trong `/src/`, các file test trong `/src/`, và cấu hình `package.json`.
  - **Giới hạn phạm vi**: Chỉ yêu cầu AI viết tài liệu bổ sung khi Sprint hiện tại thực sự cần chạm vào module đó.

