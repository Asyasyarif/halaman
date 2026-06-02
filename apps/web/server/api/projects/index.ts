import { eq } from '@halaman/database'
import { db } from '@halaman/database'
import { projects, projectMembers } from '@halaman/database/schema'
import { z } from 'zod'

const createSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  if (event.method === 'GET') {
    // Get user's organization first (or default)
    const orgs = await db
      .select()
      .from(projectMembers)
      .innerJoin(projects, eq(projects.id, projectMembers.projectId))
      .where(eq(projectMembers.userId, user.id))
      .limit(100)

    return orgs.map((o) => o.projects)
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const data = createSchema.parse(body)

    // For now, create without organization (self-hosted mode)
    const [project] = await db
      .insert(projects)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        organizationId: '00000000-0000-0000-0000-000000000000', // placeholder
      })
      .returning()

    return project
  }

  throw createError({ statusCode: 404 })
})
