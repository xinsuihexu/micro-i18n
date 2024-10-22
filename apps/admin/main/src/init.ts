import {
  UseModuleType,
} from '@admin/_share/enums'
import { useInitApp } from '@admin/_share/hooks/initApp'
import type { App } from 'vue'

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
    UseModuleType.WUJIE,
    UseModuleType.I18N,
  ], () => {
    Object.values(import.meta.glob('./modules/*.ts', { eager: true })).forEach((i: any) => {
      const isNeedInstall = [UseModuleType.ROUTER].includes(i?.moduleType)

      if (isNeedInstall)
        i?.install(app)
    })
  })

  await setUserInfo()
  await setLanguages()
  await setApps()

  setTitle()
  setTheme()
}
