import type { IHttpResponseBase } from '@h5/_share/types/http'
/** ** demo接口1 */
// 入参
export interface IDemoParams {
  id: number
  name: string
}
// 出参
export interface IDemoItem {
  id: number
  age: number
}

export interface IDemoData {
  id: number
  name: string
  list: IDemoItem[]
}

export interface IDemoResult extends IHttpResponseBase {
  data: IDemoData
}

// demo 接口2
