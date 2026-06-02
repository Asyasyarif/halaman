declare module '*.mdx' {
  import type { FunctionalComponent } from 'vue'
  import type { MDXComponents } from 'mdx/types'

  const MDXContent: FunctionalComponent<{ components?: MDXComponents }>
  export default MDXContent

  export const frontmatter: Record<string, unknown>
}
