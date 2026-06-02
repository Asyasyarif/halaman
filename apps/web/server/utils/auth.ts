import { sessions, users } from '@halaman/database/schema'
import { db, eq } from '@halaman/database'

export async function requireAuth(event: any) {
  const sessionId = getCookie(event, 'halaman_session')
  if (!sessionId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1)

  if (!session || new Date(session.expiresAt) < new Date()) {
    throw createError({ statusCode: 401, message: 'Session expired' })
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1)

  if (!user) {
    throw createError({ statusCode: 401, message: 'User not found' })
  }

  return { user }
}
