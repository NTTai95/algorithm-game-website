import Phaser from 'phaser'

export class CraneView {
  readonly container: Phaser.GameObjects.Container
  private readonly trolley: Phaser.GameObjects.Rectangle
  private readonly cable: Phaser.GameObjects.Line
  private readonly gripperBar: Phaser.GameObjects.Rectangle
  private readonly leftClaw: Phaser.GameObjects.Rectangle
  private readonly rightClaw: Phaser.GameObjects.Rectangle
  private readonly laserBeam: Phaser.GameObjects.Rectangle
  private readonly statusIndicator: Phaser.GameObjects.Arc

  constructor(scene: Phaser.Scene, initialX: number, railY: number, slotSpacing: number = 90) {
    this.container = scene.add.container(initialX, railY)

    // Trolley box sliding on top rail
    this.trolley = scene.add.rectangle(slotSpacing / 2, 0, 70, 24, 0x334155)
    this.trolley.setStrokeStyle(2, 0x64748b)

    // Status LED light
    this.statusIndicator = scene.add.circle(slotSpacing / 2, 0, 5, 0x38bdf8)

    // Vertical hoist cable
    this.cable = scene.add.line(slotSpacing / 2, 12, 0, 0, 0, 70, 0x94a3b8)
    this.cable.setLineWidth(2)

    // Gripper horizontal bar spanning over 2 adjacent slots
    this.gripperBar = scene.add.rectangle(slotSpacing / 2, 85, slotSpacing + 50, 14, 0x1e293b)
    this.gripperBar.setStrokeStyle(2, 0x0284c7)

    // Left gripper claw
    this.leftClaw = scene.add.rectangle(0, 105, 12, 30, 0x0ea5e9)

    // Right gripper claw
    this.rightClaw = scene.add.rectangle(slotSpacing, 105, 12, 30, 0x0ea5e9)

    // Laser scanner visual effect (hidden initially)
    this.laserBeam = scene.add.rectangle(slotSpacing / 2, 160, slotSpacing + 40, 90, 0x38bdf8, 0.25)
    this.laserBeam.setVisible(false)

    this.container.add([
      this.laserBeam,
      this.trolley,
      this.statusIndicator,
      this.cable,
      this.gripperBar,
      this.leftClaw,
      this.rightClaw,
    ])
  }

  setScanning(scanning: boolean): void {
    this.laserBeam.setVisible(scanning)
    if (scanning) {
      this.statusIndicator.setFillStyle(0xfacc15) // Yellow scanning LED
    } else {
      this.statusIndicator.setFillStyle(0x38bdf8) // Cyan ready LED
    }
  }

  setGripping(gripping: boolean): void {
    if (gripping) {
      this.statusIndicator.setFillStyle(0x4ade80) // Green gripping LED
      this.leftClaw.setFillStyle(0x22c55e)
      this.rightClaw.setFillStyle(0x22c55e)
    } else {
      this.statusIndicator.setFillStyle(0x38bdf8)
      this.leftClaw.setFillStyle(0x0ea5e9)
      this.rightClaw.setFillStyle(0x0ea5e9)
    }
  }

  destroy(): void {
    this.container.destroy()
  }
}
