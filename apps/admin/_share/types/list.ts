import type { ISchema } from '../components/business/ui-form-search/type'

export type IPagination = {
  page: number
  size: number
  total: number
}

export type ICommonState = {
  schemas: ISchema[]
  pagination: IPagination
}