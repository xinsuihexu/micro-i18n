import BaseSelect from '@admin/_share/components/base/form/base-select/index.vue'
import useMicroStore from '@admin/_share/store/micro'

const { $t } = useMicroStore()

export const schemas = [
  {
    title: $t('状态:'),
    field: 'status',
    column: 1,
    component: {
      vm: BaseSelect,
      value: '',
      props: {
        api: async () => [{
          label: '开启',
          value: '1',
        }, {
          label: '关闭',
          value: '2',
        }],
        apiParams: {
          a: 1,
          b: 2,
        },
        multiple: true,
        placeholders: $t('全部'),
      },
      listeners: {
        change(v: string) {
          console.log('change>>>>', v)
        },
      },
    },
  },
]

export const columns = [
  {
    prop: 'appName',
    label: $t('应用名'),
  },
  {
    prop: 'appId',
    label: $t('应用id'),
  },
  {
    prop: 'status',
    label: $t('状态'),
  },
  {
    prop: 'createTime',
    label: $t('创建时间'),
    formatter: (row: any) => {
      return `我是格式化后的时间`
    },
  },
  {
    prop: 'createName',
    label: $t('创建人'),
  },
  {
    prop: 'modifyTime',
    label: $t('修改时间'),
    formatter: (row: any) => {
      return `我是格式化后的时间`
    },
  },
  {
    prop: 'modifyName',
    label: $t('修改人'),
  },
  {
    label: $t('操作'),
    slot: 'operation',
    width: 130,
  },
]
