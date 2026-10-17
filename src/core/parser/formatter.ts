/**
 * Formats Java source code with clean indentation and consistent spacing.
 */
export function formatJavaCode(source: string, indentSize: number = 4): string {
  const lines = source.split(/\r?\n/)
  const formattedLines: string[] = []
  let currentIndent = 0
  const indentStr = ' '.repeat(indentSize)

  for (const rawLine of lines) {
    let line = rawLine.trim()

    // Handle empty line
    if (!line) {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('')
      }
      continue
    }

    // Check if line begins with a closing brace (which lowers indent before printing)
    const startsWithClosingBrace = line.startsWith('}')

    let effectiveIndent = currentIndent
    if (startsWithClosingBrace) {
      effectiveIndent = Math.max(0, currentIndent - 1)
    }

    // Count brace changes in this line (excluding comments)
    const codeWithoutComments = line.split('//')[0]
    const openBraces = (codeWithoutComments.match(/\{/g) || []).length
    const closeBraces = (codeWithoutComments.match(/\}/g) || []).length

    // Normalize spaces around common structures
    line = normalizeSpacing(line)

    // Build indented line
    const indentation = indentStr.repeat(effectiveIndent)
    formattedLines.push(`${indentation}${line}`)

    // Update currentIndent for subsequent lines
    currentIndent = Math.max(0, currentIndent + openBraces - closeBraces)
  }

  // Trim leading/trailing blank lines
  return formattedLines.join('\n').trim() + '\n'
}

function normalizeSpacing(line: string): string {
  // Preserve comment portion
  const commentIndex = line.indexOf('//')
  let codePart = commentIndex !== -1 ? line.slice(0, commentIndex).trimEnd() : line
  const commentPart = commentIndex !== -1 ? ' ' + line.slice(commentIndex).trim() : ''

  // Protect ++ and -- before splitting single + and -
  codePart = codePart
    .replace(/\+\+/g, '___INC___')
    .replace(/--/g, '___DEC___')
    .replace(/\s*([=><!]=|[><=])\s*/g, ' $1 ')
    .replace(/\s*([+*/%-])\s*/g, ' $1 ')
    .replace(/\s*([&|]{2})\s*/g, ' $1 ')
    .replace(/\s*___INC___\s*/g, '++')
    .replace(/\s*___DEC___\s*/g, '--')
    .replace(/!\s+/g, '!')
    .replace(/\s*;\s*/g, '; ')
    .replace(/;\s+$/g, ';')
    .replace(/;\s*$/g, ';')
    .replace(/\b(for|if|while)\s*\(/g, '$1 (')
    .replace(/\)\s*\{/g, ') {')
    .replace(/\s*,\s*/g, ', ')

  return `${codePart}${commentPart}`
}

