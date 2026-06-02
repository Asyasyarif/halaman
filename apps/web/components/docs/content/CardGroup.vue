<template>
  <div class="card-group">
    <slot />
  </div>
</template>

<style scoped>
.card-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
  margin: var(--space-4) 0;
}
</style>
