<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello1111')
</script>

<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    />
    <view class="text-area">
      <text class="title">
        {{ title }}
      </text>
    </view>
  </view>
</template>

<style lang="less" scoped>
.content {
  display: flex;

  align-items: center;

  flex-direction: column;

  justify-content: center;
}

.logo {
  width: 200rpx;

  height: 200rpx;

  margin-top: 200rpx;

  margin-right: auto;

  margin-bottom: 50rpx;

  margin-left: auto;
}

.text-area {
  display: flex;

  justify-content: center;
}

.title {
  color: #8f8f94;

  font-size: 36rpx;
}
</style>
