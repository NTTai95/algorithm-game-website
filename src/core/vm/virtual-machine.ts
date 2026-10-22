import type {
  Expression,
  ForStatement,
  IfStatement,
  MethodDeclaration,
  Program,
  Statement,
  WhileStatement,
} from '../parser/ast-types'
import { Parser } from '../parser/parser'
import { Environment } from './environment'

export interface VMStepResult {
  done: boolean
  stepCount: number
  currentLine?: number
  machineAction?: string
  error?: string
}

/** Single step budget shared by the playground runner and the hidden-test validators. */
export const DEFAULT_STEP_BUDGET = 50000

class BreakSignal {}
class ContinueSignal {}

export interface VMOptions {
  maxSteps?: number
  yieldOnEachStatement?: boolean
}

export class VirtualMachine {
  private program: Program | null = null
  private context: Record<string, unknown> = {}
  private rootEnv: Environment = new Environment()
  private stepCount: number = 0
  private maxSteps: number = DEFAULT_STEP_BUDGET
  private executionIterator: Generator<VMStepResult, void, void> | null = null
  private isExecutionComplete: boolean = false
  private lastResult: VMStepResult = { done: true, stepCount: 0 }
  private yieldOnEachStatement: boolean = true

  /**
   * Compiles Java source code and prepares execution context.
   */
  load(
    codeOrProgram: string | Program,
    context: Record<string, unknown> = {},
    options: VMOptions = {}
  ): void {
    if (typeof codeOrProgram === 'string') {
      const parser = new Parser(codeOrProgram)
      this.program = parser.parse()
    } else {
      this.program = codeOrProgram
    }

    this.context = context
    this.maxSteps = options.maxSteps ?? DEFAULT_STEP_BUDGET
    this.yieldOnEachStatement = options.yieldOnEachStatement ?? true
    this.reset()
  }

  private currentStatementLine: number = 1

  /**
   * Resets execution state to the beginning.
   */
  reset(): void {
    this.rootEnv = new Environment()
    this.stepCount = 0
    this.currentStatementLine = 1
    this.isExecutionComplete = false
    this.lastResult = { done: false, stepCount: 0 }

    if (this.program) {
      this.executionIterator = this.runProgram(this.program, this.rootEnv)
    } else {
      this.executionIterator = null
      this.isExecutionComplete = true
    }
  }

  /**
   * Executes the next discrete step of the program.
   */
  step(): VMStepResult {
    if (this.isExecutionComplete || !this.executionIterator) {
      return { done: true, stepCount: this.stepCount }
    }

    try {
      const next = this.executionIterator.next()
      if (next.done || !next.value) {
        this.isExecutionComplete = true
        this.lastResult = { done: true, stepCount: this.stepCount }
        return this.lastResult
      }
      this.lastResult = next.value
      return this.lastResult
    } catch (err: unknown) {
      this.isExecutionComplete = true
      const errorMsg = err instanceof Error ? err.message : String(err)
      this.lastResult = {
        done: true,
        stepCount: this.stepCount,
        currentLine: this.currentStatementLine,
        error: errorMsg,
      }
      return this.lastResult
    }
  }

  /**
   * Runs the entire program until completion or until max steps reached.
   */
  runAll(maxSteps?: number): VMStepResult {
    if (maxSteps) {
      this.maxSteps = maxSteps
    }

    let result = this.step()
    while (!result.done && !result.error) {
      result = this.step()
    }

    return result
  }

  getStepCount(): number {
    return this.stepCount
  }

  isDone(): boolean {
    return this.isExecutionComplete
  }

  private resolveContextObject(paramName: string, paramType: string): unknown {
    if (this.context[paramName] !== undefined) {
      return this.context[paramName]
    }
    const lowerName = paramName.toLowerCase()
    for (const [key, val] of Object.entries(this.context)) {
      if (key.toLowerCase() === lowerName) {
        return val
      }
    }
    const lowerType = paramType.toLowerCase()
    for (const [key, val] of Object.entries(this.context)) {
      if (key.toLowerCase() === lowerType) {
        return val
      }
    }
    return undefined
  }

  private *runProgram(
    program: Program,
    env: Environment
  ): Generator<VMStepResult, void, void> {
    // Populate direct context objects into rootEnv for backwards compatibility
    for (const [key, val] of Object.entries(this.context)) {
      env.define(key, val)
    }

    // Find if there is an entry method declaration (either top-level or inside a class)
    let entryMethod: MethodDeclaration | null = null

    for (const stmt of program.body) {
      if (stmt.type === 'MethodDeclaration') {
        if (!entryMethod || stmt.name.toLowerCase() === 'solve') {
          entryMethod = stmt
        }
      } else if (stmt.type === 'ClassDeclaration') {
        for (const m of stmt.methods) {
          if (!entryMethod || m.name.toLowerCase() === 'solve') {
            entryMethod = m
          }
        }
      }
    }

    if (entryMethod) {
      // Bind parameters to context objects
      for (const param of entryMethod.params) {
        const obj = this.resolveContextObject(param.name, param.type)
        if (obj !== undefined) {
          env.define(param.name, obj)
        }
      }
      yield* this.executeStatement(entryMethod.body, env)
      return
    }

    // Otherwise, execute top-level statements directly
    for (const stmt of program.body) {
      yield* this.executeStatement(stmt, env)
    }
  }


  private *executeStatement(
    stmt: Statement,
    env: Environment
  ): Generator<VMStepResult, void, void> {
    this.currentStatementLine = stmt.loc.line
    this.stepCount += 1
    if (this.stepCount > this.maxSteps) {
      throw new Error(
        `Chương trình vượt quá giới hạn ${this.maxSteps} bước thực thi (nguy cơ vòng lặp vô tận).`
      )
    }

    switch (stmt.type) {
      case 'VariableDeclaration': {
        const val = stmt.init ? this.evaluate(stmt.init, env) : 0
        env.define(stmt.name, val)
        if (this.yieldOnEachStatement) {
          yield {
            done: false,
            stepCount: this.stepCount,
            currentLine: stmt.loc.line,
          }
        }
        break
      }

      case 'AssignmentStatement': {
        const val = this.evaluate(stmt.expr, env)
        env.set(stmt.name, val)
        if (this.yieldOnEachStatement) {
          yield {
            done: false,
            stepCount: this.stepCount,
            currentLine: stmt.loc.line,
          }
        }
        break
      }

      case 'ExpressionStatement': {
        let actionDesc: string | undefined

        // If expression is a method call on a machine object, capture action for HUD/step feedback
        if (stmt.expression.type === 'MethodCallExpression') {
          actionDesc = `${stmt.expression.object}.${stmt.expression.method}()`
        }

        this.evaluate(stmt.expression, env)

        yield {
          done: false,
          stepCount: this.stepCount,
          currentLine: stmt.loc.line,
          machineAction: actionDesc,
        }
        break
      }

      case 'BlockStatement': {
        const blockEnv = new Environment(env)
        for (const s of stmt.body) {
          yield* this.executeStatement(s, blockEnv)
        }
        break
      }

      case 'IfStatement': {
        yield* this.executeIf(stmt, env)
        break
      }

      case 'WhileStatement': {
        yield* this.executeWhile(stmt, env)
        break
      }

      case 'ForStatement': {
        yield* this.executeFor(stmt, env)
        break
      }

      case 'BreakStatement': {
        throw new BreakSignal()
      }

      case 'ContinueStatement': {
        throw new ContinueSignal()
      }

      case 'MethodDeclaration':
      case 'ClassDeclaration':
        break
    }
  }

  private *executeIf(
    stmt: IfStatement,
    env: Environment
  ): Generator<VMStepResult, void, void> {
    if (this.yieldOnEachStatement) {
      yield {
        done: false,
        stepCount: this.stepCount,
        currentLine: stmt.loc.line,
      }
    }

    const condition = Boolean(this.evaluate(stmt.condition, env))
    if (condition) {
      yield* this.executeStatement(stmt.consequent, env)
    } else if (stmt.alternate) {
      yield* this.executeStatement(stmt.alternate, env)
    }
  }

  private *executeWhile(
    stmt: WhileStatement,
    env: Environment
  ): Generator<VMStepResult, void, void> {
    while (this.evaluate(stmt.condition, env)) {
      if (this.yieldOnEachStatement) {
        yield {
          done: false,
          stepCount: this.stepCount,
          currentLine: stmt.loc.line,
        }
      }

      try {
        yield* this.executeStatement(stmt.body, env)
      } catch (signal) {
        if (signal instanceof BreakSignal) {
          break
        }
        if (signal instanceof ContinueSignal) {
          continue
        }
        throw signal
      }
    }
  }

  private *executeFor(
    stmt: ForStatement,
    env: Environment
  ): Generator<VMStepResult, void, void> {
    const forEnv = new Environment(env)

    if (stmt.init) {
      if (stmt.init.type === 'VariableDeclaration') {
        const val = stmt.init.init ? this.evaluate(stmt.init.init, forEnv) : 0
        forEnv.define(stmt.init.name, val)
      } else {
        yield* this.executeStatement(stmt.init, forEnv)
      }
    }

    while (stmt.test ? Boolean(this.evaluate(stmt.test, forEnv)) : true) {
      if (this.yieldOnEachStatement) {
        yield {
          done: false,
          stepCount: this.stepCount,
          currentLine: stmt.loc.line,
        }
      }

      try {
        yield* this.executeStatement(stmt.body, forEnv)
      } catch (signal) {
        if (signal instanceof BreakSignal) {
          break
        }
        if (signal instanceof ContinueSignal) {
          // Handled below by evaluating update
        } else {
          throw signal
        }
      }

      if (stmt.update) {
        this.evaluate(stmt.update, forEnv)
      }
    }
  }

  private evaluate(expr: Expression, env: Environment): unknown {
    switch (expr.type) {
      case 'NumberLiteral':
        return expr.value

      case 'BooleanLiteral':
        return expr.value

      case 'Identifier':
        return env.get(expr.name)

      case 'BinaryExpression': {
        const left = this.evaluate(expr.left, env)
        const right = this.evaluate(expr.right, env)

        switch (expr.operator) {
          case '+':
            return Number(left) + Number(right)
          case '-':
            return Number(left) - Number(right)
          case '*':
            return Number(left) * Number(right)
          case '/':
            return Math.trunc(Number(left) / Number(right)) // Java integer division
          case '%':
            return Number(left) % Number(right)
          case '==':
            return left === right
          case '!=':
            return left !== right
          case '<':
            return Number(left) < Number(right)
          case '<=':
            return Number(left) <= Number(right)
          case '>':
            return Number(left) > Number(right)
          case '>=':
            return Number(left) >= Number(right)
          case '&&':
            return Boolean(left) && Boolean(right)
          case '||':
            return Boolean(left) || Boolean(right)
        }
        break
      }

      case 'UnaryExpression': {
        if (expr.operator === '!') {
          return !this.evaluate(expr.argument, env)
        }
        if (expr.operator === '-') {
          return -Number(this.evaluate(expr.argument, env))
        }
        if (expr.operator === '+') {
          return +Number(this.evaluate(expr.argument, env))
        }

        if (expr.argument.type === 'Identifier') {
          const varName = expr.argument.name
          const currentVal = Number(env.get(varName))

          if (expr.operator === '++') {
            const nextVal = currentVal + 1
            env.set(varName, nextVal)
            return expr.prefix ? nextVal : currentVal
          }

          if (expr.operator === '--') {
            const nextVal = currentVal - 1
            env.set(varName, nextVal)
            return expr.prefix ? nextVal : currentVal
          }
        }

        throw new Error(
          `Toán tử '${expr.operator}' yêu cầu biến số tại dòng ${expr.loc.line}.`
        )
      }

      case 'MethodCallExpression': {
        let targetObj: unknown = undefined
        try {
          targetObj = env.get(expr.object)
        } catch {
          // not found in env
        }
        if (targetObj === undefined) {
          targetObj = this.context[expr.object]
        }
        if (!targetObj && typeof expr.object === 'string') {
          const lowerObj = expr.object.toLowerCase()
          for (const [k, v] of Object.entries(this.context)) {
            if (k.toLowerCase() === lowerObj) {
              targetObj = v
              break
            }
          }
        }

        if (!targetObj || typeof targetObj !== 'object') {
          throw new Error(
            `Đối tượng máy móc không tồn tại: '${expr.object}' tại dòng ${expr.loc.line}.`
          )
        }

        const fn = (targetObj as Record<string, unknown>)[expr.method]
        if (typeof fn !== 'function') {
          throw new Error(
            `Phương thức '${expr.method}' không tồn tại trên đối tượng '${expr.object}' tại dòng ${expr.loc.line}.`
          )
        }

        const evaluatedArgs = expr.args.map((a) => this.evaluate(a, env))
        return fn.apply(targetObj, evaluatedArgs)
      }

      case 'AssignmentExpression': {
        const val = this.evaluate(expr.expr, env)
        env.set(expr.name, val)
        return val
      }
    }
  }
}
