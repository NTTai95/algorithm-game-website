export interface TestCaseResult {
  readonly name: string
  readonly input: readonly number[]
  readonly passed: boolean
  readonly error?: string
  readonly movesCount: number
  readonly comparisonsCount: number
  readonly swapsCount: number
}

export interface ValidationResult {
  readonly passed: boolean
  readonly algorithmName: string
  readonly violationReason?: string
  readonly stepIndex?: number
  readonly testCases: readonly TestCaseResult[]
}
