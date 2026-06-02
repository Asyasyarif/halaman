<template>
  <div class="editor-page">
    <div class="editor-page__shell">
      <aside class="editor-page__sidebar">
        <div class="editor-page__sidebar-header">
          <h3>Pages</h3>
        </div>
        <PageTree :pages="pages" :selected-id="pageId" @select="selectPage" />
      </aside>

      <main class="editor-page__main">
        <div class="editor-topbar">
          <div class="editor-topbar__left">
            <span v-if="page" class="editor-topbar__title">{{ page.title }}</span>
          </div>
          <div class="editor-topbar__right">
            <n-button>Preview</n-button>
            <n-dropdown :options="publishOptions" @select="handlePublish">
              <n-button type="primary">Publish</n-button>
            </n-dropdown>
          </div>
        </div>

        <div class="editor-page__editor">
          <div v-if="page" class="editor-content">
            <input
              v-model="pageTitle"
              class="page-title-input"
              placeholder="Page Title"
              @input="onTitleChange"
            />
            <div class="tiptap-editor">
              <div class="tiptap-toolbar">
                <button
                  v-for="btn in toolbarButtons"
                  :key="btn.label"
                  class="toolbar-btn"
                  :title="btn.label"
                  @click="btn.action"
                >
                  <component :is="btn.icon" :size="18" weight="regular" />
                </button>
              </div>
              <div class="tiptap-content">
                <textarea
                  v-model="pageContent"
                  class="page-content-textarea"
                  placeholder="Start writing..."
                  @input="onContentChange"
                />
              </div>
            </div>
          </div>
          <div v-else class="editor-placeholder">
            Select a page to start editing.
          </div>
        </div>
      </main>

      <aside class="editor-page__panel">
        <div class="panel-section">
          <h4>Settings</h4>
          <n-form-item label="Status">
            <n-select
              v-model:value="pageStatus"
              :options="statusOptions"
              @update:value="onStatusChange"
            />
          </n-form-item>
          <n-form-item label="Slug">
            <n-input v-model:value="pageSlug" @input="onSlugChange" />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="pageIcon" @input="onIconChange" />
          </n-form-item>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhTextB, PhTextItalic, PhTextHOne, PhLink, PhImage, PhCode } from '@phosphor-icons/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const route = useRoute()
const projectId = route.params.projectId as string
const pageId = route.params.pageId as string

const pages = ref<any[]>([])
const page = ref<any>(null)
const pageTitle = ref('')
const pageContent = ref('')
const pageStatus = ref('draft')
const pageSlug = ref('')
const pageIcon = ref('')

let saveTimer: ReturnType<typeof setTimeout> | null = null

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const publishOptions = [
  { key: 'publish', label: 'Publish Now' },
  { key: 'draft', label: 'Save as Draft' },
]

const toolbarButtons = [
  { label: 'Bold', icon: PhTextB, action: () => {} },
  { label: 'Italic', icon: PhTextItalic, action: () => {} },
  { label: 'Heading', icon: PhTextHOne, action: () => {} },
  { label: 'Link', icon: PhLink, action: () => {} },
  { label: 'Image', icon: PhImage, action: () => {} },
  { label: 'Code', icon: PhCode, action: () => {} },
]

function autosave() {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    try {
      await $fetch(`/api/pages/${pageId}/draft`, {
        method: 'PATCH',
        body: {
          title: pageTitle.value,
          contentJson: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: pageContent.value }] }] },
        },
      })
    } catch {}
  }, 1000)
}

function onTitleChange() { autosave() }
function onContentChange() { autosave() }

async function onStatusChange() {
  await $fetch(`/api/pages/${pageId}`, {
    method: 'PATCH',
    body: { status: pageStatus.value },
  })
}

function onSlugChange() { autosave() }
function onIconChange() { autosave() }

function selectPage(pid: string) {
  navigateTo(`/admin/projects/${projectId}/editor/${pid}`)
}

function handlePublish(key: string) {
  onStatusChange()
}

async function loadPage() {
  try {
    page.value = await $fetch(`/api/pages/${pageId}`)
    pageTitle.value = page.value.title
    pageSlug.value = page.value.slug
    pageIcon.value = page.value.icon || ''
    pageStatus.value = page.value.status
    if (page.value.contentJson?.content?.[0]?.content?.[0]?.text) {
      pageContent.value = page.value.contentJson.content[0].content[0].text
    }
  } catch {}
}

async function loadPages() {
  try {
    pages.value = await $fetch(`/api/projects/${projectId}/pages`)
  } catch {}
}

onMounted(() => {
  loadPages()
  if (pageId) loadPage()
})

watch(() => route.params.pageId, (newId) => {
  if (newId) loadPage()
})
</script>

<style scoped>
.editor-page__shell {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.editor-page__sidebar {
  width: 240px;
  min-width: 240px;
  border-right: 1px solid var(--border-color);
  background: var(--bg-primary);
  overflow-y: auto;
}

.editor-page__sidebar-header {
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.editor-page__sidebar-header h3 {
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.editor-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.editor-topbar__title {
  font-size: var(--font-size-base);
  font-weight: 600;
}

.editor-page__editor {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}

.page-title-input {
  width: 100%;
  font-size: var(--font-size-3xl);
  font-weight: 700;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  padding: var(--space-2) 0;
}

.page-title-input:focus {
  outline: none;
}

.tiptap-editor {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
}

.tiptap-toolbar {
  display: flex;
  gap: 2px;
  padding: var(--space-2);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.toolbar-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tiptap-content {
  padding: var(--space-4);
}

.page-content-textarea {
  width: 100%;
  min-height: 400px;
  border: none;
  outline: none;
  resize: vertical;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: 1.8;
  color: var(--text-primary);
  background: transparent;
}

.editor-page__panel {
  width: 260px;
  min-width: 260px;
  border-left: 1px solid var(--border-color);
  background: var(--bg-primary);
  overflow-y: auto;
  padding: var(--space-4);
}

.panel-section h4 {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.editor-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-tertiary);
  font-size: var(--font-size-lg);
}
</style>
