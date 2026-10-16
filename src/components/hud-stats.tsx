import React from 'react'

export type GameStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'SUCCESS' | 'VIOLATION'

interface HudStatsProps {
  status: GameStatus
  movesCount: number
  comparisonsCount: number
  swapsCount: number
  stepCount: number
  maxSteps: number
  lastAction?: string
  currentLine?: number
}

export const HudStats: React.FC<HudStatsProps> = ({
  status,
  movesCount,
  comparisonsCount,
  swapsCount,
  stepCount,
  maxSteps,
  lastAction,
  currentLine,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'RUNNING':
        return <span className="status-badge status-running"><span className="status-pulse" /> ĐANG CHẠY</span>
      case 'PAUSED':
        return <span className="status-badge status-paused">TẠM DỪNG</span>
      case 'SUCCESS':
        return <span className="status-badge status-success">✓ THÀNH CÔNG</span>
      case 'VIOLATION':
        return <span className="status-badge status-violation">✕ VI PHẠM LUẬT</span>
      default:
        return <span className="status-badge status-idle">SẴN SÀNG</span>
    }
  }

  return (
    <div className="hud-panel">
      <div className="hud-header">
        <span className="hud-title">CHỈ SỐ VẬN HÀNH NHÀ KHO</span>
        {getStatusBadge()}
      </div>

      <div className="hud-grid">
        <div className="hud-stat-card">
          <div className="hud-stat-label">Di chuyển (Moves)</div>
          <div className="hud-stat-value text-cyan">{movesCount}</div>
        </div>

        <div className="hud-stat-card">
          <div className="hud-stat-label">So sánh (Compares)</div>
          <div className="hud-stat-value text-amber">{comparisonsCount}</div>
        </div>

        <div className="hud-stat-card">
          <div className="hud-stat-label">Đổi chỗ (Swaps)</div>
          <div className="hud-stat-value text-emerald">{swapsCount}</div>
        </div>

        <div className="hud-stat-card">
          <div className="hud-stat-label">Ngân sách bước</div>
          <div className="hud-stat-value text-purple">
            {stepCount} <span className="text-muted text-xs">/ {maxSteps}</span>
          </div>
        </div>
      </div>

      {(lastAction || currentLine) && (
        <div className="hud-footer">
          {currentLine && (
            <span className="hud-action-tag">Dòng: <strong>{currentLine}</strong></span>
          )}
          {lastAction && (
            <span className="hud-action-tag">Lệnh: <code className="text-cyan">{lastAction}</code></span>
          )}
        </div>
      )}
    </div>
  )
}
