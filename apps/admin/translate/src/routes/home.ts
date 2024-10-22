import type { RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '../enums/route'
// import useMicroStore from '@admin/_share/store/micro'

// const { $t } = useMicroStore()

const home: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: RoutePath.home
  },
  {
    path: RoutePath.home,
    name: RouteName.home,
    component: () => import('@admin/translate/views/home/index.vue'),
    meta: {
      // title: $t('子应用-首页')
    }
  },
]

export default home
