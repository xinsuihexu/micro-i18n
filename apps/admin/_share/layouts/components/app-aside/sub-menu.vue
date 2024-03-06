<script setup lang="ts">
import type { IMenu } from '../../../store/menu'

interface IProps {
  menu: IMenu
}

defineOptions({
  name: 'SubMenu',
  inheritAttrs: false,
})

const { menu } = defineProps<IProps>()

const hasChildren = computed(() => {
  return menu.children && menu.children.length > 0
})

</script>

<template>
  <ElSubMenu
    v-if="hasChildren"
    :index="menu.code"
  >
    <template #title>
      <ElIcon v-if="menu.icon">
        <i :class="menu.icon" />
      </ElIcon>
      <span>{{ menu.name }}</span>
    </template>

    <SubMenu
      v-for="subMenu in menu.children"
      :key="subMenu.code"
      :menu="subMenu"
    />
  </ElSubMenu>

  <ElMenuItem
    v-else
    :index="menu.code"
  >
    <ElIcon v-show="menu.icon">
      <!-- <i :class="menu.icon" /> -->
      <button :class="menu.icon" />
    </ElIcon>
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </ElMenuItem>
</template>
