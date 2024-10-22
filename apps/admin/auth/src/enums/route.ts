import { camelCase } from 'lodash-es'
import { AppCodeType } from '@admin/_share/enums'

export enum RoutePath {
  appAdmin = '/app-admin',
  appAdminDetail = '/app-admin/detail',
  appAdminAnchor = '/app-admin/anchor',
  menuAdmin = '/menu-admin',
}

type PathEnumKeys = keyof typeof RoutePath

export const RouteName: { [k in PathEnumKeys]: string }
    = Object
      .keys(RoutePath)
      .map((key) => {
        const k = key as PathEnumKeys
        return { key: k, value: camelCase(`${AppCodeType.AUTH}${RoutePath[k]}`) }
      })
      .reduce((pre, cur) => {
        pre[cur.key] = cur.value
        return pre
      }, {} as { [k in PathEnumKeys]: string })
