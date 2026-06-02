<template>
  <div v-if="page" class="docs-slug">
    <DocsContent
      :page="{ title: page.title, description: page.description }"
      :prev-page="prevPage ?? undefined"
      :next-page="nextPage ?? undefined"
    >
      <component :is="Content" />
    </DocsContent>
  </div>
  <div v-else class="docs-slug__missing">
    <DocsContent :page="{ title: 'Page not found' }">
      <p>
        No MDX file exists at <code>app/content/docs/{{ slug || 'index' }}.mdx</code>.
      </p>
      <p>
        <NuxtLink to="/docs">Back to the documentation home</NuxtLink>
      </p>
    </DocsContent>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => (route.params.slug as string[] | undefined)?.filter(Boolean).join('/') ?? '')
const { current, prev, next } = useDocsPage(slug.value)
const page = current
const Content = useDocsContent(slug.value)
const prevPage = computed(() => prev.value ? { title: prev.value.title, to: prev.value.path } : null)
const nextPage = computed(() => next.value ? { title: next.value.title, to: next.value.path } : null)

useHead({
  title: () => page.value?.title ?? 'Page not found',
  meta: [{ name: 'description', content: () => page.value?.description ?? '' }],
})

definePageMeta({ layout: 'docs' })
</script>
