<script setup lang="ts">
onLoad((data) => {
  console.log({ data })
  uni.getLocation({
    success(e) {
      console.log('success>>>>', e)
    },
    fail(e) {
      console.log('fail>>>>>>', e)
    },
  })
})
</script>

<template>
  <div>
    我是测试页
  </div>
</template>
