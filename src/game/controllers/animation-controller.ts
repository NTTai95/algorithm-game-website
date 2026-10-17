import type { MachineEvent } from '../../core/domain/events'

export interface IWarehouseSceneAdapter {
  animateMove(to: number, duration: number): Promise<void>
  animateCompare(indexA: number, indexB: number, duration: number): Promise<void>
  animateSwap(indexA: number, indexB: number, duration: number): Promise<void>

  // Multi-machine additions
  animateScannerRead?(index: number, weight: number, duration: number): Promise<void>
  animateScannerMove?(to: number, duration: number): Promise<void>
  animateScannerMoveStart?(duration: number): Promise<void>
  animateCraneMove?(to: number, duration: number): Promise<void>
  animateCraneMoveStart?(duration: number): Promise<void>
  animateCraneSwap?(indexA: number, indexB: number, duration: number): Promise<void>
}

export class AnimationController {
  private readonly scene: IWarehouseSceneAdapter
  private queue: MachineEvent[] = []
  private isProcessing: boolean = false
  private paused: boolean = false
  private speedMultiplier: number = 1.0

  constructor(scene: IWarehouseSceneAdapter) {
    this.scene = scene
  }

  setSpeed(speed: number): void {
    this.speedMultiplier = Math.max(0.2, Math.min(speed, 5.0))
  }

  getSpeed(): number {
    return this.speedMultiplier
  }

  enqueue(event: MachineEvent): void {
    this.queue.push(event)
  }

  enqueueAll(events: readonly MachineEvent[]): void {
    this.queue.push(...events)
  }

  async playEvent(event: MachineEvent): Promise<void> {
    const baseDuration = this.getEventBaseDuration(event)
    const duration = baseDuration / this.speedMultiplier

    switch (event.type) {
      case 'CRANE_MOVE':
        if (this.scene.animateCraneMove) {
          await this.scene.animateCraneMove(event.to, duration)
        } else {
          await this.scene.animateMove(event.to, duration)
        }
        break

      case 'CRANE_MOVE_START':
        if (this.scene.animateCraneMoveStart) {
          await this.scene.animateCraneMoveStart(duration)
        } else {
          await this.scene.animateMove(0, duration)
        }
        break

      case 'CRANE_SWAP':
        if (this.scene.animateCraneSwap) {
          await this.scene.animateCraneSwap(event.indexA, event.indexB, duration)
        } else {
          await this.scene.animateSwap(event.indexA, event.indexB, duration)
        }
        break

      case 'CRANE_COMPARE':
        await this.scene.animateCompare(event.indexA, event.indexB, duration)
        break

      case 'SCANNER_READ':
        if (this.scene.animateScannerRead) {
          await this.scene.animateScannerRead(event.index, event.weight, duration)
        }
        break

      case 'SCANNER_MOVE':
        if (this.scene.animateScannerMove) {
          await this.scene.animateScannerMove(event.to, duration)
        }
        break

      case 'SCANNER_MOVE_START':
        if (this.scene.animateScannerMoveStart) {
          await this.scene.animateScannerMoveStart(duration)
        }
        break
    }
  }

  async playNext(): Promise<boolean> {
    if (this.queue.length === 0) {
      return false
    }

    const event = this.queue.shift()
    if (!event) {
      return false
    }

    this.isProcessing = true
    await this.playEvent(event)
    this.isProcessing = false
    return true
  }

  async playAll(): Promise<void> {
    this.paused = false
    while (this.queue.length > 0 && !this.paused) {
      await this.playNext()
    }
  }

  pause(): void {
    this.paused = true
  }

  resume(): void {
    if (this.paused) {
      this.paused = false
      if (!this.isProcessing) {
        void this.playAll()
      }
    }
  }

  clear(): void {
    this.queue = []
    this.isProcessing = false
    this.paused = false
  }

  isBusy(): boolean {
    return this.isProcessing || this.queue.length > 0
  }

  private getEventBaseDuration(event: MachineEvent): number {
    switch (event.type) {
      case 'SCANNER_READ':
        return 300
      case 'SCANNER_MOVE':
      case 'SCANNER_MOVE_START':
        return 200
      case 'CRANE_MOVE':
      case 'CRANE_MOVE_START':
        return 250
      case 'CRANE_COMPARE':
        return 350
      case 'CRANE_SWAP':
        return 500
      default:
        return 250
    }
  }
}
