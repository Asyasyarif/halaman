<template>
  <ClientOnly>
    <div class="admin-layout">
      <AdminTopbar />
      <div class="admin-layout__body">
        <AdminSidebar />
        <main class="admin-layout__main">
          <slot />
        </main>
      </div>
    </div>
    <template #fallback>
      <div class="admin-loading-shell" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-secondary);
}

.admin-layout--loading {
  opacity: 0;
}

.admin-loading-shell {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.admin-layout__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.admin-layout__main {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}
</style>
