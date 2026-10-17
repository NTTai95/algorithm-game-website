import { WarehouseArrayState } from '../domain/warehouse-array'
import { WarehouseEnvironment } from '../machines/warehouse-env'
import { SingleCrane } from '../machines/single-crane'
import { WeightScanner } from '../machines/weight-scanner'
import { Crane } from '../machines/crane'
import { VirtualMachine } from '../vm/virtual-machine'
import type { MachineEvent } from '../domain/events'
import type { TestCaseResult } from './validator-types'
import type { DiagnosticReport, IBubbleSortValidator } from './diagnostic-types'
import { DiagnosticEngine } from './diagnostic-engine'

export const HIDDEN_TEST_CASES: readonly { name: string; input: readonly number[] }[] = [
  { name: 'Mảng ngẫu nhiên thông thường', input: [64, 34, 25, 12, 22, 11, 90] },
  { name: 'Mảng đảo ngược hoàn toàn (Trường hợp xấu nhất)', input: [90, 80, 70, 60, 50] },
  { name: 'Mảng đã sắp xếp sẵn (Trường hợp tốt nhất)', input: [10, 20, 30, 40, 50] },
  { name: 'Mảng có phần tử trùng lặp', input: [40, 20, 40, 10, 20] },
  { name: 'Mảng kích thước nhỏ (2 phần tử)', input: [90, 30] },
]

export class BubbleSortValidator implements IBubbleSortValidator {
  readonly algorithmName = 'Bubble Sort'

  /**
   * Validates whether an execution trace strictly complies with Bubble Sort invariants
   * based on crate weights and mechanical machine interactions.
   */
  validateTrace(
    initialWeights: readonly number[],
    events: readonly MachineEvent[],
    finalArrayState: WarehouseArrayState
  ): DiagnosticReport {
    // 1. Check data integrity
    if (!finalArrayState.verifyIntegrity()) {
      return DiagnosticEngine.fromInvariantViolation(
        'Mảng sau khi sắp xếp bị thất thoát, trùng lặp hoặc sửa đổi dữ liệu ban đầu.',
        {
          actual: 'Dữ liệu thùng hàng bị sửa đổi hoặc thất thoát',
          expected: 'Bảo toàn tất cả thùng hàng ban đầu',
        },
        [],
        this.algorithmName
      )
    }

    // 2. Sort events chronologically by sequence number
    const sortedEvents = [...events].sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))

    // 3. Replay and check Bubble Sort invariants
    const currentWeights = [...initialWeights]
    let passCount = 0
    let inResetWave = false

    for (let i = 0; i < sortedEvents.length; i++) {
      const ev = sortedEvents[i]

      // Detect forward movement (ends a reset wave)
      if (
        (ev.type === 'CRANE_MOVE' && ev.to > ev.from) ||
        (ev.type === 'SCANNER_MOVE' && ev.to > ev.from)
      ) {
        inResetWave = false
      }

      // Check swap invariant
      if (ev.type === 'CRANE_SWAP') {
        inResetWave = false

        // Invariant: Adjacent swap only
        if (Math.abs(ev.indexA - ev.indexB) !== 1) {
          return DiagnosticEngine.fromInvariantViolation(
            `Phát hiện hoán đổi giữa vị trí ${ev.indexA} và ${ev.indexB}. Cần cẩu cơ học chỉ được phép đổi chỗ 2 thùng hàng kề nhau.`,
            {
              actual: `Khoảng cách hoán đổi là ${Math.abs(ev.indexA - ev.indexB)} ô`,
              expected: 'Khoảng cách hoán đổi phải là 1 ô (liền kề)',
              indices: [ev.indexA, ev.indexB],
              stepIndex: i,
            },
            [],
            this.algorithmName
          )
        }

        const left = Math.min(ev.indexA, ev.indexB)
        const right = Math.max(ev.indexA, ev.indexB)

        // Invariant: In ascending Bubble Sort, swap ONLY if left element is strictly heavier than right
        if (currentWeights[left] <= currentWeights[right]) {
          return DiagnosticEngine.fromInvariantViolation(
            `Vi phạm hoán đổi: Thùng hàng tại vị trí ${left} (${currentWeights[left]}kg) không lớn hơn thùng hàng tại vị trí ${right} (${currentWeights[right]}kg). Chỉ hoán đổi khi thùng đứng trước nặng hơn thùng đứng sau.`,
            {
              actual: `${currentWeights[left]}kg <= ${currentWeights[right]}kg`,
              expected: `${currentWeights[left]}kg > ${currentWeights[right]}kg`,
              indices: [left, right],
              stepIndex: i,
            },
            [],
            this.algorithmName
          )
        }

        // Apply swap
        const tmp = currentWeights[left]
        currentWeights[left] = currentWeights[right]
        currentWeights[right] = tmp
      }

      // Pass completion check (when crane or scanner resets to slot 0)
      const isReset =
        ev.type === 'CRANE_MOVE_START' ||
        ev.type === 'SCANNER_MOVE_START' ||
        (ev.type === 'CRANE_MOVE' && ev.to === 0 && ev.from > 0) ||
        (ev.type === 'SCANNER_MOVE' && ev.to === 0 && ev.from > 0)

      if (isReset && !inResetWave) {
        inResetWave = true
        const targetIndex = initialWeights.length - 1 - passCount

        if (targetIndex > 0 && targetIndex < initialWeights.length) {
          const targetValue = currentWeights[targetIndex]
          for (let k = 0; k < targetIndex; k++) {
            if (currentWeights[k] > targetValue) {
              return DiagnosticEngine.fromInvariantViolation(
                `Sau lượt quét thứ ${passCount + 1}, thùng hàng có khối lượng lớn nhất (${currentWeights[k]}kg tại vị trí ${k}) chưa nổi bọt về đúng vị trí cuối mảng con (vị trí ${targetIndex}).`,
                {
                  actual: `Vị trí ${targetIndex} có khối lượng ${targetValue}kg, nhưng vị trí ${k} nặng ${currentWeights[k]}kg`,
                  expected: `Phần tử lớn nhất trong đoạn [0..${targetIndex}] phải nằm tại vị trí ${targetIndex}`,
                  indices: [k, targetIndex],
                  stepIndex: i,
                },
                [],
                this.algorithmName
              )
            }
          }
        }
        passCount += 1
      }
    }

    // 4. Check final sortedness
    if (!finalArrayState.isSorted()) {
      const sortedWeights = [...initialWeights].sort((a, b) => a - b)
      return DiagnosticEngine.fromUnsortedResult(
        finalArrayState.toWeightArray(),
        sortedWeights,
        [],
        this.algorithmName
      )
    }

    return DiagnosticEngine.createSuccessReport([], 5, this.algorithmName)
  }

  /**
   * Runs the player's Java code across all 5 hidden test cases using multi-machine environment.
   */
  runHiddenTests(javaCode: string): DiagnosticReport {
    const testResults: TestCaseResult[] = []

    for (const testCase of HIDDEN_TEST_CASES) {
      const warehouse = new WarehouseArrayState(testCase.input)
      const wareHouse = new WarehouseEnvironment(warehouse)
      const singleCrane = new SingleCrane(warehouse)
      const weightScanner = new WeightScanner(warehouse)
      const crane = new Crane(warehouse) // backwards compatibility for legacy crane scripts
      const vm = new VirtualMachine()

      try {
        vm.load(
          javaCode,
          {
            wareHouse,
            singleCrane,
            weightScanner,
            crane,
          },
          { maxSteps: 50000 }
        )
      } catch (parseErr: unknown) {
        testResults.push({
          name: testCase.name,
          input: testCase.input,
          passed: false,
          error: parseErr instanceof Error ? parseErr.message : String(parseErr),
          movesCount: 0,
          comparisonsCount: 0,
          swapsCount: 0,
        })
        return DiagnosticEngine.fromParserError(
          parseErr,
          testResults,
          this.algorithmName
        )
      }

      const executionResult = vm.runAll()

      const movesCount =
        singleCrane
          .getEvents()
          .filter(
            (e) => e.type === 'CRANE_MOVE' || e.type === 'CRANE_MOVE_START'
          ).length + crane.getStats().movesCount

      const comparisonsCount =
        weightScanner
          .getEvents()
          .filter((e) => e.type === 'SCANNER_READ').length +
        crane.getStats().comparisonsCount

      const swapsCount =
        singleCrane
          .getEvents()
          .filter((e) => e.type === 'CRANE_SWAP').length +
        crane.getStats().swapsCount

      if (executionResult.error) {
        testResults.push({
          name: testCase.name,
          input: testCase.input,
          passed: false,
          error: executionResult.error,
          movesCount,
          comparisonsCount,
          swapsCount,
        })

        return DiagnosticEngine.fromVMError(
          executionResult.error,
          executionResult.currentLine,
          executionResult.stepCount,
          testResults,
          this.algorithmName
        )
      }

      const combinedEvents: MachineEvent[] = [
        ...weightScanner.getEvents(),
        ...singleCrane.getEvents(),
        ...crane.getEvents(),
      ]

      const traceValidation = this.validateTrace(
        testCase.input,
        combinedEvents,
        warehouse
      )

      if (!traceValidation.success) {
        testResults.push({
          name: testCase.name,
          input: testCase.input,
          passed: false,
          error: traceValidation.message,
          movesCount,
          comparisonsCount,
          swapsCount,
        })

        return {
          ...traceValidation,
          hiddenTestsPassed: testResults.filter((t) => t.passed).length,
          totalHiddenTests: HIDDEN_TEST_CASES.length,
          testCases: testResults,
        }
      }

      testResults.push({
        name: testCase.name,
        input: testCase.input,
        passed: true,
        movesCount,
        comparisonsCount,
        swapsCount,
      })
    }

    return DiagnosticEngine.createSuccessReport(
      testResults,
      HIDDEN_TEST_CASES.length,
      this.algorithmName
    )
  }
}
