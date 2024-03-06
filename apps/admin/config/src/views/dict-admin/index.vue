<script setup lang="ts">
import { RouteName } from '@admin-config/enums/route'
import useMicroStore from '@admin-config/store/micro'

defineOptions({ name: RouteName.appAdmin })

const microStore = useMicroStore()
</script>

<template>
  <div>
    我是字典管理
  </div>
</template>
