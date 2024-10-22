import type { RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '../enums/route'

const menuAdmin: RouteRecordRaw[] = [
  {
    path: RoutePath.menuAdmin,
    name: RouteName.menuAdmin,
    component: () => import('@admin/auth/views/menu-admin/index.vue'),
    meta: {
      title: '权限中心-菜单管理',
    },
  },
]

export default menuAdmin
