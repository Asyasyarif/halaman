<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Login to Halaman</h1>
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="form.email" type="email" placeholder="you@example.com" size="large" />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="form.password" type="password" placeholder="Enter password" size="large" />
        </n-form-item>
        <n-button type="primary" block size="large" :loading="loading" @click="handleLogin">
          Sign In
        </n-button>
      </n-form>
      <p class="auth-footer">
        Don't have an account? <NuxtLink to="/auth/register">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()
const route = useRoute()
const form = reactive({ email: '', password: '' })
const loading = ref(false)

const rules = {
  email: [{ required: true, message: 'Email is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
}

async function handleLogin() {
  loading.value = true
  try {
    await login(form.email, form.password)
    await router.push((route.query.redirect as string) || '/admin')
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
