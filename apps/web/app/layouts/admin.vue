<template>
  <div class="admin-layout">
    <AdminTopbar />
    <div class="admin-layout__body">
      <AdminSidebar />
      <main class="admin-layout__main">
        <slot />
      </main>
    </div>
  </div>
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
