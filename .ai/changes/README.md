# Hệ Thống Quản Lý Đề Xuất Thay Đổi & Báo Cáo Sai Lệch (Changes & Drift)

Thư mục này quản lý hai luồng tài liệu kỹ thuật quan trọng nhằm bảo vệ tính toàn vẹn kiến trúc của dự án:
1. **Đề xuất thay đổi có chủ đích (Change Proposals)** nằm trong `proposals/`
2. **Báo cáo sai lệch giữa mã nguồn và tài liệu (Drift Reports)** nằm trong `drift/`

```
.ai/changes/
├── README.md               # Tài liệu này
├── proposals/              # Chứa các file PROP-XXX.md
└── drift/                  # Chứa các file DRIFT-XXX.md
```

---

## 1. Hệ Thống Đề Xuất Thay Đổi (Change Proposal System)
Khi một AI trong quá trình làm việc phát hiện nhu cầu cần thay đổi kiến trúc, thêm thư viện, sửa hợp đồng API công khai, hoặc mở rộng phạm vi ra ngoài task, AI **CẤM tự ý triển khai ngầm**.

AI phải tạo tệp `.ai/changes/proposals/PROP-XXX.md` với các trường:
- **Mã đề xuất**: `PROP-XXX`
- **Tiêu đề & Tác giả**: Tiêu đề và Session ID đề xuất.
- **Vấn đề gặp phải (Problem)**: Khó khăn hoặc điểm bất hợp lý hiện tại.
- **Thiết kế hiện tại (Current Design)**: Kiến trúc hoặc API đang áp dụng.
- **Thay đổi đề xuất (Proposed Change)**: Thiết kế hoặc giải pháp mới.
- **Lý do (Reason)**: Tại sao giải pháp mới tốt hơn.
- **Hệ thống bị ảnh hưởng (Affected Systems)**: Các module, lớp, thư mục liên quan.
- **Task bị ảnh hưởng (Affected Tasks)**: Các task khác có thể bị tác động.
- **Có phá vỡ tương thích không (Breaking Change)**: `YES` / `NO`.
- **Rủi ro (Risks)**: Nguy cơ tiềm ẩn.
- **Yêu cầu kiểm thử (Tests Required)**: Các ca test cần bổ sung.
- **Khuyến nghị của AI (Recommendation)**: Lời khuyên kỹ thuật.
- **Trạng thái (Status)**: `PROPOSED` | `ACCEPTED` | `REJECTED`.

---

## 2. Hệ Thống Báo Cáo Sai Lệch Tài Liệu (Drift System)
Khi AI phát hiện mã nguồn thực tế và tài liệu thiết kế trong `.ai/` không thống nhất:
- **CẤM** tự ý sửa code cho khớp tài liệu.
- **CẤM** tự ý sửa tài liệu cho khớp code.
- **CẤM** tự đoán bên nào đúng hơn.

AI phải tạo tệp `.ai/changes/drift/DRIFT-XXX.md` ghi nhận:
- **Mã báo cáo**: `DRIFT-XXX`
- **Kỳ vọng theo tài liệu (Document Expectation)**: Trích dẫn phần tài liệu quy định.
- **Hiện thực hóa trong code (Actual Implementation)**: Trích dẫn vị trí và đoạn mã thực tế.
- **Điểm sai lệch cụ thể (Exact Mismatch)**: Phân tích sự sai khác.
- **Hệ thống bị ảnh hưởng (Affected Systems)**: Những phần nào có thể bị lỗi do sai lệch này.
- **Hậu quả tiềm ẩn (Possible Consequences)**: Tác động nếu không được xử lý.

---

## 3. Quy Trình 4 Bước Tất Định
Trong cả hai trường hợp trên, AI **BẮT BUỘC** dừng việc viết mã và tuân thủ:
$$\mathbf{DETECT} \longrightarrow \mathbf{DOCUMENT} \longrightarrow \mathbf{STOP} \longrightarrow \mathbf{HUMAN\ DECISION}$$
Lập trình viên con người sẽ đưa ra quyết định xử lý và điều phối task tương ứng.
