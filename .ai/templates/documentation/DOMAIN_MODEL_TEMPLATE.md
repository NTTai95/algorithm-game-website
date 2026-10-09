# DOMAIN_MODEL_TEMPLATE.md

> **Mục Đích Tài Liệu**: Định nghĩa các khái niệm thực thể nghiệp vụ cốt lõi, mối quan hệ giữa chúng, các thuộc tính, quy tắc nghiệp vụ bất biến và từ vựng chung (Ubiquitous Language).  
> **Khi Nào Sử Dụng**: Khi phân tích miền bài toán, trước khi thiết kế các interface kỹ thuật và triển khai code logic.  
> **Mục Bắt Buộc**: Các khái niệm cốt lõi, Danh sách thực thể, Thuộc tính, Mối quan hệ, Quy tắc nghiệp vụ (Business Rules / Invariants).  
> **Mục Tùy Chọn**: Khái niệm dự kiến trong tương lai, Biểu đồ quan hệ thực thể (ERD/Mermaid).  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `GLOSSARY.md` cho định nghĩa từ ngữ và `interfaces/API_CONTRACTS.md` cho các kiểu dữ liệu TypeScript tương ứng.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Đánh dấu rõ thực thể `[CONFIRMED]` và thực thể `[PROPOSED]` hoặc `[OPEN_QUESTION]`.

---

# Mô Hình Miền Nghiệp Vụ (Domain Model & Conceptual Vocabulary)

```yaml
DOCUMENT_TYPE: DOMAIN_MODEL
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Khái Niệm Miền Cốt Lõi (Core Domain Concepts)
Những khái niệm nền tảng định hình toàn bộ ngôn ngữ nghiệp vụ của dự án:
- **[Khái niệm 1] [CONFIRMED]**: [Định nghĩa bản chất khái niệm và vai trò]
- **[Khái niệm 2] [CONFIRMED]**: [Định nghĩa bản chất khái niệm và vai trò]
- **[Khái niệm 3] [PROPOSED]**: [Định nghĩa khái niệm đang được đề xuất]

## 2. Danh Sách Thực Thể & Giá Trị (Entities & Value Objects)

### 2.1. Thực Thể: [Tên Thực Thể 1 - Ví dụ: EntityA]
- **Bản chất**: Thực thể có định danh duy nhất (Identity).
- **Trạng thái xác nhận**: `[CONFIRMED | PROPOSED]`
- **Thuộc tính chính**:
  - `id`: Định danh duy nhất.
  - `[thuộc_tính_1]`: [Kiểu dữ liệu và ý nghĩa].
  - `[thuộc_tính_2]`: [Kiểu dữ liệu và ý nghĩa].
- **Hành vi nghiệp vụ**:
  - `[hành_động_1()]`: [Mô tả biến đổi trạng thái nội tại].

### 2.2. Đối Tượng Giá Trị: [Tên Value Object 1 - Ví dụ: ValueObjA]
- **Bản chất**: Đối tượng bất biến (Immutable), định danh theo giá trị cấu thành.
- **Trạng thái xác nhận**: `[CONFIRMED | PROPOSED]`
- **Thuộc tính**:
  - `[thuộc_tính]`: [Ý nghĩa nghiệp vụ].

## 3. Mối Quan Hệ Giữa Các Thực Thể (Relationships)
- **[EntityA]** sở hữu $1 \dots N$ **[EntityB]**: [Mô tả bản chất quan hệ]
- **[EntityB]** tham chiếu tới **[EntityC]**: [Mô tả bản chất quan hệ]

## 4. Các Quy Tắc Nghiệp Vụ & Bất Biến (Business Rules & Invariants)
Những luật lệ bất biến tuyệt đối không được phép bị vi phạm trong bất kỳ trạng thái nào:
1. **Rule-01 [CONFIRMED]**: [Nội dung quy tắc bất biến 1 - Ví dụ: Trọng lượng không được âm]
2. **Rule-02 [CONFIRMED]**: [Nội dung quy tắc bất biến 2 - Ví dụ: Không thể thực hiện swap khi đang giữ 2 vật phẩm không hợp lệ]

## 5. Các Khái Niệm Dự Kiến Trong Tương Lai (Potential Future Concepts)
- **[Khái niệm tương lai 1] [OPEN_QUESTION]**: [Mô tả ý tưởng mở rộng, chưa đưa vào thiết kế hiện tại]
- **[Khái niệm tương lai 2] [OPEN_QUESTION]**: [Mô tả ý tưởng mở rộng, chưa đưa vào thiết kế hiện tại]
