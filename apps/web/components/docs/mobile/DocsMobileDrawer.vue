<template>
  <div class="docs-mobile-drawer">
    <div v-if="visible" class="docs-mobile-drawer__backdrop" @click="$emit('close')" />
    <div class="docs-mobile-drawer__content" :class="{ 'docs-mobile-drawer__content--visible': visible }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.docs-mobile-drawer {
  display: none;
}

@media (max-width: 768px) {
  .docs-mobile-drawer {
    display: block;
  }

  .docs-mobile-drawer__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 90;
  }

  .docs-mobile-drawer__content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: var(--bg-primary);
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.2s;
    overflow-y: auto;
  }

  .docs-mobile-drawer__content--visible {
    transform: translateX(0);
  }
}
</style>
