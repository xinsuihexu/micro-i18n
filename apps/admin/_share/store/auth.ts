import { defineStore } from 'pinia'

interface IState {
  token: string
}

export const useAuthStore = defineStore({
  id: 'auth-store',

  state: (): IState => ({
    token: '',
  }),

  getters: {
    getToken: state => state.token,
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
