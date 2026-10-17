import { describe, expect, it } from 'vitest'
import { formatJavaCode } from '../../core/parser/formatter'
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

  it('parses method declaration: public static void solve(...) with parameters and break', () => {
    const code = `
      public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
        int countBox = wareHouse.getCountBox();
        for (int i = 0; i < countBox - 1; i++) {
          boolean swapped = false;
          if (!swapped) {
            break;
          }
        }
      }
    `
    const parser = new Parser(code)
    const ast = parser.parse()

    expect(ast.body.length).toBe(1)
    const methodStmt = ast.body[0]
    expect(methodStmt.type).toBe('MethodDeclaration')
    if (methodStmt.type === 'MethodDeclaration') {
      expect(methodStmt.name).toBe('solve')
      expect(methodStmt.modifiers).toEqual(['public', 'static'])
      expect(methodStmt.returnType).toBe('void')
      expect(methodStmt.params.length).toBe(3)
      expect(methodStmt.params[0].name).toBe('wareHouse')
      expect(methodStmt.params[1].name).toBe('singleCrane')
      expect(methodStmt.params[2].name).toBe('weightScanner')
    }
  })

  it('parses class-enclosed Java code correctly', () => {
    const code = `
      public class Solution {
        public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
          int countBox = wareHouse.getCountBox();
        }
      }
    `
    const parser = new Parser(code)
    const ast = parser.parse()

    expect(ast.body.length).toBe(1)
    const classDecl = ast.body[0]
    expect(classDecl.type).toBe('ClassDeclaration')
    if (classDecl.type === 'ClassDeclaration') {
      expect(classDecl.name).toBe('Solution')
      expect(classDecl.methods.length).toBe(1)
      expect(classDecl.methods[0].name).toBe('solve')
    }
  })

  it('formats Java code cleanly with auto-indentation', () => {
    const messyCode = `
public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner){
int countBox=wareHouse.getCountBox();
for(int i=0;i<countBox-1;i++){
boolean swapped=false;
if(!swapped){
break;
}
}
}
`
    const formatted = formatJavaCode(messyCode, 4)
    expect(formatted).toContain('    int countBox = wareHouse.getCountBox();')
    expect(formatted).toContain('    for (int i = 0; i < countBox - 1; i++) {')
    expect(formatted).toContain('        boolean swapped = false;')
    expect(formatted).toContain('        if (!swapped) {')
    expect(formatted).toContain('            break;')
    expect(formatted).toContain('        }')
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
