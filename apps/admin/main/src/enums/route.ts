import { camelCase } from 'lodash-es'

export enum RoutePath {
  home = '/home',
  login = '/login',
}

type PathEnumKeys = keyof typeof RoutePath

export const RouteName: { [k in PathEnumKeys]: string }
    = Object
      .keys(RoutePath)
      .map((key) => {
        const k = key as PathEnumKeys
        return { key: k, value: camelCase(`${RoutePath[k]}`) }
      })
      .reduce((pre, cur) => {
        pre[cur.key] = cur.value
        return pre
      }, {} as { [k in PathEnumKeys]: string })
