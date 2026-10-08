# Quy Tắc Phân Định Nhánh Git (Git Branch Roles & Permissions)

Dự án thiết lập ranh giới quyền hạn nghiêm ngặt theo 3 vai trò nhánh logic. Vai trò của một phiên AI được quyết định trực tiếp bởi nhánh Git hiện tại và là rào chắn bất biến không thể bị vượt qua bởi bất kỳ lời nhắc (prompt) nào.

```
                  ┌──────────────────────────────────────────────┐
                  │                    MAIN                      │
                  │   Planning / Architecture / Protocol / Docs   │
                  │             (TUYỆT ĐỐI CẤM SỬA /src/)        │
                  │                [Tuần tự: 1 AI duy nhất]       │
                  └──────────────────────┬───────────────────────┘
                                         │ Human duyệt & tích hợp
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │                   DEVELOP                    │
                  │      Integration / Verification / Sprint     │
                  │             (TUYỆT ĐỐI CẤM SỬA /src/)        │
                  │                [Tuần tự: 1 AI duy nhất]       │
                  └──────────────────────┬───────────────────────┘
                                         │ Nhánh khởi nguồn task
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │             task/TASK-XXX-<slug>             │
                  │           Implementation & Testing           │
                  │      (DUY NHẤT ĐƯỢC PHÉP CHỈNH SỬA /src/)    │
                  │          [Đa tác nhân: Chạy đồng thời]       │
                  └──────────────────────────────────────────────┘
```

---

## 1. Nhánh `main` (System Architecture & Master Planning)
Nhánh `main` là nhánh quy hoạch cấp cao nhất về kiến trúc hệ thống, giao thức AI và tài liệu vận hành. **`main` KHÔNG PHẢI LÀ NHÁNH LẬP TRÌNH.**

### Được Phép (ALLOWED):
- Khảo sát toàn bộ repository, lịch sử Git, hiện trạng mã nguồn để đánh giá tính đúng đắn về mặt kiến trúc.
- Đọc và chỉnh sửa toàn bộ các tệp tài liệu trong `.ai/` và `.human/`.
- Định nghĩa và tinh chỉnh luật phát triển (`AI_RULES.md`, `BRANCH_RULES.md`, `GIT_RULES.md`,...).
- Định nghĩa kiến trúc tổng thể, mô hình thực thể miền (`DOMAIN_MODEL.md`), giao diện và hợp đồng API (`API_CONTRACTS.md`).
- Xây dựng kế hoạch phát triển (development plans), kế hoạch sprint (sprint plans), cấu trúc danh mục task.
- Rà soát tính nhất quán tài liệu, phát hiện mâu thuẫn nội tại và phân tích kiến trúc dự án.
- Soạn thảo quy cách kỹ thuật cho các task tương lai, cập nhật nhật ký quyết định kiến trúc (`DECISIONS.md`).
- Tạo commit cho các thay đổi về giao thức/tài liệu phù hợp với vai trò của nhánh `main`.

### Tuyệt Đối Cấm (FORBIDDEN):
- **CẤM chỉnh sửa bất kỳ tệp tin nào bên trong thư mục `/src/`**.
- CẤM lập trình tính năng game, triển khai sản phẩm hoặc sửa code của task.
- CẤM chạy các lệnh lập trình nhằm mục đích phát triển mã nguồn trong `/src/`.

> **Ý nghĩa của MAIN**: *"Design / Decide / Organize / Review"* — Không phải *"Implement code"*.

---

## 2. Nhánh `develop` (Integration Verification & Sprint Review)
Nhánh `develop` là nhánh tích hợp và đánh giá sau sprint. **`develop` KHÔNG PHẢI LÀ NHÁNH LẬP TRÌNH.**

### Được Phép (ALLOWED):
- Khảo sát mã nguồn đã tích hợp, kiểm tra lịch sử Git.
- Chạy toàn bộ bộ công cụ xác minh: `typecheck`, `lint`, `test`, `build`.
- Kiểm tra tính tương thích giữa các tính năng đã tích hợp, phát hiện lỗi thoái lui (regression).
- Viết báo cáo đánh giá, ghi chú tổng kết sprint, đề xuất khuyến nghị cho sprint tiếp theo.
- Xác định nợ kỹ thuật (technical debt), xung đột giữa các tính năng.
- Tạo đề xuất thay đổi (`.ai/changes/proposals/PROP-XXX.md`) khi phát hiện vấn đề cần cải tổ.
- Tạo commit CHỈ CHO các tệp kiểm thử tích hợp, báo cáo đánh giá, trạng thái task hoặc tài liệu đánh giá phù hợp với vai trò của nhánh `develop`.

### Tuyệt Đối Cấm (FORBIDDEN):
- **CẤM lập trình tính năng sản phẩm mới hoặc sửa trực tiếp mã nguồn trong `/src/`**.
- CẤM tiếp tục phát triển dở dang các tính năng chưa hoàn tất.
- CẤM tự ý âm thầm sửa lỗi mã nguồn trong `/src/`.
- CẤM tự động merge các nhánh task vào `develop`.
- CẤM tự ý thay đổi kiến trúc hệ thống.

> **Xử lý khi phát hiện lỗi trong `/src/` tại `develop`**:
> Tuyệt đối KHÔNG sửa code trực tiếp. AI phải tuân thủ:
> $$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{REPORT} \longrightarrow \mathbf{PROPOSAL} \longrightarrow \mathbf{STOP}$$
> Developer con người sẽ xem xét và quyết định tạo task mới để khắc phục.

---

## 3. Nhánh `task/TASK-XXX-<slug>` (Feature Implementation & Unit Testing)
Nhánh task là **NHÁNH DUY NHẤT** mà AI được phép viết mã nguồn tính năng sản phẩm trong `/src/`.

### Được Phép (ALLOWED):
- Chỉnh sửa và tạo mới các tệp mã nguồn nằm chính xác trong phạm vi (`ALLOWED FILES`) của task được giao.
- Triển khai tính năng theo đúng thiết kế đã duyệt trong `TASK-XXX.md`.
- Viết unit test và test tính năng tương ứng.
- Chạy các công cụ kiểm tra chất lượng: `typecheck`, `lint`, `test`, `build`.
- Tạo ghi chú task, nhật ký phiên (`SESSION-XXX.md`), nhật ký triển khai.
- Tạo đề xuất thay đổi (`PROP-XXX.md`) hoặc báo cáo sai lệch (`DRIFT-XXX.md`) khi cần thiết.
- Tạo commit cho công việc của task (`TASK-XXX: description`) và đẩy (push) nhánh task lên repository.
- Tạo nhánh task mới khi quy trình yêu cầu mà **không cần chuyển sang nhánh main/develop**.

### Tuyệt Đối Cấm (FORBIDDEN):
- **CẤM chuyển nhánh sang `main` hoặc `develop`**.
- **CẤM merge nhánh task vào `develop` hoặc `main`**.
- CẤM force push (`git push -f`) hoặc sửa lịch sử Git.
- CẤM âm thầm sửa đổi kiến trúc ngoài phạm vi task.
- CẤM nhận cùng lúc nhiều task hoặc làm nhiều task trên một phiên.

---

## 4. Nguyên Tắc An Toàn Tuyệt Đối (Absolute Branch Safety Rule)
Trước BẤT KỲ hành động can thiệp mã nguồn, chạy lệnh hoặc tạo commit nào, AI **BẮT BUỘC** phải đối chiếu 5 yếu tố:
1. Nhánh Git hiện tại (`git branch --show-current`)
2. Lệnh và ràng buộc được diễn giải từ prompt theo đặc tả ([`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md))
3. Trạng thái task trong bảng điều phối ([`.ai/tasks/TASK_PROCESSING.md`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/TASK_PROCESSING.md))
4. File chi tiết của task (`.ai/tasks/active/TASK-XXX.md`)
5. Phiên làm việc hiện tại (`SESSION ID`)

### Ma Trận Xung Đột & Lệnh Dừng Bắt Buộc (Halt Matrix):
| Lệnh Diễn Giải Từ Prompt | Nhánh Git Thực Tế | Trạng Thái Task | Hành Động Bắt Buộc Của AI |
| :--- | :--- | :--- | :--- |
| `IMPLEMENT` | `develop` | Bất kỳ | **DỪNG NGAY (HALT)** - develop cấm sửa `/src/` |
| `IMPLEMENT` | `main` | Bất kỳ | **DỪNG NGAY (HALT)** - main cấm sửa `/src/` |
| `IMPLEMENT` | `task/TASK-001-*` | Khác `TASK-001` | **DỪNG NGAY (HALT)** - Nhánh không khớp Task |
| `IMPLEMENT` | `task/TASK-001-*` | Chưa hoàn tất Phần 1 Thiết Kế | **DỪNG NGAY (HALT)** - Phải thiết kế trước khi code |
| Bất kỳ | Bất kỳ | Phát hiện sai lệch / Ngoài phạm vi | **DỪNG NGAY (HALT)** - Báo cáo con người, cấm tự đoán |

> **AI TUYỆT ĐỐI KHÔNG ĐƯỢC:**
> - Tự động chuyển nhánh Git để lách luật hoặc giải quyết xung đột.
> - Coi lời nhắc của con người là căn cứ để vi phạm ranh giới nhánh.
> - Tự ý suy diễn ý định của lập trình viên con người khi có bất đồng ranh giới.

---

## 5. Tính Độc Quyền Của `main` và `develop` (Sequential Control)
- **Trên `main`**: Tại một thời điểm, **chỉ duy nhất 1 AI** được phép hoạt động.
- **Trên `develop`**: Tại một thời điểm, **chỉ duy nhất 1 AI** được phép hoạt động.
- **Trên các nhánh `task/*`**: Cho phép **nhiều AI hoạt động đồng thời** trên các nhánh task tách biệt (ví dụ: AI 1 trên `task/TASK-001`, AI 2 trên `task/TASK-002`, AI 3 trên `task/TASK-003`).
- Quy định này ngăn chặn hoàn toàn việc ghi đè tài liệu quy hoạch, ghi đè báo cáo sprint và xung đột quyền điều phối của con người.

---

## 6. Quy Tắc "1 AI = 1 Task" (One AI = One Task)
- Một phiên AI chỉ được phép sở hữu **duy nhất 1 active task**.
- Khi con người yêu cầu chuyển sang task khác trong khi task hiện tại chưa xong:
  1. Dừng code ở điểm ổn định an toàn.
  2. Chạy xác minh kiểm thử thích hợp.
  3. Tạo commit lưu vết đầy đủ (`TASK-XXX: WIP pause...`).
  4. Đẩy (push) nhánh task hiện tại lên Git.
  5. Cập nhật trạng thái task (`STATUS: PAUSED` hoặc `IN_PROGRESS`).
  6. Ghi nhật ký bàn giao (`SESSION-XXX.md`) ghi rõ công việc dở dang và bước tiếp theo.
  7. Tuyệt đối không để lại code chưa commit trước khi chuyển task.
