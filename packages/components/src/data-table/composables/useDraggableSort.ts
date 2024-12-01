import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { isNumber } from 'lodash-es'
import { uid } from 'pro-composables'
import { computed, getCurrentInstance, watchPostEffect } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'

export function useDraggableSort(props: ComputedRef<ProDataTableProps>) {
  const clsPrefix = useNaiveClsPrefix()
  const dragHandleId = `drag-handle-${uid()}`
  const currentInstance = getCurrentInstance()

  const nDataTableTBody = computed(() => {
    const root = (currentInstance as any)?.ctx?.$el as HTMLElement
    return root?.querySelector(`.${clsPrefix.value}-data-table-tbody`) as HTMLElement
  })

  const exitDragSortColumn = computed(() => {
    const { dragSortKey, columns = [] } = props.value
    return dragSortKey && columns.some((item: any) => item.path === dragSortKey || item.key === dragSortKey)
  })

  const { start, pause } = useDraggable(
    nDataTableTBody,
    {
      immediate: false,
      animation: 200,
      handle: `.${dragHandleId}`,
      onEnd: (event) => {
        const { oldIndex, newIndex } = event
        const { onDragSortEnd } = props.value
        if (
          onDragSortEnd
          && isNumber(oldIndex)
          && isNumber(newIndex)
          && oldIndex !== newIndex
        ) {
          onDragSortEnd(oldIndex, newIndex)
        }
      },
    },
  )

  watchPostEffect(() => {
    const node = nDataTableTBody.value
    if (
      node
      && exitDragSortColumn.value
      && !props.value.virtualScroll
      && !props.value.virtualScrollX
    ) {
      start()
    }
    else {
      pause()
    }
  })

  return {
    dragHandleId,
  }
}
