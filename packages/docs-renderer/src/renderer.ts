import type { DocNode } from './types'

export type { DocNode, DocMeta } from './types'

export function renderDoc(ast: DocNode): string {
  // Simplified renderer — in production, this returns HTML or Vue render functions
  return JSON.stringify(ast)
}

export function extractHeadings(ast: DocNode): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []

  function walk(node: DocNode) {
    if (node.type === 'heading') {
      const text = node.content?.map((c) => c.text || '').join('') || ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      headings.push({ id, text, level: node.attrs?.level || 1 })
    }
    node.content?.forEach(walk)
  }

  walk(ast)
  return headings
}
