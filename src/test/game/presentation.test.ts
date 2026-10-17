import { describe, expect, it, vi } from 'vitest'
import {
  AnimationController,
  type IWarehouseSceneAdapter,
} from '../../game/controllers/animation-controller'
import type { MachineEvent } from '../../core/domain/events'

describe('Game Presentation Layer - AnimationController', () => {
  it('initializes with default speed 1.0 and allows speed adjustments', () => {
    const mockScene: IWarehouseSceneAdapter = {
      animateMove: vi.fn().mockResolvedValue(undefined),
      animateCompare: vi.fn().mockResolvedValue(undefined),
      animateSwap: vi.fn().mockResolvedValue(undefined),
    }

    const controller = new AnimationController(mockScene)
    expect(controller.getSpeed()).toBe(1.0)

    controller.setSpeed(3.0)
    expect(controller.getSpeed()).toBe(3.0)

    // Clamps within valid bounds [0.2, 5.0]
    controller.setSpeed(10.0)
    expect(controller.getSpeed()).toBe(5.0)

    controller.setSpeed(0.01)
    expect(controller.getSpeed()).toBe(0.2)
  })

  it('enqueues and processes events sequentially with speed scaling', async () => {
    const mockScene: IWarehouseSceneAdapter = {
      animateMove: vi.fn().mockResolvedValue(undefined),
      animateCompare: vi.fn().mockResolvedValue(undefined),
      animateSwap: vi.fn().mockResolvedValue(undefined),
    }

    const controller = new AnimationController(mockScene)
    controller.setSpeed(2.0)

    const events: MachineEvent[] = [
      { type: 'CRANE_MOVE', from: 0, to: 1, timestamp: 100 },
      {
        type: 'CRANE_COMPARE',
        indexA: 1,
        indexB: 2,
        valueA: 20,
        valueB: 10,
        result: 1,
        timestamp: 101,
      },
      {
        type: 'CRANE_SWAP',
        indexA: 1,
        indexB: 2,
        crateA: { id: 'c1', value: 20, initialIndex: 1 },
        crateB: { id: 'c2', value: 10, initialIndex: 2 },
        timestamp: 102,
      },
    ]

    controller.enqueueAll(events)
    expect(controller.isBusy()).toBe(true)

    // Play next event (MOVE)
    const moved = await controller.playNext()
    expect(moved).toBe(true)
    expect(mockScene.animateMove).toHaveBeenCalledWith(1, 250 / 2.0)

    // Play remaining events
    await controller.playAll()
    expect(mockScene.animateCompare).toHaveBeenCalledWith(1, 2, 350 / 2.0)
    expect(mockScene.animateSwap).toHaveBeenCalledWith(1, 2, 500 / 2.0)
    expect(controller.isBusy()).toBe(false)
  })

  it('handles pause, resume, and clear correctly', async () => {
    const mockScene: IWarehouseSceneAdapter = {
      animateMove: vi.fn().mockResolvedValue(undefined),
      animateCompare: vi.fn().mockResolvedValue(undefined),
      animateSwap: vi.fn().mockResolvedValue(undefined),
    }

    const controller = new AnimationController(mockScene)
    controller.enqueue({ type: 'CRANE_MOVE', from: 0, to: 1, timestamp: 100 })

    controller.pause()
    expect(controller.isBusy()).toBe(true)

    controller.clear()
    expect(controller.isBusy()).toBe(false)
  })
})
