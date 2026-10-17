import Phaser from 'phaser'

export class ScannerView {
  readonly container: Phaser.GameObjects.Container
  private readonly bodyBox: Phaser.GameObjects.Rectangle
  private readonly lens: Phaser.GameObjects.Arc
  private readonly statusLed: Phaser.GameObjects.Arc
  private readonly laserBeam: Phaser.GameObjects.Polygon
  private readonly weightPopup: Phaser.GameObjects.Container
  private readonly weightText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, initialX: number, railY: number) {
    this.container = scene.add.container(initialX, railY)

    // Sensor housing / chassis
    this.bodyBox = scene.add.rectangle(0, 0, 48, 22, 0x0f172a)
    this.bodyBox.setStrokeStyle(2, 0x06b6d4) // Cyan neon border

    // Optical scanner lens
    this.lens = scene.add.circle(0, 8, 5, 0x22d3ee)

    // Status indicator LED
    this.statusLed = scene.add.circle(16, -4, 3, 0x10b981) // Green standby LED

    // Laser beam projector (trapezoid cone pointing down toward crates)
    // Coords relative to container: top-left (-8, 12), top-right (8, 12), bottom-right (35, 95), bottom-left (-35, 95)
    this.laserBeam = scene.add.polygon(
      0,
      0,
      [
        { x: -8, y: 12 },
        { x: 8, y: 12 },
        { x: 35, y: 95 },
        { x: -35, y: 95 },
      ],
      0x06b6d4,
      0.3
    )
    this.laserBeam.setVisible(false)

    // Holographic weight popup floating above the scanner
    this.weightPopup = scene.add.container(0, -28)
    const popupBg = scene.add.rectangle(0, 0, 56, 20, 0x083344, 0.9)
    popupBg.setStrokeStyle(1, 0x22d3ee)
    this.weightText = scene.add
      .text(0, 0, '', {
        fontSize: '11px',
        color: '#67e8f9',
        fontStyle: 'bold',
        fontFamily: 'Inter, system-ui, sans-serif',
      })
      .setOrigin(0.5)

    this.weightPopup.add([popupBg, this.weightText])
    this.weightPopup.setVisible(false)

    this.container.add([
      this.laserBeam,
      this.bodyBox,
      this.lens,
      this.statusLed,
      this.weightPopup,
    ])
  }

  setScanning(scanning: boolean, weight?: number): void {
    this.laserBeam.setVisible(scanning)
    if (scanning) {
      this.statusLed.setFillStyle(0x38bdf8) // Vibrant scan light
      this.lens.setFillStyle(0x38bdf8)
      if (weight !== undefined) {
        this.weightText.setText(`${weight} kg`)
        this.weightPopup.setVisible(true)
      }
    } else {
      this.statusLed.setFillStyle(0x10b981) // Idle green LED
      this.lens.setFillStyle(0x22d3ee)
      this.weightPopup.setVisible(false)
    }
  }

  destroy(): void {
    this.container.destroy()
  }
}
