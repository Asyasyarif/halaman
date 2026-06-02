// Tiptap JSON → MDX serializer

interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  text?: string
  marks?: { type: string; attrs?: Record<string, any> }[]
}

function serializeNode(node: TiptapNode): string {
  switch (node.type) {
    case 'doc':
      return (node.content || []).map(serializeNode).join('\n\n')

    case 'heading':
      return '#'.repeat(node.attrs?.level || 1) + ' ' + (node.content || []).map(serializeNode).join('')

    case 'paragraph':
      return (node.content || []).map(serializeNode).join('')

    case 'text': {
      let text = node.text || ''
      if (node.marks) {
        for (const mark of node.marks) {
          if (mark.type === 'bold') text = `**${text}**`
          if (mark.type === 'italic') text = `*${text}*`
          if (mark.type === 'code') text = `\`${text}\``
          if (mark.type === 'link') text = `[${text}](${mark.attrs?.href || ''})`
        }
      }
      return text
    }

    case 'bulletList':
      return (node.content || []).map((item) => `- ${serializeNode(item)}`).join('\n')

    case 'orderedList':
      return (node.content || []).map((item, i) => `${i + 1}. ${serializeNode(item)}`).join('\n')

    case 'listItem':
      return (node.content || []).map(serializeNode).join('')

    case 'codeBlock':
      return '```' + (node.attrs?.language || '') + '\n' + (node.content?.[0]?.text || '') + '\n```'

    case 'blockquote':
      return (node.content || []).map((c) => '> ' + serializeNode(c)).join('\n')

    case 'callout':
      return `<Callout variant="${node.attrs?.variant || 'info'}" title="${node.attrs?.title || ''}">\n${(node.content || []).map(serializeNode).join('\n')}\n</Callout>`

    case 'card':
      return `<Card title="${node.attrs?.title || ''}" ${node.attrs?.icon ? `icon="${node.attrs.icon}"` : ''} ${node.attrs?.link ? `link="${node.attrs.link}"` : ''}>${node.attrs?.description || ''}</Card>`

    case 'tabs':
      return `<Tabs tabs={${JSON.stringify(node.attrs?.tabs || [])}}>${(node.content || []).map(serializeNode).join('\n')}</Tabs>`

    case 'steps':
      return `<Steps>${(node.content || []).map(serializeNode).join('\n')}</Steps>`

    case 'accordion':
      return `<Accordion title="${node.attrs?.title || ''}">${(node.content || []).map(serializeNode).join('\n')}</Accordion>`

    case 'table':
      return serializeTable(node)

    default:
      return (node.content || []).map(serializeNode).join('')
  }
}

function serializeTable(node: TiptapNode): string {
  const rows = node.content || []
  let output = ''
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].content || []
    output += '| ' + cells.map((c) => (c.content || []).map(serializeNode).join('')).join(' | ') + ' |\n'
    if (i === 0) {
      output += '| ' + cells.map(() => '---').join(' | ') + ' |\n'
    }
  }
  return output
}

export function serializeTiptapToMdx(json: TiptapNode): string {
  return serializeNode(json)
}
