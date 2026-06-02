<template>
  <div class="steps">
    <div v-for="(item, index) in items" :key="index" class="step">
      <div class="step__marker">
        <span class="step__number">{{ index + 1 }}</span>
        <div v-if="index < items.length - 1" class="step__line" />
      </div>
      <div class="step__body">
        <component :is="item.node" />
      </div>
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
        const props = (vnode.props ?? {}) as { title?: string }
        if (props.title !== undefined) {
          out.push({ title: props.title, node: vnode })
        }
      }
    }
    return out
  }
  return collect(slots.default?.() ?? [])
})
</script>

<style scoped>
.steps {
  margin: var(--space-4) 0;
}

.step {
  display: flex;
  gap: var(--space-4);
}

.step + .step {
  margin-top: var(--space-4);
}

.step__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step__number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-500);
  color: #fff;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.step__line {
  flex: 1;
  width: 2px;
  background: var(--border-color);
  margin-top: var(--space-2);
  min-height: 20px;
}

.step__body {
  flex: 1;
  padding-bottom: var(--space-4);
}
</style>
