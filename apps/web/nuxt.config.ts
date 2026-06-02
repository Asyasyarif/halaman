// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(rootDir, '..', '..')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || ('file:' + resolve(workspaceRoot, 'data/halaman.db')),
    encryptionKey: '',
    sessionSecret: '',
    githubAppId: '',
    githubAppPrivateKey: '',
    githubAppWebhookSecret: '',
    githubClientId: '',
    githubClientSecret: '',
    public: {
      appName: 'Halaman',
    },
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  devServer: {
    port: 3333,
  },

  typescript: {
    strict: true,
  },

  build: {
    transpile: ['naive-ui', 'vueuc', 'evtd', 'vdirs', 'vooks', 'css-render'],
  },

  vite: {
    optimizeDeps: {
      include: ['vueuc', 'naive-ui'],
    },
  },
})
