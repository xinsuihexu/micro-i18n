/** 权限守卫 */
import type { Router } from 'vue-router'
import { Tree } from '@pkg/utils'
import { ElMessage } from 'element-plus'
import type { IMenu } from '../store/menu'
import useMenuStore from '../store/menu'
import useAuthStore from '../store/auth'

const _whitelist = ['/login', '/404']

export function createPermissionGuard({
  router,
  whitelist,
  isMainApp = false,
}: { router: Router, whitelist?: string[], isMainApp?: boolean }) {
  router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
      next('/404')
      return
    }

    if ([..._whitelist, whitelist]?.includes(to.path)) {
      next()
      return
    }

    if (!isMainApp) {
      const menuStore = useMenuStore()

      const menu = new Tree().findNode(menuStore.getMenus, (menu: IMenu) => menu.path === new URL(to.fullPath, location.origin).pathname)
      if (!menu) {
        ElMessage({
          type: 'error',
          message: '您没有该页面的权限！',
        })
        return
      }
    }

    const authStore = useAuthStore()
    if (!authStore.hasToken && to.name !== 'login') {
      next('/login')
      return
    }

    next()
  })
}
