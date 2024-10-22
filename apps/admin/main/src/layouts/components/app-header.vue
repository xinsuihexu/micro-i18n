<script setup lang="ts">
import useAppStore from '@admin/_share/store/app'
import type { CodeEnvType } from '@admin/_share/enums'
import { MAIN_APP_SLOT_ROUTE_PATH } from '@admin/_share/settings'
import BaseSelect from '@admin/_share/components/base/form/base-select/index.vue'
import Language from '@admin/_share/layouts/components/language/index.vue'
import User from '@admin/_share/layouts/components/user/index.vue'

const appStore = useAppStore()

const apps = computed(() => appStore.apps.map(({
  name,
  code,
}) => ({
  label: name,
  value: code,
})))

function onChangeApp(code: CodeEnvType) {
  appStore.setAppCode(code)
  location.href = `${location.origin}${MAIN_APP_SLOT_ROUTE_PATH}`
}
</script>

<template>
  <div class="app-header">
    <h1
      font-bold
      text-xl
      flex
      justify-center
      items-center
    >
      国际化中后台系统
    </h1>

    <div class="app-header__right">
      <BaseSelect
        class="min-w-150px"
        :clearable="false"
        :options="apps"
        @change="onChangeApp"
      />

      <ElDivider direction="vertical" />

      <Language />

      <ElDivider direction="vertical" />

      <User />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-header {
  display: flex;
  align-items: center;

  border-block-end: 1px solid var(--el-menu-border-color);
  gap: 8px;
  padding-block: 12px;
  padding-inline: 12px;
}

.app-header__right {
  display: flex;
  align-items: center;

  column-gap: 12px;
  margin-inline-start: auto;
}
</style>
