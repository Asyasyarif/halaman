<template>
  <button class="search-button" @click="emit('open')">
    <span class="search-button__icon">🔍</span>
    <span class="search-button__text">Search documentation</span>
    <kbd class="search-button__shortcut">⌘K</kbd>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  open: []
}>()
</script>

<style scoped>
.search-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  white-space: nowrap;
}

.search-button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.search-button__icon {
  font-size: 14px;
}

.search-button__shortcut {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}
</style>
