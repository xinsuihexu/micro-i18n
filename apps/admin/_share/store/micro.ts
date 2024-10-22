import { defineStore } from 'pinia'
import type { Emitter } from 'mitt'
import { Tree, bus } from '@pkg/utils'
import { useDark, useToggle } from '@vueuse/core'
import { $t } from '../modules/i18n'
import type { AppCodeType } from '../enums'
import type { IMenu } from './menu'
import useAuthStore from './auth'

interface IState {
  isMicro: boolean
  props: {
    token: string
    menus: IMenu[]
    language: string
    getLanguage: () => string
    locale: any
    getLocale: () => any
    jump: (params: { appCode: string, menuCode: string, path: string, params?: Record<string, any>, query?: Record<string, any> }) => any
    setTitle: (title: string) => any
    $t: Function
    deleteToken: Function
  }
  bus: Emitter<Record<string, any>>
  language: string
  locale: any
}

export const useMicroStore = defineStore({
  id: 'micro-store',

  state: (): IState => ({
    isMicro: !!(window as any).__POWERED_BY_WUJIE__,
    props: (window as any)?.$wujie?.props ?? {},
    bus: (window as any).$wujie?.props?.bus,
    language: '',
    locale: null,
  }),

  getters: {
    getIsMicro: state => state.isMicro,

    getProps: state => state.props,

    getBus: state => state.isMicro ? state.bus : bus,

    getLanguage: state => state.language || state.props.language,

    getLocale: state => state.locale || state.props.locale,

    $t: state => state.isMicro ? state.props.$t : $t,
  },

  actions: {
    startWatch(_appCode: AppCodeType) {
      const route = useRoute()
      const router = useRouter()

      this.bus.on('sub-route-change', ({ appCode, path, params = {}, query = {} }: { appCode: string, path: string, params?: Record<string, any>, query?: Record<string, any> }) => {
        if (appCode === _appCode) {
          router.push({ path, params, query })
        }
      })

      // this.bus.on('language-change', () => {
      //   this.language = this.props.getLanguage()
      //   this.locale = this.props.getLocale()
      // })

      this.bus.on('dark-mode-change', () => {
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        toggleDark()
      })

      watch(() => route.fullPath, (fullPath) => {
        const query = Object.create(null)
        for (const [k, v] of new URLSearchParams(location.search).entries()) {
          query[k] = v
        }

        const menu = new Tree().findNode(this.getProps.menus, (menu: IMenu) => menu.path === new URL(fullPath, location.origin).pathname)

        if (menu) {
          const { appCode, code } = menu
          // const queryStr = new URLSearchParams(location.search).toString()
          this.props.jump({ appCode, menuCode: code, path: fullPath })
        }
      })
    },

    getToken() {
      const authStore = useAuthStore()
      return this.isMicro ? this.props.token : authStore.getToken
    },

    deleteToken() {
      if (this.isMicro) {
        this.props.deleteToken()
      }
      else {
        const authStore = useAuthStore()
        authStore.deleteToken()
      }
    },
  },

  persist: true,
})

export default useMicroStore
