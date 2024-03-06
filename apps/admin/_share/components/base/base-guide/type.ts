import type { Placement } from '@popperjs/core'

export interface IPopper {
  title: string
  content: string
}

export interface IStep {
  target: string
  placement: Placement
  popper: IPopper
}

export interface IRect {
  width: number
  height: number
  x: number
  y: number
}

export interface IProps {
  steps: IStep[]
}

export interface IState {
  currentIndex: number
  rect: IRect
}
