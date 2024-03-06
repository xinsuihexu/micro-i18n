import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { UseModuleType } from '../enums'

export function install(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
}

export const moduleType = UseModuleType.PINIA
