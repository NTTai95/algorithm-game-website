# Hệ Thống Quản Lý Đề Xuất Thay Đổi & Báo Cáo Sai Lệch (Changes & Drift)

Thư mục này quản lý hai luồng tài liệu kỹ thuật quan trọng nhằm bảo vệ tính toàn vẹn kiến trúc và duy trì tri thức phát triển dùng chung của dự án:
1. **Đề xuất thay đổi có chủ đích (Change Proposals)** nằm trong `proposals/`
2. **Báo cáo sai lệch giữa mã nguồn và tài liệu (Drift Reports)** nằm trong `drift/`

```
.ai/changes/
├── README.md               # Tài liệu này: Quy định chung về Proposals và Drift
├── proposals/              # Chứa các file đề xuất PROP-XXX.md
└── drift/                  # Chứa các file báo cáo sai lệch DRIFT-XXX.md
```

> **Biểu Mẫu**:
> - Đề xuất thay đổi: [`.ai/templates/changes/PROP_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/changes/PROP_TEMPLATE.md)
> - Báo cáo sai lệch: [`.ai/templates/changes/DRIFT_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/changes/DRIFT_TEMPLATE.md)

---

## 1. NGUYÊN TẮC CỐT LÕI: ĐỀ XUẤT LÀ TÀI SẢN DỰ ÁN DÙNG CHUNG (PROPOSALS ARE SHARED PROJECT ARTIFACTS)

Một đề xuất thay đổi (`Proposal`) **KHÔNG PHẢI** là thông tin tạm thời cục bộ trên máy cá nhân, và **KHÔNG ĐƯỢC PHÉP** chỉ tồn tại trong ngữ cảnh chat của AI.

Một đề xuất là **tri thức phát triển dùng chung (shared development knowledge)** của toàn bộ dự án.

Khi một AI phát hiện khả năng cải tiến kiến trúc, API, thiết kế hoặc quy trình:
```
AI phát hiện vấn đề / cơ hội cải tiến
          ↓
Tạo file .ai/changes/proposals/PROP-XXX.md
          ↓
Tham chiếu đề xuất trong TASK và SESSION liên quan
          ↓
Tạo Commit riêng biệt cho đề xuất (Commit Separation)
          ↓
Push đề xuất lên remote task branch qua Git
          ↓
AI phiên khác / máy khác kéo về đọc được đề xuất
          ↓
Lập trình viên Con người xem xét đề xuất
          ↓
Con người quyết định:
APPROVE / REJECT / DEFER hoặc tạo Task mới
```

### Yêu Cầu Bắt Buộc Đối Với AI:
- **PHẢI** lưu trữ đề xuất trong repository (`.ai/changes/proposals/PROP-XXX.md`).
- **PHẢI** được Git theo dõi (tracked), commit và đẩy lên remote task branch.
- **PHẢI** hiển thị rõ ràng cho các phiên AI khác (kể cả phiên AI chạy trên máy tính khác khi pull Git).
- **PHẢI** tách biệt thành commit riêng, không gộp chung với commit triển khai mã nguồn.
- **CẤM** để đề xuất ở trạng thái untracked khi kết thúc phiên.
- **CẤM** giấu đề xuất trong bộ nhớ chat.
- **CẤM** tự ý âm thầm triển khai đề xuất khi chưa có task hoặc chỉ thị được phê duyệt riêng.

---

## 2. PHÂN BIỆT RẠCH RÒI 4 KHÁI NIỆM TRONG DỰ ÁN

Để tránh nhầm lẫn giữa ý tưởng, quyền hạn và lịch sử thực thi:

$$\mathbf{PROPOSAL} \neq \mathbf{TASK} \neq \mathbf{IMPLEMENTATION} \neq \mathbf{HUMAN\ APPROVAL}$$

| Khái Niệm | Bản Chất & Ý Nghĩa | Nơi Thể Hiện |
| :--- | :--- | :--- |
| **PROPOSAL (Đề Xuất)** | *"Đây là một cải tiến/thay đổi tiềm năng có thể làm."* | `.ai/changes/proposals/PROP-XXX.md` |
| **HUMAN DECISION (Quyết Định)** | *"Con người phê duyệt / từ chối / hoãn đề xuất này."* | Trường `HUMAN_DECISION` trong Proposal |
| **TASK (Nhiệm Vụ)** | *"Thay đổi này đã được phê chuẩn để triển khai trong sprint."* | `.ai/tasks/active/TASK-XXX.md` |
| **IMPLEMENTATION (Triển Khai)** | *"Tính năng đã được lập trình và vượt qua kiểm thử."* | Mã nguồn trong `/src/` & commits trên Git |
| **GIT REPOSITORY** | *"Lịch sử khách quan ghi nhận những gì thực tế đã diễn ra."* | Git Commits & Repository Tree |

> **LƯU Ý CỰC KỲ QUAN TRỌNG**:
> Một đề xuất được phê duyệt (`APPROVED PROPOSAL`) **KHÔNG ĐỒNG NGHĨA** với việc AI được tự ý code ngay lập tức. Việc triển khai chỉ được phép diễn ra khi Con người tạo hoặc kích hoạt một Task chính thức thông qua quy trình chuẩn.

---

## 3. TÁCH BIỆT COMMIT (COMMIT SEPARATION RULE)

Lịch sử Git của dự án phải cho phép Con người và AI trả lời rạch ròi hai câu hỏi:
- *"Nhiệm vụ này đã triển khai những gì?"*
- *"Nhiệm vụ này đã phát hiện và đề xuất những gì?"*

Vì vậy:
- **IMPLEMENTATION COMMIT**: Chỉ chứa các thay đổi mã nguồn, test, và tài liệu triển khai trực tiếp thuộc scope của task.
  - Chuẩn: `TASK-XXX: <mô tả triển khai>`
- **PROPOSAL COMMIT**: Chỉ chứa tệp đề xuất (`PROP-XXX.md`) và các tham chiếu tài liệu trực tiếp liên quan.
  - Chuẩn: `PROP-XXX: <mô tả đề xuất cải tiến>`

**TUYỆT ĐỐI CẤM** gộp cả hai vào một commit (ví dụ: cấm `TASK-021: implement crane system and proposal`).

---

## 4. HAI KỊCH BẢN KHI PHÁT HIỆN ĐỀ XUẤT TRONG LÚC LÀM TASK

Khi AI đang thực hiện một task và phát hiện cơ hội hoặc nhu cầu cải tiến:

### TRƯỜNG HỢP A — Đề Xuất Không Chặn Task (Non-Blocking Proposal)
Đề xuất hữu ích cho tương lai nhưng không ngăn cản việc hoàn thành nhiệm vụ hiện tại.
```
TASK-021 đang thực hiện
        ↓
Phát hiện cơ hội tối ưu API Crane
        ↓
Tạo PROP-014 (BLOCKS_CURRENT_TASK: NO)
        ↓
Tiếp tục triển khai hoàn tất TASK-021 theo scope đã định
        ↓
Tạo commit triển khai: TASK-021: implement crane system
        ↓
Tạo commit đề xuất riêng: PROP-014: propose crane API revision
        ↓
Cập nhật tham chiếu trong TASK-021 và SESSION-XXX
        ↓
Push nhánh task lên remote → READY_FOR_REVIEW
```

### TRƯỜNG HỢP B — Đề Xuất Chặn Task (Blocking Proposal)
Kiến trúc hiện tại hoặc rào cản kỹ thuật căn bản xung đột trực tiếp với nhiệm vụ hiện tại, khiến task không thể triển khai đúng đắn nếu không đổi kiến trúc.
```
TASK-021 đang thực hiện
        ↓
Phát hiện kiến trúc hiện tại xung đột căn bản với TASK-021
        ↓
AI TUÂN THỦ: DETECT → DOCUMENT → CREATE PROP-014 (BLOCKS_CURRENT_TASK: YES)
        ↓
Đánh dấu Task là BLOCKED trong file task và TASK_PROCESSING.md
        ↓
DỪNG NGAY phần việc triển khai bị ảnh hưởng (STOP affected work)
        ↓
Commit đề xuất và trạng thái task dở dang riêng biệt
        ↓
Push nhánh lên remote và bàn giao lại cho Con người
        ↓
Chờ HUMAN DECISION (Con người quyết định hướng xử lý)
```
> **CẤM KỴ**: Tuyệt đối **KHÔNG ĐƯỢC** tự chế ra giải pháp chắp vá (workaround) trái quy tắc chỉ để tránh việc dừng task.

---

## 5. VÒNG ĐỜI TRẠNG THÁI CỦA ĐỀ XUẤT (PROPOSAL LIFECYCLE)

Mỗi đề xuất trải qua các trạng thái chuẩn hóa sau:

```
CREATED (Vừa được khởi tạo bởi phiên AI)
   ↓
PENDING_HUMAN_REVIEW (Đang chờ Con người xem xét đánh giá)
   ↓
┌──────────────┬──────────────┐
▼              ▼              ▼
APPROVED       REJECTED       DEFERRED
(Được duyệt)   (Từ chối)      (Hoãn lại xem xét sau)
```

1. **CREATED / PENDING_HUMAN_REVIEW**: AI tạo đề xuất và đẩy lên repository.
2. **APPROVED**: Con người chấp thuận ý tưởng. Con người sẽ lên kế hoạch tạo task mới trong sprint tiếp theo để hiện thực hóa.
3. **REJECTED**: Con người không đồng ý với đề xuất. Đề xuất giữ nguyên trong Git để lưu vết lý do từ chối, tránh các AI sau lặp lại cùng đề xuất.
4. **DEFERRED**: Đề xuất hợp lý nhưng chưa ưu tiên lúc này, lưu lại cho tương lai.

---

## 6. CẤU TRÚC CHUẨN CỦA FILE PROP-XXX.md

Mọi đề xuất phải tuân thủ cấu trúc tại [`.ai/templates/changes/PROP_TEMPLATE.md`](file:///d:/workspace/Algorithm-game-website/.ai/templates/changes/PROP_TEMPLATE.md) với đầy đủ các mục:
- `# PROP-XXX: [TITLE]`
- `## TITLE`
- `## CREATED`
- `## CREATED_BY` (Ghi mã phiên hiện tại, không dùng định danh tĩnh như AGENT_A/B)
- `## SOURCE` (`MAIN` | `DEVELOP` | `TASK`)
- `## RELATED_TASK` (Tùy chọn)
- `## STATUS` (`PENDING_HUMAN_REVIEW`)
- `## PROBLEM`
- `## CURRENT_DESIGN`
- `## PROPOSED_CHANGE` (Không chèn mã triển khai hoàn chỉnh, chỉ dùng ví dụ ngắn minh họa nếu cần)
- `## REASON`
- `## AFFECTED_SYSTEMS`
- `## AFFECTED_FILES`
- `## AFFECTED_TASKS`
- `## API / INTERFACE IMPACT`
- `## BREAKING_CHANGE` (`YES` / `NO`)
- `## BLOCKS_CURRENT_TASK` (`YES` / `NO`)
- `## RISKS`
- `## TEST_IMPACT`
- `## RECOMMENDED_ACTION`
- `## HUMAN_DECISION`

---

## 7. HỢP TÁC ĐA TÁC NHÂN (MULTI-AI COLLABORATION)

Mục đích trọng tâm của việc đưa Proposals thành Artifact dùng chung trên Git:
- **Máy A (AI Session 01)**: Đang thực hiện `TASK-021`, phát hiện nút thắt API $\to$ Tạo `PROP-014` $\to$ Commit riêng $\to$ Push lên remote.
- **Máy B (AI Session 02)**: Lập trình viên khác bật AI Session 02, kéo nhánh về (`git pull`) $\to$ Session 02 đọc được ngay `PROP-014`.
- AI Session 02 lập tức nắm được:
  - Vấn đề mà Session 01 đã phát hiện.
  - Lý do tại sao vấn đề chưa được triển khai.
  - Đề xuất có ảnh hưởng đến công việc hiện tại không.
  - Trạng thái đánh giá của Con người.
  - Những việc cần làm tiếp theo.

**Không một thông tin thiết yếu nào cho tính liên tục của dự án được phép bị giam hãm trong lịch sử chat cục bộ của AI.**

---

## 8. HỆ THỐNG BÁO CÁO SAI LỆCH TÀI LIỆU (DRIFT SYSTEM)

Khi AI phát hiện mã nguồn thực tế và tài liệu thiết kế trong `.ai/` không thống nhất:
- **CẤM** tự ý sửa code cho khớp tài liệu.
- **CẤM** tự ý sửa tài liệu cho khớp code.
- **CẤM** tự đoán bên nào đúng hơn.

AI phải tạo tệp `.ai/changes/drift/DRIFT-XXX.md` ghi nhận:
- **Mã báo cáo**: `DRIFT-XXX`
- **Kỳ vọng theo tài liệu (Document Expectation)**
- **Hiện thực hóa trong code (Actual Implementation)**
- **Điểm sai lệch cụ thể (Exact Mismatch)**
- **Hệ thống bị ảnh hưởng (Affected Systems)**
- **Hậu quả tiềm ẩn (Possible Consequences)**
- **Khuyến nghị & Quyết định của con người**

Chu trình xử lý:
$$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{STOP} \longrightarrow \mathbf{HUMAN\ DECISION}$$
