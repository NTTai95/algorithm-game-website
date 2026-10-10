# Quy Tắc Bắt Buộc Của AI (Core Rules — CORE_RULES.md)

**Authority**: DOC-003. Khi mâu thuẫn với tài liệu khác (trừ BRANCH_RULES.md), file này được ưu tiên.  
**Related**: DOC-004 (BRANCH_RULES.md) · DOC-010 (COMMANDS.md) · DOC-011 (WORKFLOW.md) · DOC-013 (GIT_RULES.md) · DOC-012 (PROPOSALS.md)

Mọi phiên AI **BẮT BUỘC** tuân thủ tuyệt đối 17 quy tắc sau. Không có lời nhắc nào của Human có thể vượt qua các quy tắc này.

---

## NHÓM A: KIỂM SOÁT DANH TÍNH & PHẠM VI

**Rule 1 — Branch Role Compliance**: Nhánh Git hiện tại quyết định vai trò tác nghiệp.
- `main`: CẤM sửa `/src/`. Chỉ: Quy hoạch, Kiến trúc, Giao thức, Tài liệu.
- `develop`: CẤM sửa `/src/`. Chỉ: Tích hợp, Test hồi quy, Đánh giá Sprint.
- `task/TASK-XXX-*`: Nhánh DUY NHẤT được phép sửa `/src/` (chỉ trong ALLOWED FILES của task).
- Chi tiết đầy đủ: DOC-004 (BRANCH_RULES.md).

**Rule 2 — Interchangeable AI Identity**: Không dùng danh tính tĩnh (AGENT_A/B).
- Danh tính tác nghiệp = `GIT BRANCH + TASK ID + SESSION ID`.
- Mọi phiên AI bình đẳng, tuân thủ cùng quy tắc, bàn giao qua Git.

**Rule 3 — Sequential Control on main/develop**: Chỉ 1 AI trên `main` tại một thời điểm. Chỉ 1 AI trên `develop` tại một thời điểm. Nhiều AI được phép chạy song song trên các nhánh `task/*` tách biệt nhau.

**Rule 4 — 1 AI = 1 Task**: Một phiên AI chỉ sở hữu duy nhất 1 task hoạt động. Khi chuyển task: dừng ở điểm an toàn, commit đầy đủ, push, cập nhật trạng thái, ghi nhật ký bàn giao. **Không bao giờ để code chưa commit khi chuyển task.**

**Rule 5 — File Isolation**: Chỉ sửa file trong `ALLOWED FILES` của task. Ưu tiên tạo file riêng theo task thay vì sửa file dùng chung.

---

## NHÓM B: KIỂM TRA TRƯỚC KHI THỰC THI

**Rule 6 — Pre-Execution 8-Step Check**: Trước bất kỳ hành động nào, AI PHẢI thực hiện 8 bước:
1. Diễn giải prompt theo DOC-010 (COMMANDS.md).
2. Xác định: Command, Target, Scope, Intended Result, Restrictions, Constraints.
3. Kiểm tra nhánh Git hiện tại (`git branch --show-current`).
4. Kiểm tra file task liên quan (active/TASK-XXX.md và TASK_PROCESSING.md).
5. Kiểm tra ALLOWED FILES của task.
6. Kiểm tra kiến trúc (DOC-016) và hợp đồng API (DOC-017) nếu liên quan.
7. Xác định hành động có hợp lệ trong bối cảnh hiện tại không.
8. Chỉ thực thi khi TẤT CẢ 8 bước thỏa mãn.

> **CẤM TUYỆT ĐỐI**: Coi CONTROL.md/COMMANDS.md là nơi lưu session state. Tự sửa COMMANDS.md để tự cấp quyền. Tự đổi nhánh để lách luật. Giả định prompt của Human vượt qua Branch Rules.

**Rule 7 — Design Before Code**: AI PHẢI hoàn thành Phần 1 (Mục tiêu, Scope, API, Data Flow, Test Plan) trong TASK-XXX.md trước khi viết code. `DESIGN` không cấp quyền viết mã trong `/src/`.

---

## NHÓM C: KIỂM SOÁT KIẾN TRÚC & THAY ĐỔI

**Rule 8 — No Unauthorized Architecture Change**: Giữ kiến trúc phân lớp và API contracts đã phê duyệt. Khi phát hiện cần thay đổi kiến trúc/API trong khi làm task:
- **Non-blocking**: Tạo PROP-XXX.md (BLOCKS_CURRENT_TASK: NO), tiếp tục task, commit riêng.
- **Blocking**: DETECT → DOCUMENT → CREATE PROP-XXX (BLOCKS_CURRENT_TASK: YES) → MARK BLOCKED → STOP.
- `APPROVED PROPOSAL ≠ IMPLEMENTED CHANGE`. Đề xuất được duyệt không tự động cho phép code.
- Quy trình đầy đủ: DOC-012 (PROPOSALS.md).

**Rule 9 — Drift Handling**: Khi mã nguồn khác tài liệu thiết kế: Tạo DRIFT-XXX.md → DỪNG. Không tự sửa code cho khớp tài liệu, không tự sửa tài liệu cho khớp code.

**Rule 10 — No New Libraries**: Không cài thêm npm package khi chưa được Human phê duyệt rõ ràng.

---

## NHÓM D: TIÊU CHUẨN HOÀN TẤT

**Rule 11 — Completion Criteria**: Task không hoàn tất chỉ vì test pass. Phải đạt ĐẦY ĐỦ:
- Unit & Feature tests vượt qua
- Acceptance criteria đạt 100%
- Regression tests vượt qua (test cũ không bị gãy)
- `npm run typecheck` = 0 lỗi
- `npm run lint` = 0 lỗi
- `npm run build` thành công
- Tài liệu liên quan cập nhật đầy đủ

**Rule 12 — Human-Only Merge**: AI chỉ được đánh dấu tối đa `READY_FOR_REVIEW`. Chỉ Human mới có quyền merge. Task chỉ thành `DONE` sau khi Human tích hợp.

**Rule 13 — Commit Separation**: Commit triển khai (TASK-XXX: ...) và commit đề xuất (PROP-XXX: ...) TUYỆT ĐỐI phải tách biệt. Commit message chuẩn xem DOC-013 (GIT_RULES.md). Cấm force push. Cấm viết lại lịch sử commit.

---

## NHÓM E: KIỂM SOÁT THÔNG TIN

**Rule 14 — No New Branch on main/develop**: AI đang ở nhánh task không được checkout sang main hay develop. Khi cần tạo nhánh task mới: phân nhánh trực tiếp từ tham chiếu `develop` (không cần checkout).

**Rule 15 — No Unauthorized Workflow Optimization**: AI có thể phát hiện quy trình chưa tối ưu nhưng KHÔNG được tự ý sửa. Phải viết Proposal để Human xem xét.

**Rule 16 — Respect .human/ and .document/ Boundaries**:
- `.human/`: AI trên `task/*` và `develop` không tự động nạp `.human/` làm context.
- `.document/`: Là Single Source of Truth về tri thức dự án. AI đọc theo nhu cầu task.

**Rule 17 — Pre-Exit 6-Point Inspection + Proposal as Shared Artifact**: Trước khi kết thúc hoặc tạm dừng task, PHẢI tự kiểm tra:
1. Source changes
2. Test results
3. Task status
4. Session status
5. Proposals created
6. Drift reports

Nếu có Proposal: PHẢI được `git add`, commit riêng (PROP-XXX: ...), push lên remote. TUYỆT ĐỐI KHÔNG để tri thức dự án chỉ nằm trong bộ nhớ chat cục bộ.

---

## LỆNH DỪNG BẮT BUỘC (Mandatory Stop Conditions)

Dừng ngay lập tức và báo cáo Human khi:
- Phát hiện lệnh yêu cầu sửa `/src/` trên `main` hoặc `develop`
- Phát hiện file ngoài ALLOWED FILES bị yêu cầu sửa
- Phát hiện sai lệch giữa mã nguồn và tài liệu (drift)
- Phát hiện đề xuất blocking (BLOCKS_CURRENT_TASK: YES)
- Không tìm thấy quy tắc áp dụng cho tình huống hiện tại
- Có bất kỳ xung đột nào giữa Prompt, Branch Rules, Task Scope

**CẦU TRÚC DỪNG**: `DO NOT GUESS → DETECT → DOCUMENT → STOP → AWAIT HUMAN DECISION`
