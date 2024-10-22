<script setup lang="ts">
import Layout from '@admin/_share/layouts/default.vue'
import useLocaleStore from '@admin/_share/store/locale'
import useMicroStore from '@admin/_share/store/micro'
import { APP_CODE } from './settings'

const show = ref(false)

const route = useRoute()

const localeStore = useLocaleStore()
const microStore = useMicroStore()

if (microStore.getIsMicro) {
  microStore.startWatch(APP_CODE)
}

const isNeedLayout = computed(() => {
  return !['login', '404'].includes(route.name as string) && !microStore.getIsMicro
})

const locale = computed(() => {
  return microStore.getIsMicro
    ? microStore.getLocale
    : localeStore.getLocale
})

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 10)
})

</script>

<template>
  <ElConfigProvider
    v-if="show"
    :locale="locale"
  >
    <Layout v-if="isNeedLayout">
      <div class="app-main">
        <RouterView v-slot="{ Component: C }">
          <KeepAlive>
            <Component :is="C" />
          </KeepAlive>
        </RouterView>
      </div>
    </Layout>

    <div
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
  </ElConfigProvider>
</template>

<style lang="less" scoped>
.app-main {
  overflow: auto;

  block-size: 100%;
}
</style>
