import { defineStore } from 'pinia'
import { Tree } from '@pkg/utils'
import type { IMenu } from './menu'
import useMenuStore from './menu'
import useTabStore from './tab'
import useLocaleStore from './locale'

interface IApp {
  name: string
  code: string
  url: string
  active: boolean
  sort: number
  menus: IMenu[]
}

interface IState {
  appCode: string
  apps: IApp[]
}

export const useAppStore = defineStore({
  id: 'app-store',

  state: (): IState => ({
    appCode: '',
    apps: [],
  }),

  getters: {
    getAppCode: state => state.appCode,

    getApps: state => state.apps,
  },

  actions: {
    getMenus(appCode: string) {
      const menus = this.apps.find(app => app.code === appCode)?.menus ?? []
      new Tree().traversal(menus, (menu: IMenu) => {
        menu.appCode = appCode
      })
      return menus
    },

    setAppCode(code: string): IMenu[] {
      this.appCode = code

      const tabStore = useTabStore()
      tabStore.removeAllTabs()

      const menus = this.getMenus(this.appCode)

      const menuStore = useMenuStore()
      menuStore.setMenus(menus)

      return menus
    },

    setApps(list: IApp[], appCode?: string) {
      this.apps = list

      const localeStore = useLocaleStore()
      console.log(this.appCode, localeStore.isLanguageChange)
      if (localeStore.isLanguageChange) {
        const menus = this.getMenus(this.appCode)

        const menuStore = useMenuStore()
        menuStore.updateMenus(menus)

        const tabStore = useTabStore()
        tabStore.updateTabs(menus)

        return
      }

      if (this.appCode)
        return

      const [firstApp] = this.apps
      const activeApp = this.apps.find(app => app.active)!

      this.setAppCode(appCode || (activeApp ? activeApp.code : firstApp.code))
    },
  },

  persist: true,
})

export default useAppStore
