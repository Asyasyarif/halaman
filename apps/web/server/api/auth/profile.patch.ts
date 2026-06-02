import { eq } from '@halaman/database'
import { db } from '@halaman/database'
import { users } from '@halaman/database/schema'
import { z } from 'zod'

const patchSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  avatarUrl: z.string().url().nullable().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const body = await readBody(event)
  const data = patchSchema.parse(body)

  const updates: Record<string, string | null> = {
    updatedAt: new Date().toISOString(),
  }
  if (data.name !== undefined) updates.name = data.name
  if (data.avatarUrl !== undefined) updates.avatarUrl = data.avatarUrl

  const [updated] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, user.id))
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      avatarUrl: users.avatarUrl,
    })

  return updated
})
