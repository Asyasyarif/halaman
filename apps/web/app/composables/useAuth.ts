import type { User } from '@halaman/database'

interface AuthState {
  user: Ref<User | null>
  isAuthenticated: Ref<boolean>
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export function useAuth(): AuthState {
  const user = useState<User | null>('auth:user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  async function fetchSession() {
    try {
      const data = await $fetch('/api/auth/session')
      user.value = data.user as User | null
    } catch {
      user.value = null
    }
  }

  async function login(email: string, password: string) {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    await fetchSession()
  }

  async function register(email: string, name: string, password: string) {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email, name, password },
    })
    await fetchSession()
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  async function refresh() {
    await fetchSession()
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    refresh,
  }
}
