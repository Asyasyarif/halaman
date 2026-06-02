import { eq, and } from '@halaman/database'
import { db } from '@halaman/database'
import { pages } from '@halaman/database/schema'
import { z } from 'zod'

const patchSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-/]+$/).optional(),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  contentJson: z.any().optional(),
  frontmatterJson: z.any().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  ogImageUrl: z.string().nullable().optional(),
  order: z.number().optional(),
  isHidden: z.boolean().optional(),
  locale: z.string().optional(),
  parentId: z.string().uuid().nullable().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const pageId = getRouterParam(event, 'pageId')!

  if (event.method === 'GET') {
    const [page] = await db
      .select()
      .from(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)))
      .limit(1)
    if (!page) throw createError({ statusCode: 404, message: 'Page not found' })
    return page
  }

  if (event.method === 'PATCH') {
    const body = await readBody(event)
    const data = patchSchema.parse(body)

    const updates: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    }
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined) updates[k] = v
    }

    const [updated] = await db
      .update(pages)
      .set(updates)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)))
      .returning()

    if (!updated) throw createError({ statusCode: 404, message: 'Page not found' })
    return updated
  }

  if (event.method === 'DELETE') {
    const result = await db
      .delete(pages)
      .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)))
      .returning({ id: pages.id })
    if (result.length === 0) throw createError({ statusCode: 404, message: 'Page not found' })
    return { success: true }
  }

  throw createError({ statusCode: 404 })
})
