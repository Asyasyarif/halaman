<template>
  <ClientOnly>
    <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-dialog-provider>
            <n-notification-provider>
              <slot />
            </n-notification-provider>
          </n-dialog-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-config-provider>
    <template #fallback>
      <div class="app-loading">
        <slot />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const colorMode = useColorMode()

const theme = computed(() => colorMode.value === 'dark' ? darkTheme : undefined)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3b82f6',
    primaryColorHover: '#2563eb',
    primaryColorPressed: '#1d4ed8',
    primaryColorSuppl: '#3b82f6',
    borderRadius: '6px',
  },
}
</script>

<style scoped>
.app-loading {
  min-height: 100vh;
  background: var(--bg-primary);
}
</style>
