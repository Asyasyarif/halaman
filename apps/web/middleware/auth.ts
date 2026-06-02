export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
