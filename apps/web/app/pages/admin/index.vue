<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Dashboard</h1>
        <p class="dashboard-subtitle">Welcome back, {{ user?.name }}.</p>
      </div>
      <n-button type="primary" @click="navigateTo('/admin/projects')">
        {{ stats?.projects ? 'Open projects' : 'Create your first project' }}
      </n-button>
    </div>

    <div class="dashboard-stats">
      <n-card v-for="stat in statCards" :key="stat.label" size="small" class="stat-card">
        <n-statistic :label="stat.label" :value="stat.value" />
      </n-card>
    </div>

    <section class="dashboard-section">
      <div class="section-header">
        <h2 class="section-title">Recent pages</h2>
        <NuxtLink v-if="stats?.recentPages?.length" to="/admin/projects" class="section-link">
          View all
        </NuxtLink>
      </div>

      <div v-if="loading" class="empty-state">Loading…</div>

      <div v-else-if="!stats?.recentPages?.length" class="empty-state">
        <p>No pages yet.</p>
        <p class="empty-hint">Create a project, then add your first page to see it here.</p>
      </div>

      <ul v-else class="recent-list">
        <li v-for="page in stats.recentPages" :key="page.id" class="recent-item">
          <NuxtLink :to="`/admin/projects/${page.projectId}/editor/${page.id}`" class="recent-link">
            <span class="recent-icon">{{ statusIcon(page.status) }}</span>
            <span class="recent-body">
              <span class="recent-title">{{ page.title }}</span>
              <span class="recent-meta">
                <span class="recent-project">{{ projectName(page.projectId) }}</span>
                <span class="recent-dot">·</span>
                <span class="recent-time">{{ formatRelative(page.updatedAt) }}</span>
              </span>
            </span>
            <span class="recent-status" :class="`recent-status--${page.status}`">{{ page.status }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth'] })

const { user } = useAuth()
const projects = ref<Array<{ id: string, name: string }>>([])
const stats = ref<{
  projects: number
  pages: number
  published: number
  drafts: number
  recentPages: Array<{
    id: string
    title: string
    slug: string
    status: string
    updatedAt: string
    projectId: string
    projectSlug: string
  }>
} | null>(null)
const loading = ref(true)

const statCards = computed(() => [
  { label: 'Projects', value: stats.value?.projects ?? 0 },
  { label: 'Pages', value: stats.value?.pages ?? 0 },
  { label: 'Published', value: stats.value?.published ?? 0 },
  { label: 'Drafts', value: stats.value?.drafts ?? 0 },
])

function projectName(id: string) {
  return projects.value.find((p) => p.id === id)?.name ?? 'Project'
}

function statusIcon(status: string) {
  if (status === 'published') return '✓'
  if (status === 'draft') return '✎'
  if (status === 'archived') return '◌'
  return '·'
}

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60_000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 30) return `${day}d ago`
  return new Date(iso).toLocaleDateString()
}

onMounted(async () => {
  try {
    const [statsRes, projectsRes] = await Promise.all([
      $fetch<typeof stats.value>('/api/dashboard/stats'),
      $fetch<typeof projects.value>('/api/projects'),
    ])
    stats.value = statsRes
    projects.value = projectsRes
  } catch {
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.admin-dashboard {
  max-width: 960px;
}

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.dashboard-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.dashboard-subtitle {
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-10);
}

.stat-card :deep(.n-statistic) {
  padding: var(--space-2) 0;
}

.dashboard-section {
  margin-top: var(--space-6);
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.section-link {
  color: var(--color-primary-600);
  font-size: var(--font-size-sm);
  text-decoration: none;
}

.section-link:hover {
  text-decoration: underline;
}

.empty-state {
  padding: var(--space-10);
  text-align: center;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: var(--space-2);
}

.recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.recent-item + .recent-item {
  border-top: 1px solid var(--border-color);
}

.recent-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  color: var(--text-primary);
  transition: background 0.15s;
}

.recent-link:hover {
  background: var(--bg-secondary);
}

.recent-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  flex-shrink: 0;
}

.recent-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.recent-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-meta {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.recent-dot {
  opacity: 0.5;
}

.recent-status {
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.recent-status--published {
  background: var(--color-success-50, #ecfdf5);
  color: var(--color-success-700, #047857);
}

.recent-status--draft {
  background: var(--color-warning-50, #fffbeb);
  color: var(--color-warning-700, #b45309);
}

.recent-status--archived {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
</style>
