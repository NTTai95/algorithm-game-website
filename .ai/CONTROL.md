# Đặc Tả Ngôn Ngữ Chỉ Huy & Giao Thức Diễn Giải Lệnh (AI Command Protocol & Interpretation Specification)

> **NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLE)**:
> 
> - `CONTROL.md` **KHÔNG PHẢI** là nơi lưu trạng thái phiên làm việc hiện tại (`current session state`).
> - `CONTROL.md` **KHÔNG PHẢI** là tệp con người chỉnh sửa cho mỗi task hay mỗi lần ra lệnh.
> - `CONTROL.md` **KHÔNG PHẢI** là công tắc bật/tắt quyền tạm thời (`CURRENT_TASK`, `ALLOW_CODE`, `ALLOW_COMMIT`).
> - `CONTROL.md` là **ĐẶC TẢ TĨNH VỀ NGÔN NGỮ CHỈ HUY & QUY TẮC DIỄN GIẢI (STATIC COMMAND SPECIFICATION)**.
> - Lập trình viên Con người điều khiển AI chủ yếu **THÔNG QUA LỜI NHẮC (PROMPTS)**.
> - File này dùng chung cho tất cả các phiên AI, không thay đổi theo từng session hay từng task.

---

## 1. Phân Định Rạch Ròi Các Khái Niệm Trong Hệ Thống

Để tránh nhầm lẫn giữa quyền hạn nhánh, ngôn ngữ chỉ huy, phạm vi nhiệm vụ và lịch sử làm việc:

| Khái Niệm | Câu Hỏi Trả Lời | Vị Trí Lưu Trữ | Tính Chất |
| :--- | :--- | :--- | :--- |
| **BRANCH RULES** | *"Nhánh Git này về mặt bản chất được phép làm gì?"* | [`.ai/BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md) | Bất biến theo vai trò nhánh (`main`, `develop`, `task/*`) |
| **CONTROL PROTOCOL** | *"Mệnh lệnh do Con người đưa ra trong prompt có ý nghĩa gì?"* | [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md) | Đặc tả từ vựng & quy tắc diễn giải tĩnh, dùng chung |
| **TASK SCOPE** | *"Nhiệm vụ cụ thể này được phép tạo/sửa những tệp tin nào?"* | `.ai/tasks/active/TASK-XXX.md` | Giới hạn phạm vi (`ALLOWED FILES`, `SCOPE`) của từng task |
| **HUMAN PROMPT** | *"Con người muốn AI thực hiện hành động gì ngay lúc này?"* | Lời nhắc tương tác trực tiếp của Human | Động, xác định ý định tức thời trong từng lượt trao đổi |
| **SESSION LOG** | *"Phiên AI này đã thực hiện những gì, dừng ở đâu, bàn giao ra sao?"* | `.ai/sessions/SESSION-XXX.md` | Động, ghi nhận nhật ký của từng phiên làm việc cụ thể |
| **GIT REPOSITORY** | *"Những gì đã được ghi nhận vào lịch sử và tích hợp chính thức?"* | Git Commits, Tree, Branches | Sự thật khách quan duy nhất (Single Source of Truth) |

---

## 2. Luồng Xử Lý Mệnh Lệnh (Control Flow)

Khi nhận được bất kỳ lời nhắc (prompt) nào từ Con người, AI **BẮT BUỘC** xử lý theo luồng tất định:

```
                      HUMAN PROMPT
                           │
                           ▼
               .ai/CONTROL.md (Đặc tả từ vựng)
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      Diễn giải Ý định              Xác định Ràng buộc
      - Command (Lệnh)              - Modifiers (Chỉ định)
      - Target (Mục tiêu)           - Scope (Phạm vi)
      - Expected Result             - Restrictions (Cấm chỉ)
             └─────────────┬─────────────┘
                           │
                           ▼
               Kiểm tra BRANCH_RULES
      (Nhánh hiện tại có cho phép hành vi này không?)
                           │
                           ▼
               Kiểm tra TASK SCOPE & STATE
      (Task có hợp lệ, đang active và file trong ALLOWED FILES?)
                           │
                           ▼
            Kiểm tra PROJECT / ARCHITECTURE RULES
      (Có phá vỡ API Contract, kiến trúc phân lớp, hoặc nợ kỹ thuật?)
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
     EXECUTE            PROPOSE              STOP
  (Nếu thỏa mãn       (Nếu chạm kiến     (Nếu xung đột nhánh,
  toàn bộ điều kiện)  trúc/ngoài scope)  vượt quyền, sai lệch)
```

---

## 3. Từ Vựng Mệnh Lệnh Chuẩn (Command Vocabulary)

Mỗi mệnh lệnh biểu thị một ý định tác nghiệp rõ ràng với kỳ vọng kết quả và giới hạn thực thi cụ thể:

### 3.1. `ANALYZE` (Phân Tích / Khảo Sát)
- **Ý nghĩa**: Khảo sát, tìm hiểu, truy vết nguyên nhân, đánh giá hiện trạng hoặc kiểm tra tính khả thi của một vấn đề/nhiệm vụ.
- **Hành vi kỳ vọng**: Đọc mã nguồn, rà soát tài liệu, phân tích luồng logic, đánh giá rủi ro.
- **Ngụ ý sửa đổi file**: **KHÔNG (Read-only)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Báo cáo phân tích, đánh giá kiến trúc, danh sách câu hỏi làm rõ.
- **Hạn chế**: Tuyệt đối không được chỉnh sửa mã nguồn hoặc tự ý cài đặt thư viện.
- **Ví dụ**: `"ANALYZE TASK-003"`, `"ANALYZE nguyên nhân gãy kiểm thử"`

### 3.2. `DESIGN` (Thiết Kế Kỹ Thuật)
- **Ý nghĩa**: Soạn thảo giải pháp kỹ thuật, phân tách module, hợp đồng API, luồng dữ liệu và kế hoạch kiểm thử cho một task.
- **Hành vi kỳ vọng**: Hoàn thiện Phần 1 (Design Before Implementation) trong file task hoặc tài liệu kiến trúc.
- **Ngụ ý sửa đổi file**: **CÓ (Chỉ file tài liệu/đặc tả task)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **TUYỆT ĐỐI KHÔNG**.
- **Kết quả kỳ vọng**: Bản thiết kế chi tiết gồm API contracts, data flows, acceptance criteria, test plan.
- **Hạn chế**: Không được viết mã tính năng trong `/src/`.
- **Ví dụ**: `"DESIGN TASK-003"`, `"DESIGN TASK-003, DO NOT IMPLEMENT"`

### 3.3. `IMPLEMENT` (Triển Khai Mã Nguồn)
- **Ý nghĩa**: Lập trình mã nguồn và viết unit test để hiện thực hóa tính năng đã được phê duyệt thiết kế.
- **Hành vi kỳ vọng**: Tạo mới/chỉnh sửa tệp nằm chính xác trong `ALLOWED FILES` của task, hiện thực hóa logic theo thiết kế.
- **Ngụ ý sửa đổi file**: **CÓ**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **CÓ (Chỉ trên nhánh `task/*`)**.
- **Kết quả kỳ vọng**: Mã nguồn hoàn thiện, unit tests đầy đủ, mã chạy qua typecheck/lint.
- **Hạn chế**: Chỉ được phép trên nhánh `task/TASK-XXX-*`, task phải ở trạng thái sẵn sàng, tuyệt đối cấm sửa file ngoài scope. CẤM trên `main` và `develop`.
- **Ví dụ**: `"IMPLEMENT TASK-003 theo thiết kế đã duyệt"`, `"IMPLEMENT TASK-001 ONLY"`

### 3.4. `TEST` (Kiểm Thử)
- **Ý nghĩa**: Thực thi và đánh giá kết quả của các bộ kiểm thử tự động, linters, typecheck và build.
- **Hành vi kỳ vọng**: Chạy lệnh kiểm thử (`npm run test:run`, `npm run typecheck`, `npm run lint`, `npm run build`), phân tích lỗi gãy.
- **Ngụ ý sửa đổi file**: **KHÔNG** (Lệnh TEST đơn thuần không cấp quyền sửa đổi mã nguồn sản phẩm).
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Báo cáo kết quả pass/fail, log chi tiết ca kiểm thử, phân tích độ bao phủ hoặc nguyên nhân lỗi.
- **Hạn chế**: Không được tự ý sửa mã nguồn sản phẩm để ép test pass khi chưa có chỉ thị `IMPLEMENT`.
- **Ví dụ**: `"TEST TASK-003"`, `"TEST TASK-003 WITHOUT MODIFYING SOURCE"`, `"TEST toàn bộ hệ thống trên develop"`

### 3.5. `REVIEW` (Nghiệm Thu / Rà Soát Mã Nguồn)
- **Ý nghĩa**: Đánh giá chất lượng mã nguồn, kiểm tra diff Git, đối chiếu tiêu chí nghiệm thu và tính tương thích kiến trúc.
- **Hành vi kỳ vọng**: Đọc diff giữa nhánh task và develop/main, kiểm tra tuân thủ quy tắc, rà soát rủi ro bảo mật hoặc hiệu năng.
- **Ngụ ý sửa đổi file**: **KHÔNG (Read-only)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Báo cáo review chi tiết, khuyến nghị APPROVE hoặc REQUEST_CHANGES.
- **Hạn chế**: Không được sửa code trong lúc review.
- **Ví dụ**: `"REVIEW TASK-003 diff so với develop"`, `"REVIEW chất lượng code của module Kho bãi"`

### 3.6. `REPORT` (Lập Báo Cáo Hiện Trạng)
- **Ý nghĩa**: Tổng hợp số liệu, trạng thái sprint, nợ kỹ thuật, hoặc nhật ký tiến độ của dự án.
- **Hành vi kỳ vọng**: Thu thập dữ liệu từ các task, nhánh Git, kết quả test và tổng hợp thành tài liệu báo cáo.
- **Ngụ ý sửa đổi file**: **CÓ (Chỉ ghi vào file báo cáo/ghi chú tại `.human/notes/` hoặc `.ai/sessions/`)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Bản báo cáo dạng Markdown có cấu trúc rõ ràng.
- **Hạn chế**: Không can thiệp mã nguồn `/src/`.
- **Ví dụ**: `"REPORT trạng thái Sprint hiện tại"`, `"REPORT nợ kỹ thuật sau khi tích hợp"`

### 3.7. `PROPOSE` (Đề Xuất Thay Đổi)
- **Ý nghĩa**: Soạn thảo đề xuất thay đổi kiến trúc, giao diện API, hoặc sửa đổi ngoài phạm vi task hiện tại. Đề xuất là tài sản dự án dùng chung (shared artifact) và được chia sẻ qua Git.
- **Hành vi kỳ vọng**: Tạo tệp đề xuất mới tại `.ai/changes/proposals/PROP-XXX.md`, cập nhật tham chiếu trong task/session, tạo commit riêng (`PROP-XXX: <mô tả>`) và đẩy lên remote.
- **Ngụ ý sửa đổi file**: **CÓ (Chỉ tạo file `PROP-XXX.md` và cập nhật tham chiếu trong task/session)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **TUYỆT ĐỐI KHÔNG (PROPOSE không cấp quyền triển khai đề xuất; APPROVED PROPOSAL ≠ IMPLEMENTED CHANGE)**.
- **Kết quả kỳ vọng**: File Proposal hoàn chỉnh gồm bối cảnh, lý do, các phương án, phân tích tác động, được commit và push riêng biệt.
- **Hạn chế**: Không được tự ý thực thi đề xuất khi Con người chưa phê duyệt và chưa tạo task triển khai chính thức.
- **Ví dụ**: `"PROPOSE cải tiến Crane State Machine, DO NOT IMPLEMENT"`, `"PROPOSE tách module WarehouseSlot"`

### 3.8. `DOCUMENT` (Biên Soạn Tài Liệu)
- **Ý nghĩa**: Tạo mới, cập nhật hoặc đồng bộ hóa tài liệu kỹ thuật, hướng dẫn, hoặc quy cách nghiệp vụ.
- **Hành vi kỳ vọng**: Chỉnh sửa tài liệu Markdown tương ứng với vai trò của nhánh hiện tại.
- **Ngụ ý sửa đổi file**: **CÓ (Chỉ các tệp tài liệu Markdown được phép trên nhánh)**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Tài liệu rõ ràng, nhất quán, cập nhật đúng hiện trạng.
- **Hạn chế**: Không được sửa mã nguồn trong `/src/`.
- **Ví dụ**: `"DOCUMENT hợp đồng API của hệ thống Mô phỏng"`, `"DOCUMENT nhật ký bàn giao phiên"`

### 3.9. `COMMIT` (Tạo Commit Git)
- **Ý nghĩa**: Gom các thay đổi hợp lệ đã qua kiểm thử và tạo commit Git nguyên tử tuân thủ quy chuẩn.
- **Hành vi kỳ vọng**: Kiểm tra `git status`, định dạng commit message đúng chuẩn (`TASK-XXX: ...` cho code/test, `PROP-XXX: ...` cho đề xuất, `INIT-XXX: ...` cho giao thức), thực hiện commit tách biệt giữa triển khai và đề xuất.
- **Ngụ ý sửa đổi file**: **KHÔNG** (Chỉ ghi nhận trạng thái vào Git object store).
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Commit Git sạch sẽ, đúng quy chuẩn, không gộp lẫn commit triển khai và commit đề xuất.
- **Hạn chế**: Chỉ commit khi đã vượt qua toàn bộ kiểm thử xác minh. Không commit khi working tree chứa file rác hoặc ngoài scope.
- **Ví dụ**: `"COMMIT các thay đổi hợp lệ của TASK-001"`, `"COMMIT WIP state để bàn giao"`, `"COMMIT riêng proposal PROP-014"`

### 3.10. `PUSH` (Đẩy Nhánh Lên Remote)
- **Ý nghĩa**: Đẩy các commit của nhánh hiện tại lên kho chứa từ xa (remote repository).
- **Hành vi kỳ vọng**: Chạy lệnh `git push origin <current-branch>`.
- **Ngụ ý sửa đổi file**: **KHÔNG**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **KHÔNG**.
- **Kết quả kỳ vọng**: Nhánh trên remote được đồng bộ với local.
- **Hạn chế**: Tuyệt đối CẤM force push (`-f`). CẤM push nhánh khác với nhánh hiện tại mà chưa kiểm tra.
- **Ví dụ**: `"PUSH nhánh task lên origin"`

### 3.11. `STOP` (Dừng Khẩn Cấp / Dừng Ngay Lập Tức)
- **Ý nghĩa**: Ngừng ngay lập tức mọi hoạt động lập trình, chạy lệnh hoặc can thiệp tệp tin.
- **Hành vi kỳ vọng**: Dừng phiên làm việc ngay tại chỗ, giữ nguyên trạng thái kho chứa an toàn, báo cáo nguyên nhân dừng cho Con người.
- **Ngụ ý sửa đổi file**: **TUYỆT ĐỐI KHÔNG**.
- **Ngụ ý viết mã triển khai (`/src/`)**: **TUYỆT ĐỐI KHÔNG**.
- **Kết quả kỳ vọng**: Thông báo dừng kèm báo cáo ngắn gọn về vị trí hiện tại và lý do dừng.
- **Hạn chế**: Không thực hiện thêm bất kỳ thao tác thay đổi nào.
- **Ví dụ**: `"STOP"`, `"Dừng lại ngay lập tức"`, `"HALT"`

---

## 4. Các Từ Định Lượng Bổ Trợ (Command Modifiers)

Con người có thể kết hợp các từ bổ trợ trong prompt để siết chặt hoặc nới lỏng hành vi của AI:

| Từ Bổ Trợ | Ý Nghĩa Thực Thi | Ví Dụ Sử Dụng Trong Prompt |
| :--- | :--- | :--- |
| `ONLY` | Chỉ thực hiện duy nhất hành vi được chỉ định, cấm làm thêm bất kỳ bước phụ nào | `"ANALYZE TASK-003 ONLY"` (chỉ phân tích, không thiết kế, không code) |
| `DO_NOT` / `WITHOUT` | Ràng buộc phủ định rõ ràng, cấm thực hiện một hành động cụ thể | `"DESIGN TASK-003, DO NOT IMPLEMENT"`, `"TEST TASK-003 WITHOUT MODIFYING SOURCE"` |
| `INSPECT` | Kiểm tra, khảo sát sơ bộ trước khi đưa ra kết luận hoặc kế hoạch | `"INSPECT cấu trúc module Crane trước khi thiết kế"` |
| `PREPARE` | Chuẩn bị trước tài liệu, khung test hoặc quy cách mà chưa vào triển khai | `"PREPARE Test Plan cho TASK-002"` |
| `CONTINUE` / `RESUME` | Tiếp tục công việc dở dang từ phiên trước dựa trên Session Log | `"RESUME TASK-001 từ điểm dừng trước"` |

> **Hỗ trợ Ngôn Ngữ Tự Nhiên (Natural Language Mapping)**:
> Con người không bắt buộc phải gõ đúng chữ hoa tiếng Anh. AI có nhiệm vụ tự động phân tích câu tiếng Việt hoặc tiếng Anh thông thường để quy về đúng cặp Lệnh + Bổ trợ:
> - *"Hãy thiết kế cho tôi task 004, tuyệt đối chưa viết code"* $\longrightarrow$ `COMMAND: DESIGN`, `TARGET: TASK-004`, `RESTRICTION: DO_NOT IMPLEMENT`.
> - *"Chạy thử bộ test xem có lỗi gì không, đừng sửa gì cả"* $\longrightarrow$ `COMMAND: TEST`, `RESTRICTION: WITHOUT MODIFYING SOURCE`.

---

## 5. Quy Trình Phân Tích Lời Nhắc Của AI (Prompt Interpretation Protocol)

Mỗi khi nhận được prompt từ Con người, AI **BẮT BUỘC** trích xuất 6 trường thông tin cốt lõi trước khi hành động:

1. **COMMAND**: Mệnh lệnh chính (`ANALYZE`, `DESIGN`, `IMPLEMENT`, `TEST`, `REVIEW`, `REPORT`, `PROPOSE`, `DOCUMENT`, `COMMIT`, `PUSH`, `STOP`).
2. **TARGET**: Đối tượng tác động (Mã task cụ thể `TASK-XXX`, tên module, tên tệp tin, nhánh Git).
3. **SCOPE**: Phạm vi được phép tác động (Tệp tin được phép, thư mục, ranh giới trách nhiệm).
4. **INTENDED RESULT**: Kết quả mà Con người mong đợi nhận được sau phiên này.
5. **RESTRICTIONS**: Các điều cấm hoặc giới hạn bổ sung do Con người chỉ định (qua modifier hoặc ngữ cảnh).
6. **CONSTRAINTS**: Các ràng buộc khách quan của hệ thống (Vai trò nhánh Git hiện tại, trạng thái task, hợp đồng API).

### Ví dụ Thực Tế:

**Lời nhắc của Con người:**
> *"Triển khai TASK-012 theo bản thiết kế đã được duyệt. Chỉ chỉnh sửa các file trong phạm vi task và viết đầy đủ unit test."*

**AI tự phân tích trong bộ nhớ:**
- `COMMAND`: `IMPLEMENT`
- `TARGET`: `TASK-012`
- `SCOPE`: `ALLOWED FILES` được định nghĩa trong `.ai/tasks/active/TASK-012.md`
- `ADDITIONAL ACTION`: `TEST` (viết và chạy unit test)
- `RESTRICTION`: Chỉ chỉnh sửa file thuộc task scope, không sửa file ngoài scope
- `CONSTRAINT CHECK`: Kiểm tra nhánh Git hiện tại có phải là `task/TASK-012-*` không? Task đã ở trạng thái `IMPLEMENTING` chưa? Nếu thỏa mãn $\to$ Thực thi. Nếu không thỏa mãn $\to$ DỪNG LẠI.

---

## 6. Thứ Tự Ưu Tiên Quyền Lực (Command Precedence & Safety Boundaries)

Trong mọi hoàn cảnh, hệ thống tuân thủ thang bậc quyền lực từ cao xuống thấp:

```
                      HUMAN INTENT (Ý định của Con người)
                                     ↓
                  CONTROL INTERPRETATION (Diễn giải lệnh)
                                     ↓
                     BRANCH RULES (Luật vai trò nhánh Git)
                                     ↓
                   TASK SCOPE (Phạm vi & trạng thái của task)
                                     ↓
                 ARCHITECTURE & CONTRACTS (Kiến trúc & Hợp đồng)
                                     ↓
                           THỰC THI (Execution)
```

### 6.1. Lời Nhắc Của Con Người KHÔNG VƯỢT QUA Được Branch Rules
Lời nhắc thể hiện ý định, nhưng không tự động xóa bỏ các rào chắn bảo vệ an toàn của dự án.
- Con người nói: `"IMPLEMENT TASK-001"` khi đang ở nhánh `main` $\longrightarrow$ **DỪNG LẠI (STOP)**. Lý do: `main` cấm sửa `/src/`.
- Con người nói: `"IMPLEMENT TASK-001"` khi đang ở nhánh `develop` $\longrightarrow$ **DỪNG LẠI (STOP)**. Lý do: `develop` cấm sửa `/src/`.
- Con người nói: `"IMPLEMENT TASK-001"` khi đang ở nhánh `task/TASK-001-*` $\longrightarrow$ Tiếp tục kiểm tra Task Scope & State.

### 6.2. Lời Nhắc Của Con Người KHÔNG VƯỢT QUA Được Task Scope
Nếu một task chỉ cấp phép cho `src/game/crane/*`, nhưng Con người nói:
> *"Hãy triển khai TASK-001 và tiện tay sửa lại luôn giao diện UI bên React"*

AI **TUYỆT ĐỐI KHÔNG ĐƯỢC** âm thầm mở rộng phạm vi task. AI phải:
1. Triển khai phần thuộc phạm vi hợp lệ của task (`src/game/crane/*`).
2. Phát hiện yêu cầu sửa UI nằm ngoài phạm vi được giao.
3. Soạn thảo đề xuất (`PROP-XXX.md`) hoặc đề nghị Con người tạo task riêng cho UI.
4. Dừng phần việc ngoài phạm vi.

### 6.3. Quy Tắc Khi Có Yêu Cầu Thay Đổi Kiến Trúc (Architecture Change Rule)
Khi Con người nói: *"Sửa lại kiến trúc nếu thấy cần thiết."*
AI **KHÔNG ĐƯỢC** coi đây là tấm vé thông hành để tự do tái cấu trúc dự án. Nếu thay đổi có nguy cơ tác động đến:
- Kiến trúc phân lớp và các nguyên tắc thiết kế ([`.document/ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md))
- Hợp đồng API công khai ([`.document/interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md))
- Mô hình thực thể miền ([`.document/domain/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.document/domain/DOMAIN_MODEL.md))
- Nhiều task hoặc các phiên AI khác đang chạy song song
- Thư viện phụ thuộc chính

AI **BẮT BUỘC** phải tuân thủ:
$$\mathbf{DETECT} \longrightarrow \mathbf{ANALYZE} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{PROPOSE} \longrightarrow \mathbf{STOP}$$
Tạo file `.ai/changes/proposals/PROP-XXX.md` và chờ Con người phê duyệt. Tuyệt đối không âm thầm thay đổi kiến trúc.

### 6.4. Xử Lý Xung Đột (Conflict Resolution)
Nếu có bất kỳ xung đột nào giữa Prompt, Nhánh Git, Task Scope và Kiến trúc:
$$\mathbf{DO\ NOT\ GUESS} \longrightarrow \mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{STOP} \longrightarrow \mathbf{AWAIT\ HUMAN\ DECISION}$$

---

## 7. Khả Năng Tương Thích Đa Tác Nhân (Multi-AI Concurrency Model)

1. **Chia sẻ Đặc tả Tĩnh**: Tất cả các phiên AI (chạy trên các máy tính khác nhau, hoặc các IDE khác nhau) đều đọc chung file `CONTROL.md` này mà không hề bị xung đột, vì file này **hoàn toàn phi trạng thái (stateless)**.
2. **Không Lưu Session State Vào CONTROL.md**: Không phiên AI nào được phép ghi đè mã task hiện tại của mình vào file `CONTROL.md`.
3. **Định Danh Tác Nghiệp Độc Lập**:
   $$\text{Bản Thể Tác Nghiệp} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
   Hai AI làm việc độc lập trên hai nhánh task khác nhau (`task/TASK-001` và `task/TASK-002`) đều diễn giải mệnh lệnh thông qua cùng một quy tắc trong `CONTROL.md`, trong khi bối cảnh thực thi của chúng được cách ly hoàn toàn qua Git và Task.
