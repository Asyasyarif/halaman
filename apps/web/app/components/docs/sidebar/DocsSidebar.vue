<template>
  <aside class="docs-sidebar">
    <nav class="docs-sidebar__nav">
      <div v-for="group in groups" :key="group.label" class="sidebar-section">
        <button
          v-if="group.children.length"
          class="sidebar-section__header"
          @click="toggleGroup(group.label)"
        >
          <span class="sidebar-section__icon">{{ expandedGroups[group.label] ? '▾' : '▸' }}</span>
          <span>{{ group.label }}</span>
        </button>

        <div v-if="group.children.length && expandedGroups[group.label]" class="sidebar-section__children">
          <NuxtLink
            v-for="child in group.children"
            :key="child.path"
            :to="child.path"
            class="sidebar-link sidebar-link--child"
            :class="{ 'sidebar-link--active': isActive(child.path) }"
          >
            {{ child.title }}
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="!group.children.length"
          :to="group.path"
          class="sidebar-link"
          :class="{ 'sidebar-link--active': isActive(group.path) }"
        >
          {{ group.label }}
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface SidebarGroup {
  label: string
  path: string
  children: { title: string; path: string }[]
}

const nav = useDocsNav()
const route = useRoute()

const groups = computed<SidebarGroup[]>(() => {
  const pages = nav.value
  const ungrouped: SidebarGroup = { label: 'Documentation', path: '/docs', children: [] }
  const grouped = new Map<string, SidebarGroup>()

  for (const page of pages) {
    if (page.slug === '') {
      ungrouped.path = page.path
      continue
    }
    if (!page.group) {
      ungrouped.children.push({ title: page.title, path: page.path })
      continue
    }
    if (!grouped.has(page.group)) {
      grouped.set(page.group, { label: page.group, path: page.path, children: [] })
    }
    grouped.get(page.group)!.children.push({ title: page.title, path: page.path })
  }

  return [ungrouped, ...grouped.values()]
})

const expandedGroups = ref<Record<string, boolean>>({})

function toggleGroup(label: string) {
  expandedGroups.value[label] = !expandedGroups.value[label]
}

function isActive(path: string): boolean {
  return route.path === path
}

watchEffect(() => {
  const current = nav.value.find(p => p.path === route.path)
  if (current?.group) {
    expandedGroups.value[current.group] = true
  }
})
</script>

<style scoped>
.docs-sidebar {
  width: var(--docs-sidebar-width);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
  border-right: 1px solid var(--border-color);
  padding: var(--space-4);
  position: sticky;
  top: var(--topbar-height);
  background: var(--bg-primary);
}

@media (max-width: 768px) {
  .docs-sidebar {
    display: none;
  }
}

.sidebar-section__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-align: left;
  border-radius: var(--radius-md);
}

.sidebar-section__header:hover {
  background: var(--bg-tertiary);
}

.sidebar-section__icon {
  font-size: 10px;
  width: 12px;
}

.sidebar-link {
  display: block;
  padding: var(--space-2) var(--space-2);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background 0.15s;
}

.sidebar-link:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar-link--active {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.sidebar-link--child {
  padding-left: var(--space-8);
}

.sidebar-section__children {
  padding-left: var(--space-4);
}
</style>
