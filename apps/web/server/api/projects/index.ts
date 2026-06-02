import { eq } from '@halaman/database'
import { db } from '@halaman/database'
import { projects, projectMembers, organizations, organizationMembers } from '@halaman/database/schema'
import { z } from 'zod'

const createSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
})

async function getOrCreatePersonalOrg(userId: string, userName: string) {
  const [member] = await db
    .select()
    .from(organizationMembers)
    .where(eq(organizationMembers.userId, userId))
    .limit(1)

  if (member) {
    const [org] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, member.organizationId))
      .limit(1)
    return org
  }

  const [org] = await db
    .insert(organizations)
    .values({
      name: `${userName}'s workspace`,
      slug: `user-${userId.slice(0, 8)}`,
    })
    .returning()

  await db.insert(organizationMembers).values({
    organizationId: org.id,
    userId,
    role: 'owner',
  })

  return org
}

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  if (event.method === 'GET') {
    const rows = await db
      .select()
      .from(projectMembers)
      .innerJoin(projects, eq(projects.id, projectMembers.projectId))
      .where(eq(projectMembers.userId, user.id))
      .limit(100)

    return rows.map((r) => r.projects)
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const data = createSchema.parse(body)

    const org = await getOrCreatePersonalOrg(user.id, user.name)

    const [project] = await db
      .insert(projects)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        organizationId: org.id,
      })
      .returning()

    await db.insert(projectMembers).values({
      projectId: project.id,
      userId: user.id,
      role: 'owner',
    })

    return project
  }

  throw createError({ statusCode: 404 })
})
