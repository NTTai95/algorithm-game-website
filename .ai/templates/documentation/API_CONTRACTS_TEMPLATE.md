# API_CONTRACTS_TEMPLATE.md

> **Mục Đích Tài Liệu**: Đăng ký các hợp đồng giao diện kỹ thuật công khai (Public APIs & Contracts), kiểu dữ liệu TypeScript, tham số, kết quả trả về, ngoại lệ lỗi, điều kiện tiên quyết (Preconditions), hậu điều kiện (Postconditions), tác dụng phụ (Side effects) và chính sách tương thích.  
> **Khi Nào Sử Dụng**: Khi thiết kế giao diện kết nối giữa các tầng kiến trúc hoặc giữa các module độc lập.  
> **Mục Bắt Buộc**: Tên hợp đồng, Chữ ký phương thức, Tham số & Kiểu trả về, Lỗi có thể xảy ra, Tiền/Hậu điều kiện, Tác dụng phụ, Trạng thái hợp đồng.  
> **Mục Tùy Chọn**: Ví dụ sử dụng, Lịch sử phiên bản của contract.  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `ARCHITECTURE.md` và `domain/DOMAIN_MODEL.md`. Mọi thay đổi phá vỡ contract phải qua quy trình Proposal (`PROP-XXX`).  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Phân định rõ hợp đồng `CONFIRMED`, `PROPOSED`, hoặc `PENDING_DESIGN`. Tuyệt đối không bịa đặt API nếu chưa được chốt.

---

# Sổ Đăng Ký Hợp Đồng Giao Diện Công Khai (Public API Contracts)

```yaml
DOCUMENT_TYPE: API_CONTRACTS
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Trạng Thái Hiện Tại (Current Status)
[Mô tả tổng quát về mức độ ổn định của các API trong giai đoạn hiện tại]

---

## 2. Danh Sách Hợp Đồng Chính Thức (Confirmed Contracts)

### Contract: `I[ContractName]`
- **Mã hợp đồng**: `CON-[MÃ]`
- **Trạng thái**: `CONFIRMED`
- **Mô tả**: [Mục đích của hợp đồng này]
- **Tầng sở hữu**: [Ví dụ: Domain / Simulation]

#### Định nghĩa TypeScript:
```typescript
export interface IContractName {
  /**
   * Mô tả phương thức
   * @param input Tham số đầu vào
   * @returns Kết quả trả về
   * @throws Error khi điều kiện tiên quyết bị vi phạm
   */
  methodName(input: InputType): ReturnType;
}
```

#### Tiền Điều Kiện & Hậu Điều Kiện (Pre/Post-conditions):
- **Preconditions**: [Điều kiện bắt buộc phải thỏa mãn trước khi gọi]
- **Postconditions**: [Trạng thái hệ thống được bảo đảm sau khi phương thức hoàn thành]
- **Side effects**: [Các tác dụng phụ: phát event, ghi log, biến đổi trạng thái]
- **Lỗi & Ngoại lệ (Errors)**: [Các loại exception có thể ném ra]

---

## 3. Các Hợp Đồng Đang Đề Xuất Hoặc Chờ Thiết Kế (Pending / Proposed Contracts)

### Contract: `I[ProposedContractName]`
- **Trạng thái**: `PROPOSED` (Chưa được Human phê duyệt)
- **Mục đích dự kiến**: [Mô tả tính năng dự kiến giải quyết]
- **Tác động tương thích**: [Có gây phá vỡ tương thích cũ không?]

---

## 4. Chính Sách Tương Thích & Phá Vỡ Giao Diện (Breaking Change Policy)
- Mọi hợp đồng đã chuyển sang trạng thái `CONFIRMED` đều được bảo vệ nghiêm ngặt.
- Bất kỳ sửa đổi nào làm thay đổi chữ ký, kiểu dữ liệu hoặc hành vi của `CONFIRMED Contract` **BẮT BUỘC** phải tạo đề xuất `PROP-XXX` trong `.ai/changes/proposals/` và được Con người phê duyệt trước khi lập trình.
