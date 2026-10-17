import Phaser from 'phaser'
import { createGameConfig } from './config'
import { WarehouseScene } from './scenes/warehouse-scene'
import { AnimationController } from './controllers/animation-controller'

export * from './config'
export * from './scenes/warehouse-scene'
export * from './sprites/crate-view'
export * from './sprites/crane-view'
export * from './sprites/scanner-view'
export * from './controllers/animation-controller'

export interface WarehouseGameHandle {
  game: Phaser.Game
  getScene: () => WarehouseScene | null
  getController: () => AnimationController | null
  destroy: () => void
}

/**
 * Initializes a new Phaser 3 warehouse simulation game inside the given HTML container.
 */
export function createWarehouseGame(
  parent: HTMLElement | string,
  initialValues: number[] = [5, 1, 4, 2, 8]
): WarehouseGameHandle {
  const config = createGameConfig(parent, initialValues)
  const game = new Phaser.Game(config)

  let animationController: AnimationController | null = null

  const getScene = (): WarehouseScene | null => {
    return game.scene.getScene('WarehouseScene') as WarehouseScene | null
  }

  const getController = (): AnimationController | null => {
    if (!animationController) {
      const scene = getScene()
      if (scene) {
        animationController = new AnimationController(scene)
      }
    }
    return animationController
  }

  return {
    game,
    getScene,
    getController,
    destroy: () => {
      game.destroy(true)
    },
  }
}

export const GAME_LAYER_STATUS = 'OPERATIONAL' as const
