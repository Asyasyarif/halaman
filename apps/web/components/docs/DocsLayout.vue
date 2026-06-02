<template>
  <div>
    <Head>
      <Title>{{ page?.title || 'Halaman Docs' }}</Title>
    </Head>
    <DocsTopbar @open-search="showSearch = true" @toggle-mobile-menu="showMobileMenu = !showMobileMenu" />
    <div class="docs-layout__body">
      <DocsMobileDrawer :visible="showMobileMenu" @close="showMobileMenu = false">
        <DocsSidebar />
      </DocsMobileDrawer>
      <DocsSidebar class="docs-sidebar-desktop" />
      <main class="docs-layout__content">
        <slot />
      </main>
      <DocsToc />
    </div>
    <DocsSearchModal v-if="showSearch" @close="showSearch = false" />
  </div>
</template>

<script setup lang="ts">
const showSearch = ref(false)
const showMobileMenu = ref(false)

const page = computed(() => ({
  title: '',
  description: '',
}))
</script>

<style scoped>
.docs-layout__body {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - var(--topbar-height));
}

.docs-layout__content {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--space-10);
}

@media (max-width: 768px) {
  .docs-sidebar-desktop {
    display: none;
  }
}

@media (min-width: 769px) {
  .docs-sidebar-desktop {
    display: block;
  }
}
</style>
