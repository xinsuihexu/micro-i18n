import type { RouteRecordRaw } from 'vue-router'

const home: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/common-config',
  },
]

export default home
