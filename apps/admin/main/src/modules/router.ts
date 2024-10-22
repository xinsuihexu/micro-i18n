import { UseModuleType } from '@admin/_share/enums'
import {
  createPageTitleGuard,
  createPermissionGuard,
  createProgressGuard,
  createRouteMapGuard,
} from '@admin/_share/route-guards'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes = Object
  .values(import.meta.glob('../routes/*.ts', { eager: true }))
  .map((route: any) => route.default)
  .flat()

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    ...routes,
    {
      path: '/login',
      name: 'login',
      component: () => import('@admin/_share/pages/login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@admin/_share/pages/404/index.vue'),
    },
  ],
})

function createGuards(router: Router) {
  createPermissionGuard({ router, isMainApp: true })
  createProgressGuard(router)
  createRouteMapGuard(router, {})
  createPageTitleGuard(router)
}

export function install(app: App) {
  createGuards(router)
  app.use(router)
}

export const moduleType = UseModuleType.ROUTER
