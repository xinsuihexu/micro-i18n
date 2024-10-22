import { useTitle } from '@vueuse/core'
import type { App } from 'vue'
import type { AppCodeType, LanguageType, UseModuleType } from '../enums'
import useAppStore from '../store/app'
import useLocaleStore from '../store/locale'
import { DEFAULT_LANGUAGE, THEME_COLOR, TITLE } from '../settings'
import { $t, i18n } from '../modules/i18n'
import { useToggleTheme } from './theme'

// @unocss-include
function data() {
  return [
    {
      name: $t('权限中心'),
      code: 'auth',
      port: '6061',
      active: true,
      sort: 1,
      menus: [
        {
          name: $t('应用管理'),
          code: 'auth__app',
          icon: 'i-carbon-home',
          path: '/app-admin',
          href: '',
          visible: true,
          children: [
            {
              name: $t('应用管理__详情页'),
              code: 'auth__app__detail',
              path: '/app-admin/detail',
              href: '',
              visible: false,
            },
            {
              name: $t('应用管理__anchor'),
              code: 'auth__app__anchor',
              path: '/app-admin/anchor',
              href: '',
              visible: false,
            },
          ],
        },
        {
          name: $t('菜单管理'),
          code: 'auth__menu',
          icon: 'i-carbon-home',
          path: '/menu-admin',
          href: '',
          visible: true,
          defaultShow: true,
          children: [],
        },
      ],
    },

    {
      name: '配置中心',
      code: 'config',
      port: '6062',
      active: false,
      sort: 2,
      menus: [
        {
          name: '首页',
          code: 'configHome',
          icon: 'i-carbon-home',
          path: '/home',
          href: '',
          visible: true,
          children: [],
        },
      ],
    },

    {
      name: '翻译中心',
      code: 'translate',
      port: '6063',
      active: false,
      sort: 2,
      menus: [
        {
          name: '首页',
          code: 'translate_home',
          icon: 'i-carbon-home',
          path: '/home',
          href: '',
          visible: true,
          children: [],
        },
      ],
    },
  ] as any
}

export function useInitApp(app: App) {
  function installModules(modules: UseModuleType[], cb?: Function) {
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

  async function setConfigInfo() {

  }

  async function setApps(appCode?: AppCodeType) {
    const localeStore = useLocaleStore()
    const appStore = useAppStore()
    appStore.setApps(data(), appCode)
  }

  async function setLanguages(cb?: Function) {
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

  function setTitle(title?: string) {
    useTitle(title || TITLE)
  }

  function setTheme(color?: string) {
    if (color || THEME_COLOR)
      useToggleTheme(color || THEME_COLOR)
  }

  return {
    installModules,
    setUserInfo,
    setLanguages,
    setApps,
    setTitle,
    setTheme,
  }
}
