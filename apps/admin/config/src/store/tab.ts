import { defineStore } from 'pinia'
import type { IMenu } from './menu'

interface IState {
  currentTabCode: string
  tabs: IMenu[]
}

export const useTabStore = defineStore({
  id: 'tab-store',

  state: (): IState => ({
    currentTabCode: '',
    tabs: [],
  }),

  getters: {
    currentTab: state => state.tabs.find(tab => tab.code === state.currentTabCode),

    currentTabPos: state => state.tabs.findIndex(tab => tab.code === state.currentTabCode),

    tabList: state => state.tabs.map(tab => tab.code),

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

    addTab(tab: IMenu) {
      if (this.tabList.includes(tab.code)) {
        this.currentTabCode = tab.code

        this.changeTab(tab.code)
        return
      }

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

    removeRightTabs(code: string) {
      const removePreIndex = this.tabs.findIndex(tab => tab.code === code)
      this.tabs = this.tabs.slice(0, removePreIndex + 1)
    },

    removeLeftTabs(code: string) {
      const removePreIndex = this.tabs.findIndex(tab => tab.code === code)
      this.tabs = this.tabs.slice(removePreIndex)
    },

    removeOtherTabs(code: string) {
      this.removeRightTabs(code)
      this.removeLeftTabs(code)
    },

    removeAllTabs() {
      this.tabs = []
    },
  },

  // persist: {
  //     paths: ['currentTabCode', 'tabs'],
  // },
})

export default useTabStore
