<template>
  <div v-if="page" class="docs-home">
    <DocsContent
      :page="{ title: page.title, description: page.description }"
      :prev-page="undefined"
      :next-page="nextPage ?? undefined"
    >
      <component :is="Content" />
    </DocsContent>
  </div>
</template>

<script setup lang="ts">
const { current, next } = useDocsPage('')
const page = current
const Content = useDocsContent('')
const nextPage = computed(() => next.value ? { title: next.value.title, to: next.value.path } : null)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'No docs index page found at app/content/docs/index.mdx' })
}

useHead({
  title: () => page.value?.title ?? 'Documentation',
  meta: [{ name: 'description', content: () => page.value?.description ?? '' }],
})

definePageMeta({ layout: 'docs' })
</script>
