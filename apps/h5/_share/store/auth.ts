import { defineStore } from 'pinia'

interface IState {
  token: string
}

export const useAuthStore = defineStore({
  id: 'auth-store',

  state: (): IState => ({
    token: '123',
  }),

  getters: {
    getToken: state => state.token,

    hasToken: state => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },
    deleteToken() {
      this.token = ''
    },
  },

  persist: true,
})

export default useAuthStore
