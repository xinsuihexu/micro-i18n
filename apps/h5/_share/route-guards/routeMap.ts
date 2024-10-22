/** 路由映射守卫, 根据当前浏览器环境进行pc或者h5跳转 */
import device from 'current-device'
import type { Router } from 'vue-router'

export type IRouteMaps = Record<string, { path: string, url: string, modifyParamsMap?: Record<string, string> }>

// const routeMaps = {
//     '/test': {
//         path: '/test-1',
//         modifyParamsMap: {
//             a: 'b',
//             b: 'a',
//         },
//         url: 'http://127.0.0.1:8000',
//     },
// }

export function createRouteMapGuard(router: Router, routeMaps: IRouteMaps) {
  const isMobile = device.mobile()

  router.beforeEach(async (to, _from, next) => {
    const routeMap = routeMaps[to.path]

    if (isMobile && routeMap) {
      const beforeParams = new URLSearchParams(location.search).entries()
      const afterParams = {} as Record<string, string>

      for (const [k, v] of beforeParams) {
        if (k in (routeMap.modifyParamsMap || {}))
          afterParams[(routeMap.modifyParamsMap || {})[k]] = v
        else
          afterParams[k] = v
      }

      const jumpPath = `${routeMap.url}${routeMap.path}?${new URLSearchParams(afterParams).toString()}`

      // 防止浏览器拦截
      const link = document.createElement('a')
      link.href = jumpPath
      link.target = '_self'
      link.click()

      return
    }
    next()
  })
}
