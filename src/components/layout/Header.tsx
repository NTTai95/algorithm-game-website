import React, { useState } from 'react'
import type { LevelId } from '../../core/levels/types'
import { LEVEL_REGISTRY } from '../../core/levels/level-registry'

interface HeaderProps {
  currentPath: string
  activeLevelId?: LevelId
  onNavigate: (hash: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  activeLevelId,
  onNavigate,
}) => {
  const [tutorialDropdownOpen, setTutorialDropdownOpen] = useState(false)
  const [algoDropdownOpen, setAlgoDropdownOpen] = useState(false)

  const isHome = currentPath === '/' || currentPath === '' || currentPath === '#/'

  const handleLinkClick = (hash: string) => {
    setTutorialDropdownOpen(false)
    setAlgoDropdownOpen(false)
    onNavigate(hash)
  }

  return (
    <header className="app-header">
      <div className="header-brand-section" onClick={() => handleLinkClick('#/')}>
        <div className="brand-logo-icon">🏗️</div>
        <div>
          <div className="brand-title">ALGO WAREHOUSE // DSA SIMULATION</div>
          <div className="brand-subtitle">Nền tảng mô phỏng cấu trúc dữ liệu và giải thuật kho hàng tự động</div>
        </div>
      </div>

      <nav className="header-nav-links">
        {/* Home */}
        <button
          className={`nav-btn ${isHome ? 'nav-btn-active' : ''}`}
          onClick={() => handleLinkClick('#/')}
        >
          <span>🏠</span>
          <span>Trang Chủ</span>
        </button>

        {/* Tutorial dropdown */}
        <div
          className="nav-dropdown-container"
          onMouseEnter={() => setTutorialDropdownOpen(true)}
          onMouseLeave={() => setTutorialDropdownOpen(false)}
        >
          <button
            className={`nav-btn ${
              activeLevelId && activeLevelId.startsWith('0.') ? 'nav-btn-active' : ''
            }`}
            onClick={() => setTutorialDropdownOpen(!tutorialDropdownOpen)}
          >
            <span>🎓</span>
            <span>Màn 0: Hướng Dẫn</span>
            <span className="dropdown-arrow">▾</span>
          </button>

          {tutorialDropdownOpen && (
            <div className="nav-dropdown-menu">
              <div className="dropdown-header">CẨM NANG VẬN HÀNH MÁY MÓC</div>
              <button
                className={`dropdown-item ${activeLevelId === '0.1' ? 'dropdown-item-active' : ''}`}
                onClick={() => handleLinkClick('#/tutorial/0.1')}
              >
                <span className="dropdown-tag">0.1</span>
                <div>
                  <div className="dropdown-title">Máy Quét Khối Lượng</div>
                  <div className="dropdown-desc">Cảm biến laser WeightScanner</div>
                </div>
              </button>
              <button
                className={`dropdown-item ${activeLevelId === '0.2' ? 'dropdown-item-active' : ''}`}
                onClick={() => handleLinkClick('#/tutorial/0.2')}
              >
                <span className="dropdown-tag">0.2</span>
                <div>
                  <div className="dropdown-title">Cần Cẩu Cơ Học</div>
                  <div className="dropdown-desc">Giàn gắp SingleCrane</div>
                </div>
              </button>
              <button
                className={`dropdown-item ${activeLevelId === '0.3' ? 'dropdown-item-active' : ''}`}
                onClick={() => handleLinkClick('#/tutorial/0.3')}
              >
                <span className="dropdown-tag">0.3</span>
                <div>
                  <div className="dropdown-title">Hiệu Chuẩn Phối Hợp</div>
                  <div className="dropdown-desc">Phối hợp Scanner + Crane</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Algorithm dropdown */}
        <div
          className="nav-dropdown-container"
          onMouseEnter={() => setAlgoDropdownOpen(true)}
          onMouseLeave={() => setAlgoDropdownOpen(false)}
        >
          <button
            className={`nav-btn ${activeLevelId === 'bubble-sort' ? 'nav-btn-active' : ''}`}
            onClick={() => setAlgoDropdownOpen(!algoDropdownOpen)}
          >
            <span>⚡</span>
            <span>Chiến Dịch DSA</span>
            <span className="dropdown-arrow">▾</span>
          </button>

          {algoDropdownOpen && (
            <div className="nav-dropdown-menu">
              <div className="dropdown-header">DANH MỤC GIẢI THUẬT SẮP XẾP</div>
              <button
                className={`dropdown-item ${activeLevelId === 'bubble-sort' ? 'dropdown-item-active' : ''}`}
                onClick={() => handleLinkClick('#/level/bubble-sort')}
              >
                <span className="dropdown-tag badge-cyan">Màn 1</span>
                <div>
                  <div className="dropdown-title">Bubble Sort (Nổi Bọt)</div>
                  <div className="dropdown-desc">Đa cỗ máy theo khối lượng</div>
                </div>
              </button>
              <div className="dropdown-item dropdown-item-disabled">
                <span className="dropdown-tag badge-locked">🔒 Màn 2</span>
                <div>
                  <div className="dropdown-title">Selection Sort (Chọn)</div>
                  <div className="dropdown-desc">Khóa - Mở tại Sprint 3</div>
                </div>
              </div>
              <div className="dropdown-item dropdown-item-disabled">
                <span className="dropdown-tag badge-locked">🔒 Màn 3</span>
                <div>
                  <div className="dropdown-title">Insertion Sort (Chèn)</div>
                  <div className="dropdown-desc">Khóa - Mở tại Sprint 3</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Current Level Pill */}
      {activeLevelId && LEVEL_REGISTRY[activeLevelId] && (
        <div className="level-tag">
          <span className="status-dot-live">●</span>
          <span>{LEVEL_REGISTRY[activeLevelId].stageTag}</span>
        </div>
      )}
    </header>
  )
}
