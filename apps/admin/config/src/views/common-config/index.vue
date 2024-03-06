<script setup lang="ts">
import { RouteName } from '@admin-config/enums/route'
import useMicroStore from '@admin-config/store/micro'

defineOptions({ name: RouteName.appAdmin })

const microStore = useMicroStore()

function onTest() {
  microStore.bus.$emit('main-route-change', 'app-1', '/admin-app')
}
</script>

<template>
  <div>
    我是通用配置
  </div>
</template>
