import React, { useEffect, useRef } from 'react'
import { createWarehouseGame, type WarehouseGameHandle } from '../game'

interface GameCanvasProps {
  initialValues: readonly number[]
  onGameReady?: (handle: WarehouseGameHandle) => void
}

/**
 * Hosts a single Phaser game for the lifetime of the component.
 * Later prop changes (new problem array, speed-dependent callbacks) must NOT recreate
 * the game: the parent drives the live scene through the handle instead.
 */
export const GameCanvas: React.FC<GameCanvasProps> = ({ initialValues, onGameReady }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameHandleRef = useRef<WarehouseGameHandle | null>(null)
  const initialValuesRef = useRef(initialValues)
  const onGameReadyRef = useRef(onGameReady)

  useEffect(() => {
    initialValuesRef.current = initialValues
    onGameReadyRef.current = onGameReady
  }, [initialValues, onGameReady])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Initialize Phaser 3 game once per mount
    const handle = createWarehouseGame(containerRef.current, [...initialValuesRef.current])
    gameHandleRef.current = handle
    onGameReadyRef.current?.(handle)

    return () => {
      handle.destroy()
      gameHandleRef.current = null
    }
  }, [])

  return (
    <div className="canvas-wrapper">
      <div ref={containerRef} id="phaser-game-container" className="phaser-canvas-container" />
    </div>
  )
}
