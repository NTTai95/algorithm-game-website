import { useState, useRef, useCallback } from 'react'
import { WarehouseArrayState } from './core/domain/warehouse-array'
import { Crane } from './core/machines/crane'
import { VirtualMachine } from './core/vm/virtual-machine'
import { BubbleSortValidator } from './core/validator/bubble-sort-validator'
import type { ValidationResult } from './core/validator/validator-types'
import type { WarehouseGameHandle } from './game'
import {
  GameCanvas,
  HudStats,
  ControlBar,
  CodeEditor,
  ApiReference,
  ValidationModal,
  CODE_TEMPLATES,
  type GameStatus,
} from './components'
import './styles/index.css'

const INITIAL_WAREHOUSE_ARRAY = [5, 1, 4, 2, 8]
const MAX_BUDGET_STEPS = 5000

export default function App() {
  const [code, setCode] = useState<string>(CODE_TEMPLATES.bubbleSort)
  const [status, setStatus] = useState<GameStatus>('IDLE')
  const [speed, setSpeed] = useState<number>(1)
  const [movesCount, setMovesCount] = useState<number>(0)
  const [comparisonsCount, setComparisonsCount] = useState<number>(0)
  const [swapsCount, setSwapsCount] = useState<number>(0)
  const [stepCount, setStepCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<string | undefined>()
  const [currentLine, setCurrentLine] = useState<number | undefined>()
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  // Simulation execution state
  const gameHandleRef = useRef<WarehouseGameHandle | null>(null)
  const vmRef = useRef<VirtualMachine | null>(null)
  const craneRef = useRef<Crane | null>(null)
  const warehouseRef = useRef<WarehouseArrayState | null>(null)
  const processedEventsCountRef = useRef<number>(0)
  const executionTokenRef = useRef<number>(0)
  const isPausedRef = useRef<boolean>(false)

  // Initialize or reset runtime VM & machine state
  const initSimulationEnvironment = useCallback(() => {
    const warehouse = new WarehouseArrayState([...INITIAL_WAREHOUSE_ARRAY])
    const crane = new Crane(warehouse)
    const vm = new VirtualMachine()

    warehouseRef.current = warehouse
    craneRef.current = crane
    vmRef.current = vm
    processedEventsCountRef.current = 0

    return { warehouse, crane, vm }
  }, [])

  // Handle Game Canvas Ready
  const handleGameReady = useCallback((handle: WarehouseGameHandle) => {
    gameHandleRef.current = handle
    handle.getController()?.setSpeed(speed)
  }, [speed])

  // Reset Warehouse Simulation
  const handleReset = useCallback(() => {
    // Invalidate any ongoing asynchronous execution loop
    executionTokenRef.current += 1
    isPausedRef.current = false

    const handle = gameHandleRef.current
    if (handle) {
      const scene = handle.getScene()
      const controller = handle.getController()
      controller?.clear()
      scene?.resetToState([...INITIAL_WAREHOUSE_ARRAY])
    }

    initSimulationEnvironment()
    setStatus('IDLE')
    setMovesCount(0)
    setComparisonsCount(0)
    setSwapsCount(0)
    setStepCount(0)
    setLastAction(undefined)
    setCurrentLine(undefined)
  }, [initSimulationEnvironment])

  // Speed Change
  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
    gameHandleRef.current?.getController()?.setSpeed(newSpeed)
  }, [])

  // Animate newly emitted crane events
  const animateNewEvents = async (token: number): Promise<boolean> => {
    const crane = craneRef.current
    const controller = gameHandleRef.current?.getController()
    if (!crane || !controller) return true

    const allEvents = crane.getEvents()
    const startIndex = processedEventsCountRef.current
    const newEvents = allEvents.slice(startIndex)
    processedEventsCountRef.current = allEvents.length

    for (const event of newEvents) {
      if (token !== executionTokenRef.current) {
        return false // Execution was cancelled/reset
      }
      await controller.playEvent(event)
    }

    return true
  }

  // Single Step Execution
  const handleStep = useCallback(async () => {
    let vm = vmRef.current
    let crane = craneRef.current
    let warehouse = warehouseRef.current

    if (!vm || !crane || !warehouse || status === 'IDLE' || status === 'SUCCESS' || status === 'VIOLATION') {
      const env = initSimulationEnvironment()
      vm = env.vm
      crane = env.crane
      warehouse = env.warehouse

      const handle = gameHandleRef.current
      handle?.getController()?.clear()
      handle?.getScene()?.resetToState([...INITIAL_WAREHOUSE_ARRAY])

      try {
        vm.load(code, { crane }, { maxSteps: MAX_BUDGET_STEPS })
      } catch (err: unknown) {
        setStatus('VIOLATION')
        setLastAction(`Lỗi cú pháp: ${err instanceof Error ? err.message : String(err)}`)
        return
      }
      setStatus('PAUSED')
    }

    const currentToken = executionTokenRef.current

    try {
      const stepResult = vm.step()
      const stats = crane.getStats()
      setMovesCount(stats.movesCount)
      setComparisonsCount(stats.comparisonsCount)
      setSwapsCount(stats.swapsCount)
      setStepCount(stepResult.stepCount)
      setCurrentLine(stepResult.currentLine)
      setLastAction(stepResult.machineAction || 'Step executed')

      await animateNewEvents(currentToken)

      if (stepResult.done) {
        if (warehouse.isSorted()) {
          setStatus('SUCCESS')
          gameHandleRef.current?.getScene()?.highlightAllSorted()
        } else {
          setStatus('VIOLATION')
          setLastAction('Thuật toán kết thúc nhưng mảng chưa được sắp xếp!')
        }
      }
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [code, status, initSimulationEnvironment])

  // Continuous Run Execution
  const handleRun = useCallback(async () => {
    // If we're resuming from paused state
    if (status === 'PAUSED') {
      isPausedRef.current = false
      setStatus('RUNNING')
      return
    }

    // Fresh run
    executionTokenRef.current += 1
    const currentToken = executionTokenRef.current
    isPausedRef.current = false

    const handle = gameHandleRef.current
    handle?.getController()?.clear()
    handle?.getScene()?.resetToState([...INITIAL_WAREHOUSE_ARRAY])

    const { vm, crane, warehouse } = initSimulationEnvironment()

    try {
      vm.load(code, { crane }, { maxSteps: MAX_BUDGET_STEPS })
    } catch (err: unknown) {
      setStatus('VIOLATION')
      setLastAction(`Lỗi cú pháp: ${err instanceof Error ? err.message : String(err)}`)
      return
    }

    setStatus('RUNNING')

    try {
      while (currentToken === executionTokenRef.current) {
        // Check pause condition
        if (isPausedRef.current) {
          await new Promise((r) => setTimeout(r, 100))
          continue
        }

        const stepResult = vm.step()
        const stats = crane.getStats()
        setMovesCount(stats.movesCount)
        setComparisonsCount(stats.comparisonsCount)
        setSwapsCount(stats.swapsCount)
        setStepCount(stepResult.stepCount)
        setCurrentLine(stepResult.currentLine)
        if (stepResult.machineAction) {
          setLastAction(stepResult.machineAction)
        }

        const keepGoing = await animateNewEvents(currentToken)
        if (!keepGoing) break

        if (stepResult.done) {
          if (warehouse.isSorted()) {
            setStatus('SUCCESS')
            gameHandleRef.current?.getScene()?.highlightAllSorted()
          } else {
            setStatus('VIOLATION')
            setLastAction('Thuật toán kết thúc nhưng mảng chưa sắp xếp!')
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
  }, [code, status, initSimulationEnvironment])

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

  // Hidden Tests Validation (5 Tests)
  const handleValidateHiddenTests = useCallback(() => {
    const validator = new BubbleSortValidator()
    const result = validator.runHiddenTests(code)
    setValidationResult(result)
  }, [code])

  return (
    <div className="app-container">
      {/* Top Industrial Navbar */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-logo-icon">🏗️</div>
          <div>
            <h1 className="brand-title">ALGO WAREHOUSE // DSA SIMULATION</h1>
            <p className="brand-subtitle">Nền tảng mô phỏng cấu trúc dữ liệu và giải thuật kho hàng tự động</p>
          </div>
        </div>

        <div className="level-tag">
          <span>●</span>
          <span>Màn 1: Bubble Sort (Sắp Xếp Nổi Bọt)</span>
        </div>
      </header>

      {/* Mission Briefing Banner */}
      <section className="briefing-banner">
        <div className="briefing-item">
          <span className="briefing-label">Nhiệm vụ:</span>
          <span>Sử dụng cỗ máy <strong>crane</strong> để sắp xếp các kiện hàng theo thứ tự giá trị tăng dần.</span>
        </div>
        <div className="briefing-item">
          <span className="briefing-label">Quy tắc vàng:</span>
          <span className="briefing-rule">Chỉ hoán đổi 2 thùng hàng liền kề • Nổi bọt phần tử lớn nhất về cuối sau mỗi lượt quét.</span>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <main className="main-layout">
        {/* Left Column: Phaser Canvas + HUD + Control Bar */}
        <section className="left-panel">
          <GameCanvas
            initialValues={INITIAL_WAREHOUSE_ARRAY}
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
          />
        </section>

        {/* Right Column: Code Editor + API Reference */}
        <section className="right-panel">
          <CodeEditor
            code={code}
            onChange={setCode}
            currentLine={currentLine}
            disabled={status === 'RUNNING'}
          />

          <ApiReference />
        </section>
      </main>

      {/* Validation Result Modal */}
      <ValidationModal
        result={validationResult}
        onClose={() => setValidationResult(null)}
      />
    </div>
  )
}
