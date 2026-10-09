# DRIFT-XXX: [Tiêu Đề Báo Cáo Sai Lệch / Drift Report Title]

```yaml
DRIFT_ID: DRIFT-XXX
TITLE: [Tiêu đề ngắn gọn về sai lệch phát hiện giữa code và tài liệu]
DETECTED_DATE: YYYY-MM-DD
DETECTED_BY: SESSION-XXX # Phiên tác nghiệp phát hiện
SOURCE_BRANCH: TASK # MAIN | DEVELOP | TASK
RELATED_TASK: TASK-XXX # Hoặc NONE
DOCUMENT_REFERENCE: .document/... # Đường dẫn tài liệu bị sai lệch
CODE_REFERENCE: src/... # Tệp mã nguồn thực tế khác với tài liệu
STATUS: PENDING_HUMAN_REVIEW # DETECTED | PENDING_HUMAN_REVIEW | RESOLVED | REJECTED
```

---

## 1. TIÊU ĐỀ (TITLE)
[Tên đầy đủ và định danh của báo cáo sai lệch]

## 2. NGÀY PHÁT HIỆN (DETECTED_DATE)
YYYY-MM-DD

## 3. PHIÊN PHÁT HIỆN (DETECTED_BY)
[Mã Session hoặc bối cảnh tác nghiệp hiện tại, ví dụ: SESSION-003]

## 4. TÀI LIỆU VÀ MÃ NGUỒN LIÊN QUAN
- **Tài liệu đặc tả**: `[Đường dẫn file tài liệu trong .document/]`
- **Mã nguồn thực tế**: `[Đường dẫn file mã nguồn trong src/]`
- **Nhiệm vụ liên quan**: `[TASK-XXX hoặc NONE]`

## 5. MÔ TẢ SAI LỆCH (DISCREPANCY DESCRIPTION)
- **Tài liệu mô tả**:
  > [Trích dẫn hoặc tóm tắt quy định/thiết kế trong tài liệu hiện tại]
- **Mã nguồn thực tế hiện có**:
  > [Mô tả hiện trạng code thực tế đang hoạt động khác với tài liệu]

## 6. PHÂN TÍCH TÁC ĐỘNG (IMPACT ANALYSIS)
[Sai lệch này ảnh hưởng thế nào đến các module, hợp đồng API, kiểm thử hoặc các task khác?]

## 7. HÀNH ĐỘNG DỪNG CỦA AI (HALT ACTION)
- **Trạng thái an toàn hiện tại**: [AI đã dừng lại ở đâu, giữ nguyên code hay tài liệu?]
- **Nguyên tắc an toàn**: AI tuyệt đối không tự ý sửa code cho khớp tài liệu hoặc tự ý sửa tài liệu cho khớp code.

## 8. KHUYẾN NGHỊ CỦA AI (AI RECOMMENDATION)
- **Phương án 1**: Giữ mã nguồn hiện tại và cập nhật tài liệu `.document/` (nếu mã nguồn phản ánh cải tiến đúng đắn).
- **Phương án 2**: Sửa lại mã nguồn để tuân thủ tài liệu thiết kế (nếu mã nguồn vi phạm hợp đồng đã chốt).
- **Đề xuất cụ thể**: [AI đề xuất phương án tối ưu cho con người]

## 9. QUYẾT ĐỊNH CỦA CON NGƯỜI (HUMAN DECISION)
- **Quyết định**: `PENDING_REVIEW` | `UPDATE_DOCUMENT` | `UPDATE_CODE` | `DISMISS`
- **Người đánh giá**: [Tên Human Developer]
- **Ngày đánh giá**: YYYY-MM-DD
- **Chỉ đạo thực hiện**: [Ghi chú chỉ đạo từ Con người về hướng xử lý]
