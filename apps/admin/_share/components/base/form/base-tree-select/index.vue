<script setup lang="ts">
import {
  useDebounceFn,
  useEventListener,
  useVModel,
} from '@vueuse/core'
import {
  ElInput,
  ElSelectV2,
} from 'element-plus'
import type { ElTreeV2 } from 'element-plus'

interface IProps {
  modelValue: any[] | string
  /** 是否开启多选 */
  multiple?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 弹层最小宽度 */
  minWidth?: string
  /** tree是否支持搜索 */
  hasSearch?: boolean
  /** 搜索 input组件的参数 */
  searchParams?: InstanceType<typeof ElInput>['$props']
  /** select-v2组件的参数 */
  selectParams?: InstanceType<typeof ElSelectV2>['$props']
  /** tree-v2组件的参数 */
  treeParams?: InstanceType<typeof ElTreeV2>['$props'] & { nodeKey?: string | number }
  /** 加载数据 */
  load: () => any
}

interface IState {
  loading: boolean
  nodes: any[]
  popperWidth: string | null
}

interface IExpose {
  keyword: Ref<string>
}

defineOptions({ name: 'BaseSelectTree' })

const props = withDefaults(defineProps<IProps>(), {
  multiple: true,
  disabled: false,
  minWidth: '320px',
  hasSearch: true,
  selectParams: () => ({}),
  treeParams: () => ({}),
  searchParams: () => ({}),
})

const emit = defineEmits(['update:modelValue', 'change', 'nodeClick', 'checkChange'])

const state = reactive<IState>({
  loading: false,
  nodes: [],
  popperWidth: null,
})
const keyword = ref('')
const selectRef = ref<any>(null)
const popoverRef = ref<any>(null)
const treeRef = ref<any>(null)

const checkedList = useVModel(props, 'modelValue', emit)

watch(keyword, useDebounceFn(async (v) => {
  state.loading = true
  setTimeout(() => {
    treeRef.value!.filter(v)
    state.loading = false
  }, 500)
}, 1000))

const popperStyle = computed(() => ({
  minWidth: props.minWidth,
  width: state.popperWidth,
}))

function filterNode(value: string, data: any) {
  if (!value.trim())
    return true

  return data.label?.includes(value)
}

function onClickOutside() {
  unref(popoverRef).popperRef?.delayHide?.()
}

function onCheckChange(node: any, checked: boolean) {
  const isExist = checkedList.value!.includes(node.id)

  if (checked && !isExist)
    (checkedList.value as any).push(node.id)

  if (!checked && isExist) {
    const index = (checkedList.value as any).findIndex(v => v === node.id);
    (checkedList.value as any).splice(index, 1)
  }

  emit('change', checkedList.value)
  emit('checkChange', node)
}

function onNodeClick(tree, node, vm, el) {
  if (!props.multiple) {
    checkedList.value = node.key
    emit('change', checkedList.value)
    unref(popoverRef).hide()
  }

  emit('nodeClick', tree, node, vm, el)
}

async function setTreeNodes() {
  try {
    state.loading = true
    const nodes = await props.load()
    state.nodes = nodes

    // 处理回显
    if (checkedList.value?.length > 0)
      treeRef.value.setCheckedKeys(checkedList.value)
  }
  finally {
    state.loading = false
  }
}

function onRemoveTag(key: string) {
  treeRef.value.setChecked(key, false, false)
}

function onClear() {
  treeRef.value.setCheckedKeys([], false)
}

function setPopperWidth() {
  state.popperWidth = `${selectRef.value?.$el?.getBoundingClientRect?.()?.width}px`
}

useEventListener(window, 'resize', () => {
  setPopperWidth()
})

defineExpose<IExpose>({ keyword })

setTreeNodes()

onMounted(() => {
  setPopperWidth()
})
</script>

<template>
  <div class="v__select-tree w-full">
    <ElSelectV2
      ref="selectRef"
      v-model="checkedList"
      v-click-outside="onClickOutside"
      class="w-full"
      popper-class="v__select-tree-v2"
      :multiple="props.selectParams.multiple || props.multiple"
      :disabled="props.selectParams.disabled || props.disabled"
      v-bind="props.selectParams"
      @remove-tag="onRemoveTag"
      @clear="onClear"
      @focus="setPopperWidth"
      @blur="elFormItem.validate()"
    />

    <ElPopover
      v-if="selectRef"
      ref="popoverRef"
      :popper-style="popperStyle"
      :virtual-ref="selectRef"
      trigger="click"
      placement="bottom-start"
      virtual-triggering
    >
      <div
        v-loading="state.loading"
        class="v__select-tree-popover"
      >
        <ElInput
          v-if="props.hasSearch && state.nodes.length > 0"
          v-model="keyword"
          class="mb-6px"
          :disabled="props.disabled || props.searchParams.disabled"
          v-bind="props.searchParams"
        />

        <ElTree
          ref="treeRef"
          class="v__select-tree-popover-tree"
          :data="state.nodes"
          :show-checkbox="props.multiple"
          :filter-node-method="filterNode"
          :disabled="props.disabled"
          v-bind="props.treeParams"
          @check-change="onCheckChange"
          @node-click="onNodeClick"
        >
          <template #default="{ node, data }">
            <slot v-bind="{ node, data }" />
          </template>

          <template #empty>
            <slot name="empty" />
          </template>
        </ElTree>
      </div>
    </ElPopover>
  </div>
</template>
