<template>
  <header class="admin-topbar">
    <div class="admin-topbar__left">
      <n-breadcrumb>
        <n-breadcrumb-item @click="navigateTo('/admin')">Admin</n-breadcrumb-item>
        <n-breadcrumb-item v-if="project" @click="navigateTo(`/admin/projects/${projectId}`)">
          {{ project.name }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>

    <div class="admin-topbar__right">
      <n-button text @click="toggleTheme">
        <n-icon><span class="action-icon">{{ isDark ? '☀️' : '🌙' }}</span></n-icon>
      </n-button>
      <n-dropdown :options="userMenuOptions" @select="handleUserMenu">
        <n-button text>
          <span class="user-avatar">{{ userInitials }}</span>
        </n-button>
      </n-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const userInitials = computed(() => {
  return user.value?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
})

const projectId = useRoute().params.projectId as string | undefined
const project = ref(null)

const userMenuOptions = [
  { key: 'profile', label: 'Profile' },
  { key: 'divider', type: 'divider' as const },
  { key: 'logout', label: 'Logout' },
]

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

async function handleUserMenu(key: string) {
  if (key === 'logout') {
    await logout()
    navigateTo('/')
  }
}
</script>

<style scoped>
.admin-topbar {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.admin-topbar__left {
  display: flex;
  align-items: center;
}

.admin-topbar__right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.action-icon {
  font-size: 18px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-100);
  color: var(--color-primary-600);
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: 600;
}
</style>
