import type { MachineEvent } from '../../core/domain/events'

export interface IWarehouseSceneAdapter {
  animateMove(to: number, duration: number): Promise<void>
  animateCompare(indexA: number, indexB: number, duration: number): Promise<void>
  animateSwap(indexA: number, indexB: number, duration: number): Promise<void>
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
        await this.scene.animateMove(event.to, duration)
        break
      case 'CRANE_COMPARE':
        await this.scene.animateCompare(event.indexA, event.indexB, duration)
        break
      case 'CRANE_SWAP':
        await this.scene.animateSwap(event.indexA, event.indexB, duration)
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
      case 'CRANE_MOVE':
        return 250
      case 'CRANE_COMPARE':
        return 350
      case 'CRANE_SWAP':
        return 500
    }
  }
}
