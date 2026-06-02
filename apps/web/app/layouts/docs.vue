<template>
  <div class="docs-layout">
    <DocsTopbar />
    <div class="docs-layout__body">
      <DocsSidebar />
      <main class="docs-layout__content">
        <slot />
      </main>
      <DocsToc />
    </div>
  </div>
</template>

<style scoped>
.docs-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-primary);
}

.docs-layout__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.docs-layout__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-8) var(--space-10);
  max-width: 820px;
}
</style>
