import { z } from 'zod'
import { eq, and } from '@halaman/database'
import { db } from '@halaman/database'
import { pages, searchDocuments } from '@halaman/database/schema'
import { extractText, extractHeadings } from '@halaman/search'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'projectId')!
  const query = getQuery(event)

  if (event.method === 'GET') {
    const q = (query.q as string || '').toLowerCase().trim()
    if (!q || q.length < 2) return { results: [] }

    const allPages = await db
      .select()
      .from(pages)
      .where(
        and(
          eq(pages.projectId, projectId),
          eq(pages.status, 'published'),
        ),
      )
      .limit(100)

    const results = allPages
      .filter((p) => {
        const text = extractText(p.contentJson)
        return (
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          text.toLowerCase().includes(q)
        )
      })
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: `/docs/${p.slug}`,
        snippet: extractText(p.contentJson).slice(0, 200),
      }))
      .slice(0, 20)

    return { results }
  }

  if (event.method === 'POST') {
    const { user } = await requireAuth(event)
    const body = await readBody(event)

    // Reindex all pages
    if (body.reindex) {
      const allPages = await db
        .select()
        .from(pages)
        .where(eq(pages.projectId, projectId))

      for (const page of allPages) {
        const text = extractText(page.contentJson)
        const headings = extractHeadings(page.contentJson)

        const [existing] = await db
          .select()
          .from(searchDocuments)
          .where(
            and(
              eq(searchDocuments.projectId, projectId),
              eq(searchDocuments.pageId, page.id),
            ),
          )
          .limit(1)

        if (existing) {
          await db
            .update(searchDocuments)
            .set({ contentText: text, headingsJson: headings, updatedAt: new Date() })
            .where(eq(searchDocuments.id, existing.id))
        } else {
          await db.insert(searchDocuments).values({
            projectId,
            pageId: page.id,
            title: page.title,
            slug: page.slug,
            contentText: text,
            headingsJson: headings,
            version: page.version,
            locale: page.locale,
          })
        }
      }

      return { reindexed: allPages.length }
    }

    throw createError({ statusCode: 400, message: 'Invalid request' })
  }

  throw createError({ statusCode: 404 })
})
