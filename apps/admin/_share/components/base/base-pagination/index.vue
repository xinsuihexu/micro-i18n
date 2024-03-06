<script setup lang="ts">
interface IProps {
  page: number
  size: number
  total: number
  background?: boolean
  layout?: string
  pageSizes?: number[]
}

defineOptions({ name: 'BasePagination' })

const props = withDefaults(defineProps<IProps>(), {
  background: true,
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: () => [10, 25, 50, 100, 250],
})

const emit = defineEmits([
  'update:page',
  'update:size',
  'pageChange',
  'pageSizeChange',
])

const attrs = useAttrs()

const page = computed({
  get() {
    return props.page
  },
  set(v) {
    emit('update:page', v)
  },
})

const size = computed({
  get() {
    return props.size
  },
  set(v) {
    emit('update:size', v)
  },
})

</script>

<template>
  <div class="pagination">
    <div>
      <slot />
    </div>

    <ElPagination
      v-model:current-page="page"
      v-model:page-size="size"
      small
      :total="props.total"
      :page-sizes="props.pageSizes"
      :layout="props.layout"
      :background="props.background"
      v-bind="attrs"
      @current-change="emit('pageChange')"
      @size-change="emit('pageSizeChange')"
    />
  </div>
</template>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
