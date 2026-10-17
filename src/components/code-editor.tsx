import React, { useRef, useState } from 'react'
import { formatJavaCode } from '../core/parser/formatter'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  currentLine?: number
  disabled?: boolean
  templates?: Record<string, string>
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  currentLine,
  disabled = false,
  templates,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [formattedFeedback, setFormattedFeedback] = useState(false)

  const lines = code.split('\n')

  const handleFormatCode = () => {
    try {
      const formatted = formatJavaCode(code)
      onChange(formatted)
      setFormattedFeedback(true)
      setTimeout(() => setFormattedFeedback(false), 2000)
    } catch {
      // If code has severe syntax errors preventing parse, keep original code
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Support Tab key inside editor
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      onChange(newCode)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className="editor-container">
      <div className="editor-top-bar">
        <div className="editor-tab">
          <span className="editor-tab-dot" />
          <span>WarehouseController.java</span>
        </div>

        <div className="editor-actions-wrapper">
          {templates && Object.keys(templates).length > 0 && (
            <div className="template-selector">
              <span className="template-label">Mẫu:</span>
              <select
                className="select-template"
                onChange={(e) => {
                  const key = e.target.value
                  if (templates[key]) {
                    onChange(templates[key])
                  }
                }}
                defaultValue=""
                disabled={disabled}
              >
                <option value="" disabled>Chọn mẫu code...</option>
                {Object.keys(templates).map((key) => (
                  <option key={key} value={key}>
                    {key === 'standard'
                      ? 'Mã nguồn chuẩn'
                      : key === 'skeleton'
                      ? 'Khung bài tập'
                      : key}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Format Code Button */}
          <button
            type="button"
            className={`btn-format-code ${formattedFeedback ? 'btn-format-success' : ''}`}
            onClick={handleFormatCode}
            disabled={disabled}
            title="Tự động căn lề và định dạng mã nguồn Java theo chuẩn"
          >
            {formattedFeedback ? '✓ Đã căn lề' : '⚡ Format Code'}
          </button>
        </div>
      </div>

      <div className="editor-body">
        {/* Line numbers column */}
        <div className="line-numbers" aria-hidden="true">
          {lines.map((_, idx) => {
            const lineNum = idx + 1
            const isCurrent = lineNum === currentLine
            return (
              <div
                key={lineNum}
                className={`line-num ${isCurrent ? 'line-num-active' : ''}`}
              >
                {lineNum}
              </div>
            )
          })}
        </div>

        {/* Textarea code input */}
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          disabled={disabled}
          placeholder="Nhập mã Java điều khiển cỗ máy kho hàng..."
        />
      </div>
    </div>
  )
}
