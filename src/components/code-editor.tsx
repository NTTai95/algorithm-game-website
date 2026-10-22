import React, { useRef, useState, useLayoutEffect, useMemo } from 'react'
import { formatJavaCode } from '../core/parser/formatter'
import { highlightJavaToHtml } from '../core/parser/syntax-highlighter'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  currentLine?: number
  disabled?: boolean
  templates?: Record<string, string>
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  currentLine,
  disabled = false,
  templates,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const [formattedFeedback, setFormattedFeedback] = useState(false)

  const lines = code.split('\n')
  const highlightedHtml = useMemo(() => highlightJavaToHtml(code), [code])

  // Synchronize scroll between textarea, highlight layer, and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop
      preRef.current.scrollLeft = scrollLeft
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop
    }
  }

  // Ensure scroll is aligned when code changes
  useLayoutEffect(() => {
    if (textareaRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current
      if (preRef.current) {
        preRef.current.scrollTop = scrollTop
        preRef.current.scrollLeft = scrollLeft
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop
      }
    }
  }, [code])

  // Auto-scroll when active execution line changes
  useLayoutEffect(() => {
    if (currentLine && currentLine > 0 && textareaRef.current) {
      const lineIndex = currentLine - 1
      const lineHeight = 24 // 1.5rem = 24px
      const targetY = lineIndex * lineHeight
      const currentScroll = textareaRef.current.scrollTop
      const visibleHeight = textareaRef.current.clientHeight
      if (targetY < currentScroll || targetY > currentScroll + visibleHeight - lineHeight * 2) {
        textareaRef.current.scrollTop = Math.max(0, targetY - visibleHeight / 2)
      }
    }
  }, [currentLine])

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
    // Support Tab key inside editor (4 spaces)
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

  if (isCollapsed) {
    return (
      <aside
        className="editor-collapsed-dock"
        onClick={onToggleCollapse}
        title="Nhấp để mở rộng không gian viết code (Alt+C)"
        role="button"
        tabIndex={0}
      >
        <button
          type="button"
          className="btn-dock-toggle"
          onClick={(e) => {
            e.stopPropagation()
            onToggleCollapse?.()
          }}
          aria-label="Mở rộng Code Editor"
        >
          ⇲
        </button>
        <div className="dock-vertical-text">
          <span className="editor-tab-dot" />
          <span>WarehouseController.java</span>
        </div>
        <span className="dock-hint">Mở code</span>
      </aside>
    )
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

          {/* Collapse Editor Button */}
          {onToggleCollapse && (
            <button
              type="button"
              className="btn-toggle-collapse"
              onClick={onToggleCollapse}
              title="Thu nhỏ khu vực viết mã để phóng to màn hình đồ họa (Alt+C)"
              aria-label="Thu nhỏ Code Editor"
            >
              ⇱ Thu nhỏ
            </button>
          )}
        </div>
      </div>

      <div className="editor-body">
        {/* Line numbers column */}
        <div ref={lineNumbersRef} className="line-numbers" aria-hidden="true">
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

        {/* Code Viewport with Syntax Highlight Layer & Transparent Interactive Textarea */}
        <div className="editor-code-viewport">
          <pre
            ref={preRef}
            className="code-highlight-layer"
            aria-hidden="true"
          >
            <code
              className="syntax-highlight-code"
              dangerouslySetInnerHTML={{
                __html: highlightedHtml + (code.endsWith('\n') ? ' ' : ''),
              }}
            />
          </pre>

          <textarea
            ref={textareaRef}
            className="code-textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
            disabled={disabled}
            placeholder="Nhập mã Java điều khiển cỗ máy kho hàng..."
          />
        </div>
      </div>
    </div>
  )
}
