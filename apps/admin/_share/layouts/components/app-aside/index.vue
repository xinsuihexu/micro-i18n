<script lang="ts" setup>
import { Tree } from '@pkg/utils'
import { cloneDeep } from 'lodash-es'
import useTabStore from '../../../store/tab'
import type { IMenu } from '../../../store/menu'
import useMenuStore from '../../../store/menu'
import { isMicro } from '../../../utils/env'
import SubMenu from './sub-menu.vue'

interface IProps {
  isCollapse: boolean
}

defineOptions({ name: 'AppAside' })

const { isCollapse } = defineProps<IProps>()

const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()
const tabStore = useTabStore()

const menus = computed(() => {
  const menus = cloneDeep(menuStore.getMenus.filter(({ visible }) => visible))
  new Tree().traversal(menus, (menu: IMenu) => {
    if (menu.children?.length > 0)
      menu.children = menu.children.filter(({ visible }) => visible)
  })
  return menus
})

function onSelect(code: string) {
  const menu = new Tree().findNode(toValue(menus), (node: IMenu) => node.code === code) as IMenu

  if (menu.href) {
    window.open(menu.href)
  }

  else {
    tabStore.addTab(menu)
    if (!isMicro(route))
      router.push(menu.path)
  }
}
</script>

<template>
  <div class="app-aside">
    <h1
      font-bold
      text-xl
      flex
      justify-center
      items-center
    >
      LOGO
    </h1>

    <div class="app-aside__menu">
      <ElMenu
        class="h-full"
        :default-active="tabStore.currentTabCode"
        :collapse="isCollapse"
        unique-opened
        @select="onSelect"
      >
        <SubMenu
          v-for="menu in menus"
          :key="menu.code"
          :menu="menu"
        />
      </ElMenu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-aside {
  display: grid;

  background-color: var(--el-bg-color);

  grid-template-rows: var(--header-height) 1fr;
}

.app-aside__menu {
  block-size: 100%;
  overflow: auto;
}

</style>
