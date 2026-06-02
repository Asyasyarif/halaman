<template>
  <div class="projects-page">
    <div class="projects-page__header">
      <h1>Projects</h1>
      <n-button type="primary" @click="showCreate = true">New Project</n-button>
    </div>

    <div v-if="projects.length === 0" class="projects-empty">
      <p>No projects yet. Create your first documentation project.</p>
    </div>

    <div v-else class="projects-grid">
      <n-card v-for="project in projects" :key="project.id" class="project-card">
        <template #header>
          <div class="project-card__header">
            <PhFolder :size="20" weight="regular" />
            <span>{{ project.name }}</span>
          </div>
        </template>
        <p class="project-card__desc">{{ project.description || 'No description' }}</p>
        <template #action>
          <n-button text @click="navigateTo(`/admin/projects/${project.id}`)">Open</n-button>
        </template>
      </n-card>
    </div>

    <n-modal v-model:show="showCreate" title="Create Project">
      <n-card style="width: 480px">
        <n-form :model="newProject" :rules="projectRules">
          <n-form-item label="Name" path="name">
            <n-input v-model:value="newProject.name" placeholder="My Docs" />
          </n-form-item>
          <n-form-item label="Slug" path="slug">
            <n-input v-model:value="newProject.slug" placeholder="my-docs" />
          </n-form-item>
          <n-form-item label="Description">
            <n-input v-model:value="newProject.description" type="textarea" />
          </n-form-item>
          <n-button type="primary" block :loading="creating" @click="handleCreate">Create</n-button>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { PhFolder } from '@phosphor-icons/vue'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const showCreate = ref(false)
const creating = ref(false)
const projects = ref<any[]>([])

const newProject = reactive({
  name: '',
  slug: '',
  description: '',
})

const projectRules = {
  name: [{ required: true, message: 'Name is required' }],
  slug: [{ required: true, message: 'Slug is required' }],
}

async function handleCreate() {
  creating.value = true
  try {
    const project = await $fetch('/api/projects', {
      method: 'POST',
      body: newProject,
    })
    projects.value.push(project)
    showCreate.value = false
    newProject.name = ''
    newProject.slug = ''
    newProject.description = ''
  } finally {
    creating.value = false
  }
}

onMounted(async () => {
  try {
    projects.value = await $fetch('/api/projects')
  } catch {}
})
</script>

<style scoped>
.projects-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.projects-page__header h1 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
}

.projects-empty {
  text-align: center;
  padding: var(--space-12);
  color: var(--text-secondary);
}

.project-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
}

.project-card__desc {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}
</style>
