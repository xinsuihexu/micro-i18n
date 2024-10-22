<script setup lang="ts">
// import {
//   onHide,
//   onLaunch,
//   onShow,
// } from '@dcloudio/uni-app'
import Test from '@template/pages/test/index.vue'

onLaunch(() => {
  console.log('App Launch')
  // uni.getProvider({
  //   service: 'oauth',
  //   success(e) {
  //     console.log('success>>>>', e)
  //   },
  //   fail(e) {
  //     console.log('fail>>>>>>', e)
  //   },
  // })

  // uni.login({
  //   provider: 'weixin',
  //   success(e) {
  //     console.log('success>>>>', e)
  //   },
  //   fail(e) {
  //     console.log('fail>>>>>>', e)
  //   },
  // })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<template>
  <Test />
</template>

<style>

</style>
