import React from 'react'
import type { ValidationResult } from '../core/validator/validator-types'

interface ValidationModalProps {
  result: ValidationResult | null
  onClose: () => void
}

export const ValidationModal: React.FC<ValidationModalProps> = ({ result, onClose }) => {
  if (!result) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${result.passed ? 'modal-header-success' : 'modal-header-error'}`}>
          <div className="modal-icon">{result.passed ? '🏆' : '⚠️'}</div>
          <div>
            <h2 className="modal-title">
              {result.passed ? 'NGHIỆM THU THUẬT TOÁN THÀNH CÔNG!' : 'CHƯA ĐẠT CHUẨN THUẬT TOÁN'}
            </h2>
            <p className="modal-subtitle">
              {result.passed
                ? 'Mã của bạn đã tái hiện chuẩn xác 100% bản chất thuật toán Bubble Sort và vượt qua tất cả các bộ test ẩn.'
                : 'Mã chưa thỏa mãn các quy tắc hoặc bất biến của thuật toán Bubble Sort.'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {result.violationReason && (
            <div className="violation-alert">
              <strong>Lý do không đạt:</strong> {result.violationReason}
            </div>
          )}

          <h3 className="section-title">Kết Quả 5 Bài Test Ẩn (Hidden Test Cases)</h3>

          <div className="test-cases-list">
            {result.testCases.map((tc, idx) => (
              <div
                key={tc.name}
                className={`test-case-card ${tc.passed ? 'test-passed' : 'test-failed'}`}
              >
                <div className="test-case-header">
                  <span className="test-name">
                    #{idx + 1}. {tc.name}
                  </span>
                  <span className={`test-badge ${tc.passed ? 'badge-pass' : 'badge-fail'}`}>
                    {tc.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>

                <div className="test-case-details">
                  <div className="test-detail-row">
                    <span>Mảng đầu vào:</span>
                    <code>[{tc.input.join(', ')}]</code>
                  </div>
                  {tc.passed ? (
                    <div className="test-metrics">
                      <span>Di chuyển: <strong>{tc.movesCount}</strong></span>
                      <span>So sánh: <strong>{tc.comparisonsCount}</strong></span>
                      <span>Đổi chỗ: <strong>{tc.swapsCount}</strong></span>
                    </div>
                  ) : (
                    tc.error && <div className="test-error-msg">{tc.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
          {result.passed && (
            <button className="btn btn-primary" onClick={onClose}>
              Tiếp Tục Màn Kế Tiếp →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
