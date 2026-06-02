<template>
  <div class="admin-pages">
    <div class="pages-header">
      <div>
        <h1>Pages</h1>
        <p class="pages-subtitle">All pages in your docs workspace.</p>
      </div>
      <n-button type="primary" @click="showCreate = true">
        <template #icon>
          <PhPlus :size="16" weight="bold" />
        </template>
        New page
      </n-button>
    </div>

    <div v-if="loading" class="empty-state">Loading…</div>

    <div v-else-if="pages.length === 0" class="empty-state">
      <p>No pages yet.</p>
      <p class="empty-hint">
        Create your first page — it will appear at <code>/docs/&lt;slug&gt;</code> on the
        public docs site as soon as you publish it.
      </p>
      <n-button type="primary" @click="showCreate = true">
        <template #icon>
          <PhPlus :size="16" weight="bold" />
        </template>
        Create your first page
      </n-button>
    </div>

    <ul v-else class="page-list">
      <li v-for="page in pages" :key="page.id" class="page-item">
        <NuxtLink :to="`/admin/editor/${page.id}`" class="page-link">
          <span class="page-icon">
            <PhFile :size="18" weight="regular" />
          </span>
          <span class="page-body">
            <span class="page-title">{{ page.title }}</span>
            <span class="page-slug">/{{ page.slug }}</span>
          </span>
          <span class="page-status" :class="`page-status--${page.status}`">{{ page.status }}</span>
          <span class="page-time">{{ formatRelative(page.updatedAt) }}</span>
        </NuxtLink>
        <button class="page-delete" title="Delete" @click.stop="confirmDelete(page)">
          <PhTrash :size="16" weight="regular" />
        </button>
      </li>
    </ul>

    <n-modal v-model:show="showCreate" title="Create page">
      <n-card style="width: 480px">
        <n-form :model="newPage" :rules="pageRules">
          <n-form-item label="Title" path="title">
            <n-input v-model:value="newPage.title" placeholder="My new page" @keydown.enter="handleCreate" />
          </n-form-item>
          <n-form-item label="Slug" path="slug">
            <n-input v-model:value="newPage.slug" placeholder="my-new-page" @keydown.enter="handleCreate" />
          </n-form-item>
          <n-button type="primary" block :loading="creating" @click="handleCreate">
            Create
          </n-button>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { PhPlus, PhFile, PhTrash } from '@phosphor-icons/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const showCreate = ref(false)
const creating = ref(false)
const loading = ref(true)
const pages = ref<Array<{
  id: string
  title: string
  slug: string
  status: string
  updatedAt: string
}>>([])

const newPage = reactive({ title: '', slug: '' })

const pageRules = {
  title: [{ required: true, message: 'Title is required' }],
  slug: [{ required: true, message: 'Slug is required' }],
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

watch(() => newPage.title, (t) => {
  if (!newPage.slug || newPage.slug === slugify(newPage.title).replace(/-/g, '')) {
    newPage.slug = slugify(t)
  }
})

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

async function load() {
  loading.value = true
  try {
    pages.value = await $fetch('/api/pages')
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  if (!newPage.title || !newPage.slug) return
  creating.value = true
  try {
    const page = await $fetch('/api/pages', {
      method: 'POST',
      body: { title: newPage.title, slug: newPage.slug },
    })
    showCreate.value = false
    newPage.title = ''
    newPage.slug = ''
    await navigateTo(`/admin/editor/${page.id}`)
  } catch (e: any) {
    // surface validation error
  } finally {
    creating.value = false
  }
}

async function confirmDelete(page: { id: string, title: string }) {
  if (!confirm(`Delete "${page.title}"?`)) return
  await $fetch(`/api/pages/${page.id}`, { method: 'DELETE' })
  await load()
}

onMounted(load)
</script>

<style scoped>
.pages-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.pages-header h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.pages-subtitle {
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.empty-state {
  padding: var(--space-12);
  text-align: center;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.empty-state code {
  font-family: var(--font-mono);
  background: var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  max-width: 480px;
}

.page-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.page-item {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--border-color);
}

.page-item:last-child {
  border-bottom: none;
}

.page-link {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  color: var(--text-primary);
  transition: background 0.15s;
}

.page-link:hover {
  background: var(--bg-secondary);
}

.page-icon {
  color: var(--text-tertiary);
  display: inline-flex;
}

.page-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.page-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-slug {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.page-status {
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.page-status--published {
  background: #ecfdf5;
  color: #047857;
}

.page-status--draft {
  background: #fffbeb;
  color: #b45309;
}

.page-status--archived {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.page-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

.page-delete {
  background: none;
  border: none;
  padding: 0 var(--space-4);
  color: var(--text-tertiary);
  cursor: pointer;
  border-left: 1px solid var(--border-color);
  transition: color 0.15s, background 0.15s;
}

.page-delete:hover {
  color: #dc2626;
  background: #fef2f2;
}
</style>
