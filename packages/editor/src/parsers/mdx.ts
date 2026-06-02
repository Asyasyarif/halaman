// MDX → Tiptap JSON parser

interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  text?: string
  marks?: { type: string; attrs?: Record<string, any> }[]
}

export function parseMdxToTiptap(mdx: string): TiptapNode {
  return {
    type: 'doc',
    content: parseMdxBody(mdx),
  }
}

function parseMdxBody(body: string): TiptapNode[] {
  const nodes: TiptapNode[] = []
  const lines = body.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/)
    if (headingMatch) {
      nodes.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: [{ type: 'text', text: headingMatch[2] }],
      })
      i++
      continue
    }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push({
        type: 'codeBlock',
        attrs: { language: lang || undefined },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      })
      i++ // skip closing ```
      continue
    }

    // Bullet list
    if (line.match(/^-\s+/)) {
      const items: TiptapNode[] = []
      while (i < lines.length && lines[i].match(/^-\s+/)) {
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: lines[i].replace(/^-\s+/, '') }] }],
        })
        i++
      }
      nodes.push({ type: 'bulletList', content: items })
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    nodes.push({
      type: 'paragraph',
      content: parseInline(line),
    })
    i++
  }

  return nodes
}

function parseInline(text: string): TiptapNode[] {
  const nodes: TiptapNode[] = []
  let remaining = text

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/^\*(.+?)\*/)
    const codeMatch = remaining.match(/^`(.+?)`/)
    const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/)

    if (boldMatch) {
      nodes.push({ type: 'text', text: boldMatch[1], marks: [{ type: 'bold' }] })
      remaining = remaining.slice(boldMatch[0].length)
    } else if (italicMatch) {
      nodes.push({ type: 'text', text: italicMatch[1], marks: [{ type: 'italic' }] })
      remaining = remaining.slice(italicMatch[0].length)
    } else if (codeMatch) {
      nodes.push({ type: 'text', text: codeMatch[1], marks: [{ type: 'code' }] })
      remaining = remaining.slice(codeMatch[0].length)
    } else if (linkMatch) {
      nodes.push({ type: 'text', text: linkMatch[1], marks: [{ type: 'link', attrs: { href: linkMatch[2] } }] })
      remaining = remaining.slice(linkMatch[0].length)
    } else {
      const nextMatch = remaining.match(/[*`\[]/)
      if (nextMatch && nextMatch.index !== undefined) {
        nodes.push({ type: 'text', text: remaining.slice(0, nextMatch.index) })
        remaining = remaining.slice(nextMatch.index)
      } else {
        nodes.push({ type: 'text', text: remaining })
        remaining = ''
      }
    }
  }

  return nodes
}
