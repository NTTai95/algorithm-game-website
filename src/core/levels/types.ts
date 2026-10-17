export type LevelId = '0.1' | '0.2' | '0.3' | 'bubble-sort'

export type LevelCategory = 'TUTORIAL' | 'ALGORITHM'

export type LevelMachine = 'wareHouse' | 'singleCrane' | 'weightScanner'

export interface LevelApiDoc {
  readonly signature: string
  readonly returns: string
  readonly desc: string
  readonly machine: LevelMachine
}

export interface LevelConfig {
  readonly id: LevelId
  readonly path: string
  readonly hash: string
  readonly category: LevelCategory
  readonly title: string
  readonly stageTag: string
  readonly subtitle: string
  readonly objective: string
  readonly goldenRule: string
  readonly initialArray: readonly number[]
  readonly machines: readonly LevelMachine[]
  readonly defaultCode: string
  readonly templates: Record<string, string>
  readonly apiDocs: readonly LevelApiDoc[]
  readonly isUnlocked: boolean
}
