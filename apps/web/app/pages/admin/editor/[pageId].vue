<template>
  <div class="editor-page">
    <div class="editor-page__header">
      <n-input
        v-model:value="pageTitle"
        class="editor-title"
        placeholder="Untitled"
        @input="autosave"
      />
      <n-space>
        <n-select
          v-model:value="pageStatus"
          :options="statusOptions"
          size="small"
          style="width: 140px"
          @update:value="onStatusChange"
        />
        <n-button @click="navigateTo('/admin/pages')">Back</n-button>
      </n-space>
    </div>

    <div class="editor-page__body">
      <main class="editor-page__main">
        <div v-if="page" class="tiptap-editor">
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
              @input="autosave"
            />
          </div>
        </div>
        <div v-else class="editor-placeholder">
          Page not found.
        </div>
      </main>

      <aside class="editor-page__panel">
        <div class="panel-section">
          <h4>Settings</h4>
          <n-form-item label="Slug">
            <n-input v-model:value="pageSlug" @input="autosave" />
          </n-form-item>
          <n-form-item label="Description">
            <n-input
              v-model:value="pageDescription"
              type="textarea"
              :rows="2"
              @input="autosave"
            />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="pageIcon" @input="autosave" />
          </n-form-item>
        </div>

        <div class="panel-section">
          <h4>SEO</h4>
          <n-form-item label="SEO title">
            <n-input v-model:value="seoTitle" @input="autosave" />
          </n-form-item>
          <n-form-item label="SEO description">
            <n-input
              v-model:value="seoDescription"
              type="textarea"
              :rows="2"
              @input="autosave"
            />
          </n-form-item>
        </div>

        <div class="panel-section">
          <h4>Live preview</h4>
          <p class="panel-hint">This page is published at:</p>
          <a :href="`/docs/${pageSlug}`" target="_blank" class="panel-link">
            /docs/{{ pageSlug }}
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhTextB, PhTextItalic, PhTextHOne, PhLink, PhImage, PhCode } from '@phosphor-icons/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const route = useRoute()
const pageId = route.params.pageId as string

const page = ref<any>(null)
const pageTitle = ref('')
const pageContent = ref('')
const pageStatus = ref('draft')
const pageSlug = ref('')
const pageIcon = ref('')
const pageDescription = ref('')
const seoTitle = ref('')
const seoDescription = ref('')

let saveTimer: ReturnType<typeof setTimeout> | null = null

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const toolbarButtons = [
  { label: 'Bold', icon: PhTextB, action: () => {} },
  { label: 'Italic', icon: PhTextItalic, action: () => {} },
  { label: 'Heading', icon: PhTextHOne, action: () => {} },
  { label: 'Link', icon: PhLink, action: () => {} },
  { label: 'Image', icon: PhImage, action: () => {} },
  { label: 'Code', icon: PhCode, action: () => {} },
]

async function load() {
  try {
    const p = await $fetch(`/api/pages/${pageId}`)
    page.value = p
    pageTitle.value = p.title
    pageContent.value = p.contentJson ? JSON.stringify(p.contentJson) : ''
    pageStatus.value = p.status
    pageSlug.value = p.slug
    pageIcon.value = p.icon ?? ''
    pageDescription.value = p.description ?? ''
    seoTitle.value = p.seoTitle ?? ''
    seoDescription.value = p.seoDescription ?? ''
  } catch {
    page.value = null
  }
}

function autosave() {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    try {
      await $fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        body: {
          title: pageTitle.value,
          slug: pageSlug.value,
          description: pageDescription.value,
          icon: pageIcon.value,
          seoTitle: seoTitle.value,
          seoDescription: seoDescription.value,
        },
      })
    } catch {}
  }, 1000)
}

async function onStatusChange() {
  await $fetch(`/api/pages/${pageId}`, {
    method: 'PATCH',
    body: { status: pageStatus.value },
  })
}

onMounted(load)
</script>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.editor-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.editor-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  flex: 1;
}

.editor-page__body {
  display: flex;
  flex: 1;
  gap: var(--space-6);
  min-height: 0;
}

.editor-page__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.tiptap-editor {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--bg-primary);
  min-height: 0;
}

.tiptap-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  border-bottom: 1px solid var(--border-color);
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toolbar-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tiptap-content {
  flex: 1;
  padding: var(--space-4);
  min-height: 0;
  display: flex;
}

.page-content-textarea {
  flex: 1;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  background: transparent;
  color: var(--text-primary);
}

.editor-page__panel {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.panel-section {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  background: var(--bg-primary);
}

.panel-section h4 {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-3);
}

.panel-hint {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}

.panel-link {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--color-primary-600);
  text-decoration: none;
  word-break: break-all;
}

.panel-link:hover {
  text-decoration: underline;
}

.editor-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
