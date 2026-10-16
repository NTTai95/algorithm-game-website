# Hướng Dẫn Phân Bổ, Lựa Chọn & Điều Phối Mô Hình AI (.human/operations/model-routing-and-assignment.md)

Tài liệu này giải thích cơ chế nhận diện tác tử, hướng dẫn lựa chọn mô hình ngôn ngữ lớn (LLM Models) phù hợp với từng tác vụ, và quy định vận hành cơ chế Ủy quyền phụ (Delegation Protocol) trong hệ thống hiện tại.

---

## 1. Hiện Trạng Cấu Hình Mô Hình Trong Repository (Status Verification)

> [!IMPORTANT]
> **TÌNH TRẠNG CẤU HÌNH TRONG REPOSITORY**:
> - **Cấu hình Model Tự Động Trong Mã Nguồn**: `NOT CONFIGURED IN REPOSITORY` (Hệ thống không chứa tệp cấu hình API key hay cơ chế tự động gọi model qua backend trong repository).
> - **Cơ Chế Phân Bổ Mô Hình**: `CLIENT-SIDE MANAGED BY HUMAN` (Việc lựa chọn sử dụng mô hình nào — Claude 3.5 Sonnet, Gemini 1.5 Pro, GPT-4o, hay DeepSeek — hoàn toàn do Lập trình viên Con người chủ động chọn trong giao diện IDE hoặc công cụ AI Client).
> - **Cơ Chế Ủy Quyền Phụ (Delegation)**: `EXPERIMENTAL — TẮT MẶC ĐỊNH` (Được quy định tại `.ai/protocol/EXPERIMENTAL-DELEGATE.md`, chỉ chạy khi Human kích hoạt rõ ràng).

---

## 2. Danh Tính Tác Nghiệp Hoán Đổi Của AI (Interchangeable Identity)

Hệ thống được thiết kế theo nguyên tắc Rule 2 (`.ai/rules/CORE_RULES.md`): **Không cố định danh tính AI**.
- Không có khái niệm "AI chuyên làm việc A" hay "AI của máy tính B".
- Bạn có thể chuyển đổi linh hoạt giữa các model khác nhau giữa các phiên mà không lo mất ngữ cảnh, bởi vì danh tính của AI được xác định trực tiếp bởi:
  $$\text{Operational Identity} = \text{GIT BRANCH} + \text{TASK ID} + \text{SESSION ID}$$
- Toàn bộ bối cảnh dự án được lưu trữ trên Git: file task (`.ai/tasks/active/TASK-XXX.md`), đề xuất (`.ai/changes/proposals/`), và nhật ký bàn giao (`.ai/sessions/SESSION-XXX.md`).

---

## 3. Khuyến Nghị Lựa Chọn Mô Hình Theo Tính Chất Công Việc

Dưới đây là các khuyến nghị thực tiễn dựa trên kinh nghiệm thực tế để bạn tối ưu hóa chi phí và hiệu năng khi chọn model trong IDE:

| Loại công việc | Mô hình khuyến nghị (Client-side) | Lý do và tiêu chí lựa chọn |
| :--- | :--- | :--- |
| **Quy hoạch kiến trúc & Thiết kế Sprint (Giai đoạn A, B, C)** | Mô hình năng lực suy luận cao cấp *(Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro)* | Cần khả năng đọc hiểu context rộng, suy luận logic trừu tượng, phát hiện mâu thuẫn kiến trúc và phân rã task chính xác. |
| **Lập trình Logic Thuật Toán Phức Tạp (IMPLEMENT Task)** | Mô hình lập trình chuyên sâu *(Claude 3.5 Sonnet, GPT-4o)* | Khả năng sinh mã TypeScript chặt chẽ, hiểu rõ type system, tránh sinh mã giả hoặc thư viện ngoài scope. |
| **Soạn Thảo Unit Test & Rà Soát Lint (TEST Phase)** | Mô hình cân bằng tốc độ/chi phí *(Gemini 1.5 Flash, Claude 3.5 Haiku, GPT-4o mini)* | Viết các ca kiểm thử biên (edge cases), mock dữ liệu, kiểm tra cú pháp lặp đi lặp lại một cách nhanh chóng. |
| **Cập Nhật Tài Liệu & Tổng Hợp Báo Cáo (DOCUMENT, REPORT)** | Mô hình xử lý văn bản nhanh *(Gemini 1.5 Flash, GPT-4o mini)* | Tóm tắt kết quả kiểm thử, cập nhật bảng task, điền template theo cấu trúc có sẵn. |

---

## 4. Cơ Chế Ủy Quyền Phụ: `EXPERIMENTAL-DELEGATE`

Repository hỗ trợ một giao thức thử nghiệm cho phép AI chính ủy quyền một phần việc độc lập cho một AI phụ thực hiện. Giao thức này được định nghĩa chính thức tại [EXPERIMENTAL-DELEGATE.md](../../.ai/protocol/EXPERIMENTAL-DELEGATE.md).

### 4.1. Nguyên Tắc An Toàn Cốt Lõi
1. **Tắt mặc định**: AI chính **TUYỆT ĐỐI KHÔNG TỰ Ý KÍCH HOẠT** cơ chế này trong các task thông thường.
2. **Chỉ bật khi Human yêu cầu rõ ràng**: Human phải gõ lệnh trực tiếp trong chat:
   ```text
   DELEGATE <mô tả công việc>
   hoặc
   EXPERIMENTAL-DELEGATE <mô tả công việc>
   ```
3. **Cơ chế Giao tiếp Bằng PATCH Diff**:
   - AI chính chuẩn bị một **Delegation Package** tại `.ai/changes/delegations/DEL-<TASK-ID>-<slug>.md`.
   - AI phụ chỉ được phép trả về kết quả dưới dạng **Unified Diff (`DEL-<ID>-patch.diff`)** kèm báo cáo tóm tắt.
   - **AI phụ TUYỆT ĐỐI CẤM**: Tự ý commit Git, push lên GitHub, merge nhánh, hoặc chỉnh sửa các file quy tắc trong `.ai/` và `.document/`.
4. **AI Chính Chịu Trách Nhiệm Cuối Cùng**:
   - AI chính phải kiểm tra patch diff (đúng `ALLOWED FILES`, không chứa mã độc hại).
   - Áp dụng patch bằng lệnh `git apply DEL-<ID>-patch.diff`.
   - Bắt buộc chạy lại toàn bộ Verification Gates: `typecheck`, `lint`, `test:run`, `build`.
   - Kết quả do AI phụ báo cáo không bao giờ được coi là bằng chứng hoàn thành; AI chính vẫn phải tự xác minh độc lập.

### 4.2. Khi Nào Nên & Không Nên Sử Dụng Delegation?

#### NÊN SỬ DỤNG KHI:
- Công việc có phạm vi cố định, cô lập hoàn toàn (ví dụ: viết một bộ unit test độc lập cho một class đã hoàn thiện giao diện).
- Hợp đồng giao tiếp (Interface, Function Signature) đã được xác định 100% không còn điểm mơ hồ.
- Đã có tiêu chuẩn kiểm thử khách quan có thể xác minh được ngay bằng `npm run test:run`.

#### TUYỆT ĐỐI CẤM SỬ DỤNG KHI:
- Công việc đòi hỏi đưa ra quyết định nghiệp vụ hoặc lựa chọn kiến trúc.
- Hợp đồng API giữa các module chưa ổn định hoặc đang tranh cãi.
- Công việc quá nhỏ (chi phí chuẩn bị Delegation Package lớn hơn thời gian tự viết code).
- Trên các nhánh quản trị `main` hoặc `develop`.

---

## 5. Cách Phân Biệt Kết Quả Thực Tế Với Lời Khẳng Định Của AI

Lập trình viên Con người không được tin vào lời AI báo cáo rằng một model cụ thể đã thực hiện tác vụ nếu không có bằng chứng:

1. **Kiểm tra Commit Author & Log**: Kiểm tra xem commit được tạo bởi ai trên Git.
2. **Kiểm tra File Diff**: Xem trực tiếp `git diff` để đảm bảo code được sinh ra tuân thủ đúng quy ước TypeScript của dự án.
3. **Xác minh Runtime độc lập**: Tự bạn mở terminal và gõ `npm run test:run` để xác nhận test pass thực sự, không dựa vào ảnh chụp màn hình hay log văn bản do AI tự viết ra trong chat.

