/** 开启页面标题守卫 */
import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import useMicroStore from '../store/micro'
import { TITLE } from '../settings'

export function createPageTitleGuard(router: Router, defaultTitle?: string) {
  const microStore = useMicroStore()

  router.afterEach((to) => {
    if (microStore.isMicro)
      microStore.getProps?.setTitle?.((to.meta.title as string) || defaultTitle || TITLE)
    else
      useTitle((to.meta.title as string) || defaultTitle || TITLE)
  })
}
