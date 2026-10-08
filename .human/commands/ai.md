# Các Mẫu Chỉ Đạo & Prompt AI (AI Commands & Prompts)

## 1. Prompt Bắt Đầu Một Phiên Task
```text
Bạn đang là Task AI. Hãy kiểm tra .ai/CONTROL.md, xác nhận bạn đang ở nhánh task/TASK-XXX-<slug>, đọc file .ai/tasks/active/TASK-XXX.md và hoàn thành Phần 1 (Thiết kế trước khi viết code) trước khi thực hiện mã nguồn.
```

## 2. Prompt Yêu Cầu Tự Kiểm Tra & Nghiệm Thu
```text
Hãy chạy toàn bộ bộ kiểm tra gồm: npm run typecheck, npm run lint, npm run test:run, npm run build. Nếu toàn bộ đạt 0 lỗi, hãy commit theo chuẩn "TASK-XXX: description", push nhánh và cập nhật task sang READY_FOR_REVIEW kèm theo nhật ký bàn giao SESSION.
```

## 3. Prompt Yêu Cầu Dừng & Chuyển Task Khẩn Cấp
```text
Hãy dừng viết code tại điểm an toàn hiện tại, chạy test nhanh, commit toàn bộ thay đổi dở dang với thông điệp "TASK-XXX: WIP pause", push nhánh lên remote, cập nhật trạng thái PAUSED và viết file bàn giao handoff trong .ai/sessions/.
```
