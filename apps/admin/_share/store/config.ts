import { defineStore } from 'pinia'
import { DEFAULT_LANGUAGE, THEME_COLOR } from '../settings'
import type { LanguageType } from '../enums/index'

interface IState {
  themeColor: string
  language: string
}

export const useConfigStore = defineStore({
  id: 'config-store',

  state: (): IState => ({
    themeColor: THEME_COLOR,
    language: DEFAULT_LANGUAGE,
  }),

  getters: {
    getThemeColor: state => state.themeColor,

    getLanguage: state => state.language,
  },

  actions: {
    setThemeColor(color: string) {
      this.themeColor = color
    },

    setLanguage(language: LanguageType) {
      this.language = language
    },
  },

  persist: true,
})

export default useConfigStore
