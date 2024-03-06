<script setup lang="ts">
import useMicroStore from './store/micro'

const router = useRouter()

const microStore = useMicroStore()
if (microStore.getIsMicro)
  microStore.startWatch()

</script>

<template>
  <RouterView />
</template>
