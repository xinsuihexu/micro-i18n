<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'

interface IProps {
  tooltip?: any
  lineClamp?: number
}

const {
  tooltip,
  lineClamp = 1,
} = defineProps<IProps>()

const container = ref()
const showTooltip = ref(false)

const lineClampVar = computed(() => lineClamp)

function checkEllipsis() {
  const containerEl = document.querySelector('.base-ellipsis-container')
  if (containerEl)
    showTooltip.value = containerEl.scrollHeight > containerEl.offsetHeight
}

useResizeObserver(container, () => {
  checkEllipsis()
})
</script>

<template>
  <ElTooltip
    :disabled="!tooltip || !showTooltip"
    v-bind="tooltip || {}"
  >
    <div
      ref="container"
      class="base-ellipsis-container"
    >
      <slot />
    </div>

    <template #content>
      <slot name="tooltip" />
    </template>
  </ElTooltip>
</template>

<style lang="less" scoped>
.base-ellipsis-container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: v-bind(lineClampVar);
  word-wrap: break-word;
}
</style>
