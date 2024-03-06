import { createVNode, render } from 'vue'
import BaseGuide from './index.vue'
import type { IStep } from './type'

export default function useBaseGuide(steps: IStep[]) {
  function start() {
    const div = document.createElement('div')
    // 手动给该div加个标识，方便BaseGuide销毁后可以移除该div
    div.classList.add('base-guide-flag-v1')
    document.body.appendChild(div)

    const VNode = createVNode(BaseGuide, { steps })
    render(VNode, div)
  }

  return [start]
}
