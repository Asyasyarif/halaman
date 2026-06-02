<template>
  <div class="page-tree">
    <div
      v-for="page in treeItems"
      :key="page.id"
      class="page-tree__item"
    >
      <div
        class="page-tree__row"
        :class="{ 'page-tree__row--active': selectedId === page.id }"
        @click="emit('select', page.id)"
      >
        <span class="page-tree__icon">{{ page.icon || '📄' }}</span>
        <span class="page-tree__title">{{ page.title }}</span>
        <span class="page-tree__badge" :class="`page-tree__badge--${page.status}`">
          {{ page.status }}
        </span>
        <div class="page-tree__actions">
          <n-dropdown :options="contextMenu" @select="(key: string) => handleContext(key, page.id)">
            <n-button text size="small">⋮</n-button>
          </n-dropdown>
        </div>
      </div>
    </div>
    <div v-if="treeItems.length === 0" class="page-tree__empty">
      No pages yet. Create your first page.
    </div>
  </div>
</template>

<script setup lang="ts">
interface PageItem {
  id: string
  title: string
  slug: string
  icon?: string
  status: 'draft' | 'published' | 'archived'
  parentId?: string | null
}

const props = defineProps<{
  pages: PageItem[]
  selectedId?: string
}>()

const emit = defineEmits<{
  select: [pageId: string]
  delete: [pageId: string]
}>()

const contextMenu = [
  { key: 'rename', label: 'Rename' },
  { key: 'edit', label: 'Edit' },
  { key: 'divider', type: 'divider' as const },
  { key: 'delete', label: 'Delete' },
]

const treeItems = computed(() => {
  return props.pages.sort((a, b) => {
    if (a.parentId === b.parentId) return 0
    return 0
  })
})

function handleContext(key: string, pageId: string) {
  if (key === 'delete') {
    emit('delete', pageId)
  }
  if (key === 'edit') {
    emit('select', pageId)
  }
}
</script>

<style scoped>
.page-tree__item {
  border-bottom: 1px solid var(--border-color);
}

.page-tree__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background 0.15s;
}

.page-tree__row:hover {
  background: var(--bg-secondary);
}

.page-tree__row--active {
  background: var(--color-primary-50);
}

.page-tree__icon {
  flex-shrink: 0;
  font-size: 18px;
}

.page-tree__title {
  flex: 1;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.page-tree__badge {
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.page-tree__badge--draft {
  background: #fef3c7;
  color: #92400e;
}

.page-tree__badge--published {
  background: #d1fae5;
  color: #065f46;
}

.page-tree__badge--archived {
  background: #e5e7eb;
  color: #6b7280;
}

.page-tree__actions {
  opacity: 0;
  transition: opacity 0.15s;
}

.page-tree__row:hover .page-tree__actions {
  opacity: 1;
}

.page-tree__empty {
  padding: var(--space-8);
  text-align: center;
  color: var(--text-secondary);
}
</style>
