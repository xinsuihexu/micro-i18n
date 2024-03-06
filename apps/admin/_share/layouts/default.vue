<script lang="ts" setup>
import {
  Tree,
  bus,
} from '@pkg/utils'
import { useTitle } from '@vueuse/core'
import type { IMenu } from '../store/menu'
import useAuthStore from '../store/auth'
import useMenuStore from '../store/menu'
import useTabStore from '../store/tab'
import useAppStore from '../store/app'
import useLocaleStore from '../store/locale'
import { isMicro } from '../utils/env'
import { APP_URL_MAP } from '../settings'
import AppAside from './components/app-aside/index.vue'
import AppHeader from './components/app-header/index.vue'
import AppTab from './components/app-tab/index.vue'
import Setting from './components/setting/index.vue'

const state = reactive({ isCollapse: false })

const route = useRoute()

const appStore = useAppStore()
const menuStore = useMenuStore()
const authStore = useAuthStore()
const tabStore = useTabStore()
const localeStore = useLocaleStore()

const queryStr = new URLSearchParams(location.search).toString()
const appUrl = computed(() => {
  const url = APP_URL_MAP[appStore.getAppCode][import.meta.env.VITE_ENV]
  return queryStr ? `${url}/${route.params.path}?${queryStr}` : `${url}/${route.params.path}`
})

function jumpApp({
  appCode,
  path,
  menuCode,
}: { appCode: string, path: string, menuCode: string }) {
  if (appCode === appStore.getAppCode) {
    const menu = new Tree().findNode(menuStore.getMenus, (menu: IMenu) => menu.code === menuCode)
    tabStore.addTab(menu! || menuStore.getMenus[0])
  }
  else {
    const menus = appStore.setAppCode(appCode)
    bus.emit('sub-route-change', {
      appCode,
      path,
    })
    const menu = new Tree().findNode(menus, (menu: IMenu) => menu.code === menuCode)
    tabStore.addTab(menu! || menus[0])
  }
}

watch(() => route.fullPath, (fullPath) => {
  if (!isMicro(route)) {
    const menu = new Tree().findNode(menuStore.menus, (menu: IMenu) => menu.path === new URL(fullPath, location.origin).pathname)
    if (menu) {
      const {
        appCode,
        path,
        code,
      } = menu
      jumpApp({
        appCode,
        path,
        menuCode: code,
      })
    }
  }
})

</script>

<template>
  <div class="layout">
    <AppAside
      class="layout__aside"
      :is-collapse="state.isCollapse"
    />

    <AppHeader
      v-model:isCollapse="state.isCollapse"
      class="layout__header"
    />

    <AppTab
      class="layout__tab"
    />

    <div class="layout__main-wrapper">
      <div class="layout__main">
        <slot>
          <WujieVue
            v-if="isMicro(route)"
            width="100%"
            height="100%"
            :name="appStore.getAppCode"
            :url="appUrl"
            :props="{
              bus,
              token: authStore.getToken,
              menus: menuStore.getMenus,
              language: localeStore.getLanguage,
              getLanguage: () => localeStore.getLanguage,
              locale: localeStore.getLocale,
              getLocale: () => localeStore.getLocale,
              jump: jumpApp,
              setTitle: useTitle,
              $t,
            }"
          />

          <RouterView
            v-else
            v-slot="{ Component: C }"
          >
            <KeepAlive>
              <Component :is="C" />
            </KeepAlive>
          </RouterView>
        </slot>
      </div>
    </div>

    <Setting />
  </div>
</template>

<style lang="less" scoped>
.layout {
  --aside-min-width: 150px;
  --header-height: 48px;
  --tab-height: 39px;
  --main-height: calc(100vh - var(--header-height) - var(--tab-height));

  display: grid;
  grid-template-areas: "aside header"
  "aside tab"
  "aside main";
  grid-template-columns: max-content 1fr;
  grid-template-rows: var(--header-height) var(--tab-height) var(--main-height);
  min-block-size: 100vh;
  &__aside {
    grid-area: aside;
    max-inline-size: fit-content;
  }

  &__header {
    grid-area: header;
  }

  &__tab {
    overflow: auto;

    grid-area: tab;
  }

  &__main {
    position: relative;
    z-index: 0;

    block-size: 100%;

    &-wrapper {
      overflow-y: auto;
      background-color: var(--el-bg-color-page);

      grid-area: main;
      scroll-behavior: smooth;

      &:has(.fullscreen) {
        padding: 0;

        grid-area: 1 / 1 / -1 / -1;
      }
    }
  }
}

</style>
