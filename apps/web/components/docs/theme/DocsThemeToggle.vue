<template>
  <n-button text @click="toggleTheme">
    <n-icon>
      <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
    </n-icon>
  </n-button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
