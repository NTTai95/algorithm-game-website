# TASK-009: Nâng Cấp BubbleSortValidator Theo BoxWeight & Xây Dựng Diagnostic Feedback Engine

```yaml
TASK_ID: TASK-009
TITLE: Nâng Cấp BubbleSortValidator & Diagnostic Feedback Engine
STATUS: DONE
PRIORITY: HIGH
CREATED: 2026-10-17
COMPLETED: 2026-10-17
BRANCH: task/TASK-009-bubble-validator-and-diagnostics
SESSION: SES-20261017-09
DEPENDENCIES: [TASK-006, TASK-007]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
1. Nâng cấp bộ kiểm định `BubbleSortValidator` để xác thực chuẩn xác 100% thuật toán Bubble Sort dựa trên **khối lượng của box (`boxWeight`)** và tương tác của 2 cỗ máy `WeightScanner` + `SingleCrane`.
2. Xây dựng **Diagnostic Feedback Engine**: Chuyển đổi các vi phạm hoặc lỗi runtime thành báo cáo chẩn đoán sư phạm chi tiết:
   - Chỉ ra mã lỗi và tên phân loại (`SYNTAX`, `MACHINE_RUNTIME`, `INVARIANT`, `UNSORTED`).
   - Chỉ rõ số dòng code vi phạm trong trình biên soạn.
   - So sánh trực quan: Giá trị thực tế vs Giá trị kỳ vọng tại thời điểm xảy ra lỗi (`contextDetails`).
   - Cung cấp gợi ý sư phạm (Educational Hint) giúp người chơi hiểu bản chất lỗi để tự sửa.
3. Chạy kiểm thử tự động trên 5 bộ test ẩn theo khối lượng (ngược, xuôi, ngẫu nhiên, trùng lặp, 2 phần tử).

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/validator/diagnostic-types.ts`: Kiểu dữ liệu `DiagnosticReport`, `DiagnosticSeverity`, `DiagnosticErrorType`, `DiagnosticContextDetails`.
  - `src/core/validator/bubble-validator.ts`:
    - Kiểm tra chuỗi sự kiện `ExecutionTrace`: Crane chỉ được swap liền kề và chỉ hoán đổi khi nghịch thế `boxWeight1 > boxWeight2`.
    - Kiểm tra bất biến sau mỗi pass theo `boxWeight`.
    - Tích hợp 5 test suites ẩn với mảng trọng số thực tế.
  - `src/core/validator/diagnostic-engine.ts`:
    - Phân tích lỗi cú pháp (Parser/Lexer), đính kèm số dòng và gợi ý dấu câu/từ khóa.
    - Phân tích lỗi máy ảo (Step Budget exceeded, Out of Bounds, Variable not found, Missing Machine).
    - Phân tích vi phạm bất biến thuật toán từ trace validation và đính kèm số dòng, thông điệp chi tiết.
  - Unit tests cho Validator và Diagnostic Engine trong `src/test/core/bubble-validator.test.ts`.
- **Nằm ngoài phạm vi**:
  - Tầng hiển thị Modal trong React UI (thuộc TASK-010).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/validator/**`
  - `src/core/domain/events.ts`
  - `src/core/machines/**`
  - `src/core/vm/virtual-machine.ts`
  - `src/test/core/bubble-validator.test.ts`
  - `.ai/tasks/completed/TASK-009.md`
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
  readonly passed: boolean;
  readonly valid: boolean;
  readonly algorithmName: string;
  readonly errorType?: 'SYNTAX' | 'MACHINE_RUNTIME' | 'INVARIANT' | 'UNSORTED';
  readonly severity?: 'ERROR' | 'WARNING' | 'INFO';
  readonly message: string;
  readonly violationReason?: string;
  readonly reason?: string;
  readonly lineNumber?: number;
  readonly stepIndex?: number;
  readonly contextDetails?: {
    actual: string;
    expected: string;
    indices?: readonly [number, number];
  };
  readonly hint?: string;
  readonly hiddenTestsPassed?: number;
  readonly totalHiddenTests?: number;
  readonly testCases: readonly TestCaseResult[];
}

export interface IBubbleSortValidator {
  validateTrace(
    initialWeights: readonly number[],
    events: readonly MachineEvent[],
    finalArrayState: WarehouseArrayState
  ): DiagnosticReport;
  runHiddenTests(javaCode: string): DiagnosticReport;
}
```

---

## PHẦN 2: THỰC THI & NGHIỆM THU (IMPLEMENTATION & VERIFICATION)

### 1. Các Tệp Tin Đã Triển Khai
1. `src/core/validator/diagnostic-types.ts`: Định nghĩa kiểu dữ liệu `DiagnosticReport`, `DiagnosticErrorType`, `DiagnosticContextDetails`, `IBubbleSortValidator`.
2. `src/core/validator/diagnostic-engine.ts`: Chẩn đoán sư phạm thông minh:
   - `createSuccessReport`: Báo cáo thành công khi vượt qua 5 test ẩn.
   - `fromParserError`: Bóc tách số dòng, lỗi cú pháp, gợi ý dấu chấm phẩy / ngoặc nhọn.
   - `fromVMError`: Bóc tách lỗi máy ảo (vượt biên kho hàng, vòng lặp vô tận, máy móc/phương thức không hợp lệ).
   - `fromInvariantViolation`: Báo cáo vi phạm hoán đổi không liền kề, hoán đổi sai chiều trọng số, hoặc không nổi bọt phần tử nặng nhất về cuối pass.
   - `fromUnsortedResult`: Báo cáo mảng chưa được sắp xếp kèm so sánh trực quan mảng thực tế vs mảng kỳ vọng.
3. `src/core/validator/bubble-sort-validator.ts`:
   - Nâng cấp 5 test case ẩn theo khối lượng (`boxWeight`).
   - Cung cấp môi trường đa máy móc (`wareHouse`, `singleCrane`, `weightScanner`, và `crane` tương thích ngược).
   - Xác thực trace theo trình tự thời gian `seq` chính xác.
4. `src/core/domain/events.ts`: Bổ sung `seq: number` tăng dần đơn điệu (`nextEventSequence`) cho toàn bộ máy móc.
5. `src/core/vm/virtual-machine.ts`: Theo dõi `currentStatementLine` chính xác khi có lỗi thực thi runtime.
6. `src/test/core/bubble-validator.test.ts`: Bộ kiểm thử toàn diện với 9 test suites kiểm tra đầy đủ các tình huống.

### 2. Kết Quả Kiểm Thử & Lint
- **Vitest**: `50/50 tests passed` (8 test suites).
- **TypeScript**: `tsc -b` passed với 0 lỗi.
- **ESLint**: `eslint .` passed với 0 cảnh báo.
