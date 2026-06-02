import { eq, and } from '@halaman/database'
import { db } from '@halaman/database'
import { pages } from '@halaman/database/schema'
import { z } from 'zod'

const createSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-/]+$/),
  parentId: z.string().uuid().optional(),
  icon: z.string().optional(),
})

const updateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-/]+$/).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  contentJson: z.any().optional(),
  frontmatterJson: z.any().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImageUrl: z.string().optional(),
  order: z.number().optional(),
  isHidden: z.boolean().optional(),
  locale: z.string().optional(),
  version: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const projectId = getRouterParam(event, 'projectId')!

  if (event.method === 'GET') {
    const all = await db
      .select()
      .from(pages)
      .where(eq(pages.projectId, projectId))
      .orderBy(pages.order)

    return all
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const data = createSchema.parse(body)

    const [page] = await db
      .insert(pages)
      .values({ ...data, projectId })
      .returning()

    return page
  }

  throw createError({ statusCode: 404 })
})
