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

    const {
      top: maxMoveY,
      left: maxMoveX,
    } = modal.getBoundingClientRect()

    let prevX = 0
    let prevY = 0
    let mousedownEvent: MouseEvent | undefined

    cleanups.push(
      useEventListener(header, 'mousedown', (event) => {
        mousedownEvent = event
        prevY = +modal.style.top.slice(0, -2)
        prevX = +modal.style.left.slice(0, -2)
      }, { capture: true }),
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
        let x = moveX + prevX
        let y = moveY + prevY

        if (sticky.value) {
          if (Math.abs(x) > maxMoveX) {
            x = x < 0 ? -maxMoveX : maxMoveX
          }
          if (Math.abs(y) > maxMoveY) {
            y = y < 0 ? -maxMoveY : maxMoveY
          }
        }

        modal.style.top = `${y}px`
        modal.style.left = `${x}px`
      }, { capture: true }),
    )

    cleanups.push(
      useEventListener(window, 'mouseup', () => {
        mousedownEvent = undefined
      }, { capture: true }),
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
