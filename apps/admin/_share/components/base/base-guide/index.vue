<script setup lang="ts">
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import type {
  IProps,
  IState,
} from './type'

defineOptions({ name: 'BaseGuide' })

const props = defineProps<IProps>()

const emit = defineEmits(['confirm'])

const state = reactive<IState>({
  currentIndex: -1,
  rect: {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  },
})

let cacheReference: any = null
const popperRef = ref()
const popperArrowRef = ref()

let popperInstance: Instance | null = null

const isShow = computed(() => {
  return state.currentIndex !== -1
})

const eleLeft = computed(() => {
  return `${state.rect.x + state.rect.width / 2 - 20}px`
})
const eleTop = computed(() => {
  return `${state.rect.y + state.rect.height / 2 - 20}px`
})

const currentStep = computed(() => {
  return props.steps[state.currentIndex]
})

async function move(index?: number) {
  if (!index && index !== 0)
    state.currentIndex++
  else state.currentIndex = index

  await nextTick()

  if (cacheReference)
    cacheReference.style.outline = 'none'

  if (props.steps.length <= state.currentIndex) {
    state.currentIndex = -1
    emit('confirm')
    popperInstance?.destroy?.()

    const div = document.getElementsByClassName('base-guide-flag-v1')[0]
    if (div)
      div.parentNode!.removeChild(div)

    return
  }

  const reference = document.getElementById(props.steps[index ?? state.currentIndex].target) as HTMLElement
  if (reference) {
    reference.style.outline = '2px solid var(--el-color-primary-dark-2)'
    cacheReference = reference
  }

  const popper = toValue(popperRef) as unknown as HTMLElement
  const arrow = toValue(popperArrowRef) as unknown as HTMLElement

  popperInstance = createPopper(reference, popper, {
    strategy: 'absolute',
    placement: toValue(currentStep).placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 10] },
      },
      {
        name: 'arrow',
        options: { element: arrow },
      },
      {
        name: 'logger',
        enabled: true,
        phase: 'main',
        fn(data) {
          state.rect = data.state.rects.reference
        },
      },
    ],
  })
}

onMounted(() => {
  move(++state.currentIndex)
})
</script>

<template>
  <div
    v-if="isShow"
    class="guide"
  >
    <div class="guide-popper__hint">
      <span class="guide-popper__ripple guide-popper__ripple--one" />
      <span class="guide-popper__ripple guide-popper__ripple--two" />
      <span class="guide-popper__ripple guide-popper__ripple--three" />
    </div>
    <div
      ref="popperRef"
      class="guide-popper"
    >
      <div
        ref="popperArrowRef"
        data-arrow
        class="guide-popper__arrow"
      />

      <div class="guide-popper__body">
        <div class="guide-popper__title">
          <span class="me-10px"> {{ state.currentIndex + 1 }}/{{ steps.length }} </span>
          <slot
            name="title"
            v-bind="currentStep"
          >
            {{ currentStep?.popper?.title }}
          </slot>
        </div>
        <slot
          name="content"
          v-bind="currentStep"
        >
          <div class="guide-popper__content">
            {{ currentStep?.popper?.content }}
          </div>
        </slot>
      </div>

      <div class="guide-popper__footer">
        <div class="footer-toolkit">
          <div
            v-if="steps.length > 1"
            class="footer-dots"
          >
            <span
              v-for="i in steps.length"
              :key="i"
              class="footer-dot"
              :class="[{ active: state.currentIndex === i - 1 }]"
              @click="move(i - 1)"
            />
          </div>
        </div>

        <div class="flex gap-16px">
          <span
            v-show="state.currentIndex > 0"
            class="footer-move"
            @click="move(state.currentIndex - 1)"
          >
            上一步
          </span>

          <span
            v-show="state.currentIndex < props.steps.length - 1"
            class="footer-move"
            @click="move(state.currentIndex + 1)"
          >
            下一步
          </span>

          <span
            v-show="state.currentIndex === props.steps.length - 1"
            class="footer-move"
            @click="move()"
          >
            我知道了
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.guide-popper {
  position: relative;
  z-index: 10000;

  color: #fff;
  border-radius: 4px;
  background-color: var(--el-color-primary);

  min-inline-size: 300px;

  &[data-popper-placement^="top"] {
    margin-block-end: 8px;

    [data-arrow] {
      border-top-color: var(--el-color-primary);

      inset-block-end: -16px;
    }
  }

  &[data-popper-placement^="right"] {
    margin-inline-start: 8px;

    [data-arrow] {
      border-right-color: var(--el-color-primary);

      inset-inline-start: -16px;
    }
  }

  &[data-popper-placement^="bottom"] {
    margin-block-start: 8px;

    [data-arrow] {
      border-bottom-color: var(--el-color-primary);

      inset-block-start: -16px;
    }
  }

  &[data-popper-placement^="left"] {
    margin-inline-end: 8px;

    [data-arrow] {
      border-left-color: var(--el-color-primary);

      inset-inline-end: -16px;
    }
  }

  &__arrow {
    position: absolute;

    border: 8px solid transparent;

    block-size: 0;
    inline-size: 0;
  }
}

.guide-popper__hint {
  position: absolute;
  z-index: 10000;

  pointer-events: none;

  block-size: 40px;
  inline-size: 40px;
  inset-block-start: v-bind(eleTop);
  inset-inline: v-bind(eleLeft);
}

.guide-popper__ripple {
  position: absolute;

  transform: translate(-50%, -50%);

  opacity: 1;
  border-radius: 100%;
  background-color: var(--el-color-primary);

  block-size: 0;
  inline-size: 0;
  inset-block-start: 50%;
  inset-inline-start: 50%;

  &--one {
    animation: ripple 2s infinite;
  }

  &--two {
    animation: ripple 2s infinite .66s;
  }

  &--three {
    animation: ripple 2s infinite 1.32s;
  }
}

.guide-popper__body {
  padding: 16px;

  font-size: 16px;
  line-height: 24px;
}

.guide-popper__title {
  font-weight: 600;

  margin-block-end: 8px;
}

.guide-popper__footer {
  display: flex;
  justify-content: space-between;

  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: rgba(235, 227, 222, .1);

  line-height: 20px;

  padding-block: 16px;
  padding-inline: 12px;
}

.footer-move {
  cursor: pointer;
  transition: color .3s ease;

  font-weight: 600;

  &:hover {
    color: #dedede;
  }
}
.footer-toolkit {
  display: flex;
}

.footer-dots {
  display: flex;
  align-items: center;
}

.footer-dot {
  display: inline-block;

  cursor: pointer;
  transition: all .3s ease;

  opacity: .4;
  border-radius: 50%;
  background: #fff;

  block-size: 6px;
  inline-size: 6px;

  & + & {
    margin-inline-start: 4px;
  }
}

.footer-dot.active,
.footer-dot:hover {
  opacity: 1;

  block-size: 8px;
  inline-size: 8px;
}

@keyframes ripple {
  0% {
    opacity: 1;

    block-size: 0;
    inline-size: 0;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;

    block-size: 40px;
    inline-size: 40px;
  }
}

</style>
