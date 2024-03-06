<script setup lang="ts">
import { RouteName } from '@admin-auth/enums/route'

// import useMicroStore from '@admin-auth/store/micro'
import BaseInfoTitle from '@admin/_share/components/base/base-info-title/index.vue'
import useMicroStore from '@admin/_share/store/micro'
import useTabStore from '@admin/_share/store/tab'
import { bus } from '@pkg/utils'
import { UseVirtualList } from '@vueuse/components'

defineOptions({ name: RouteName.appAdminDetail })

const microStore = useMicroStore()
const tabStore = useTabStore()

function onTest() {
  if (microStore.getIsMicro) {
    microStore.getBus.emit('main-close-tab', {
      tabCode: null,
      emitParams: {
        eventName: 'auth_app-admin-list',
        params: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
    })
  }
  else {
    bus.emit('main-close-tab', {
      tabCode: null,
      emitParams: {
        eventName: 'auth_app-admin-list',
        params: {
          a: 1,
          b: 2,
        },
      },
    })
  }
}
</script>

<template>
  <div class="page">
    <ElPageHeader class="page-header">
      <template #content>
        <span class="text-16px font-600"> 我是大标题详情页 </span>
      </template>
      <template #extra>
        <ElSpace>
          <ElButton>
            保存
          </ElButton>
          <ElButton type="primary">
            提交
          </ElButton>
        </ElSpace>
      </template>
    </ElPageHeader>

    <ElCard
      class="min-h-500px"
      shadow="never"
    >
      <!-- <BaseInfoTitle>
                <template #title>
                    我是标题
                </template>

                <template #operation>
                    我是操作
                </template>
            </BaseInfoTitle> -->
      <BaseInfoTitle title="我是标题" />
    </ElCard>

    <ElCard
      class="mt-12px min-h-200px"
      shadow="never"
    >
      <BaseInfoTitle title="我是虚拟列表" />

      <UseVirtualList
        :list="new Array(10000).fill(0).map((_, index) => ({ a: index }))"
        :options="{ itemHeight: 50 }"
        class="max-h-500px mt-12px"
      >
        <template #default="props">
          <div class="virtual-item">
            {{ props }}
          </div>
        </template>
      </UseVirtualList>
    </ElCard>

    <ElCard
      class="mt-12px min-h-200px"
      shadow="never"
    >
      <BaseInfoTitle title="我是标题" />
    </ElCard>

    <ElCard
      class="mt-12px min-h-200px"
      shadow="never"
    >
      <BaseInfoTitle title="我是标题" />
    </ElCard>

    <ElCard
      class="mt-12px min-h-200px"
      shadow="never"
    >
      <BaseInfoTitle title="我是标题" />
    </ElCard>

    <!-- <ElButton @click="onTest">
            关闭当前页并刷新应用管理页
        </ElButton> -->
  </div>

  <ElBacktop
    target=".app-main"
    :right="30"
    :bottom="30"
  />
</template>

<style lang="less" scoped>
.page {
  padding-block-end: 12px;
  padding-inline: 12px;
}

.page-header {
  position: sticky;
  z-index: 99;
  top: 0;

  background-color: var(--el-bg-color-page);

  padding-block: 12px;
}

.virtual-item {
  padding: 4px;

  border: 2px solid var(--el-border-color-light);
  border-radius: 6px;

  block-size: 30x;
  margin-block-end: 12px;
}
</style>
