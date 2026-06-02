<template>
  <div class="search-modal-overlay" @click.self="emit('close')">
    <div class="search-modal">
      <div class="search-modal__input">
        <span class="search-icon">🔍</span>
        <n-input
          ref="inputRef"
          v-model:value="query"
          placeholder="Search documentation..."
          size="large"
          clearable
          @input="onSearch"
        />
        <kbd class="search-shortcut">ESC</kbd>
      </div>

      <div class="search-modal__results">
        <div v-if="loading" class="search-status">Searching...</div>
        <template v-else-if="results.length > 0">
          <div v-for="result in results" :key="result.id" class="search-result" @click="selectResult(result)">
            <span class="search-result__icon">📄</span>
            <div class="search-result__body">
              <span class="search-result__title">{{ result.title }}</span>
              <span class="search-result__path">{{ result.slug }}</span>
            </div>
          </div>
        </template>
        <div v-else-if="query" class="search-status">
          No results for "{{ query }}"
        </div>
        <div v-else class="search-status search-status--hint">
          Start typing to search docs...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SearchResult {
  id: string
  title: string
  slug: string
}

const emit = defineEmits<{
  close: []
}>()

const query = ref('')
const loading = ref(false)
const results = ref<SearchResult[]>([])
const inputRef = ref()

function onSearch() {
  // Debounced search will be implemented later
}

function selectResult(result: SearchResult) {
  // Navigate to page
  emit('close')
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<style scoped>
.search-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  z-index: 1000;
}

.search-modal {
  width: 100%;
  max-width: 560px;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.search-modal__input {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.search-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.search-shortcut {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  flex-shrink: 0;
}

.search-modal__results {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
}

.search-status {
  text-align: center;
  padding: var(--space-8);
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
}

.search-result {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.1s;
}

.search-result:hover {
  background: var(--bg-secondary);
}

.search-result__body {
  display: flex;
  flex-direction: column;
}

.search-result__title {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.search-result__path {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}
</style>
