import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '../style/reset.css'
import '../style/dark.css'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import '../style/common.css'
import type { App } from 'vue'
import { UseModuleType } from '../enums'

function registerComponent(app: App) {
  app.use(ElementPlus)
}

function registerIcons(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)
}

export function install(app: App) {
  registerComponent(app)
  registerIcons(app)
}

export const moduleType = UseModuleType.UI
