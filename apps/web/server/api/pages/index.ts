import { eq, and, desc } from '@halaman/database'
import { db } from '@halaman/database'
import { pages } from '@halaman/database/schema'
import { z } from 'zod'

const createSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-/]+$/),
  parentId: z.string().uuid().optional().nullable(),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  if (event.method === 'GET') {
    const all = await db
      .select()
      .from(pages)
      .where(eq(pages.userId, user.id))
      .orderBy(pages.order, desc(pages.updatedAt))
    return all
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const data = createSchema.parse(body)

    const [page] = await db
      .insert(pages)
      .values({
        userId: user.id,
        title: data.title,
        slug: data.slug,
        parentId: data.parentId ?? null,
        icon: data.icon ?? null,
        description: data.description ?? null,
      })
      .returning()

    return page
  }

  throw createError({ statusCode: 404 })
})
