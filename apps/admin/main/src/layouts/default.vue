<script lang="ts" setup>
import useAppStore from '@admin/_share/store/app'
// import BaseSelect from '@admin/_share/components/base/form/base-select/index.vue'
// import type { CodeEnvType } from '@admin/_share/enums'
// import { MAIN_APP_SLOT_ROUTE_PATH } from '@admin/_share/settings'
import AppHeader from './components/app-header.vue'

// const appStore = useAppStore()

// const apps = computed(() => appStore.apps.map(({
//   name,
//   code,
// }) => ({
//   label: name,
//   value: code,
// })))

// function onChangeApp(code: CodeEnvType) {
//   appStore.setAppCode(code)
//   location.href = `${location.origin}${MAIN_APP_SLOT_ROUTE_PATH}`
// }
</script>

<template>
  <div class="layout">
    <!-- <div class="layout__header">
      <BaseSelect
        class="min-w-150px"
        :clearable="false"
        :options="apps"
        @change="onChangeApp"
      />
    </div> -->
    <AppHeader class="layout__header" />

    <div class="layout__main-wrapper">
      <div class="layout__main">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  --header-height: 48px;
  --main-height: calc(100vh - var(--header-height));

  display: grid;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: var(--header-height) var(--main-height);
  min-block-size: 100vh;

  &__header {
    grid-area: header;
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
    }
  }
}
</style>
