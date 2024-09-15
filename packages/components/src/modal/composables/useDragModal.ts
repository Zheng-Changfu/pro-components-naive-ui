import type { ComputedRef } from 'vue'
import type { ProModalProps } from '../props'
import type { ProModalDraggableOptions } from '../types'
import { useEventListener } from '@vueuse/core'
import { draggableClass } from '../const'

export function useDragModal(props: ComputedRef<ProModalProps>) {
  const cleanups: Array<() => void> = []

  const canDraggable = computed(() => {
    return props.value.draggable !== false
  })

  const normalizedDraggable = computed<null | Required<ProModalDraggableOptions>>(() => {
    const { draggable } = props.value
    if (draggable === false) {
      return null
    }
    if (draggable === true || draggable === undefined) {
      return {
        sticky: true,
      }
    }
    return {
      sticky: true,
      ...draggable,
    }
  })

  function bindingEvents(modal: HTMLElement) {
    const header = modal.querySelector(`.${draggableClass}`) as HTMLElement
    if (!header) {
      return
    }
    cleanups.push(
      useEventListener(header, 'mousedown', (originE) => {
        const draggable = normalizedDraggable.value
        if (!modal || !header || !draggable) {
          return
        }
        const targetRect = header.getBoundingClientRect()
        const containerRect = modal.getBoundingClientRect()
        const gap = targetRect.left - containerRect.left
        const { clientX: originX, clientY: originY } = originE
        const x = originX - gap
        const y = originY - gap
        const prevTop = +modal.style.top.slice(0, -2) - gap
        const prevLeft = +modal.style.left.slice(0, -2) - gap

        const cleanupMousemove = useEventListener(window, 'mousemove', (e) => {
          const { sticky } = draggable
          const { clientX, clientY } = e
          let moveX = clientX - x
          let moveY = clientY - y
          if (sticky) {
            const vw = window.innerWidth || document.documentElement.clientWidth
            const vh = window.innerHeight || document.documentElement.clientHeight
            const maxMoveX = Math.max(0, vw - containerRect.width - containerRect.x + gap)
            const maxMoveY = Math.max(0, vh - containerRect.height - containerRect.y + gap)
            moveX = moveX > maxMoveX ? maxMoveX : -moveX > (containerRect.x - gap) ? -(containerRect.x - gap) : moveX
            moveY = moveY > maxMoveY ? maxMoveY : -moveY > (containerRect.y - gap) ? -(containerRect.y - gap) : moveY
          }
          modal.style.cssText += `;left:${prevLeft + moveX}px;top:${prevTop + moveY}px`
        }, { capture: true })

        const cleanupMouseup = useEventListener(window, 'mouseup', () => {
          cleanupMouseup()
          cleanupMousemove()
        }, { capture: true })
      }, { capture: true }),
    )
  }

  function dispose() {
    cleanups.forEach(cleanup => cleanup())
    cleanups.length = 0
  }

  onScopeDispose(dispose)

  return {
    canDraggable,
    bindingEvents,
  }
}
