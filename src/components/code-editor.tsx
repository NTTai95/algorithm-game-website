import React, { useRef } from 'react'
import { CODE_TEMPLATES } from './code-templates'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  currentLine?: number
  disabled?: boolean
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  currentLine,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lines = code.split('\n')

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

        <div className="template-selector">
          <span className="template-label">Mẫu mã:</span>
          <select
            className="select-template"
            onChange={(e) => {
              const val = e.target.value as keyof typeof CODE_TEMPLATES
              if (CODE_TEMPLATES[val]) {
                onChange(CODE_TEMPLATES[val])
              }
            }}
            defaultValue="bubbleSort"
            disabled={disabled}
          >
            <option value="bubbleSort">Thuật toán Bubble Sort mẫu</option>
            <option value="skeleton">Khung bài tập rỗng</option>
            <option value="cheatAttempt">Mã lỗi thử nghiệm</option>
          </select>
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
