import Phaser from 'phaser'

export type CrateVisualState = 'idle' | 'compare' | 'swap' | 'sorted'

export class CrateView {
  readonly id: string
  value: number
  currentIndex: number
  readonly container: Phaser.GameObjects.Container
  private readonly boxBg: Phaser.GameObjects.Rectangle
  private readonly valueText: Phaser.GameObjects.Text
  private readonly indexText: Phaser.GameObjects.Text

  constructor(
    scene: Phaser.Scene,
    id: string,
    value: number,
    initialIndex: number,
    x: number,
    y: number,
    width: number = 70,
    height: number = 70
  ) {
    this.id = id
    this.value = value
    this.currentIndex = initialIndex

    this.container = scene.add.container(x, y)

    // Box background styling
    this.boxBg = scene.add.rectangle(0, 0, width, height, 0x1e293b)
    this.boxBg.setStrokeStyle(2, 0x38bdf8) // Cyan border

    // Value text
    this.valueText = scene.add.text(0, -5, String(value), {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Inter, system-ui, sans-serif',
    }).setOrigin(0.5)

    // Slot index badge text
    this.indexText = scene.add.text(0, height / 2 - 12, `[${initialIndex}]`, {
      fontSize: '11px',
      color: '#94a3b8',
      fontFamily: 'Inter, system-ui, monospace',
    }).setOrigin(0.5)

    this.container.add([this.boxBg, this.valueText, this.indexText])
  }

  setState(state: CrateVisualState): void {
    switch (state) {
      case 'idle':
        this.boxBg.setFillStyle(0x1e293b)
        this.boxBg.setStrokeStyle(2, 0x38bdf8)
        break
      case 'compare':
        this.boxBg.setFillStyle(0x0c4a6e)
        this.boxBg.setStrokeStyle(3, 0xfacc15) // Bright yellow glow
        break
      case 'swap':
        this.boxBg.setFillStyle(0x064e3b)
        this.boxBg.setStrokeStyle(3, 0x4ade80) // Vibrant green
        break
      case 'sorted':
        this.boxBg.setFillStyle(0x14532d)
        this.boxBg.setStrokeStyle(2, 0x22c55e)
        break
    }
  }

  updateSlot(newIndex: number): void {
    this.currentIndex = newIndex
    this.indexText.setText(`[${newIndex}]`)
  }

  destroy(): void {
    this.container.destroy()
  }
}
