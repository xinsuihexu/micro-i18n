import WuJie from 'wujie-vue3'
import useAppStore from '../store/app'
import lifecycle from './lifecycle'

const {
  setupApp,
  // preloadApp,
} = WuJie

export function setup() {
  const appStore = useAppStore()
  const apps = appStore.getApps

  apps.forEach(({ code }) => {
    setupApp({
      name: code,
      exec: false,
      alive: true,
      sync: false,
      degrade: !window.Proxy,
      ...lifecycle,
      plugins: [
        {
          // 在子应用所有的css之前
          cssBeforeLoaders: [
            // 强制使子应用body定位是relative
            { content: 'body{position: relative !important}' },
          ],
        },
        {
          jsLoader: (code) => {
            // 替换popper.js内计算偏左侧偏移量
            const codes = code.replace(
              'left: elementRect.left - parentRect.left',
              'left: fixed ? elementRect.left : elementRect.left - parentRect.left',
            )
            // 替换popper.js内右侧偏移量
            return codes.replace('popper.right > data.boundaries.right', 'false')
          },
        },
      ],
    })
  })

  // apps.forEach(({ code }) => {
  //     preloadApp({
  //         url: '',
  //         name: code,
  //         exec: false,
  //         alive: false,
  //         degrade: !window.Proxy,
  //     })
  // })
}
