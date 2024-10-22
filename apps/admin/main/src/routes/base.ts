import type { RouteRecordRaw } from 'vue-router'
import { MAIN_APP_SLOT_ROUTE_PATH } from '@admin/_share/settings'

const base: RouteRecordRaw[] = [
  // {
  //     path: '/:appCode(sub-\\w*)/:path*',
  //     component: () => import('@admin/main/layouts/default.vue'),
  // },
  // {
  //   path: MAIN_APP_SLOT_ROUTE_PATH,
  //   component: () => import('@admin/_share/layouts/default.vue'),
  // },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@admin/main/layouts/default.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@admin/main/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: `${MAIN_APP_SLOT_ROUTE_PATH}`,
    component: () => import('@admin/_share/layouts/default.vue'),
  },
]

export default base
