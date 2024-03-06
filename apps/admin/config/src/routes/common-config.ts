import type { RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '../enums/route'

const commonConfig: RouteRecordRaw[] = [
  {
    path: RoutePath.commonConfig,
    name: RouteName.commonConfig,
    component: () => import('@admin-config/views/common-config/index.vue'),
  },
]

export default commonConfig
