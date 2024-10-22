import axios from 'axios'
// import { UniAdapter } from 'uniapp-axios-adapter'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

interface IExtraConfig {
  showLoading?: boolean
}
type IAxiosRequestConfig = AxiosRequestConfig & IExtraConfig
type IInternalAxiosRequestConfig = InternalAxiosRequestConfig & IExtraConfig

function getBaseUrl() {
  const isLocal = import.meta.env.MODE === 'development'
  const isWeb = uni.getSystemInfoSync().uniPlatform === 'web'
  return isLocal && isWeb ? `${import.meta.env.VITE_URL}/api` : `${import.meta.env.VITE_URL}`
}

// function getAdapter() {
//   const isWeb = uni.getSystemInfoSync().uniPlatform === 'web'

//   const res = isWeb ? {} : { adapter: '' }
//   console.log(33333, isWeb, res)
//   return res
// }

const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
})

instance.interceptors.request.use((config: IInternalAxiosRequestConfig) => {
  // const token = uni.getStorageSync('token')
  // if (token) {
  //   config.headers.token = token
  // }
  // else {
  //   uni.reLaunch({
  //     url: '/pages/login/index',
  //   })
  // }

  if (config.showLoading) {
    uni.showLoading()
  }

  return config
})

instance.interceptors.response.use(({ data }) => {
  console.log(111111, { data })
  // 此处可以根据业务逻辑做相应处理
  if (data.code === 400)
    console.log('出小差啦')

  setTimeout(() => {
    uni.hideLoading()
  }, 500)

  return data
}, (e) => {
  console.log(e)
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
  // if (e.response?.status === 403) {
  //   microStore.deleteToken()

  //   window.location = window.location.origin as unknown as Location
  // }
  // else {
  //   console.log('出小差啦')
  // }
})

export function request(config: IAxiosRequestConfig) {
  return instance.request({ showLoading: true, ...config })
}

export function get(url: string, config?: IAxiosRequestConfig) {
  return instance.get(url, { showLoading: true, ...config })
}

export function post(url: string, data: Record<string, any>, config?: IAxiosRequestConfig) {
  return instance.post(url, data, { showLoading: true, ...config })
}

export default instance
