# TEST_STRATEGY_TEMPLATE.md

> **Mục Đích Tài Liệu**: Định hình chiến lược đảm bảo chất lượng kỹ thuật toàn diện cho dự án: các cấp độ kiểm thử (Unit, Feature, Integration, Regression), ranh giới kiểm thử, công cụ thực thi, tiêu chuẩn nghiệm thu và các cổng kiểm soát (Quality Gates).  
> **Khi Nào Sử Dụng**: Thiết lập nền tảng kiểm thử ban đầu của dự án, hoặc cập nhật tiêu chuẩn nghiệm thu trước khi bắt đầu sprint/milestone.  
> **Mục Bắt Buộc**: Các cấp độ test, Ranh giới kiểm thử, Công cụ thực thi, Cổng kiểm soát nghiệm thu (Quality Gates), Nguyên tắc test độc lập.  
> **Mục Tùy Chọn**: Chiến lược mock/stub, Đo lường độ bao phủ (Coverage targets).  
> **Quy Tắc Dẫn Chiếu**: Dẫn chiếu sang `ARCHITECTURE.md` để đảm bảo test boundary không vi phạm ranh giới phân tầng.  
> **Ghi Nhận Thông Tin Chưa Xác Nhận**: Đánh dấu rõ các tiêu chuẩn `[CONFIRMED]` và `[PROPOSED]`.

---

# Chiến Lược Kiểm Thử Toàn Diện (Project Test Strategy)

```yaml
DOCUMENT_TYPE: TEST_STRATEGY
STATUS: [CONFIRMED | PROPOSED | OPEN_QUESTION]
LAST_UPDATED: YYYY-MM-DD
```

## 1. Triết Lý Kiểm Thử (Testing Philosophy)
- **Tách rời hiển thị**: Mọi logic nghiệp vụ cốt lõi và mô phỏng thuật toán bắt buộc phải kiểm thử tự động 100% độc lập, không phụ thuộc vào canvas, browser rendering hay DOM.
- **Tính tất định (Determinism)**: Các bài test phải chạy độc lập, không phụ thuộc vào thứ tự thực thi, mạng internet hoặc thời gian ngẫu nhiên.
- **Phát hiện lỗi sớm**: Chạy toàn bộ bộ kiểm thử cục bộ trước khi bàn giao (`READY_FOR_REVIEW`).

## 2. Các Cấp Độ Kiểm Thử (Testing Levels)

### 2.1. Kiểm Thử Đơn Vị (Unit Testing)
- **Đối tượng**: Các hàm thuần túy, thực thể nghiệp vụ, state transitions, thuật toán.
- **Công cụ**: [Ví dụ: Vitest]
- **Vị trí**: Đặt cạnh file nguồn hoặc trong thư mục test chuyên biệt.
- **Tiêu chuẩn**: Phải chạy tức thì (< vài mili-giây cho mỗi test case).

### 2.2. Kiểm Thử Tính Năng & Hợp Đồng (Feature & Contract Testing)
- **Đối tượng**: Chuỗi nhiều bước xử lý, phát và nhận sự kiện theo đúng hợp đồng giao diện.
- **Mục tiêu**: Đảm bảo các module phối hợp đúng như đặc tả.

### 2.3. Kiểm Thử Hồi Quy (Regression Testing)
- **Đối tượng**: Toàn bộ test suite của các tính năng đã được merge trước đó.
- **Yêu cầu**: 100% pass, không làm gãy các tính năng cũ khi thêm code mới.

## 3. Ranh Giới Kiểm Thử (Test Boundaries)
- **Vùng bắt buộc kiểm thử tự động không đầu (Headless/Node)**: Lõi mô phỏng, thuật toán, chuyển đổi dữ liệu.
- **Vùng kiểm thử giao diện**: Các component UI của React, kiểm tra trạng thái hiển thị qua mocks.
- **Vùng hạn chế test tự động nặng**: Khung vẽ canvas phức tạp của game engine (kiểm thử thông qua kiểm tra hợp đồng sự kiện phát ra thay vì chụp ảnh pixel).

## 4. Các Cổng Kiểm Soát Chất Lượng Bắt Buộc (Quality Verification Gates)
Mọi task trước khi chuyển sang `READY_FOR_REVIEW` bắt buộc phải vượt qua 5 cổng kiểm soát:

1. **Gate 1 - Typecheck**: `npm run typecheck` $\to$ **0 lỗi**.
2. **Gate 2 - Linter**: `npm run lint` $\to$ **0 lỗi, 0 cảnh báo**.
3. **Gate 3 - Unit & Feature Tests**: `npm run test:run` $\to$ **100% Pass**.
4. **Gate 4 - Build Verification**: `npm run build` $\to$ **Biên dịch thành công, bundle sạch**.
5. **Gate 5 - Document Sync**: Tài liệu task, session và module được đồng bộ đầy đủ.

## 5. Bằng Chứng Nghiệm Thu (Acceptance Evidence)
Khi bàn giao, AI phải ghi nhận kết quả thực tế của 5 cổng kiểm soát vào file Task và Session:
- Log tóm tắt số lượng test vượt qua.
- Trạng thái biên dịch không lỗi.
