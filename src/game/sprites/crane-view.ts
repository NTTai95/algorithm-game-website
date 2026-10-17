import Phaser from 'phaser'

export class CraneView {
  readonly container: Phaser.GameObjects.Container
  private readonly trolley: Phaser.GameObjects.Rectangle
  private readonly cable: Phaser.GameObjects.Line
  private readonly gripperBar: Phaser.GameObjects.Rectangle
  private readonly leftClaw: Phaser.GameObjects.Rectangle
  private readonly rightClaw: Phaser.GameObjects.Rectangle
  private readonly statusIndicator: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene, initialX: number, railY: number, slotSpacing: number = 90) {
    this.container = scene.add.container(initialX, railY)

    // Trolley sliding on top overhead gantry rail
    this.trolley = scene.add.rectangle(slotSpacing / 2, 0, 72, 22, 0x1e293b)
    this.trolley.setStrokeStyle(2, 0x38bdf8)

    // Status LED light
    this.statusIndicator = scene.add.circle(slotSpacing / 2, 0, 4, 0x10b981)

    // Hoist cable
    this.cable = scene.add.line(slotSpacing / 2, 11, 0, 0, 0, 60, 0x64748b)
    this.cable.setLineWidth(2)

    // Gripper horizontal beam spanning 2 adjacent slots
    this.gripperBar = scene.add.rectangle(slotSpacing / 2, 75, slotSpacing + 44, 12, 0x0f172a)
    this.gripperBar.setStrokeStyle(2, 0x0284c7)

    // Left gripper claw
    this.leftClaw = scene.add.rectangle(0, 92, 10, 24, 0x0284c7)

    // Right gripper claw
    this.rightClaw = scene.add.rectangle(slotSpacing, 92, 10, 24, 0x0284c7)

    this.container.add([
      this.trolley,
      this.statusIndicator,
      this.cable,
      this.gripperBar,
      this.leftClaw,
      this.rightClaw,
    ])
  }

  setScanning(scanning: boolean): void {
    if (scanning) {
      this.statusIndicator.setFillStyle(0xfacc15)
    } else {
      this.statusIndicator.setFillStyle(0x10b981)
    }
  }

  setGripping(gripping: boolean): void {
    if (gripping) {
      this.statusIndicator.setFillStyle(0x4ade80) // Green gripping LED
      this.leftClaw.setFillStyle(0x22c55e)
      this.rightClaw.setFillStyle(0x22c55e)
    } else {
      this.statusIndicator.setFillStyle(0x10b981)
      this.leftClaw.setFillStyle(0x0284c7)
      this.rightClaw.setFillStyle(0x0284c7)
    }
  }

  destroy(): void {
    this.container.destroy()
  }
}
