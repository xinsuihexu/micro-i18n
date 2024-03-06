<script setup lang="ts">
import type { UseScrollReturn } from '@vueuse/core'
import { vScroll } from '@vueuse/components'

interface ITab {
  elementId: string
  name: string
}

interface IElementInfo {
  id: string
  top: number
}

interface IProps {
  tabs: ITab[]
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
  direction?: 'row' | 'column'
}

defineOptions({ name: 'UiPageAnchorContainer' })
const {
  tabs,
  tabPosition = 'left',
  direction = 'row',
} = defineProps<IProps>()
const scrollFlag = ref(true)

const modelValue = defineModel()

const elements = ref<IElementInfo[]>([])

const position = computed(() => tabPosition)
const flexDirection = computed(() => direction)

function onTabChange(elementId: string) {
  scrollFlag.value = false

  const element = document.getElementById(elementId)
  element?.scrollIntoView({ behavior: 'smooth' })

  setTimeout(() => {
    scrollFlag.value = true
  }, 500)
}

function onScroll(state: UseScrollReturn) {
  if (toValue(scrollFlag)) {
    const item = elements.value.find(({ top }) => (state.y.value >= top - 10))
    if (item && state.y.value - item.top < 30)
      modelValue.value = item.id
  }
}

onMounted(() => {
  tabs.forEach(({ elementId }) => {
    const el = document.getElementById(elementId)
    if (el) {
      const top = el.offsetTop
      elements.value.unshift({
        id: elementId,
        top,
      })
    }
  })
})
</script>

<template>
  <div class="anchor-page">
    <ElTabs
      v-model="modelValue"
      class="anchor-page__tabs"
      :tab-position="position"
      @tab-change="onTabChange"
    >
      <ElTabPane
        v-for="tab in tabs"
        :key="tab.elementId"
        :label="tab.name"
        :name="tab.elementId"
      />
    </ElTabs>

    <div
      v-scroll="onScroll"
      class="anchor-page__content"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.anchor-page {
  block-size: 100%;
  padding: 12px;
  display: flex;
  flex-direction: v-bind(flexDirection);
  gap: 16px;
}

.anchor-page__content {
  inline-size: 100%;
  overflow: auto;
}
:deep(.el-tabs__header) {
  margin: 0;
}
</style>
