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
        <NuxtLink to="/admin/projects" class="nav-item">
          <PhFolders :size="20" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">Projects</span>
        </NuxtLink>
        <a href="/docs" target="_blank" rel="noopener" class="nav-item">
          <PhBookOpen :size="20" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">View docs site</span>
        </a>
      </div>

      <div v-if="activeProject" class="nav-section">
        <div v-if="!collapsed" class="nav-section__label nav-section__label--project">
          <span class="project-dot" />
          <span class="project-name">{{ activeProject.name }}</span>
        </div>
        <NuxtLink
          v-for="item in projectMenu"
          :key="item.path"
          :to="`/admin/projects/${activeProject.id}${item.path}`"
          class="nav-item nav-item--sub"
        >
          <component :is="item.icon" :size="18" weight="regular" class="nav-icon" />
          <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
        </NuxtLink>
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
  PhFolders,
  PhBookOpen,
  PhUser,
  PhCaretLeft,
  PhCaretRight,
  PhNote,
  PhEye,
  PhList,
  PhImages,
  PhCode,
  PhGithubLogo,
  PhUsers,
  PhRocket,
  PhGear,
} from '@phosphor-icons/vue'

const route = useRoute()
const projects = ref<Array<{ id: string, name: string, slug: string }>>([])

const collapsed = ref(false)

function handleCollapse() {
  collapsed.value = !collapsed.value
}

const projectMenu = [
  { path: '', icon: PhNote, label: 'Pages' },
  { path: '/preview', icon: PhEye, label: 'Preview' },
  { path: '/navigation', icon: PhList, label: 'Navigation' },
  { path: '/assets', icon: PhImages, label: 'Assets' },
  { path: '/snippets', icon: PhCode, label: 'Snippets' },
  { path: '/github', icon: PhGithubLogo, label: 'GitHub' },
  { path: '/members', icon: PhUsers, label: 'Members' },
  { path: '/deployments', icon: PhRocket, label: 'Deployments' },
  { path: '/settings', icon: PhGear, label: 'Settings' },
]

const routeProjectId = computed(() => route.params.projectId as string | undefined)

const activeProject = computed(() => {
  if (!routeProjectId.value) return null
  return projects.value.find((p) => p.id === routeProjectId.value) ?? {
    id: routeProjectId.value,
    name: 'Project',
    slug: routeProjectId.value,
  }
})

onMounted(async () => {
  try {
    projects.value = await $fetch('/api/projects')
  } catch {}
})

watch(() => routeProjectId.value, async (id) => {
  if (id && !projects.value.find((p) => p.id === id)) {
    try {
      const list = await $fetch('/api/projects')
      projects.value = list
    } catch {}
  }
})
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

.nav-section + .nav-section {
  margin-top: var(--space-4);
  border-top: 1px solid var(--border-color);
  padding-top: var(--space-3);
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

.nav-section__label--project {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  font-size: var(--font-size-sm);
}

.project-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary-500);
  flex-shrink: 0;
}

.project-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.nav-item--sub {
  padding-left: var(--space-8);
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
