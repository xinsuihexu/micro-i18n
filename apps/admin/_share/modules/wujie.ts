import WuJie from 'wujie-vue3'
import type { App } from 'vue'
import { setup } from '../wujie'
import { UseModuleType } from '../enums'

export function install(app: App) {
  setup()
  app.use(WuJie)
}

export const moduleType = UseModuleType.WUJIE
