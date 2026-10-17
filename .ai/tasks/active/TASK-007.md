# TASK-007: Nâng Cấp Java AST Parser & Virtual VM Runner (Method solve, Boolean, Break & Code Formatter)

```yaml
TASK_ID: TASK-007
TITLE: Nâng Cấp Java AST Parser & Virtual VM Runner
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-007-java-parser-and-vm-oop
CURRENT_SESSION: NONE
DEPENDENCIES: [TASK-006]
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
1. Mở rộng bộ phân tích cú pháp Java AST Parser để hỗ trợ khai báo phương thức tiêu chuẩn:
   `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`.
2. Máy ảo Virtual VM khởi tạo môi trường thực thi và tự động tiêm (Dependency Injection) các instance máy móc tương ứng vào danh sách tham số của hàm `solve`.
3. Bổ sung các cấu trúc ngôn ngữ Java cần thiết:
   - Kiểu dữ liệu `boolean`: `boolean swapped = false;`, gán `swapped = true;`.
   - Phép toán logic phủ định: `if (!swapped)`.
   - Câu lệnh thoát vòng lặp: `break;`.
   - Gọi phương thức có tham số: `singleCrane.move(1)`, `weightScanner.move(1)`.
   - Phương thức không tham số: `singleCrane.moveStart()`, `weightScanner.moveStart()`, `singleCrane.swap()`, `weightScanner.getWeightBox()`.
4. Cung cấp tiện ích format code (`formatJavaCode(code: string): string`) để tự động căn chỉnh thụt lề chuẩn cho Editor.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/parser/ast-types.ts`:
    - Thêm node `FunctionDeclarationNode`: `name`, `parameters: { name: string, typeName: string }[]`, `body: BlockStatementNode`.
    - Thêm node `BreakStatementNode`.
    - Thêm literal type `boolean` và toán tử `!`.
  - `src/core/parser/lexer.ts`: Bổ sung tokens cho `public`, `static`, `void`, `boolean`, `true`, `false`, `!`, `break`.
  - `src/core/parser/parser.ts`:
    - Phân tích cú pháp khai báo hàm `public static void <name>(...) { ... }` hoặc chấp nhận code trần / class bọc ngoài.
    - Phân tích cú pháp `break;`, `boolean` declaration & unary expression `!`.
  - `src/core/parser/formatter.ts`: Xây dựng hàm `formatJavaCode` tự động chuẩn hóa dấu cách, thụt dòng (2 spaces hoặc 4 spaces), đặt ngoặc nhọn `{}` theo phong cách Java chuẩn.
  - `src/core/vm/virtual-runner.ts`:
    - Nhận diện hàm `solve` trong AST, bind các máy móc vào scope tham số và thực thi body của hàm.
    - Xử lý tín hiệu ngắt vòng lặp khi gặp `BreakStatementNode`.
  - Unit tests cho Parser và VM với đoạn code mẫu thực tế của Human trong `src/test/core/`.
- **Nằm ngoài phạm vi**:
  - Tầng hiển thị đồ họa Phaser 3 (thuộc TASK-008).
  - Giao diện UI React (thuộc TASK-010).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/parser/**`
  - `src/core/vm/**`
  - `src/test/core/parser.test.ts`
  - `src/test/core/vm.test.ts`
  - `.ai/tasks/active/TASK-007.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/game/**`
  - `src/components/**`
  - `package.json`

---

### 4. Kế Hoạch Kiểm Thử (TEST PLAN)
1. **Lexer & Parser Tests**:
   - Parse thành công signature `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`.
   - Parse `boolean swapped = false;`, `swapped = true;`, `if (!swapped) break;`.
   - Parse phương thức có đối số `weightScanner.move(1)`.
2. **VM Tests**:
   - Chạy đoạn mã mẫu chính xác của Human và kiểm tra các sự kiện phát ra đầy đủ theo thứ tự:
     `weightScanner.getWeightBox()`, `weightScanner.move(1)`, `singleCrane.swap()`, `singleCrane.move(1)`, `singleCrane.moveStart()`, v.v.
   - Kiểm tra `break` thoát đúng vòng lặp `for` ngoài cùng khi `!swapped`.
   - Chặn vòng lặp vô tận bằng Step Budget (50.000 steps).
3. **Formatter Tests**:
   - Format một đoạn code Java bị lộn xộn thụt lề thành cấu trúc thụt lề phân cấp rõ ràng.
4. Lệnh kiểm tra: `npm.cmd run test:run` && `npm.cmd run typecheck`.
