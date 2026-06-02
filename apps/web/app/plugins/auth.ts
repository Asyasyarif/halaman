export default defineNuxtPlugin(async () => {
  const { refresh } = useAuth()
  const headers = useRequestHeaders(['cookie'])
  try {
    const data = await $fetch('/api/auth/session', { headers })
    const { user } = useAuth()
    user.value = data.user as any
  } catch {
  }
})
