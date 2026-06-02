<template>
  <nav class="docs-footer-nav">
    <div class="docs-footer-nav__item">
      <NuxtLink v-if="prev" :to="prev.to" class="docs-footer-nav__link docs-footer-nav__link--prev">
        <span class="docs-footer-nav__label">← Previous</span>
        <span class="docs-footer-nav__title">{{ prev.title }}</span>
      </NuxtLink>
    </div>
    <div class="docs-footer-nav__item docs-footer-nav__item--next">
      <NuxtLink v-if="next" :to="next.to" class="docs-footer-nav__link docs-footer-nav__link--next">
        <span class="docs-footer-nav__label">Next →</span>
        <span class="docs-footer-nav__title">{{ next.title }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavLink {
  title: string
  to: string
}

defineProps<{
  prev?: NavLink
  next?: NavLink
}>()
</script>

<style scoped>
.docs-footer-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-10);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-color);
}

.docs-footer-nav__item--next {
  margin-left: auto;
}

.docs-footer-nav__link {
  display: flex;
  flex-direction: column;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: border-color 0.15s;
}

.docs-footer-nav__link:hover {
  border-color: var(--color-primary-400);
  text-decoration: none;
}

.docs-footer-nav__label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.docs-footer-nav__title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.docs-footer-nav__link--next {
  text-align: right;
}
</style>
