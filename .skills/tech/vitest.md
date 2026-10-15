# SKILL-T04: Vitest Testing Conventions

```yaml
SKILL_ID: SKILL-T04
GROUP: tech
STATUS: ACTIVE
DEPENDS_ON: []
```

---

## Mục đích

Quy ước Vitest cho dự án. Bổ sung chi tiết kỹ thuật cho SKILL-C05 khi cần viết hoặc chạy unit test.

---

## Kích hoạt khi

TEST command hoặc cần viết unit test. Kết hợp với SKILL-C05.

---

## Quy ước bắt buộc

### Lệnh test
```bash
npm run test        # Watch mode — dùng khi develop
npm run test:run    # CI mode — dùng trước commit và verification
```

### Vị trí test files
- Test file: `src/**/*.test.ts` (co-located với source hoặc trong `src/test/`).
- Vitest tự động thu thập theo pattern trong `vitest.config.ts`.

### Ưu tiên test

**Phải test (bắt buộc coverage cao)**:
- `src/core/` — mọi domain model, algorithm, state transition.
- Deterministic functions: cùng input → cùng output.
- Edge cases: empty array, single element, already sorted, reverse sorted.

**Test theo nhu cầu**:
- `src/game/` — thường khó test vì cần Phaser context. Test logic, không test render.
- `src/components/` — test behavior, không test CSS.

**Không cần (không thể)**:
- Canvas rendering output.
- Phaser animation timing.

### Cấu trúc test tốt

```typescript
describe('ModuleName / FunctionName', () => {
  it('should [hành vi cụ thể] when [điều kiện]', () => {
    // Arrange
    const input = ...;
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toEqual(expectedOutput);
  });
  
  it('should handle edge case: [mô tả edge case]', () => {
    // ...
  });
});
```

### Nguyên tắc test

- **Một assertion per test** cho happy path (nhiều assertion OK cho edge cases liên quan).
- **Không mock unnecessarily** — `src/core/` không cần mock.
- **Test behavior, không test implementation** — test output, không test internal calls.
- **Isolation** — mỗi test độc lập, không phụ thuộc thứ tự chạy.

### Không được làm
- Test giả tạo chỉ để tăng coverage %.
- `console.log` trong test production.
- `test.skip` mà không có issue/task tracking.
- `expect(true).toBe(true)` — vô nghĩa.
