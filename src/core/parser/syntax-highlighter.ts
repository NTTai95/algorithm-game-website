export type HighlightTokenType =
  | 'keyword'
  | 'machine'
  | 'type'
  | 'method'
  | 'number'
  | 'string'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'identifier'
  | 'plain'

export interface HighlightToken {
  type: HighlightTokenType
  value: string
}

export const JAVA_KEYWORDS = new Set([
  'public',
  'private',
  'protected',
  'static',
  'final',
  'abstract',
  'class',
  'interface',
  'implements',
  'extends',
  'void',
  'int',
  'boolean',
  'double',
  'float',
  'char',
  'long',
  'short',
  'byte',
  'if',
  'else',
  'for',
  'while',
  'do',
  'break',
  'continue',
  'return',
  'true',
  'false',
  'null',
  'new',
  'this',
  'super',
  'try',
  'catch',
  'finally',
  'throw',
  'throws',
  'switch',
  'case',
  'default',
  'import',
  'package',
])

export const MACHINE_NAMES = new Set([
  'wareHouse',
  'WeightScanner',
  'SingleCrane',
  'WarehouseController',
  'Crane',
  'Scanner',
  'Warehouse',
])

export const KNOWN_METHODS = new Set([
  'read',
  'compare',
  'swap',
  'next',
  'prev',
  'length',
  'position',
  'getCountBox',
  'getWeightBox',
  'move',
  'moveStart',
  'solve',
  'print',
  'println',
  'main',
  'equals',
  'toString',
])

/**
 * Escapes HTML characters to prevent XSS and layout breakage when rendering inside <pre><code>.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Tokenizes Java source code into highlighted tokens.
 * Invariant: Joining token values reconstructs the exact original source string.
 */
export function tokenizeJava(code: string): HighlightToken[] {
  const tokens: HighlightToken[] = []
  const len = code.length
  let pos = 0
  let lastNonWhitespaceToken: HighlightToken | null = null

  while (pos < len) {
    const char = code[pos]

    // 1. Whitespace (spaces, tabs, newlines)
    if (char === ' ' || char === '\t' || char === '\r' || char === '\n') {
      let wsEnd = pos + 1
      while (
        wsEnd < len &&
        (code[wsEnd] === ' ' ||
          code[wsEnd] === '\t' ||
          code[wsEnd] === '\r' ||
          code[wsEnd] === '\n')
      ) {
        wsEnd++
      }
      tokens.push({ type: 'plain', value: code.slice(pos, wsEnd) })
      pos = wsEnd
      continue
    }

    // 2. Line comment: // ...
    if (char === '/' && pos + 1 < len && code[pos + 1] === '/') {
      let commentEnd = pos + 2
      while (commentEnd < len && code[commentEnd] !== '\n') {
        commentEnd++
      }
      const token: HighlightToken = {
        type: 'comment',
        value: code.slice(pos, commentEnd),
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = commentEnd
      continue
    }

    // 3. Block comment: /* ... */
    if (char === '/' && pos + 1 < len && code[pos + 1] === '*') {
      let blockEnd = pos + 2
      while (blockEnd < len) {
        if (
          code[blockEnd] === '*' &&
          blockEnd + 1 < len &&
          code[blockEnd + 1] === '/'
        ) {
          blockEnd += 2
          break
        }
        blockEnd++
      }
      const token: HighlightToken = {
        type: 'comment',
        value: code.slice(pos, blockEnd),
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = blockEnd
      continue
    }

    // 4. String literal: "..."
    if (char === '"') {
      let strEnd = pos + 1
      while (strEnd < len) {
        if (code[strEnd] === '\\' && strEnd + 1 < len) {
          strEnd += 2
          continue
        }
        if (code[strEnd] === '"' || code[strEnd] === '\n') {
          if (code[strEnd] === '"') strEnd++
          break
        }
        strEnd++
      }
      const token: HighlightToken = {
        type: 'string',
        value: code.slice(pos, strEnd),
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = strEnd
      continue
    }

    // 5. Character literal: '...'
    if (char === '\'') {
      let charEnd = pos + 1
      while (charEnd < len) {
        if (code[charEnd] === '\\' && charEnd + 1 < len) {
          charEnd += 2
          continue
        }
        if (code[charEnd] === '\'' || code[charEnd] === '\n') {
          if (code[charEnd] === '\'') charEnd++
          break
        }
        charEnd++
      }
      const token: HighlightToken = {
        type: 'string',
        value: code.slice(pos, charEnd),
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = charEnd
      continue
    }

    // 6. Number literal: integer, hex, float
    if (
      (char >= '0' && char <= '9') ||
      (char === '.' &&
        pos + 1 < len &&
        code[pos + 1] >= '0' &&
        code[pos + 1] <= '9')
    ) {
      let numEnd = pos + 1
      if (char === '0' && pos + 1 < len && (code[pos + 1] === 'x' || code[pos + 1] === 'X')) {
        numEnd = pos + 2
        while (
          numEnd < len &&
          /[0-9a-fA-F]/.test(code[numEnd])
        ) {
          numEnd++
        }
      } else {
        let hasDot = char === '.'
        while (numEnd < len) {
          const c = code[numEnd]
          if (c >= '0' && c <= '9') {
            numEnd++
          } else if (c === '.' && !hasDot && numEnd + 1 < len && code[numEnd + 1] >= '0' && code[numEnd + 1] <= '9') {
            hasDot = true
            numEnd++
          } else {
            break
          }
        }
      }
      const token: HighlightToken = {
        type: 'number',
        value: code.slice(pos, numEnd),
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = numEnd
      continue
    }

    // 7. Identifiers & Keywords & Machines & Methods
    if (
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      char === '_' ||
      char === '$'
    ) {
      let idEnd = pos + 1
      while (
        idEnd < len &&
        ((code[idEnd] >= 'a' && code[idEnd] <= 'z') ||
          (code[idEnd] >= 'A' && code[idEnd] <= 'Z') ||
          (code[idEnd] >= '0' && code[idEnd] <= '9') ||
          code[idEnd] === '_' ||
          code[idEnd] === '$')
      ) {
        idEnd++
      }

      const ident = code.slice(pos, idEnd)

      // Peek if followed by '(' (ignoring inline whitespace)
      let lookahead = idEnd
      while (lookahead < len && (code[lookahead] === ' ' || code[lookahead] === '\t')) {
        lookahead++
      }
      const isFollowedByParen = lookahead < len && code[lookahead] === '('

      const isPrecededByDot =
        lastNonWhitespaceToken?.type === 'punctuation' &&
        lastNonWhitespaceToken.value === '.'

      let tokenType: HighlightTokenType = 'identifier'

      if (JAVA_KEYWORDS.has(ident)) {
        tokenType = 'keyword'
      } else if (MACHINE_NAMES.has(ident)) {
        tokenType = 'machine'
      } else if (KNOWN_METHODS.has(ident) || isPrecededByDot || isFollowedByParen) {
        tokenType = 'method'
      } else if (ident[0] >= 'A' && ident[0] <= 'Z') {
        tokenType = 'type'
      }

      const token: HighlightToken = {
        type: tokenType,
        value: ident,
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos = idEnd
      continue
    }

    // 8. Multi-character operators
    if (pos + 1 < len) {
      const two = code.slice(pos, pos + 2)
      if (
        two === '++' ||
        two === '--' ||
        two === '==' ||
        two === '!=' ||
        two === '<=' ||
        two === '>=' ||
        two === '&&' ||
        two === '||' ||
        two === '+=' ||
        two === '-=' ||
        two === '*=' ||
        two === '/=' ||
        two === '%='
      ) {
        const token: HighlightToken = {
          type: 'operator',
          value: two,
        }
        tokens.push(token)
        lastNonWhitespaceToken = token
        pos += 2
        continue
      }
    }

    // 9. Single-character operators
    if (
      char === '+' ||
      char === '-' ||
      char === '*' ||
      char === '/' ||
      char === '%' ||
      char === '<' ||
      char === '>' ||
      char === '!' ||
      char === '=' ||
      char === '&' ||
      char === '|' ||
      char === '^' ||
      char === '~'
    ) {
      const token: HighlightToken = {
        type: 'operator',
        value: char,
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos++
      continue
    }

    // 10. Punctuation
    if (
      char === '{' ||
      char === '}' ||
      char === '(' ||
      char === ')' ||
      char === '[' ||
      char === ']' ||
      char === ';' ||
      char === ',' ||
      char === '.' ||
      char === ':' ||
      char === '?'
    ) {
      const token: HighlightToken = {
        type: 'punctuation',
        value: char,
      }
      tokens.push(token)
      lastNonWhitespaceToken = token
      pos++
      continue
    }

    // 11. Fallback for any other character (plain)
    const token: HighlightToken = {
      type: 'plain',
      value: char,
    }
    tokens.push(token)
    lastNonWhitespaceToken = token
    pos++
  }

  return tokens
}

/**
 * Converts Java code string into syntax-highlighted HTML with styled spans.
 */
export function highlightJavaToHtml(code: string): string {
  const tokens = tokenizeJava(code)
  return tokens
    .map((token) => {
      const escaped = escapeHtml(token.value)
      if (token.type === 'plain') {
        return escaped
      }
      return `<span class="token token-${token.type}">${escaped}</span>`
    })
    .join('')
}
