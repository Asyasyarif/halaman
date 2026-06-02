<template>
  <aside class="docs-toc">
    <h4 class="docs-toc__title">On this page</h4>
    <nav class="docs-toc__nav">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        class="docs-toc__link"
        :class="{ 'docs-toc__link--active': heading.active }"
        :style="{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }"
      >
        {{ heading.text }}
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface TocHeading {
  id: string
  text: string
  level: number
  active?: boolean
}

defineProps<{
  headings?: TocHeading[]
}>()
</script>

<style scoped>
.docs-toc {
  width: var(--docs-toc-width);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
  padding: var(--space-4);
  position: sticky;
  top: var(--topbar-height);
  border-left: 1px solid var(--border-color);
}

@media (max-width: 1024px) {
  .docs-toc {
    display: none;
  }
}

.docs-toc__title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-3);
}

.docs-toc__link {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-1) 0;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.docs-toc__link:hover {
  color: var(--text-primary);
}

.docs-toc__link--active {
  color: var(--color-primary-600);
  border-left-color: var(--color-primary-500);
}
</style>
