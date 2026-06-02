<template>
  <div class="preview-page">
    <div class="preview-topbar">
      <span class="preview-badge">Preview</span>
      <span class="preview-info">Draft mode — not visible publicly</span>
      <div class="preview-actions">
        <n-button size="small" @click="closePreview">Close Preview</n-button>
      </div>
    </div>
    <div class="preview-frame">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
function closePreview() {
  navigateTo(`/admin/projects/${useRoute().params.projectId}`)
}
</script>

<style scoped>
.preview-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.preview-topbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: #fef3c7;
  border-bottom: 1px solid #fde68a;
  font-size: var(--font-size-sm);
}

.preview-badge {
  background: #f59e0b;
  color: #fff;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
}

.preview-info {
  flex: 1;
  color: #92400e;
}

.preview-frame {
  flex: 1;
  overflow: auto;
  padding: var(--space-8);
}
</style>
