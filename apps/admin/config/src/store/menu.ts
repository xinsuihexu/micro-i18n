import { defineStore } from 'pinia'

export interface IMenu {
  name: string
  code: string
  to?: string
  href?: string
  icon?: string
  children?: IMenu[]
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
    },
  },

  persist: true,
})

export default useMenuStore
