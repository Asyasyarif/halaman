<template>
  <aside class="admin-sidebar" :class="{ 'admin-sidebar--collapsed': collapsed }">
    <div class="admin-sidebar__header">
      <NuxtLink to="/admin" class="admin-sidebar__logo">
        <span class="logo-icon">H</span>
        <span v-if="!collapsed" class="logo-text">Halaman</span>
      </NuxtLink>
    </div>

    <nav class="admin-sidebar__nav">
      <NuxtLink to="/admin" class="nav-item" active-class="nav-item--active">
        <n-icon><span class="nav-icon">📊</span></n-icon>
        <span v-if="!collapsed" class="nav-label">Dashboard</span>
      </NuxtLink>

      <NuxtLink to="/admin/projects" class="nav-item" active-class="nav-item--active">
        <n-icon><span class="nav-icon">📁</span></n-icon>
        <span v-if="!collapsed" class="nav-label">Projects</span>
      </NuxtLink>
    </nav>

    <div class="admin-sidebar__footer">
      <button class="nav-item" @click="handleCollapse">
        <n-icon><span class="nav-icon">{{ collapsed ? '▶' : '◀' }}</span></n-icon>
        <span v-if="!collapsed" class="nav-label">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
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
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: background 0.15s;
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

.nav-item--active {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
}

.admin-sidebar__footer {
  padding: var(--space-3);
  border-top: 1px solid var(--border-color);
}
</style>
