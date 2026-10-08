# Sổ Tay Vận Hành Dành Riêng Cho Lập Trình Viên Con Người (.human)

Chào mừng hai lập trình viên con người đến với không gian quản trị hệ thống phát triển **Website Trò Chơi Thuật Toán (Algorithm Game Website)**.

Thư mục `.human/` là **Sổ tay Vận hành (Human Operating Manual)** và **Bộ nhớ Hệ thống (Human Memory)**. Thư mục này được thiết kế để giúp bạn kiểm soát, điều phối và chỉ đạo các phiên làm việc của AI một cách hoàn toàn chủ động, an toàn và có trật tự.

---

## 1. Cấu Trúc Tổng Thể Thư Mục `.human/`

```
.human/
├── README.md               # Tài liệu tổng quan này (Tiếng Việt)
├── MANUAL.md               # Cẩm nang vận hành cốt lõi cho lập trình viên
├── AI_GUIDE.md             # Hướng dẫn bản chất làm việc và tương tác với AI
├── CONTROL_GUIDE.md        # Hướng dẫn chỉ đạo AI bằng lời nhắc (Prompt & Control Guide)
├── TASK_GUIDE.md           # Hướng dẫn tạo, giao và quản lý nhiệm vụ
├── GIT_GUIDE.md            # Hướng dẫn quản trị nhánh Git, commit và merge
├── WORKFLOW.md             # Hướng dẫn quy trình phát triển và chu trình sprint
│
├── commands/               # Sổ tay các câu lệnh thông dụng
│   ├── README.md           # Giới thiệu danh mục lệnh
│   ├── git.md              # Các lệnh Git quan trọng thường dùng
│   ├── development.md      # Các lệnh chạy môi trường phát triển & build
│   ├── testing.md          # Các lệnh chạy kiểm thử, lint, typecheck
│   └── ai.md               # Các lệnh kiểm tra và chỉ đạo AI
│
├── procedures/             # Quy trình thao tác chuẩn (SOP) theo từng tình huống
│   ├── README.md           # Giới thiệu các quy trình chuẩn
│   ├── start-session.md    # Quy trình khởi động phiên làm việc mới
│   ├── assign-task.md      # Quy trình tạo và giao task cho AI
│   ├── stop-ai.md          # Quy trình dừng khẩn cấp hoặc can thiệp AI
│   ├── switch-task.md      # Quy trình điều chuyển AI sang task khác
│   ├── review-task.md      # Quy trình nghiệm thu mã nguồn task
│   ├── complete-task.md    # Quy trình tích hợp và đóng task
│   └── sprint-review.md    # Quy trình đánh giá tổng kết sprint trên develop
│
├── decisions/              # Lưu vết các quyết định nội bộ của nhóm con người
├── notes/                  # Ghi chú kỹ thuật dùng chung
├── history/                # Nhật ký lịch sử dự án do con người ghi lại
└── local/                  # Thư mục máy cá nhân (BỊ GIT BỎ QUA - IGNORED)
```

---

## 2. Phân Tách Không Gian: Chung (`shared`) vs Cục Bộ (`local`)
- **Tất cả các tài liệu bên ngoài `.human/local/`**: Được Git theo dõi và đồng bộ lên GitHub bình thường để hai lập trình viên dùng chung.
- **`.human/local/`**: Nằm trong `.gitignore`. Dùng cho ghi chú cá nhân, cấu hình máy riêng của từng người, tuyệt đối không bị đẩy lên Git, tránh xung đột giữa 2 máy.

---

## 3. Nguyên Tắc Cốt Lõi Dành Cho Con Người
1. **Con Người Là Quyền Lực Tối Cao**: AI không tự quyết định mục tiêu, không tự merge nhánh, không tự cài thư viện. AI chỉ đề xuất và thực thi trong ranh giới được giao.
2. **AI Không Tự Động Đọc `.human/`**: AI ở các nhánh làm việc (`task/*`, `develop`) bị cấm tự động nạp thư mục này. Bạn điều khiển AI trực tiếp qua lời nhắc (prompt); các quy tắc và giao thức tĩnh được đặt trong thư mục `.ai/`.
3. **Mỗi AI = Một Task**: Luôn đảm bảo một AI chỉ tập trung vào đúng một task tại một thời điểm.
4. **Không Để Lại Bí Mật**: Tuyệt đối không commit password, API keys, token vào các file được Git theo dõi.
