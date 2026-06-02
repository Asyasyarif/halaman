import { sessions, users } from '@halaman/database/schema'
import { db, eq } from '@halaman/database'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const { compare, hash } = bcrypt

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(255),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const path = event.path.replace('/api/auth', '')

  if (event.method === 'GET' && path === '/session') {
    const sessionId = getCookie(event, 'halaman_session')
    if (!sessionId) return { user: null }

    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .limit(1)

    if (!session || new Date(session.expiresAt) < new Date()) {
      return { user: null }
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1)

    return { user: user ? { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl } : null }
  }

  if (event.method === 'POST' && path === '/login') {
    const body = await readBody(event)
    const { email, password } = loginSchema.parse(body)

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    const valid = await compare(password, user.passwordHash)
    if (!valid) {
      throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    const sessionId = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: expiresAt.toISOString(),
    })

    setCookie(event, 'halaman_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    })

    return { success: true }
  }

  if (event.method === 'POST' && path === '/register') {
    const body = await readBody(event)
    const { email, name, password } = registerSchema.parse(body)

    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing) {
      throw createError({ statusCode: 409, message: 'Email already registered' })
    }

    const passwordHash = await hash(password, 12)

    const [user] = await db
      .insert(users)
      .values({ email, name, passwordHash })
      .returning()

    const sessionId = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: expiresAt.toISOString(),
    })

    setCookie(event, 'halaman_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    })

    return { success: true }
  }

  if (event.method === 'POST' && path === '/logout') {
    const sessionId = getCookie(event, 'halaman_session')
    if (sessionId) {
      await db.delete(sessions).where(eq(sessions.id, sessionId))
      deleteCookie(event, 'halaman_session')
    }
    return { success: true }
  }

  throw createError({ statusCode: 404, message: 'Not found' })
})
