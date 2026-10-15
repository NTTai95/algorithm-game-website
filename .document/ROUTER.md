# Document Router (ROUTER.md)

Cơ chế định tuyến và phân tầng truy cập tài liệu nhằm **tiết kiệm context window**, đảm bảo AI chỉ nạp đúng tài liệu cần thiết cho tác vụ hiện tại.

---

## 1. Nguyên Tắc Phân Tầng Truy Cập

```
CẤP 1: Entry Point (README.md)
  ↓
CẤP 2: Router & Quy Tắc (ROUTER.md, RULES.md, WORKFLOW.md)
  ↓
CẤP 3: Active Context (sprints/active/, current/)
  ↓
CẤP 4: Templates & Schemas (chỉ nạp khi tạo hoặc kiểm tra tài liệu)
  ↓
CẤP 5: History & Archive (sprints/completed/, archive/ — chỉ nạp khi điều tra lịch sử)
```

---

## 2. Bảng Định Tuyến Theo Tình Huống

| Tình huống / Nhiệm vụ | Bước 1: Đọc trước | Bước 2: Đọc có điều kiện | Khi nào DỪNG (Stop condition) | Xử lý khi tài liệu chưa tồn tại |
| :--- | :--- | :--- | :--- | :--- |
| **Nhận yêu cầu mới từ Human** | `WORKFLOW.md` (Giai đoạn A) | `current/` (nếu có tài liệu liên quan) | Khi đã xác định được điều đã biết, chưa biết và câu hỏi cần hỏi Human | Nếu `current/` trống: bắt đầu từ yêu cầu của Human, không ép phải có tài liệu trước |
| **Phân tích & Lên kế hoạch Sprint** | `WORKFLOW.md` (Giai đoạn B), `templates/sprint/SPRINT_PLAN_TEMPLATE.md` | `sprints/planned/` (nếu xem xét multi-sprint roadmap) | Khi hoàn thành bản thảo Sprint Plan với mục tiêu, scope, AC, tasks và risks | Tạo Sprint Plan mới từ template; không tự suy diễn nếu thiếu thông tin từ Human |
| **Human yêu cầu tạo tài liệu dự án** | `templates/` tương ứng với loại tài liệu cần tạo | `schemas/metadata-schema.md` | Khi tạo xong tài liệu theo đúng template và schema | Chọn template phù hợp nhất; nếu không có template chuyên biệt, dùng `project/PROJECT_OVERVIEW_TEMPLATE.md` làm gốc |
| **IMPLEMENT task trong Sprint** | File Sprint đang ACTIVE (`sprints/active/SPRINT-XXX.md`) | Tài liệu kiến trúc hoặc ranh giới trong `current/` (nếu task chỉ định) | Khi nắm rõ Acceptance Criteria, scope và ALLOWED FILES của task | Nếu không có tài liệu kiến trúc: tuân thủ thiết kế trong task file; ghi nhận giới hạn |
| **TEST & nghiệm thu task** | Acceptance Criteria trong `sprints/active/` và task file | Tài liệu chiến lược test trong `current/` (nếu có) | Khi đã xác minh đủ 100% AC của task | Nếu chưa có tài liệu test riêng: chạy các script kiểm thử có sẵn trong project (`package.json`) |
| **Nghiệm thu & Kết thúc Sprint** | `WORKFLOW.md` (Giai đoạn F), `templates/sprint/SPRINT_REVIEW_TEMPLATE.md` | File Sprint active cần đóng | Khi lập xong Sprint Review và di chuyển file Sprint sang `sprints/completed/` | Không đóng Sprint nếu thiếu bằng chứng nghiệm thu thực tế |
| **Điều tra quyết định cũ / Debug lịch sử** | `sprints/completed/` liên quan | `archive/` (nếu là tài liệu từ giai đoạn cũ) | Khi tìm thấy lý do hoặc quyết định gốc cần tra cứu | Nếu không tìm thấy trong archive: ghi nhận vào log, hỏi Human nếu cần |

---

## 3. Quy Tắc Dừng Tìm Kiếm (Stop Conditions)

AI phải **DỪNG** việc đọc thêm file ngay khi:
1. Đã có đủ thông tin để trả lời hoặc thực hiện nhiệm vụ theo đúng phạm vi cho phép.
2. Đã phát hiện điểm mơ hồ cần Human làm rõ $\to$ DỪNG và hỏi Human trực tiếp trong hội thoại.
3. Không tìm thấy tài liệu tại `current/` $\to$ DỪNG việc tìm kiếm sâu, ghi nhận tài liệu chưa tồn tại và tiến hành theo quy trình fallback dưới đây.

---

## 4. Quy Trình Fallback Khi Tài Liệu Cần Thiết Chưa Tồn Tại

Khi một task yêu cầu thông tin kiến trúc, ranh giới hoặc kiểm thử nhưng thư mục `current/` chưa có tài liệu tương ứng:
1. **Ghi nhận giới hạn**: Nêu rõ trong hội thoại hoặc task log rằng dự án hiện chưa có tài liệu chính thức cho phần này.
2. **Fallback về cấu hình repository**: Tra cứu các file cấu hình tiêu chuẩn của project (ví dụ: `package.json`, `tsconfig.json`, source structure).
3. **Giới hạn phạm vi**: Chỉ thực hiện các bước có thể xác minh độc lập, không vượt quá phạm vi task được giao.
4. **Tuyệt đối cấm**:
   - Tự ý bịa ra kiến trúc, mô hình dữ liệu hoặc ranh giới module chưa được Human phê duyệt.
   - Tự động tạo file tài liệu trong `current/` mà không có sự đồng ý của Human trong một Sprint cụ thể.
