export interface ISchema {
  title: string
  field: string
  column: number
  component: {
    vm: string | Record<any,any>
    value: any
    props?: Record<string, any>
    listeners?: Record<string, Function>
  }
}

export interface IProps {
  schemas: ISchema[]
  gap?: number
  defaultExpand?: boolean
  triggerHideRow?: number
  minItemWidth?: number
}