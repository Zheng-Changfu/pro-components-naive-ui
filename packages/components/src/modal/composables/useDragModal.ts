import type { ComputedRef } from 'vue'
import type { ProModalProps } from '../props'
import { useEventListener } from '@vueuse/core'
import { computed, onScopeDispose } from 'vue'

export const DRAGGABLE_CLASS = 'pro-modal--draggable'
export function useDragModal(props: ComputedRef<ProModalProps>) {
  const cleanups: Array<() => void> = []

  const canDraggable = computed(() => {
    return props.value.draggable !== false
  })

  const sticky = computed(() => {
    return props.value.draggable !== false && (props.value.draggable?.sticky ?? true)
  })

  function startDrag(modal: HTMLElement) {
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`) as HTMLElement
    if (!header || !canDraggable.value) {
      return
    }

    let maxMoveX = 0
    let minMoveX = 0
    let maxMoveY = 0
    let minMoveY = 0
    let prevMoveY = 0
    let prevMoveX = 0
    let mousedownEvent: MouseEvent | undefined

    cleanups.push(
      useEventListener(header, 'mousedown', (event) => {
        mousedownEvent = event
        const {
          x,
          y,
          right,
          bottom,
        } = modal.getBoundingClientRect()
        /**
         * TODO: 是否需要参考 to 属性
         */
        minMoveX = x
        minMoveY = y
        maxMoveX = window.innerWidth - right
        maxMoveY = window.innerHeight - bottom

        /**
         * naive-ui modal 使用 transform 会导致关闭动画异常
         */
        const { left, top } = modal.style
        prevMoveY = +top.slice(0, -2)
        prevMoveX = +left.slice(0, -2)
      }),
    )

    cleanups.push(
      useEventListener(window, 'mousemove', (event) => {
        if (!mousedownEvent)
          return

        const {
          clientX: downX,
          clientY: downY,
        } = mousedownEvent

        let moveX = event.clientX - downX
        let moveY = event.clientY - downY
        if (sticky.value) {
          if (moveX > maxMoveX) {
            moveX = maxMoveX
          }
          else if (-moveX > minMoveX) {
            moveX = -minMoveX
          }

          if (moveY > maxMoveY) {
            moveY = maxMoveY
          }
          else if (-moveY > minMoveY) {
            moveY = -minMoveY
          }
        }
        const x = moveX + prevMoveX
        const y = moveY + prevMoveY
        modal.style.top = `${y}px`
        modal.style.left = `${x}px`
      }),
    )

    cleanups.push(
      useEventListener(window, 'mouseup', () => {
        mousedownEvent = undefined
      }),
    )
  }

  function stopDrag() {
    cleanups.forEach(cleanup => cleanup())
    cleanups.length = 0
  }

  onScopeDispose(stopDrag)

  return {
    stopDrag,
    startDrag,
    canDraggable,
  }
}
