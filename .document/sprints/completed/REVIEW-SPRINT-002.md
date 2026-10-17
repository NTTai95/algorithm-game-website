# Biên Bản Review & Nghiệm Thu Sprint: SPRINT-002

```yaml
DOCUMENT_ID: REVIEW-SPRINT-002
DOCUMENT_TYPE: SPRINT_REVIEW
STATUS: CONFIRMED
LAST_UPDATED: 2026-10-17
OWNER: Human & AI
SPRINT: SPRINT-002
DEPENDS_ON: [SPRINT-002]
```

---

## 1. Kết Quả Thực Tế Đạt Được (Actual Deliverables)

Đã hoàn thiện toàn diện tất cả các hạng mục theo kế hoạch Sprint 2:

1. **Kiến trúc Đa Cỗ Máy & Phân Tách Single Responsibility (`TASK-006`)**:
   - `wareHouse`: Quản lý kho tổng, kiểm soát dữ liệu mảng, `getCountBox()`.
   - `WeightScanner`: Cảm biến quét laser đo khối lượng thực tế (kg), `getWeightBox()`, `move(step)`, `moveStart()`.
   - `SingleCrane`: Cần cẩu cơ học giàn trên độc lập, `swap()`, `move(step)`, `moveStart()`.
   - Cập nhật toàn bộ thùng hàng mang thuộc tính khối lượng (`weight`) và logic sắp xếp hoàn toàn dựa trên khối lượng.

2. **Nâng cấp Java AST Parser & Virtual VM Runner OOP (`TASK-007`)**:
   - Hỗ trợ phương thức chuẩn: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)`.
   - Cơ chế Dependency Injection nạp chính xác các instance máy móc vào scope hàm `solve`.
   - Bổ sung cú pháp Java nâng cao: biến `boolean`, toán tử phủ định `!`, câu lệnh `break` thoát vòng lặp an toàn.
   - Trình định dạng mã Java tự động `formatJavaCode`.

3. **Mô Phỏng Phaser 3 Hai Đường Ray Song Hành (`TASK-008`)**:
   - Ray gantry trên cao: Cần cẩu cơ học `SingleCrane` với cơ cấu kẹp, nâng, tráo đổi 2 thùng liền kề.
   - Ray cảm biến trung gian: Máy quét `WeightScanner` với hiệu ứng tia laser chiếu xuống, nhãn trọng lượng holographic.
   - Thùng hàng hiển thị rõ khối lượng (kg) và trạng thái quét/hoán đổi sắc nét.

4. **Nâng Cấp BubbleSortValidator & Diagnostic Feedback Engine (`TASK-009`)**:
   - Kiểm định bất biến Bubble Sort chuẩn xác theo khối lượng (chỉ hoán đổi liền kề khi `boxWeight1 > boxWeight2`, nổi bọt max element về cuối pass).
   - Kiểm thử tự động trên 5 bài test ẩn thực tế.
   - Báo cáo chẩn đoán lỗi sư phạm trực quan (`DiagnosticReport`): chỉ rõ số dòng code vi phạm, phân loại lỗi (`SYNTAX`, `MACHINE_RUNTIME`, `INVARIANT`, `UNSORTED`), so sánh Giá trị thực tế vs Kỳ vọng, và ô Gợi ý khắc phục (💡).

5. **App Shell, Trang Home, Header Navigation, Chuỗi Màn 0 Tutorials & Editor Toolbar (`TASK-010`)**:
   - Fixed Header với logo, dropdown Màn 0 Hướng Dẫn, dropdown Chiến Dịch DSA.
   - Trang Home giới thiệu dự án, thông số 3 cỗ máy công nghiệp và sơ đồ lộ trình chiến dịch.
   - Chuỗi Màn 0 Tutorials độc lập: Stage 0.1 (WeightScanner), Stage 0.2 (SingleCrane), Stage 0.3 (Combo).
   - Client-side Hash Routing mượt mà (`#/`, `#/tutorial/0.1`, `#/tutorial/0.2`, `#/tutorial/0.3`, `#/level/bubble-sort`).
   - Nút **⚡ Format Code** trong Code Editor và **Diagnostic Modal** hiển thị đối chứng lỗi.

---

## 2. Bảng Xác Minh Tiêu Chí Chấp Nhận (Acceptance Criteria Verification)

| Mã AC | Tiêu chí nghiệm thu | Trạng thái | Bằng chứng kiểm chứng (Test results / Evidence) |
| :--- | :--- | :---: | :--- |
| `AC-1` | Người dùng có thể truy cập Trang Home, xem danh mục các màn chơi, nhấp chuyển màn thông qua Header hoặc thẻ màn chơi đến đúng URL endpoint tương ứng. | **ĐẠT** | Hash routing `#/`, `#/tutorial/0.1`..`0.3`, `#/level/bubble-sort`. Unit test `levels-and-navigation.test.ts`. |
| `AC-2` | Mã Java chuẩn bọc trong `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner)` được Parser dịch chuẩn xác, VM thực thi từng lệnh qua các đối tượng được truyền vào. | **ĐẠT** | Unit test `src/test/core/vm.test.ts` và `src/test/core/bubble-validator.test.ts`. |
| `AC-3` | `WeightScanner` có thể quét cân nặng (`getWeightBox()`) và di chuyển (`move`, `moveStart`); `SingleCrane` có thể đổi chỗ 2 thùng (`swap()`) và di chuyển độc lập. Phaser 3 hiển thị trực quan cả 2 cỗ máy. | **ĐẠT** | `src/test/core/multi-machine.test.ts`, `src/test/game/presentation.test.ts`. |
| `AC-4` | Parser & VM hỗ trợ đầy đủ `boolean swapped = false;`, `if (!swapped) break;`, toán tử `!`, `break` ngắt vòng lặp an toàn. | **ĐẠT** | Unit test `src/test/core/parser.test.ts` và `src/test/core/vm.test.ts`. |
| `AC-5` | Nhấp nút "Format Code" trong Editor sẽ tự động format và căn lề thụt dòng đoạn mã Java chuẩn đẹp. | **ĐẠT** | Tích hợp trong `CodeEditor.tsx` sử dụng module `formatJavaCode`. |
| `AC-6` | Khi code vi phạm (sai bất biến hoặc lỗi logic), hệ thống hiển thị bảng chẩn đoán chỉ rõ số dòng lỗi, nguyên nhân chi tiết và gợi ý khắc phục. | **ĐẠT** | `DiagnosticModal.tsx` và `DiagnosticEngine.ts`. Unit test `bubble-validator.test.ts`. |
| `AC-7` | Người chơi có thể hoàn thành lần lượt Stage 0.1, Stage 0.2 và Stage 0.3 với hướng dẫn riêng cho từng cỗ máy. | **ĐẠT** | `level-registry.ts` cấu hình 3 màn nhỏ kèm starter code, mảng ban đầu và tài liệu API riêng. |
| `AC-8` | Code mẫu chuẩn do Human cung cấp giải quyết thành công Màn 1 Bubble Sort, mảng được sắp xếp tăng dần theo `boxWeight`, vượt qua bộ test ẩn và đạt chiến thắng. | **ĐẠT** | Đạt 100% 5 bài test ẩn trong `BubbleSortValidator.runHiddenTests`. |
| `AC-9` | Đạt 100% test suites tự động của Vitest, 0 lỗi TypeScript `typecheck` và 0 cảnh báo ESLint `lint`. | **ĐẠT** | 54/54 tests passed, `tsc -b` 0 lỗi, `eslint .` 0 lỗi, `npm run build` thành công trong 1.06s. |

---

## 3. Báo Cáo Kiểm Thử & Verification Gates

- **Kiểm tra kiểu dữ liệu / cú pháp**: `npm.cmd run typecheck` $\to$ **PASS** (0 errors).
- **Kiểm tra linter**: `npm.cmd run lint` $\to$ **PASS** (0 errors, 0 warnings).
- **Kiểm thử tự động**: `npm.cmd run test:run` $\to$ **PASS** (9/9 test suites, 54/54 tests passed).
- **Kiểm tra đóng gói / build**: `npm.cmd run build` $\to$ **PASS** (1.06s).

---

## 4. Xác Nhận Nghiệm Thu Của Human (Human Sign-off)

- **Trạng thái nghiệm thu**: [x] CHẤP THUẬN ĐÓNG SPRINT 2
- **Ghi chú của Human**: Đã kiểm tra và chấp nhận Sprint 2; yêu cầu chuyển về nhánh `main` để chuẩn bị chỉnh sửa tài liệu cho Sprint 3.
