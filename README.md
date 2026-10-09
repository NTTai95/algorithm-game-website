# Website Trò Chơi Thuật Toán (Algorithm Game Website)

Nền tảng web giáo dục tương tác về Cấu trúc Dữ liệu và Giải thuật (DSA). Dự án biến các khái niệm thuật toán trừu tượng thành trải nghiệm trò chơi trực quan, dễ hiểu. Trò chơi đầu tiên mô phỏng các thuật toán sắp xếp thông qua bối cảnh kho hàng công nghiệp với các thùng hàng, vị trí lưu trữ và cần cẩu cơ học.

## 1. Công Nghệ Sử Dụng

- **Giao diện**: [React 19](https://react.dev/)
- **Công cụ đóng gói & Máy chủ Dev**: [Vite 8](https://vitejs.dev/)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Game Engine**: [Phaser 3](https://phaser.io/)
- **Bộ kiểm thử (Test Runner)**: [Vitest](https://vitest.dev/)
- **Linter**: [ESLint 9](https://eslint.org/) (Flat Configuration)
- **Styling**: Modern CSS / CSS Modules thuần túy

Dự án duy trì nguyên tắc kiến trúc tinh gọn, không cài đặt các thư viện UI cồng kềnh hay các thư viện quản lý trạng thái bên thứ ba không cần thiết.

## 2. Kiến Trúc Phân Lớp

Hệ thống tuân thủ nghiêm ngặt mô hình kiến trúc phân lớp tách rời một chiều:

```
Application (Giao diện React UI, HUD, Bảng điều khiển)
     ↓
Game Systems (Quản lý màn chơi, Phiên chơi, Âm thanh)
     ↓
Domain / Simulation (Lõi thuật toán DSA, Sinh bước chạy, Phát sự kiện)
     ↓
Rendering / Presentation (Khung vẽ Phaser 3, Hoạt ảnh cần cẩu & thùng hàng)
```

Lõi thuật toán và mô phỏng hoàn toàn độc lập với Phaser và React, cho phép kiểm thử tự động 100% trong môi trường dòng lệnh (headless/Node.js).

## 3. Các Lệnh Phát Triển

```bash
# Cài đặt các gói phụ thuộc
npm install

# Khởi chạy máy chủ phát triển cục bộ
npm run dev

# Kiểm tra kiểu dữ liệu TypeScript
npm run typecheck

# Kiểm tra lỗi cú pháp và chuẩn code bằng ESLint
npm run lint

# Chạy toàn bộ kiểm thử đơn vị một lần
npm run test:run

# Chạy kiểm thử ở chế độ theo dõi tương tác (watch mode)
npm run test

# Đóng gói sản phẩm cho môi trường production
npm run build

# Xem thử bản đóng gói production tại máy cục bộ
npm run preview
```

## 4. Mô Hình 3 Nhánh Logic (Branch Roles)

Hệ thống phân định rạch ròi 3 vai trò nhánh logic (chi tiết tại [`.ai/BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md)):
- **`main`**: Nhánh Quy hoạch cấp cao và Kiến trúc hệ thống. **Tuyệt đối cấm sửa mã nguồn trong `/src/`**. (Chỉ 1 AI hoạt động).
- **`develop`**: Nhánh Tích hợp, Kiểm thử hồi quy và Đánh giá Sprint. **Tuyệt đối cấm sửa mã nguồn trong `/src/`**. (Chỉ 1 AI hoạt động).
- **`task/TASK-XXX-<slug>`**: **Nhánh duy nhất được phép lập trình tính năng trong `/src/`** thuộc phạm vi task scope. (Cho phép nhiều AI chạy song song).

Định dạng thông điệp commit:
`TASK-XXX: <mô tả>` (hoặc `INIT-001`, `INIT-002` cho các commit khởi tạo và củng cố giao thức).

## 5. Phân Định Không Gian: `.ai`, `.human` và `.document`

- **`.ai/`**: Giao thức tác nghiệp tự động hóa dành riêng cho AI. Chứa các quy tắc chuẩn hóa ([`AI_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/AI_RULES.md)), luật phân nhánh ([`BRANCH_RULES.md`](file:///d:/workspace/Algorithm-game-website/.ai/BRANCH_RULES.md)), đặc tả ngôn ngữ chỉ huy tĩnh ([`CONTROL.md`](file:///d:/workspace/Algorithm-game-website/.ai/CONTROL.md)), quy trình phát triển ([`WORKFLOW.md`](file:///d:/workspace/Algorithm-game-website/.ai/WORKFLOW.md)), quản lý task ([`tasks/`](file:///d:/workspace/Algorithm-game-website/.ai/tasks/)), và các template dùng chung ([`templates/`](file:///d:/workspace/Algorithm-game-website/.ai/templates/)).
- **`.human/`**: Sổ tay Vận hành và Bộ nhớ của Con Người ([`.human/README.md`](file:///d:/workspace/Algorithm-game-website/.human/README.md), [`.human/MANUAL.md`](file:///d:/workspace/Algorithm-game-website/.human/MANUAL.md), các cẩm nang chỉ đạo, quy trình chuẩn SOP, hàng đợi ý tưởng `backlog/` và ghi chú). Thư mục `.human/local/` được Git bỏ qua để chứa cấu hình máy cá nhân.
- **`.document/`**: Nguồn Sự Thật Duy Nhất về Tri Thức Dự Án ([`.document/README.md`](file:///d:/workspace/Algorithm-game-website/.document/README.md)), bao gồm mục tiêu & phạm vi ([`GOALS_AND_SCOPE.md`](file:///d:/workspace/Algorithm-game-website/.document/GOALS_AND_SCOPE.md)), yêu cầu ([`REQUIREMENTS.md`](file:///d:/workspace/Algorithm-game-website/.document/REQUIREMENTS.md)), kiến trúc phân lớp ([`ARCHITECTURE.md`](file:///d:/workspace/Algorithm-game-website/.document/ARCHITECTURE.md)), bản đồ hệ thống ([`SYSTEM_MAP.md`](file:///d:/workspace/Algorithm-game-website/.document/SYSTEM_MAP.md)), mô hình nghiệp vụ ([`domain/DOMAIN_MODEL.md`](file:///d:/workspace/Algorithm-game-website/.document/domain/DOMAIN_MODEL.md)), hợp đồng API ([`interfaces/API_CONTRACTS.md`](file:///d:/workspace/Algorithm-game-website/.document/interfaces/API_CONTRACTS.md)), và các quyết định kiến trúc ([`decisions/`](file:///d:/workspace/Algorithm-game-website/.document/decisions/)).

## 6. Trạng Thái Hiện Tại Của Dự Án

- **Giai đoạn**: Khởi tạo Nền tảng & Củng cố Giao thức Điều khiển (AI Protocol Hardening).
- **Nhiệm vụ đang chạy**: Chưa có task kích hoạt.
- **Sẵn sàng**: Nền tảng kỹ thuật, cấu hình kiểm thử, ranh giới kiến trúc và giao thức điều khiển đa tác nhân đã được chuẩn hóa đồng bộ.
