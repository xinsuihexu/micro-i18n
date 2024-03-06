<script setup lang="ts">
import useLocaleStore from '@admin/_share/store/locale'
import type { LanguageType } from '@admin/_share/enums'
import { DEFAULT_LANGUAGE } from '@admin/_share/settings'
import useAppStore from '@admin/_share/store/app'

const { t: $t } = useI18n()

const i18n = useI18n()
const localeStore = useLocaleStore()

const paramsLanguage = new URLSearchParams(location.search).get('language') as any

function data() {
  console.log('localeStore', localeStore)
  return [
    {
      name: $t('权限中心'),
      code: 'auth',
      port: '6061',
      active: true,
      sort: 1,
      menus: [
        {
          name: $t('应用管理'),
          code: 'auth__app',
          icon: 'i-carbon-home',
          path: '/app-admin',
          href: '',
          visible: true,
          children: [
            {
              name: $t('应用管理__详情页'),
              code: 'auth__app__detail',
              path: '/app-admin/detail',
              href: '',
              visible: false,
            },
            {
              name: $t('应用管理__anchor'),
              code: 'auth__app__anchor',
              path: '/app-admin/anchor',
              href: '',
              visible: false,
            },
          ],
        },
        {
          name: $t('菜单管理'),
          code: 'auth__menu',
          icon: 'i-carbon-home',
          path: '/menu-admin',
          href: '',
          visible: true,
          children: [],
        },
      ],
    },

    {
      name: '配置中心',
      code: 'config',
      port: '6062',
      active: false,
      sort: 2,
      menus: [
        {
          name: '通用配置',
          code: 'config__common',
          icon: 'i-carbon-home',
          path: '/common-config',
          href: '',
          visible: true,
          children: [],
        },
        {
          name: '字典管理',
          code: 'config__dict',
          icon: 'i-carbon-home',
          path: '/dict-admin',
          href: '',
          visible: true,
          children: [],
        },
      ],
    },
  ] as any
}

localeStore.setLanguage(
  paramsLanguage || DEFAULT_LANGUAGE,
  (language: LanguageType, locale: any) => {
    i18n.locale.value = language
    i18n.setLocaleMessage(language, locale)

    const appStore = useAppStore()
    appStore.setApps(data())
  },
)

watch(() => paramsLanguage, () => {
  console.log(11111111112222)
})
</script>

<template>
  <ElConfigProvider :locale="localeStore.getLocale">
    <RouterView />
  </ElConfigProvider>
</template>
