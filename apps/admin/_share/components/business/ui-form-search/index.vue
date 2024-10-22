<script lang="ts" setup>
import {
  debounce,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isString,
} from 'lodash-es'
import type { IProps } from './type'

defineOptions({ name: 'UiFormSearch' })

const props = withDefaults(
  defineProps<IProps>(),
  {
    gap: 12,
    defaultExpand: true,
    triggerHideRow: 1,
    minItemWidth: 250,
  },
)

const emit = defineEmits(['update:search', 'search', 'reset', 'expand'])

const state = reactive({
  expand: props.defaultExpand,
  itemWidth: 0,
  containerWidth: 0,
})

const total = computed(() => {
  return props.schemas.reduce((acc, { column }) => {
    acc += column || 1

    return acc
  }, 0)
})

const rowGaps = computed(() => (state.containerWidth / state.itemWidth - 1) * props.gap)

const isShowExpand = computed(() => Math.round(toValue(total) / ((state.containerWidth - toValue(rowGaps)) / state.itemWidth)) > props.triggerHideRow)

const hideIndex = computed(() => {
  if (state.containerWidth !== 0 && toValue(isShowExpand) && !state.expand) {
    if (state.containerWidth === state.itemWidth) {
      return props.triggerHideRow
    }
    else {
      const boundaryIndex = ((state.containerWidth - toValue(rowGaps)) / state.itemWidth) * props.triggerHideRow

      const columnCount = props.schemas.slice(0, boundaryIndex).reduce((acc, { column }) => {
        acc += column > 1 ? column - 1 : 0

        return acc
      }, 0)

      return boundaryIndex - columnCount
    }
  }

  return props.schemas.length
})

const firstSingleIndex = computed(() => props.schemas.findIndex(({ column }) => !column || column === 1))

const customStyle = computed(() => ({
  '--grid-gap': `${props.gap}px`,
  '--min-item-width': `${props.minItemWidth}px`,
}))

function setContainerWidth() {
  const containerEl = document.querySelector('.page-search__content')
  const containerRect = containerEl?.getBoundingClientRect()
  state.containerWidth = containerRect?.width as number

  const itemEls = document.querySelectorAll('.page-search__item')
  const itemRect = itemEls?.[toValue(firstSingleIndex)]?.getBoundingClientRect()

  state.itemWidth = itemRect?.width
}

function getModel() {
  const result = props.schemas.reduce((acc, {
    field,
    component: { value },
  }) => {
    acc[field] = value
    return acc
  }, {} as Record<string, any>)

  return result
}

const onSearch = debounce(
  () => {
    const result = getModel()
    emit('search', result)
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
)

const onReset = debounce(
  () => {
    props.schemas.forEach(({ component }) => {
      const v = component.value
      if (isString(v))
        component.value = ''

      if (isArray(v))
        component.value = []

      if (isNumber(v) || isBoolean(v))
        component.value = null
    })

    emit('reset', getModel())
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
)

function onExpand() {
  if (state.expand) {
    state.expand = false
    setContainerWidth()
  }
  else {
    state.expand = true
  }
  emit('expand', state.expand)
}

onMounted(() => {
  setContainerWidth()
  window.addEventListener('resize', setContainerWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setContainerWidth)
})
</script>

<template>
  <div
    class="page-search"
    :style="customStyle"
  >
    <div class="page-search__content">
      <template
        v-for="(item, index) in props.schemas"
        :key="index"
      >
        <div
          v-if="index < hideIndex"
          class="page-search__item"
          :style="{ '--grid-column': item.column || 1 }"
        >
          <div class="page-search__item-title">
            {{ isFunction(item.title) ? item.title() : item.title }}
          </div>

          <Component
            :is="item.component.vm"
            v-model="item.component.value"
            v-bind="item.component.props"
            v-on="item.component.listeners || {}"
          />
        </div>
      </template>
    </div>

    <div class="page-search__btn">
      <ElButton
        type="primary"
        @click="onSearch"
      >
        <i class="i-carbon-search" />
      </ElButton>

      <ElButton @click="onReset">
        <i class="i-carbon-reset" />
      </ElButton>

      <ElButton
        v-if="isShowExpand"
        @click="onExpand"
      >
        <i :class="state.expand ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'" />
      </ElButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-search {
  display: flex;
  align-items: flex-start;

  column-gap: 12px;
}

.page-search__content {
  display: grid;
  flex-grow: 1;

  grid-gap: var(--grid-gap);
  grid-auto-flow: row dense;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-item-width), 1fr));
}

.page-search__item {
  display: flex;

  border: 1px solid #e5e6ec;
  border-radius: 2px;

  grid-column: span var(--grid-column);

  &:has(.el-input.is-disabled) {
    background-color: var(--el-disabled-bg-color);
  }
}

.page-search__item-title {
  display: grid;

  min-width: fit-content;

  color: #999;

  padding-inline-start: 8px;
  place-items: center;
}

.page-search__btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  width: fit-content;

  margin-inline-start: auto;
  column-gap: 8px;
  row-gap: 8px;
}

:deep(
    .el-input__wrapper,
    .el-input__wrapper.is_focus,
    .el-input__wrapper:hover,
    .el-select__wrapper
  ) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-select__wrapper) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.el-button + .el-button) {
  margin-left: 0;

  margin-inline-start: 0;
}
</style>
