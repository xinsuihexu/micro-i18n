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

setList()
</script>

<template>
  <ElCascader
    v-model="modelValue"
    class="w-full"
    :options="list"
    clearable
    collapse-tags
    collapse-tags-tooltip
    v-bind="attrs"
  />
</template>
