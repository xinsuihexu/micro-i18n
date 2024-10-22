<script setup lang="ts">
import { RouteName } from '@admin/auth/enums/route'

// import useMicroStore from '@admin/auth/store/micro'
import useMicroStore from '@admin/_share/store/micro'

defineOptions({ name: RouteName.appAdmin })

const microStore = useMicroStore()
const router = useRouter()

function onTest() {
  microStore.getProps.jump({
    appCode: 'config',
    path: '/dict-admin?a=1&b=2',
    menuCode: 'config__dict',
  })
}

function onTest1() {
  router.push('/menu-admin')
}

function onTest2() {
  router.push('/app-admin/detail?language=en')
}

function onTest3() {
  router.push('/app-admin/detail111111')
}

function onTest4() {
  router.push('app-admin/anchor')
}

function onTest5() {
  router.push('app-admin/coupon')
}

microStore.getBus.on('auth_app-admin-list', (data: any) => {
  console.log({ data })
})
</script>

<template>
  <div class="p-12px">
    我是应用管理

    <ElSpace wrap>
      <ElButton @click="onTest()">
        跳转到配置中心应用的字典管理页
      </ElButton>

      <ElButton @click="onTest1">
        跳转同应用的菜单页面
      </ElButton>

      <ElButton @click="onTest2">
        跳转到同应用的应用管理详情页
      </ElButton>

      <ElButton @click="onTest3">
        跳转到一个没有权限的页面
      </ElButton>

      <ElButton @click="onTest4">
        跳转anchor页
      </ElButton>

      <ElButton @click="onTest5">
        跳转coupon页
      </ElButton>
    </ElSpace>
  </div>
</template>
