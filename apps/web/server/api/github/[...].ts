import { eq } from '@halaman/database'
import { db } from '@halaman/database'
import { projects, githubInstallations, syncJobs } from '@halaman/database/schema'
import { verifyWebhookSignature, parseWebhookEvent } from '@halaman/github'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST' && event.path.includes('/webhook')) {
    return handleWebhook(event)
  }

  if (event.method === 'POST' && event.path.includes('/install')) {
    return handleInstall(event)
  }

  return handleSync(event)
})

async function handleWebhook(event: any) {
  const signature = getHeader(event, 'x-hub-signature-256') || ''
  const body = await readRawBody(event)
  if (!body) throw createError({ statusCode: 400, message: 'Empty body' })

  const config = useRuntimeConfig(event)
  const secret = config.githubAppWebhookSecret

  if (secret && !verifyWebhookSignature(body, signature, secret)) {
    throw createError({ statusCode: 401, message: 'Invalid signature' })
  }

  const { event: eventType } = parseWebhookEvent(event.headers)

  if (eventType === 'push') {
    const payload = JSON.parse(body)
    const [installation] = await db
      .select()
      .from(githubInstallations)
      .where(eq(githubInstallations.repoName, payload.repository?.name || ''))
      .limit(1)

    if (installation) {
      await db.insert(syncJobs).values({
        projectId: installation.projectId,
        source: 'webhook',
        commitSha: payload.after,
        status: 'pending',
      })
    }
  }

  return { status: 'received' }
}

async function handleInstall(event: any) {
  const { user } = await requireAuth(event)
  const body = await readBody(event)
  const { projectId, installationId, repoOwner, repoName } = body

  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)

  if (!project) throw createError({ statusCode: 404, message: 'Project not found' })

  const [existing] = await db
    .select()
    .from(githubInstallations)
    .where(eq(githubInstallations.projectId, projectId))
    .limit(1)

  if (existing) {
    await db
      .update(githubInstallations)
      .set({ installationId, repoOwner, repoName, updatedAt: new Date() })
      .where(eq(githubInstallations.projectId, projectId))
  } else {
    await db.insert(githubInstallations).values({
      projectId,
      installationId,
      repoOwner,
      repoName,
      installedBy: user.id,
    })
  }

  return { success: true }
}

async function handleSync(event: any) {
  const { user } = await requireAuth(event)
  const projectId = getRouterParam(event, 'projectId')!

  if (event.method === 'GET') {
    const installations = await db
      .select()
      .from(githubInstallations)
      .where(eq(githubInstallations.projectId, projectId))
    return installations
  }

  if (event.method === 'POST') {
    const [installation] = await db
      .select()
      .from(githubInstallations)
      .where(eq(githubInstallations.projectId, projectId))
      .limit(1)

    if (!installation) throw createError({ statusCode: 404, message: 'No GitHub installation' })

    const [job] = await db
      .insert(syncJobs)
      .values({ projectId, source: 'manual', status: 'pending' })
      .returning()

    return job
  }

  throw createError({ statusCode: 404 })
}
