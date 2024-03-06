<script setup lang="ts">
import { bus } from '@pkg/utils'
import useTabStore from '../../../store/tab'
import type { ITab } from '../../../store/tab'
import { isMicro } from '../../../utils/env'
import {
  DEFAULT_LANGUAGE,
  MAIN_APP_SLOT_ROUTE_PATH,
} from '../../../settings'

defineOptions({ name: 'AppTab' })

enum OperateType {
  REFRESH = 0,
  OTHER = 1,
  RIGHT = 2,
  LEFT = 3,
  ALL = 4,
}

const route = useRoute()
const router = useRouter()

const tabStore = useTabStore()

const paramsLanguage = computed(() => (new URLSearchParams(location.search).get('language') || DEFAULT_LANGUAGE))

function onContextMenu(type: OperateType, tab: ITab) {
  // if (type === OperateType.REFRESH)
  //     bus.emit('refresh', { appCode: tab.appCode, path: tab.path })

  if (type === OperateType.OTHER)
    tabStore.removeOtherTabs(tab.code)

  if (type === OperateType.RIGHT)
    tabStore.removeRightTabs(tab.code)

  if (type === OperateType.LEFT)
    tabStore.removeLeftTabs(tab.code)

  if (type === OperateType.ALL)
    tabStore.removeAllTabs()

  tab.popoverVisible = false
}

function getContextList(tab: ITab) {
  const list = [{
    type: OperateType.OTHER,
    name: '关闭其他',
    popoverVisible: false,
  }, {
    type: OperateType.RIGHT,
    name: '关闭右侧所有',
    popoverVisible: false,
  }, {
    type: OperateType.LEFT,
    name: '关闭左侧所有',
    popoverVisible: false,
  }, {
    type: OperateType.ALL,
    name: '关闭全部',
    popoverVisible: false,
  }]

  return tab.code === tabStore.getCurrentTabCode
    ? [
        // {
        //     type: OperateType.REFRESH,
        //     name: '重新加载',
        //     visible: false,
        // },
        ...list,
      ]
    : list
}

watch(() => tabStore.getCurrentTabCode, (currentTabCode) => {
  if (!currentTabCode)
    return

  if (isMicro(route)) {
    bus.emit('sub-route-change', {
      appCode: tabStore.currentTab!.appCode,
      path: tabStore.currentTab!.path,
    })
    router.push(`${MAIN_APP_SLOT_ROUTE_PATH}${tabStore.currentTab!.path}?language=${toValue(paramsLanguage)}`)
  }
  else {
    router.push(`${tabStore.currentTab!.path}?language=${toValue(paramsLanguage)}`)
  }
})

bus.on('main-close-tab', ({
  tabCode,
  emitParams,
}: { tabCode?: string, emitParams?: { eventName: string, params?: any } }) => {
  tabStore.removeTab(tabCode || tabStore.getCurrentTabCode)

  if (emitParams)
    bus.emit(emitParams.eventName, emitParams.params)
})

</script>

<template>
  <div class="app-tab">
    <div
      v-for="tab in tabStore.getTabs"
      :key="tab.code"
      class="app-tab__item bg-cool-gray-200 dark:bg-cool-gray-700 font-medium"
      :class="{ 'is-active': tab.code === tabStore.currentTabCode }"
      :tabindex="0"
      @click="tabStore.changeTab(tab.code)"
    >
      <ElPopover
        v-model:visible="tab.popoverVisible"
        :teleported="true"
        trigger="contextmenu"
        popper-class="app-tab__context"
      >
        <ul>
          <li
            v-for="item in getContextList(tab)"
            :key="item.type"
            class="context-item"
            @click="onContextMenu(item.type, tab)"
          >
            {{ item.name }}
          </li>
        </ul>

        <template #reference>
          <div class="app-tab__content">
            <span>{{ tab.name }}</span>
            <button
              v-if="tabStore.getTabs.length > 1"
              class="i-carbon-close hover:i-carbon-close-filled"
              @click.stop="tabStore.removeTab(tab.code)"
            />
          </div>
        </template>
      </ElPopover>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-tab {
  position: relative;

  display: grid;
  justify-content: start;

  background-color: var(--el-bg-color-page);

  block-size: 100%;
  border-block-end: 1px solid var(--el-border-color);
  gap: 1rem;
  grid-auto-flow: column;
  inline-size: 100%;
  overscroll-behavior-x: contain;
  padding-block-start: .8rem;
  padding-inline-end: 1rem;
  padding-inline-start: 1rem;
  scroll-snap-type: x mandatory;
}

.app-tab::-webkit-scrollbar {
  display: none;
}

.app-tab__item {
  position: relative;

  display: flex;
  overflow: hidden;
  align-items: center;

  cursor: pointer;
  word-break: keep-all;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  border-block-start: 1px solid transparent;
  inline-size: max-content;
  scroll-snap-align: center;
}

.app-tab__item.is-active {
  color: var(--el-color-primary);
  border-top-color: var(--el-color-primary);
  background-color: var(--el-bg-color);
}

.app-tab__content {
  display: grid;

  column-gap: 12px;
  grid-auto-flow: column;
  padding-block: 0;
  padding-inline: 12px;
  place-items: center;
}

.context-item {
  display: grid;

  cursor: pointer;

  padding-block: 8px;
  padding-inline: 0;
  place-items: center;

  &:hover {
    background-color: var(--el-bg-color-page);
  }
}

</style>
