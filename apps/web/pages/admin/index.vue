<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Dashboard</h1>
    <p class="dashboard-subtitle">Welcome back, {{ user?.name }}</p>

    <div class="dashboard-stats">
      <n-card v-for="stat in stats" :key="stat.label" size="small">
        <n-statistic :label="stat.label" :value="stat.value" />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth()

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const stats = [
  { label: 'Projects', value: 0 },
  { label: 'Pages', value: 0 },
  { label: 'Published', value: 0 },
  { label: 'Drafts', value: 0 },
]
</script>

<style scoped>
.admin-dashboard {
  max-width: 960px;
}

.dashboard-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.dashboard-subtitle {
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}
</style>
