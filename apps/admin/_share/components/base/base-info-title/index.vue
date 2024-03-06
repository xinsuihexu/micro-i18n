<script setup lang="ts">
interface IProps {
  title?: string
}

defineOptions({ name: 'BaseTitle' })

const { title = '' } = defineProps<IProps>()

const slots = useSlots()

</script>

<template>
  <div class="flex justify-between gap-48px">
    <div
      v-if="slots.title"
      class="title"
    >
      <slot name="title" />
    </div>
    <div
      v-else
      class="title"
    >
      {{ title }}
    </div>

    <div
      v-if="slots.operation"
      class="operation"
    >
      <slot name="operation" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  position: relative;
  font-size: 14px;
  font-weight: bold;
  padding-inline-start: 10px;

  &::before {
    position: absolute;
    content: '';
    inline-size: 3px;
    block-size: 100%;
    background-color: var(--el-color-primary);
    left: 0;
  }
}
</style>
