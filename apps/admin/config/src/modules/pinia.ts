import { type App, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { router } from './router'

export function install(app: App) {
  const pinia = createPinia()

  pinia.use(piniaPersist)
  pinia.use(({ store }) => {
    store.$router = markRaw(router) as any
  })

  app.use(pinia)
}
