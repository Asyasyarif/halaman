import type { DocNode, DocMeta } from '../types'

export function parseMdx(source: string): { ast: DocNode; meta: DocMeta } {
  const meta: DocMeta = { title: '' }

  // Extract frontmatter
  const fmMatch = source.match(/^---\n([\s\S]*?)\n---\n?/)
  if (fmMatch) {
    const fm = fmMatch[1]
    for (const line of fm.split('\n')) {
      const [key, ...rest] = line.split(':')
      if (!key) continue
      const value = rest.join(':').trim()
      const k = key.trim()
      if (k === 'title') meta.title = value
      if (k === 'description') meta.description = value
      if (k === 'icon') meta.icon = value
      if (k === 'status') meta.status = value
      if (k === 'seoTitle') meta.seoTitle = value
      if (k === 'seoDescription') meta.seoDescription = value
      if (k === 'ogImageUrl') meta.ogImageUrl = value
    }
  }

  const body = fmMatch ? source.slice(fmMatch[0].length) : source

  // Simple markdown parser — convert to DocNode AST
  const ast: DocNode = {
    type: 'doc',
    content: parseMarkdownBody(body),
  }

  return { ast, meta }
}

function parseMarkdownBody(body: string): DocNode[] {
  const nodes: DocNode[] = []
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

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    nodes.push({
      type: 'paragraph',
      content: [{ type: 'text', text: line }],
    })
    i++
  }

  return nodes
}
