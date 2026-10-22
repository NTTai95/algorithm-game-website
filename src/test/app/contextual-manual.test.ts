import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { LEVEL_REGISTRY } from '../../core/levels/level-registry'
import type { LevelMachine } from '../../core/levels/types'
import { MACHINE_DOCS, getMachineDocs } from '../../core/machines/machine-docs'
import { WarehouseArrayState } from '../../core/domain/warehouse-array'
import { WarehouseEnvironment } from '../../core/machines/warehouse-env'
import { SingleCrane } from '../../core/machines/single-crane'
import { WeightScanner } from '../../core/machines/weight-scanner'
import { ApiReference } from '../../components/api-reference'

const ids = (machines: readonly LevelMachine[]) => getMachineDocs(machines).map((d) => d.id)

/** Methods that exist on machine objects but are engine-internal or legacy aliases. */
const NON_PLAYER_METHODS = new Set(['constructor', 'getEvents', 'clearEvents', 'length'])

function createMachines(): Record<LevelMachine, object> {
  const state = new WarehouseArrayState([3, 1, 2])
  return {
    wareHouse: new WarehouseEnvironment(state),
    weightScanner: new WeightScanner(state),
    singleCrane: new SingleCrane(state),
  }
}

describe('Context-Aware Machine Manual (TASK-014)', () => {
  it('AC-14.1: Tutorial 0.1 shows only wareHouse and WeightScanner', () => {
    expect(ids(LEVEL_REGISTRY['0.1'].machines)).toEqual(['wareHouse', 'weightScanner'])
  })

  it('AC-14.2: Tutorial 0.2 shows only wareHouse and SingleCrane', () => {
    expect(ids(LEVEL_REGISTRY['0.2'].machines)).toEqual(['wareHouse', 'singleCrane'])
  })

  it('AC-14.3: Tutorial 0.3 and Bubble Sort show all three machines', () => {
    const all = ['wareHouse', 'weightScanner', 'singleCrane']
    expect(ids(LEVEL_REGISTRY['0.3'].machines)).toEqual(all)
    expect(ids(LEVEL_REGISTRY['bubble-sort'].machines)).toEqual(all)
  })

  it('returns an empty manual when no machine is allotted', () => {
    expect(getMachineDocs([])).toEqual([])
  })

  it('AC-14.4: every documented method exists on the runtime machine', () => {
    const machines = createMachines()
    for (const doc of Object.values(MACHINE_DOCS)) {
      const instance = machines[doc.id] as Record<string, unknown>
      for (const method of doc.methods) {
        expect(typeof instance[method.name], `${doc.id}.${method.name}`).toBe('function')
        expect(method.signature.startsWith(`${doc.id}.${method.name}(`)).toBe(true)
      }
    }
  })

  it('AC-14.4: every player-facing runtime method is documented', () => {
    const machines = createMachines()
    for (const doc of Object.values(MACHINE_DOCS)) {
      const proto = Object.getPrototypeOf(machines[doc.id]) as object
      const runtimeMethods = Object.getOwnPropertyNames(proto).filter((n) => !NON_PLAYER_METHODS.has(n))
      expect(doc.methods.map((m) => m.name).sort()).toEqual(runtimeMethods.sort())
    }
  })

  it('AC-14.4: documented return types match runtime return values', () => {
    const machines = createMachines()
    const javaType = (v: unknown) => (v === undefined ? 'void' : typeof v === 'number' ? 'int' : 'boolean')
    for (const doc of Object.values(MACHINE_DOCS)) {
      const instance = machines[doc.id] as Record<string, (...args: unknown[]) => unknown>
      for (const method of doc.methods) {
        const args = method.signature.includes('int step') ? [1] : []
        if (doc.id === 'singleCrane' && method.name === 'move') instance.moveStart()
        if (doc.id === 'weightScanner' && method.name === 'move') instance.moveStart()
        if (doc.id === 'singleCrane' && method.name === 'swap') instance.moveStart()
        expect(javaType(instance[method.name](...args)), `${doc.id}.${method.name}`).toBe(method.returns)
      }
    }
  })

  it('renders only allotted machines as tabs in the ApiReference component', () => {
    const html01 = renderToStaticMarkup(createElement(ApiReference, { allowedMachines: LEVEL_REGISTRY['0.1'].machines }))
    expect(html01).toContain('api-tab-wareHouse')
    expect(html01).toContain('api-tab-weightScanner')
    expect(html01).not.toContain('api-tab-singleCrane')
    expect(html01).not.toContain('crane.compare()')

    const htmlBubble = renderToStaticMarkup(
      createElement(ApiReference, { allowedMachines: LEVEL_REGISTRY['bubble-sort'].machines })
    )
    expect(htmlBubble).toContain('api-tab-wareHouse')
    expect(htmlBubble).toContain('api-tab-weightScanner')
    expect(htmlBubble).toContain('api-tab-singleCrane')
    expect(htmlBubble).toContain('wareHouse.getCountBox()')
  })
})
