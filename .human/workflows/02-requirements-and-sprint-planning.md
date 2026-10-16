# Quy Trình Làm Rõ Yêu Cầu & Lập Kế Hoạch Sprint (.human/workflows/02-requirements-and-sprint-planning.md)

Tài liệu này hướng dẫn chi tiết cách thức Lập trình viên Con người trao đổi với AI để biến các ý tưởng, tính năng mới thành một Kế hoạch Sprint có cấu trúc, khả thi và được phê duyệt chính thức theo quy trình Scrum của Document Lifecycle System (`.document/WORKFLOW.md`).

---

## 1. Sơ Đồ Quy Trình Lập Kế Hoạch

```
[HUMAN: Cung cấp yêu cầu / tính năng mới qua Chat]
                      ↓
[AI: Phân tích & Hỏi trực tiếp để làm rõ (Discovery)]
                      ↓
[AI: Soạn thảo Đề xuất Phương án Sprint (Sprint Proposal)]
                      ↓
[HUMAN: Đánh giá Phạm vi, Tiêu chí AC & Rủi ro]
     ├── Yêu cầu chỉnh sửa ──> AI cập nhật lại đề xuất
     └── Phê duyệt (Approval Gate)
                      ↓
[AI: Tạo tài liệu Sprint chính thức tại .document/sprints/active/]
```

---

## 2. Các Bước Thực Hiện Cụ Thể

### Bước 1: Khởi Động Vòng Lập Kế Hoạch
- **Nhánh thực hiện**: Bạn thực hiện bước này trên nhánh `main` (hoặc `develop` nếu đang tổng kết sprint cũ).
- **Cách thức**: Gửi yêu cầu bằng ngôn ngữ tự nhiên mô tả mục tiêu bạn muốn đạt được trong chu kỳ phát triển sắp tới.

**Ví dụ câu lệnh gửi AI:**
> *"Tôi muốn lên kế hoạch cho Sprint tiếp theo. Mục tiêu là xây dựng cơ chế Game Controller để điều khiển lượt chơi, quản lý trạng thái (chưa bắt đầu, đang chạy, tạm dừng, hoàn thành) và phát ra các sự kiện cho giao diện. AI hãy phân tích yêu cầu và đề xuất kế hoạch Sprint."*

### Bước 2: AI Phân Tích & Làm Rõ Yêu Cầu (Discovery & Clarification)
Theo chuẩn `.document/RULES.md` (Mục 5) và `.skills/core/analyze-requirements.md` (SKILL-C01):
1. **Hỏi trực tiếp qua chat**: AI sẽ đặt từ 2 đến 4 câu hỏi trọng tâm về nghiệp vụ và kiến trúc trực tiếp trong cửa sổ hội thoại. AI bị cấm tạo file Markdown để hỏi.
2. **Phân biệt điều đã biết và điều chưa biết**: AI xác định các thành phần đã có sẵn trong repository (ví dụ: các domain model đã tích hợp từ Sprint trước) và những gì cần làm mới.
3. **Phát hiện xung đột tiềm ẩn**: Nếu yêu cầu mới mâu thuẫn với kiến trúc hiện có (ví dụ: đòi hỏi sửa trực tiếp cấu trúc dữ liệu đã chốt), AI phải cảnh báo ngay.

**Ví dụ phản hồi trả lời của bạn:**
> *"1. State Machine của Game Controller phải là class TypeScript thuần túy, không phụ thuộc vào Phaser.
> 2. Sự kiện phát ra dùng cơ chế EventEmitter chuẩn hoặc callback pattern đơn giản.
> 3. Không cần lưu điểm số hay bảng xếp hạng trong Sprint này."*

### Bước 3: Đánh Giá Bản Dự Thảo Kế Hoạch Sprint Của AI
AI sẽ trình bày dự thảo kế hoạch. Bạn cần kiểm tra kỹ 6 thành phần bắt buộc:

1. **Sprint Goal**: Phải là một câu ngắn gọn nêu bật giá trị mang lại (ví dụ: *"Cung cấp Game Controller quản lý vòng đời ván chơi và phát sự kiện"*).
2. **In-Scope (Trong phạm vi)**: Danh sách cụ thể các class, interface, method cần hiện thực.
3. **Out-of-Scope (Ngoài phạm vi)**: Ghi rõ những gì KHÔNG LÀM (ví dụ: *"Không làm giao diện UI React, không làm âm thanh"*).
4. **Acceptance Criteria (AC)**: Danh sách các tiêu chí định lượng có thể kiểm chứng bằng test tự động.
   - *Đạt chuẩn*: *"Phát ra sự kiện 'GAME_OVER' khi thuật toán hoàn thành và có unit test kiểm chứng."*
   - *Không đạt chuẩn*: *"Code chạy mượt mà và không có lỗi."*
5. **Key Risks & Dependencies**: Các module cần hoàn thành trước hoặc rủi ro phá vỡ code cũ.
6. **Danh sách Task dự kiến**: Phân rã thành 2-4 task nhỏ, mỗi task có thể hoàn thành trong một phiên làm việc độc lập.

### Bước 4: Yêu Cầu Điều Chỉnh Hoặc Cắt Giảm Phạm Vi
Nếu bạn thấy kế hoạch quá ôm đồm hoặc tiêu chí nghiệm thu chưa chặt chẽ:

**Ví dụ câu lệnh điều chỉnh:**
> *"Kế hoạch này quá lớn cho một Sprint. Hãy bỏ tính năng Rewind (tua lại nước đi) ra khỏi Sprint này, chuyển vào backlog. Chỉ giữ lại Play, Pause, Step và Reset. Bổ sung Acceptance Criteria: kiểm tra không cho phép Step khi ván chơi đang ở trạng thái Paused."*

### Bước 5: Phê Duyệt Kế Hoạch Sprint (Human Approval Gate)
Đây là ranh giới quyết định:
$$\mathbf{KẾ\ HOẠCH\ ĐỀ\ XUẤT\ (PROPOSED)} \neq \mathbf{KẾ\ HOẠCH\ ĐÃ\ DUYỆT\ (APPROVED)}$$
AI **tuyệt đối không được phép tự động kích hoạt** Sprint khi bạn chưa nói câu phê duyệt rõ ràng.

**Ví dụ câu lệnh phê duyệt của Human:**
> *"Tôi duyệt kế hoạch Sprint 2 với phạm vi và AC đã điều chỉnh. Hãy tạo tài liệu Sprint chính thức."*

Sau lệnh này, AI sẽ tạo file:
`.document/sprints/active/SPRINT-02-game-controller.md` theo mẫu chuẩn `.document/templates/sprint/SPRINT_PLAN_TEMPLATE.md`.

---

## 3. Quy Tắc Lập Kế Hoạch Nhiều Sprint (Multi-Sprint Roadmap)

Khi bạn muốn có tầm nhìn xa hơn (ví dụ: lên kế hoạch cho 3 Sprint tới), hệ thống phân định rõ 3 trạng thái theo `.document/schemas/sprint-schema.md`:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. ACTIVE SPRINT (TỐI ĐA DUY NHẤT 1 SPRINT)                           │
│    - Vị trí: .document/sprints/active/                                 │
│    - Quyền hạn: ĐƯỢC PHÉP TRIỂN KHAI MÃ NGUỒN TRÊN NHÁNH task/*        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. APPROVED SPRINTS (ĐÃ DUYỆT SCOPE, CHỜ KÍCH HOẠT)                    │
│    - Vị trí: .document/sprints/planned/SPRINT-03-approved.md           │
│    - Quyền hạn: TUYỆT ĐỐI CẤM CODE TRƯỚC                               │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. PLANNED / IDEA (Ý TƯỞNG, LỘ TRÌNH DỰ KIẾN TƯƠNG LAI)               │
│    - Vị trí: .document/sprints/planned/ hoặc .human/backlog/           │
│    - Quyền hạn: Kế hoạch mở, linh hoạt thay đổi theo thực tế           │
└────────────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Rào chắn Multi-Sprint**: Việc Human duyệt lộ trình 3 Sprint **KHÔNG ĐỒNG NGHĨA** với việc AI được phép phân nhánh code cho Sprint 2 hay Sprint 3 khi Sprint 1 chưa hoàn tất và đóng chính thức.

---

## 4. Xử Lý Khi Có Thay Đổi Yêu Cầu Giữa Sprint (Scope Change)

Nếu Sprint đang diễn ra mà bạn muốn thay đổi yêu cầu hoặc thêm tính năng:

1. **Không âm thầm đưa thêm việc vào task**: Không yêu cầu AI sửa code ngay trong khi task đang chạy.
2. **Đánh giá tác động (Impact Analysis)**: Yêu cầu AI phân tích:
   > *"Tôi muốn thay đổi logic Game Controller: cho phép tua lại nước đi (Step Back). Hãy đánh giá tác động tới Sprint 2 hiện tại và các task đang chạy."*
3. **Lựa chọn phương án xử lý**:
   - **Phương án A (Thay đổi nhỏ)**: Nếu không ảnh hưởng đến AC cốt lõi, Human phê duyệt cập nhật file Sprint Plan trong `.document/sprints/active/`.
   - **Phương án B (Thay đổi lớn)**: Đưa tính năng mới vào Sprint kế tiếp hoặc dời bớt một task hiện tại sang Sprint sau để giữ vững tiến độ.
   - **CẤM TUYỆT ĐỐI**: AI tự động sửa ngược Acceptance Criteria đã duyệt chỉ để hợp thức hóa việc code không kịp hoặc chạy sai.
