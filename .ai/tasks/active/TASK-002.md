# TASK-002: Xây Dựng Java Parser & Virtual Step Runner

```yaml
TASK_ID: TASK-002
TITLE: Xây dựng Java Parser & Virtual Step Runner
STATUS: READY_FOR_REVIEW
PRIORITY: HIGH
CREATED: 2026-10-16
CURRENT_BRANCH: task/TASK-002-java-parser-and-vm
CURRENT_SESSION: SES-20261016-02
DEPENDENCIES: [TASK-001]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
Xây dựng bộ phân tích cú pháp mã nguồn Java thu nhỏ (Java AST Parser / Lexer) và Máy ảo ngắt bước (Virtual Step Runner). Hệ thống cho phép phân tích mã Java người chơi viết trong game, chuyển đổi thành chuỗi lệnh trung gian (Bytecode / AST Node Stream) và thực thi an toàn từng bước (`step-by-step yielding`), hỗ trợ biến số, toán tử số học, vòng lặp `for`/`while`, câu lệnh `if`/`else` và gọi các phương thức của cỗ máy `crane`.

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/parser/lexer.ts`: Bộ tách từ khóa Java (`for`, `while`, `if`, `else`, `int`, toán tử, tên phương thức).
  - `src/core/parser/parser.ts`: Phân tích token thành cấu trúc cây cú pháp (AST).
  - `src/core/parser/ast-types.ts`: Định nghĩa các kiểu nút AST (Statements, Expressions, MethodCalls).
  - `src/core/vm/virtual-machine.ts`: Trình thông dịch ngắt bước (Generator-based / Step-by-Step execution), quản lý Call Stack và biến cục bộ.
  - `src/core/vm/execution-guard.ts`: Giới hạn ngân sách số bước (`Step Budget`: ví dụ tối đa 50,000 bước), ngăn chặn treo trình duyệt do vòng lặp vô tận.
  - Unit tests toàn diện với Vitest cho Parser và VM trong `src/test/core/`.
- **Nằm ngoài phạm vi**:
  - Tầng hiển thị đồ họa Phaser 3 (thuộc TASK-004).
  - Bộ kiểm định bất biến Bubble Sort (thuộc TASK-003).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/parser/**`
  - `src/core/vm/**`
  - `src/test/core/parser.test.ts`
  - `src/test/core/vm.test.ts`
  - `.ai/tasks/active/TASK-002.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/**`
- **RESTRICTED FILES**:
  - `.ai/rules/**`
  - `.human/**`
  - `package.json`
  - `src/game/**`
  - `src/components/**`

### 4. Hệ Thống Hiện Hữu (EXISTING SYSTEMS)
- Kế thừa mô hình cỗ máy `Crane` và `WarehouseArrayState` từ `TASK-001`.
- Các phương thức cỗ máy được liên kết vào bảng ký hiệu (Symbol Table) của VM: `crane.next()`, `crane.prev()`, `crane.compare()`, `crane.swap()`, `crane.length()`, `crane.position()`.

### 5. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
```typescript
export interface VMStepResult {
  done: boolean;
  stepCount: number;
  currentLine?: number;
  machineAction?: string;
  error?: string;
}

export interface IVirtualMachine {
  load(javaCode: string, context: Record<string, unknown>): void;
  step(): VMStepResult;
  runAll(maxSteps?: number): VMStepResult;
  reset(): void;
  getExecutionTrace(): readonly MachineEvent[];
}
```

### 6. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Parser Tests**:
   - Phân tích cú pháp vòng lặp `for (int i = 0; i < n; i++)`.
   - Phân tích cú pháp vòng lặp `while (condition)`.
   - Phân tích câu lệnh điều kiện `if (crane.compare() > 0) { crane.swap(); }`.
   - Báo lỗi cú pháp chính xác kèm dòng lỗi (Syntax Error with line numbers).
2. **VM Tests**:
   - Thực thi tuần tự các câu lệnh gán và tính toán.
   - Chạy vòng lặp có điều kiện dừng chuẩn xác.
   - Kích hoạt `Step Budget` khi phát hiện vòng lặp vô tận (`while(true)`), trả về lỗi an toàn mà không làm đơ tiến trình.
   - Từng bước `step()` phát sinh đúng sự kiện của cỗ máy liên kết.

### 7. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [x] Parse thành công các cấu trúc mã Java chuẩn: `for`, `while`, `if`, `else`, khai báo biến `int`.
- [x] Gọi thành công các phương thức máy móc thông qua ngữ cảnh thực thi (`crane.next()`, `crane.swap()`,...).
- [x] Ngắt an toàn khi số bước vượt trần định mức (`Step Budget exceeded`).
- [x] Hỗ trợ chạy từng bước đơn lẻ (`step()`) và chạy toàn bộ (`runAll()`).
- [x] 100% unit tests trong `src/test/core/parser.test.ts` và `src/test/core/vm.test.ts` đạt kết quả xanh (PASS).
- [x] `npm.cmd run typecheck` và `npm.cmd run lint` đạt 0 lỗi.

---

## PHẦN 2: TIẾN TRÌNH THỰC HIỆN (EXECUTION PROGRESS)
- [x] Thiết kế chi tiết Phần 1 hoàn tất.
- [x] Tạo nhánh `task/TASK-002-java-parser-and-vm`.
- [x] Khởi tạo phiên làm việc `SESSION-TASK-002.md`.
- [x] Triển khai Java Lexer & Parser.
- [x] Triển khai Virtual Machine Step Runner & Execution Guard.
- [x] Viết Unit Tests & chạy kiểm thử đạt 100%.
- [x] Hoàn tất kiểm tra chất lượng & cập nhật bảng task.
