# Sổ Tay Vận Hành Dành Riêng Cho Lập Trình Viên Con Người (.human)

Chào mừng bạn đến với không gian quản trị hệ thống phát triển **Website Trò Chơi Thuật Toán (Algorithm Game Website)**.

Thư mục `.human/` là **Sổ Tay Vận Hành (Human Operating Manual)** và **Không Gian Bộ Nhớ (Human Memory Workspace)**. Toàn bộ tài liệu tại đây được biên soạn dành riêng cho Lập trình viên Con người nhằm giúp bạn chỉ đạo, kiểm soát, nghiệm thu và giám sát các tác tử AI một cách an toàn, minh bạch và có kỷ luật.

> [!NOTE]
> **LƯU Ý VẬN HÀNH DÀNH CHO BẠN**: Thư mục `.human/` là không gian độc lập phục vụ riêng cho việc tra cứu và quản lý của Human. Bạn không cần sao chép hoặc nạp các tài liệu này vào ngữ cảnh chat của AI. Hãy chỉ đạo AI trực tiếp bằng lời nhắc (prompts); AI sẽ tự động đối chiếu các quy tắc vận hành tại `.ai/` và tri thức dự án tại `.document/`. Điều này giúp tiết kiệm tối đa dung lượng ngữ cảnh (context window) cho mã nguồn sản phẩm.

---

## 1. Bạn Nên Đọc File Nào Đầu Tiên?

- **Để hiểu nguyên lý hoạt động & ranh giới quyền lực giữa Người và AI**:
  👉 Đọc ngay: [getting-started/01-system-overview.md](getting-started/01-system-overview.md)
- **Để tra cứu mục lục tổng thể của toàn bộ tài liệu**:
  👉 Xem bảng chỉ mục: [INDEX.md](INDEX.md)

---

## 2. Lộ Trình Dành Cho Bạn Tùy Theo Hoàn Cảnh Thực Tế

### Lộ Trình A: Bắt Đầu Dự Án Mới Hoặc Chưa Có Tài Liệu
Nếu bạn bắt đầu từ một repository khung trống hoặc muốn khởi động một dự án mới từ con số 0:
1. Đọc hướng dẫn 13 bước từ ý tưởng đến Sprint 1: [getting-started/02-starting-from-empty-project.md](getting-started/02-starting-from-empty-project.md).
2. Nắm quy trình làm rõ yêu cầu và lập kế hoạch Sprint: [workflows/02-requirements-and-sprint-planning.md](workflows/02-requirements-and-sprint-planning.md).
3. Giao task đầu tiên và giám sát AI thiết kế trước khi code: [workflows/03-task-execution-and-review.md](workflows/03-task-execution-and-review.md).

### Lộ Trình B: Tiếp Quản Dự Án Đang Hoạt Động
Nếu bạn quay lại một dự án đã có sẵn mã nguồn, có nhiều commit hoặc đã đi qua nhiều Sprint:
1. Thực hiện 8 điểm kiểm tra hiện trạng và khôi phục bối cảnh: [getting-started/03-joining-existing-project.md](getting-started/03-joining-existing-project.md).
2. Xem cách rà soát nhánh Git, commit và đề xuất dở dang: [operations/branches-and-git.md](operations/branches-and-git.md).
3. Đọc quy trình tiếp tục phiên làm việc bằng Session Handoff: [troubleshooting/common-problems.md#sự-cố-8-mất-bối-cảnh-khi-mở-cửa-sổ-chat-mới-hoặc-đổi-máy](troubleshooting/common-problems.md).

---

## 3. Tra Cứu Nhanh Theo Nhu Cầu Tác Nghiệp

| Khi bạn cần làm gì? | Tài liệu cần mở |
| :--- | :--- |
| **Tìm cú pháp lệnh kiểm thử, dev server, lệnh Git hoặc mẫu prompt cho AI** | 📖 [operations/commands-reference.md](operations/commands-reference.md) |
| **Lựa chọn model AI phù hợp hoặc sử dụng cơ chế ủy quyền phụ Delegation** | 📖 [operations/model-routing-and-assignment.md](operations/model-routing-and-assignment.md) |
| **Kiểm tra và nghiệm thu báo cáo task của AI trước khi merge** | 📖 [reports/task-report-review.md](reports/task-report-review.md) |
| **Đánh giá tổng kết Sprint, nghiệm thu Acceptance Criteria và đóng Sprint** | 📖 [reports/sprint-report-review.md](reports/sprint-report-review.md) |
| **Nhận biết sớm các dấu hiệu ảo giác, báo cáo láo hoặc AI vượt quyền** | 📖 [reports/warnings-and-red-flags.md](reports/warnings-and-red-flags.md) |
| **Gặp sự cố kỹ thuật: AI báo Halt, Vitest bị treo, TypeScript lỗi, Git conflict** | 📖 [troubleshooting/common-problems.md](troubleshooting/common-problems.md) |
| **Quản lý đề xuất kiến trúc (PROP-XXX) và tài liệu sống trong `.document/current/`** | 📖 [operations/project-and-document-management.md](operations/project-and-document-management.md) |

---

## 4. Không Gian Bộ Nhớ Riêng Của Human

Thư mục `.human/` duy trì các không gian ghi chép dành riêng cho bạn:
- [**`backlog/`**](backlog/README.md): Nơi lưu trữ ý tưởng tương lai (AI bị cấm tự ý code các ý tưởng này).
- [**`decisions/`**](decisions/README.md): Ghi chép các thỏa thuận nội bộ giữa các lập trình viên con người.
- [**`notes/`**](notes/README.md): Ghi chú kỹ thuật dùng chung và tài liệu tham khảo bên ngoài.
- [**`history/`**](history/README.md): Nhật ký các mốc tiến độ dự án.
- [**`local/`**](local/README.md): Thư mục cá nhân máy bạn (được `.gitignore` bảo vệ, không bao giờ bị đẩy lên GitHub).

