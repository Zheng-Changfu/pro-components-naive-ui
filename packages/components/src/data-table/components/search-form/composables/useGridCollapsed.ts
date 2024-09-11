import { watchImmediate } from '@vueuse/core'
import type { GridProps } from 'naive-ui'
import type { ProSearchFormProps } from '../props'

export function useGridCollapsed(props: ProSearchFormProps) {
  const collapsed = ref(true)

  watchImmediate(
    computed(() => props.gridProps?.collapsed ?? true),
    v => collapsed.value = v,
  )

  const nGridProps = computed<GridProps>(() => {
    const { collapseButtonProps, showSuffixGridItem } = props
    return {
      xGap: 24,
      yGap: 0,
      collapsedRows: 1,
      responsive: 'screen',
      cols: '1 s:2 l:3 xl:4',
      ...(props.gridProps ?? {}),
      collapsed: collapseButtonProps === false || showSuffixGridItem === false ? undefined : collapsed.value,
    }
  })

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  return {
    nGridProps,
    toggleCollapsed,
    collapsed: computed(() => collapsed.value),
  }
}
