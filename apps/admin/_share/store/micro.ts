import { defineStore } from 'pinia'
import type { Emitter } from 'mitt'
import { Tree } from '@pkg/utils'
import { useDark, useToggle } from '@vueuse/core'
import { $t } from '../modules/i18n'
import type { AppCodeType } from '../enums'
import type { IMenu } from './menu'

interface IState {
  isMicro: boolean
  props: {
    token: string
    menus: IMenu[]
    language: string
    getLanguage: () => string
    locale: any
    getLocale: () => any
    jump: (params: { appCode: string, path: string, menuCode: string }) => any
    setTitle: (title: string) => any
    $t: Function
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

    getBus: state => state.bus,

    getLanguage: state => state.locale || state.props.language,

    getLocale: state => state.locale || state.props.locale,

    $t: state => state.isMicro ? state.props.$t : $t,
  },

  actions: {
    startWatch(_appCode: AppCodeType) {
      const route = useRoute()
      const router = useRouter()

      this.bus.on('sub-route-change', ({ appCode, path }: { appCode: string, path: string }) => {
        if (appCode === _appCode)
          router.push(path)
      })

      this.bus.on('language-change', () => {
        this.language = this.props.getLanguage()
        this.locale = this.props.getLocale()
      })

      this.bus.on('dark-mode-change', () => {
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        toggleDark()
      })

      watch(() => route.fullPath, (fullPath) => {
        const menu = new Tree().findNode(this.getProps.menus, (menu: IMenu) => menu.path === new URL(fullPath, location.origin).pathname)

        if (menu) {
          const { appCode, path, code } = menu
          const queryStr = new URLSearchParams(location.search).toString()
          this.props.jump({ appCode, menuCode: code, path: queryStr ? `${path}?${queryStr}` : path })
        }
      })
    },
  },

  persist: true,
})

export default useMicroStore
