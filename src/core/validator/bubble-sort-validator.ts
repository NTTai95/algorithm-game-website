import { WarehouseArrayState } from '../domain/warehouse-array'
import { Crane } from '../machines/crane'
import { VirtualMachine } from '../vm/virtual-machine'
import type { MachineEvent } from '../domain/events'
import type { TestCaseResult, ValidationResult } from './validator-types'

export const HIDDEN_TEST_CASES: readonly { name: string; input: readonly number[] }[] = [
  { name: 'Mảng ngẫu nhiên thông thường', input: [5, 1, 4, 2, 8] },
  { name: 'Mảng đảo ngược hoàn toàn (Trường hợp xấu nhất)', input: [5, 4, 3, 2, 1] },
  { name: 'Mảng đã sắp xếp sẵn (Trường hợp tốt nhất)', input: [1, 2, 3, 4, 5] },
  { name: 'Mảng có phần tử trùng lặp', input: [4, 2, 4, 1, 2] },
  { name: 'Mảng kích thước nhỏ (2 phần tử)', input: [9, 3] },
]

export class BubbleSortValidator {
  readonly algorithmName = 'Bubble Sort'

  /**
   * Validates whether an execution trace strictly complies with Bubble Sort invariants.
   */
  validateTrace(
    initialArray: readonly number[],
    events: readonly MachineEvent[],
    finalArrayState: WarehouseArrayState
  ): { valid: boolean; reason?: string } {
    // 1. Check data integrity
    if (!finalArrayState.verifyIntegrity()) {
      return {
        valid: false,
        reason: 'Mảng sau khi sắp xếp bị thất thoát, trùng lặp hoặc sửa đổi dữ liệu ban đầu.',
      }
    }

    // 2. Invariant: Adjacent swaps only (Mechanical crane constraint)
    for (let i = 0; i < events.length; i++) {
      const ev = events[i]
      if (ev.type === 'CRANE_SWAP') {
        if (Math.abs(ev.indexA - ev.indexB) !== 1) {
          return {
            valid: false,
            reason: `Phát hiện hoán đổi giữa vị trí ${ev.indexA} và ${ev.indexB}. Cần cẩu cơ học chỉ được phép đổi chỗ 2 thùng hàng kề nhau.`,
          }
        }
      }
    }

    // 3. Check sortedness
    if (!finalArrayState.isSorted()) {
      return {
        valid: false,
        reason: 'Mảng sau khi chạy xong tất cả câu lệnh vẫn chưa được sắp xếp tăng dần.',
      }
    }

    // 4. Invariant: Pass-by-pass bubbling check
    const passCheck = this.verifyBubblingPasses(initialArray, events)
    if (!passCheck.valid) {
      return passCheck
    }

    return { valid: true }
  }

  /**
   * Runs the player's Java code across all hidden test cases and verifies Bubble Sort compliance.
   */
  runHiddenTests(javaCode: string): ValidationResult {
    const testResults: TestCaseResult[] = []

    for (const testCase of HIDDEN_TEST_CASES) {
      const warehouse = new WarehouseArrayState(testCase.input)
      const crane = new Crane(warehouse)
      const vm = new VirtualMachine()

      try {
        vm.load(javaCode, { crane }, { maxSteps: 50000 })
        const executionResult = vm.runAll()

        if (executionResult.error) {
          testResults.push({
            name: testCase.name,
            input: testCase.input,
            passed: false,
            error: executionResult.error,
            movesCount: crane.getStats().movesCount,
            comparisonsCount: crane.getStats().comparisonsCount,
            swapsCount: crane.getStats().swapsCount,
          })
          continue
        }

        const traceValidation = this.validateTrace(
          testCase.input,
          crane.getEvents(),
          warehouse
        )

        if (!traceValidation.valid) {
          testResults.push({
            name: testCase.name,
            input: testCase.input,
            passed: false,
            error: traceValidation.reason,
            movesCount: crane.getStats().movesCount,
            comparisonsCount: crane.getStats().comparisonsCount,
            swapsCount: crane.getStats().swapsCount,
          })
          continue
        }

        testResults.push({
          name: testCase.name,
          input: testCase.input,
          passed: true,
          movesCount: crane.getStats().movesCount,
          comparisonsCount: crane.getStats().comparisonsCount,
          swapsCount: crane.getStats().swapsCount,
        })
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err)
        testResults.push({
          name: testCase.name,
          input: testCase.input,
          passed: false,
          error: errorMsg,
          movesCount: crane.getStats().movesCount,
          comparisonsCount: crane.getStats().comparisonsCount,
          swapsCount: crane.getStats().swapsCount,
        })
      }
    }

    const failedCase = testResults.find((t) => !t.passed)

    if (failedCase) {
      return {
        passed: false,
        algorithmName: this.algorithmName,
        violationReason: `Thất bại tại bài kiểm tra [${failedCase.name}]: ${failedCase.error}`,
        testCases: testResults,
      }
    }

    return {
      passed: true,
      algorithmName: this.algorithmName,
      testCases: testResults,
    }
  }

  /**
   * Replays events and checks that after each pass, the maximum of the unsorted prefix
   * has bubbled to the end of that prefix.
   */
  private verifyBubblingPasses(
    initialArray: readonly number[],
    events: readonly MachineEvent[]
  ): { valid: boolean; reason?: string } {
    const n = initialArray.length
    if (n <= 1) {
      return { valid: true }
    }

    const currentArray = [...initialArray]
    let passCount = 0

    const checkPassInvariant = (p: number): { valid: boolean; reason?: string } => {
      const targetIndex = n - 1 - p
      if (targetIndex <= 0) {
        return { valid: true }
      }

      // In Bubble Sort, the element at targetIndex must be >= all elements in [0, targetIndex]
      const targetValue = currentArray[targetIndex]
      for (let i = 0; i < targetIndex; i++) {
        if (currentArray[i] > targetValue) {
          return {
            valid: false,
            reason: `Sau lượt quét thứ ${p + 1}, thùng hàng lớn nhất chưa nổi bọt về đúng vị trí mảng con (vị trí ${targetIndex}).`,
          }
        }
      }

      return { valid: true }
    }

    for (let i = 0; i < events.length; i++) {
      const ev = events[i]

      if (ev.type === 'CRANE_SWAP') {
        const temp = currentArray[ev.indexA]
        currentArray[ev.indexA] = currentArray[ev.indexB]
        currentArray[ev.indexB] = temp
      } else if (ev.type === 'CRANE_MOVE') {
        // If crane resets to 0 from a forward position, it signifies the end of a pass
        if (ev.to === 0 && ev.from > 0) {
          const result = checkPassInvariant(passCount)
          if (!result.valid) {
            return result
          }
          passCount += 1
        }
      }
    }

    // Check final state pass if passes were executed
    if (passCount > 0 && passCount < n - 1) {
      const finalPassResult = checkPassInvariant(passCount)
      if (!finalPassResult.valid) {
        return finalPassResult
      }
    }

    return { valid: true }
  }
}
