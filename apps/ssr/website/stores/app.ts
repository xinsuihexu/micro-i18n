import { defineStore } from 'pinia'

interface IState {
  appCode: string
}

export const useAppStore = defineStore({
  id: 'app-store',

  state: (): IState => ({
    appCode: '',
  }),

  getters: {
    getAppCode: state => state.appCode,
  },

  actions: {
    setAppCode() {
      this.appCode = 'aaaaa'
    },
  },

  persist: true,
})

export default useAppStore
