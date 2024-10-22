import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import {
  createPageTitleGuard,
  createPermissionGuard,
  createProgressGuard,
  createRouteMapGuard,
} from '@admin/_share/route-guards'
import { AppCodeType, UseModuleType } from '@admin/_share/enums'

const routes = Object
  .values(import.meta.glob('../routes/*.ts', { eager: true }))
  .map((route: any) => route.default)
  .flat()

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    ...routes,
  ],
})

function createGuards(router: Router) {
  createPermissionGuard({ router })
  createProgressGuard(router)
  createRouteMapGuard(router, {})
  createPageTitleGuard(router)
}

export function install(app: App) {
  createGuards(router)
  app.use(router)
}

export const moduleType = UseModuleType.ROUTER
