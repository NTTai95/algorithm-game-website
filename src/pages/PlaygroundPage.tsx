import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { LevelId } from '../core/levels/types'
import { getLevelById } from '../core/levels/level-registry'
import { generateProblemArray, type ProblemPreset } from '../core/levels/generator'
import { WarehouseArrayState } from '../core/domain/warehouse-array'
import { WarehouseEnvironment } from '../core/machines/warehouse-env'
import { SingleCrane } from '../core/machines/single-crane'
import { WeightScanner } from '../core/machines/weight-scanner'
import { Crane } from '../core/machines/crane'
import { VirtualMachine } from '../core/vm/virtual-machine'
import { BubbleSortValidator } from '../core/validator/bubble-sort-validator'
import { DiagnosticEngine } from '../core/validator/diagnostic-engine'
import type { DiagnosticReport } from '../core/validator/diagnostic-types'
import type { WarehouseGameHandle } from '../game'
import type { MachineEvent } from '../core/domain/events'
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

const MAX_BUDGET_STEPS = 10000

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  levelId,
  onNavigate,
}) => {
  const levelConfig = getLevelById(levelId)

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
  const warehouseRef = useRef<WarehouseArrayState | null>(null)
  const wareHouseEnvRef = useRef<WarehouseEnvironment | null>(null)
  const singleCraneRef = useRef<SingleCrane | null>(null)
  const weightScannerRef = useRef<WeightScanner | null>(null)
  const legacyCraneRef = useRef<Crane | null>(null)

  const processedEventsCountRef = useRef<number>(0)
  const executionTokenRef = useRef<number>(0)
  const isPausedRef = useRef<boolean>(false)

  // Initialize or reset runtime VM & machine state
  const initSimulationEnvironment = useCallback(() => {
    const warehouse = new WarehouseArrayState([...currentArray])
    const wareHouseEnv = new WarehouseEnvironment(warehouse)
    const singleCrane = new SingleCrane(warehouse)
    const weightScanner = new WeightScanner(warehouse)
    const crane = new Crane(warehouse)
    const vm = new VirtualMachine()

    warehouseRef.current = warehouse
    wareHouseEnvRef.current = wareHouseEnv
    singleCraneRef.current = singleCrane
    weightScannerRef.current = weightScanner
    legacyCraneRef.current = crane
    vmRef.current = vm
    processedEventsCountRef.current = 0

    return { warehouse, wareHouseEnv, singleCrane, weightScanner, crane, vm }
  }, [currentArray])

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
    executionTokenRef.current += 1
    isPausedRef.current = false

    const handle = gameHandleRef.current
    if (handle) {
      handle.getController()?.clear()
      handle.getScene()?.resetToState([...currentArray])
    }

    initSimulationEnvironment()
    setStatus('IDLE')
    setMovesCount(0)
    setComparisonsCount(0)
    setSwapsCount(0)
    setStepCount(0)
    setLastAction(undefined)
    setCurrentLine(undefined)
  }, [currentArray, initSimulationEnvironment])

  // Randomize Problem Generator
  const handleRandomizeProblem = useCallback(
    (preset: ProblemPreset = 'random') => {
      executionTokenRef.current += 1
      isPausedRef.current = false

      const newArray = generateProblemArray({
        minLength: 5,
        maxLength: levelId === 'bubble-sort' ? 7 : 6,
        preset,
      })

      setCurrentArray(newArray)

      const handle = gameHandleRef.current
      if (handle) {
        handle.getController()?.clear()
        handle.getScene()?.resetToState([...newArray])
      }

      const warehouse = new WarehouseArrayState([...newArray])
      const wareHouseEnv = new WarehouseEnvironment(warehouse)
      const singleCrane = new SingleCrane(warehouse)
      const weightScanner = new WeightScanner(warehouse)
      const crane = new Crane(warehouse)
      const vm = new VirtualMachine()

      warehouseRef.current = warehouse
      wareHouseEnvRef.current = wareHouseEnv
      singleCraneRef.current = singleCrane
      weightScannerRef.current = weightScanner
      legacyCraneRef.current = crane
      vmRef.current = vm
      processedEventsCountRef.current = 0

      setStatus('IDLE')
      setMovesCount(0)
      setComparisonsCount(0)
      setSwapsCount(0)
      setStepCount(0)
      setLastAction(undefined)
      setCurrentLine(undefined)
    },
    [levelId]
  )

  // Speed Change
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
    gameHandleRef.current?.getController()?.setSpeed(newSpeed)
  }, [])

  // Collect all newly emitted events across all machines
  const getAllMachineEvents = useCallback((): readonly MachineEvent[] => {
    const singleCraneEvents = singleCraneRef.current?.getEvents() ?? []
    const scannerEvents = weightScannerRef.current?.getEvents() ?? []
    const legacyEvents = legacyCraneRef.current?.getEvents() ?? []

    return [...scannerEvents, ...singleCraneEvents, ...legacyEvents].sort(
      (a, b) => (a.seq ?? 0) - (b.seq ?? 0)
    )
  }, [])

  // Animate newly emitted machine events
  const animateNewEvents = useCallback(async (token: number): Promise<boolean> => {
    const controller = gameHandleRef.current?.getController()
    if (!controller) return true

    const allEvents = getAllMachineEvents()
    const startIndex = processedEventsCountRef.current
    const newEvents = allEvents.slice(startIndex)
    processedEventsCountRef.current = allEvents.length

    for (const event of newEvents) {
      if (token !== executionTokenRef.current) {
        return false // Execution cancelled or reset
      }
      await controller.playEvent(event)
    }

    return true
  }, [getAllMachineEvents])

  // Update real-time HUD counters
  const updateMetrics = useCallback(() => {
    const singleCrane = singleCraneRef.current
    const scanner = weightScannerRef.current
    const legacy = legacyCraneRef.current

    const moves =
      (singleCrane?.getEvents().filter((e) => e.type === 'CRANE_MOVE' || e.type === 'CRANE_MOVE_START').length ?? 0) +
      (scanner?.getEvents().filter((e) => e.type === 'SCANNER_MOVE' || e.type === 'SCANNER_MOVE_START').length ?? 0) +
      (legacy?.getStats().movesCount ?? 0)

    const comparisons =
      (scanner?.getEvents().filter((e) => e.type === 'SCANNER_READ').length ?? 0) +
      (legacy?.getStats().comparisonsCount ?? 0)

    const swaps =
      (singleCrane?.getEvents().filter((e) => e.type === 'CRANE_SWAP').length ?? 0) +
      (legacy?.getStats().swapsCount ?? 0)

    setMovesCount(moves)
    setComparisonsCount(comparisons)
    setSwapsCount(swaps)
  }, [])

  // Single Step Execution
  const handleStep = useCallback(async () => {
    let vm = vmRef.current
    let warehouse = warehouseRef.current

    if (!vm || !warehouse || status === 'IDLE' || status === 'SUCCESS' || status === 'VIOLATION') {
      const env = initSimulationEnvironment()
      vm = env.vm
      warehouse = env.warehouse

      const handle = gameHandleRef.current
      handle?.getController()?.clear()
      handle?.getScene()?.resetToState([...currentArray])

      try {
        vm.load(
          code,
          {
            wareHouse: env.wareHouseEnv,
            singleCrane: env.singleCrane,
            weightScanner: env.weightScanner,
            crane: env.crane,
          },
          { maxSteps: MAX_BUDGET_STEPS }
        )
      } catch (err: unknown) {
        setStatus('VIOLATION')
        setLastAction(`Lỗi cú pháp: ${err instanceof Error ? err.message : String(err)}`)
        setDiagnosticReport(DiagnosticEngine.fromParserError(err, []))
        return
      }
      setStatus('PAUSED')
    }

    const currentToken = executionTokenRef.current

    try {
      const stepResult = vm.step()
      updateMetrics()
      setStepCount(stepResult.stepCount)
      setCurrentLine(stepResult.currentLine)
      setLastAction(stepResult.machineAction || 'Step executed')

      await animateNewEvents(currentToken)

      if (stepResult.done) {
        if (stepResult.error) {
          setStatus('VIOLATION')
          setLastAction(`Lỗi runtime: ${stepResult.error}`)
          setDiagnosticReport(
            DiagnosticEngine.fromVMError(stepResult.error, stepResult.currentLine, stepResult.stepCount, [])
          )
        } else if (warehouse.isSorted() || levelConfig.category === 'TUTORIAL') {
          setStatus('SUCCESS')
          gameHandleRef.current?.getScene()?.highlightAllSorted()
        } else {
          setStatus('VIOLATION')
          setLastAction('Thuật toán kết thúc nhưng mảng chưa được sắp xếp!')
          const sorted = [...currentArray].sort((a, b) => a - b)
          setDiagnosticReport(DiagnosticEngine.fromUnsortedResult(warehouse.toWeightArray(), sorted, []))
        }
      }
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [code, status, currentArray, levelConfig.category, initSimulationEnvironment, animateNewEvents, updateMetrics])

  // Continuous Run Execution
  const handleRun = useCallback(async () => {
    if (status === 'PAUSED') {
      isPausedRef.current = false
      setStatus('RUNNING')
      return
    }

    executionTokenRef.current += 1
    const currentToken = executionTokenRef.current
    isPausedRef.current = false

    const handle = gameHandleRef.current
    handle?.getController()?.clear()
    handle?.getScene()?.resetToState([...currentArray])

    const { vm, warehouse, wareHouseEnv, singleCrane, weightScanner, crane } =
      initSimulationEnvironment()

    try {
      vm.load(
        code,
        {
          wareHouse: wareHouseEnv,
          singleCrane,
          weightScanner,
          crane,
        },
        { maxSteps: MAX_BUDGET_STEPS }
      )
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi cú pháp: ${err instanceof Error ? err.message : String(err)}`)
      setDiagnosticReport(DiagnosticEngine.fromParserError(err, []))
      return
    }

    setStatus('RUNNING')

    try {
      while (currentToken === executionTokenRef.current) {
        if (isPausedRef.current) {
          await new Promise((r) => setTimeout(r, 100))
          continue
        }

        const stepResult = vm.step()
        updateMetrics()
        setStepCount(stepResult.stepCount)
        setCurrentLine(stepResult.currentLine)
        if (stepResult.machineAction) {
          setLastAction(stepResult.machineAction)
        }

        const keepGoing = await animateNewEvents(currentToken)
        if (!keepGoing) break

        if (stepResult.done) {
          if (stepResult.error) {
            setStatus('VIOLATION')
            setLastAction(`Lỗi thực thi: ${stepResult.error}`)
            setDiagnosticReport(
              DiagnosticEngine.fromVMError(stepResult.error, stepResult.currentLine, stepResult.stepCount, [])
            )
          } else if (warehouse.isSorted() || levelConfig.category === 'TUTORIAL') {
            setStatus('SUCCESS')
            gameHandleRef.current?.getScene()?.highlightAllSorted()
          } else {
            setStatus('VIOLATION')
            setLastAction('Thuật toán kết thúc nhưng mảng chưa được sắp xếp!')
            const sorted = [...currentArray].sort((a, b) => a - b)
            setDiagnosticReport(DiagnosticEngine.fromUnsortedResult(warehouse.toWeightArray(), sorted, []))
          }
          break
        }
      }
    } catch (err: unknown) {
      if (currentToken === executionTokenRef.current) {
        setStatus('VIOLATION')
        setLastAction(`Lỗi thực thi: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  }, [code, status, currentArray, levelConfig.category, initSimulationEnvironment, animateNewEvents, updateMetrics])

  // Pause
  const handlePause = useCallback(() => {
    isPausedRef.current = true
    setStatus('PAUSED')
  }, [])

  // Resume
  const handleResume = useCallback(() => {
    isPausedRef.current = false
    setStatus('RUNNING')
  }, [])

  // Validate Across Hidden Tests
  const handleValidateHiddenTests = useCallback(() => {
    if (levelId === 'bubble-sort') {
      const validator = new BubbleSortValidator()
      const report = validator.runHiddenTests(code)
      setDiagnosticReport(report)
    } else {
      // For tutorials, run single verification
      const warehouse = new WarehouseArrayState([...currentArray])
      const wareHouseEnv = new WarehouseEnvironment(warehouse)
      const singleCrane = new SingleCrane(warehouse)
      const weightScanner = new WeightScanner(warehouse)
      const crane = new Crane(warehouse)
      const vm = new VirtualMachine()

      try {
        vm.load(code, { wareHouse: wareHouseEnv, singleCrane, weightScanner, crane }, { maxSteps: 50000 })
        const res = vm.runAll()
        if (res.error) {
          setDiagnosticReport(DiagnosticEngine.fromVMError(res.error, res.currentLine, res.stepCount))
        } else {
          setDiagnosticReport(
            DiagnosticEngine.createSuccessReport(
              [{
                name: levelConfig.title,
                input: currentArray,
                passed: true,
                movesCount,
                comparisonsCount,
                swapsCount,
              }],
              1,
              levelConfig.title
            )
          )
        }
      } catch (err) {
        setDiagnosticReport(DiagnosticEngine.fromParserError(err, []))
      }
    }
  }, [levelId, code, currentArray, levelConfig.title, movesCount, comparisonsCount, swapsCount])

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
            maxSteps={MAX_BUDGET_STEPS}
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
          />
        </section>

        {/* Right Column: Code Editor + API Reference */}
        <section className={`right-panel ${isEditorCollapsed ? 'panel-collapsed' : ''}`}>
          <CodeEditor
            code={code}
            onChange={setCode}
            currentLine={currentLine}
            disabled={status === 'RUNNING'}
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
