import axios from 'axios'
import useAuthStore from '@admin-main/store/auth'

const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
})

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.getToken

  if (token && config.headers)
    config.headers.Authorization = token

  return config
})

instance.interceptors.response.use(({ data }) => {
  // 此处可以根据业务逻辑做相应处理
  if (data.code === 400)
    console.log('出小差啦')

  return data
}, (e) => {
  if (e.response?.status === 403) {
    const authStore = useAuthStore()
    authStore.deleteToken()

    window.location = window.location.origin as unknown as Location
  }
  else {
    console.log('出小差啦')
  }
})

export default instance
