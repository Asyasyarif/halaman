<template>
  <div class="profile-page">
    <h1 class="profile-title">Profile</h1>
    <p class="profile-subtitle">Account details for {{ user?.name }}.</p>

    <n-card size="small" class="profile-card">
      <n-form :model="form" label-placement="top">
        <n-form-item label="Name">
          <n-input v-model:value="form.name" placeholder="Your name" />
        </n-form-item>
        <n-form-item label="Email">
          <n-input :value="user?.email" disabled />
        </n-form-item>
        <n-form-item label="Avatar URL">
          <n-input v-model:value="form.avatarUrl" placeholder="https://..." />
        </n-form-item>
        <n-space>
          <n-button type="primary" :loading="saving" :disabled="!isDirty" @click="handleSave">
            Save changes
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['auth'] })

const { user, refresh } = useAuth()
const saving = ref(false)

const form = reactive({
  name: user.value?.name ?? '',
  avatarUrl: user.value?.avatarUrl ?? '',
})

watch(user, (u) => {
  if (u) {
    form.name = u.name
    form.avatarUrl = u.avatarUrl ?? ''
  }
}, { immediate: true })

const isDirty = computed(() =>
  form.name !== (user.value?.name ?? '')
  || form.avatarUrl !== (user.value?.avatarUrl ?? ''),
)

async function handleSave() {
  saving.value = true
  try {
    await $fetch('/api/auth/profile', {
      method: 'PATCH',
      body: { name: form.name, avatarUrl: form.avatarUrl || null },
    })
    await refresh()
  } catch (e: any) {
    // TODO: surface error to user
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 640px;
}

.profile-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
}

.profile-subtitle {
  color: var(--text-secondary);
  margin: var(--space-1) 0 var(--space-8);
}

.profile-card {
  padding: var(--space-2);
}
</style>
