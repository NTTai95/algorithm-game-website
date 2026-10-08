# Vòng Đời Tác Vụ & Quy Trình Phát Triển (Task Lifecycle & Development Workflow)

Quy trình phát triển trong dự án được tổ chức chặt chẽ theo từng giai đoạn chuẩn mực. Con người điều khiển các phiên AI thông qua **lời nhắc (prompt)**, AI diễn giải mệnh lệnh theo [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md), kiểm tra ràng buộc nhánh và task trước khi thực hiện. **AI tuyệt đối không được nhảy cóc từ khi nhận task sang viết mã nguồn.**

---

## 1. Chu Trình Điều Khiển Bằng Lời Nhắc (Prompt-Driven Control Flow)

Mọi tương tác giữa Con người và AI diễn ra theo luồng khép kín chuẩn hóa:

```
HUMAN PROMPT (Lời nhắc của Con người)
  ↓
COMMAND INTERPRETATION (Diễn giải lệnh theo .ai/CONTROL.md)
  ↓
CONTEXT CHECK (Kiểm tra Branch Rules, Task Scope, Architecture)
  ↓
EXECUTION PHASE (DESIGN / IMPLEMENT / TEST / REVIEW / REPORT)
  ↓
VERIFICATION (Typecheck, Lint, Test, Build)
  ↓
PRE-EXIT INSPECTION (Kiểm tra source, tests, proposals, drift reports)
  ↓
COMMIT IMPLEMENTATION (Commit mã nguồn thuộc task: TASK-XXX: <mô tả>)
  ↓
COMMIT PROPOSALS SEPARATELY (Commit đề xuất riêng rẽ: PROP-XXX: <mô tả>)
  ↓
SESSION & TASK UPDATE (Cập nhật nhật ký SESSION và bảng TASK)
  ↓
GIT PUSH (Đẩy nhánh task lên remote repository)
  ↓
READY_FOR_REVIEW (Bàn giao cho Con người nghiệm thu)
```

> **Lưu ý**: Lập trình viên Con người **không cần chỉnh sửa `CONTROL.md`** trước mỗi hành động. Con người chỉ định ý định trực tiếp qua prompt. `CONTROL.md` đóng vai trò là từ điển và luật phân tích tĩnh.

---

## 2. Vòng Đời Trạng Thái Của Task (State Lifecycle)

```
PLANNED (Được lên kế hoạch bởi Human)
  ↓
READY (Đã đủ điều kiện, sẵn sàng thực hiện)
  ↓
CLAIMED (Được một phiên AI nhận làm)
  ↓
DESIGNING (AI đang hoàn thiện Phần 1: Thiết Kế)
  ↓
IMPLEMENTING (AI đang viết mã nguồn trên nhánh task)
  ↓
TESTING (AI đang chạy bộ kiểm thử toàn diện)
  ↓
READY_FOR_REVIEW (AI hoàn tất, chờ con người đánh giá)
  ↓
REVIEWED (Human đã xem xét: Duyệt hoặc Yêu cầu sửa)
  ↓
INTEGRATED (Human merge nhánh task vào develop)
  ↓
DONE (Hoàn tất chính thức, lưu trữ vào completed/)
```

*Các trạng thái ngoại lệ:*
- `BLOCKED`: Bị nghẽn do phụ thuộc chưa xong hoặc có đề xuất chặn (`BLOCKS_CURRENT_TASK: YES`) chờ phán quyết kiến trúc.
- `PAUSED`: Tạm dừng khi Human điều chuyển AI sang task khẩn cấp khác.
- `REJECTED`: Task bị hủy bỏ hoặc thay thế.

> **Quy Tắc Chốt Hạ**: Chỉ có **Lập Trình Viên Con Người** mới có quyền chuyển task sang trạng thái `DONE` sau khi đã merge vào `develop`. AI chỉ được phép đánh dấu tối đa là `READY_FOR_REVIEW`.

---

## 3. Quy Trình "Thiết Kế Trước Khi Viết Code" (Design Before Code)

Mọi task phát triển trên nhánh `task/TASK-XXX-*` phải trải qua đầy đủ chuỗi 8 bước logic trước khi bắt đầu sửa file mã nguồn:

```
TASK ASSIGNMENT (Giao task qua Human prompt)
  ↓
1. ANALYSIS (Khảo sát kiến trúc, scope, ranh giới file)
  ↓
2. DESIGN (Thiết kế giải pháp, phân tách lớp)
  ↓
3. API CONTRACT (Định nghĩa giao diện, types dự kiến)
  ↓
4. DATA FLOW (Mô tả luồng dữ liệu & sự kiện phát ra)
  ↓
5. TEST PLAN (Xác định ca kiểm thử, test biên)
  ↓
6. CONFLICT CHECK (Kiểm tra xung đột với task khác & Halt Rule)
  ↓
7. IMPLEMENTATION (Viết mã nguồn strictly trong ALLOWED FILES)
  ↓
8. VERIFICATION (Typecheck, Lint, Test, Build)
```

---

## 4. Xử Lý Đề Xuất Phát Hiện Trong Khi Triển Khai (Proposals During Implementation)

Trong quá trình triển khai (`IMPLEMENT`), nếu AI phát hiện nhu cầu hoặc cơ hội cải tiến kiến trúc/API:

```
                    AI PHÁT HIỆN VẤN ĐỀ
                             │
                             ▼
              Xác định tính chất của Đề xuất
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   CASE A: NON-BLOCKING              CASE B: BLOCKING
   (Không chặn Task)                 (Chặn trực tiếp Task)
            │                                 │
            ▼                                 ▼
   Tạo PROP-XXX.md                   Tạo PROP-XXX.md
   (BLOCKS_CURRENT_TASK: NO)         (BLOCKS_CURRENT_TASK: YES)
            │                                 │
            ▼                                 ▼
   Tiếp tục hoàn tất Task            Đánh dấu Task là BLOCKED
            │                                 │
            ▼                                 ▼
   Chạy Verification                 DỪNG NGAY phần việc bị ảnh hưởng
            │                                 │
            ▼                                 ▼
   Commit Implementation:            Commit WIP & Đề xuất riêng biệt
   "TASK-XXX: <mô tả>"                        │
            │                                 ▼
            ▼                        Push lên remote branch
   Commit Proposal riêng biệt:                │
   "PROP-XXX: <mô tả>"                        ▼
            │                        Bàn giao cho Con người xem xét
            ▼                                 │
   Update Task & Session                      ▼
            │                        HUMAN DECISION
            ▼                        (APPROVE / REJECT / DEFER)
   Push nhánh task
            │
            ▼
   READY_FOR_REVIEW
```

> **Nguyên Tắc Bất Di Bất Dịch**:
> - $\mathbf{PROPOSAL} \neq \mathbf{TASK} \neq \mathbf{IMPLEMENTATION} \neq \mathbf{HUMAN\ APPROVAL}$.
> - Đề xuất được duyệt (`APPROVED`) **KHÔNG** tự động cho phép AI code ngay nếu chưa có task chính thức.
> - Tuyệt đối không tự chế workaround để tránh việc dừng task khi gặp tình huống blocking.

---

## 5. Quy Trình Bàn Giao Khi Chuyển Đổi Task Dở Dang (Task Preemption)

Nếu con người yêu cầu AI chuyển sang làm task khác trước khi task hiện tại hoàn tất:
1. Dừng viết mã tại điểm biên an toàn, không để code gãy cú pháp.
2. Chạy xác minh kiểm thử thích hợp để ghi nhận trạng thái hiện tại.
3. Tạo commit cho toàn bộ thay đổi dở dang (`TASK-XXX: WIP pause at <position>`).
4. Nếu có proposal được tạo ra, commit riêng: `PROP-XXX: <mô tả>`.
5. Đẩy (push) nhánh task hiện tại lên Git repository.
6. Cập nhật file `TASK-XXX.md` và `TASK_PROCESSING.md` sang trạng thái `PAUSED` hoặc `IN_PROGRESS`.
7. Soạn nhật ký bàn giao chi tiết tại `.ai/sessions/SESSION-XXX.md`:
   - Ghi rõ điểm đã dừng lại.
   - Ghi rõ các vấn đề còn tồn đọng.
   - Ghi nhận `PROPOSALS_CREATED` và `PROPOSALS_REFERENCED`.
   - Hướng dẫn cụ thể hành động tiếp theo cho phiên AI sau.
8. **Tuyệt đối không để lại bất kỳ file nào chưa commit trong working tree.**
