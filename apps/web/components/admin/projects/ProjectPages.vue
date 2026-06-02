<template>
  <div class="project-pages">
    <div class="project-pages__toolbar">
      <n-input v-model:value="searchQuery" placeholder="Search pages..." clearable style="max-width: 300px" />
      <n-button type="primary" @click="showCreate = true">New Page</n-button>
    </div>

    <div v-if="loading" class="project-pages__loading">Loading...</div>

    <PageTree v-else :pages="filteredPages" @select="handleSelect" @delete="handleDelete" />

    <n-modal v-model:show="showCreate" title="Create Page">
      <n-card style="width: 480px">
        <n-form :model="newPage" :rules="pageRules">
          <n-form-item label="Title" path="title">
            <n-input v-model:value="newPage.title" placeholder="Getting Started" />
          </n-form-item>
          <n-form-item label="Slug" path="slug">
            <n-input v-model:value="newPage.slug" placeholder="getting-started" />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="newPage.icon" placeholder="📄" />
          </n-form-item>
          <n-button type="primary" block :loading="creating" @click="handleCreate">Create</n-button>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ projectId: string }>()

const pages = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const showCreate = ref(false)
const creating = ref(false)

const newPage = reactive({ title: '', slug: '', icon: '' })
const pageRules = {
  title: [{ required: true, message: 'Title is required' }],
  slug: [{ required: true, message: 'Slug is required' }],
}

const filteredPages = computed(() =>
  searchQuery.value
    ? pages.value.filter((p) => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    : pages.value,
)

async function fetchPages() {
  loading.value = true
  try {
    pages.value = await $fetch(`/api/projects/${props.projectId}/pages`)
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  creating.value = true
  try {
    await $fetch(`/api/projects/${props.projectId}/pages`, {
      method: 'POST',
      body: newPage,
    })
    showCreate.value = false
    newPage.title = ''
    newPage.slug = ''
    newPage.icon = ''
    await fetchPages()
  } finally {
    creating.value = false
  }
}

function handleSelect(pageId: string) {
  navigateTo(`/admin/projects/${props.projectId}/editor/${pageId}`)
}

async function handleDelete(pageId: string) {
  await $fetch(`/api/pages/${pageId}`, { method: 'DELETE' })
  await fetchPages()
}

onMounted(fetchPages)
</script>

<style scoped>
.project-pages__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}
</style>
