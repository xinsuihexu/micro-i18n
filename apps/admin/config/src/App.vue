<script setup lang="ts">
import Layout from '@admin/_share/layouts/default.vue'
import useLocaleStore from '@admin/_share/store/locale'
import useMicroStore from '@admin/_share/store/micro'
import { APP_CODE } from './settings'

const localeStore = useLocaleStore()
const microStore = useMicroStore()

if (microStore.getIsMicro) {
  microStore.startWatch(APP_CODE)
}

const locale = computed(() => {
  return microStore.getIsMicro
    ? microStore.getLocale
    : localeStore.getLocale
})

</script>

<template>
  <ElConfigProvider :locale="locale">
    <div
      v-if="microStore.getIsMicro"
      class="app-main"
    >
      <RouterView
        v-slot="{ Component: C }"
      >
        <KeepAlive>
          <Component :is="C" />
        </KeepAlive>
      </RouterView>
    </div>

    <Layout v-else>
      <div class="app-main">
        <RouterView v-slot="{ Component: C }">
          <KeepAlive>
            <Component :is="C" />
          </KeepAlive>
        </RouterView>
      </div>
    </Layout>
  </ElConfigProvider>
</template>

<style lang="less" scoped>
.app-main {
  overflow: auto;

  block-size: 100%;
}

</style>
