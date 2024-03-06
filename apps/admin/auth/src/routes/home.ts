import type { RouteRecordRaw } from 'vue-router'

const home: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/app-admin',
  },
]

export default home
