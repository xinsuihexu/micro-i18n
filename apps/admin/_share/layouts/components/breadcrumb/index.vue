<script setup lang="ts">
import { Tree } from '@pkg/utils'
import type { IMenu } from '../../../store/menu'
import useMenuStore from '../../../store/menu'
import useTabStore from '../../../store/tab'

const menuStore = useMenuStore()
const tabStore = useTabStore()

const list = computed(() => {
  const tree = new Tree({
    key: 'code',
    title: 'name',
    children: 'children',
  })
  const menus = tree.findPathNodes(menuStore.menus, (menu: IMenu) => menu.code === tabStore.getCurrentTabCode)

  return menus.map((item, index) => ({
    ...item,
    path: index === menus.length - 1 ? '' : item.path,
  }))
})

</script>

<template>
  <ElBreadcrumb separator="/">
    <ElBreadcrumbItem
      v-for="(item, index) in list"
      :key="index"
      @click="tabStore.addTab(item)"
    >
      <div :class="[{ 'breadcrumb-path': !!item.path }]">
        {{ item.name }}
      </div>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style lang="less" scoped>
.breadcrumb-path {
  font-weight: 700;
  text-decoration: none;
  transition: var(--el-transition-color);
  color: var(--el-text-color-primary);
  cursor: pointer;
}
.breadcrumb-path:hover {
  color: var(--el-color-primary);
}
</style>
