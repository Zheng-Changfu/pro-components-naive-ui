import type { ProDataTableProps } from '../props'
import { computed } from 'vue'

export function useRowProps(props: ComputedRef<ProDataTableProps>) {
  const rowProps = computed(() => {
    const {
      rowProps = {} as any,
      clickRowToSelect,
    } = props.value

    return {
      ...rowProps,
      onClick: (e: Event) => {
        if (clickRowToSelect === false) {
          rowProps.onClick?.(e)
          return
        }
        e.stopPropagation()
        console.log('clickRowToSelect')
      },
    }
  })

  return {
    rowProps,
  }
}
