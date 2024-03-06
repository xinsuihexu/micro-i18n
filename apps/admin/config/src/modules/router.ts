import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routes = Object
  .values(import.meta.glob('../routes/*.ts', { eager: true }))
  .map((route: any) => route.default)
  .flat()

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
  ],
})

export function install(app: App) {
  app.use(router)
}
