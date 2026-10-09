# PROP-XXX: [Tiêu Đề Đề Xuất / Proposal Title]

```yaml
PROP_ID: PROP-XXX
TITLE: [Tiêu đề ngắn gọn của đề xuất]
CREATED: YYYY-MM-DD
CREATED_BY: SESSION-XXX # Phiên tác nghiệp phát hiện (Session/Context hiện tại, không dùng định danh tĩnh)
SOURCE: TASK # MAIN | DEVELOP | TASK
RELATED_TASK: TASK-XXX # Mã task liên quan hoặc NONE
STATUS: PENDING_HUMAN_REVIEW # CREATED | PENDING_HUMAN_REVIEW | APPROVED | REJECTED | DEFERRED
BREAKING_CHANGE: NO # YES | NO
BLOCKS_CURRENT_TASK: NO # YES | NO (Nếu YES, AI phải dừng phần triển khai bị ảnh hưởng)
```

---

## 1. TIÊU ĐỀ (TITLE)
[Tên đầy đủ và định danh của đề xuất]

## 2. NGÀY TẠO (CREATED)
YYYY-MM-DD

## 3. TÁC GIẢ TẠO (CREATED_BY)
[Mã Session hoặc bối cảnh tác nghiệp hiện tại, ví dụ: SESSION-002. Tuyệt đối không dùng danh tính vĩnh viễn như AGENT_A / AGENT_B.]

## 4. NGUỒN PHÁT HIỆN (SOURCE)
[MAIN | DEVELOP | TASK - Nhánh hoặc vai trò nơi phát hiện ra vấn đề]

## 5. NHIỆM VỤ LIÊN QUAN (RELATED_TASK)
[TASK-XXX hoặc NONE]

## 6. TRẠNG THÁI (STATUS)
`PENDING_HUMAN_REVIEW` *(Hoặc: CREATED | APPROVED | REJECTED | DEFERRED)*

---

## 7. VẤN ĐỀ PHÁT HIỆN (PROBLEM)
[Mô tả chi tiết khó khăn, bất cập, nút thắt cổ chai hoặc điểm bất hợp lý hiện tại]

## 8. THIẾT KẾ HIỆN TẠI (CURRENT_DESIGN)
[Mô tả kiến trúc, luồng xử lý hoặc hợp đồng API đang được áp dụng hiện nay]

## 9. ĐỀ XUẤT THAY ĐỔI (PROPOSED_CHANGE)
[Mô tả thiết kế, giải pháp, interface hoặc quy trình mới được đề xuất. Không viết mã triển khai hoàn chỉnh vào proposal trừ khi cần một đoạn code minh họa ngắn để làm rõ ý tưởng.]

## 10. LÝ DO ĐỀ XUẤT (REASON)
[Tại sao giải pháp mới tốt hơn thiết kế hiện tại? Mang lại lợi ích gì về mặt bảo trì, hiệu năng, mở rộng hoặc an toàn mã nguồn?]

## 11. HỆ THỐNG BỊ ẢNH HƯỞNG (AFFECTED_SYSTEMS)
[Các module, tầng kiến trúc, thư viện hoặc hệ thống con liên quan]

## 12. TỆP TIN BỊ ẢNH HƯỞNG (AFFECTED_FILES)
[Danh sách các tệp dự kiến sẽ phải thay đổi nếu đề xuất được chấp thuận]

## 13. NHIỆM VỤ BỊ ẢNH HƯỞNG (AFFECTED_TASKS)
[Các task hiện tại hoặc tương lai bị ảnh hưởng hoặc cần đồng bộ]

## 14. TÁC ĐỘNG HỢP ĐỒNG API (API / INTERFACE IMPACT)
[Những thay đổi cụ thể đối với giao diện công khai, type definitions, method signatures]

## 15. CÓ PHÁ VỠ TƯƠNG THÍCH KHÔNG (BREAKING_CHANGE)
`YES` / `NO`

## 16. CÓ CHẶN NHIỆM VỤ HIỆN TẠI KHÔNG (BLOCKS_CURRENT_TASK)
`YES` / `NO`
> *(Nếu YES: AI phải đánh dấu task bị nghẽn, dừng phần việc triển khai bị ảnh hưởng, commit proposal riêng biệt, push lên remote và chờ phán quyết của Con người. Không được tự ý chế workaround để tránh dừng việc).*

## 17. RỦI RO TIỀM ẨN (RISKS)
[Các nguy cơ phát sinh lỗi, phức tạp hóa hệ thống hoặc ảnh hưởng hiệu năng]

## 18. TÁC ĐỘNG KIỂM THỬ (TEST_IMPACT)
[Các ca kiểm thử cần viết mới, cập nhật hoặc kiểm thử hồi quy cần chạy]

## 19. KHUYẾN NGHỊ CỦA AI (RECOMMENDED_ACTION)
[Đề xuất bước đi tiếp theo của AI cho Lập trình viên Con người xem xét]

## 20. QUYẾT ĐỊNH CỦA CON NGƯỜI (HUMAN_DECISION)
- **Quyết định**: `PENDING_REVIEW` | `APPROVED` | `REJECTED` | `DEFERRED`
- **Người đánh giá**: [Tên Human Developer]
- **Ngày đánh giá**: YYYY-MM-DD
- **Chỉ đạo thực hiện**: [Ghi chú chỉ đạo từ Con người - Ví dụ: Tạo TASK-025 để triển khai đề xuất này]
