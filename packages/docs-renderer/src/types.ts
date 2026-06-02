export interface DocNode {
  type: string
  attrs?: Record<string, any>
  content?: DocNode[]
  text?: string
  marks?: any[]
}

export interface DocMeta {
  title: string
  description?: string
  icon?: string
  status?: string
  seoTitle?: string
  seoDescription?: string
  ogImageUrl?: string
}
