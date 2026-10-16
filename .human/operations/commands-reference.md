# Sổ Tay Tra Cứu Lệnh Toàn Diện (.human/operations/commands-reference.md)

Tài liệu này là bảng tra cứu chính xác toàn bộ các lệnh thực tế được hỗ trợ và sử dụng trong repository, bao gồm: Lệnh môi trường phát triển & kiểm thử (npm scripts), Lệnh quản trị Git, và Các mẫu lệnh chỉ đạo AI (Prompt Commands).

---

## 1. Phân Biệt Các Loại Lệnh Trong Hệ Thống

1. **Lệnh Shell / NPM Scripts**: Chạy trong terminal (PowerShell trên Windows, Bash trên Linux/macOS). Tác động trực tiếp lên mã nguồn, tệp build và môi trường runtime.
2. **Lệnh Git**: Chạy trong terminal để quản lý nhánh, commit, kiểm tra diff và đồng bộ với GitHub.
3. **Lệnh Chỉ Đạo AI (Prompt Commands)**: Nhập vào cửa sổ chat với AI. AI diễn giải câu nói theo từ điển lệnh tĩnh tại `.ai/protocol/COMMANDS.md` kết hợp với rào chắn Branch Rules.

---

## 2. Bảng Tra Cứu Lệnh Môi Trường Phát Triển & Kiểm Thử (NPM Scripts)

Toàn bộ các lệnh này được định nghĩa chính thức trong [package.json](../../package.json):

### 2.1. `npm run typecheck`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run typecheck` *(Thực thi: `tsc -b`)* |
| **Mục đích** | Kiểm tra kiểu dữ liệu tĩnh TypeScript cho toàn bộ project mà không sinh file js |
| **Khi sử dụng** | Trước khi commit code, khi review task, hoặc trong cổng nghiệm thu Verification Gates |
| **Điều kiện** | Đã chạy `npm install` (`node_modules` sẵn sàng) |
| **Tác động** | Chỉ đọc (Read-only), không làm thay đổi bất kỳ tệp tin nào |
| **Kết quả mong đợi** | Lệnh kết thúc với exit code `0`, terminal không in ra bất kỳ dòng lỗi nào |
| **Kiểm tra sau lệnh** | `$LASTEXITCODE` trong PowerShell bằng `0` |
| **Cảnh báo** | Không được bỏ qua bất kỳ lỗi typecheck nào bằng cách dùng `// @ts-ignore` bừa bãi |

### 2.2. `npm run lint`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run lint` *(Thực thi: `eslint .`)* |
| **Mục đích** | Quét toàn bộ mã nguồn để phát hiện lỗi cú pháp, quy ước code và import không hợp lệ |
| **Khi sử dụng** | Trong quá trình lập trình và trước khi chuyển task sang `READY_FOR_REVIEW` |
| **Điều kiện** | File cấu hình `eslint.config.js` hợp lệ |
| **Tác động** | Chỉ đọc, không sửa code (nếu muốn tự sửa một số lỗi định dạng: dùng `npx eslint . --fix`) |
| **Kết quả mong đợi** | Exit code `0`, không có warning hoặc error |
| **Kiểm tra sau lệnh** | Terminal hiển thị sạch sẽ, không có thông báo vi phạm quy tắc |
| **Cảnh báo** | Cảnh báo unused variables hoặc unhandled promises đều phải được xử lý triệt để |

### 2.3. `npm run test:run`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run test:run` *(Thực thi: `vitest run`)* |
| **Mục đích** | Chạy toàn bộ các ca kiểm thử tự động một lần duy nhất và xuất báo cáo tổng hợp |
| **Khi sử dụng** | Bắt buộc chạy trong bước nghiệm thu task, trước khi merge, và khi kiểm thử hồi quy trên `develop` |
| **Điều kiện** | Dự án có các file test đuôi `*.test.ts` hoặc `*.spec.ts` |
| **Tác động** | Thực thi mã test trong môi trường Node/JSDOM, không sửa đổi code |
| **Kết quả mong đợi** | `100% tests passed`, không có test suite nào bị fail |
| **Kiểm tra sau lệnh** | Bảng tóm tắt của Vitest hiển thị màu xanh: `Test Files N passed (N), Tests M passed (M)` |
| **Cảnh báo** | Đừng nhầm lệnh này với `npm run test` (vốn chạy ở chế độ watch vô tận, dễ treo process tự động) |

### 2.4. `npm run test`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run test` *(Thực thi: `vitest`)* |
| **Mục đích** | Khởi động trình chạy test ở chế độ theo dõi tương tác (Interactive Watch Mode) |
| **Khi sử dụng** | Dành riêng cho lập trình viên con người khi đang trực tiếp code để thấy kết quả test tức thì |
| **Điều kiện** | Chạy trong terminal tương tác |
| **Tác động** | Giữ tiến trình mở và tự động chạy lại test mỗi khi có file được lưu |
| **Kết quả mong đợi** | Giao diện tương tác Vitest sẵn sàng nhận phím bấm (`q` để thoát, `a` để chạy lại tất cả) |
| **Kiểm tra sau lệnh** | Nhấn `q` để kết thúc tiến trình |
| **Cảnh báo** | **CẤM AI CHẠY LỆNH NÀY TRONG SUBPROCESS TỰ ĐỘNG** vì sẽ làm treo lượt xử lý |

### 2.5. `npm run build`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run build` *(Thực thi: `tsc -b && vite build`)* |
| **Mục đích** | Kiểm tra toàn bộ kiểu dữ liệu và đóng gói mã nguồn sản phẩm thành bundle production tại `dist/` |
| **Khi sử dụng** | Cổng kiểm tra cuối cùng trước khi đóng task hoặc release sprint |
| **Điều kiện** | Toàn bộ source code trong `/src/` hợp lệ, không có lỗi import hay thiếu assets |
| **Tác động** | Tạo mới hoặc ghi đè thư mục `dist/` |
| **Kết quả mong đợi** | Thư mục `dist/` được sinh ra chứa `index.html` và các file `assets/*.js, *.css` tối ưu |
| **Kiểm tra sau lệnh** | Thư mục `dist/` tồn tại và lệnh kết thúc không báo lỗi |
| **Cảnh báo** | Thư mục `dist/` đã nằm trong `.gitignore`, không được commit `dist/` vào Git |

### 2.6. `npm run dev`
| Trường | Nội dung chi tiết |
| :--- | :--- |
| **Cú pháp** | `npm run dev` *(Thực thi: `vite`)* |
| **Mục đích** | Khởi động máy chủ phát triển cục bộ với tính năng Hot Module Replacement (HMR) |
| **Khi sử dụng** | Dành cho Human mở game trên trình duyệt để kiểm tra trực quan giao diện và đồ họa |
| **Điều kiện** | Cổng mạng (mặc định 5173) chưa bị ứng dụng khác chiếm dụng |
| **Tác động** | Mở một server local tại `http://localhost:5173/` |
| **Kết quả mong đợi** | Terminal in ra địa chỉ URL cục bộ và sẵn sàng phục vụ trình duyệt |
| **Kiểm tra sau lệnh** | Mở trình duyệt truy cập `http://localhost:5173/` thấy giao diện game tải lên bình thường |
| **Cảnh báo** | Nhấn `Ctrl + C` để tắt server khi kiểm tra xong |

---

## 3. Bảng Tra Cứu Lệnh Quản Trị Git Dành Cho Human

### 3.1. Phân Nhánh Cho Task Mới
```bash
# Cú pháp chuẩn tạo nhánh task bắt nguồn từ develop mà không cần checkout develop
git branch task/TASK-XXX-<slug> develop
git checkout task/TASK-XXX-<slug>
```
- **Điều kiện**: Task `TASK-XXX` đã ở trạng thái `READY` trong `.ai/tasks/TASK_PROCESSING.md`.
- **Tác động**: Tạo một nhánh riêng biệt, đảm bảo mã nguồn mới nhất bắt đầu từ `develop`.

### 3.2. Xem Diff Trước Khi Nghiệm Thu
```bash
# Xem danh sách các commit trên nhánh task so với develop
git log develop..HEAD --oneline

# Xem toàn bộ diff chi tiết giữa nhánh task và develop
git diff develop..HEAD

# Xem riêng các file trong src/ bị thay đổi
git diff develop..HEAD -- src/
```
- **Tác động**: Chỉ đọc, giúp Human rà soát xem AI có sửa ngoài phạm vi `ALLOWED FILES` không.

### 3.3. Merge Nhánh Task Vào `develop` (Quyền Riêng Của Human)
```bash
git checkout develop
git pull origin develop
git merge --no-ff task/TASK-XXX-<slug> -m "Merge task/TASK-XXX-<slug> into develop"
git push origin develop
```
- **Tác động**: Tích hợp mã nguồn của task và các đề xuất `PROP-XXX` đi kèm vào lịch sử chính thức của `develop`.
- **Cảnh báo**: Luôn dùng cờ `--no-ff` (no fast-forward) để bảo tồn dấu mốc tích hợp rõ ràng.

---

## 4. Bảng Tra Cứu Lệnh Chỉ Đạo AI Bằng Lời Nhắc (Prompt Vocabulary)

Theo chuẩn `.ai/protocol/COMMANDS.md`, AI phân tích prompt của bạn thành 11 lệnh nền tảng sau:

| Lệnh | Ý nghĩa | AI có được sửa `/src/`? | Mẫu prompt chuẩn cho Human |
| :--- | :--- | :--- | :--- |
| **`ANALYZE`** | Khảo sát, tìm hiểu nguyên nhân, đánh giá kiến trúc | **CẤM** | *"ANALYZE TASK-003. Khảo sát hiện trạng module và đối chiếu với .document/current/ARCHITECTURE.md. KHÔNG SỬA CODE."* |
| **`DESIGN`** | Soạn thảo giải pháp kỹ thuật, API, Test Plan trong file task | **CẤM** | *"DESIGN TASK-002. Hoàn thiện Phần 1 trong .ai/tasks/active/TASK-002.md. TUYỆT ĐỐI CHƯA ĐƯỢC VIẾT CODE VÀO /src/."* |
| **`IMPLEMENT`**| Lập trình mã nguồn và unit test theo thiết kế đã duyệt | **CÓ (chỉ trên nhánh `task/*`)** | *"IMPLEMENT TASK-002 theo thiết kế đã phê duyệt. Chỉ tạo và sửa các file trong ALLOWED FILES và viết unit test."* |
| **`TEST`** | Chạy bộ công cụ kiểm tra tự động | **CẤM** | *"TEST TASK-002 WITHOUT MODIFYING SOURCE. Chạy typecheck, lint, test:run, build và báo cáo kết quả."* |
| **`REVIEW`** | Đánh giá diff, kiểm tra tuân thủ kiến trúc và hợp đồng | **CẤM** | *"REVIEW TASK-002 diff so với origin/develop. Đánh giá tính tuân thủ tiêu chí nghiệm thu Acceptance Criteria."* |
| **`REPORT`** | Lập báo cáo tiến độ, đánh giá sprint, thống kê nợ kỹ thuật | **CẤM (chỉ file docs)** | *"REPORT đánh giá tổng kết Sprint 2 trên nhánh develop. Liệt kê các tính năng đã hoàn tất và nợ kỹ thuật tồn đọng."* |
| **`PROPOSE`** | Soạn thảo đề xuất thay đổi kiến trúc/API dùng chung | **CẤM (chỉ PROP-XXX.md)**| *"PROPOSE giải pháp tái cấu trúc Game State Machine, DO NOT IMPLEMENT. Tạo file PROP-XXX và commit riêng biệt."* |
| **`DOCUMENT`**| Tạo hoặc cập nhật tài liệu kỹ thuật trong `.document/` | **CẤM /src/** | *"DOCUMENT cập nhật hợp đồng API trong .document/current/API_CONTRACTS.md theo đề xuất PROP-001 đã duyệt."* |
| **`COMMIT`** | Tạo commit Git nguyên tử theo chuẩn | **CẤM** | *"Tạo commit triển khai theo chuẩn 'TASK-002: <mô tả>' và commit riêng cho proposal nếu có."* |
| **`PUSH`** | Đẩy nhánh task hiện tại lên remote repository | **CẤM** | *"Đẩy nhánh task/TASK-002-... lên GitHub."* |
| **`STOP`** | Dừng khẩn cấp toàn bộ hoạt động | **CẤM** | *"STOP ngay lập tức. Giữ nguyên kho chứa và báo cáo vị trí đang làm dở."* |

---

## 5. Các Từ Bổ Trợ Tinh Chỉnh Ý Định (Command Modifiers)

Bạn có thể thêm các từ bổ trợ sau vào câu nói để khóa chặt hành vi của AI:
- **`ONLY`**: Chỉ làm đúng một việc duy nhất *(Ví dụ: `"ANALYZE TASK-001 ONLY"`)*.
- **`DO_NOT` / `WITHOUT`**: Cấm một hành động cụ thể *(Ví dụ: `"DESIGN TASK-001, DO NOT IMPLEMENT"`, `"TEST WITHOUT MODIFYING SOURCE"`)*.
- **`INSPECT`**: Yêu cầu khảo sát sơ bộ trước khi đưa ra kết luận *(Ví dụ: `"INSPECT module warehouse trước khi thiết kế"`)*.
- **`RESUME` / `CONTINUE`**: Tiếp tục phiên làm việc từ nhật ký bàn giao trước đó *(Ví dụ: `"RESUME TASK-001 từ điểm dừng của phiên trước"`)*.

