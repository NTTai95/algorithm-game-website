# Hướng Dẫn Quản Trị Nhánh & Quy Chuẩn Git Cho Human (.human/operations/branches-and-git.md)

Tài liệu này chuyển hóa toàn bộ quy tắc phân quyền nhánh Git (`.ai/rules/BRANCH_RULES.md`) và giao thức quản lý Git (`.ai/rules/GIT_RULES.md`) thành cẩm nang vận hành thực tế dành cho Lập trình viên Con người (Human).

---

## 1. Bản Đồ Phân Quyền 3 Tầng Nhánh Git

```
┌────────────────────────────────────────────────────────────────────────┐
│                              NHÁNH MAIN                                │
│           System Architecture, Master Planning & Protocol             │
│                                                                        │
│ - Mục đích: Bản phát hành chính thức, tài liệu kiến trúc, giao thức    │
│ - AI được phép: Đọc/sửa .document/, .ai/, .human/; lập kế hoạch Sprint │
│ - AI TUYỆT ĐỐI CẤM: Chỉnh sửa bất kỳ file nào trong /src/              │
│ - Giới hạn tác tử: Tuần tự — duy nhất 1 AI tại một thời điểm           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Human duyệt & merge develop -> main
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             NHÁNH DEVELOP                              │
│                 Integration Verification & Sprint Review               │
│                                                                        │
│ - Mục đích: Tích hợp các tính năng đã hoàn tất, kiểm thử hồi quy       │
│ - AI được phép: Chạy toàn bộ test, typecheck, lint, build; lập báo cáo │
│ - AI TUYỆT ĐỐI CẤM: Lập trình tính năng mới hoặc sửa file trong /src/  │
│ - Giới hạn tác tử: Tuần tự — duy nhất 1 AI tại một thời điểm           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Phân nhánh khởi nguồn cho task mới
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        NHÁNH TASK/TASK-XXX-<slug>                      │
│                        Implementation & Unit Testing                   │
│                                                                        │
│ - Mục đích: Lập trình tính năng cụ thể và viết unit test tương ứng     │
│ - AI được phép: Sửa mã nguồn trong /src/ (CHỈ TRONG ALLOWED FILES)     │
│ - AI TUYỆT ĐỐI CẤM: Checkout sang main/develop, merge vào develop/main │
│ - Giới hạn tác tử: Đa tác tử — cho phép nhiều AI chạy song song        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Quy Chuẩn Đặt Tên Commit (Commit Naming Conventions)

Theo chuẩn `.ai/rules/GIT_RULES.md` Mục 1, mọi commit phải mang tính nguyên tử (atomic) và tuân thủ các mẫu chuẩn sau:

| Loại Commit | Tiền tố | Mẫu thông điệp | Ví dụ thực tế |
| :--- | :--- | :--- | :--- |
| **Thực thi nhiệm vụ** | `TASK-XXX:` | `TASK-XXX: <mô tả ngắn gọn bằng thể mệnh lệnh>` | `TASK-001: implement warehouse slot domain model` |
| **Đề xuất kiến trúc/API**| `PROP-XXX:` | `PROP-XXX: <mô tả ngắn gọn đề xuất>` | `PROP-014: propose crane controller interface revision`|
| **Khởi tạo nền tảng** | `INIT-XXX:` | `INIT-XXX: <mô tả giao thức hoặc nền tảng>` | `INIT-001: establish project foundation` |
| **Lưu trạng thái dở dang**| `TASK-XXX:` | `TASK-XXX: WIP pause at <vị trí cụ thể>` | `TASK-001: WIP pause at slot validation logic` |
| **Tích hợp của Human** | `Merge ...` | `Merge task/TASK-XXX-<slug> into develop` | `Merge task/TASK-001-warehouse-domain into develop` |

> [!CAUTION]
> **Tuyệt đối cấm commit mơ hồ**: Các commit như `fix`, `update`, `test`, `changes`, `wip`, `refactor` bị cấm hoàn toàn trong toàn bộ repository.

---

## 3. Quy Tắc Tách Biệt Commit Triển Khai & Commit Đề Xuất (Rule 13)

Đề xuất (`Proposal`) là **tài sản dùng chung vĩnh viễn của dự án**. Khi AI phát hiện cơ hội hoặc nhu cầu cải tiến kiến trúc/API trong quá trình làm task:
1. **Bắt buộc tạo 2 commit tách biệt**:
   - **Commit 1 (Implementation Commit)**: Chỉ chứa mã nguồn tính năng, tests và tài liệu triển khai trong phạm vi của task (`TASK-XXX: ...`).
   - **Commit 2 (Proposal Commit)**: Chỉ chứa file đề xuất `.ai/changes/proposals/PROP-XXX.md` và cập nhật liên kết (`PROP-XXX: ...`).
2. **CẤM GỘP CHUNG**: Tuyệt đối không tạo một commit hỗn hợp như `TASK-001: implement slot and add proposal`.
3. **Đẩy lên Remote**: Cả hai commit đều phải được đẩy lên GitHub để lập trình viên khác hoặc các phiên AI khác khi `git pull` đều nhìn thấy đề xuất.

---

## 4. Quy Trình Merge Nhánh Task Vào `develop` Dành Riêng Cho Human

AI **tuyệt đối không được phép** tự động chạy lệnh merge nhánh task vào `develop`. Đây là ranh giới quyền hạn tối cao của bạn:

```bash
# Bước 1: Chuyển sang nhánh develop và kéo code mới nhất
git checkout develop
git pull origin develop

# Bước 2: Kiểm tra lịch sử commit và diff của nhánh task
git log develop..task/TASK-XXX-<slug> --oneline
git diff develop..task/TASK-XXX-<slug>

# Bước 3: Thực hiện lệnh merge (luôn dùng cờ --no-ff để lưu vết rõ ràng)
git merge --no-ff task/TASK-XXX-<slug> -m "Merge task/TASK-XXX-<slug> into develop"

# Bước 4: Chạy kiểm tra tích hợp toàn diện trên develop
npm run typecheck
npm run lint
npm run test:run
npm run build

# Bước 5: Đẩy develop đã tích hợp lên remote repository
git push origin develop
```

---

## 5. Xử Lý Xung Đột Nhánh (Conflict Resolution)

Khi có xung đột giữa nhánh task và nhánh `develop` (thường xảy ra khi hai lập trình viên cùng merge task):

1. **Nguyên tắc**: Con người trực tiếp phân xử hoặc chủ động chỉ đạo AI giải quyết xung đột trên chính nhánh task, **không giải quyết xung đột trực tiếp trên develop**.
2. **Các bước xử lý chuẩn**:
   ```bash
   # Đứng trên nhánh task
   git checkout task/TASK-XXX-<slug>
   
   # Kéo các thay đổi mới nhất từ develop vào nhánh task
   git merge develop
   
   # Nếu có xung đột, mở các file bị conflict và giải quyết
   # Giữ lại logic đúng của cả hai bên theo Architecture Doc
   ```
3. Sau khi giải quyết xong xung đột, bắt buộc chạy lại `npm run typecheck` và `npm run test:run` để đảm bảo code không bị lỗi runtime trước khi commit merge conflict.

---

## 6. Những Điều Không Được Suy Diễn Từ Một Thông Báo Git

- **AI báo commit thành công**: Không có nghĩa là code đã được push lên GitHub. Luôn kiểm tra bằng `git log origin/task/...` hoặc `git status`.
- **Lệnh push thành công**: Không có nghĩa là các ca test đã pass. Push chỉ là thao tác đồng bộ file.
- **Merge không có conflict**: Không có nghĩa là hệ thống không bị lỗi logic hồi quy (regression bug). Luôn bắt buộc chạy bộ 4 lệnh kiểm tra sau khi merge.
