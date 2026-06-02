<template>
  <div class="code-block">
    <div class="code-block__header">
      <span v-if="language" class="code-block__lang">{{ language }}</span>
      <span v-if="filename" class="code-block__filename">{{ filename }}</span>
      <button class="code-block__copy" @click="copyCode">Copy</button>
    </div>
    <div class="code-block__body" :class="{ 'code-block__body--lines': showLineNumbers }">
      <pre><code :class="language ? `language-${language}` : ''"><slot /></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  language?: string
  filename?: string
  showLineNumbers?: boolean
}>()

function copyCode() {
  // TODO: Implement clipboard copy
}
</script>

<style scoped>
.code-block {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-4) 0;
}

.code-block__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  font-size: var(--font-size-xs);
}

.code-block__lang {
  color: var(--color-primary-500);
  font-weight: 600;
  text-transform: uppercase;
}

.code-block__filename {
  color: var(--text-secondary);
  flex: 1;
}

.code-block__copy {
  background: none;
  border: 1px solid var(--border-color);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
}

.code-block__copy:hover {
  background: var(--bg-secondary);
}

.code-block__body {
  padding: var(--space-4);
  overflow-x: auto;
}

.code-block__body pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

.code-block__body code {
  font-family: var(--font-mono);
}
</style>
