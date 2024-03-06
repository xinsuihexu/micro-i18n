import { defineStore } from 'pinia'
import type { Emitter } from 'mitt'
import { APP_CODE } from '../settings'
import type { IMenu } from './menu'

interface IState {
  isMicro: boolean
  props: {
    token: string
    menus: IMenu[]
  }
  bus: Emitter<Record<string, any>>
}

export const useMicroStore = defineStore({
  id: 'micro-store',

  state: (): IState => ({
    isMicro: !!(window as any).__POWERED_BY_WUJIE__,
    props: (window as any)?.$wujie?.props ?? {},
    bus: (window as any).$wujie?.props?.bus,
  }),

  getters: {
    getIsMicro: state => state.isMicro,

    getProps: state => state.props,

    getBus: state => state.bus,
  },

  actions: {
    startWatch() {
      const router = useRouter()
      this.bus.on('sub-route-change', ({ appCode, path }: { appCode: string, path: string }) => {
        if (appCode === APP_CODE)
          router.push(path)
      })
    },
  },

  persist: true,
})

export default useMicroStore
