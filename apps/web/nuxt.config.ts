// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'

const rootDir = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(rootDir, '..', '..')

const mdxPlugin = mdx({
  jsxImportSource: 'vue',
  providerImportSource: '@mdx-js/vue',
  remarkPlugins: [
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'frontmatter' }],
    remarkGfm,
  ],
})

export default defineNuxtConfig({
  compatibilityDate: '2026-06-02',
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
    plugins: [
      mdxPlugin as unknown as never,
    ],
    optimizeDeps: {
      include: ['vueuc', 'naive-ui'],
    },
  },
})
