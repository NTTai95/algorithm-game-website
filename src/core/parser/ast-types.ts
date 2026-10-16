/**
 * Abstract Syntax Tree (AST) node definitions for Java educational subset.
 */

export interface SourceLocation {
  line: number
  column: number
}

export type ASTNode = Statement | Expression

export type Statement =
  | BlockStatement
  | VariableDeclaration
  | AssignmentStatement
  | ExpressionStatement
  | IfStatement
  | WhileStatement
  | ForStatement
  | BreakStatement
  | ContinueStatement

export interface BlockStatement {
  type: 'BlockStatement'
  body: Statement[]
  loc: SourceLocation
}

export interface VariableDeclaration {
  type: 'VariableDeclaration'
  varType: string
  name: string
  init: Expression | null
  loc: SourceLocation
}

export interface AssignmentStatement {
  type: 'AssignmentStatement'
  name: string
  expr: Expression
  loc: SourceLocation
}

export interface ExpressionStatement {
  type: 'ExpressionStatement'
  expression: Expression
  loc: SourceLocation
}

export interface IfStatement {
  type: 'IfStatement'
  condition: Expression
  consequent: Statement
  alternate: Statement | null
  loc: SourceLocation
}

export interface WhileStatement {
  type: 'WhileStatement'
  condition: Expression
  body: Statement
  loc: SourceLocation
}

export interface ForStatement {
  type: 'ForStatement'
  init: Statement | null
  test: Expression | null
  update: Expression | null
  body: Statement
  loc: SourceLocation
}

export interface BreakStatement {
  type: 'BreakStatement'
  loc: SourceLocation
}

export interface ContinueStatement {
  type: 'ContinueStatement'
  loc: SourceLocation
}

export type Expression =
  | NumberLiteral
  | BooleanLiteral
  | Identifier
  | BinaryExpression
  | UnaryExpression
  | MethodCallExpression
  | AssignmentExpression

export interface NumberLiteral {
  type: 'NumberLiteral'
  value: number
  loc: SourceLocation
}

export interface BooleanLiteral {
  type: 'BooleanLiteral'
  value: boolean
  loc: SourceLocation
}

export interface Identifier {
  type: 'Identifier'
  name: string
  loc: SourceLocation
}

export interface BinaryExpression {
  type: 'BinaryExpression'
  operator: '+' | '-' | '*' | '/' | '%' | '==' | '!=' | '<' | '<=' | '>' | '>=' | '&&' | '||'
  left: Expression
  right: Expression
  loc: SourceLocation
}

export interface UnaryExpression {
  type: 'UnaryExpression'
  operator: '++' | '--' | '!' | '-' | '+'
  argument: Expression
  prefix: boolean
  loc: SourceLocation
}

export interface MethodCallExpression {
  type: 'MethodCallExpression'
  object: string
  method: string
  args: Expression[]
  loc: SourceLocation
}

export interface AssignmentExpression {
  type: 'AssignmentExpression'
  name: string
  expr: Expression
  loc: SourceLocation
}

export interface Program {
  type: 'Program'
  body: Statement[]
}
