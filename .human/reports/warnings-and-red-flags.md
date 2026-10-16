# Sổ Tay Dấu Hiệu Cảnh Báo Nguy Hiểm & Báo Cáo Sai Lệch (.human/reports/warnings-and-red-flags.md)

Tài liệu này liệt kê các tình huống cảnh báo đặc biệt (Red Flags), giúp Lập trình viên Con người nhận biết sớm các hành vi sai lệch, ảo giác hoặc vi phạm giao thức của AI, từ đó can thiệp kịp thời bảo vệ kho chứa mã nguồn.

---

## 1. Bảng Tổng Hợp 12 Dấu Hiệu Cảnh Báo Nguy Hiểm (Red Flags)

```
┌────────────────────────────────────────────────────────────────────────┐
│                              12 RED FLAGS                              │
├────────────────────────────────────────────────────────────────────────┤
│ 1. AI tuyên bố test pass nhưng không có log/exit code có thể xác minh  │
│ 2. AI báo đã commit/push nhưng Git thực tế không có thay đổi           │
│ 3. AI tự nhận đã merge nhánh vào develop hoặc main (Vi phạm Rule 12)   │
│ 4. AI tự chuyển trạng thái task thành DONE thay vì READY_FOR_REVIEW   │
│ 5. AI nhầm lẫn giữa kiểm tra tĩnh / đọc tài liệu với kiểm thử runtime  │
│ 6. Tự ý mở rộng phạm vi (Scope Creep) ngoài yêu cầu của Human          │
│ 7. Sửa file ngoài ALLOWED FILES hoặc xóa nhầm tài liệu lịch sử         │
│ 8. Dẫn chiếu tài liệu cũ/archive thay vì tài liệu sống (.document/)   │
│ 9. Tự bịa ra thư viện, script, lệnh shell hoặc model không có thật    │
│ 10. Báo cáo kết quả của phiên trước như thể vừa tự làm trong phiên này │
│ 11. Bằng chứng kiểm thử không ăn nhập với điều đang được khẳng định    │
│ 12. Báo cáo mập mờ, giấu giếm các phần chưa kiểm tra hoặc bị lỗi       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Chi Tiết Từng Dấu Hiệu & Hành Động Can Thiệp Chuẩn Của Human

### Cảnh Báo 1: AI Nói Đã Chạy Test Nhưng Không Có Kết Quả Xác Minh Được
- **Vì sao đáng lo ngại**: AI có thể bị ảo giác (hallucination), tự bịa ra dòng chữ *"All tests passed (10/10)"* trong chat mà thực tế chưa hề thực thi lệnh test nào trong hệ thống.
- **Human kiểm tra gì**: Mở terminal và tự gõ `npm run test:run`. Xem số lượng test thực tế và thời gian thực thi.
- **Prompt gửi lại cho AI**:
  > *"Báo cáo của bạn thiếu bằng chứng kiểm thử thực tế. Hãy chạy lệnh 'npm run test:run' ngay trong môi trường, trích dẫn toàn bộ đầu ra (stdout, exit code) và danh sách file test đã chạy."*
- **Điều kiện tiếp tục**: Phải có output thực tế của Vitest hiển thị rõ ràng số test pass/fail.

### Cảnh Báo 2: AI Báo Đã Commit / Push Nhưng Git Thực Tế Không Phản Ánh
- **Vì sao đáng lo ngại**: AI tưởng rằng việc mô tả commit message trong chat là đã thực hiện commit, hoặc lệnh git gặp lỗi (ví dụ conflict, sai branch) nhưng AI vẫn tưởng là thành công.
- **Human kiểm tra gì**:
  ```bash
  git status
  git log -n 3 --oneline
  ```
- **Prompt gửi lại cho AI**:
  > *"Git working tree vẫn đang có file chưa commit (hoặc log chưa có commit mới). Hãy kiểm tra lại 'git status' và 'git log -n 1', thực hiện commit đúng chuẩn 'TASK-XXX: <mô tả>' và đẩy lên remote."*
- **Điều kiện tiếp tục**: `git status` báo `working tree clean` và commit hash xuất hiện trong `git log`.

### Cảnh Báo 3: AI Tuyên Bố Đã Tích Hợp Hoặc Tự Merge Vào `develop`
- **Vì sao đáng lo ngại**: **Vi phạm nghiêm trọng Rule 12 và Branch Rules**. AI không bao giờ được phép tự merge vào các nhánh chung.
- **Human kiểm tra gì**: Kiểm tra lịch sử git trên `develop` xem có merge commit bất thường nào do AI tự thực hiện không.
- **Prompt gửi lại cho AI**:
  > *"DỪNG NGAY. Bạn vừa vi phạm Rule 12 (Human-Only Merge). AI chỉ được phép đánh dấu tối đa là READY_FOR_REVIEW. Chỉ Con người mới có quyền merge vào develop. Hãy quay lại nhánh task của bạn và báo cáo hiện trạng."*
- **Trường hợp dừng & điều tra**: Nếu AI đã lỡ checkout sang `develop`, bạn phải reset lại nhánh `develop` về trạng thái trước đó.

### Cảnh Báo 4: AI Tự Đổi Trạng Thái Task Thành `DONE`
- **Vì sao đáng lo ngại**: Làm xáo trộn quy trình Scrum, khiến task bị coi là hoàn thành khi chưa được Human nghiệm thu độc lập.
- **Human kiểm tra gì**: Mở `.ai/tasks/active/TASK-XXX.md` và `.ai/tasks/TASK_PROCESSING.md`.
- **Prompt gửi lại cho AI**:
  > *"Sửa lại trạng thái task thành READY_FOR_REVIEW. Bạn không có quyền đánh dấu DONE. Chỉ sau khi tôi merge vào develop và nghiệm thu, task mới được chuyển sang completed/."*

### Cảnh Báo 5: Nhầm Lẫn Giữa "Đọc Mã Nguồn" Và "Kiểm Thử Runtime Thực Tế"
- **Vì sao đáng lo ngại**: AI đọc qua file mã nguồn thấy không có lỗi cú pháp và tự kết luận là "tính năng đã hoạt động hoàn hảo" mà không hề chạy unit test hay kiểm tra runtime.
- **Human kiểm tra gì**: Kiểm tra xem file test tương ứng có tồn tại không và có được chạy trong `npm run test:run` không.
- **Prompt gửi lại cho AI**:
  > *"Đọc code không phải là kiểm thử runtime. Bạn đã viết file test cho module này chưa? Hãy viết unit test kiểm chứng hành vi thực tế và chạy 'npm run test:run'."*

### Cảnh Báo 6: Tự Ý Bổ Sung Yêu Cầu Ngoài Phạm Vi (Scope Creep)
- **Vì sao đáng lo ngại**: AI tự ý code thêm các tính năng phức tạp ngoài bản thiết kế Phần 1 đã duyệt, làm tăng nguy cơ lỗi và trễ tiến độ Sprint.
- **Human kiểm tra gì**: Chạy `git diff develop..HEAD` và đối chiếu với mục `SCOPE` trong file task.
- **Prompt gửi lại cho AI**:
  > *"Phần code <tên chức năng> nằm ngoài phạm vi (Out-of-Scope) của TASK-XXX. Hãy loại bỏ phần code này hoặc hoàn tác các file không liên quan. Giữ đúng phạm vi đã được duyệt."*

### Cảnh Báo 7: Sửa File Ngoài `ALLOWED FILES` Hoặc Sửa Tệp Cấu Hình Chung
- **Vì sao đáng lo ngại**: Có nguy cơ làm gãy các module khác của hệ thống hoặc làm hỏng cấu hình build.
- **Human kiểm tra gì**: Chạy `git diff --name-only develop..HEAD` xem có file nào ngoài danh sách cho phép bị sửa đổi.
- **Prompt gửi lại cho AI**:
  > *"Bạn đã sửa các file nằm ngoài ALLOWED FILES: <danh sách file>. Hãy hoàn tác ngay các thay đổi trên những file này và chỉ tập trung vào các file trong phạm vi được giao."*

### Cảnh Báo 8: Dẫn Chiếu Tài Liệu Cũ/Archive Thay Vì Nguồn Hiện Hành
- **Vì sao đáng lo ngại**: AI sử dụng tài liệu trong `.document/archive/` hoặc tài liệu lịch sử lỗi thời để thiết kế code, làm sai lệch kiến trúc hiện tại.
- **Human kiểm tra gì**: Kiểm tra xem AI có dẫn link tới `.document/current/` không hay lại đọc các tài liệu cũ trong `archive/`.
- **Prompt gửi lại cho AI**:
  > *"Tài liệu bạn đang tham chiếu nằm trong kho lưu trữ lịch sử (archive) và không còn hiệu lực. Hãy đọc nguồn sự thật hiện hành tại .document/current/ và .document/sprints/active/."*

### Cảnh Báo 9: Tự Bịa Ra Thư Viện, Script Hoặc Lệnh Shell Không Có Thật
- **Vì sao đáng lo ngại**: AI tự sáng tác ra lệnh (ví dụ: `npm run verify-all`) hoặc tự giả định một thư viện ngoài chưa cài đặt.
- **Human kiểm tra gì**: Đối chiếu với `package.json` và [commands-reference.md](../operations/commands-reference.md).
- **Prompt gửi lại cho AI**:
  > *"Lệnh/thư viện bạn vừa đề cập không tồn tại trong repository này. Hãy kiểm tra lại scripts có sẵn trong package.json và chỉ sử dụng các lệnh chuẩn đã được quy định."*

### Cảnh Báo 10: Nhận Vơ Kết Quả Của Phiên Trước
- **Vì sao đáng lo ngại**: AI mới khởi động đọc session log cũ và báo cáo như thể chính mình vừa hoàn thành các công việc đó trong phiên hiện tại.
- **Human kiểm tra gì**: Đối chiếu thời gian commit và tác vụ cụ thể đang dở dang.
- **Prompt gửi lại cho AI**:
  > *"Đó là kết quả của phiên làm việc trước đã được commit. Hãy báo cáo chính xác hiện trạng công việc dở dang tại thời điểm này và những gì BẠN cần làm tiếp theo."*

### Cảnh Báo 11: Bằng Chứng Không Khớp Với Điều Khẳng Định
- **Vì sao đáng lo ngại**: AI khẳng định tính năng A hoạt động tốt nhưng bằng chứng đưa ra lại là kết quả test của tính năng B.
- **Human kiểm tra gì**: Đọc kỹ tên test case trong output của Vitest.
- **Prompt gửi lại cho AI**:
  > *"Bằng chứng test bạn đưa ra thuộc về module Warehouse, không chứng minh được tính năng Game Controller. Hãy chỉ rõ test case cụ thể nào đang kiểm chứng tính năng này."*

### Cảnh Báo 12: Báo Cáo Mập Mờ, Giấu Giếm Điểm Chưa Làm
- **Vì sao đáng lo ngại**: AI chỉ tập trung vào các điểm làm được và "lờ đi" các tiêu chí chưa đạt hoặc các ca test bị fail.
- **Human kiểm tra gì**: Đọc kỹ mục `Hạn chế còn tồn tại` và chạy test thực tế xem có lỗi đỏ nào bị giấu không.
- **Prompt gửi lại cho AI**:
  > *"Báo cáo chưa nêu rõ các hạn chế. Hãy liệt kê chi tiết: Có tiêu chí Acceptance Criteria nào chưa đạt 100% không? Còn ca kiểm thử nào bị lỗi hoặc chưa viết không? Trung thực báo cáo mọi vấn đề tồn đọng."*

