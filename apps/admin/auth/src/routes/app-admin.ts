import type { RouteRecordRaw } from 'vue-router'
import { RouteName, RoutePath } from '../enums/route'

const appAdmin: RouteRecordRaw[] = [
  {
    path: RoutePath.appAdmin,
    name: RouteName.appAdmin,
    component: () => import('@admin/auth/views/app-admin/index.vue'),
    meta: {
      title: '权限中心-应用管理',
    },
  },
  {
    path: RoutePath.appAdminDetail,
    name: RouteName.appAdminDetail,
    component: () => import('@admin/auth/views/app-admin/pages/detail.vue'),
    meta: {
      title: '权限中心-应用管理-详情',
    },
  },
  {
    path: RoutePath.appAdminAnchor,
    name: RouteName.appAdminAnchor,
    component: () => import('@admin/auth/views/app-admin/pages/anchor.vue'),
    meta: {
      title: '权限中心-应用管理-锚点',
    },
  },
]

export default appAdmin
