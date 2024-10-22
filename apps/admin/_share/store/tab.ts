import { defineStore } from 'pinia'
import type { Emitter } from 'mitt'
import { Tree } from '@pkg/utils'
import parseUrl from 'parse-url'
import { isMicro } from '../utils/env'
import useMenuStore from './menu'
import useAppStore from './app'
import type { IMenu } from './menu'

export interface ITab extends IMenu {
  popoverVisible?: boolean
  query?: Record<string, any>
  active?: boolean
}

interface IState {
  currentTabCode: string
  tabs: ITab[]
}

export const useTabStore = defineStore({
  id: 'tab-store',

  state: (): IState => ({
    currentTabCode: '',
    tabs: [],
  }),

  getters: {
    getCurrentTabCode: state => state.currentTabCode,

    currentTab: state => state.tabs.find(tab => tab.code === state.currentTabCode),

    currentTabPos: state => state.tabs.findIndex(tab => tab.code === state.currentTabCode),

    tabCodes: state => state.tabs.map(tab => tab.code),

    getTabs: state => state.tabs,
  },

  actions: {
    changeTab(code?: string) {
      if (!code) {
        code = this.tabs[
          this.currentTabPos === 0
            ? this.tabs.length - 1
            : this.currentTabPos - 1
        ].code
      }
      this.currentTabCode = code
    },

    addTab(tab: ITab) {
      if (!tab)
        return

      if (this.tabCodes.includes(tab.code)) {
        this.currentTabCode = tab.code
        this.changeTab(tab.code)
        return
      }

      // 手动添加上url参数,用于切换tab时可以保留参数状态
      const appStore = useAppStore()
      let query = Object.create(null)
      for (const [k, v] of new URLSearchParams(location.search).entries()) {
        if (isMicro(location.pathname) && k === appStore.getAppCode) {
          query = parseUrl(`${location.origin}${v}`).query
        }
        else {
          query[k] = v
        }
      }
      tab.query = query

      this.tabs.push(tab)
      this.changeTab(tab.code)
    },

    removeTab(code?: string) {
      if (!code)
        code = this.currentTabCode

      const removeIndex = this.tabs.findIndex(tab => tab.code === code)

      if (this.currentTabCode === code)
        this.currentTabCode = this.tabs[removeIndex > 0 ? removeIndex - 1 : removeIndex + 1].code

      this.tabs.splice(removeIndex, 1)
    },

    removeTabByEmit(bus: Emitter<Record<string, any>>, params: { tabCode?: string, emitParams?: { eventName: string, params?: any } }) {
      bus.emit('main-close-tab', params)
    },

    removeRightTabs(code: string) {
      const removePreIndex = this.tabs.findIndex(tab => tab.code === code)
      this.tabs = this.tabs.slice(0, removePreIndex + 1)

      if (this.getTabs.length === 1 && this.currentTab?.code !== code)
        this.changeTab(code)
    },

    removeLeftTabs(code: string) {
      const removePreIndex = this.tabs.findIndex(tab => tab.code === code)
      this.tabs = this.tabs.slice(removePreIndex)

      if (this.getTabs.length === 1 && this.currentTab?.code !== code)
        this.changeTab(code)
    },

    removeOtherTabs(code: string) {
      this.removeRightTabs(code)
      this.removeLeftTabs(code)
    },

    removeAllTabs() {
      this.tabs = []
      const [firstMenu] = useMenuStore().getMenus
      this.addTab(firstMenu)
    },

    updateTabs(tabs: ITab[]) {
      this.tabs.forEach((tab) => {
        const _tab = new Tree().findNode(tabs, ({ code }: ITab) => code === tab.code)
        Object.assign(tab, _tab)
      })
    },
  },

  persist: true,
})

export default useTabStore
