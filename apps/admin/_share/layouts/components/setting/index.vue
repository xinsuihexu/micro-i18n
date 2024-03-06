<script setup lang="ts">
import SwitchDark from './switch-dark.vue'
import SwitchTheme from './switch-theme.vue'
import SwitchLayout from './switch-layout.vue'

interface IState {
  visible: boolean
}

const state = reactive<IState>({ visible: false })
</script>

<template>
  <div
    class="setting"
    @click="state.visible = true"
  >
    <i class="i-carbon-settings text-#fff" />
  </div>

  <ElDrawer
    v-model="state.visible"
    direction="rtl"
    :show-close="false"
    :with-header="false"
  >
    <div>
      <div>暗黑模式</div>
      <SwitchDark />
    </div>

    <div>
      <div>主题色</div>
      <SwitchTheme />
    </div>

    <div>
      <div>布局模式</div>
      <SwitchLayout />
    </div>
  </ElDrawer>
</template>

<style lang="less" scoped>
.setting {
  position: fixed;
  z-index: 99;
  inset-block-start: 240px;
  inset-inline-end: 0px;
  width: 36px;
  height: 36px;
  background-color: var(--el-color-primary);
  backdrop-filter: saturate(180%) blur(20px);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-end-start-radius: 8px;
  border-start-start-radius: 8px;
}
</style>l
