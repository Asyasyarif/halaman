<template>
  <MDXProvider :components="components">
    <slot />
  </MDXProvider>
</template>

<script setup lang="ts">
import { MDXProvider } from '@mdx-js/vue'
import { h } from 'vue'

import Callout from '~/components/docs/content/Callout.vue'
import Card from '~/components/docs/content/Card.vue'
import CardGroup from '~/components/docs/content/CardGroup.vue'
import CodeBlock from '~/components/docs/content/CodeBlock.vue'
import Step from '~/components/docs/content/Step.vue'
import Steps from '~/components/docs/content/Steps.vue'
import Tab from '~/components/docs/content/Tab.vue'
import Tabs from '~/components/docs/content/Tabs.vue'
import Accordion from '~/components/docs/content/Accordion.vue'

const components = {
  Callout,
  Card,
  CardGroup,
  CodeBlock,
  Step,
  Steps,
  Tab,
  Tabs,
  Accordion,
  a: (props: Record<string, unknown>) => h('a', { ...props, target: props.href?.toString().startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }),
}
</script>
