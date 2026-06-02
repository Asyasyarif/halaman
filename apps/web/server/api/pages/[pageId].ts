import { eq } from '@halaman/database'
import { db } from '@halaman/database'
import { pages, pageVersions } from '@halaman/database/schema'
import { z } from 'zod'

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
})

const draftSchema = z.object({
  contentJson: z.any(),
  title: z.string().optional(),
  frontmatterJson: z.any().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const pageId = getRouterParam(event, 'pageId')!

  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, pageId))
    .limit(1)

  if (!page) throw createError({ statusCode: 404, message: 'Page not found' })

  if (event.method === 'GET') {
    return page
  }

  if (event.method === 'PATCH') {
    const path = event.path

    // Draft autosave endpoint
    if (path.endsWith('/draft')) {
      const body = await readBody(event)
      const data = draftSchema.parse(body)

      const [updated] = await db
        .update(pages)
        .set({
          contentJson: data.contentJson,
          ...(data.title ? { title: data.title } : {}),
          ...(data.frontmatterJson ? { frontmatterJson: data.frontmatterJson } : {}),
          updatedAt: new Date(),
        })
        .where(eq(pages.id, pageId))
        .returning()

      return updated
    }

    // General update
    const body = await readBody(event)
    const data = updateSchema.parse(body)

    const [updated] = await db
      .update(pages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pages.id, pageId))
      .returning()

    return updated
  }

  if (event.method === 'DELETE') {
    await db.delete(pages).where(eq(pages.id, pageId))
    return { success: true }
  }

  throw createError({ statusCode: 404 })
})
