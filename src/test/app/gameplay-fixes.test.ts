import { describe, expect, it } from 'vitest'
import { LEVEL_REGISTRY } from '../../core/levels/level-registry'
import { PLAYGROUND_PROBLEM_BOUNDS, generateProblemArray } from '../../core/levels/generator'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { createMachineSet, createSandboxContext } from '../../core/machines/machine-sandbox'
import { VirtualMachine } from '../../core/vm/virtual-machine'
import { BubbleSortValidator } from '../../core/validator/bubble-sort-validator'
import { runTutorialCheck, type TutorialLevelId } from '../../core/validator/tutorial-validator'

const BUBBLE_HEADER =
  'public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {'

function runInSandbox(code: string, levelId: keyof typeof LEVEL_REGISTRY, input = [3, 1, 2]) {
  const machines = createMachineSet(new WarehouseArrayState(input))
  const vm = new VirtualMachine()
  vm.load(code, createSandboxContext(machines, LEVEL_REGISTRY[levelId].machines))
  return { result: vm.runAll(), machines }
}

function tutorialCheck(id: TutorialLevelId, code: string, input?: readonly number[]) {
  const level = LEVEL_REGISTRY[id]
  return runTutorialCheck(id, level.title, level.machines, code, input ?? level.initialArray)
}

describe('TASK-016: machine sandbox (anti-cheat)', () => {
  it('rejects wiping the event trace with clearEvents() — hidden tests no longer pass', () => {
    const cheat = `${BUBBLE_HEADER}
      singleCrane.clearEvents();
    }`
    const report = new BubbleSortValidator().runHiddenTests(cheat)
    expect(report.success).toBe(false)
    expect(report.message).toContain("Phương thức 'clearEvents' không tồn tại")
  })

  it('rejects the legacy crane in every level', () => {
    for (const id of ['0.1', '0.2', '0.3', 'bubble-sort'] as const) {
      const { result } = runInSandbox('crane.swap();', id)
      expect(result.error, id).toContain("Đối tượng máy móc không tồn tại: 'crane'")
    }
  })

  it('rejects machines that the level does not allot', () => {
    const { result, machines } = runInSandbox(
      'public static void solve(wareHouse wareHouse, WeightScanner weightScanner) { singleCrane.swap(); }',
      '0.1'
    )
    expect(result.error).toContain("'singleCrane'")
    expect(machines.warehouse.toWeightArray()).toEqual([3, 1, 2])

    expect(runInSandbox('weightScanner.getWeightBox();', '0.2').result.error).toContain("'weightScanner'")
  })

  it('does not expose engine internals or Object prototype members', () => {
    for (const method of ['getEvents', 'constructor', 'toString', 'hasOwnProperty', '__proto__']) {
      const { result } = runInSandbox(`singleCrane.${method}();`, 'bubble-sort')
      expect(result.error, method).toContain(`Phương thức '${method}' không tồn tại`)
    }
  })

  it('still runs every documented method through the sandbox', () => {
    const { result, machines } = runInSandbox(
      `int n = wareHouse.getCountBox();
       int w = weightScanner.getWeightBox();
       weightScanner.move(1);
       int p = weightScanner.position();
       weightScanner.moveStart();
       singleCrane.swap();
       singleCrane.move(1);
       int q = singleCrane.position();
       singleCrane.moveStart();`,
      'bubble-sort'
    )
    expect(result.error).toBeUndefined()
    expect(machines.warehouse.toWeightArray()).toEqual([1, 3, 2])
  })
})

describe('TASK-016: tutorial objectives', () => {
  for (const id of ['0.1', '0.2', '0.3'] as const) {
    it(`level ${id}: default code completes the objective on the initial array`, () => {
      expect(tutorialCheck(id, LEVEL_REGISTRY[id].defaultCode).success).toBe(true)
    })
  }

  it('level 0.1: default code also completes the objective on generated arrays', () => {
    for (let i = 0; i < 20; i++) {
      const input = generateProblemArray(PLAYGROUND_PROBLEM_BOUNDS)
      expect(tutorialCheck('0.1', LEVEL_REGISTRY['0.1'].defaultCode, input).success).toBe(true)
    }
  })

  it('level 0.3: default code makes the right swap decision on generated arrays', () => {
    for (let i = 0; i < 40; i++) {
      const input = generateProblemArray(PLAYGROUND_PROBLEM_BOUNDS)
      expect(tutorialCheck('0.3', LEVEL_REGISTRY['0.3'].defaultCode, input).success, `${input}`).toBe(true)
    }
  })

  it('empty code no longer passes any tutorial', () => {
    for (const id of ['0.1', '0.2', '0.3'] as const) {
      const report = tutorialCheck(id, 'int x = 0;')
      expect(report.success, id).toBe(false)
      expect(report.totalHiddenTests).toBe(1)
    }
  })

  it('level 0.1: fails when the scanner is not returned to slot 0', () => {
    const code = `int n = wareHouse.getCountBox();
      for (int i = 0; i < n; i++) {
        int w = weightScanner.getWeightBox();
        if (i < n - 1) { weightScanner.move(1); }
      }`
    const report = tutorialCheck('0.1', code)
    expect(report.success).toBe(false)
    expect(report.message).toContain('vị trí ban đầu')
  })

  it('level 0.2: fails when swapping the wrong pairs', () => {
    const report = tutorialCheck('0.2', 'singleCrane.move(1); singleCrane.swap();')
    expect(report.success).toBe(false)
  })

  it('level 0.3: fails when swapping without measuring first', () => {
    const report = tutorialCheck('0.3', 'singleCrane.swap();')
    expect(report.success).toBe(false)
    expect(report.message).toContain('trước khi quyết định')
  })

  it('level 0.3: fails when swapping although the first box is lighter', () => {
    const code = `int a = weightScanner.getWeightBox();
      weightScanner.move(1);
      int b = weightScanner.getWeightBox();
      singleCrane.swap();`
    const report = tutorialCheck('0.3', code, [10, 50, 30])
    expect(report.success).toBe(false)
    expect(report.message).toContain('không được swap')
  })

  it('reports a tutorial success with the level title instead of "Bubble Sort"', () => {
    const report = tutorialCheck('0.1', LEVEL_REGISTRY['0.1'].defaultCode)
    expect(report.message).toContain('Màn 0.1')
    expect(report.message).not.toContain('Bubble Sort')
  })
})
