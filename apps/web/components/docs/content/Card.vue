<template>
  <NuxtLink :to="link" class="card">
    <div v-if="icon" class="card__icon">{{ icon }}</div>
    <strong class="card__title">{{ title }}</strong>
    <p v-if="description" class="card__description">{{ description }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  icon?: string
  link: string
}>()
</script>

<style scoped>
.card {
  display: block;
  padding: var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.card:hover {
  border-color: var(--color-primary-400);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-decoration: none;
}

.card__icon {
  font-size: 1.5rem;
  margin-bottom: var(--space-3);
}

.card__title {
  display: block;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-1);
}

.card__description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}
</style>
