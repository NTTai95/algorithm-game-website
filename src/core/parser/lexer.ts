import type { SourceLocation } from './ast-types'

export type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'OPERATOR'
  | 'PUNCTUATION'
  | 'EOF'

export interface Token {
  type: TokenType
  value: string
  loc: SourceLocation
}

const KEYWORDS = new Set([
  'int',
  'boolean',
  'void',
  'for',
  'while',
  'if',
  'else',
  'break',
  'continue',
  'true',
  'false',
  'public',
  'static',
  'class',
  'private',
  'protected',
])

const MULTI_CHAR_OPS = new Set([
  '++',
  '--',
  '==',
  '!=',
  '<=',
  '>=',
  '&&',
  '||',
])

const SINGLE_CHAR_OPS = new Set([
  '+',
  '-',
  '*',
  '/',
  '%',
  '<',
  '>',
  '!',
  '=',
])

const PUNCTUATIONS = new Set([';', ',', '(', ')', '{', '}', '.'])

export class Lexer {
  private readonly input: string
  private pos: number = 0
  private line: number = 1
  private column: number = 1

  constructor(input: string) {
    this.input = input
  }

  tokenize(): Token[] {
    const tokens: Token[] = []

    while (this.pos < this.input.length) {
      this.skipWhitespaceAndComments()
      if (this.pos >= this.input.length) {
        break
      }

      const char = this.input[this.pos]
      const loc: SourceLocation = { line: this.line, column: this.column }

      // Numbers
      if (this.isDigit(char)) {
        tokens.push(this.readNumber())
        continue
      }

      // Identifiers & Keywords
      if (this.isAlpha(char) || char === '_') {
        tokens.push(this.readIdentifier())
        continue
      }

      // Two-character operators
      if (this.pos + 1 < this.input.length) {
        const twoChar = this.input.slice(this.pos, this.pos + 2)
        if (MULTI_CHAR_OPS.has(twoChar)) {
          this.advance(2)
          tokens.push({ type: 'OPERATOR', value: twoChar, loc })
          continue
        }
      }

      // Single-character operators
      if (SINGLE_CHAR_OPS.has(char)) {
        this.advance(1)
        tokens.push({ type: 'OPERATOR', value: char, loc })
        continue
      }

      // Punctuations
      if (PUNCTUATIONS.has(char)) {
        this.advance(1)
        tokens.push({ type: 'PUNCTUATION', value: char, loc })
        continue
      }

      throw new Error(
        `Ký tự không hợp lệ '${char}' tại dòng ${loc.line}, cột ${loc.column}.`
      )
    }

    tokens.push({
      type: 'EOF',
      value: '',
      loc: { line: this.line, column: this.column },
    })

    return tokens
  }

  private readNumber(): Token {
    const startLoc: SourceLocation = { line: this.line, column: this.column }
    let value = ''

    while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
      value += this.input[this.pos]
      this.advance(1)
    }

    return { type: 'NUMBER', value, loc: startLoc }
  }

  private readIdentifier(): Token {
    const startLoc: SourceLocation = { line: this.line, column: this.column }
    let value = ''

    while (
      this.pos < this.input.length &&
      (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_')
    ) {
      value += this.input[this.pos]
      this.advance(1)
    }

    const type: TokenType = KEYWORDS.has(value) ? 'KEYWORD' : 'IDENTIFIER'
    return { type, value, loc: startLoc }
  }

  private skipWhitespaceAndComments(): void {
    while (this.pos < this.input.length) {
      const char = this.input[this.pos]

      if (char === ' ' || char === '\t' || char === '\r') {
        this.advance(1)
        continue
      }

      if (char === '\n') {
        this.pos += 1
        this.line += 1
        this.column = 1
        continue
      }

      // Line comments //
      if (char === '/' && this.pos + 1 < this.input.length && this.input[this.pos + 1] === '/') {
        this.advance(2)
        while (this.pos < this.input.length && this.input[this.pos] !== '\n') {
          this.advance(1)
        }
        continue
      }

      // Block comments /* ... */
      if (char === '/' && this.pos + 1 < this.input.length && this.input[this.pos + 1] === '*') {
        this.advance(2)
        while (
          this.pos + 1 < this.input.length &&
          !(this.input[this.pos] === '*' && this.input[this.pos + 1] === '/')
        ) {
          if (this.input[this.pos] === '\n') {
            this.line += 1
            this.column = 0
          }
          this.advance(1)
        }
        if (this.pos + 1 < this.input.length) {
          this.advance(2) // consume */
        }
        continue
      }

      break
    }
  }

  private advance(count: number): void {
    this.pos += count
    this.column += count
  }

  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9'
  }

  private isAlpha(char: string): boolean {
    return (
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z')
    )
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char)
  }
}
