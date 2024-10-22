<script lang="ts" setup>
import { bus } from '@pkg/utils'
import useAppStore from '../../../store/app'
import useTabStore from '../../../store/tab'
import Fullscreen from '../fullscreen/index.vue'
import Breadcrumb from '../breadcrumb/index.vue'
import User from '../user/index.vue'
import { isMicro } from '../../../utils/env'
import { APP_URL_MAP } from '../../../settings'
import BaseSelect from '../../../components/base/form/base-select/index.vue'
import Language from '../language/index.vue'

defineOptions({ name: 'AppHeader' })

const { isCollapse } = defineProps<IProps>()

const emit = defineEmits(['update:isCollapse'])

interface IProps {
  isCollapse: boolean
}

const route = useRoute()

const appStore = useAppStore()
const tabStore = useTabStore()

const apps = computed(() => appStore.apps.map(({
  name,
  code,
}) => ({
  label: name,
  value: code,
})))

function onChangeApp(code: string) {
  if (code === appStore.getAppCode)
    return

  if (isMicro(route.path)) {
    const [firstMenu] = appStore.setAppCode(code)
    tabStore.addTab(firstMenu)

    nextTick(() => {
      setTimeout(() => {
        bus.emit('sub-route-change', {
          appCode: code,
          path: '/',
        })
      }, 1000)
    })
  }
  else {
    location.href = APP_URL_MAP[code][import.meta.env.VITE_ENV]
  }
}
</script>

<template>
  <div class="app-header">
    <div
      flex
      items-center
      gap-8px
    >
      <button
        transition
        duration-200
        ease-in-out
        hover:scale-120
        class="i-carbon-fit-to-width text-lg"
        @click="emit('update:isCollapse', !isCollapse)"
      />

      <Fullscreen />
    </div>

    <BreadCrumb class="ml-12px mr-12px" />

    <div class="app-header__right">
      <BaseSelect
        v-if="appStore.getAppCode"
        class="min-w-150px"
        :clearable="false"
        :model-value="appStore.getAppCode"
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
