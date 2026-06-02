export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  if (config.databaseUrl) {
    process.env.DATABASE_URL = config.databaseUrl
  }
})
