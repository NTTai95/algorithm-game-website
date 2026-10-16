import React from 'react'

interface ControlBarProps {
  isRunning: boolean
  isPaused: boolean
  speed: number
  onRun: () => void
  onPause: () => void
  onResume: () => void
  onStep: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  onValidateHiddenTests: () => void
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isRunning,
  isPaused,
  speed,
  onRun,
  onPause,
  onResume,
  onStep,
  onReset,
  onSpeedChange,
  onValidateHiddenTests,
}) => {
  return (
    <div className="control-bar">
      <div className="control-group">
        {!isRunning ? (
          <button className="btn btn-primary" onClick={onRun} id="btn-run-code">
            ▶ Chạy Thuật Toán
          </button>
        ) : isPaused ? (
          <button className="btn btn-warning" onClick={onResume} id="btn-resume">
            ▶ Tiếp Tục
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={onPause} id="btn-pause">
            ⏸ Tạm Dừng
          </button>
        )}

        <button
          className="btn btn-step"
          onClick={onStep}
          disabled={isRunning && !isPaused}
          id="btn-step"
          title="Thực thi đúng 1 dòng lệnh tiếp theo"
        >
          ⏭ Từng Bước
        </button>

        <button className="btn btn-ghost" onClick={onReset} id="btn-reset">
          ↺ Reset Kho
        </button>
      </div>

      <div className="control-group">
        <span className="speed-label">Tốc độ:</span>
        {[1, 2, 3, 5].map((s) => (
          <button
            key={s}
            className={`btn-speed ${speed === s ? 'active' : ''}`}
            onClick={() => onSpeedChange(s)}
          >
            {s}x
          </button>
        ))}

        <div className="divider-vertical" />

        <button
          className="btn btn-validate"
          onClick={onValidateHiddenTests}
          id="btn-validate-tests"
        >
          🛡️ Kiểm Định 5 Test Ẩn
        </button>
      </div>
    </div>
  )
}
