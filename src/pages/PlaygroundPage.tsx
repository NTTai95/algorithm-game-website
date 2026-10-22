import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { LevelId } from '../core/levels/types'
import { getLevelById } from '../core/levels/level-registry'
import {
  generateProblemArray,
  PLAYGROUND_PROBLEM_BOUNDS,
  type ProblemPreset,
} from '../core/levels/generator'
import { WarehouseArrayState } from '../core/domain/warehouse-array'
import {
  collectMachineEvents,
  computeMachineStats,
  createMachineSet,
  createSandboxContext,
  type MachineSet,
} from '../core/machines/machine-sandbox'
import { DEFAULT_STEP_BUDGET, VirtualMachine, type VMStepResult } from '../core/vm/virtual-machine'
import { BubbleSortValidator } from '../core/validator/bubble-sort-validator'
import {
  checkTutorialObjective,
  createTutorialReport,
  runTutorialCheck,
  type TutorialLevelId,
} from '../core/validator/tutorial-validator'
import { DiagnosticEngine } from '../core/validator/diagnostic-engine'
import type { DiagnosticReport } from '../core/validator/diagnostic-types'
import type { WarehouseGameHandle } from '../game'
import {
  GameCanvas,
  HudStats,
  ControlBar,
  CodeEditor,
  ApiReference,
  type GameStatus,
} from '../components'
import { DiagnosticModal } from '../components/feedback/DiagnosticModal'

interface PlaygroundPageProps {
  levelId: LevelId
  onNavigate: (hash: string) => void
}

/** Yield to the browser every N non-animated steps so Pause/Reset stay responsive. */
const YIELD_EVERY_STEPS = 200

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  levelId,
  onNavigate,
}) => {
  const levelConfig = getLevelById(levelId)
  const isTutorial = levelConfig.category === 'TUTORIAL'

  const [code, setCode] = useState<string>(levelConfig.defaultCode)
  const [currentArray, setCurrentArray] = useState<number[]>([...levelConfig.initialArray])
  const [status, setStatus] = useState<GameStatus>('IDLE')
  const [speed, setSpeed] = useState<number>(1)
  const [movesCount, setMovesCount] = useState<number>(0)
  const [comparisonsCount, setComparisonsCount] = useState<number>(0)
  const [swapsCount, setSwapsCount] = useState<number>(0)
  const [stepCount, setStepCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<string | undefined>()
  const [currentLine, setCurrentLine] = useState<number | undefined>()
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null)
  const [isEditorCollapsed, setIsEditorCollapsed] = useState<boolean>(false)

  // Simulation execution refs
  const gameHandleRef = useRef<WarehouseGameHandle | null>(null)
  const vmRef = useRef<VirtualMachine | null>(null)
  const machinesRef = useRef<MachineSet | null>(null)
  const runInputRef = useRef<readonly number[]>([])

  const processedEventsCountRef = useRef<number>(0)
  const executionTokenRef = useRef<number>(0)
  const isPausedRef = useRef<boolean>(false)
  const isSteppingRef = useRef<boolean>(false)
  /** Token of the execution whose continuous run loop is alive (null when none). */
  const runLoopTokenRef = useRef<number | null>(null)

  const resetCounters = useCallback(() => {
    setMovesCount(0)
    setComparisonsCount(0)
    setSwapsCount(0)
    setStepCount(0)
    setLastAction(undefined)
    setCurrentLine(undefined)
  }, [])

  // Stop any execution and restore the warehouse (scene + engine) to `values`
  const resetSimulation = useCallback(
    (values: readonly number[]) => {
      executionTokenRef.current += 1
      isPausedRef.current = false
      vmRef.current = null
      machinesRef.current = null
      processedEventsCountRef.current = 0

      const handle = gameHandleRef.current
      handle?.getController()?.clear()
      handle?.getScene()?.resetToState([...values])

      setStatus('IDLE')
      resetCounters()
    },
    [resetCounters]
  )

  /**
   * Starts a fresh execution of the current code on the current array.
   * Returns the new execution token, or null when the code does not compile.
   */
  const prepareExecution = useCallback((): number | null => {
    resetSimulation(currentArray)
    const token = executionTokenRef.current

    const machines = createMachineSet(new WarehouseArrayState([...currentArray]))
    const vm = new VirtualMachine()

    try {
      vm.load(code, createSandboxContext(machines, levelConfig.machines), {
        maxSteps: DEFAULT_STEP_BUDGET,
      })
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi cú pháp: ${err instanceof Error ? err.message : String(err)}`)
      setDiagnosticReport(DiagnosticEngine.fromParserError(err, [], levelConfig.title))
      return null
    }

    machinesRef.current = machines
    vmRef.current = vm
    runInputRef.current = [...currentArray]
    return token
  }, [code, currentArray, levelConfig.machines, levelConfig.title, resetSimulation])

  // Handle Game Canvas Ready
  const handleGameReady = useCallback(
    (handle: WarehouseGameHandle) => {
      gameHandleRef.current = handle
      handle.getController()?.setSpeed(speed)
      handle.getScene()?.resetToState([...currentArray])
    },
    [speed, currentArray]
  )

  // Reset Warehouse Simulation
  const handleReset = useCallback(() => {
    resetSimulation(currentArray)
  }, [currentArray, resetSimulation])

  // Randomize Problem Generator
  const handleRandomizeProblem = useCallback(
    (preset: ProblemPreset = 'random') => {
      const newArray = generateProblemArray({ ...PLAYGROUND_PROBLEM_BOUNDS, preset })
      setCurrentArray(newArray)
      resetSimulation(newArray)
    },
    [resetSimulation]
  )

  // Speed Change
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
    gameHandleRef.current?.getController()?.setSpeed(newSpeed)
  }, [])

  // Animate newly emitted machine events
  const animateNewEvents = useCallback(async (token: number): Promise<boolean> => {
    const machines = machinesRef.current
    const controller = gameHandleRef.current?.getController()
    if (!machines || !controller) return true

    const allEvents = collectMachineEvents(machines)
    const newEvents = allEvents.slice(processedEventsCountRef.current)
    processedEventsCountRef.current = allEvents.length

    for (const event of newEvents) {
      if (token !== executionTokenRef.current) {
        return false // Execution cancelled or reset
      }
      await controller.playEvent(event)
    }

    return token === executionTokenRef.current
  }, [])

  // Update real-time HUD counters
  const updateMetrics = useCallback(() => {
    const machines = machinesRef.current
    if (!machines) return
    const stats = computeMachineStats(machines)
    setMovesCount(stats.movesCount)
    setComparisonsCount(stats.comparisonsCount)
    setSwapsCount(stats.swapsCount)
  }, [])

  // Evaluate a finished execution: runtime error, level objective / algorithm invariants
  const finishExecution = useCallback(
    (result: VMStepResult) => {
      const machines = machinesRef.current
      const input = runInputRef.current
      // Invalidate the token so a paused run loop for this execution exits
      executionTokenRef.current += 1
      isPausedRef.current = false
      if (!machines) return

      if (result.error) {
        setStatus('VIOLATION')
        setLastAction(`Lỗi thực thi: ${result.error}`)
        setDiagnosticReport(
          DiagnosticEngine.fromVMError(result.error, result.currentLine, result.stepCount, [], levelConfig.title)
        )
        return
      }

      if (isTutorial) {
        const objective = checkTutorialObjective(levelId as TutorialLevelId, input, machines)
        setStatus(objective.passed ? 'SUCCESS' : 'VIOLATION')
        setLastAction(objective.passed ? 'Hoàn thành nhiệm vụ màn chơi!' : objective.reason)
        if (objective.passed) gameHandleRef.current?.getScene()?.highlightAllSorted()
        setDiagnosticReport(createTutorialReport(levelConfig.title, input, machines, objective))
        return
      }

      const report = new BubbleSortValidator().validateTrace(input, collectMachineEvents(machines), machines.warehouse)
      if (report.success) {
        setStatus('SUCCESS')
        setLastAction('Sắp xếp đúng chuẩn Bubble Sort! Bấm "Kiểm Định" để chạy bộ test ẩn.')
        gameHandleRef.current?.getScene()?.highlightAllSorted()
      } else {
        setStatus('VIOLATION')
        setLastAction(report.message)
        setDiagnosticReport(report)
      }
    },
    [isTutorial, levelId, levelConfig.title]
  )

  // Execute one VM step and animate it. Returns the step result, or null if cancelled.
  const executeOneStep = useCallback(
    async (token: number): Promise<VMStepResult | null> => {
      const vm = vmRef.current
      if (!vm) return null

      const stepResult = vm.step()
      updateMetrics()
      setStepCount(stepResult.stepCount)
      setCurrentLine(stepResult.currentLine)
      if (stepResult.machineAction) {
        setLastAction(stepResult.machineAction)
      }

      const keepGoing = await animateNewEvents(token)
      return keepGoing ? stepResult : null
    },
    [animateNewEvents, updateMetrics]
  )

  // Continuous run loop for the execution identified by `token`
  const runLoop = useCallback(
    async (token: number) => {
      runLoopTokenRef.current = token
      try {
        let stepsSinceYield = 0
        while (token === executionTokenRef.current) {
          if (isPausedRef.current || isSteppingRef.current) {
            await new Promise((r) => setTimeout(r, 100))
            continue
          }

          const stepResult = await executeOneStep(token)
          if (!stepResult) break
          if (stepResult.done) {
            finishExecution(stepResult)
            break
          }

          stepsSinceYield = stepResult.machineAction ? 0 : stepsSinceYield + 1
          if (stepsSinceYield >= YIELD_EVERY_STEPS) {
            stepsSinceYield = 0
            await new Promise((r) => setTimeout(r, 0))
          }
        }
      } catch (err: unknown) {
        if (token === executionTokenRef.current) {
          setStatus('VIOLATION')
          setLastAction(`Lỗi thực thi: ${err instanceof Error ? err.message : String(err)}`)
        }
      } finally {
        if (runLoopTokenRef.current === token) {
          runLoopTokenRef.current = null
        }
      }
    },
    [executeOneStep, finishExecution]
  )

  // Start a fresh continuous run
  const handleRun = useCallback(() => {
    const token = prepareExecution()
    if (token === null) return
    setStatus('RUNNING')
    void runLoop(token)
  }, [prepareExecution, runLoop])

  // Pause
  const handlePause = useCallback(() => {
    isPausedRef.current = true
    setStatus('PAUSED')
  }, [])

  // Resume a paused run, or continue running after step-by-step mode
  const handleResume = useCallback(() => {
    if (!vmRef.current) return
    isPausedRef.current = false
    setStatus('RUNNING')
    if (runLoopTokenRef.current !== executionTokenRef.current) {
      void runLoop(executionTokenRef.current)
    }
  }, [runLoop])

  // Single Step Execution
  const handleStep = useCallback(async () => {
    if (isSteppingRef.current || status === 'RUNNING') return

    let token = executionTokenRef.current
    if (!vmRef.current || status !== 'PAUSED') {
      const fresh = prepareExecution()
      if (fresh === null) return
      token = fresh
      isPausedRef.current = true
      setStatus('PAUSED')
    }

    isSteppingRef.current = true
    try {
      const stepResult = await executeOneStep(token)
      if (stepResult?.done) {
        finishExecution(stepResult)
      }
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      isSteppingRef.current = false
    }
  }, [status, prepareExecution, executeOneStep, finishExecution])

  // Validate: hidden tests for algorithms, objective check for tutorials
  const handleValidateHiddenTests = useCallback(() => {
    if (isTutorial) {
      setDiagnosticReport(
        runTutorialCheck(levelId as TutorialLevelId, levelConfig.title, levelConfig.machines, code, currentArray)
      )
    } else {
      setDiagnosticReport(new BubbleSortValidator().runHiddenTests(code))
    }
  }, [isTutorial, levelId, levelConfig.title, levelConfig.machines, code, currentArray])

  // Alt+C keyboard shortcut to toggle editor collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault()
        setIsEditorCollapsed((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Trigger resize and refresh Phaser scale when editor is collapsed/expanded
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      gameHandleRef.current?.game.scale.refresh()
    }, 250)
    return () => clearTimeout(timer)
  }, [isEditorCollapsed])

  // Next level navigation handler
  const handleNextLevel = () => {
    setDiagnosticReport(null)
    if (levelId === '0.1') onNavigate('#/tutorial/0.2')
    else if (levelId === '0.2') onNavigate('#/tutorial/0.3')
    else if (levelId === '0.3') onNavigate('#/level/bubble-sort')
    else onNavigate('#/')
  }

  return (
    <div className="playground-container">
      {/* Mission Briefing Banner */}
      <section className="briefing-banner">
        <div className="briefing-item">
          <span className="briefing-label">Nhiệm vụ:</span>
          <span>{levelConfig.objective}</span>
        </div>
        <div className="briefing-item">
          <span className="briefing-label">Quy tắc vàng:</span>
          <span>{levelConfig.goldenRule}</span>
        </div>
      </section>

      {/* Main Split Screen */}
      <main className={`main-playground ${isEditorCollapsed ? 'editor-collapsed' : ''}`}>
        {/* Left Column: Canvas + HUD + Controls */}
        <section className="left-panel">
          <GameCanvas
            initialValues={currentArray}
            onGameReady={handleGameReady}
          />

          <HudStats
            status={status}
            movesCount={movesCount}
            comparisonsCount={comparisonsCount}
            swapsCount={swapsCount}
            stepCount={stepCount}
            maxSteps={DEFAULT_STEP_BUDGET}
            lastAction={lastAction}
            currentLine={currentLine}
          />

          <ControlBar
            isRunning={status === 'RUNNING'}
            isPaused={status === 'PAUSED'}
            speed={speed}
            onRun={handleRun}
            onPause={handlePause}
            onResume={handleResume}
            onStep={handleStep}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            onValidateHiddenTests={handleValidateHiddenTests}
            onRandomize={handleRandomizeProblem}
            validateLabel={isTutorial ? '🛡️ Kiểm Tra Nhiệm Vụ' : '🛡️ Kiểm Định 5 Test Ẩn'}
          />
        </section>

        {/* Right Column: Code Editor + API Reference */}
        <section className={`right-panel ${isEditorCollapsed ? 'panel-collapsed' : ''}`}>
          <CodeEditor
            code={code}
            onChange={setCode}
            currentLine={currentLine}
            disabled={status === 'RUNNING' || status === 'PAUSED'}
            templates={levelConfig.templates}
            isCollapsed={isEditorCollapsed}
            onToggleCollapse={() => setIsEditorCollapsed((prev) => !prev)}
          />

          {!isEditorCollapsed && <ApiReference allowedMachines={levelConfig.machines} />}
        </section>
      </main>

      {/* Rich Diagnostic Feedback Modal */}
      <DiagnosticModal
        report={diagnosticReport}
        onClose={() => setDiagnosticReport(null)}
        onNextLevel={handleNextLevel}
      />
    </div>
  )
}
