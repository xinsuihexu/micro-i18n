import type { RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '../enums/route'

const dictAdmin: RouteRecordRaw[] = [
  {
    path: RoutePath.dictAdmin,
    name: RouteName.dictAdmin,
    component: () => import('@admin-config/views/dict-admin/index.vue'),
  },
]

export default dictAdmin
