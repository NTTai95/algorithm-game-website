# Quy Tắc Tác Nghiệp Bắt Buộc Của AI (Mandatory AI Rules)

Mọi phiên AI khi tham gia phát triển dự án này **BẮT BUỘC** phải tuân thủ tuyệt đối các quy tắc sau:

1. **Tuân Thủ Nhánh & Ranh Giới Quyền Hạn (Branch Role Compliance)**:
   - Nhánh Git hiện tại quyết định vai trò và năng lực hành động của AI (chi tiết tại [`.ai/BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md)).
   - Trên nhánh `main`: Tuyệt đối **CẤM sửa bất kỳ file nào trong `/src/`**. Vai trò là Quy hoạch, Kiến trúc, Giao thức, Tài liệu.
   - Trên nhánh `develop`: Tuyệt đối **CẤM sửa bất kỳ file nào trong `/src/`**. Vai trò là Tích hợp, Chạy test, Đánh giá Sprint.
   - Trên nhánh `task/TASK-XXX-*`: Là **nhánh duy nhất** được phép viết mã nguồn sản phẩm trong `/src/` (chỉ trong phạm vi task scope).

2. **Bản Thể Hoán Đổi & Không Có Danh Tính Cố Định (Interchangeable AI Identity)**:
   - Hệ thống **không sử dụng** danh tính tĩnh như `AGENT_A` hay `AGENT_B`.
   - Danh tính tác nghiệp của một phiên AI được xác định duy nhất bởi:
     $$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
   - Mọi phiên AI đều bình đẳng, tuân thủ cùng một quy tắc và có thể bàn giao công việc qua Git repository.

3. **Tính Độc Quyền Của `main` và `develop` (Sequential Control)**:
   - Chỉ duy nhất 1 AI được phép hoạt động trên `main` tại một thời điểm.
   - Chỉ duy nhất 1 AI được phép hoạt động trên `develop` tại một thời điểm.
   - Nhiều AI chỉ được phép chạy song song trên các nhánh `task/TASK-XXX-*` tách biệt nhau.

4. **Nguyên Tắc "1 AI = 1 Task"**:
   - Một phiên AI chỉ được sở hữu duy nhất 1 task hoạt động tại một thời điểm.
   - Khi chuyển sang task khác, phải dừng code ở điểm an toàn, commit đầy đủ, push nhánh, cập nhật trạng thái và để lại ghi chú bàn giao trong `.ai/sessions/`. Không bao giờ bỏ dở code chưa commit.

5. **Quy Trình Diễn Giải Lời Nhắc & Kiểm Tra Ràng Buộc Trước Khi Thực Thi**:
   Trước khi thực hiện bất kỳ chỉ thị nào trong lời nhắc (prompt) của Con người, AI **BẮT BUỘC** phải thực hiện chuỗi 8 bước kiểm tra:
   1. Diễn giải lời nhắc bằng đặc tả ngôn ngữ trong [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md).
   2. Xác định rõ Command, Target, Scope, Intended Result, Restrictions và Constraints.
   3. Khảo sát nhánh Git hiện tại (`git branch --show-current`).
   4. Khảo sát file task liên quan (`.ai/tasks/active/TASK-XXX.md` và `TASK_PROCESSING.md`).
   5. Khảo sát phạm vi tệp tin được phép (`ALLOWED FILES`).
   6. Khảo sát kiến trúc ([`.document/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md)) và hợp đồng API ([`.document/interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md)).
   7. Xác định xem hành động được yêu cầu có hợp lệ trong bối cảnh hiện tại hay không.
   8. Chỉ thực thi khi tất cả các rào chắn kiểm tra đều thỏa mãn.
   
   > **CẤM KỴ TUYỆT ĐỐI**:
   > - CẤM coi `CONTROL.md` là nơi lưu trạng thái phiên làm việc hoặc tự sửa `CONTROL.md` để tự cấp quyền.
   > - CẤM tự ý bịa đặt hoặc suy diễn các quyền chưa được cấp.
   > - CẤM tự động đổi nhánh Git (`git checkout` / `git switch`) để lách luật.
   > - CẤM giả định rằng lời nhắc của con người có thể vượt qua Branch Rules hoặc Task Scope.

6. **Tạo Nhánh Task Từ Develop Mà Không Cần Checkout**:
   - AI đang ở nhánh task không được tự ý checkout sang `main` hay `develop`.
   - Khi cần tạo nhánh task mới, phân nhánh trực tiếp từ tham chiếu `develop` đã đồng bộ (ví dụ: `git branch task/TASK-010-slug develop`).

7. **Thiết Kế Trước Khi Viết Code (Design Before Implementation)**:
   - AI phải hoàn thành Phần 1 (Mục tiêu, Scope, API, Data Flow, Test Plan) trong `TASK-XXX.md` trước khi bắt đầu viết code. Lệnh `DESIGN` không ngụ ý quyền viết mã trong `/src/`.

8. **Ranh Giới Phạm Vi Tệp Tin (File Isolation)**:
   - Chỉ chỉnh sửa các tệp nằm trong `ALLOWED FILES`. Không chạm vào `RESTRICTED FILES`.
   - Ưu tiên tạo tệp/thư mục riêng theo task thay vì sửa tệp dùng chung, để tránh xung đột giữa các nhánh task chạy song song.

9. **Không Tự Ý Thay Đổi Kiến Trúc Hoặc Phá Vỡ Hợp Đồng API (Quy Chuẩn Proposal)**:
   - Giữ vững kiến trúc phân lớp và các nguyên tắc thiết kế đã được phê duyệt trong [`.document/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md) và [`.document/interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md).
   - Lõi thuật toán/mô phỏng phải độc lập với tầng hiển thị và UI, chạy được trong môi trường kiểm thử tự động (Vitest/Node).
   - Khi phát hiện cần đổi kiến trúc/API/quy trình trong lúc làm task:
     1. Xác định rõ vấn đề có đòi hỏi thay đổi kiến trúc/API/thiết kế hay không.
     2. Tạo file đề xuất `.ai/changes/proposals/PROP-XXX.md` theo chuẩn.
     3. Tham chiếu đề xuất trong task liên quan (`RELATED_PROPOSALS`) và session log.
     4. **Trường Hợp Không Chặn (Non-blocking)**: Nếu đề xuất hữu ích nhưng không cản trở việc hoàn thành task hiện tại, AI tiếp tục hoàn tất task, tạo commit triển khai và commit đề xuất riêng rẽ, push cả hai lên remote task branch.
     5. **Trường Hợp Chặn (Blocking)**: Nếu kiến trúc hiện tại xung đột căn bản với task hiện tại, AI phải:
        $$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{CREATE\ PROP-XXX} \longrightarrow \mathbf{MARK\ BLOCKED} \longrightarrow \mathbf{STOP}$$
        Đánh dấu `BLOCKS_CURRENT_TASK: YES`, dừng ngay phần việc bị ảnh hưởng, commit đề xuất và trạng thái dở dang, push lên remote và chờ phán quyết của Con người. **TUYỆT ĐỐI CẤM** tự chế workaround để tránh việc dừng task.
   - **Phân Biệt Cốt Lõi**: $\mathbf{APPROVED\ PROPOSAL} \neq \mathbf{IMPLEMENTED\ CHANGE}$. Đề xuất được duyệt không tự động cấp quyền code cho tới khi có task chính thức được giao.

10. **Xử Lý Sai Lệch Tài Liệu (Drift Handling)**:
    - Khi mã nguồn thực tế khác với tài liệu thiết kế: Tạo Báo cáo sai lệch (`.ai/changes/drift/DRIFT-XXX.md`) và **DỪNG LẠI**.
    - Tuyệt đối không tự ý sửa code cho khớp tài liệu hoặc sửa tài liệu cho khớp code.

11. **Không Tự Cài Đặt Thư Viện Mới**:
    - Không cài thêm bất kỳ gói npm nào khi chưa có sự phê duyệt rõ ràng từ Human Developers.

12. **Tiêu Chuẩn Hoàn Tất Kiểm Thử Toàn Diện**:
    - Task không hoàn tất chỉ vì `npm run test:run` chạy qua. Task đòi hỏi:
      - Unit & Feature test của task vượt qua
      - Acceptance criteria đạt 100%
      - Regression tests vượt qua (các test cũ không bị gãy)
      - `npm run typecheck` đạt 0 lỗi
      - `npm run lint` đạt 0 lỗi
      - `npm run build` thành công
      - Tài liệu liên quan được cập nhật đầy đủ

13. **Quyền Merge Duy Nhất Thuộc Về Con Người**:
    - AI sau khi hoàn tất chỉ được đánh dấu `READY_FOR_REVIEW`.
    - Chỉ có Lập trình viên Con người mới có quyền duyệt và thực hiện merge nhánh task vào `develop`.
    - Task chỉ chuyển sang `DONE` sau khi con người đã tích hợp.

14. **Bảo Tồn Lịch Sử Git & Tách Biệt Commit**:
    - Sử dụng chuẩn commit: `TASK-XXX: <mô tả>` cho mã nguồn/triển khai, `PROP-XXX: <mô tả>` cho đề xuất cải tiến, hoặc `INIT-XXX: <mô tả>`.
    - **Tách biệt commit**: Commit triển khai chứa mã nguồn/test; commit đề xuất chứa riêng artifact proposal và tham chiếu tài liệu. Tuyệt đối không gộp chung.
    - Cấm force push (`git push -f`) hoặc viết lại lịch sử các nhánh chung.

15. **Không Tự Ý Tối Ưu Hóa Quy Trình (No Unauthorized Workflow Optimization)**:
    - AI có thể phát hiện quy trình chưa tối ưu, nhưng **KHÔNG ĐƯỢC TỰ Ý SỬA QUY TRÌNH**. Phải viết Proposal để con người xem xét.

16. **Tôn Trọng Thư Mục `.human/` Và `.document/`**:
    - `.human/` là Sổ tay Vận hành và Bộ nhớ của Con người. AI trên nhánh `task/*` và `develop` tuyệt đối không tự động nạp `.human/` làm ngữ cảnh tác nghiệp. Quyền hạn vận hành của AI xuất phát duy nhất từ `.ai/`.
    - `.document/` là Nguồn Sự Thật Duy Nhất (Single Source of Truth) về tri thức, mục tiêu, kiến trúc và hợp đồng kỹ thuật của dự án. AI đọc các tài liệu trong `.document/` theo nhu cầu của từng loại task.

17. **Kiểm Tra Đa Khía Cạnh Trước Khi Dừng & Đề Xuất Là Tài Sản Dùng Chung**:
    - Trước khi kết thúc một task (`READY_FOR_REVIEW`) hoặc tạm dừng một task (`PAUSED`), AI **BẮT BUỘC** phải tự kiểm tra 6 khía cạnh:
      1. Thay đổi mã nguồn (`source changes`)
      2. Kết quả kiểm thử (`tests`)
      3. Trạng thái task (`task status`)
      4. Trạng thái phiên (`session status`)
      5. Các đề xuất đã tạo (`proposals`)
      6. Các báo cáo sai lệch (`drift reports`)
    - Nếu có Proposal được tạo ra:
      - Đảm bảo proposal được Git theo dõi (được `git add`, không để `untracked`).
      - Đảm bảo proposal được commit riêng rẽ (`PROP-XXX: ...`).
      - Đảm bảo proposal được push lên remote task branch.
      - Đảm bảo proposal được tham chiếu trong task (`RELATED_PROPOSALS`) và session (`PROPOSALS_CREATED`).
    - AI **TUYỆT ĐỐI KHÔNG ĐƯỢC** để tri thức dự án chỉ nằm lại trên máy cục bộ hoặc giấu kín trong bộ nhớ chat.
