<template>
  <div class="steps">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step"
    >
      <div class="step__marker">
        <span class="step__number">{{ index + 1 }}</span>
        <div v-if="index < steps.length - 1" class="step__line" />
      </div>
      <div class="step__body">
        <strong v-if="step.title" class="step__title">{{ step.title }}</strong>
        <div class="step__content">
          <slot :name="`step-${index}`" :step="step" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  title?: string
}

defineProps<{
  steps: Step[]
}>()
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
  padding-bottom: var(--space-4);
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
