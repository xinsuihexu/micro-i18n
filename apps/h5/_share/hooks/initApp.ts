import type { App } from 'vue'
import type { LanguageType, UseModuleType } from '../enums'
import useLocaleStore from '../store/locale'
import { DEFAULT_LANGUAGE, THEME_COLOR, TITLE } from '../settings'
import { i18n } from '../modules/i18n'
import { useToggleTheme } from './theme'

export function useInitApp(app: App) {
  function installModules(modules: UseModuleType[], cb?: () => any) {
    Object.values(import.meta.glob('../modules/*.ts', { eager: true }))
      .forEach((i: any) => {
        const isNeedInstall = modules.includes(i?.moduleType)

        if (isNeedInstall)
          i?.install(app)
      })

    cb?.()
  }

  async function setUserInfo() {

  }

  async function setLanguages(cb?: () => any) {
    const localeStore = useLocaleStore()
    const paramsLanguage = new URLSearchParams(location.search).get('language') as any

    localeStore.setLanguage(
      paramsLanguage || DEFAULT_LANGUAGE,
      (language: LanguageType, locale: any) => {
        i18n.global.locale.value = language
        i18n.global.setLocaleMessage(language, locale)

        cb?.()
      },
    )

    return paramsLanguage || DEFAULT_LANGUAGE
  }

  function setTheme(color?: string) {
    if (color || THEME_COLOR)
      useToggleTheme(color || THEME_COLOR)
  }

  return {
    installModules,
    setUserInfo,
    setLanguages,
    setTheme,
  }
}
