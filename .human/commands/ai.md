# Sổ Tay Lời Nhắc Mẫu Chỉ Đạo AI (.human/commands/ai.md)

Tài liệu này cung cấp các mẫu prompt chuẩn mực để Lập trình viên Con người chỉ đạo AI theo đặc tả lệnh trong [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md). Mỗi kịch bản đều ghi rõ mục tiêu, điều kiện tiên quyết, giới hạn hành vi và kết quả cần AI báo cáo.

---

## 1. Phân Tích Nhiệm Vụ (ANALYZE Task)

- **Mục tiêu**: Khảo sát hiện trạng, tìm hiểu nguyên nhân gốc rễ của lỗi hoặc đánh giá tính khả thi kỹ thuật trước khi lên kế hoạch.
- **Điều kiện**: Đã có mã task hoặc chủ đề cần khảo sát; branch hiện tại phù hợp với vai trò khảo sát.
- **Giới hạn**: Hoàn toàn chỉ đọc (Read-only); **TUYỆT ĐỐI KHÔNG** sửa bất kỳ file mã nguồn `/src/` hay cài đặt thêm thư viện npm.
- **Mẫu prompt**:
  ```text
  ANALYZE TASK-XXX. Khảo sát hiện trạng mã nguồn liên quan và đối chiếu với tài liệu kiến trúc tại .document/ARCHITECTURE.md. Đánh giá tính khả thi, các rủi ro kỹ thuật tiềm ẩn và đề xuất hướng xử lý. DO NOT MODIFY ANY SOURCE FILES.
  ```
- **Kết quả cần báo cáo**: Báo cáo phân tích gồm hiện trạng, nguyên nhân/cơ chế vận hành, danh sách rủi ro và các khuyến nghị bước tiếp theo.

---

## 2. Thiết Kế Kỹ Thuật Trước Khi Viết Code (DESIGN Before Implementation)

- **Mục tiêu**: Soạn thảo toàn bộ Phần 1 (Mục tiêu, Scope, Hợp đồng API, Luồng dữ liệu, Test Plan, Acceptance Criteria) trong file task.
- **Điều kiện**: Task ở trạng thái `READY` hoặc `CLAIMED`; nhánh hiện tại là `task/TASK-XXX-<slug>`.
- **Giới hạn**: Chỉ được chỉnh sửa file task `.ai/tasks/active/TASK-XXX.md`. **TUYỆT ĐỐI KHÔNG ĐƯỢC VIẾT MÃ NGUỒN VÀO `/src/`**.
- **Mẫu prompt**:
  ```text
  DESIGN TASK-XXX. Hoàn thiện toàn bộ Phần 1 (Goal, Scope, File Isolation, API Contracts, Data Flow, Test Plan, Acceptance Criteria) trong .ai/tasks/active/TASK-XXX.md. Tuân thủ kiến trúc phân lớp tại .document/ARCHITECTURE.md. TUYỆT ĐỐI CHƯA VIẾT CODE VÀO /src/.
  ```
- **Kết quả cần báo cáo**: Bản tóm tắt thiết kế gồm các interface TypeScript dự kiến, luồng dữ liệu, danh sách test case và xác nhận chưa sửa mã nguồn sản phẩm.

---

## 3. Triển Khai Task Đã Được Duyệt (IMPLEMENT Task)

- **Mục tiêu**: Lập trình mã nguồn tính năng và viết unit test để hiện thực hóa thiết kế đã được phê duyệt.
- **Điều kiện**: Phần 1 Thiết kế đã hoàn tất đầy đủ; nhánh Git hiện tại là `task/TASK-XXX-<slug>`; task ở trạng thái sẵn sàng triển khai.
- **Giới hạn**: Chỉ được tạo/sửa các file nằm chính xác trong `ALLOWED FILES` của task. Không sửa file ngoài scope. CẤM trên `main` và `develop`.
- **Mẫu prompt**:
  ```text
  IMPLEMENT TASK-XXX theo đặc tả thiết kế đã được duyệt. Chỉ tạo và chỉnh sửa các tệp nằm chính xác trong ALLOWED FILES của task. Viết đầy đủ unit tests độc lập tại src/test/ (hoặc cùng thư mục), đảm bảo chạy qua typecheck và lint.
  ```
- **Kết quả cần báo cáo**: Danh sách file đã tạo/sửa, kết quả chạy verification gates (typecheck, lint, test, build), và tóm tắt những logic đã hiện thực hóa.

---

## 4. Chạy Kiểm Thử Độc Lập (TEST Without Modifying Source)

- **Mục tiêu**: Thực thi toàn bộ bộ công cụ kiểm tra chất lượng tự động để đánh giá hiện trạng hoặc phát hiện lỗi hồi quy.
- **Điều kiện**: Môi trường dự án đã cài đặt dependencies (`node_modules` sẵn sàng).
- **Giới hạn**: Không được tự ý sửa bất kỳ dòng mã nguồn sản phẩm nào để ép test pass khi chưa có lệnh triển khai.
- **Mẫu prompt**:
  ```text
  TEST TASK-XXX WITHOUT MODIFYING SOURCE. Chạy toàn bộ chuỗi kiểm tra chất lượng: npm run typecheck, npm run lint, npm run test:run và npm run build. Báo cáo chi tiết số lượng test pass/fail và nguyên nhân gốc rễ nếu có lỗi gãy.
  ```
- **Kết quả cần báo cáo**: Bảng tổng kết kết quả 4 công cụ (typecheck, lint, unit test, build); chi tiết stack trace hoặc log của các test case bị lỗi (nếu có).

---

## 5. Rà Soát Tương Thích & Chất Lượng Mã Nguồn (REVIEW Compatibility)

- **Mục tiêu**: Đánh giá diff Git giữa nhánh task và nhánh tích hợp `develop`, kiểm tra tính tương thích kiến trúc, hợp đồng API và tiêu chí nghiệm thu.
- **Điều kiện**: Nhánh task đã có các commit hoàn thiện; mã nguồn đã vượt qua kiểm thử.
- **Giới hạn**: Thao tác chỉ đọc (Read-only); không chỉnh sửa file trong quá trình review.
- **Mẫu prompt**:
  ```text
  REVIEW TASK-XXX diff so với nhánh origin/develop. Kiểm tra tính tuân thủ kiến trúc phân lớp (.document/ARCHITECTURE.md), hợp đồng API (.document/interfaces/API_CONTRACTS.md), các tiêu chí nghiệm thu Acceptance Criteria và các đề xuất PROP-XXX đi kèm (nếu có).
  ```
- **Kết quả cần báo cáo**: Báo cáo nghiệm thu chi tiết, đánh giá từng tiêu chí nghiệm thu, cảnh báo nợ kỹ thuật hoặc nguy cơ phá vỡ tương thích, và khuyến nghị `APPROVE` hoặc `REQUEST_CHANGES`.

---

## 6. Tạo Đề Xuất Thay Đổi Nhưng Không Triển Khai (PROPOSE, Do Not Implement)

- **Mục tiêu**: Soạn thảo đề xuất thay đổi kiến trúc, mở rộng API hoặc cải tiến quy trình khi phát hiện vấn đề cần xem xét cấp cao.
- **Điều kiện**: Phát hiện vấn đề kiến trúc/API vượt ra ngoài phạm vi một task thông thường.
- **Giới hạn**: Chỉ tạo file `.ai/changes/proposals/PROP-XXX.md`, cập nhật tham chiếu và commit riêng. **TUYỆT ĐỐI KHÔNG TỰ TRIỂN KHAI CODE**.
- **Mẫu prompt**:
  ```text
  PROPOSE giải pháp tái cấu trúc module <Tên Module>, DO NOT IMPLEMENT. Sử dụng mẫu .ai/templates/changes/PROP_TEMPLATE.md để tạo PROP-XXX.md. Phân tích rõ bài toán, thiết kế hiện tại, phương án đề xuất, rủi ro và breaking change. Tạo commit riêng theo chuẩn 'PROP-XXX: <mô tả>' và push lên remote task branch.
  ```
- **Kết quả cần báo cáo**: Mã proposal đã tạo, phân tích tính chất (blocking hay non-blocking), xác nhận commit riêng biệt và trạng thái chờ Human phê duyệt.

---

## 7. Dừng Khẩn Cấp (STOP Immediately)

- **Mục tiêu**: Yêu cầu AI lập tức ngừng mọi hoạt động viết mã, chạy script hoặc can thiệp file để con người kiểm tra.
- **Điều kiện**: Bất kỳ khi nào con người phát hiện bất thường, xung đột hoặc muốn can thiệp thủ công.
- **Giới hạn**: AI ngừng ngay lập tức tại chỗ, không thực hiện thêm bất kỳ lệnh ghi đĩa hay lệnh git nào.
- **Mẫu prompt**:
  ```text
  STOP ngay lập tức. Giữ nguyên toàn bộ trạng thái kho chứa hiện tại và báo cáo ngắn gọn vị trí công việc dở dang.
  ```
- **Kết quả cần báo cáo**: Xác nhận đã dừng, đường dẫn file/dòng code đang thao tác dở dang và trạng thái git working tree.

---

## 8. Tạm Dừng & Bàn Giao Khi Chuyển Task (PAUSE & Handoff)

- **Mục tiêu**: Đóng băng an toàn công việc dở dang của task hiện tại, lưu vết đầy đủ để chuyển sang làm task khẩn cấp khác mà không làm mất bối cảnh.
- **Điều kiện**: Task hiện tại chưa hoàn thành nhưng cần tạm dừng theo chỉ đạo của Human.
- **Giới hạn**: Không để lại code chưa commit trong working tree; không phá vỡ tính toàn vẹn của nhánh.
- **Mẫu prompt**:
  ```text
  Dừng viết code tại điểm an toàn. Chạy kiểm tra nhanh, COMMIT toàn bộ thay đổi dở dang với thông điệp 'TASK-XXX: WIP pause at <vị trí>', COMMIT riêng đề xuất PROP-XXX nếu có, PUSH nhánh lên remote, cập nhật trạng thái PAUSED trên bảng task và lập biên bản bàn giao đầy đủ theo mẫu .ai/templates/sessions/SESSION_TEMPLATE.md trong .ai/sessions/.
  ```
- **Kết quả cần báo cáo**: Mã commit WIP, link file session handoff đã tạo, mô tả điểm dừng chính xác và hành động tiếp theo dành cho phiên tiếp quản.

---

## 9. Tiếp Quản Task Từ Phiên Khác (RESUME / Handoff Takeover)

- **Mục tiêu**: Khởi động phiên AI mới, đọc nhật ký bàn giao từ phiên trước và tiếp tục thực hiện task một cách trơn tru.
- **Điều kiện**: Đang đứng trên đúng nhánh của task (`task/TASK-XXX-<slug>`); đã có nhật ký bàn giao gần nhất trong `.ai/sessions/`.
- **Giới hạn**: Phải kiểm tra và tái xác nhận trạng thái bắt đầu (clean working tree, git log) trước khi tiếp tục viết code.
- **Mẫu prompt**:
  ```text
  RESUME TASK-XXX. Đọc nhật ký bàn giao gần nhất trong .ai/sessions/, kiểm tra git status và git log trên nhánh hiện tại. Khảo sát điểm đã dừng lại và tiếp tục thực hiện công việc tiếp theo được ghi nhận trong handoff. Tuân thủ ranh giới ALLOWED FILES của task.
  ```
- **Kết quả cần báo cáo**: Tóm tắt bối cảnh đã tiếp nhận từ phiên trước, xác nhận trạng thái bắt đầu và kế hoạch các bước hành động cụ thể trong phiên này.

---

## 10. Hoàn Tất Task Theo Protocol (COMPLETE & READY_FOR_REVIEW)

- **Mục tiêu**: Thực hiện kiểm tra 6 khía cạnh, hoàn thiện tài liệu, tạo commit chuẩn, đẩy nhánh lên remote và bàn giao cho Human nghiệm thu.
- **Điều kiện**: Toàn bộ mã nguồn và unit test của task đã triển khai xong; 5 verification gates đều đạt.
- **Giới hạn**: AI chỉ được đổi trạng thái tối đa là `READY_FOR_REVIEW`. Tuyệt đối CẤM tự ý merge vào `develop` và CẤM đổi sang `DONE`.
- **Mẫu prompt**:
  ```text
  Thực hiện kiểm tra 6 khía cạnh trước khi dừng (source changes, tests, task status, session status, proposals, drift reports). Xác nhận 5 cổng kiểm tra (typecheck 0 lỗi, lint 0 lỗi, test:run 100% pass, build thành công, docs đồng bộ). COMMIT triển khai theo chuẩn 'TASK-XXX: <mô tả>', COMMIT riêng proposals nếu có, PUSH nhánh task lên remote, cập nhật task sang READY_FOR_REVIEW và hoàn tất SESSION log.
  ```
- **Kết quả cần báo cáo**: Bảng tổng kết 6 khía cạnh, commit hashes đã tạo, kết quả push remote, và lời mời Human Developer kiểm tra diff để merge.
