# Các Mẫu Chỉ Đạo & Prompt AI (AI Commands & Prompts)

Tài liệu này cung cấp các mẫu prompt chuẩn để Lập trình viên Con người chỉ đạo AI theo đặc tả lệnh trong [`.ai/CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md).

---

## 1. Prompt Bắt Đầu Task - Pha Thiết Kế (DESIGN)
```text
DESIGN TASK-XXX. Hoàn thiện Phần 1 (Mục tiêu, API, Data Flow, Test Plan) trong .ai/tasks/active/TASK-XXX.md. Chưa viết code vào /src/.
```

## 2. Prompt Bắt Đầu Task - Pha Triển Khai (IMPLEMENT)
```text
IMPLEMENT TASK-XXX theo đặc tả thiết kế đã được duyệt. Chỉ chỉnh sửa các tệp trong ALLOWED FILES và viết đầy đủ unit test.
```

## 3. Prompt Kiểm Thử Độc Lập (TEST)
```text
TEST TASK-XXX WITHOUT MODIFYING SOURCE. Chạy toàn bộ kiểm thử: npm run typecheck, npm run lint, npm run test:run, npm run build và báo cáo kết quả.
```

## 4. Prompt Rà Soát Chất Lượng (REVIEW)
```text
REVIEW TASK-XXX diff so với nhánh develop. Kiểm tra tính tuân thủ hợp đồng API, kiến trúc phân lớp và các tiêu chí nghiệm thu.
```

## 5. Prompt Đề Xuất Cải Tiến / Thay Đổi Kiến Trúc (PROPOSE)
```text
PROPOSE giải pháp tái cấu trúc module <Tên Module>, DO NOT IMPLEMENT. Tạo file proposal trong .ai/changes/proposals/ và phân tích rủi ro.
```

## 6. Prompt Nghiệm Thu & Đóng Gói Hoàn Tất (COMMIT & PUSH)
```text
Kiểm tra lại toàn bộ verification gates (typecheck, lint, test, build). Nếu đạt 0 lỗi, hãy COMMIT theo chuẩn "TASK-XXX: <mô tả>", PUSH nhánh lên remote, cập nhật task sang READY_FOR_REVIEW và ghi SESSION log.
```

## 7. Prompt Dừng Khẩn Cấp Hoặc Chuyển Task (Task Preemption / STOP)
```text
Dừng viết code tại điểm an toàn hiện tại. Chạy test nhanh, COMMIT toàn bộ thay đổi dở dang với thông điệp "TASK-XXX: WIP pause at <vị trí>", PUSH nhánh lên remote, cập nhật trạng thái PAUSED và ghi file bàn giao handoff trong .ai/sessions/.
```

## 8. Prompt Dừng Ngay Lập Tức (STOP)
```text
STOP ngay lập tức. Giữ nguyên toàn bộ trạng thái kho chứa và báo cáo vị trí hiện tại.
```
