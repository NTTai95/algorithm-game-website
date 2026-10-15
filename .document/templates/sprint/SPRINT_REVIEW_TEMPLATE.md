# Biên Bản Review & Nghiệm Thu Sprint: {{SPRINT_ID}}

```yaml
DOCUMENT_ID: REVIEW-{{SPRINT_ID}}
DOCUMENT_TYPE: SPRINT_REVIEW
STATUS: DRAFT # DRAFT | CONFIRMED
LAST_UPDATED: {{DATE}}
OWNER: {{OWNER}}
SPRINT: {{SPRINT_ID}}
DEPENDS_ON: [{{SPRINT_ID}}]
```

---

## 1. Kết Quả Thực Tế Đạt Được (Actual Deliverables)
- **Tóm tắt kết quả**: {{Mô tả ngắn gọn những gì đã hoàn thành trong Sprint}}
- **So sánh với mục tiêu ban đầu**: {{Đạt / Đạt một phần / Không đạt — kèm lý do}}

---

## 2. Bảng Xác Minh Tiêu Chí Chấp Nhận (Acceptance Criteria Verification)

| Mã AC | Tiêu chí nghiệm thu | Trạng thái | Bằng chứng kiểm chứng (Test results / Evidence) |
| :--- | :--- | :--- | :--- |
| `AC-1` | {{Nội dung AC 1}} | ĐẠT / CHƯA ĐẠT | {{Lệnh test, file test hoặc screenshot kiểm tra}} |
| `AC-2` | {{Nội dung AC 2}} | ĐẠT / CHƯA ĐẠT | {{Bằng chứng}} |

---

## 3. Báo Cáo Kiểm Thử & Verification Gates

- **Kiểm tra kiểu dữ liệu / cú pháp**: {{Lệnh chạy + kết quả (0 errors)}}
- **Kiểm tra linter**: {{Lệnh chạy + kết quả (0 errors)}}
- **Kiểm thử tự động**: {{Số lượng test pass / fail; danh sách test suites đã chạy}}
- **Kiểm tra đóng gói / build**: {{Thành công / Thất bại}}

> **Lưu ý**: Phân biệt rõ giữa *test đã thực thi thành công* và *test chưa chạy hoặc chỉ kiểm tra thủ công*.

---

## 4. Giới Hạn, Nợ Kỹ Thuật & Vấn Đề Tồn Đọng (Limitations & Technical Debt)
- **Giới hạn hiện tại**: {{Những gì chưa làm được hoặc tính năng bị cắt giảm}}
- **Nợ kỹ thuật ghi nhận**: {{Những điểm cần refactor hoặc tối ưu ở Sprint sau}}
- **Bugs chưa giải quyết**: {{Mô tả bug nhỏ nếu có và kế hoạch khắc phục}}

---

## 5. Tác Động Đến Lộ Trình Sprint Tiếp Theo (Impact on Next Sprints)
- **Đánh giá lại Sprint kế tiếp**: {{Sprint kế tiếp có cần điều chỉnh scope hay không dựa trên kết quả thực tế này}}
- **Đề xuất cho Sprint sau**: {{Các task cần ưu tiên}}

---

## 6. Xác Nhận Nghiệm Thu Của Human (Human Sign-off)
- **Trạng thái nghiệm thu**: [ ] CHẤP THUẬN ĐÓNG SPRINT / [ ] YÊU CẦU ĐIỀU CHỈNH
- **Ghi chú của Human**: {{Ý kiến chỉ đạo hoặc quyết định của Human}}
