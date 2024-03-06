/** 权限守卫 */
import type { Router } from 'vue-router'
import { Tree } from '@pkg/utils'
import { ElMessage } from 'element-plus'
import type { IMenu } from '../store/menu'
import useMenuStore from '../store/menu'

export function createPermissionGuard(router: Router, whitelist?: string[]) {
  router.beforeEach((to, from, next) => {
    if (whitelist?.includes(to.path)) {
      next()
      return
    }

    const menuStore = useMenuStore()

    const menu = new Tree().findNode(menuStore.getMenus, (menu: IMenu) => menu.path === new URL(to.fullPath, location.origin).pathname)
    if (!menu) {
      ElMessage({
        type: 'error',
        message: '您没有该页面的权限！',
      })
      return
    }

    next()
  })
}
