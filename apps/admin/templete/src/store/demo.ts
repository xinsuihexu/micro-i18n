import { defineStore } from 'pinia'

interface IState {
  name: string
}

export const useDemoStore = defineStore({
  id: 'demo-store',

  state: (): IState => ({
    name: ''
  }),

  getters: {
    getName: state => state.name,
  },

  actions: {
    setName(name: string) {
      this.name = name
    }
  },

  persist: true,
})

export default useDemoStore
