import { eq, inArray, desc, and } from '@halaman/database'
import { db } from '@halaman/database'
import { projects, projectMembers, pages } from '@halaman/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  const userProjects = await db
    .select({ id: projects.id })
    .from(projectMembers)
    .innerJoin(projects, eq(projects.id, projectMembers.projectId))
    .where(eq(projectMembers.userId, user.id))

  const projectIds = userProjects.map((p) => p.id)
  const projectCount = projectIds.length

  if (projectCount === 0) {
    return {
      projects: 0,
      pages: 0,
      published: 0,
      drafts: 0,
      recentPages: [],
    }
  }

  const allPages = await db
    .select({
      id: pages.id,
      title: pages.title,
      slug: pages.slug,
      status: pages.status,
      updatedAt: pages.updatedAt,
      projectId: pages.projectId,
    })
    .from(pages)
    .where(inArray(pages.projectId, projectIds))
    .orderBy(desc(pages.updatedAt))
    .limit(50)

  const projectNameMap = new Map<string, string>()
  const projectRows = await db
    .select({ id: projects.id, name: projects.name, slug: projects.slug })
    .from(projects)
    .where(inArray(projects.id, projectIds))
  for (const p of projectRows) projectNameMap.set(p.id, p.slug)

  return {
    projects: projectCount,
    pages: allPages.length,
    published: allPages.filter((p) => p.status === 'published').length,
    drafts: allPages.filter((p) => p.status === 'draft').length,
    recentPages: allPages.slice(0, 5).map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      updatedAt: p.updatedAt,
      projectId: p.projectId,
      projectSlug: projectNameMap.get(p.projectId) ?? '',
    })),
  }
})
