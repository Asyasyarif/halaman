<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Create Account</h1>
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item path="name" label="Name">
          <n-input v-model:value="form.name" placeholder="Your name" size="large" />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input v-model:value="form.email" type="email" placeholder="you@example.com" size="large" />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="form.password" type="password" placeholder="Min. 8 characters" size="large" />
        </n-form-item>
        <n-button type="primary" block size="large" :loading="loading" @click="handleRegister">
          Create Account
        </n-button>
      </n-form>
      <p class="auth-footer">
        Already have an account? <NuxtLink to="/auth/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { register } = useAuth()
const router = useRouter()
const form = reactive({ email: '', name: '', password: '' })
const loading = ref(false)

const rules = {
  email: [{ required: true, message: 'Email is required', trigger: 'blur' }],
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 8, message: 'Password must be at least 8 characters', trigger: 'blur' },
  ],
}

async function handleRegister() {
  loading.value = true
  try {
    await register(form.email, form.name, form.password)
    await router.push('/admin')
  } catch {
    // error handled by naive message
  } finally {
    loading.value = false
  }
}

definePageMeta({ layout: false })
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-secondary);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.auth-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
  text-align: center;
}

.auth-footer {
  text-align: center;
  margin-top: var(--space-4);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}
</style>
