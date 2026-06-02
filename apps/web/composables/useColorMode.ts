export function useColorMode() {
  const preference = useState<'light' | 'dark' | 'system'>('color-mode', () => 'system')
  const value = computed(() => {
    if (preference.value === 'dark') return 'dark'
    if (preference.value === 'light') return 'light'
    if (import.meta.server) return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  if (import.meta.client) {
    watch(value, (v) => {
      document.documentElement.classList.toggle('dark', v === 'dark')
    }, { immediate: true })

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', () => {
      if (preference.value === 'system') {
        document.documentElement.classList.toggle('dark', mq.matches)
      }
    })
  }

  return { colorMode: value, preference }
}
