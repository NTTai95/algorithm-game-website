# Cẩm Nang Khắc Phục Sự Cố Thường Gặp (.human/troubleshooting/common-problems.md)

Tài liệu này tổng hợp các tình huống sự cố thực tế thường gặp trong quá trình vận hành hệ thống cùng AI, nguyên nhân gốc rễ và quy trình khắc phục từng bước dành cho Lập trình viên Con người.

---

## 1. Mục Lục Sự Cố

- [Sự cố 1: AI Báo Dừng Khẩn Cấp Do Vi Phạm Halt Matrix](#sự-cố-1-ai-báo-dừng-khẩn-cấp-do-vi-phạm-halt-matrix)
- [Sự cố 2: Tiến Trình Kiểm Thử Bị Treo Vô Tận (Vitest Hang)](#sự-cố-2-tiến-trình-kiểm-thử-bị-treo-vô-tận-vitest-hang)
- [Sự cố 3: Lỗi Kiểu Dữ Liệu TypeScript (Typecheck Failures)](#sự-cố-3-lỗi-kiểu-dữ-liệu-typescript-typecheck-failures)
- [Sự cố 4: Task Bị Nghẽn Do Đề Xuất Chặn Kiến Trúc (Task Blocked by Proposal)](#sự-cố-4-task-bị-nghẽn-do-đề-xuất-chặn-kiến-trúc-task-blocked-by-proposal)
- [Sự cố 5: Xung Đột Nhánh Khi Merge Vào Develop (Git Merge Conflict)](#sự-cố-5-xung-đột-nhánh-khi-merge-vào-develop-git-merge-conflict)
- [Sự cố 6: Cần Đổi Task Khẩn Cấp Nhưng Code Đang Dở Dang](#sự-cố-6-cần-đổi-task-khẩn-cấp-nhưng-code-đang-dở-dang)
- [Sự cố 7: AI Sửa Hỏng Code Hoặc Xóa Nhầm File Quan Trọng](#sự-cố-7-ai-sửa-hỏng-code-hoặc-xóa-nhầm-file-quan-trọng)
- [Sự cố 8: Mất Bối Cảnh Khi Mở Cửa Sổ Chat Mới Hoặc Đổi Máy](#sự-cố-8-mất-bối-cảnh-khi-mở-cửa-sổ-chat-mới-hoặc-đổi-máy)

---

## 2. Chi Tiết Các Sự Cố & Hướng Dẫn Khắc Phục

### Sự cố 1: AI Báo Dừng Khẩn Cấp Do Vi Phạm Halt Matrix

#### Triệu chứng:
AI lập tức dừng lại, từ chối thực thi lệnh và gửi thông báo lỗi:
> *"HALT: develop cấm sửa /src/"* hoặc *"HALT: Nhánh Git không khớp với Task ID"*.

#### Nguyên nhân:
Hệ thống phòng vệ an toàn (Halt Matrix tại `.ai/rules/BRANCH_RULES.md`) phát hiện sự không tương thích giữa nhánh Git bạn đang đứng và hành động bạn yêu cầu:
- Bạn yêu cầu `IMPLEMENT` (viết code) trong khi đang đứng ở nhánh `main` hoặc `develop`.
- Bạn yêu cầu làm `TASK-002` trong khi đang đứng ở nhánh `task/TASK-001-*`.

#### Cách khắc phục:
1. Không ép AI lách luật hay vượt quyền.
2. Kiểm tra nhánh Git hiện tại:
   ```bash
   git branch --show-current
   ```
3. Chuyển sang đúng nhánh task tương ứng:
   ```bash
   git checkout task/TASK-002-<slug>
   ```
4. Gửi lại lệnh cho AI tiếp tục công việc.

---

### Sự cố 2: Tiến Trình Kiểm Thử Bị Treo Vô Tận (Vitest Hang)

#### Triệu chứng:
Lệnh test chạy mãi không dừng, terminal không trả về kết quả, process bị chiếm dụng.

#### Nguyên nhân:
Bạn hoặc AI đã chạy nhầm lệnh `npm run test` (vốn chạy Vitest ở chế độ Interactive Watch Mode) thay vì lệnh chạy một lần `npm run test:run`.

#### Cách khắc phục:
1. Nhấn `Ctrl + C` hoặc gõ phím `q` trong terminal để hủy tiến trình đang treo.
2. Luôn sử dụng lệnh chạy một lần chuẩn:
   ```bash
   npm run test:run
   ```

---

### Sự cố 3: Lỗi Kiểu Dữ Liệu TypeScript (Typecheck Failures)

#### Triệu chứng:
Chạy `npm run typecheck` báo các lỗi đỏ: `Property does not exist on type`, `Type 'X' is not assignable to type 'Y'`.

#### Nguyên nhân:
Mã nguồn mới triển khai chưa đồng bộ interface, hoặc chưa import đúng kiểu dữ liệu, hoặc AI tự ý thay đổi signature của hàm dùng chung.

#### Cách khắc phục:
1. Chạy lệnh để xem danh sách lỗi cụ thể kèm số dòng:
   ```bash
   npm run typecheck
   ```
2. Gửi prompt cho AI:
   > *"Lệnh 'npm run typecheck' đang báo lỗi tại file <đường dẫn file> dòng <số dòng>. Hãy đọc kỹ thông báo lỗi, đối chiếu với interface đã định nghĩa trong file task và sửa lại cho khớp kiểu dữ liệu. Không dùng '@ts-ignore'."*

---

### Sự cố 4: Task Bị Nghẽn Do Đề Xuất Chặn Kiến Trúc (Task Blocked by Proposal)

#### Triệu chứng:
Task chuyển sang trạng thái `STATUS: BLOCKED`. AI từ chối code tiếp và báo cáo đang chờ quyết định của bạn.

#### Nguyên nhân:
Trong khi lập trình, AI phát hiện một vấn đề kiến trúc lớn khiến task không thể hoàn thành nếu không sửa đổi hợp đồng API hiện có (`BLOCKS_CURRENT_TASK: YES` trong file `PROP-XXX.md`).

#### Cách khắc phục:
1. Mở file đề xuất tại `.ai/changes/proposals/PROP-XXX.md`.
2. Đọc mục `Bài toán` và `Giải pháp đề xuất`.
3. Bạn đưa ra phán quyết:
   - **Nếu bạn đồng ý với đề xuất**: Cập nhật `HUMAN_DECISION: APPROVED` trong file đề xuất, cập nhật tài liệu kiến trúc tại `.document/current/` và chỉ đạo AI:
     > *"Tôi duyệt đề xuất PROP-XXX. Hãy cập nhật thiết kế task theo giải pháp mới và tiếp tục IMPLEMENT."*
   - **Nếu bạn từ chối**: Cập nhật `HUMAN_DECISION: REJECTED` và yêu cầu AI tìm giải pháp thay thế giữ nguyên kiến trúc cũ.

---

### Sự cố 5: Xung Đột Nhánh Khi Merge Vào Develop (Git Merge Conflict)

#### Triệu chứng:
Khi chạy lệnh `git merge --no-ff task/TASK-XXX-<slug>`, terminal báo `CONFLICT (content): Merge conflict in src/... Automatic merge failed`.

#### Nguyên nhân:
Một lập trình viên khác đã merge một task vào `develop` trước bạn và đã sửa đổi các dòng code trong cùng một file.

#### Cách khắc phục:
1. Hủy lệnh merge trên `develop` nếu muốn kiểm tra lại:
   ```bash
   git merge --abort
   ```
2. Quay lại nhánh task để giải quyết xung đột:
   ```bash
   git checkout task/TASK-XXX-<slug>
   git merge develop
   ```
3. Mở các file bị conflict trong VS Code / IDE. Giữ lại phần logic đúng của cả hai bên theo chuẩn Architecture.
4. Chạy kiểm tra bắt buộc:
   ```bash
   npm run typecheck && npm run test:run
   ```
5. Commit giải quyết conflict trên nhánh task:
   ```bash
   git commit -m "TASK-XXX: resolve merge conflicts with develop"
   git push origin task/TASK-XXX-<slug>
   ```
6. Quay lại `develop` và thực hiện merge lại bình thường.

---

### Sự cố 6: Cần Đổi Task Khẩn Cấp Nhưng Code Đang Dở Dang

#### Triệu chứng:
Bạn đang để AI làm `TASK-001` nhưng có việc gấp cần làm ngay `TASK-002`.

#### Cách khắc phục (Quy Trình Preemption Chuẩn):
1. Không bắt AI vứt bỏ code dở dang. Gửi prompt:
   > *"Dừng code ở trạng thái an toàn. Chạy kiểm tra, tạo commit WIP theo chuẩn 'TASK-001: WIP pause at <vị trí>', commit riêng proposal nếu có, push nhánh task/TASK-001-... lên GitHub và cập nhật trạng thái PAUSED kèm Session Log bàn giao trước khi STOP."*
2. Kiểm tra `git status` đảm bảo `working tree clean`.
3. Chuyển sang nhánh của task mới:
   ```bash
   git checkout task/TASK-002-<slug>
   ```
4. Khi muốn quay lại `TASK-001`: Gửi prompt `"RESUME TASK-001 từ Session Log gần nhất"`.

---

### Sự cố 7: AI Sửa Hỏng Code Hoặc Xóa Nhầm File Quan Trọng

#### Triệu chứng:
AI lỡ tay sửa nhầm một file ngoài scope hoặc xóa nhầm tài liệu quan trọng trong thư mục.

#### Cách khắc phục:
1. Nếu chưa commit: Hoàn tác ngay file đó về trạng thái của commit gần nhất:
   ```bash
   # Khôi phục một file cụ thể
   git checkout HEAD -- src/path/to/file.ts

   # Khôi phục toàn bộ working tree về sạch sẽ
   git restore .
   ```
2. Nếu AI đã lỡ commit: Hoàn tác commit gần nhất mà vẫn giữ lại thay đổi dưới dạng uncommitted để bạn rà soát:
   ```bash
   git reset HEAD~1
   ```
3. Nếu file bị xóa nhầm: Khôi phục lại từ commit trước:
   ```bash
   git checkout HEAD~1 -- path/to/deleted/file.md
   ```

---

### Sự cố 8: Mất Bối Cảnh Khi Mở Cửa Sổ Chat Mới Hoặc Đổi Máy

#### Triệu chứng:
Bạn mở cửa sổ chat mới hoặc đổi máy tính, AI hỏi lại từ đầu: *"Tôi có thể giúp gì cho bạn?"*.

#### Cách khắc phục:
1. Không cần giải thích lại toàn bộ lịch sử dự án.
2. Kiểm tra nhánh Git hiện tại: `git branch --show-current`.
3. Mở file nhật ký phiên gần nhất trong `.ai/sessions/` để lấy mã phiên (ví dụ: `SESSION-20261015-01.md`).
4. Gửi prompt định hướng danh tính tức thì cho AI:
   > *"RESUME TASK-XXX trên nhánh <tên-nhánh>. Hãy đọc .ai/sessions/SESSION-YYYYMMDD-XX.md và kiểm tra git status. Báo cáo ngắn gọn hiện trạng công việc và hành động tiếp theo cần làm."*
AI sẽ nạp lại bối cảnh trong 5 giây và tiếp tục công việc chính xác tại điểm dừng trước.
