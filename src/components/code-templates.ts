export const CODE_TEMPLATES = {
  bubbleSort: `// Thuật toán Bubble Sort chuẩn cho cỗ máy Crane
int n = crane.length();

for (int i = 0; i < n - 1; i++) {
    // Mỗi lượt quét, đưa cẩu về vị trí ban đầu
    crane.reset();
    
    // Duyệt qua các cặp thùng hàng liền kề
    for (int j = 0; j < n - i - 1; j++) {
        // So sánh thùng hiện tại với thùng kế tiếp
        if (crane.compare() > 0) {
            crane.swap();
        }
        crane.next();
    }
}
`,
  skeleton: `// Viết mã Java điều khiển cỗ máy Crane tại đây
int n = crane.length();

for (int i = 0; i < n - 1; i++) {
    crane.reset();
    for (int j = 0; j < n - i - 1; j++) {
        // TODO: Viết lệnh so sánh và đổi chỗ thùng hàng
        
        crane.next();
    }
}
`,
  cheatAttempt: `// Mã thử nghiệm: chỉ so sánh 1 lần rồi dừng (vi phạm mảng chưa sắp xếp)
crane.compare();
crane.next();
`,
} as const
