<script setup lang="ts">
import {
  Moon,
  Sunny,
} from '@element-plus/icons-vue'
import {
  useDark,
  useToggle,
} from '@vueuse/core'
import { bus } from '@pkg/utils'

const isDark = useDark()

const value = ref(isDark.value)

function toggleDarkMode() {
  const toggleDark = useToggle(isDark)
  toggleDark()
  bus.emit('dark-mode-change')
}

</script>

<template>
  <ElSwitch
    v-model="value"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="toggleDarkMode"
  />
</template>
