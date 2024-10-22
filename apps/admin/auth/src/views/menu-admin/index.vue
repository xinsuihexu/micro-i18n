<script setup lang="ts">
import { RouteName } from '@admin/auth/enums/route'
import BasePagination from '@admin/_share/components/base/base-pagination/index.vue'
import BaseTable from '@admin/_share/components/base/base-table/index.vue'
import BaseSelect from '@admin/_share/components/base/form/base-select/index.vue'
import UiFormSearch from '@admin/_share/components/business/ui-form-search/index.vue'
import UiPageListContainer from '@admin/_share/components/business/ui-page-list-container/index.vue'
import useMicroStore from '@admin/_share/store/micro'
import dayjs from 'dayjs'
import { ElInput } from 'element-plus'

defineOptions({ name: RouteName.appAdmin })

interface IState {
  editingRowKeys: string[]
  pagination: {
    page: number
    size: number
    total: number
  }
  tableData: any
  schemas: any
}

const {
  $t,
  getBus,
} = useMicroStore()

// const steps = [
//   {
//     target: 'g-base-guide-test',
//     placement: 'bottom' as any,
//     popper: {
//       title: '标题1',
//       content: '内容1',
//     },
//   },
//   {
//     target: 'g-base-guide-test1',
//     placement: 'bottom',
//     popper: {
//       title: '标题2',
//       content: '内容2',
//     },
//   },
// ]

const columns = [
  {
    type: 'selection',
    width: 38,
  },
  {
    prop: 'a',
    label: $t('标题'),
    editable: true,
    editConfig: {
      component: BaseSelect,
      props: {
        api: async () => [{
          label: 'aaaaaaahe',
          value: '11111',
        }, {
          label: 'bbbbbbaaaaaaa',
          value: '222222',
        }, {
          label: 'cccccc',
          value: '33333',
        }, {
          label: 'dddddddd',
          value: '444444',
        }],
        apiParams: {
          a: 1,
          b: 2,
        },
        multiple: false,
      },
      listeners: {},
    },
    formatter: (row: any) => {
      return `我是格式化后的${row.a}`
    },
  },
  {
    prop: 'b',
    label: $t('标题'),
    editable: true,
    editConfig: {
      component: 'el-input',
      unEditingType: 'text',
      props: {},
      listeners: {},
    },
    required: true,
    rules: {
      required: true,
      message: $t('请输入标题'),
      trigger: 'blur',
    },
  },
  {
    prop: 'c',
    label: $t('是否开启'),
    editable: true,
    editConfig: {
      component: 'el-switch',
      unEditingType: 'disabled',
      props: {
        inlinePrompt: true,
        activeText: $t('是'),
        inactiveText: $t('否'),
      },
    },
  },
  // {
  //     slot: 'name',
  //     prop: 'c',
  //     label: '标题c',
  // },
  {
    label: $t('操作'),
    slot: 'operation',
    width: 130,
  },
]

const baseTable = ref()

const state = reactive<IState>({
  editingRowKeys: ['1', '2', '3'],
  pagination: {
    page: 1,
    size: 20,
    total: 100,
  },
  tableData: [
    {
      id: '1',
      a: '11111',
      b: 2,
      c: 1,
    },
    {
      id: '2',
      a: 3,
      b: '',
      c: 0,
    },
    {
      id: '3',
      a: '222222',
      b: '',
      c: 1,
    },
    {
      id: '4',
      a: '333333',
      b: 'hello',
      c: 0,
    },
    {
      id: '5',
      a: 3,
      b: 'hello',
      c: 1,
    },
    {
      id: '6',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '7',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '8',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '9',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '10',
      a: 3,
      b: 'hello',
      c: 1,
    },
    {
      id: '11',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '12',
      a: 3,
      b: 'hello',
      c: 1,
    },
    {
      id: '13',
      a: 3,
      b: 'hello',
      c: 1,
    },
    {
      id: '14',
      a: 3,
      b: 'hello',
      c: 0,
    },
    {
      id: '15',
      a: 3,
      b: 'hello',
      c: 1,
    },
  ],
  schemas: [
    {
      title: $t('输入框:'),
      field: 'test',
      column: 1,
      component: {
        vm: 'el-input',
        value: 'qwe',
        props: { placeholders: $t('请输入') },
        listeners: {
          change(v: string) {
            console.log('change>>>>', v, state)
          },
        },
      },
    },
    {
      title: $t('测试标题:'),
      field: 'test5',
      column: 1,
      component: {
        vm: ElInput,
        value: 'qwe',
        props: {
          placeholders: $t('请输入test'),
          // disabled: true,
        },
        listeners: {
          change(v: string) {
            console.log('change>>>>', v)
          },
        },
      },
    },
    {
      title: $t('测试标题:'),
      field: 'test6',
      column: 1,
      component: {
        vm: 'ElInput',
        value: 'qwe',
        props: {
          placeholders: $t('请输入test'),
          // disabled: true,
        },
        listeners: {
          change(v: string) {
            console.log('change>>>>', v)
          },
        },
      },
    },
    // {
    //     title: '测试标题:',
    //     field: 'test7',
    //     column: 1,
    //     component: {
    //         vm: ElInput,
    //         value: 'qwe',
    //         props: {
    //             placeholders: '请输入test',
    //         // disabled: true,
    //         },
    //         listeners: {
    //             change(v: string) {
    //                 console.log('change>>>>', v)
    //             },
    //         },
    //     },
    // },
    {
      title: $t('下拉框:'),
      field: 'test1',
      column: 1,
      component: {
        vm: BaseSelect,
        value: '',
        props: {
          // options: [{ label: 'a', value: '11111' }, { label: 'b', value: '222222' }],
          api: async () => [{
            label: 'aaaaaaahe',
            value: '11111',
          }, {
            label: 'bbbbbbaaaaaaa',
            value: '222222',
          }, {
            label: 'cccccc',
            value: '33333',
          }, {
            label: 'dddddddd',
            value: '444444',
          }],
          apiParams: {
            a: 1,
            b: 2,
          },
          multiple: true,
          placeholders: $t('请选择'),
        },
        listeners: {
          change(v: string) {
            console.log('change>>>>', v)
          },
        },
      },
    },
    {
      title: $t('日期:'),
      field: 'test2',
      column: 2,
      component: {
        vm: 'el-date-picker',
        value: [dayjs().subtract(2, 'month').format('YYYY-MM-DD HH:mm:ss'), dayjs().add(2, 'month').format('YYYY-MM-DD HH:mm:ss')],
        props: {
          type: 'datetimerange',
          valueFormat: 'x',
          defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)],
        },
        listeners: {
          change(v: string) {
            console.log('change>>>>', v)
          },
        },
      },
    },
  ],
})

// const [start] = useBaseGuide(steps)
// start()

function onSearch(model: any) {
  console.log({ model })
}

function onReset(model: any) {
  console.log({ model })
}

async function onEdit(row: any) {
  // await toValue(baseTable).form.validate((valid, fields) => {
  //     if (valid)
  //         console.log('submit!')

  //     else
  //         console.log('error submit!', fields)
  // })
  const index = state.editingRowKeys.findIndex(key => key === row.id)

  if (index === -1)
    state.editingRowKeys.push(row.id)
  else
    state.editingRowKeys.splice(index, 1)
}

onMounted(() => {
  getBus.on('test', (params) => {
    console.log({ params })
  })
})
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
          id="g-base-guide-test"
          type="primary"
        >
          {{ $t('按钮1') }}
        </ElButton>

        <ElButton
          id="g-base-guide-test1"
          plain
        >
          {{ $t('按钮2') }}
        </ElButton>

        <!-- <BaseEllipsis :tooltip="{ content: '123' }">
                    <div>
                        人生自古无死，留取丹心赵汗青，和手动阀大放送大法萨芬
                    </div>
                </BaseEllipsis> -->
      </ElSpace>
    </template>

    <template #table>
      <BaseTable
        ref="baseTable"
        row-key-prop="id"
        :columns="columns"
        :data="state.tableData"
        :editing-row-keys="state.editingRowKeys"
      >
        <!-- <template #name="{ row }">
                    {{ row.c }}
                </template> -->

        <template #operation="{ row }">
          <ElButton @click="onEdit(row)">
            {{ state.editingRowKeys.includes(row.id) ? $t('取消编辑') : $t('编辑') }}
          </ElButton>
        </template>
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

  <!-- <BaseGuide :steps="steps" /> -->
</template>
