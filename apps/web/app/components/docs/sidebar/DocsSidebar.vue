<template>
  <aside class="docs-sidebar">
    <nav class="docs-sidebar__nav">
      <div v-for="section in sections" :key="section.title" class="sidebar-section">
        <button
          v-if="section.children"
          class="sidebar-section__header"
          @click="toggleSection(section.title)"
        >
          <span class="sidebar-section__icon">{{ expandedSections[section.title] ? '▾' : '▸' }}</span>
          <span>{{ section.title }}</span>
        </button>
        <NuxtLink
          v-else
          :to="section.to"
          class="sidebar-link"
          :class="{ 'sidebar-link--active': section.active }"
        >
          {{ section.title }}
        </NuxtLink>

        <div v-if="section.children && expandedSections[section.title]" class="sidebar-section__children">
          <NuxtLink
            v-for="child in section.children"
            :key="child.to"
            :to="child.to"
            class="sidebar-link sidebar-link--child"
            :class="{ 'sidebar-link--active': child.active }"
          >
            {{ child.title }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface SidebarItem {
  title: string
  to?: string
  active?: boolean
  children?: SidebarItem[]
}

defineProps<{
  sections?: SidebarItem[]
}>()

const expandedSections = ref<Record<string, boolean>>({})

function toggleSection(title: string) {
  expandedSections.value[title] = !expandedSections.value[title]
}
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
