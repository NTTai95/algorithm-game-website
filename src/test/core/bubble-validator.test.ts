import { describe, expect, it } from 'vitest'
import { BubbleSortValidator } from '../../core/validator/bubble-sort-validator'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'

describe('BubbleSortValidator & DiagnosticEngine', () => {
  const validator = new BubbleSortValidator()

  it('approves standard multi-machine Bubble Sort Java code across all 5 hidden tests', () => {
    const canonicalMultiMachineCode = `
      public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
        int countBox = wareHouse.getCountBox();

        for (int i = 0; i < countBox - 1; i++) {
          boolean swapped = false;

          for (int j = 0; j < countBox - 1 - i; j++) {
            int boxWeight1 = weightScanner.getWeightBox();
            weightScanner.move(1);
            int boxWeight2 = weightScanner.getWeightBox();

            if (boxWeight1 > boxWeight2) {
              singleCrane.swap();
              swapped = true;
            }

            singleCrane.move(1);
          }

          if (!swapped) {
            break;
          }

          singleCrane.moveStart();
          weightScanner.moveStart();
        }
      }
    `

    const report = validator.runHiddenTests(canonicalMultiMachineCode)

    expect(report.success).toBe(true)
    expect(report.passed).toBe(true)
    expect(report.valid).toBe(true)
    expect(report.errorType).toBeUndefined()
    expect(report.hiddenTestsPassed).toBe(5)
    expect(report.totalHiddenTests).toBe(5)
    expect(report.testCases.length).toBe(5)

    for (const tc of report.testCases) {
      expect(tc.passed).toBe(true)
      expect(tc.movesCount).toBeGreaterThan(0)
      expect(tc.comparisonsCount).toBeGreaterThan(0)
    }
  })

  it('rejects legacy crane programs: crane is not a machine of the Bubble Sort level', () => {
    const legacyJavaBubbleSort = `
      int n = crane.length();
      for (int i = 0; i < n - 1; i++) {
        crane.reset();
        for (int j = 0; j < n - i - 1; j++) {
          if (crane.compare() > 0) {
            crane.swap();
          }
          crane.next();
        }
      }
    `

    const report = validator.runHiddenTests(legacyJavaBubbleSort)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('MACHINE_RUNTIME')
    expect(report.message).toContain('crane')
  })

  it('generates rich SYNTAX diagnostics for syntax errors', () => {
    const invalidSyntaxCode = `
      int count = wareHouse.getCountBox()
      int x = ;
    `

    const report = validator.runHiddenTests(invalidSyntaxCode)

    expect(report.success).toBe(false)
    expect(report.passed).toBe(false)
    expect(report.errorType).toBe('SYNTAX')
    expect(report.lineNumber).toBeDefined()
    expect(report.hint).toMatch(/dấu chấm phẩy|cú pháp/i)
    expect(report.contextDetails).toBeDefined()
    expect(report.contextDetails?.actual).toContain('Lỗi biên dịch cú pháp')
  })

  it('generates rich MACHINE_RUNTIME diagnostics for out-of-bounds movement', () => {
    const outOfBoundsCode = `
      public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
        // Run scanner all the way past warehouse boundary
        while (true) {
          weightScanner.move(1);
        }
      }
    `

    const report = validator.runHiddenTests(outOfBoundsCode)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('MACHINE_RUNTIME')
    expect(report.lineNumber).toBeDefined()
    expect(report.hint).toMatch(/biên kho hàng/i)
    expect(report.contextDetails?.actual).toMatch(/vượt ngoài biên/i)
  })

  it('generates rich MACHINE_RUNTIME diagnostics for infinite loops via step budget', () => {
    const infiniteLoopCode = `
      int count = 0;
      while (true) {
        count++;
      }
    `

    const report = validator.runHiddenTests(infiniteLoopCode)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('MACHINE_RUNTIME')
    expect(report.hint).toMatch(/vòng lặp vô tận/i)
    expect(report.contextDetails?.actual).toMatch(/Vòng lặp không dừng/i)
  })

  it('generates rich INVARIANT diagnostics when crane swaps non-adjacent crates', () => {
    const warehouse = new WarehouseArrayState([50, 20, 40])

    const illegalNonAdjacentSwap = [
      {
        type: 'CRANE_SWAP' as const,
        indexA: 0,
        indexB: 2, // Distance 2 instead of 1
        crateA: warehouse.getCrate(0),
        crateB: warehouse.getCrate(2),
        timestamp: Date.now(),
      },
    ]

    const report = validator.validateTrace([50, 20, 40], illegalNonAdjacentSwap, warehouse)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('INVARIANT')
    expect(report.hint).toMatch(/kề sát nhau|liền kề/i)
    expect(report.contextDetails?.indices).toEqual([0, 2])
    expect(report.contextDetails?.actual).toContain('2 ô')
  })

  it('generates rich INVARIANT diagnostics when swapping crates that are already in order', () => {
    const warehouse = new WarehouseArrayState([20, 50, 10])

    // Swapping index 0 (20kg) and index 1 (50kg) when 20 <= 50 violates Bubble Sort invariant
    const illegalAscendingSwap = [
      {
        type: 'CRANE_SWAP' as const,
        indexA: 0,
        indexB: 1,
        crateA: warehouse.getCrate(0),
        crateB: warehouse.getCrate(1),
        timestamp: Date.now(),
      },
    ]

    const report = validator.validateTrace([20, 50, 10], illegalAscendingSwap, warehouse)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('INVARIANT')
    expect(report.hint).toMatch(/boxWeight1 > boxWeight2|nặng hơn/i)
    expect(report.contextDetails?.actual).toContain('20kg <= 50kg')
  })

  it('generates rich INVARIANT diagnostics when pass fails to bubble maximum element to the end', () => {
    const initialWeights = [90, 80, 70]
    const warehouse = new WarehouseArrayState(initialWeights)

    // Simulate crane moving to index 2 and resetting without swapping 90 to the end
    const traceWithIncompletePass = [
      {
        type: 'CRANE_MOVE' as const,
        from: 0,
        to: 1,
        timestamp: Date.now(),
      },
      {
        type: 'CRANE_MOVE' as const,
        from: 1,
        to: 2,
        timestamp: Date.now(),
      },
      {
        type: 'CRANE_MOVE_START' as const,
        from: 2,
        to: 0 as const,
        timestamp: Date.now(),
      },
    ]

    const report = validator.validateTrace(initialWeights, traceWithIncompletePass, warehouse)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('INVARIANT')
    expect(report.hint).toMatch(/lớn nhất.*nổi bọt/i)
    expect(report.contextDetails?.indices).toBeDefined()
  })

  it('generates rich UNSORTED diagnostics when algorithm leaves array unsorted', () => {
    const incompleteCode = `
      public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
        // Reads once but performs no swaps
        int w = weightScanner.getWeightBox();
      }
    `

    const report = validator.runHiddenTests(incompleteCode)

    expect(report.success).toBe(false)
    expect(report.errorType).toBe('UNSORTED')
    expect(report.hint).toMatch(/chưa được sắp xếp tăng dần/i)
    expect(report.contextDetails?.actual).toBeDefined()
    expect(report.contextDetails?.expected).toBeDefined()
  })
})
