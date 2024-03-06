<script setup lang="ts">
interface IProps {
  resize?: boolean
}

const { resize = true } = defineProps<IProps>()

const slots = useSlots()
</script>

<template>
  <div class="page">
    <div class="page-container">
      <div
        v-if="slots.search"
        class="container-search"
      >
        <slot name="search" />
      </div>

      <div
        v-if="slots.operation"
        class="container-operation"
      >
        <slot name="operation" />
      </div>

      <div
        v-if="slots.table"
        class="container-table"
        :class="[{ resize }]"
      >
        <slot name="table" />
      </div>

      <div
        v-if="slots.pagination"
        class="container-pagination"
      >
        <slot name="pagination" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page {
  block-size: 100%;
  padding: 12px;
  overflow: auto;
}
.page-container {
  padding: 12px;
  background-color: var(--el-bg-color);
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}
.page-container:has(.resize) {
  block-size: inherit;
}
.container-operation {
  margin-block-start: 16px;
  padding: 12px;
  border: 1px solid var(--el-border-color-lighter);
  border-bottom: 0;
}
.container-table.resize {
  flex: 1;
  block-size: 0;
}
.container-pagination {
  margin-block-start: 12px;
}
</style>
