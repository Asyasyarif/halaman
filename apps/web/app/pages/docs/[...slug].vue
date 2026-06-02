<template>
  <div class="docs-slug-page">
    <DocsContent :page="page" :prev-page="prevNav" :next-page="nextNav">
      <div v-if="page?.contentJson" class="rendered-content">
        <!-- Render content via docs-renderer -->
        <template v-for="node in renderedNodes" :key="node.id">
          <component :is="getComponent(node.type)" v-bind="node.props">
            {{ node.text }}
          </component>
        </template>
      </div>
      <div v-else class="empty-page">
        <p>This page is empty. Start writing content in the admin editor.</p>
      </div>
    </DocsContent>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = (route.params.slug as string[])?.join('/') || ''

const page = ref<any>(null)
const prevNav = computed(() => undefined)
const nextNav = computed(() => undefined)
const renderedNodes = computed(() => [])

function getComponent(type: string) {
  const map: Record<string, string> = {
    heading: 'h1',
    paragraph: 'p',
  }
  return map[type] || 'div'
}

onMounted(async () => {
  // In production, this would fetch the page by slug from the API
  // For now, it renders the layout shell
  page.value = {
    title: slug.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Page',
    description: '',
    contentJson: null,
  }
})

definePageMeta({ layout: 'docs' })
</script>
