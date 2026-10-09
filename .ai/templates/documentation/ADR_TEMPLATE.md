# ADR_TEMPLATE.md

> **Mục Đích Tài Liệu**: Ghi nhận một quyết định kiến trúc hoặc kỹ thuật quan trọng của dự án: bối cảnh, bài toán cần giải quyết, các phương án đã xem xét, quyết định được chọn, lý do lựa chọn, hệ quả kéo theo, và phê duyệt chính thức từ Con người.  
> **Khi Nào Sử Dụng**: Bất cứ khi nào nhóm đưa ra quyết định kỹ thuật có tầm ảnh hưởng lâu dài hoặc thay đổi cấu trúc nền tảng (lưu tại `.document/decisions/ADR/ADR-XXX.md`).  
> **Mục Bắt Buộc**: Mã quyết định (ADR-XXX), Tiêu đề, Trạng thái, Bối cảnh, Quyết định, Hệ quả, Phê duyệt từ Con người.  
> **Mục Tùy Chọn**: Các phương án thay thế bị từ chối, Các quyết định liên quan.  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `ARCHITECTURE.md` và các file task/proposal có liên quan.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Trạng thái bắt buộc gồm `PROPOSED`, `ACCEPTED`, `REJECTED`, `DEPRECATED`, `SUPERSEDED`. Không tự ý đánh dấu `ACCEPTED` nếu chưa có sự phê duyệt rõ ràng từ Human.

---

# ADR-XXX: [Tiêu Đề Quyết Định Kiến Trúc / Decision Title]

```yaml
ADR_ID: ADR-XXX
TITLE: [Tiêu đề ngắn gọn của quyết định]
STATUS: ACCEPTED # PROPOSED | ACCEPTED | REJECTED | DEPRECATED | SUPERSEDED
DATE: YYYY-MM-DD
DECIDED_BY: [Tên Human Developer phê duyệt]
AFFECTED_COMPONENTS: [Danh sách các module hoặc tầng bị ảnh hưởng]
RELATED_ADRS: []
```

## 1. Trạng Thái (Status)
`ACCEPTED` *(hoặc: PROPOSED | REJECTED | SUPERSEDED bởi ADR-YYY)*

## 2. Bối Cảnh (Context)
[Mô tả tình huống, thách thức kỹ thuật, hoặc vấn đề mà dự án đang đối mặt cần đưa ra quyết định này]

## 3. Vấn Đề Cần Giải Quyết (Problem Statement)
[Câu hỏi hoặc bài toán kỹ thuật cốt lõi cần được giải quyết dứt khoát]

## 4. Các Phương Án Đã Xem Xét (Options Considered)
### Phương Án 1: [Tên Phương Án 1]
- **Ưu điểm**: [...]
- **Nhược điểm**: [...]
- **Kết luận**: [Được chọn / Bị từ chối vì lý do...]

### Phương Án 2: [Tên Phương Án 2]
- **Ưu điểm**: [...]
- **Nhược điểm**: [...]
- **Kết luận**: [Được chọn / Bị từ chối vì lý do...]

## 5. Quyết Định Được Chọn (Decision)
[Mô tả chi tiết giải pháp kỹ thuật chính thức được lựa chọn áp dụng]

## 6. Lý Do Lựa Chọn (Rationale)
[Tại sao phương án này được chọn thay vì các phương án khác? Lợi ích vượt trội về dài hạn?]

## 7. Hệ Quả & Tác Động (Consequences)
- **Tích cực (Positive)**: [Những lợi ích hệ thống thu được]
- **Tiêu cực / Đánh đổi (Negative / Trade-offs)**: [Những ràng buộc hoặc chi phí phát sinh cần chấp nhận]
- **Rủi ro cần theo dõi (Risks)**: [Các rủi ro kỹ thuật cần lưu ý]

## 8. Thành Phần Bị Ảnh Hưởng (Affected Components)
- [Module A / Tệp tin X]
- [Module B / Hợp đồng Y]

## 9. Phê Duyệt Của Con Người (Human Approval)
- **Người phê duyệt**: [Tên Human Developer]
- **Ngày phê duyệt**: YYYY-MM-DD
- **Ghi chú**: [Chỉ đạo triển khai từ Human]
