# Mục Lục Tổng Thể Sổ Tay Vận Hành Human (.human/INDEX.md)

Tài liệu này là chỉ mục điều hướng toàn diện cho toàn bộ tài liệu hiện hành trong thư mục `.human/`. Mỗi tài liệu được phân loại theo chủ đề, trình tự sử dụng, mục đích và những câu hỏi thực tế giúp Human trả lời.

---

## 1. Bản Đồ Điều Hướng Theo Lộ Trình Sử Dụng

```
BẮT ĐẦU TỪ ĐÂU?
 │
 ├── 1. TỔNG QUAN HỆ THỐNG
 │    └── getting-started/01-system-overview.md
 │
 ├── 2. BẠN ĐANG Ở HOÀN CẢNH NÀO?
 │    ├── Dự án mới / Chưa có tài liệu: getting-started/02-starting-from-empty-project.md
 │    └── Tiếp quản dự án đã có sẵn:    getting-started/03-joining-existing-project.md
 │
 ├── 3. QUY TRÌNH THAO TÁC THEO VÒNG ĐỜI
 │    ├── Vòng đời dự án tổng thể:      workflows/01-project-lifecycle.md
 │    ├── Làm rõ yêu cầu & lập Sprint:  workflows/02-requirements-and-sprint-planning.md
 │    ├── Thực thi task & nghiệm thu:   workflows/03-task-execution-and-review.md
 │    └── Tổng kết Sprint & chu kỳ mới: workflows/04-sprint-review-and-next-sprint.md
 │
 ├── 4. TRA CỨU VẬN HÀNH & KỸ THUẬT
 │    ├── Tra cứu lệnh & prompts:       operations/commands-reference.md
 │    ├── Phân bổ model & delegation:   operations/model-routing-and-assignment.md
 │    ├── Quản trị nhánh Git & commit:  operations/branches-and-git.md
 │    └── Quản lý tài liệu & đề xuất:   operations/project-and-document-management.md
 │
 ├── 5. KIỂM CHỨNG & BÁO CÁO CỦA AI
 │    ├── Checklist kiểm tra task report: reports/task-report-review.md
 │    ├── Checklist nghiệm thu Sprint:    reports/sprint-report-review.md
 │    └── Dấu hiệu cảnh báo nguy hiểm:    reports/warnings-and-red-flags.md
 │
 └── 6. XỬ LÝ SỰ CỐ
      └── troubleshooting/common-problems.md
```

---

## 2. Danh Mục Tài Liệu Chi Tiết

### Nhóm 1: Khởi Động & Tiếp Cận (Getting Started)

| Đường dẫn | Mục đích | Khi nào cần đọc? | Những câu hỏi tài liệu giúp bạn trả lời |
| :--- | :--- | :--- | :--- |
| [01-system-overview.md](getting-started/01-system-overview.md) | Bức tranh tổng quan về triết lý Human-in-the-Loop, ranh giới 4 thư mục và ma trận 3 nhánh Git | Khi bắt đầu làm quen với hệ thống hoặc cần hiểu nguyên lý phối hợp giữa Người và AI | - AI có những quyền hạn gì và bị cấm những gì?<br>- Ranh giới giữa `.human/`, `.ai/`, `.document/` là gì?<br>- Danh tính của AI được xác định như thế nào? |
| [02-starting-from-empty-project.md](getting-started/02-starting-from-empty-project.md) | Hướng dẫn 13 bước từ ý tưởng mơ hồ đến việc hoàn thành Sprint đầu tiên trên repository trống | Khi repository chưa có tài liệu dự án, chưa có kế hoạch Sprint hoặc chưa có mã nguồn | - Tôi bắt đầu từ đâu khi chưa có tài liệu?<br>- Tôi cần nói gì để AI hiểu đúng ý tưởng sản phẩm?<br>- Nhận biết 5 cấp độ thông tin như thế nào?<br>- Khi nào tôi phê duyệt kế hoạch Sprint? |
| [03-joining-existing-project.md](getting-started/03-joining-existing-project.md) | Hướng dẫn 8 điểm khảo sát tiếp quản dự án đã có sẵn mã nguồn và lịch sử phát triển | Khi bạn quay lại dự án sau một thời gian, đổi máy tính hoặc tiếp quản mã nguồn từ người khác | - Kiểm tra nhánh Git và working tree thế nào?<br>- Làm sao biết Sprint và Task nào đang chạy?<br>- Bàn giao bối cảnh giữa các phiên AI ra sao?<br>- Làm gì khi báo cáo phiên trước thiếu căn cứ? |

---

### Nhóm 2: Quy Trình Vận Hành (Workflows)

| Đường dẫn | Mục đích | Khi nào cần đọc? | Những câu hỏi tài liệu giúp bạn trả lời |
| :--- | :--- | :--- | :--- |
| [01-project-lifecycle.md](workflows/01-project-lifecycle.md) | Mô tả 4 giai đoạn tiến hóa của toàn bộ dự án từ khởi tạo đến chu trình Sprint và phát hành | Khi cần cái nhìn chiến lược về toàn bộ vòng đời phát triển của phần mềm | - Dự án phát triển qua các mốc lớn nào?<br>- Ranh giới quyền hạn giữa Con người và AI ở từng giai đoạn ra sao? |
| [02-requirements-and-sprint-planning.md](workflows/02-requirements-and-sprint-planning.md) | Quy trình làm rõ yêu cầu, đánh giá mục tiêu, lập kế hoạch Sprint và lộ trình Multi-Sprint | Khi bắt đầu một chu kỳ Sprint mới hoặc khi muốn bổ sung tính năng mới | - Cách bắt đầu một vòng lập kế hoạch?<br>- Làm sao lập kế hoạch nhiều Sprint mà không bị code sớm?<br>- Xử lý thay đổi yêu cầu giữa chừng thế nào? |
| [03-task-execution-and-review.md](workflows/03-task-execution-and-review.md) | Quy trình 10 bước thực thi một nhiệm vụ: phân nhánh, thiết kế trước khi code, tách commit và review | Khi giao task cho AI, theo dõi tiến độ hoặc khi cần tạm dừng đổi việc gấp | - Điều kiện để giao một task là gì?<br>- Chuỗi 8 bước thực thi của AI diễn ra ra sao?<br>- Xử lý đề xuất kiến trúc (Proposal) như thế nào?<br>- Đổi task khẩn cấp mà không mất code bằng cách nào? |
| [04-sprint-review-and-next-sprint.md](workflows/04-sprint-review-and-next-sprint.md) | Quy trình tổng kết, kiểm thử hồi quy trên `develop`, nghiệm thu 100% AC và kích hoạt Sprint kế tiếp | Khi toàn bộ task của Sprint đã hoàn tất và chuẩn bị đóng Sprint | - Điều kiện để đóng một Sprint là gì?<br>- Kiểm thử hồi quy trên develop thực hiện thế nào?<br>- Di chuyển lưu trữ file Sprint ra sao? |

---

### Nhóm 3: Thao Tác & Quản Trị Kỹ Thuật (Operations)

| Đường dẫn | Mục đích | Khi nào cần đọc? | Những câu hỏi tài liệu giúp bạn trả lời |
| :--- | :--- | :--- | :--- |
| [commands-reference.md](operations/commands-reference.md) | Sổ tay tra cứu chi tiết toàn bộ lệnh NPM scripts, lệnh Git và từ điển câu lệnh chỉ đạo AI (prompts) | Khi cần chạy lệnh kiểm tra, quản trị nhánh Git hoặc khi cần mẫu câu nhắc chuẩn | - Cú pháp và tác động của từng lệnh npm là gì?<br>- Các lệnh Git nào dành riêng cho Human?<br>- Tôi ra lệnh cho AI bằng những từ khóa nào? |
| [model-routing-and-assignment.md](operations/model-routing-and-assignment.md) | Hướng dẫn chọn mô hình LLM theo công việc và quy chế vận hành cơ chế ủy quyền phụ Delegation | Khi lựa chọn mô hình AI trong IDE hoặc khi cân nhắc dùng AI phụ | - Hiện trạng cấu hình model trong repo thế nào?<br>- Tác vụ nào nên dùng model mạnh, tác vụ nào dùng model nhanh?<br>- Khi nào được và cấm dùng Delegation? |
| [branches-and-git.md](operations/branches-and-git.md) | Quy chuẩn đặt tên commit, quy tắc tách biệt commit đề xuất và cẩm nang merge an toàn cho Human | Khi chuẩn bị commit, push hoặc merge nhánh task vào `develop` | - Quy chuẩn đặt tên commit `TASK-XXX`, `PROP-XXX` ra sao?<br>- Tại sao phải tách riêng commit đề xuất?<br>- Cách giải quyết conflict nhánh như thế nào? |
| [project-and-document-management.md](operations/project-and-document-management.md) | Quản lý tài liệu sống (`current/`), đề xuất (`proposals/`) và sử dụng các thư mục bộ nhớ Human | Khi cần cập nhật kiến trúc, phê duyệt đề xuất hoặc ghi chú ý tưởng tương lai | - Nguồn sự thật của dự án nằm ở đâu?<br>- Phê duyệt đề xuất PROP-XXX như thế nào?<br>- Sử dụng `backlog/`, `decisions/`, `notes/` ra sao? |

---

### Nhóm 4: Báo Cáo & Kiểm Chứng Độc Lập (Reports)

| Đường dẫn | Mục đích | Khi nào cần đọc? | Những câu hỏi tài liệu giúp bạn trả lời |
| :--- | :--- | :--- | :--- |
| [task-report-review.md](reports/task-report-review.md) | Checklist 5 nhóm tiêu chí kiểm tra báo cáo task (Phạm vi, Mã nguồn, Tests, Git, Trạng thái) | Mỗi khi AI thông báo hoàn thành task và chuyển trạng thái sang `READY_FOR_REVIEW` | - Tôi cần kiểm tra những gì trước khi merge code?<br>- Làm sao biết AI có sửa lén file ngoài scope không?<br>- Xác minh kết quả test độc lập như thế nào? |
| [sprint-report-review.md](reports/sprint-report-review.md) | Checklist 7 nhóm tiêu chí nghiệm thu biên bản Sprint Review và xác nhận điều kiện đóng Sprint | Khi AI nộp biên bản tổng kết Sprint trên nhánh `develop` | - Sprint Goal có thực sự đạt được không?<br>- Đối chiếu 100% Acceptance Criteria ra sao?<br>- Phân biệt kết quả thực tế với tự báo cáo thế nào? |
| [warnings-and-red-flags.md](reports/warnings-and-red-flags.md) | Sổ tay 12 dấu hiệu cảnh báo nguy hiểm (Red Flags), ảo giác và vi phạm giao thức của AI | Khi thấy AI có dấu hiệu bất thường, báo cáo thiếu căn cứ hoặc tự ý vượt quyền | - Những hành vi nào của AI là nguy hiểm?<br>- Cần gửi lại câu lệnh gì để chấn chỉnh AI?<br>- Khi nào phải lập tức dừng khẩn cấp? |

---

### Nhóm 5: Khắc Phục Sự Cố (Troubleshooting)

| Đường dẫn | Mục đích | Khi nào cần đọc? | Những câu hỏi tài liệu giúp bạn trả lời |
| :--- | :--- | :--- | :--- |
| [common-problems.md](troubleshooting/common-problems.md) | Hướng dẫn xử lý 8 sự cố thực tế thường gặp (Halt vi phạm nhánh, Vitest treo, Typecheck lỗi, Git conflict...) | Khi gặp lỗi kỹ thuật, lệnh bị dừng hoặc quy trình bị nghẽn | - Xử lý thế nào khi AI báo HALT?<br>- Khắc phục test Vitest bị treo ra sao?<br>- Cách gỡ block khi có đề xuất chặn kiến trúc?<br>- Khôi phục mã nguồn khi AI sửa hỏng thế nào? |

---

## 3. Không Gian Lưu Trữ & Bộ Nhớ Riêng Của Human

Bên cạnh tài liệu hướng dẫn, thư mục `.human/` duy trì 5 không gian bộ nhớ độc lập dành riêng cho lập trình viên:

- [`.human/backlog/`](backlog/README.md): Lưu trữ ý tưởng, mong muốn tính năng tương lai mà bạn chưa muốn thực hiện ngay (AI bị cấm tự ý lấy để code).
- [`.human/decisions/`](decisions/README.md): Lưu vết các thỏa thuận nội bộ và phân chia ca làm việc giữa các lập trình viên con người.
- [`.human/notes/`](notes/README.md): Ghi chú kỹ thuật dùng chung, mẹo vận hành và tài liệu tham khảo bên ngoài.
- [`.human/history/`](history/README.md): Nhật ký mốc lịch sử dự án và biên bản họp đánh giá do chính con người ghi lại.
- [`.human/local/`](local/README.md): Thư mục máy cá nhân (nằm trong `.gitignore`), dùng cho các cấu hình riêng tư hoặc script thử nghiệm cục bộ không bao giờ đẩy lên Git.

