import React from 'react'
import type { DiagnosticReport } from '../../core/validator/diagnostic-types'

interface DiagnosticModalProps {
  report: DiagnosticReport | null
  onClose: () => void
  onNextLevel?: () => void
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  report,
  onClose,
  onNextLevel,
}) => {
  if (!report) return null

  const isSuccess = report.success

  const getErrorTypeBadge = (type?: string) => {
    switch (type) {
      case 'SYNTAX':
        return { label: 'LỖI CÚ PHÁP (SYNTAX_ERROR)', className: 'badge-syntax' }
      case 'MACHINE_RUNTIME':
        return { label: 'LỖI THỰC THI MÁY MÓC (RUNTIME_ERROR)', className: 'badge-runtime' }
      case 'INVARIANT':
        return { label: 'VI PHẠM BẤT BIẾN GIẢI THUẬT (INVARIANT_VIOLATION)', className: 'badge-invariant' }
      case 'UNSORTED':
        return { label: 'MẢNG CHƯA ĐƯỢC SẮP XẾP (UNSORTED_RESULT)', className: 'badge-unsorted' }
      default:
        return { label: 'LỖI THUẬT TOÁN', className: 'badge-fail' }
    }
  }

  const badgeInfo = getErrorTypeBadge(report.errorType)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card diagnostic-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`modal-header ${isSuccess ? 'modal-header-success' : 'modal-header-error'}`}>
          <div className="modal-icon">{isSuccess ? '🏆' : '⚠️'}</div>
          <div className="modal-header-text">
            <div className="modal-header-top-row">
              <h2 className="modal-title">
                {isSuccess
                  ? 'NGHIỆM THU THUẬT TOÁN THÀNH CÔNG!'
                  : 'BÁO CÁO CHẨN ĐOÁN LỖI THUẬT TOÁN'}
              </h2>
              {!isSuccess && report.errorType && (
                <span className={`diagnostic-error-badge ${badgeInfo.className}`}>
                  {badgeInfo.label}
                </span>
              )}
            </div>
            <p className="modal-subtitle">
              {isSuccess
                ? 'Mã của bạn đã tái hiện chuẩn xác 100% bản chất thuật toán và vượt qua tất cả các bài kiểm tra ẩn.'
                : 'Phát hiện sự cố thực thi hoặc hành vi vi phạm quy chuẩn thuật toán.'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Đóng">✕</button>
        </div>

        <div className="modal-body">
          {/* Detailed Error Section */}
          {!isSuccess && (
            <div className="diagnostic-details-section">
              {/* Line number and message */}
              <div className="diagnostic-alert-card">
                <div className="diagnostic-alert-header">
                  {report.lineNumber && (
                    <span className="line-pill">
                      📍 Dòng {report.lineNumber}
                    </span>
                  )}
                  <span className="diagnostic-msg-title">Chi tiết vi phạm:</span>
                </div>
                <div className="diagnostic-msg-body">{report.message}</div>
              </div>

              {/* Context Details: Actual vs Expected comparison */}
              {report.contextDetails && (
                <div className="diagnostic-compare-card">
                  <div className="compare-column actual-col">
                    <span className="compare-label">Giá Trị Thực Tế (Actual)</span>
                    <div className="compare-value-box val-actual">
                      {report.contextDetails.actual}
                    </div>
                  </div>
                  <div className="compare-separator">vs</div>
                  <div className="compare-column expected-col">
                    <span className="compare-label">Kỳ Vọng Hợp Lệ (Expected)</span>
                    <div className="compare-value-box val-expected">
                      {report.contextDetails.expected}
                    </div>
                  </div>
                </div>
              )}

              {/* Pedagogical Hint Callout */}
              {report.hint && (
                <div className="diagnostic-hint-callout">
                  <div className="hint-header">
                    <span className="hint-icon">💡</span>
                    <span className="hint-title">GỢI Ý KHẮC PHỤC SƯ PHẠM:</span>
                  </div>
                  <div className="hint-body">{report.hint}</div>
                </div>
              )}
            </div>
          )}

          {/* Hidden Test Cases Section */}
          {report.testCases && report.testCases.length > 0 && (
            <div className="hidden-tests-section">
              <div className="section-title-row">
                <h3 className="section-title">Kết Quả 5 Bài Test Ẩn (Hidden Test Cases)</h3>
                <span className="test-progress-pill">
                  Đã đạt: {report.hiddenTestsPassed ?? report.testCases.filter((t) => t.passed).length} / {report.totalHiddenTests ?? report.testCases.length}
                </span>
              </div>

              <div className="test-cases-list">
                {report.testCases.map((tc, idx) => (
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
                        <span>Khối lượng đầu vào:</span>
                        <code>[{tc.input.join('kg, ')}kg]</code>
                      </div>
                      {tc.passed ? (
                        <div className="test-metrics">
                          <span>Di chuyển: <strong>{tc.movesCount}</strong></span>
                          <span>So sánh/Quét: <strong>{tc.comparisonsCount}</strong></span>
                          <span>Đổi chỗ: <strong>{tc.swapsCount}</strong></span>
                        </div>
                      ) : (
                        tc.error && <div className="test-error-msg">⚠️ {tc.error}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {isSuccess ? 'Đóng' : 'Sửa Mã Lệnh'}
          </button>
          {isSuccess && onNextLevel && (
            <button className="btn btn-primary" onClick={onNextLevel}>
              Tiếp Tục Màn Kế Tiếp →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
