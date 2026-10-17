# TASK-013: Bộ Tô Màu Cú Pháp Java Thời Gian Thực (Syntax Highlighting) Chuẩn Dark Cyber IDE

```yaml
TASK_ID: TASK-013
TITLE: Bộ Tô Màu Cú Pháp Java Thời Gian Thực (Syntax Highlighting)
STATUS: READY
PRIORITY: HIGH
CREATED: 2026-10-17
CURRENT_BRANCH: task/TASK-013-java-syntax-highlighter
CURRENT_SESSION: SES-20261017-13
DEPENDENCIES: []
```

---

## PHẦN 1: THIẾT KẾ TRƯỚC KHI TRIỂN KHAI (DESIGN BEFORE IMPLEMENTATION)

### 1. Mục Tiêu (GOAL)
- Khắc phục giao diện đơn sắc của ô nhập liệu code textarea hiện tại, mang lại trải nghiệm thị giác chuyên nghiệp, bắt mắt như các công cụ IDE hiện đại (VS Code, IntelliJ IDEA).
- Xây dựng hệ thống Syntax Highlighting chuyên dụng cho Java trong game:
  - **Từ khóa cú pháp (Keywords)**: `public`, `static`, `void`, `int`, `boolean`, `if`, `else`, `for`, `while`, `break`, `return`, `true`, `false` $\to$ màu tím neon (#c084fc) hoặc xanh dương (#60a5fa).
  - **Tên lớp & Đối tượng máy móc**: `wareHouse`, `WeightScanner`, `SingleCrane` $\to$ màu xanh cyan (#38bdf8) hoặc vàng neon (#fbbf24).
  - **Phương thức thao tác (Methods)**: `.read()`, `.compare()`, `.swap()`, `.next()`, `.prev()`, `.length()`, `.position()`, `.getCountBox()`, `.getWeightBox()`, `.move()`, `.moveStart()` $\to$ màu vàng hổ phách (#f59e0b).
  - **Số nguyên (Numbers)**: `0..9` $\to$ màu cam camembert (#fb923c).
  - **Chuỗi ký tự (Strings)**: `"..."` $\to$ màu ngọc bích (#34d399).
  - **Chú thích mã nguồn (Comments)**: `// ...`, `/* ... */` $\to$ màu xám tro (#64748b) nghiêng nhẹ.
  - **Dấu câu & Ngoặc (Punctuation)**: `{`, `}`, `(`, `)`, `;` $\to$ màu xám sáng (#cbd5e1).
- Cơ chế kỹ thuật đảm bảo tính công thái học:
  - Trải nghiệm gõ phím tức thì, mượt mà (Zero latency typing).
  - Hỗ trợ phím Tab thụt lề 4 khoảng trắng chuẩn.
  - Đồng bộ hoàn hảo vị trí cuộn ngang/dọc (`scrollTop`, `scrollLeft`) giữa lớp hiển thị màu sắc và con trỏ gõ phím.
  - Giữ vững tính năng đánh số dòng và nút `⚡ Format Code`.

---

### 2. Phạm Vi Công Việc (SCOPE)
- **Thuộc phạm vi**:
  - `src/core/parser/syntax-highlighter.ts`:
    - Hàm tokenize và chuyển đổi chuỗi mã Java thành cây HTML/React nodes có gắn CSS class màu sắc (`token-keyword`, `token-type`, `token-method`, `token-number`, `token-comment`, `token-string`, v.v.).
  - `src/components/code-editor.tsx`:
    - Thiết kế kiến trúc 2 lớp đồng bộ:
      - Lớp dưới (Behind): `<pre><code className="syntax-highlight-layer">...</code></pre>` hiển thị các token có màu.
      - Lớp trên (Front): `<textarea className="code-textarea">` với màu chữ trong suốt (`color: transparent`, `caret-color: #38bdf8`) để người dùng tương tác trỏ chuột, gõ phím, chọn khối văn bản mượt mà.
    - Đồng bộ sự kiện cuộn `onScroll` giữa textarea và thẻ highlight.
  - `src/styles/index.css`:
    - Thiết kế bảng màu Dark Cyber Theme cho các token cú pháp.
    - Khóa chặt các thuộc tính font chữ: `font-family: var(--font-mono)`, `font-size: 14px`, `line-height: 1.6`, `letter-spacing: 0`, `padding` bằng nhau giữa 2 lớp.
  - `src/test/core/syntax-highlighter.test.ts`:
    - Unit test kiểm tra phân tách token cú pháp chuẩn xác cho code Java.
- **Nằm ngoài phạm vi**:
  - Tải toàn bộ thư viện nặng nề của Monaco (giữ vững tốc độ tải trang nhanh và zero-cost bundle).

---

### 3. Ranh Giới Tệp Tin (FILE ISOLATION)
- **ALLOWED FILES**:
  - `src/core/parser/syntax-highlighter.ts`
  - `src/components/code-editor.tsx`
  - `src/styles/index.css`
  - `src/test/core/syntax-highlighter.test.ts`
  - `.ai/tasks/active/TASK-013.md`
  - `.ai/tasks/TASK_PROCESSING.md`
- **RESTRICTED FILES**:
  - `src/game/**`
  - `src/core/vm/**`

---

### 4. Tiêu Chí Nghiệm Thu (ACCEPTANCE CRITERIA)
- [ ] **AC-13.1**: Toàn bộ từ khóa Java, tên lớp cỗ máy, phương thức, số và chú thích hiển thị màu sắc trực quan, sinh động trong editor.
- [ ] **AC-13.2**: Khi người chơi gõ code, xóa ký tự, hoặc dán đoạn mã mới, màu sắc được cập nhật ngay lập tức không bị giật lag.
- [ ] **AC-13.3**: Con trỏ chuột (caret) và ký tự hiển thị trùng khớp 100% vị trí, không bị lệch dòng hay lệch khoảng cách khi cuộn chuột lên xuống/sang ngang.
- [ ] **AC-13.4**: Nút `⚡ Format Code` và thụt lề phím Tab tiếp tục hoạt động hoàn hảo.
- [ ] **AC-13.5**: Unit test cho `syntax-highlighter.ts` đạt 100% pass.
