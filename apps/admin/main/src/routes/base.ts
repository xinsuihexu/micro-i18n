import type { RouteRecordRaw } from 'vue-router'
import { MAIN_APP_SLOT_ROUTE_PATH } from '@admin/_share/settings'

const base: RouteRecordRaw[] = [
  // {
  //     path: '/:appCode(sub-\\w*)/:path*',
  //     component: () => import('@admin-main/layouts/default.vue'),
  // },
  // {
  //   path: MAIN_APP_SLOT_ROUTE_PATH,
  //   component: () => import('@admin/_share/layouts/default.vue'),
  // },
  {
    path: `${MAIN_APP_SLOT_ROUTE_PATH}/:path(.*)`,
    component: () => import('@admin/_share/layouts/default.vue'),
  },
  {
    path: '/login',
    component: () => import('@admin/_share/layouts/default.vue'),
    children: [
      {
        path: '/login',
        component: () => import('@admin-main/views/login/index.vue'),
      },
    ],
  },
]

export default base
