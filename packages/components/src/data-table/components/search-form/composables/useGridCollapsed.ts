import type { GridProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProSearchFormProps } from '../props'
import { watchEffect } from 'vue'

export function useGridCollapsed(props: ComputedRef<ProSearchFormProps>) {
  const collapsed = ref(true)

  const nGridProps = computed<GridProps>(() => {
    const { collapseButtonProps, showSuffixGridItem } = props.value
    return {
      xGap: 24,
      yGap: 0,
      collapsedRows: 1,
      responsive: 'screen',
      cols: '1 s:2 l:3 xl:4',
      ...(props.value.gridProps ?? {}),
      collapsed: collapseButtonProps === false || showSuffixGridItem === false ? undefined : collapsed.value,
    }
  })

  function toggleCollapsed() {
    const { onCollapse } = props.value
    collapsed.value = !collapsed.value
    onCollapse && onCollapse(collapsed.value)
  }

  watchEffect(() => {
    const value = props.value.gridProps?.collapsed
    collapsed.value = value ?? true
  })

  return {
    nGridProps,
    toggleCollapsed,
    collapsed: computed(() => collapsed.value),
  }
}
