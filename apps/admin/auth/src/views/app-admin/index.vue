<script setup lang="ts">
import { RouteName } from '@admin/auth/enums/route'
import {
  RouteName as ConfigRouteName,
  RoutePath,
} from '@admin/config/src/enums/route'
import BasePagination from '@admin/_share/components/base/base-pagination/index.vue'
import BaseTable from '@admin/_share/components/base/base-table/index.vue'
import UiFormSearch from '@admin/_share/components/business/ui-form-search/index.vue'
import UiPageListContainer from '@admin/_share/components/business/ui-page-list-container/index.vue'
import useMicroStore from '@admin/_share/store/micro'
import { AppCodeType } from '@admin/_share/enums/index'
import {
  columns,
  schemas,
} from './config'
import type { IState } from './type'

defineOptions({ name: RouteName.appAdmin })

const state = reactive<IState>({
  schemas,
  tableData: [],
  pagination: {
    page: 1,
    size: 20,
    total: 0,
  },
})

const {
  $t,
  getProps,
} = useMicroStore()

const router = useRouter()

function onSearch(model: any) {
  console.log({ model })
}

function onReset(model: any) {
  console.log({ model })
}

function onAdd() {
  // getProps.jump({
  //   appCode: AppCodeType.CONFIG,
  //   menuCode: ConfigRouteName.home,
  //   path: RoutePath.home,
  //   query: {
  //     a: 1,
  //     b: 2,
  //   },
  // })
  router.push({
    path: '/menu-admin',
    query: {
      a: 2,
      b: 4,
    },
  })
}
</script>

<template>
  <UiPageListContainer>
    <template #search>
      <UiFormSearch
        :schemas="state.schemas"
        @reset="onReset"
        @search="onSearch"
      />
    </template>

    <template #operation>
      <ElSpace wrap>
        <ElButton
          type="primary"
          @click="onAdd"
        >
          {{ $t('新增') }}
        </ElButton>
      </ElSpace>
    </template>

    <template #table>
      <BaseTable
        row-key-prop="id"
        :columns="columns"
        :data="state.tableData"
      >
        1111
      </BaseTable>
    </template>

    <template #pagination>
      <BasePagination
        v-if="state.pagination.total > 0"
        v-model:page="state.pagination.page"
        v-model:size="state.pagination.size"
        :total="state.pagination.total"
      />
    </template>
  </UiPageListContainer>
</template>
