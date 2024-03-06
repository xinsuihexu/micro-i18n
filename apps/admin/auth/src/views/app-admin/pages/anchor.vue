<script setup lang="ts">
import UiAnchorContainer from '@admin/_share/components/business/ui-anchor-container/index.vue'

const activeId = ref('g_a')
const tabs = ref([
  {
    elementId: 'g_a',
    name: '第一步',
  },
  {
    elementId: 'g_b',
    name: '第二步',
  },
  {
    elementId: 'g_c',
    name: '第三步',
  },
  {
    elementId: 'g_d',
    name: '第四步',
  },
  {
    elementId: 'g_e',
    name: '第五步',
  },
])
</script>

<template>
  <UiAnchorContainer
    v-model="activeId"
    :tabs="tabs"
    tab-position="right"
    direction="row-reverse"
  >
    <ul>
      <li class="h-400px p-16px">
        <a id="g_a">第一步</a>
      </li>

      <li class="h-400px p-16px mt-16px">
        <a id="g_b">第二步</a>
      </li>

      <li class="h-400px p-16px mt-16px">
        <a id="g_c">第三步</a>
      </li>

      <li class="h-500px p-16px mt-16px">
        <a id="g_d">第四步</a>
      </li>

      <li class="h-500px p-16px mt-16px">
        <a id="g_e">第五步</a>
      </li>
    </ul>
  </UiAnchorContainer>
</template>

<style lang="less" scoped>
li {
  border: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-blank);
}
</style>
