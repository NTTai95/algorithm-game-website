# Quản Lý Sprints (.document/sprints)

Thư mục quản lý vòng đời Sprint theo mô hình Scrum.

---

## Cấu trúc thư mục

```
sprints/
├── active/       ← Chứa DUY NHẤT 1 Sprint đang triển khai (SPRINT-XXX.md)
├── planned/      ← Chứa các Sprint dự kiến hoặc đã duyệt nhưng chưa bắt đầu
└── completed/    ← Chứa các Sprint đã nghiệm thu hoàn thành và đóng lại
```

---

## Quy tắc quan trọng

1. **Khởi tạo trống**: Khi bắt đầu một dự án mới, cả 3 thư mục `active/`, `planned/`, `completed/` đều để trống.
2. **Quy tắc Duy nhất 1 Active Sprint**:
   - Tại bất kỳ thời điểm nào, thư mục `active/` chỉ được chứa tối đa 1 file Sprint.
   - Không kích hoạt Sprint mới khi Sprint hiện tại chưa chuyển sang `completed/`.
3. **Multi-Sprint Planning**:
   - Khi Human yêu cầu lên kế hoạch 2–3 Sprint, các Sprint tiếp theo được lưu trong `planned/` với trạng thái `PLANNED` hoặc `APPROVED`.
   - AI **tuyệt đối không được triển khai code** cho các file nằm trong `planned/`.
