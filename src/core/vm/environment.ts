/**
 * Scope environment for variable resolution with lexical scoping.
 */
export class Environment {
  private readonly values: Map<string, unknown> = new Map()
  private readonly parent: Environment | null

  constructor(parent: Environment | null = null) {
    this.parent = parent
  }

  define(name: string, value: unknown): void {
    this.values.set(name, value)
  }

  get(name: string): unknown {
    if (this.values.has(name)) {
      return this.values.get(name)
    }

    if (this.parent) {
      return this.parent.get(name)
    }

    throw new Error(`Biến chưa được định nghĩa: '${name}'`)
  }

  set(name: string, value: unknown): void {
    if (this.values.has(name)) {
      this.values.set(name, value)
      return
    }

    if (this.parent) {
      this.parent.set(name, value)
      return
    }

    throw new Error(`Biến chưa được khai báo trước khi gán: '${name}'`)
  }

  has(name: string): boolean {
    if (this.values.has(name)) {
      return true
    }
    return this.parent ? this.parent.has(name) : false
  }
}
