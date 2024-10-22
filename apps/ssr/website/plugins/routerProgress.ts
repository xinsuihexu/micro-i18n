import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 配置加载 */
NProgress.configure({
  easing: 'ease-in',
  speed: 200,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.4,
})

export default defineNuxtPlugin((): void => {
  useRouter().beforeEach((): void => {
    NProgress.start()
  })

  useRouter().afterEach((): void => {
    NProgress.done()
  })
})
