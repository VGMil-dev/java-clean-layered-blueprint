"use client"

import { useMemo } from "react"

// Gruvbox-flavoured Java token styles
const styles: Record<string, string> = {
  keyword: "text-gruvbox-red font-semibold",
  type: "text-gruvbox-yellow",
  string: "text-gruvbox-green",
  number: "text-gruvbox-purple",
  comment: "text-muted-foreground italic",
  annotation: "text-gruvbox-blue",
  method: "text-amber-intense",
  punctuation: "text-muted-foreground",
  classname: "text-gruvbox-yellow font-semibold",
  plain: "text-foreground/90",
}

interface Token {
  type: string
  value: string
}

const KEYWORDS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
  "const", "continue", "default", "do", "double", "else", "enum", "extends", "final",
  "finally", "float", "for", "goto", "if", "implements", "import", "instanceof",
  "int", "interface", "long", "native", "new", "package", "private", "protected",
  "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized",
  "this", "throw", "throws", "transient", "try", "void", "volatile", "while", "var",
  "true", "false", "null",
])

const TYPES = new Set([
  "String", "Integer", "Long", "Double", "Float", "Boolean", "Character", "Byte", "Short",
  "Object", "System", "Math", "List", "ArrayList", "Map", "HashMap", "Set", "HashSet",
])

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i)
      const slice = end === -1 ? code.slice(i) : code.slice(i, end)
      tokens.push({ type: "comment", value: slice })
      i += slice.length
      continue
    }

    // Block comment
    if (code[i] === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2)
      const slice = end === -1 ? code.slice(i) : code.slice(i, end + 2)
      tokens.push({ type: "comment", value: slice })
      i += slice.length
      continue
    }

    // String literal "..."
    if (code[i] === '"') {
      let j = i + 1
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++
        j++
      }
      const slice = code.slice(i, j + 1)
      tokens.push({ type: "string", value: slice })
      i = j + 1
      continue
    }

    // Char literal '.'
    if (code[i] === "'" && code[i + 2] === "'") {
      tokens.push({ type: "string", value: code.slice(i, i + 3) })
      i += 3
      continue
    }
    if (code[i] === "'" && code[i + 1] === "\\" && code[i + 3] === "'") {
      tokens.push({ type: "string", value: code.slice(i, i + 4) })
      i += 4
      continue
    }

    // Annotation @...
    if (code[i] === "@") {
      let j = i + 1
      while (j < code.length && /\w/.test(code[j])) j++
      tokens.push({ type: "annotation", value: code.slice(i, j) })
      i = j
      continue
    }

    // Numbers (including suffixes like L, f, d)
    if (/\d/.test(code[i])) {
      let j = i
      while (j < code.length && /[\d._xXa-fA-FLlFfDd]/.test(code[j])) j++
      tokens.push({ type: "number", value: code.slice(i, j) })
      i = j
      continue
    }

    // Words (identifiers, keywords, types)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < code.length && /[\w$]/.test(code[j])) j++
      const word = code.slice(i, j)

      // Check for method call: word followed by (
      const rest = code.slice(j).trimStart()
      if (rest[0] === "(") {
        // But only if not a keyword
        if (KEYWORDS.has(word)) {
          tokens.push({ type: "keyword", value: word })
        } else {
          tokens.push({ type: "method", value: word })
        }
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word })
      } else if (TYPES.has(word)) {
        tokens.push({ type: "type", value: word })
      } else if (word[0] === word[0].toUpperCase() && /^[A-Z]/.test(word)) {
        tokens.push({ type: "classname", value: word })
      } else {
        tokens.push({ type: "plain", value: word })
      }
      i = j
      continue
    }

    // Punctuation / operators
    if (/[{}()[\];,.=+\-*/<>!&|^~%?:]/.test(code[i])) {
      tokens.push({ type: "punctuation", value: code[i] })
      i++
      continue
    }

    // Whitespace and anything else
    tokens.push({ type: "plain", value: code[i] })
    i++
  }

  return tokens
}

export function JavaHighlighter({ code }: { code: string }) {
  const tokens = useMemo(() => tokenize(code.trim()), [code])

  return (
    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto p-4 rounded-lg bg-black/30 border border-white/5">
      <code>
        {tokens.map((token, i) => (
          <span key={i} className={styles[token.type] || styles.plain}>
            {token.value}
          </span>
        ))}
      </code>
    </pre>
  )
}
