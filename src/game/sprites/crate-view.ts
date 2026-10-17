import Phaser from 'phaser'

export type CrateVisualState = 'idle' | 'compare' | 'swap' | 'sorted' | 'scanned'

export class CrateView {
  readonly id: string
  weight: number
  value: number
  currentIndex: number
  readonly container: Phaser.GameObjects.Container
  private readonly boxBg: Phaser.GameObjects.Rectangle
  private readonly weightText: Phaser.GameObjects.Text
  private readonly unitText: Phaser.GameObjects.Text
  private readonly indexText: Phaser.GameObjects.Text

  constructor(
    scene: Phaser.Scene,
    id: string,
    weight: number,
    initialIndex: number,
    x: number,
    y: number,
    width: number = 70,
    height: number = 70
  ) {
    this.id = id
    this.weight = weight
    this.value = weight
    this.currentIndex = initialIndex

    this.container = scene.add.container(x, y)

    // Box background styling (industrial container)
    this.boxBg = scene.add.rectangle(0, 0, width, height, 0x1e293b)
    this.boxBg.setStrokeStyle(2, 0x38bdf8) // Cyan border

    // Prominent weight number text
    this.weightText = scene.add
      .text(0, -10, String(weight), {
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: 'bold',
        fontFamily: 'Inter, system-ui, sans-serif',
      })
      .setOrigin(0.5)

    // 'kg' unit label
    this.unitText = scene.add
      .text(0, 8, 'kg', {
        fontSize: '10px',
        color: '#38bdf8',
        fontFamily: 'Inter, system-ui, sans-serif',
      })
      .setOrigin(0.5)

    // Slot index badge text
    this.indexText = scene.add
      .text(0, height / 2 - 10, `[${initialIndex}]`, {
        fontSize: '10px',
        color: '#94a3b8',
        fontFamily: 'Inter, system-ui, monospace',
      })
      .setOrigin(0.5)

    this.container.add([this.boxBg, this.weightText, this.unitText, this.indexText])
  }

  setState(state: CrateVisualState): void {
    switch (state) {
      case 'idle':
        this.boxBg.setFillStyle(0x1e293b)
        this.boxBg.setStrokeStyle(2, 0x38bdf8)
        this.unitText.setColor('#38bdf8')
        break
      case 'scanned':
        this.boxBg.setFillStyle(0x0e7490)
        this.boxBg.setStrokeStyle(3, 0x22d3ee) // Neon cyan glow on scan
        this.unitText.setColor('#67e8f9')
        break
      case 'compare':
        this.boxBg.setFillStyle(0x0c4a6e)
        this.boxBg.setStrokeStyle(3, 0xfacc15) // Bright yellow glow
        this.unitText.setColor('#facc15')
        break
      case 'swap':
        this.boxBg.setFillStyle(0x064e3b)
        this.boxBg.setStrokeStyle(3, 0x4ade80) // Vibrant green
        this.unitText.setColor('#4ade80')
        break
      case 'sorted':
        this.boxBg.setFillStyle(0x14532d)
        this.boxBg.setStrokeStyle(2, 0x22c55e)
        this.unitText.setColor('#86efac')
        break
    }
  }

  updateSlot(newIndex: number): void {
    this.currentIndex = newIndex
    this.indexText.setText(`[${newIndex}]`)
  }

  setWeight(newWeight: number): void {
    this.weight = newWeight
    this.value = newWeight
    this.weightText.setText(String(newWeight))
  }

  destroy(): void {
    this.container.destroy()
  }
}
