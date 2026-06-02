<template>
  <div class="mdx-sample">
    <DocsContent>
      <Content />
    </DocsContent>
  </div>
</template>

<script setup lang="ts">
import Content from '~/content/sample.mdx'

definePageMeta({ layout: 'docs' })
</script>
