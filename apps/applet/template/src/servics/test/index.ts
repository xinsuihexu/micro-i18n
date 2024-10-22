// import { get } from '../http'

export function fetchTest() {
  // return get('/auth/menu')
  const isWeb = uni.getSystemInfoSync().uniPlatform === 'web'
  console.log({ isWeb })
  return uni.request({
    url: `${isWeb ? '/api' : 'http://127.0.0.1:3000'}/auth/menu`,
  })
}
