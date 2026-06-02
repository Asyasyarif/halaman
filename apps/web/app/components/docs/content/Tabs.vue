<template>
  <div class="tabs">
    <div class="tabs__header">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="tabs__tab"
        :class="{ 'tabs__tab--active': activeIndex === index }"
        @click="activeIndex = index"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="tabs__panel">
      <component :is="items[activeIndex]?.node" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fragment, useSlots } from 'vue'

const slots = useSlots()

const items = computed(() => {
  const collect = (vnodes: any[]): any[] => {
    const out: any[] = []
    for (const vnode of vnodes) {
      if (!vnode) continue
      if (vnode.type === Fragment) {
        out.push(...collect(vnode.children ?? []))
      } else if (typeof vnode.type !== 'string') {
        const props = (vnode.props ?? {}) as { label?: string }
        if (props.label !== undefined) {
          out.push({ label: props.label, node: vnode })
        }
      }
    }
    return out
  }
  return collect(slots.default?.() ?? [])
})

const activeIndex = ref(0)
</script>

<style scoped>
.tabs {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-4) 0;
}

.tabs__header {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-tertiary);
}

.tabs__tab {
  padding: var(--space-2) var(--space-4);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.tabs__tab:hover {
  color: var(--text-primary);
}

.tabs__tab--active {
  color: var(--color-primary-600);
  border-bottom-color: var(--color-primary-500);
}

.tabs__panel {
  padding: var(--space-4);
}
</style>
