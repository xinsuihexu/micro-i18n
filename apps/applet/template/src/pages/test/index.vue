<script setup lang="ts">
// import { ref } from 'vue'
import { fetchTest } from '@template/servics/test/index'

const title = ref('222')
const backgroundColor = ref('transparent')

// uni.$on('onPageScroll', (data) => {
//   console.log({ data })
// })

onPageScroll((data) => {
  backgroundColor.value = data?.scrollTop > 50 ? 'white' : 'transparent'
})

onLoad(() => {
  // console.log(11111111, uni.getSystemInfoSync())

})

async function getTest() {
  try {
    const res = await fetchTest()
    console.log(2222, res)
  }
  catch (e) {
    console.log(333333, e)
  }
}

setTimeout(() => {
  getTest()
}, 1000)

// onShow(() => {
//   console.log('uni>>>>>', uni)
// })

function onShare() {
  // uni.share({
  //   provider: 'weixin',
  //   title: '分享测试',
  //   scene: 'WXSceneSession',
  //   success(e) {
  //     console.log('success>>>>', e)
  //   },
  //   fail(e) {
  //     console.log('fail>>>>>>', e)
  //   },
  // })
}

// uni.scanCode({
//   success(res) {
//     console.log(`条码类型：${res.scanType}`)
//     console.log(`条码内容：${res.result}`)
//   },
// })

// console.log(11111111, process.env.NODE_ENV, import.meta.env)

// const customStyle = computed(() => ({
//   marginTop: `${uni.getSystemInfoSync().statusBarHeight}px`,
// }))
</script>

<template>
  <view class="content">
    <uni-nav-bar
      fixed
      title="首页"
      status-bar
      :border="false"
      :background-color="backgroundColor"
    />
    <!-- <uni-nav-bar
      fixed
      safe-area-inset-top
      left-text="返回"
      right-text="设置"
      title="标题"
      :style="customStyle"
    /> -->
    <image
      class="logo"
      src="/static/logo.png"
    />
    <view class="text-area">
      <text class="title">
        {{ title }}
      </text>
    </view>

    <uni-countdown
      :day="1"
      :hour="1"
      :minute="12"
      :second="40"
    />

    <uni-badge text="1" />

    <navigator
      url="/pages/test-b/index?a=1&b=2"
    >
      <button
        type="warn"
      >
        跳转
      </button>
    </navigator>
  </view>
</template>

<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: center;

  min-height: 200vh;

  background-color: bisque;
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
