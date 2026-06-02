// Content extractor — extracts plain text and headings from doc content
// Used for search indexing

export function extractText(json: any): string {
  if (!json) return ''

  let text = ''

  function walk(node: any) {
    if (node.text) {
      text += node.text + ' '
    }
    if (node.content) {
      for (const child of node.content) {
        walk(child)
      }
    }
  }

  walk(json)
  return text.trim()
}

export function extractHeadings(json: any): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []

  function walk(node: any) {
    if (node.type === 'heading') {
      const headingText = extractText(node)
      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      headings.push({ id, text: headingText, level: node.attrs?.level || 1 })
    }
    if (node.content) {
      for (const child of node.content) {
        walk(child)
      }
    }
  }

  walk(json)
  return headings
}
