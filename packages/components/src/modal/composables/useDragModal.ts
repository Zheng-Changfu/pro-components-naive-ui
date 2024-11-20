import type { ComputedRef } from 'vue'
import type { ProModalProps } from '../props'
import { useEventListener } from '@vueuse/core'

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
    dispose()
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`) as HTMLElement
    if (!header || !canDraggable.value) {
      return
    }

    let prevMoveX = 0
    let prevMoveY = 0
    let maxMoveX = 0
    let maxMoveY = 0
    let mousedownEvent: MouseEvent | undefined

    cleanups.push(
      useEventListener(header, 'mousedown', (event) => {
        mousedownEvent = event
        prevMoveY = +modal.style.top.slice(0, -2)
        prevMoveX = +modal.style.left.slice(0, -2)
        const {
          right,
          bottom,
        } = modal.getBoundingClientRect()
        maxMoveX = window.innerWidth - right
        maxMoveY = window.innerHeight - bottom
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

        const moveY = event.clientY - downY
        const moveX = event.clientX - downX
        let x = moveX + prevMoveX
        let y = moveY + prevMoveY
        if (sticky.value) {
          
          if (Math.abs(moveX) >= maxMoveX) {
            x = x < 0
              ? -(maxMoveX + prevMoveX)
              : maxMoveX + prevMoveX
          }
          if (Math.abs(moveY) >= maxMoveY) {
            y = y < 0
              ? -(maxMoveY + prevMoveY)
              : maxMoveY + prevMoveY
          }
        }

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

  function dispose() {
    cleanups.forEach(cleanup => cleanup())
    cleanups.length = 0
  }

  onScopeDispose(dispose)

  return {
    startDrag,
    canDraggable,
  }
}
