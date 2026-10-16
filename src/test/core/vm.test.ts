import { describe, expect, it } from 'vitest'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { Crane } from '../../core/machines/crane'
import { VirtualMachine } from '../../core/vm/virtual-machine'

describe('VirtualMachine Step Runner', () => {
  it('executes simple arithmetic and variable assignment', () => {
    const code = `
      int a = 15;
      int b = 4;
      int c = a / b; // integer division: 3
      int d = a % b; // 3
    `
    const vm = new VirtualMachine()
    vm.load(code)
    const result = vm.runAll()

    expect(result.done).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('executes a while loop with break and continue', () => {
    const code = `
      int sum = 0;
      int i = 0;
      while (i < 10) {
        i++;
        if (i == 3) {
          continue;
        }
        if (i == 6) {
          break;
        }
        sum = sum + i;
      }
    `
    const vm = new VirtualMachine()
    vm.load(code)
    const result = vm.runAll()

    expect(result.done).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('binds crane machine object and executes full Bubble Sort program', () => {
    const warehouse = new WarehouseArrayState([9, 3, 7, 1, 5])
    const crane = new Crane(warehouse)

    const javaCode = `
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

    const vm = new VirtualMachine()
    vm.load(javaCode, { crane })
    const result = vm.runAll()

    expect(result.done).toBe(true)
    expect(result.error).toBeUndefined()
    expect(warehouse.isSorted()).toBe(true)
    expect(warehouse.toValueArray()).toEqual([1, 3, 5, 7, 9])
    expect(crane.getEvents().length).toBeGreaterThan(0)
  })

  it('supports discrete step execution with line number and action tracking', () => {
    const warehouse = new WarehouseArrayState([20, 10])
    const crane = new Crane(warehouse)

    const code = `
      if (crane.compare() > 0) {
        crane.swap();
      }
    `
    const vm = new VirtualMachine()
    vm.load(code, { crane })

    const step1 = vm.step()
    expect(step1.done).toBe(false)
    expect(step1.currentLine).toBeDefined()

    const step2 = vm.step()
    expect(step2.done).toBe(false)
    expect(step2.machineAction).toContain('crane.swap')

    const step3 = vm.step()
    expect(step3.done).toBe(true)
    expect(warehouse.toValueArray()).toEqual([10, 20])
  })

  it('triggers step budget guard and terminates infinite loops safely', () => {
    const code = `
      int count = 0;
      while (true) {
        count++;
      }
    `
    const vm = new VirtualMachine()
    vm.load(code, {}, { maxSteps: 500 })
    const result = vm.runAll()

    expect(result.done).toBe(true)
    expect(result.error).toMatch(/vượt quá giới hạn 500 bước thực thi/i)
  })

  it('catches invalid machine calls cleanly', () => {
    const code = `
      ghostMachine.doSomething();
    `
    const vm = new VirtualMachine()
    vm.load(code, {})
    const result = vm.runAll()

    expect(result.done).toBe(true)
    expect(result.error).toMatch(/Đối tượng máy móc không tồn tại/i)
  })
})
