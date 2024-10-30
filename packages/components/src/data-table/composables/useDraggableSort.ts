import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { getCurrentInstance, watchPostEffect } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'

interface UseDraggableSortOptions {
  data: Ref<any[]>
  dragHandleId: string
}
export function useDraggableSort(props: ComputedRef<ProDataTableProps>, options: UseDraggableSortOptions) {
  const clsPrefix = useNaiveClsPrefix()
  const sortedData = shallowRef<any[]>([])
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
    sortedData,
    {
      immediate: false,
      animation: 200,
      handle: `.${options.dragHandleId}`,
      onEnd: (event) => {
        const { oldIndex, newIndex } = event
        const { onDragSortEnd } = props.value
        onDragSortEnd && onDragSortEnd(
          sortedData.value,
          oldIndex!,
          newIndex!,
        )
      },
    },
  )

  watchEffect(() => {
    sortedData.value = options.data.value
  })

  watchPostEffect(() => {
    if (sortedData.value.length > 0) {
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
    }
  })
}
