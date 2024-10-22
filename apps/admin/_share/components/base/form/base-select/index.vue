<script setup lang="ts">
import { defineModel } from 'vue'

interface IItem {
  label: string
  value: any
}

interface IProps {
  api?: Function
  apiParams: Record<string, any>
  options?: IItem[]
}

const {
  api,
  apiParams,
  options,
} = defineProps<IProps>()
const modelValue = defineModel()

const list = ref<IItem[]>([])

const attrs = useAttrs()

async function setList() {
  if (options) {
    list.value = options
    return
  }

  if (api) {
    const data = await api(apiParams || {})
    list.value = data || []
  }
}

watch(() => options, (v) => {
  if (v)
    list.value = v
})

setList()
</script>

<template>
  <ElSelect
    v-model="modelValue"
    clearable
    collapse-tags
    collapse-tags-tooltip
    v-bind="attrs"
  >
    <ElOption
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ElSelect>
</template>
