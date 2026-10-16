import { describe, expect, it } from 'vitest'
import { Lexer } from '../../core/parser/lexer'
import { Parser } from '../../core/parser/parser'

describe('Java Lexer & Parser', () => {
  it('tokenizes identifiers, keywords, numbers and operators correctly', () => {
    const code = `
      // Bubble sort initialization
      int n = 5;
      for (int i = 0; i < n; i++) {
        crane.next();
      }
    `
    const lexer = new Lexer(code)
    const tokens = lexer.tokenize()

    const types = tokens.map((t) => t.type)
    expect(types).toContain('KEYWORD')
    expect(types).toContain('IDENTIFIER')
    expect(types).toContain('NUMBER')
    expect(types).toContain('OPERATOR')
    expect(types).toContain('PUNCTUATION')
  })

  it('parses variable declarations and basic expressions', () => {
    const code = `
      int a = 10 + 5;
      boolean flag = true;
    `
    const parser = new Parser(code)
    const ast = parser.parse()

    expect(ast.body.length).toBe(2)
    expect(ast.body[0].type).toBe('VariableDeclaration')
    expect(ast.body[1].type).toBe('VariableDeclaration')
  })

  it('parses if-else statements correctly', () => {
    const code = `
      if (crane.compare() > 0) {
        crane.swap();
      } else {
        crane.next();
      }
    `
    const parser = new Parser(code)
    const ast = parser.parse()

    expect(ast.body.length).toBe(1)
    const ifStmt = ast.body[0]
    expect(ifStmt.type).toBe('IfStatement')
    if (ifStmt.type === 'IfStatement') {
      expect(ifStmt.condition.type).toBe('BinaryExpression')
      expect(ifStmt.consequent.type).toBe('BlockStatement')
      expect(ifStmt.alternate?.type).toBe('BlockStatement')
    }
  })

  it('parses nested for loops (Bubble Sort structure)', () => {
    const code = `
      int n = crane.length();
      for (int i = 0; i < n - 1; i++) {
        crane.reset();
        for (int j = 0; j < n - i - 1; j++) {
          if (crane.compare() > 0) {
            crane.swap();
          }
          crane.next();
        }
      }
    `
    const parser = new Parser(code)
    const ast = parser.parse()

    expect(ast.body.length).toBe(2)
    expect(ast.body[0].type).toBe('VariableDeclaration')
    expect(ast.body[1].type).toBe('ForStatement')
  })

  it('throws descriptive error on missing semicolon', () => {
    const code = `int x = 5`
    const parser = new Parser(code)
    expect(() => parser.parse()).toThrowError(/Thiếu dấu ';'/i)
  })

  it('throws descriptive error on invalid tokens', () => {
    const code = `int @invalid = 10;`
    expect(() => new Parser(code)).toThrowError(/Ký tự không hợp lệ/i)
  })
})
