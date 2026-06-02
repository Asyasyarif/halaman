<template>
  <div class="docs-content">
    <div class="docs-content__breadcrumb">
      <NuxtLink to="/docs">Docs</NuxtLink>
      <span v-if="page"> / {{ page.title }}</span>
    </div>
    <h1 class="docs-content__title">{{ page?.title || 'Untitled' }}</h1>
    <p v-if="page?.description" class="docs-content__description">{{ page.description }}</p>
    <div class="docs-content__body">
      <slot />
    </div>
    <DocsFooterNav :prev="prevPage" :next="nextPage" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page?: { title: string; description?: string }
  prevPage?: { title: string; to: string }
  nextPage?: { title: string; to: string }
}>()
</script>

<style scoped>
.docs-content {
  max-width: 750px;
  padding: var(--space-8) 0;
}

.docs-content__breadcrumb {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.docs-content__title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: var(--space-4);
}

.docs-content__description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  line-height: 1.6;
}

.docs-content__body {
  line-height: 1.8;
  font-size: var(--font-size-base);
}
</style>
