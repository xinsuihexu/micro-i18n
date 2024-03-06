import { useTitle } from '@vueuse/core'
import type { App } from 'vue'
import type { UseModuleType } from '../enums'
import useAppStore from '../store/app'
import { THEME_COLOR, TITLE } from '../settings'
import { $t } from '../modules/i18n'
import { useToggleTheme } from './theme'

// @unocss-include
// function data() {
//   console.log(44444444)
//   return [
//     {
//       name: $t('权限中心'),
//       code: 'auth',
//       port: '6061',
//       active: false,
//       sort: 1,
//       menus: [
//         {
//           name: $t('应用管理'),
//           code: 'auth__app',
//           icon: 'i-carbon-home',
//           path: '/app-admin',
//           href: '',
//           visible: true,
//           children: [
//             {
//               name: $t('应用管理__详情页'),
//               code: 'auth__app__detail',
//               path: '/app-admin/detail',
//               href: '',
//               visible: false,
//             },
//             {
//               name: $t('应用管理__anchor'),
//               code: 'auth__app__anchor',
//               path: '/app-admin/anchor',
//               href: '',
//               visible: false,
//             },
//           ],
//         },
//         {
//           name: $t('菜单管理'),
//           code: 'auth__menu',
//           icon: 'i-carbon-home',
//           path: '/menu-admin',
//           href: '',
//           visible: true,
//           children: [],
//         },
//       ],
//     },

//     {
//       name: '配置中心',
//       code: 'config',
//       port: '6062',
//       active: true,
//       sort: 2,
//       menus: [
//         {
//           name: '通用配置',
//           code: 'config__common',
//           icon: 'i-carbon-home',
//           path: '/common-config',
//           href: '',
//           visible: true,
//           children: [],
//         },
//         {
//           name: '字典管理',
//           code: 'config__dict',
//           icon: 'i-carbon-home',
//           path: '/dict-admin',
//           href: '',
//           visible: true,
//           children: [],
//         },
//       ],
//     },
//   ] as any
// }

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

  // async function setApps() {
  //   const appStore = useAppStore()
  //   appStore.setApps(data())
  // }

  async function setUserInfo() {

  }

  async function setLanguages() {

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
    // setApps,
    setTitle,
    setTheme,
  }
}
