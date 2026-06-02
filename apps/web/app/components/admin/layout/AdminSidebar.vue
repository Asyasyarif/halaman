<template>
  <aside class="admin-sidebar" :class="{ 'admin-sidebar--collapsed': collapsed }">
    <div class="admin-sidebar__header">
      <NuxtLink to="/admin" class="admin-sidebar__logo">
        <span class="logo-icon">H</span>
        <span v-if="!collapsed" class="logo-text">Halaman</span>
      </NuxtLink>
    </div>

    <nav class="admin-sidebar__nav">
      <div class="nav-section">
        <div v-if="!collapsed" class="nav-section__label">Workspace</div>
        <NuxtLink to="/admin" class="nav-item">
          <PhChartPie :size="20" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">Dashboard</span>
        </NuxtLink>
        <NuxtLink to="/admin/pages" class="nav-item">
          <PhNote :size="20" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">Pages</span>
        </NuxtLink>
        <a href="/docs" target="_blank" rel="noopener" class="nav-item">
          <PhBookOpen :size="20" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">View docs site</span>
        </a>
      </div>
    </nav>

    <div class="admin-sidebar__footer">
      <NuxtLink to="/admin/profile" class="nav-item">
        <PhUser :size="20" weight="regular" class="nav-icon" />
        <span v-if="!collapsed" class="nav-label">Profile</span>
      </NuxtLink>
      <button class="nav-item" @click="handleCollapse">
        <PhCaretLeft v-if="!collapsed" :size="20" weight="regular" class="nav-icon" />
        <PhCaretRight v-else :size="20" weight="regular" class="nav-icon" />
        <span v-if="!collapsed" class="nav-label">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  PhChartPie,
  PhNote,
  PhBookOpen,
  PhUser,
  PhCaretLeft,
  PhCaretRight,
} from '@phosphor-icons/vue'

const collapsed = ref(false)

function handleCollapse() {
  collapsed.value = !collapsed.value
}
</script>

<style scoped>
.admin-sidebar {
  width: var(--admin-sidebar-width);
  height: 100%;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
  flex-shrink: 0;
}

.admin-sidebar--collapsed {
  width: 64px;
}

.admin-sidebar__header {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.admin-sidebar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-primary);
  font-weight: 700;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-500);
  color: #fff;
  border-radius: var(--radius-md);
  font-weight: 700;
  flex-shrink: 0;
}

.logo-text {
  font-size: var(--font-size-lg);
}

.admin-sidebar__nav {
  flex: 1;
  padding: var(--space-3) 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.nav-section {
  display: flex;
  flex-direction: column;
}

.nav-section__label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  padding: 0 var(--space-4);
  margin-bottom: var(--space-2);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.router-link-active.nav-item {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-weight: 500;
}

.nav-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-sidebar__footer {
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
</style>
