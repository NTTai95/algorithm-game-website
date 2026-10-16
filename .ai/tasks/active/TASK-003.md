# TASK-003: Xây Dựng Bubble Sort Invariant Validator & Test Suites

```yaml
TASK_ID: TASK-003
TITLE: Xây dựng Bubble Sort Invariant Validator & Test Suites
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-16
CURRENT_BRANCH: task/TASK-003-bubble-sort-validator
CURRENT_SESSION: NONE
DEPENDENCIES: [TASK-002]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Xây dựng Bộ kiểm định bất biến thuật toán Bubble Sort (`BubbleSortValidator`) và hệ thống chạy thử nghiệm trên 4 bộ test ẩn (Hidden Test Suites). Bộ kiểm định đảm bảo người chơi chỉ có thể qua màn khi tái hiện chuẩn xác 100% thuật toán Bubble Sort (chỉ hoán đổi 2 phần tử liền kề, duy trì tính chất nổi bọt qua từng lượt quét, bảo toàn mảng) và xuất ra thông báo chẩn đoán lỗi thân thiện, giúp người chơi hiểu bản chất lỗi sai thuật toán.

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/validator/invariant-validator-interface.ts`: Interface chuẩn cho bộ kiểm định bất biến.
  - `src/core/validator/bubble-sort-validator.ts`: Triển khai kiểm tra bất biến của Bubble Sort:
    - *Quy tắc 1*: Mọi thao tác đổi chỗ (`swap`) chỉ được xảy ra giữa 2 thùng kề nhau ($|index_A - index_B| = 1$).
    - *Quy tắc 2*: Bất biến nổi bọt (Pass Invariant): Sau mỗi pass $k$, phần tử lớn thứ $k$ phải được định vị ổn định tại vị trí cuối mảng tương ứng.
    - *Quy tắc 3*: Bảo toàn mảng đích: Mảng cuối cùng được sắp xếp tăng dần và không bị thất thoát thùng hàng.
  - `src/core/validator/hidden-test-runner.ts`: Tự động nạp mã người chơi chạy trên 4 kịch bản ẩn:
    1. Mảng ngẫu nhiên (Random array).
    2. Mảng đảo ngược hoàn toàn (Worst-case array).
    3. Mảng đã sắp xếp sẵn (Best-case array).
    4. Mảng có nhiều phần tử trùng giá trị (Duplicates array).
  - `src/core/validator/diagnostic-reporter.ts`: Sinh thông điệp chẩn đoán dễ hiểu cho người học.
  - Unit tests cho bộ validator trong `src/test/core/`.
- **Nằm ngoài phạm vi**:
  - Giao diện người dùng UI Modal hiển thị kết quả (thuộc TASK-005).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/validator/**`
  - `src/test/core/bubble-validator.test.ts`
  - `.ai/tasks/active/TASK-003.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/**`
- **RESTRICTED FILES**:
  - `src/game/**`
  - `src/components/**`
  - `package.json`

### 4. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
```typescript
export interface ValidationResult {
  passed: boolean;
  algorithmName: 'Bubble Sort';
  violationReason?: string;
  failedStepIndex?: number;
  testCasesSummary: {
    total: number;
    passed: number;
    details: Array<{ name: string; passed: boolean; message?: string }>;
  };
}

export interface IBubbleSortValidator {
  validateTrace(events: readonly MachineEvent[], initialArray: number[]): ValidationResult;
  runHiddenTests(javaCode: string): Promise<ValidationResult>;
}
```

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Kiểm tra mã chuẩn Bubble Sort**: Phải vượt qua 100% các điều kiện và tất cả bộ test ẩn.
2. **Kiểm tra gian lận hoán đổi nhảy cóc**: Nếu mã đổi chỗ 2 phần tử cách nhau $> 1$, lập tức phát hiện vi phạm quy tắc cơ khí cần cẩu.
3. **Kiểm tra thuật toán sai (ví dụ sắp xếp nửa vời hoặc thuật toán khác)**: Phát hiện sai lệch bất biến nổi bọt và thông báo rõ lượt quét bị lỗi.
4. **Kiểm tra tính ổn định trên mảng có phần tử trùng lặp**: Xác nhận không rơi vào vòng lặp vô tận.

### 6. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [ ] Chấp thuận giải pháp Bubble Sort chuẩn xác và xác nhận mảng đích tăng dần.
- [ ] Từ chối và bắt lỗi chính xác mọi hành vi hoán đổi không liền kề.
- [ ] Từ chối nếu sau một lượt quét (`pass`), phần tử lớn nhất tương ứng chưa được đưa về cuối.
- [ ] Vượt qua toàn bộ 4 bài test ẩn tự động.
- [ ] 100% unit tests trong `src/test/core/bubble-validator.test.ts` đạt kết quả xanh (PASS).
- [ ] `npm.cmd run typecheck` và `npm.cmd run lint` đạt 0 lỗi.

---

## PHẦN 2: TIẾN TRÌNH THỰC HIỆN (EXECUTION PROGRESS)
- [x] Thiết kế chi tiết Phần 1 hoàn tất.
- [ ] Tạo nhánh `task/TASK-003-bubble-sort-validator`.
- [ ] Khởi tạo phiên làm việc `SESSION-TASK-003.md`.
- [ ] Triển khai `BubbleSortValidator` & Invariant Checkers.
- [ ] Triển khai `HiddenTestRunner` & Diagnostic Reporter.
- [ ] Viết Unit Tests & chạy kiểm thử đạt 100%.
- [ ] Hoàn tất kiểm tra chất lượng & cập nhật bảng task.
