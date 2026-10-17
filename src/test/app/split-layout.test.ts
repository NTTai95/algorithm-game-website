import { describe, expect, it } from 'vitest'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { CodeEditor } from '../../components/code-editor'

describe('Split-Screen Layout & Editor Collapse (TASK-011)', () => {
  it('renders CodeEditor in normal expanded mode with collapse toggle button', () => {
    let toggled = false
    const html = renderToString(
      React.createElement(CodeEditor, {
        code: 'public static void solve() {}',
        onChange: () => {},
        isCollapsed: false,
        onToggleCollapse: () => {
          toggled = true
        },
      })
    )

    expect(html).toContain('editor-container')
    expect(html).toContain('btn-toggle-collapse')
    expect(html).toContain('Thu nhỏ')
    expect(html).toContain('code-textarea')
    expect(html).not.toContain('editor-collapsed-dock')
    expect(toggled).toBe(false)
  })

  it('renders CodeEditor in collapsed dock mode when isCollapsed is true', () => {
    const html = renderToString(
      React.createElement(CodeEditor, {
        code: 'public static void solve() {}',
        onChange: () => {},
        isCollapsed: true,
        onToggleCollapse: () => {},
      })
    )

    expect(html).toContain('editor-collapsed-dock')
    expect(html).toContain('btn-dock-toggle')
    expect(html).toContain('WarehouseController.java')
    expect(html).toContain('dock-vertical-text')
    expect(html).toContain('Mở code')
    expect(html).not.toContain('editor-container')
    expect(html).not.toContain('code-textarea')
  })

  it('omits collapse button when onToggleCollapse callback is not provided', () => {
    const html = renderToString(
      React.createElement(CodeEditor, {
        code: 'public static void solve() {}',
        onChange: () => {},
      })
    )

    expect(html).toContain('editor-container')
    expect(html).not.toContain('btn-toggle-collapse')
  })

  it('renders templates and format button in expanded editor', () => {
    const html = renderToString(
      React.createElement(CodeEditor, {
        code: 'public static void solve() {}',
        onChange: () => {},
        templates: { standard: 'solve()', skeleton: '// skeleton' },
        onToggleCollapse: () => {},
      })
    )

    expect(html).toContain('btn-format-code')
    expect(html).toContain('template-selector')
    expect(html).toContain('Mã nguồn chuẩn')
  })
})
