/** 创建进度条守卫 */
import type { Router } from 'vue-router'
import np from 'nprogress'
import 'nprogress/nprogress.css'

export function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    np.start()
  })

  router.afterEach(async () => {
    np.done()
  })
}
