<script setup lang="ts">
import { THEME_COLOR } from '../../../settings'
import { useToggleTheme } from '../../../hooks/theme'

const state = reactive({ themeColor: THEME_COLOR })

function changeColor(color: any) {
  useToggleTheme(color)
}
</script>

<template>
  <ElColorPicker
    v-model="state.themeColor"
    @change="changeColor"
  />
</template>
