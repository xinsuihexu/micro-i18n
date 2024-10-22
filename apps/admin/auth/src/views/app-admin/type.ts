import type { ICommonState } from '@admin/_share/types/list'

export type IState =
  ICommonState & {
    tableData: any
  }
