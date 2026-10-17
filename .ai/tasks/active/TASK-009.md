# TASK-009: Nâng Cấp BubbleSortValidator Theo BoxWeight & Xây Dựng Diagnostic Feedback Engine

```yaml
TASK_ID: TASK-009
TITLE: Nâng Cấp BubbleSortValidator & Diagnostic Feedback Engine
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-009-bubble-validator-and-diagnostics
CURRENT_SESSION: NONE
DEPENDENCIES: [TASK-006, TASK-007]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
1. Nâng cấp bộ kiểm định `BubbleSortValidator` để xác thực chuẩn xác 100% thuật toán Bubble Sort dựa trên **khối lượng của box (`boxWeight`)** và tương tác của 2 cỗ máy `WeightScanner` + `SingleCrane`.
2. Xây dựng **Diagnostic Feedback Engine**: Chuyển đổi các vi phạm hoặc lỗi runtime thành báo cáo chẩn đoán sư phạm chi tiết:
   - Chỉ ra mã lỗi và tên phân loại (`SYNTAX_ERROR`, `MACHINE_OUT_OF_BOUNDS`, `INVARIANT_VIOLATION`, `UNSORTED_RESULT`).
   - Chỉ rõ số dòng code vi phạm trong trình biên soạn.
   - So sánh trực quan: Giá trị thực tế vs Giá trị kỳ vọng tại thời điểm xảy ra lỗi.
   - Cung cấp gợi ý sư phạm (Educational Hint) giúp người chơi hiểu bản chất lỗi để tự sửa.
3. Chạy kiểm thử tự động trên 5 bộ test ẩn theo khối lượng (ngược, xuôi, ngẫu nhiên, trùng lặp, 2 phần tử).

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/validator/diagnostic-types.ts`: Kiểu dữ liệu `DiagnosticReport`, `DiagnosticSeverity`, `DiagnosticErrorType`.
  - `src/core/validator/bubble-validator.ts`:
    - Kiểm tra chuỗi sự kiện `ExecutionTrace`: Scanner phải đọc cân nặng, Crane chỉ được swap liền kề.
    - Kiểm tra bất biến sau mỗi pass theo `boxWeight`.
    - Tích hợp 5 test suites ẩn.
  - `src/core/validator/diagnostic-engine.ts`:
    - Phân tích lỗi máy ảo (Step Budget exceeded, Out of Bounds, Variable not found).
    - Phân tích vi phạm thuật toán từ Validator và đính kèm số dòng, thông điệp chi tiết.
  - Unit tests cho Validator và Diagnostic Engine trong `src/test/core/bubble-validator.test.ts`.
- **Nằm ngoài phạm vi**:
  - Tầng hiển thị Modal trong React UI (thuộc TASK-010).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/validator/**`
  - `src/test/core/bubble-validator.test.ts`
  - `.ai/tasks/active/TASK-009.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/game/**`
  - `src/components/**`
  - `package.json`

---

### 4. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)

```typescript
export interface DiagnosticReport {
  readonly success: boolean;
  readonly errorType?: 'SYNTAX' | 'MACHINE_RUNTIME' | 'INVARIANT' | 'UNSORTED';
  readonly message: string;
  readonly lineNumber?: number;
  readonly stepIndex?: number;
  readonly contextDetails?: {
    actual: string;
    expected: string;
    indices?: [number, number];
  };
  readonly hint?: string;
  readonly hiddenTestsPassed?: number;
  readonly totalHiddenTests?: number;
}

export interface IBubbleSortValidator {
  validateTrace(events: readonly MachineEvent[], finalArray: readonly Crate[]): DiagnosticReport;
  runHiddenTests(javaCode: string): DiagnosticReport;
}
```

---

### 5. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Valid Code Test**: Mã mẫu chuẩn của Human vượt qua 100% (cả mảng hiển thị và 5 bài test ẩn).
2. **Cheat / Logic Violation Tests**:
   - Chỉ hoán đổi mà không dùng scanner.
   - Hoán đổi 2 box không thỏa mãn nghịch thế (`boxWeight1 <= boxWeight2`).
   - Bỏ sót không đưa phần tử lớn nhất về cuối pass.
   - Báo cáo chẩn đoán phải trả về đúng `errorType`, `contextDetails` và `hint`.
3. Lệnh kiểm tra: `npm.cmd run test:run` && `npm.cmd run typecheck`.
