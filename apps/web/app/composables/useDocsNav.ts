interface DocsFrontmatter {
  title?: string
  description?: string
  order?: number
  group?: string
  hidden?: boolean
}

export interface DocsPage {
  title: string
  description: string
  slug: string
  path: string
  order: number
  group: string
  hidden: boolean
}

interface MdxModule {
  default: unknown
  frontmatter?: DocsFrontmatter
}

const modules = import.meta.glob<MdxModule>('~/content/docs/**/*.mdx', { eager: true })

const componentBySlug = new Map<string, unknown>()

function humanize(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function pathToSlug(filePath: string): string {
  const rel = filePath.replace(/^.*\/content\/docs\//, '').replace(/\.mdx$/, '')
  return rel === 'index' ? '' : rel
}

function buildPage(filePath: string, mod: MdxModule): DocsPage {
  const slug = pathToSlug(filePath)
  componentBySlug.set(slug, mod.default)
  const fm = mod.frontmatter ?? {}
  const titleFromSlug = slug === '' ? 'Documentation' : humanize(slug.split('/').pop() ?? slug)
  return {
    title: fm.title ?? titleFromSlug,
    description: fm.description ?? '',
    slug,
    path: slug ? `/docs/${slug}` : '/docs',
    order: typeof fm.order === 'number' ? fm.order : 100,
    group: fm.group ?? '',
    hidden: fm.hidden === true,
  }
}

const sortedPages: DocsPage[] = Object.entries(modules)
  .map(([filePath, mod]) => buildPage(filePath, mod))
  .filter(p => !p.hidden)
  .sort((a, b) => a.order - b.order || a.path.localeCompare(b.path))

export function useDocsNav() {
  return useState<DocsPage[]>('docs-nav', () => sortedPages)
}

export function useDocsContent(slug: string) {
  return componentBySlug.get(slug) ?? null
}

export function useDocsPage(slug: string) {
  const nav = useDocsNav()
  const current = computed(() => nav.value.find(p => p.slug === slug) ?? null)
  const index = computed(() => current.value ? nav.value.indexOf(current.value) : -1)
  const prev = computed(() => index.value > 0 ? nav.value[index.value - 1] : null)
  const next = computed(() => index.value >= 0 && index.value < nav.value.length - 1 ? nav.value[index.value + 1] : null)
  return { current, prev, next }
}
