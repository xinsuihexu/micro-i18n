import { defineStore } from 'pinia'
import useTabStore from './tab'

export interface IMenu {
  name: string
  code: string
  appCode: string
  path: string
  visible: boolean
  href?: string
  icon?: string
  children: IMenu[]
}

interface IState {
  menus: IMenu[]
}

export const useMenuStore = defineStore({
  id: 'menu-store',

  state: (): IState => ({
    menus: [],
  }),

  getters: {
    getMenus: state => state.menus,
  },

  actions: {
    setMenus(list: IMenu[]) {
      this.menus = list

      const tabStore = useTabStore()
      tabStore.removeAllTabs()
      tabStore.addTab(this.menus[0])
    },

    updateMenus(list: IMenu[]) {
      this.menus = list
    },
  },

  persist: true,
})

export default useMenuStore
