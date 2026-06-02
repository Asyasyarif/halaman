<template>
  <header class="docs-topbar">
    <div class="docs-topbar__left">
      <button class="docs-topbar__hamburger" @click="emit('toggleMobileMenu')">
        ☰
      </button>
      <NuxtLink to="/docs" class="docs-topbar__logo">
        <span class="logo-icon">H</span>
        <span class="logo-text">Halaman</span>
      </NuxtLink>
    </div>

    <div class="docs-topbar__center">
      <n-input
        placeholder="Search documentation... (⌘K)"
        readonly
        @click="emit('openSearch')"
        class="docs-topbar__search"
      >
        <template #prefix>
          <span>🔍</span>
        </template>
        <template #suffix>
          <kbd class="shortcut-badge">⌘K</kbd>
        </template>
      </n-input>
    </div>

    <div class="docs-topbar__right">
      <DocsThemeToggle />
      <n-button text @click="navigateTo('/admin')">Dashboard</n-button>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  toggleMobileMenu: []
  openSearch: []
}>()
</script>

<style scoped>
.docs-topbar {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
  gap: var(--space-4);
}

.docs-topbar__left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.docs-topbar__hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .docs-topbar__hamburger {
    display: block;
  }
}

.docs-topbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-primary);
  font-weight: 700;
  text-decoration: none;
}

.logo-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-500);
  color: #fff;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: var(--font-size-sm);
}

.logo-text {
  font-size: var(--font-size-base);
}

.docs-topbar__center {
  max-width: 400px;
  width: 100%;
}

.docs-topbar__search {
  cursor: pointer;
}

.shortcut-badge {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
}

.docs-topbar__right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
