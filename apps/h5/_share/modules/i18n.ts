import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { UseModuleType } from '../enums'

export const i18n = createI18n({
  legacy: false,
})

export const $t = i18n.global.t

export function install(app: App) {
  app.use(i18n)
}

export const moduleType = UseModuleType.I18N
