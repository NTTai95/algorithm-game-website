# Sprint Lifecycle Schema (sprint-schema.md)

Schema quy định trạng thái và quy tắc chuyển dịch vòng đời của một Sprint trong Scrum Document Lifecycle System.

---

## 1. Vòng Đời Trạng Thái Sprint (State Machine)

```
[PLANNED / IDEA]  (Kế hoạch dự kiến, linh hoạt)
       ↓ (Human review & approve)
  [APPROVED]      (Đã chốt scope, sẵn sàng kích hoạt)
       ↓ (Kích hoạt Sprint)
   [ACTIVE]       (Đang thực hiện — TỐI ĐA 1 SPRINT)
       ↓ (Hoàn thành implementation, chuyển sang kiểm tra)
  [REVIEWING]     (Đang xác minh 100% AC)
       ↓ (Human nghiệm thu)
  [COMPLETED]     (Lưu trữ vào sprints/completed/)
```

*Nhánh hủy bỏ*: Bất kỳ Sprint nào ở trạng thái `PLANNED`, `APPROVED` hoặc `ACTIVE` đều có thể chuyển sang `CANCELLED` nếu Human quyết định dừng hoặc thay đổi chiến lược.

---

## 2. Chi Tiết Các Trạng Thái

| Trạng thái | Vị trí lưu trữ | Ràng buộc số lượng | Quyền hạn triển khai |
| :--- | :--- | :--- | :--- |
| `PLANNED` | `sprints/planned/` | Không giới hạn | **CẤM CODE**: Chỉ là kế hoạch dự kiến hoặc ý tưởng tương lai. |
| `APPROVED` | `sprints/planned/` | Tùy chọn | **CẤM CODE**: Đã được Human duyệt nhưng chưa đến lượt làm. |
| `ACTIVE` | `sprints/active/` | **DUY NHẤT 1 SPRINT** | **ĐƯỢC CODE**: Task của Sprint này được phép triển khai trên nhánh `task/*`. |
| `REVIEWING` | `sprints/active/` | Tối đa 1 | **ĐÓNG CODE**: Chỉ chạy test, verify AC và lập review report. |
| `COMPLETED` | `sprints/completed/` | Không giới hạn | **LƯU TRỮ**: Sprint đã kết thúc, không được sửa đổi. |
| `CANCELLED` | `archive/sprints/` | Không giới hạn | **LƯU TRỮ**: Sprint bị hủy bỏ kèm lý do. |

---

## 3. Quy Tắc Chuyển Dịch Hợp Lệ

1. **Từ `PLANNED` sang `APPROVED`**:
   - Yêu cầu: Đã hoàn thiện mục tiêu, in/out scope, Acceptance Criteria và được Human xác nhận qua chat.
2. **Từ `APPROVED` sang `ACTIVE`**:
   - Yêu cầu: Thư mục `sprints/active/` hiện đang TRỐNG (Sprint trước đó đã hoàn tất và chuyển sang `completed/`).
   - Hành động: Di chuyển file Sprint từ `sprints/planned/` sang `sprints/active/`.
3. **Từ `ACTIVE` sang `REVIEWING`**:
   - Yêu cầu: Tất cả task trong Sprint đã hoàn thành triển khai mã nguồn.
4. **Từ `REVIEWING` sang `COMPLETED`**:
   - Yêu cầu: Đã xác minh 100% Acceptance Criteria có bằng chứng kiểm thử đạt, có file Sprint Review và Human nghiệm thu xác nhận đóng Sprint.
   - Hành động: Di chuyển file Sprint từ `sprints/active/` sang `sprints/completed/`.
