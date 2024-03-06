<script setup lang="ts">
import { LanguageType } from '../../../enums/index'

const list = ref([
  {
    label: '中文',
    value: LanguageType.ZH_CN,
  },
  {
    label: 'English',
    value: LanguageType.EN,
  },
  {
    label: 'بالعربية',
    value: LanguageType.AR,
  },
])

function onChangeLanguage(language: LanguageType) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  params.set('language', language)
  url.search = params.toString()
  window.location.href = url.href
}
</script>

<template>
  <ElDropdown @command="onChangeLanguage">
    <span class="i-carbon-translate" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in list"
          :key="item.value"
          :command="item.value"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
