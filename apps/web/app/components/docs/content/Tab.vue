<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<style scoped>
.tab {
  display: none;
}
</style>
