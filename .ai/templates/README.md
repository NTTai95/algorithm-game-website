# Danh Mục Template Dùng Chung Cho AI (.ai/templates)

Thư mục này chứa tất cả các biểu mẫu (templates) chuẩn hóa phục vụ cho hoạt động của AI và dự án. Các template này được thiết kế theo cấu trúc module, độc lập với ngữ cảnh đặc thù của một dự án đơn lẻ, cho phép tái sử dụng trên nhiều repository khác nhau.

---

## 1. Cấu Trúc Thư Mục Templates

```
.ai/templates/
├── README.md               # Chỉ mục và hướng dẫn sử dụng template
├── tasks/
│   └── TASK_TEMPLATE.md    # Biểu mẫu quản lý vòng đời tác vụ (Task lifecycle)
├── sessions/
│   └── SESSION_TEMPLATE.md # Biểu mẫu nhật ký phiên và bàn giao (Session handoff)
├── changes/
│   ├── PROP_TEMPLATE.md    # Biểu mẫu đề xuất thay đổi kiến trúc/API (Proposal)
│   └── DRIFT_TEMPLATE.md   # Biểu mẫu báo cáo sai lệch code và tài liệu (Drift)
└── documentation/          # Bộ 12 biểu mẫu chuẩn hóa cho tài liệu dự án (.document/)
    ├── README.md
    ├── PROJECT_OVERVIEW_TEMPLATE.md
    ├── GOALS_AND_SCOPE_TEMPLATE.md
    ├── REQUIREMENTS_TEMPLATE.md
    ├── ARCHITECTURE_TEMPLATE.md
    ├── SYSTEM_MAP_TEMPLATE.md
    ├── DOMAIN_MODEL_TEMPLATE.md
    ├── MODULE_SPEC_TEMPLATE.md
    ├── API_CONTRACTS_TEMPLATE.md
    ├── DATA_FLOW_TEMPLATE.md
    ├── TEST_STRATEGY_TEMPLATE.md
    ├── GLOSSARY_TEMPLATE.md
    └── ADR_TEMPLATE.md
```

---

## 2. Nguyên Tắc Sử Dụng Template

1. **Đọc theo nhu cầu (On-Demand Loading)**: AI chỉ nạp template tương ứng vào ngữ cảnh khi được giao nhiệm vụ tạo mới tài liệu, task, đề xuất, hoặc biên bản phiên.
2. **Không biến template thành tài liệu riêng**: Template phải giữ tính khái quát, dùng placeholder rõ ràng (ví dụ: `[Tên thành phần]`, `YYYY-MM-DD`).
3. **Phân loại độ xác nhận (Confirmation Status)**: Mọi tài liệu dự án tạo ra từ template phải tuân thủ 4 mức trạng thái:
   - `CONFIRMED`: Đã được Human xác nhận chính thức.
   - `PROPOSED`: AI đề xuất, đang chờ Human duyệt.
   - `OPEN_QUESTION`: Chưa đủ thông tin, cần Human giải đáp.
   - `IMPLEMENTED`: Đã lập trình và kiểm chứng thành công bằng test.
4. **Không bịa đặt nội dung**: Nếu chưa có thông tin, đánh dấu là `OPEN_QUESTION`, không tự ý bịa đặt để điền kín biểu mẫu.
