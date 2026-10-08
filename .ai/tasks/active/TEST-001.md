# TEST-001: Protocol Dry Run

```yaml
TASK_ID: TEST-001
TITLE: Protocol Dry Run
STATUS: READY
PRIORITY: LOW
CREATED: 2026-10-08
CURRENT_BRANCH: task/TEST-001-protocol-dry-run
CURRENT_SESSION: NONE
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)
> *Phần này BẮT BUỘC phải được hoàn thiện đầy đủ và tự kiểm tra kỹ lưỡng trước khi bắt đầu viết bất kỳ dòng mã nguồn nào.*

### 1. Mục Tiêu (GOAL)
- Thực hiện một lượt chạy thử nghiệm giao thức (Protocol Dry Run) khép kín nhằm xác thực tính toàn vẹn và mức độ tuân thủ quy trình kiểm soát AI (AI Control Protocol) trong toàn bộ vòng đời tác vụ.
- Đây **KHÔNG PHẢI** là tính năng sản phẩm (NOT a product feature). Nhiệm vụ chỉ nhằm kiểm tra và xác nhận các bước vận hành:
  1. Cơ chế nhận nhiệm vụ (Task Claiming).
  2. Cách ly nhánh Git (Branch Isolation trên nhánh `task/TEST-001-protocol-dry-run`).
  3. Giới hạn phạm vi tệp tin (Task Scope & Allowed Files Boundary).
  4. Triển khai mã an toàn và vô hại (Harmless Implementation).
  5. Kiểm thử tự động (Unit test, typecheck, lint, build).
  6. Quy chuẩn commit message (Commit Discipline).
  7. Đẩy mã nguồn lên remote (Push to Task Branch).
  8. Lập biên bản bàn giao phiên làm việc (Session Handoff & Session Logging).
  9. Tích hợp bởi lập trình viên con người (Integration to `develop`).
  10. Con người hoàn tất chu trình và đóng task (Human Completion to `DONE`).

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - Tạo triển khai thử nghiệm vô hại (harmless protocol test implementation) bên trong `src/test/protocol-dry-run/dryRun.ts`.
  - Tạo bộ kiểm thử đơn vị tương ứng bên trong `src/test/protocol-dry-run/dryRun.test.ts`.
  - Quản lý trạng thái task tại `.ai/tasks/active/TEST-001.md` và `.ai/tasks/TASK_PROCESSING.md`.
  - Ghi nhật ký phiên làm việc tại `.ai/sessions/SESSION-001.md`.
- **Nằm ngoài phạm vi**:
  - Tuyệt đối KHÔNG tác động tới bất kỳ mã nguồn chức năng sản phẩm nào trong `/src/` (game engine, visual components, algorithm logic,...).
  - Tuyệt đối KHÔNG thay đổi cấu hình dự án (`package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`).
  - Tuyệt đối KHÔNG merge code vào `develop` hoặc `main` (quyền hạn thuộc về Human).
  - Tuyệt đối KHÔNG tự ý đánh dấu trạng thái `DONE` (chỉ Human mới có quyền hoàn tất task).

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES** (Các file ĐƯỢC PHÉP tạo hoặc chỉnh sửa):
  - `src/test/protocol-dry-run/dryRun.ts`
  - `src/test/protocol-dry-run/dryRun.test.ts`
  - `.ai/tasks/active/TEST-001.md`
  - `.ai/tasks/TASK_PROCESSING.md`
  - `.ai/sessions/SESSION-001.md`
- **RESTRICTED FILES** (Các file TUYỆT ĐỐI CẤM chạm vào):
  - Tất cả các tệp khác trong toàn bộ dự án trừ khi được giao thức chỉ định bắt buộc.
  - Cụ thể cấm tuyệt đối:
    - `.ai/CONTROL.md`
    - `.ai/BRANCH_RULES.md`
    - `.ai/AI_RULES.md`
    - `.ai/GIT_RULES.md`
    - `.human/**`
    - Toàn bộ thư mục mã nguồn sản phẩm: `src/main.tsx`, `src/App.tsx`, `src/index.css`, components, game logic, assets...
    - Toàn bộ tệp cấu hình dự án: `package.json`, `tsconfig*.json`, `vite.config.ts`, `eslint.config.js`.
- **FILES EXPECTED TO CHANGE** (Các file dự kiến sẽ thay đổi khi triển khai):
  - `src/test/protocol-dry-run/dryRun.ts` (mới tạo)
  - `src/test/protocol-dry-run/dryRun.test.ts` (mới tạo)
  - `.ai/tasks/active/TEST-001.md` (cập nhật trạng thái và nhật ký triển khai)
  - `.ai/tasks/TASK_PROCESSING.md` (đồng bộ trạng thái)
  - `.ai/sessions/SESSION-001.md` (mới tạo để ghi chép handoff)
- **INTEGRATION POINTS**:
  - Test runner Vitest (`npm run test:run`) tự động thu thập và thực thi tệp `src/test/protocol-dry-run/dryRun.test.ts`.
  - Không có bất kỳ điểm kết nối hay phụ thuộc nào với mã nguồn chính của ứng dụng.

### 4. Các Phụ Thuộc (DEPENDENCIES)
- **DEPENDENCIES**: `[]` (Không có task phụ thuộc tiên quyết).
- **Hệ thống hiện hữu liên quan**:
  - Trình kiểm thử: `vitest` (đã cài đặt trong `package.json`).
  - Trình biên dịch: `typescript` (`tsc -b`).
  - Linter: `eslint`.

### 5. Hợp Đồng API & Giao Diện (API CONTRACT & INTERFACES)
Đặc tả giao diện thử nghiệm vô hại:
```typescript
/**
 * Kết quả thực thi của giao thức chạy thử nghiệm (Protocol Dry Run).
 */
export interface ProtocolDryRunResult {
  /** Trạng thái thực thi, mặc định luôn là 'SUCCESS' khi hợp lệ */
  status: 'SUCCESS';
  /** Dấu thời gian chuẩn ISO 8601 tại thời điểm chạy */
  timestamp: string;
  /** Phiên bản của quy trình kiểm soát được kiểm thử */
  protocolVersion: string;
  /** Cờ xác nhận tính toàn vẹn của giao thức */
  verified: boolean;
}

/**
 * Thực thi kiểm tra giao thức chạy thử.
 * @param protocolVersion - Mã phiên bản giao thức (mặc định '1.0.0')
 * @returns ProtocolDryRunResult
 */
export function executeDryRun(protocolVersion?: string): ProtocolDryRunResult;
```

### 6. Luồng Dữ Liệu (DATA FLOW)
```
[Caller / Vitest Runner]
         │
         ▼
[executeDryRun(protocolVersion)]
         │
         ├─► Đọc protocolVersion (hoặc gán fallback '1.0.0')
         ├─► Sinh timestamp ISO từ Date.now()
         ├─► Thiết lập cờ verified = true
         └─► Đóng gói ProtocolDryRunResult
         │
         ▼
[Kiểm tra Assertions trong dryRun.test.ts]
```

### 7. Thiết Kế Chi Tiết (DESIGN)
- Hàm `executeDryRun` là hàm thuần túy (pure function), không có hiệu ứng phụ (no side-effects), không tương tác DOM, không can thiệp network hoặc file system runtime.
- Cấu trúc thư mục cách ly: `src/test/protocol-dry-run/`.
- Thiết kế đảm bảo kiểm tra tính độc lập tuyệt đối: không import bất kỳ tệp sản phẩm nào khác trong `src/`.

### 8. Kế Hoạch Kiểm Thử (TEST PLAN)
Bộ kiểm thử `src/test/protocol-dry-run/dryRun.test.ts` phải bao gồm:
1. **Kiểm thử giá trị mặc định (Default execution)**:
   - Gọi `executeDryRun()` không tham số.
   - Kỳ vọng `status === 'SUCCESS'`.
   - Kỳ vọng `verified === true`.
   - Kỳ vọng `protocolVersion === '1.0.0'`.
   - Kỳ vọng `timestamp` là chuỗi ISO 8601 hợp lệ (`!isNaN(Date.parse(timestamp))`).
2. **Kiểm thử tham số tùy biến (Custom parameter)**:
   - Gọi `executeDryRun('2.0.0-beta')`.
   - Kỳ vọng `protocolVersion === '2.0.0-beta'`.
3. **Kiểm thử tính bất biến (Immutability & schema validation)**:
   - Xác nhận đối tượng trả về chứa đầy đủ các trường yêu cầu mà không bị thiếu sót trường nào.

### 9. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [ ] Tệp `src/test/protocol-dry-run/dryRun.ts` được tạo đúng vị trí, tuân thủ interface `ProtocolDryRunResult`.
- [ ] Tệp `src/test/protocol-dry-run/dryRun.test.ts` được tạo đúng vị trí, bao phủ 100% các ca kiểm thử trong Test Plan.
- [ ] Bộ kiểm thử chạy qua 100%: `npm run test:run` vượt qua cả test dry-run và không gây thoái lui (regression).
- [ ] Không có lỗi typecheck: `npm run typecheck` báo 0 lỗi (`tsc -b`).
- [ ] Không có lỗi lint: `npm run lint` báo 0 lỗi.
- [ ] Quá trình build hoàn thành sạch sẽ: `npm run build` thành công.
- [ ] Chỉ các tệp trong danh sách `ALLOWED FILES` bị thay đổi hoặc tạo mới.
- [ ] Trạng thái task trên `.ai/tasks/active/TEST-001.md` và `.ai/tasks/TASK_PROCESSING.md` được đồng bộ chuẩn xác.
- [ ] Biên bản phiên làm việc `.ai/sessions/SESSION-001.md` được tạo đầy đủ theo mẫu chuẩn.

### 10. Yêu Cầu Bàn Giao & Quy Trình Kiểm Thử Giao Thức (HANDOFF REQUIREMENTS & PROTOCOL STEPS)
Để xác nhận thành công Protocol Dry Run, quy trình phải trải qua tuần tự các bước kiểm chứng:
1. **Task Claiming (Nhận việc)**:
   - AI chỉ chuyển trạng thái từ `READY` sang `CLAIMED` khi có chỉ thị rõ ràng từ Con người.
   - Cập nhật nhánh làm việc `CURRENT_BRANCH: task/TEST-001-protocol-dry-run` và `CURRENT_SESSION: SESSION-001`.
2. **Branch Isolation (Cách ly nhánh)**:
   - Triển khai và commit chỉ được thực hiện trên nhánh `task/TEST-001-protocol-dry-run` tách ra từ `develop`.
   - Tuyệt đối không commit hay sửa code trên `main` hoặc `develop`.
3. **Task Scope (Ranh giới phạm vi)**:
   - Tuyệt đối không chỉnh sửa bất kỳ tệp nào nằm ngoài danh sách `ALLOWED FILES`.
4. **Implementation & Testing (Triển khai & Kiểm thử)**:
   - Tạo mã nguồn và chạy toàn bộ chuỗi xác minh: `typecheck`, `lint`, `test:run`, `build`.
5. **Commit & Push (Lưu trữ và đẩy nhánh)**:
   - Tạo commit với thông điệp chuẩn mực: `test(protocol): complete dry run implementation for TEST-001`.
   - Đẩy nhánh lên remote repository.
6. **Handoff (Bàn giao)**:
   - Lập biên bản bàn giao tại `.ai/sessions/SESSION-001.md`.
   - Cập nhật trạng thái task thành `READY_FOR_REVIEW` trên task file và `TASK_PROCESSING.md`.
   - Dừng hành động (`STOP`) và bàn giao lại cho Con người.
7. **Integration & Human Completion (Tích hợp & Hoàn tất)**:
   - Con người kiểm tra diff, chạy kiểm thử xác minh trên nhánh `develop`, merge nhánh `task/TEST-001-protocol-dry-run` vào `develop`.
   - Con người chuyển task sang trạng thái `DONE` và di chuyển tệp vào `.ai/tasks/completed/TEST-001.md`.

### 11. Rủi Ro & Giải Pháp (RISKS)
- **Rủi ro rò rỉ mã thử nghiệm vào bundle sản phẩm**:
  - *Giải pháp*: Mã được đặt trong `src/test/`, không được import bởi bất kỳ file nào trong luồng sản phẩm của `src/main.tsx` hoặc ứng dụng, đảm bảo tree-shaking và không ảnh hưởng tới production artifact.
- **Rủi ro vi phạm ranh giới nhánh Git**:
  - *Giải pháp*: Kiểm tra nhánh hiện tại trước khi thực hiện viết mã hoặc commit; dừng lại ngay lập tức nếu không ở trên nhánh `task/TEST-001-protocol-dry-run`.

### 12. Yêu Cầu Thay Đổi Kiến Trúc (CHANGE REQUIREMENTS)
- Không có. Nhiệm vụ không yêu cầu thay đổi bất kỳ thành phần kiến trúc nào.

---

## PHẦN 2: TRIỂN KHAI MÃ NGUỒN (IMPLEMENTATION)
> *Chỉ được thực hiện khi Phần 1 đã hoàn thiện, thỏa mãn ranh giới nhánh Git (`.ai/BRANCH_RULES.md`) và nhận được chỉ thị `IMPLEMENT` hợp lệ từ Con người theo `.ai/CONTROL.md`.*

### 1. Nhật Ký Triển Khai (IMPLEMENTATION NOTES)
*(Chưa thực hiện - Đang ở pha DESIGN)*

### 2. Trạng Thái Đánh Giá Của AI (REVIEW STATUS)
*(Chưa thực hiện - Đang ở pha DESIGN)*

### 3. Quyết Định Của Con Người (HUMAN DECISION)
*(Chờ đánh giá thiết kế từ Developer)*

### 4. Thông Tin Hoàn Tất (COMPLETION INFORMATION)
*(Chưa hoàn tất - Task đang ở trạng thái READY)*
