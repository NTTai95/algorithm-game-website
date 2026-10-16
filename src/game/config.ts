import Phaser from 'phaser'
import { WarehouseScene } from './scenes/warehouse-scene'

export function createGameConfig(
  parent: HTMLElement | string,
  initialValues: number[] = [5, 1, 4, 2, 8]
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: 860,
    height: 380,
    backgroundColor: '#090d16',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [WarehouseScene],
    callbacks: {
      preBoot: (game: Phaser.Game) => {
        game.registry.set('initialValues', initialValues)
      },
    },
  }
}
