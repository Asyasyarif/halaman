<template>
  <div class="step">
    <strong v-if="title" class="step__title">{{ title }}</strong>
    <div class="step__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<style scoped>
.step {
  margin-bottom: var(--space-3);
}

.step__title {
  display: block;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-2);
}

.step__content {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
