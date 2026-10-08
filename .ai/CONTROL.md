# AI Command & Control Surface

```yaml
MODE: MASTER # MASTER (Khởi tạo hệ thống) | MAIN (Quy hoạch kiến trúc) | DEVELOP (Tích hợp & Đánh giá) | TASK (Triển khai tính năng)
CURRENT_TASK: NONE # NONE hoặc mã TASK-XXX cụ thể
COMMAND: INITIALIZE # INITIALIZE | PLAN | VERIFY | DESIGN | IMPLEMENT | TEST | REVIEW | HALT
ALLOW_CODE: YES # Quyền sửa code: Chỉ YES trong TASK mode (cho file thuộc task scope) hoặc MASTER mode (cho file khởi tạo cấu hình). LUÔN LÀ NO trên main/develop đối với /src/
ALLOW_TEST: YES # Quyền chạy kiểm thử
ALLOW_COMMIT: YES # Quyền tạo commit Git
ALLOW_MERGE: NO # Quyền merge nhánh (CHỈ HUMAN CÓ QUYỀN MERGE)
ALLOW_ARCHITECTURE_CHANGE: YES # Quyền thay đổi kiến trúc/giao thức: Chỉ YES trong MASTER/MAIN mode
ALLOW_DEPENDENCY_INSTALL: YES # Quyền cài thư viện: Chỉ YES trong MASTER mode hoặc khi Human duyệt
```

---

## 1. Ma Trận Quyền Hạn Theo Chế Độ & Nhánh Git (Branch-Mode Matrix)

| Chế Độ (`MODE`) | Nhánh Git Hợp Lệ | Quyền Sửa `/src/` | Quyền Sửa `.ai/` & `.human/` | Vai Trò Chính | Số Lượng AI Đồng Thời |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MASTER** | `main` / `develop` | Chỉ setup ban đầu | Có (Toàn bộ) | Thiết lập nền tảng dự án | Tuần tự (1 AI) |
| **MAIN** | `main` | **TUYỆT ĐỐI CẤM** | Có (Toàn bộ) | Thiết kế, quy hoạch, tài liệu | Tuần tự (1 AI) |
| **DEVELOP** | `develop` | **TUYỆT ĐỐI CẤM** | Chỉ cập nhật task/báo cáo | Tích hợp, chạy test, đánh giá | Tuần tự (1 AI) |
| **TASK** | `task/TASK-XXX-*` | **CÓ (trong scope)** | Chỉ sửa file task/session | Lập trình tính năng & unit test | **Song song (Nhiều AI)** |

---

## 2. Quy Tắc Khóa Dừng Bắt Buộc (Deterministic HALT RULE)
Trước khi thực hiện bất kỳ lệnh can thiệp mã nguồn nào (`COMMAND: IMPLEMENT`), AI **BẮT BUỘC** phải xác minh đủ 6 điều kiện sau:
1. `CONTROL.MODE` phải là `TASK`.
2. `CONTROL.CURRENT_TASK` phải xác định chính xác mã `TASK-XXX` (không phải `NONE`).
3. Nhánh Git hiện tại (`git branch --show-current`) phải khớp tuyệt đối `task/TASK-XXX-*`.
4. File `.ai/tasks/active/TASK-XXX.md` tồn tại và có `STATUS: IMPLEMENTING` (sau khi đã hoàn tất pha thiết kế).
5. Task được gán đúng phiên làm việc (`CURRENT_SESSION`) và nhánh hiện tại.
6. Không có dependency nào bị chặn (`DEPENDENCIES` tiên quyết đều đã hoàn thành).

> ### NẾU BẤT KỲ ĐIỀU KIỆN NÀO TRÊN ĐÂY KHÔNG THỎA MÃN:
> **AI PHẢI DỪNG LẠI NGAY LẬP TỨC (HALT & STOP).**
>
> **AI TUYỆT ĐỐI KHÔNG ĐƯỢC:**
> - Tự động đổi nhánh Git (`git checkout` / `git switch`) để lách luật.
> - Tự động sửa nội dung `CONTROL.md` để tự cấp quyền cho mình.
> - Tự ý sửa code trong `/src/` khi đang ở nhánh `main` hoặc `develop`.
> - Tự ý suy đoán ý định của con người.

---

## 3. Bản Thể AI Vận Hành (Operational Identity)
AI không có danh tính cố định vĩnh viễn (`AGENT_A`/`AGENT_B`). Bản thể tác nghiệp của một AI được xác định bởi:
$$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
Mọi phiên AI đều bình đẳng, tuân thủ cùng một giao thức và có thể bàn giao công việc thông qua repository.
