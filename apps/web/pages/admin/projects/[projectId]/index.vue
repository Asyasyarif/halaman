<template>
  <div class="project-detail">
    <div class="project-detail__header">
      <h1>{{ project?.name || 'Project' }}</h1>
      <n-space>
        <n-button @click="navigateTo(`/admin/projects/${projectId}/preview`)">Preview</n-button>
      </n-space>
    </div>

    <n-tabs v-model:value="activeTab" type="line">
      <n-tab-pane name="pages" tab="Pages">
        <ProjectPages :project-id="projectId" />
      </n-tab-pane>
      <n-tab-pane name="navigation" tab="Navigation">
        <div class="tab-placeholder">Navigation manager coming soon.</div>
      </n-tab-pane>
      <n-tab-pane name="assets" tab="Assets">
        <div class="tab-placeholder">Asset manager coming soon.</div>
      </n-tab-pane>
      <n-tab-pane name="snippets" tab="Snippets">
        <div class="tab-placeholder">Snippet manager coming soon.</div>
      </n-tab-pane>
      <n-tab-pane name="github" tab="GitHub">
        <div class="tab-placeholder">GitHub integration coming soon.</div>
      </n-tab-pane>
      <n-tab-pane name="settings" tab="Settings">
        <div class="tab-placeholder">Project settings coming soon.</div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth'] })

const route = useRoute()
const projectId = route.params.projectId as string
const activeTab = ref('pages')
const project = ref<any>(null)

onMounted(async () => {
  try {
    const projects = await $fetch('/api/projects')
    project.value = projects.find((p: any) => p.id === projectId)
  } catch {}
})
</script>

<style scoped>
.project-detail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.project-detail__header h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.tab-placeholder {
  padding: var(--space-12);
  text-align: center;
  color: var(--text-secondary);
}
</style>
