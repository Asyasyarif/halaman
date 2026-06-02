<template>
  <div class="callout" :class="`callout--${variant}`">
    <div class="callout__icon">
      <span>{{ icon }}</span>
    </div>
    <div class="callout__body">
      <strong v-if="title" class="callout__title">{{ title }}</strong>
      <div class="callout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'info' | 'warning' | 'error' | 'success'
  title?: string
}>(), {
  variant: 'info',
})

const icons: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
}

const icon = computed(() => icons[props.variant])
</script>

<style scoped>
.callout {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  margin: var(--space-4) 0;
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.callout--info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.callout--warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
}

.callout--error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.callout--success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.callout__icon {
  flex-shrink: 0;
  padding-top: 2px;
}

.callout__title {
  display: block;
  margin-bottom: var(--space-1);
}

html.dark .callout--info {
  background: #1e3a5f;
  border-color: #1e40af;
  color: #bfdbfe;
}

html.dark .callout--warning {
  background: #3b2f1f;
  border-color: #92400e;
  color: #fde68a;
}

html.dark .callout--error {
  background: #3b1f1f;
  border-color: #991b1b;
  color: #fecaca;
}

html.dark .callout--success {
  background: #1f3b2f;
  border-color: #166534;
  color: #bbf7d0;
}
</style>
