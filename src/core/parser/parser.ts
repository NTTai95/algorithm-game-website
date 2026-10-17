import type {
  BlockStatement,
  Expression,
  ForStatement,
  IfStatement,
  Program,
  Statement,
  VariableDeclaration,
  WhileStatement,
} from './ast-types'
import { Lexer, type Token, type TokenType } from './lexer'

export class Parser {
  private readonly tokens: Token[]
  private current: number = 0

  constructor(tokensOrCode: Token[] | string) {
    if (typeof tokensOrCode === 'string') {
      const lexer = new Lexer(tokensOrCode)
      this.tokens = lexer.tokenize()
    } else {
      this.tokens = tokensOrCode
    }
  }

  parse(): Program {
    const statements: Statement[] = []

    while (!this.isAtEnd()) {
      statements.push(this.statement())
    }

    return {
      type: 'Program',
      body: statements,
    }
  }

  private statement(): Statement {
    if (this.matchKeyword('int') || this.matchKeyword('boolean')) {
      return this.variableDeclaration()
    }

    if (this.matchKeyword('if')) {
      return this.ifStatement()
    }

    if (this.matchKeyword('while')) {
      return this.whileStatement()
    }

    if (this.matchKeyword('for')) {
      return this.forStatement()
    }

    if (this.matchKeyword('break')) {
      const loc = this.previous().loc
      this.consumePunctuation(';', "Thiếu dấu ';' sau lệnh break.")
      return { type: 'BreakStatement', loc }
    }

    if (this.matchKeyword('continue')) {
      const loc = this.previous().loc
      this.consumePunctuation(';', "Thiếu dấu ';' sau lệnh continue.")
      return { type: 'ContinueStatement', loc }
    }

    if (this.checkPunctuation('{')) {
      return this.blockStatement()
    }

    return this.expressionOrAssignmentStatement()
  }

  private variableDeclaration(): VariableDeclaration {
    const varTypeToken = this.previous()
    const nameToken = this.consume('IDENTIFIER', 'Kỳ vọng tên biến sau kiểu dữ liệu.')
    let init: Expression | null = null

    if (this.matchOperator('=')) {
      init = this.expression()
    }

    this.consumePunctuation(';', "Thiếu dấu ';' sau khai báo biến.")

    return {
      type: 'VariableDeclaration',
      varType: varTypeToken.value,
      name: nameToken.value,
      init,
      loc: varTypeToken.loc,
    }
  }

  private ifStatement(): IfStatement {
    const ifToken = this.previous()
    this.consumePunctuation('(', "Thiếu dấu '(' sau 'if'.")
    const condition = this.expression()
    this.consumePunctuation(')', "Thiếu dấu ')' sau điều kiện 'if'.")

    const consequent = this.statement()
    let alternate: Statement | null = null

    if (this.matchKeyword('else')) {
      alternate = this.statement()
    }

    return {
      type: 'IfStatement',
      condition,
      consequent,
      alternate,
      loc: ifToken.loc,
    }
  }

  private whileStatement(): WhileStatement {
    const whileToken = this.previous()
    this.consumePunctuation('(', "Thiếu dấu '(' sau 'while'.")
    const condition = this.expression()
    this.consumePunctuation(')', "Thiếu dấu ')' sau điều kiện 'while'.")

    const body = this.statement()

    return {
      type: 'WhileStatement',
      condition,
      body,
      loc: whileToken.loc,
    }
  }

  private forStatement(): ForStatement {
    const forToken = this.previous()
    this.consumePunctuation('(', "Thiếu dấu '(' sau 'for'.")

    let init: Statement | null = null
    if (!this.matchPunctuation(';')) {
      if (this.matchKeyword('int') || this.matchKeyword('boolean')) {
        init = this.variableDeclaration()
      } else {
        init = this.expressionOrAssignmentStatement()
      }
    }

    let test: Expression | null = null
    if (!this.checkPunctuation(';')) {
      test = this.expression()
    }
    this.consumePunctuation(';', "Thiếu dấu ';' sau điều kiện lặp 'for'.")

    let update: Expression | null = null
    if (!this.checkPunctuation(')')) {
      update = this.expression()
    }
    this.consumePunctuation(')', "Thiếu dấu ')' sau bước nhảy 'for'.")

    const body = this.statement()

    return {
      type: 'ForStatement',
      init,
      test,
      update,
      body,
      loc: forToken.loc,
    }
  }

  private blockStatement(): BlockStatement {
    const openBrace = this.consumePunctuation('{', "Kỳ vọng '{' để mở khối lệnh.")
    const body: Statement[] = []

    while (!this.checkPunctuation('}') && !this.isAtEnd()) {
      body.push(this.statement())
    }

    this.consumePunctuation('}', "Kỳ vọng '}' để đóng khối lệnh.")

    return {
      type: 'BlockStatement',
      body,
      loc: openBrace.loc,
    }
  }

  private expressionOrAssignmentStatement(): Statement {
    const expr = this.expression()
    this.consumePunctuation(';', "Thiếu dấu ';' sau câu lệnh.")

    if (expr.type === 'AssignmentExpression') {
      return {
        type: 'AssignmentStatement',
        name: expr.name,
        expr: expr.expr,
        loc: expr.loc,
      }
    }

    return {
      type: 'ExpressionStatement',
      expression: expr,
      loc: expr.loc,
    }
  }

  private expression(): Expression {
    return this.assignment()
  }

  private assignment(): Expression {
    const expr = this.logicalOr()

    if (this.matchOperator('=')) {
      const equalsToken = this.previous()
      const value = this.assignment()

      if (expr.type === 'Identifier') {
        return {
          type: 'AssignmentExpression',
          name: expr.name,
          expr: value,
          loc: equalsToken.loc,
        }
      }

      throw new Error(`Đích gán không hợp lệ tại dòng ${equalsToken.loc.line}.`)
    }

    return expr
  }

  private logicalOr(): Expression {
    let expr = this.logicalAnd()

    while (this.matchOperator('||')) {
      const operator = this.previous().value as '||'
      const right = this.logicalAnd()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private logicalAnd(): Expression {
    let expr = this.equality()

    while (this.matchOperator('&&')) {
      const operator = this.previous().value as '&&'
      const right = this.equality()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private equality(): Expression {
    let expr = this.comparison()

    while (this.matchOperator('==') || this.matchOperator('!=')) {
      const operator = this.previous().value as '==' | '!='
      const right = this.comparison()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private comparison(): Expression {
    let expr = this.addition()

    while (
      this.matchOperator('<') ||
      this.matchOperator('<=') ||
      this.matchOperator('>') ||
      this.matchOperator('>=')
    ) {
      const operator = this.previous().value as '<' | '<=' | '>' | '>='
      const right = this.addition()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private addition(): Expression {
    let expr = this.multiplication()

    while (this.matchOperator('+') || this.matchOperator('-')) {
      const operator = this.previous().value as '+' | '-'
      const right = this.multiplication()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private multiplication(): Expression {
    let expr = this.unary()

    while (
      this.matchOperator('*') ||
      this.matchOperator('/') ||
      this.matchOperator('%')
    ) {
      const operator = this.previous().value as '*' | '/' | '%'
      const right = this.unary()
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
        loc: expr.loc,
      }
    }

    return expr
  }

  private unary(): Expression {
    if (this.matchOperator('!') || this.matchOperator('-') || this.matchOperator('+')) {
      const operator = this.previous().value as '!' | '-' | '+'
      const argument = this.unary()
      return {
        type: 'UnaryExpression',
        operator,
        argument,
        prefix: true,
        loc: this.previous().loc,
      }
    }

    if (this.matchOperator('++') || this.matchOperator('--')) {
      const operator = this.previous().value as '++' | '--'
      const argument = this.primary()
      return {
        type: 'UnaryExpression',
        operator,
        argument,
        prefix: true,
        loc: this.previous().loc,
      }
    }

    const expr = this.primary()

    if (this.matchOperator('++') || this.matchOperator('--')) {
      const operator = this.previous().value as '++' | '--'
      return {
        type: 'UnaryExpression',
        operator,
        argument: expr,
        prefix: false,
        loc: expr.loc,
      }
    }

    return expr
  }

  private primary(): Expression {
    if (this.match('NUMBER')) {
      const token = this.previous()
      return {
        type: 'NumberLiteral',
        value: parseInt(token.value, 10),
        loc: token.loc,
      }
    }

    if (this.matchKeyword('true')) {
      return { type: 'BooleanLiteral', value: true, loc: this.previous().loc }
    }

    if (this.matchKeyword('false')) {
      return { type: 'BooleanLiteral', value: false, loc: this.previous().loc }
    }

    if (this.match('IDENTIFIER')) {
      const idToken = this.previous()

      // Method call check: object.method(...)
      if (this.matchPunctuation('.')) {
        const methodToken = this.consume('IDENTIFIER', 'Kỳ vọng tên phương thức sau dấu chấm.')
        this.consumePunctuation('(', "Kỳ vọng dấu '(' sau tên phương thức.")
        const args: Expression[] = []

        if (!this.checkPunctuation(')')) {
          do {
            args.push(this.expression())
          } while (this.matchPunctuation(','))
        }

        this.consumePunctuation(')', "Kỳ vọng dấu ')' sau danh sách đối số.")

        return {
          type: 'MethodCallExpression',
          object: idToken.value,
          method: methodToken.value,
          args,
          loc: idToken.loc,
        }
      }

      return {
        type: 'Identifier',
        name: idToken.value,
        loc: idToken.loc,
      }
    }

    if (this.matchPunctuation('(')) {
      const expr = this.expression()
      this.consumePunctuation(')', "Kỳ vọng dấu ')' sau biểu thức.")
      return expr
    }

    const currentToken = this.peek()
    throw new Error(
      `Cú pháp không hợp lệ tại token '${currentToken.value}' (Dòng ${currentToken.loc.line}, Cột ${currentToken.loc.column}).`
    )
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance()
      return true
    }
    return false
  }

  private matchKeyword(val: string): boolean {
    if (this.check('KEYWORD') && this.peek().value === val) {
      this.advance()
      return true
    }
    return false
  }

  private matchOperator(val: string): boolean {
    if (this.check('OPERATOR') && this.peek().value === val) {
      this.advance()
      return true
    }
    return false
  }

  private matchPunctuation(val: string): boolean {
    if (this.check('PUNCTUATION') && this.peek().value === val) {
      this.advance()
      return true
    }
    return false
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) {
      return false
    }
    return this.peek().type === type
  }

  private checkPunctuation(val: string): boolean {
    if (this.isAtEnd()) {
      return false
    }
    const token = this.peek()
    return token.type === 'PUNCTUATION' && token.value === val
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) {
      return this.advance()
    }
    const token = this.peek()
    throw new Error(`${message} (Dòng ${token.loc.line}, Cột ${token.loc.column})`)
  }

  private consumePunctuation(val: string, message: string): Token {
    if (this.checkPunctuation(val)) {
      return this.advance()
    }
    const token = this.peek()
    throw new Error(`${message} (Dòng ${token.loc.line}, Cột ${token.loc.column})`)
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current += 1
    }
    return this.previous()
  }

  private isAtEnd(): boolean {
    return this.peek().type === 'EOF'
  }

  private peek(): Token {
    return this.tokens[this.current]
  }

  private previous(): Token {
    return this.tokens[this.current - 1]
  }
}
