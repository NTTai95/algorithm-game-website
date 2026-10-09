# MODULE_SPEC_TEMPLATE.md

> **Mục Đích Tài Liệu**: Đặc tả kỹ thuật chi tiết của một module con cụ thể: trách nhiệm, ranh giới, dữ liệu đầu vào/đầu ra, phụ thuộc, giao diện công khai, tệp tin thuộc quyền sở hữu, và trách nhiệm kiểm thử.  
> **Khi Nào Sử Dụng**: Khi một module con đạt độ phức tạp đáng kể cần tài liệu thiết kế riêng (đặt trong `.document/modules/`).  
> **Mục Bắt Buộc**: Mã module, Trách nhiệm, Ranh giới, Đầu vào/Đầu ra, Phụ thuộc, Giao diện công khai, Danh sách file sở hữu, Trách nhiệm test.  
> **Mục Tùy Chọn**: Ghi chú hiệu năng, Kế hoạch refactor.  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `ARCHITECTURE.md` để gắn khớp tầng và `interfaces/API_CONTRACTS.md` cho các kiểu dùng chung.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Đánh dấu trạng thái module `[CONFIRMED]`, `[PROPOSED]` hoặc `[CHƯA HOÀN THIỆN]`.

---

# Đặc Tả Kỹ Thuật Module (Module Specification: [MODULE_NAME])

```yaml
MODULE_ID: MOD-[MÃ_MODULE]
MODULE_NAME: [Tên Module]
LAYER: [APPLICATION | GAME_SYSTEMS | DOMAIN_CORE | PRESENTATION]
STATUS: [CONFIRMED | PROPOSED | IMPLEMENTED]
OWNED_PATH: src/.../[tên_thư_mục]/
LAST_UPDATED: YYYY-MM-DD
```

## 1. Trách Nhiệm Cốt Lõi (Module Responsibility)
[Mô tả mục đích duy nhất và trách nhiệm cốt lõi mà module này đảm nhận]

## 2. Ranh Giới Module (Boundaries & Encapsulation)
- **Những việc module ĐƯỢC PHÉP làm**:
  - [Việc 1]
  - [Việc 2]
- **Những việc module TUYỆT ĐỐI CẤM làm**:
  - [Cấm việc 1]
  - [Cấm việc 2]

## 3. Dữ Liệu Đầu Vào & Đầu Ra (Inputs & Outputs)
- **Đầu vào (Inputs)**: [Các tham số, luồng sự kiện, cấu hình nhận vào]
- **Đầu ra (Outputs)**: [Dữ liệu tính toán, sự kiện phát ra, kết quả trả về]

## 4. Các Phụ Thuộc (Dependencies)
- **Phụ thuộc nội bộ**: [Các module khác trong dự án mà module này import]
- **Phụ thuộc bên ngoài**: [Các gói npm hoặc thư viện chuẩn được phép sử dụng]

## 5. Giao Diện Công Khai (Public Interfaces & APIs)
```typescript
// Định nghĩa các interface và phương thức mà module xuất bản (export)
export interface IExampleModule {
  execute(param: string): Promise<boolean>;
}
```

## 6. Các Tệp Tin Thuộc Quyền Sở Hữu (Owned Files)
- `src/.../index.ts`: Điểm xuất bản public API.
- `src/.../types.ts`: Định nghĩa kiểu dữ liệu nội bộ.
- `src/.../service.ts`: Triển khai logic chính.

## 7. Trách Nhiệm Kiểm Thử (Testing Responsibilities)
- Phải đạt 100% độ bao phủ cho các ca biên (edge cases).
- Vượt qua kiểm thử đơn vị độc lập không cần môi trường ngoài.
