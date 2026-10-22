import { describe, expect, it } from 'vitest'
import {
  tokenizeJava,
  highlightJavaToHtml,
  escapeHtml,
} from '../../core/parser/syntax-highlighter'

describe('Java Syntax Highlighter (TASK-013 / AC-04)', () => {
  it('tokenizes Java keywords accurately', () => {
    const code = 'public static void solve() { int x = 0; boolean flag = true; }'
    const tokens = tokenizeJava(code)

    const keywords = tokens.filter((t) => t.type === 'keyword').map((t) => t.value)
    expect(keywords).toContain('public')
    expect(keywords).toContain('static')
    expect(keywords).toContain('void')
    expect(keywords).toContain('int')
    expect(keywords).toContain('boolean')
    expect(keywords).toContain('true')
  })

  it('tokenizes machine objects accurately with machine token type', () => {
    const code = 'wareHouse.read(0); WeightScanner.compare(); SingleCrane.swap();'
    const tokens = tokenizeJava(code)

    const machines = tokens.filter((t) => t.type === 'machine').map((t) => t.value)
    expect(machines).toContain('wareHouse')
    expect(machines).toContain('WeightScanner')
    expect(machines).toContain('SingleCrane')
  })

  it('tokenizes methods for machine operations and function calls', () => {
    const code = `
      wareHouse.read(j);
      wareHouse.swap(j, j + 1);
      int len = wareHouse.length();
      solve();
      WeightScanner.compare();
    `
    const tokens = tokenizeJava(code)
    const methods = tokens.filter((t) => t.type === 'method').map((t) => t.value)

    expect(methods).toContain('read')
    expect(methods).toContain('swap')
    expect(methods).toContain('length')
    expect(methods).toContain('solve')
    expect(methods).toContain('compare')
  })

  it('tokenizes numbers and string literals', () => {
    const code = 'int val = 42; String msg = "Algorithm Game"; char c = \'A\';'
    const tokens = tokenizeJava(code)

    const numbers = tokens.filter((t) => t.type === 'number').map((t) => t.value)
    expect(numbers).toEqual(['42'])

    const strings = tokens.filter((t) => t.type === 'string').map((t) => t.value)
    expect(strings).toContain('"Algorithm Game"')
    expect(strings).toContain('\'A\'')
  })

  it('tokenizes single-line and multi-line comments', () => {
    const code = `
      // Single line comment
      int a = 1;
      /* Multi-line
         block comment */
      int b = 2;
    `
    const tokens = tokenizeJava(code)
    const comments = tokens.filter((t) => t.type === 'comment').map((t) => t.value)

    expect(comments).toHaveLength(2)
    expect(comments[0]).toBe('// Single line comment')
    expect(comments[1]).toContain('Multi-line')
  })

  it('handles unclosed comments and strings gracefully without crashing', () => {
    const unclosedComment = 'int a = 1; /* unclosed comment'
    const tokensComment = tokenizeJava(unclosedComment)
    expect(tokensComment.some((t) => t.type === 'comment')).toBe(true)

    const unclosedStr = 'String s = "unclosed string\n'
    const tokensStr = tokenizeJava(unclosedStr)
    expect(tokensStr.some((t) => t.type === 'string')).toBe(true)
  })

  it('strictly preserves the invariant: joined tokens reconstruct original code exactly', () => {
    const samplePrograms = [
      '',
      '   \n\t  ',
      'public class WarehouseController {\n    public static void solve() {\n        int n = wareHouse.length();\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (wareHouse.read(j) > wareHouse.read(j + 1)) {\n                    wareHouse.swap(j, j + 1);\n                }\n            }\n        }\n    }\n}',
      '// Special operators and punctuation:\nif (x <= 10 && y >= 20 || z != 0) { x++; y--; }',
      '/* block */ int v = 0x1F + 3.14;',
    ]

    for (const prog of samplePrograms) {
      const reconstructed = tokenizeJava(prog)
        .map((t) => t.value)
        .join('')
      expect(reconstructed).toBe(prog)
    }
  })

  it('escapes HTML special characters to prevent XSS and formatting breakage', () => {
    const raw = '<script>alert("xss")</script> & 1 < 2 > 0'
    const escaped = escapeHtml(raw)
    expect(escaped).not.toContain('<script>')
    expect(escaped).toContain('&lt;script&gt;')
    expect(escaped).toContain('&amp;')
  })

  it('generates highlighted HTML with valid CSS classes for tokens', () => {
    const code = 'wareHouse.swap(0, 1); // swap boxes'
    const html = highlightJavaToHtml(code)

    expect(html).toContain('token-machine')
    expect(html).toContain('wareHouse')
    expect(html).toContain('token-method')
    expect(html).toContain('swap')
    expect(html).toContain('token-number')
    expect(html).toContain('0')
    expect(html).toContain('token-comment')
    expect(html).toContain('// swap boxes')
  })
})
