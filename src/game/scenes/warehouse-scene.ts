import Phaser from 'phaser'
import { CrateView } from '../sprites/crate-view'
import { CraneView } from '../sprites/crane-view'
import { ScannerView } from '../sprites/scanner-view'
import type { IWarehouseSceneAdapter } from '../controllers/animation-controller'

export class WarehouseScene extends Phaser.Scene implements IWarehouseSceneAdapter {
  private crates: CrateView[] = []
  private crane: CraneView | null = null
  private scanner: ScannerView | null = null
  private slotSpacing: number = 85
  private startX: number = 100
  private floorY: number = 300
  private craneRailY: number = 65
  private sensorRailY: number = 195
  private initialValues: number[] = [64, 34, 25, 12, 22, 11, 90]

  constructor() {
    super({ key: 'WarehouseScene' })
  }

  init(data: { initialValues?: number[] }): void {
    if (data && data.initialValues && data.initialValues.length > 0) {
      this.initialValues = [...data.initialValues]
    }
  }

  create(): void {
    const { width, height } = this.scale

    // Upper overhead crane gantry rail
    const craneRail = this.add.rectangle(width / 2, this.craneRailY, width - 40, 12, 0x1e293b)
    craneRail.setStrokeStyle(2, 0x475569)

    // Intermediate sensor rail for WeightScanner
    const sensorRail = this.add.rectangle(width / 2, this.sensorRailY, width - 40, 6, 0x0f172a)
    sensorRail.setStrokeStyle(1, 0x0891b2)

    // Floor conveyor line
    const floor = this.add.rectangle(width / 2, this.floorY + 45, width - 40, 16, 0x0f172a)
    floor.setStrokeStyle(2, 0x334155)

    // Structural background grid
    this.drawBackgroundGrid(width, height)

    // Initialize crates, scanner, and crane
    this.initWarehouse(this.initialValues)
  }

  initWarehouse(values: number[]): void {
    // Clean up existing sprites
    for (const crate of this.crates) {
      crate.destroy()
    }
    this.crates = []

    if (this.crane) {
      this.crane.destroy()
      this.crane = null
    }

    if (this.scanner) {
      this.scanner.destroy()
      this.scanner = null
    }

    const { width } = this.scale
    const n = values.length
    this.slotSpacing = Math.min(95, Math.floor((width - 120) / Math.max(n, 1)))
    this.startX = Math.floor((width - (n - 1) * this.slotSpacing) / 2)

    // Create crate views
    for (let i = 0; i < n; i++) {
      const x = this.getSlotX(i)
      const crateView = new CrateView(this, `crate-${i}`, values[i], i, x, this.floorY)
      this.crates.push(crateView)
    }

    // Create machine views at initial index 0
    if (n > 0) {
      const initialX = this.getSlotX(0)
      this.crane = new CraneView(this, initialX, this.craneRailY, this.slotSpacing)
      this.scanner = new ScannerView(this, initialX, this.sensorRailY)
    }
  }

  getSlotX(index: number): number {
    return this.startX + index * this.slotSpacing
  }

  // Scanner animations
  animateScannerRead(index: number, weight: number, duration: number = 300): Promise<void> {
    return new Promise((resolve) => {
      const crate = this.crates[index]
      if (this.scanner) {
        this.scanner.setScanning(true, weight)
      }
      if (crate) {
        crate.setState('scanned')
      }

      this.time.delayedCall(Math.max(80, duration), () => {
        if (this.scanner) {
          this.scanner.setScanning(false)
        }
        if (crate) {
          crate.setState('idle')
        }
        resolve()
      })
    })
  }

  animateScannerMove(toIndex: number, duration: number = 250): Promise<void> {
    return new Promise((resolve) => {
      if (!this.scanner) {
        resolve()
        return
      }

      const targetX = this.getSlotX(toIndex)
      this.tweens.add({
        targets: this.scanner.container,
        x: targetX,
        duration: Math.max(50, duration),
        ease: 'Power2',
        onComplete: () => resolve(),
      })
    })
  }

  animateScannerMoveStart(duration: number = 250): Promise<void> {
    return this.animateScannerMove(0, duration)
  }

  // Crane animations
  animateCraneMove(toIndex: number, duration: number = 250): Promise<void> {
    return new Promise((resolve) => {
      if (!this.crane) {
        resolve()
        return
      }

      const targetX = this.getSlotX(toIndex)
      this.tweens.add({
        targets: this.crane.container,
        x: targetX,
        duration: Math.max(50, duration),
        ease: 'Power2',
        onComplete: () => resolve(),
      })
    })
  }

  animateCraneMoveStart(duration: number = 250): Promise<void> {
    return this.animateCraneMove(0, duration)
  }

  animateCraneSwap(indexA: number, indexB: number, duration: number = 500): Promise<void> {
    return new Promise((resolve) => {
      const crateA = this.crates[indexA]
      const crateB = this.crates[indexB]

      if (!crateA || !crateB) {
        resolve()
        return
      }

      if (this.crane) {
        this.crane.setGripping(true)
      }

      crateA.setState('swap')
      crateB.setState('swap')

      const xA = this.getSlotX(indexA)
      const xB = this.getSlotX(indexB)
      const liftY = this.floorY - 40
      const stepDuration = Math.max(40, duration / 3)

      // Phase 1: Lift crates
      this.tweens.add({
        targets: [crateA.container, crateB.container],
        y: liftY,
        duration: stepDuration,
        ease: 'Quad.easeOut',
        onComplete: () => {
          // Phase 2: Cross X positions
          this.tweens.add({
            targets: crateA.container,
            x: xB,
            duration: stepDuration,
            ease: 'Power2',
          })

          this.tweens.add({
            targets: crateB.container,
            x: xA,
            duration: stepDuration,
            ease: 'Power2',
            onComplete: () => {
              // Phase 3: Lower crates back to floor
              this.tweens.add({
                targets: [crateA.container, crateB.container],
                y: this.floorY,
                duration: stepDuration,
                ease: 'Quad.easeIn',
                onComplete: () => {
                  if (this.crane) {
                    this.crane.setGripping(false)
                  }
                  crateA.setState('idle')
                  crateB.setState('idle')

                  // Update references and slot badges
                  this.crates[indexA] = crateB
                  this.crates[indexB] = crateA
                  crateA.updateSlot(indexB)
                  crateB.updateSlot(indexA)

                  resolve()
                },
              })
            },
          })
        },
      })
    })
  }

  // Backwards-compatible methods
  animateMove(toIndex: number, duration: number = 250): Promise<void> {
    return this.animateCraneMove(toIndex, duration)
  }

  animateCompare(indexA: number, indexB: number, duration: number = 350): Promise<void> {
    return new Promise((resolve) => {
      const crateA = this.crates[indexA]
      const crateB = this.crates[indexB]

      if (this.crane) {
        this.crane.setScanning(true)
      }
      if (crateA) {
        crateA.setState('compare')
      }
      if (crateB) {
        crateB.setState('compare')
      }

      this.time.delayedCall(Math.max(80, duration), () => {
        if (this.crane) {
          this.crane.setScanning(false)
        }
        if (crateA) {
          crateA.setState('idle')
        }
        if (crateB) {
          crateB.setState('idle')
        }
        resolve()
      })
    })
  }

  animateSwap(indexA: number, indexB: number, duration: number = 500): Promise<void> {
    return this.animateCraneSwap(indexA, indexB, duration)
  }

  resetToState(values: number[]): void {
    this.tweens.killAll()
    this.initWarehouse(values)
  }

  highlightAllSorted(): void {
    for (const crate of this.crates) {
      crate.setState('sorted')
    }
  }

  private drawBackgroundGrid(width: number, height: number): void {
    const graphics = this.add.graphics()
    graphics.lineStyle(1, 0x1e293b, 0.4)

    // Structural columns
    for (let x = 40; x < width; x += 80) {
      graphics.lineBetween(x, 0, x, height)
    }

    // Shelf levels
    for (let y = 40; y < height; y += 70) {
      graphics.lineBetween(0, y, width, y)
    }
  }
}
