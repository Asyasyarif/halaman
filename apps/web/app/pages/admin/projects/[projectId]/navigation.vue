<template>
  <div class="page-placeholder">
    <h2>{{ title }}</h2>
    <p>This section is under development.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()

definePageMeta({ layout: 'admin', middleware: ['auth'] })
</script>

<style scoped>
.page-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--text-secondary);
}

.page-placeholder h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
}
</style>
