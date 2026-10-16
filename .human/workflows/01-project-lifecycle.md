# Vòng Đời Toàn Diện Của Dự Án (.human/workflows/01-project-lifecycle.md)

Tài liệu này mô tả bức tranh tổng thể về các giai đoạn phát triển của một dự án phần mềm theo mô hình Scrum được quản trị bởi hệ thống Document Lifecycle (`.document/`) và AI Operating Protocol (`.ai/`).

---

## 1. Sơ Đồ Vòng Đời Dự Án Tổng Thể

Vòng đời của một dự án đi qua 4 giai đoạn tiến hóa liên tục:

```
┌────────────────────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 1: KHỞI TẠO & ĐỊNH HÌNH KIẾN TRÚC (Project Inception)       │
│ - Human mô tả tầm nhìn & ý tưởng sản phẩm                              │
│ - AI phân tích, làm rõ, xác định công nghệ & ranh giới ban đầu         │
│ - Human phê duyệt cấu trúc dự án & chiến lược kiểm thử                  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 2: CHU TRÌNH SPRINT TUẦN HOÀN (Sprint Iteration Loop)        │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ A. Yêu cầu & Làm rõ (Discovery & Clarification)                │   │
│   │    ↓                                                           │   │
│   │ B. Thiết kế Kế hoạch Sprint (Sprint Planning & Multi-Sprint)   │   │
│   │    ↓                                                           │   │
│   │ C. Human Review & Phê Duyệt Kế Hoạch (Approval Gate)           │   │
│   │    ↓                                                           │   │
│   │ D. Tạo Tài Liệu Sprint (active/SPRINT-XXX.md)                  │   │
│   │    ↓                                                           │   │
│   │ E. Thực Hiện Sprint (Đa tác tử trên task/*)                    │   │
│   │    ↓                                                           │   │
│   │ F. Đánh Giá, Nghiệm Thu & Đóng Sprint (Review & Closure)       │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │ Lặp lại qua từng Sprint           │
│                                    ▼                                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 3: PHÁT HÀNH TÍCH HỢP (Release & Milestone)                  │
│ - Tích hợp toàn diện trên develop                                      │
│ - Kiểm thử hồi quy hệ thống (End-to-End, Visual Test)                  │
│ - Human merge develop vào main & gắn tag phiên bản (v1.0.0,...)        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 4: TIẾN HÓA, BẢO TRÌ & LƯU TRỮ (Evolution & Archiving)       │
│ - Cập nhật tài liệu sống trong .document/current/                      │
│ - Lưu trữ Sprint cũ vào .document/sprints/completed/                   │
│ - Chuyển tài liệu lỗi thời sang .document/archive/                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Chi Tiết Các Giai Đoạn Phát Triển

### Giai Đoạn 1: Khởi Tạo Dự Án (Project Inception)
- **Mục tiêu**: Thiết lập nền tảng sản phẩm từ con số 0.
- **Nơi thực hiện**: Trên nhánh `main` (không viết code vào `/src/`).
- **Hoạt động của Human**:
  - Cung cấp mô tả sản phẩm, đối tượng người dùng, tính năng chính.
  - Phê duyệt stack công nghệ và các quy tắc kiểm thử nền tảng.
- **Hoạt động của AI**:
  - Đặt câu hỏi làm rõ qua hội thoại trực tiếp.
  - Phân loại 5 cấp độ thông tin (`[Human-Requested]`, `[Approved Decision]`, `[AI-Proposed]`, `[Unverified Assumption]`, `[Pending Question]`).
  - Đề xuất bản phác thảo kiến trúc ban đầu.
- **Sản phẩm bàn giao**: Quyết định phê duyệt của Human để bước vào Sprint 1.

### Giai Đoạn 2: Chu Trình Sprint Tuần Hoàn (Scrum Sprint Loop)
Dự án được phân rã thành các Sprint ngắn hạn (thường từ 3 đến 5 task kỹ thuật). Mỗi Sprint tuân thủ nghiêm ngặt 6 giai đoạn (A $\to$ F) theo chuẩn `.document/WORKFLOW.md`:
- **Giai đoạn A (Discovery)**: Làm rõ các tính năng của Sprint.
- **Giai đoạn B (Planning)**: Lên danh mục In-Scope, Out-of-Scope, Acceptance Criteria và rủi ro.
- **Giai đoạn C (Approval)**: Human trực tiếp phê duyệt bản kế hoạch.
- **Giai đoạn D (Documentation)**: Khởi tạo tài liệu Sprint chính thức tại `.document/sprints/active/`.
- **Giai đoạn E (Execution)**: Các phiên AI thực hiện song song từng task trên các nhánh `task/TASK-XXX-*`.
- **Giai đoạn F (Closure)**: Chạy test hồi quy, Human nghiệm thu, di chuyển Sprint vào `.document/sprints/completed/`.

### Giai Đoạn 3: Phát Hành Mốc Phiên Bản (Release & Milestone)
Khi một hoặc một số Sprint đạt được mục tiêu tính năng hoàn chỉnh có thể phát hành cho người dùng:
1. Toàn bộ mã nguồn đã được tích hợp ổn định trên nhánh `develop`.
2. Kiểm tra bộ 4 lệnh bắt buộc đạt 100% pass: `typecheck`, `lint`, `test:run`, `build`.
3. Human kiểm tra trực quan trên trình duyệt bằng lệnh `npm run dev`.
4. Human tự tay thực hiện merge `develop` vào `main`:
   ```bash
   git checkout main
   git merge --no-ff develop -m "Release Milestone: version 0.1.0"
   git tag -a v0.1.0 -m "Release version 0.1.0"
   git push origin main --tags
   ```

### Giai Đoạn 4: Tiến Hóa & Lưu Trữ (Evolution & Archiving)
- **Cập nhật tài liệu sống (Current Docs)**: Mọi thay đổi kiến trúc hoặc hợp đồng API thực tế được cập nhật vào `.document/current/`. Đây là Single Source of Truth hiện hành.
- **Lưu trữ lịch sử (Archive)**:
  - Các Sprint đã xong được chuyển vào `.document/sprints/completed/`.
  - Các tài liệu thiết kế cũ không còn dùng được gắn nhãn `STATUS: DEPRECATED` hoặc chuyển vào `.document/archive/`.
  - Tài liệu trong `archive/` không bao giờ được coi là yêu cầu hiện hành.

---

## 3. Các Ranh Giới Quyền Hạn Không Thể Vi Phạm

| Hành động | Ai được phép thực hiện? | Ghi chú an toàn |
| :--- | :--- | :--- |
| Đặt mục tiêu & Thay đổi phạm vi | **Chỉ Con người** | AI chỉ được đề xuất, không tự ý mở rộng scope. |
| Phê duyệt kế hoạch Sprint | **Chỉ Con người** | Kế hoạch chưa duyệt cấm tự động chuyển sang ACTIVE. |
| Viết mã nguồn vào `/src/` | **Chỉ AI trên nhánh `task/*`** | Nhánh `main` và `develop` cấm tuyệt đối sửa `/src/`. |
| Merge nhánh Git vào `develop` / `main` | **Chỉ Con người** | AI tuyệt đối cấm chạy lệnh merge vào các nhánh chung. |
| Chuyển trạng thái task thành `DONE` | **Chỉ Con người** | AI chỉ được đánh dấu tối đa là `READY_FOR_REVIEW`. |
| Đóng Sprint | **Chỉ Con người** | Phải có biên bản xác minh 100% AC có bằng chứng kiểm thử đạt. |

---

## 4. Tài Liệu Hướng Dẫn Chi Tiết Cho Từng Khâu

- Để xem chi tiết quy trình làm rõ yêu cầu và lập kế hoạch Sprint: Đọc [02-requirements-and-sprint-planning.md](02-requirements-and-sprint-planning.md).
- Để xem quy trình phân nhánh, giao task và review mã nguồn: Đọc [03-task-execution-and-review.md](03-task-execution-and-review.md).
- Để xem quy trình nghiệm thu và chuyển tiếp sang Sprint tiếp theo: Đọc [04-sprint-review-and-next-sprint.md](04-sprint-review-and-next-sprint.md).

