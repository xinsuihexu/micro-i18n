import type { App } from 'vue'
import { useInitApp } from '@admin/_share/hooks/initApp'
import { UseModuleType } from '@admin/_share/enums'
import useMicroStore from '@admin/_share/store/micro'
import { APP_CODE, TITLE } from './settings'

export default async function init(app: App) {
  const {
    installModules,
    setUserInfo,
    setLanguages,
    setApps,
    setTitle,
    setTheme,
  } = useInitApp(app)

  installModules([
    UseModuleType.PINIA,
    UseModuleType.UI,
    UseModuleType.I18N,
  ], () => {
    Object.values(import.meta.glob('./modules/*.ts', { eager: true })).forEach((i: any) => {
      const isNeedInstall = [UseModuleType.ROUTER].includes(i?.moduleType)

      if (isNeedInstall)
        i?.install(app)
    })
  })

  setTitle(TITLE)

  const microStore = useMicroStore()
  if (!microStore.isMicro) {
    await setUserInfo()
    setTheme()
  }

  await setLanguages()
  if (!microStore.isMicro)
    await setApps(APP_CODE)
}
