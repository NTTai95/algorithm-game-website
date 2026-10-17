import React, { useEffect, useRef } from 'react'
import { createWarehouseGame, type WarehouseGameHandle } from '../game'

interface GameCanvasProps {
  initialValues: readonly number[]
  onGameReady?: (handle: WarehouseGameHandle) => void
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ initialValues, onGameReady }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameHandleRef = useRef<WarehouseGameHandle | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Initialize Phaser 3 game
    const handle = createWarehouseGame(containerRef.current, [...initialValues])
    gameHandleRef.current = handle

    if (onGameReady) {
      onGameReady(handle)
    }

    return () => {
      handle.destroy()
      gameHandleRef.current = null
    }
  }, [initialValues, onGameReady])

  return (
    <div className="canvas-wrapper">
      <div ref={containerRef} id="phaser-game-container" className="phaser-canvas-container" />
    </div>
  )
}
