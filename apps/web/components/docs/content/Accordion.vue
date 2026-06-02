<template>
  <div class="accordion">
    <button class="accordion__header" @click="isOpen = !isOpen">
      <span class="accordion__icon">{{ isOpen ? '▾' : '▸' }}</span>
      <span>{{ title }}</span>
    </button>
    <div v-if="isOpen" class="accordion__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

const isOpen = ref(false)
</script>

<style scoped>
.accordion {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-3) 0;
}

.accordion__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-secondary);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  text-align: left;
}

.accordion__header:hover {
  background: var(--bg-tertiary);
}

.accordion__body {
  padding: var(--space-4);
  border-top: 1px solid var(--border-color);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
