<script setup lang="ts">

</script>

<template>
  <div class="flex gap-12px flex-wrap">
    <div class="layout-1">
      <div class="w-full h-12px bg-black" />
      <div class="flex-1 bg-white" />
    </div>

    <div class="layout-2">
      <div class="w-12px bg-black" />
      <div class="flex-1 bg-white" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-1 {
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid var(--el-border-color);
  overflow: hidden;
}
.layout-2 {
  display: flex;
  width: 60px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid var(--el-border-color);
  overflow: hidden;
}
</style>
