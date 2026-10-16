# Quản Lý Dự Án, Tài Liệu & Quyết Định (.human/operations/project-and-document-management.md)

Tài liệu này hướng dẫn Lập trình viên Con người quản trị tri thức dự án, vòng đời tài liệu theo Scrum, xử lý các đề xuất kiến trúc (Proposals), và sử dụng hiệu quả bộ nhớ riêng của con người (`.human/`).

---

## 1. Bản Đồ Nơi Lưu Trữ Tri Thức Dự Án

Hệ thống phân tách rạch ròi giữa **Tài liệu sống của dự án**, **Tài liệu vận hành Sprint**, và **Bộ nhớ riêng của con người**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. TÀI LIỆU SỐNG ĐANG CÓ HIỆU LỰC (Single Source of Truth - SSOT)      │
│    Vị trí: .document/current/                                          │
│    Chứa: Kiến trúc hiện hành (ARCHITECTURE.md), Mô hình thực thể,       │
│          Hợp đồng API (API_CONTRACTS.md), Bản đồ hệ thống (SYSTEM_MAP) │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. QUẢN LÝ VÒNG ĐỜI SPRINT (Scrum Sprint Artifacts)                    │
│    - .document/sprints/active/    ──> Sprint DUY NHẤT đang chạy        │
│    - .document/sprints/planned/   ──> Các Sprint đã duyệt hoặc dự kiến │
│    - .document/sprints/completed/ ──> Các Sprint đã nghiệm thu xong    │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. ĐỀ XUẤT KIẾN TRÚC & SAI LỆCH PHÁT SINH (Proposals & Drifts)         │
│    - .ai/changes/proposals/ ──> PROP-XXX.md (Đề xuất thay đổi dùng chung│
│    - .ai/changes/drift/     ──> DRIFT-XXX.md (Báo cáo code lệch tài liệu│
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 4. BỘ NHỚ & KHÔNG GIAN RIÊNG CỦA HUMAN (Human Memory Workspace)        │
│    - .human/backlog/   ──> Ý tưởng chưa làm ngay (AI cấm tự ý code)    │
│    - .human/decisions/ ──> Quyết định nội bộ giữa các lập trình viên   │
│    - .human/notes/     ──> Ghi chú kỹ thuật dùng chung                 │
│    - .human/history/   ──> Nhật ký mốc tiến độ dự án                   │
│    - .human/local/     ──> Không gian máy cá nhân (.gitignore bảo vệ)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Khi Nào Tạo Mới Và Khi Nào Cập Nhật File Hiện Có?

Theo quy tắc Single Source of Truth (`.document/RULES.md`):
- **Không bao giờ tạo 2 file cùng nói về một chủ đề**: Nếu dự án đã có `.document/current/ARCHITECTURE.md`, mọi thay đổi kiến trúc phải được cập nhật trực tiếp vào file này (sau khi Human duyệt), không tạo thêm `ARCHITECTURE_v2.md` hay `NEW_ARCHITECTURE.md`.
- **Khi nào tạo file mới**:
  - Khi bắt đầu một Sprint mới: Tạo `.document/sprints/active/SPRINT-XXX.md`.
  - Khi phát sinh một đề xuất kiến trúc mới: Tạo `.ai/changes/proposals/PROP-XXX.md`.
  - Khi có quyết định kiến trúc trọng đại cần lưu vết lịch sử: Tạo file Architectural Decision Record (ADR) trong `.document/templates/governance/` hoặc `.document/current/decisions/`.
- **Khi nào cập nhật file hiện có**:
  - Khi task hoàn thành làm thay đổi API contract: Cập nhật trực tiếp vào `.document/current/API_CONTRACTS.md`.
  - Khi kết thúc Sprint: Di chuyển file từ `active/` sang `completed/` và cập nhật frontmatter `STATUS: COMPLETED`.

---

## 3. Quản Lý & Phê Duyệt Đề Xuất (Proposals Management)

### Phân Biệt Giữa Đề Xuất Và Quyết Định Đã Duyệt:
$$\mathbf{ĐỀ\ XUẤT\ (PROP-XXX)} \neq \mathbf{QUYẾT\ ĐỊNH\ ĐÃ\ DUYỆT\ (APPROVED\ DECISION)} \neq \mathbf{TASK\ CODE}$$

1. **Đề xuất (Proposal)**: Chỉ là ý kiến kỹ thuật do AI hoặc Human phát hiện khi làm việc. Đề xuất chưa có hiệu lực thi hành và chưa được phép đưa vào code.
2. **Quy trình Human phê duyệt đề xuất**:
   - Mở file `.ai/changes/proposals/PROP-XXX.md`.
   - Xem xét bài toán, giải pháp đề xuất, rủi ro và breaking change.
   - Điền phán quyết của bạn vào trường `HUMAN_DECISION`:
     - **`APPROVE`**: Bạn chấp thuận. Bạn sẽ đưa đề xuất này thành một Task chính thức ở Sprint tiếp theo.
     - **`REJECT`**: Từ chối, ghi rõ lý do để AI không lặp lại.
     - **`DEFER`**: Ý tưởng tốt nhưng tạm hoãn, chuyển vào `.human/backlog/`.

---

## 4. Xử Lý Khi Phát Hiện Tài Liệu Sai Lệch Hoặc Mâu Thuẫn

Khi mã nguồn thực tế khác với tài liệu thiết kế:
- **Nếu code sai lệch ngoài ý muốn**: AI tạo báo cáo `DRIFT-XXX.md` và dừng lại. Bạn yêu cầu AI sửa code cho khớp tài liệu thiết kế đã duyệt.
- **Nếu tài liệu thiết kế đã lỗi thời**: Bạn yêu cầu AI tạo đề xuất `PROP-XXX.md` để cập nhật tài liệu. Sau khi bạn phê duyệt, tài liệu gốc trong `.document/current/` mới được cập nhật.
- **Tuyệt đối cấm**: AI tự ý sửa code cho khớp tài liệu hoặc tự ý sửa tài liệu cho khớp code mà không có chỉ thị rõ ràng của bạn.

---

## 5. Sử Dụng Bộ Nhớ Riêng Của Human (`.human/`)

Để đảm bảo các ý tưởng và ghi chú của bạn không bị thất lạc trong các cuộc trò chuyện chat:

1. **Ý tưởng tính năng tương lai**:
   - Lưu vào `.human/backlog/IDEA-XXX-<tên-ý-tưởng>.md`.
   - Rào chắn an toàn: AI bị cấm tuyệt đối tự ý lấy nội dung trong `backlog/` để code nếu bạn chưa yêu cầu.
2. **Thỏa thuận nội bộ giữa 2 lập trình viên**:
   - Ghi lại vào `.human/decisions/DECISION-YYYYMMDD.md` (ví dụ: quy ước phân chia ca trực, thỏa thuận đổi port dev).
3. **Ghi chú máy cá nhân**:
   - Lưu vào `.human/local/`. Thư mục này nằm trong `.gitignore`, giúp bạn lưu các script thử nghiệm riêng tư mà không sợ đẩy lên GitHub gây conflict với đồng đội.
